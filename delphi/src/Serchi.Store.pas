unit Serchi.Store;

{ Data store shared by every WebBroker module instance.
  Resources and knowledge panels are loaded from the SQLite database shared
  with the Node/React version (data/serchi.db, schema in data/schema.sql) and
  cached in memory for searching; new resources are written to the database.
  The forum (tables forum_*) is loaded the same way and every change to it is
  written to the database as well.
  Implements the search/ranking algorithm (port of the useMemo block in
  src/App.tsx). Access to mutable state is serialized with Lock/Unlock. }

interface

uses
  System.SysUtils, System.Classes, System.Generics.Collections,
  FireDAC.Comp.Client, Serchi.Models;

type
  TSearchFilters = record
    Query: string;
    Category: string;   // all | courses | news | ...
    Level: string;      // all | A1 .. C1
    Format: string;     // all | website | app | ...
    FreeOnly: Boolean;
    SortBy: string;     // relevance | alpha | level
    ExactPhrase: string;
    AnyWords: string;
    ExcludeWords: string;
    class function Default: TSearchFilters; static;
    function IsEmpty: Boolean;
  end;

  TSerchiStore = class
  private
    FLock: TObject;
    FResources: TObjectList<TResource>;
    FKnowledge: TObjectList<TKnowledgePanel>;
    FTopics: TObjectList<TForumTopic>;
    FUsers: TDictionary<string, TForumUser>;
    FSeq: Integer;
    FDB: TFDConnection;
    procedure OpenDatabase(const ADatabase, ASchemaFile: string);
    procedure LoadResources;
    procedure LoadKnowledge;
    procedure LoadForum;
    function NextId(const APrefix: string): string;
  public
    { ADatabase: SQLite file; ADataDir: folder with synonyms.json;
      ASchemaFile: data/schema.sql, applied if the database has no tables }
    constructor Create(const ADatabase, ASchemaFile, ADataDir: string);
    destructor Destroy; override;

    procedure Lock;
    procedure Unlock;

    // Resources
    function Search(const AFilters: TSearchFilters; AResults: TList<TResource>): TKnowledgePanel;
    function FindResource(const AId: string): TResource;
    function RandomFeatured: TResource;
    function UrlExists(const AUrl: string): Boolean;
    { Adds (and persists) a resource; False if its URL is already indexed.
      ASource: 'user' or 'crawled'. The store takes ownership when True. }
    function AddResource(AResource: TResource; const ASource: string = 'user'): Boolean;
    function ResourceCount: Integer;

    // Forum
    function UserForRole(const ARole: string): TForumUser;
    function FindTopic(const AId: string): TForumTopic;
    procedure ListTopics(const ACategory, ALevel, AQuery: string; AResults: TList<TForumTopic>);
    { The author's visitor id likes the new topic, as in the React version }
    function CreateTopic(const AUser: TForumUser; const ATitle, AContent, ACategory,
      ALevel: string; const ATags: TArray<string>; const AVisitor: string): TForumTopic;
    function AddComment(ATopic: TForumTopic; const AUser: TForumUser;
      const AContent: string; AModNote: Boolean): TForumComment;
    procedure ToggleTopicLike(ATopic: TForumTopic; const AVisitor: string);
    procedure ToggleCommentLike(AComment: TForumComment; const AVisitor: string);
    procedure CountView(ATopic: TForumTopic);
    { AFlag: pin | lock }
    procedure ToggleTopicFlag(ATopic: TForumTopic; const AFlag: string);
    procedure DeleteTopic(ATopic: TForumTopic);
    procedure DeleteComment(ATopic: TForumTopic; AComment: TForumComment);

    property Knowledge: TObjectList<TKnowledgePanel> read FKnowledge;
  end;

function CleanUrl(const AUrl: string): string;
function LevelWeight(const ALevel: string): Integer;

var
  Store: TSerchiStore;

implementation

uses
  System.IOUtils, System.JSON, System.DateUtils, System.Generics.Defaults,
  System.Math, System.Variants, Data.DB,
  FireDAC.Stan.Intf, FireDAC.Stan.Option, FireDAC.Stan.Error, FireDAC.Stan.Def,
  FireDAC.Stan.Pool, FireDAC.Stan.Async, FireDAC.Phys.Intf, FireDAC.Phys,
  FireDAC.Phys.SQLite, FireDAC.Phys.SQLiteDef, FireDAC.Stan.ExprFuncs,
  FireDAC.DApt, FireDAC.ConsoleUI.Wait,
  Serchi.Text;

type
  TScored = record
    Res: TResource;
    Score: Integer;
    Index: Integer;
  end;

function CleanUrl(const AUrl: string): string;
begin
  Result := AUrl.Trim.ToLower;
  while Result.EndsWith('/') do
    Result := Result.Substring(0, Result.Length - 1);
end;

function LevelWeight(const ALevel: string): Integer;
begin
  if ALevel = 'A1' then Result := 1
  else if ALevel = 'A2' then Result := 2
  else if ALevel = 'B1' then Result := 3
  else if ALevel = 'B2' then Result := 4
  else if ALevel = 'C1' then Result := 5
  else Result := 0;
end;

function ParseJSONFile(const AFile: string): TJSONValue;
begin
  Result := TJSONObject.ParseJSONValue(TFile.ReadAllText(AFile, TEncoding.UTF8));
  if Result = nil then
    raise Exception.CreateFmt('Invalid JSON file: %s', [AFile]);
end;

function IfThenStr(ACondition: Boolean; const ATrue, AFalse: string): string;
begin
  if ACondition then
    Result := ATrue
  else
    Result := AFalse;
end;

{ Current time as stored in the database: ISO 8601 in UTC, like the Node
  version writes it (so that both sort the same way) }
function NowIso: string;
begin
  Result := DateToISO8601(TTimeZone.Local.ToUniversalTime(Now), True);
end;

{ Removes "-- ..." comment lines from a SQL statement }
function StripSqlComments(const ASql: string): string;
var
  Line: string;
  SB: TStringBuilder;
begin
  SB := TStringBuilder.Create;
  try
    for Line in ASql.Replace(#13, '').Split([#10]) do
      if not Line.Trim.StartsWith('--') then
        SB.Append(Line).Append(#10);
    Result := SB.ToString;
  finally
    SB.Free;
  end;
end;

{ TSearchFilters }

class function TSearchFilters.Default: TSearchFilters;
begin
  Result.Query := '';
  Result.Category := 'all';
  Result.Level := 'all';
  Result.Format := 'all';
  Result.FreeOnly := False;
  Result.SortBy := 'relevance';
  Result.ExactPhrase := '';
  Result.AnyWords := '';
  Result.ExcludeWords := '';
end;

function TSearchFilters.IsEmpty: Boolean;
begin
  Result := (Query = '') and (Category = 'all') and (Level = 'all') and
    (Format = 'all') and not FreeOnly and (ExactPhrase = '') and
    (AnyWords = '') and (ExcludeWords = '');
end;

{ TSerchiStore }

constructor TSerchiStore.Create(const ADatabase, ASchemaFile, ADataDir: string);
begin
  inherited Create;
  FLock := TObject.Create;
  FResources := TObjectList<TResource>.Create(True);
  FKnowledge := TObjectList<TKnowledgePanel>.Create(True);
  FTopics := TObjectList<TForumTopic>.Create(True);
  FUsers := TDictionary<string, TForumUser>.Create;
  LoadSynonyms(TPath.Combine(ADataDir, 'synonyms.json'));
  OpenDatabase(ADatabase, ASchemaFile);
  LoadResources;
  LoadKnowledge;
  LoadForum;
end;

destructor TSerchiStore.Destroy;
begin
  FDB.Free;
  FUsers.Free;
  FTopics.Free;
  FKnowledge.Free;
  FResources.Free;
  FLock.Free;
  inherited;
end;

procedure TSerchiStore.Lock;
begin
  TMonitor.Enter(FLock);
end;

procedure TSerchiStore.Unlock;
begin
  TMonitor.Exit(FLock);
end;

function TSerchiStore.NextId(const APrefix: string): string;
begin
  Inc(FSeq);
  Result := Format('%s-%d-%d', [APrefix, DateTimeToUnix(Now), FSeq]);
end;

procedure TSerchiStore.OpenDatabase(const ADatabase, ASchemaFile: string);
var
  Statement: string;
begin
  FDB := TFDConnection.Create(nil);
  FDB.LoginPrompt := False;
  FDB.DriverName := 'SQLite';
  FDB.Params.Values['Database'] := ADatabase;
  FDB.Params.Values['OpenMode'] := 'CreateUTF8';
  FDB.Params.Values['LockingMode'] := 'Normal';   // let the Node server use the file too
  FDB.Params.Values['StringFormat'] := 'Unicode';
  FDB.Params.Values['ForeignKeys'] := 'On';
  FDB.Open;

  // Create the tables on a new/empty database. Statements in schema.sql are
  // separated by ";" at the end of a line and are all idempotent.
  if (ASchemaFile <> '') and TFile.Exists(ASchemaFile) then
    for Statement in TFile.ReadAllText(ASchemaFile, TEncoding.UTF8).Split([';' + sLineBreak, ';'#10]) do
      if StripSqlComments(Statement).Trim <> '' then
        FDB.ExecSQL(Statement);
end;

procedure TSerchiStore.LoadResources;
var
  Q: TFDQuery;
  ById: TDictionary<string, TResource>;
  Res: TResource;
  Lang: string;
begin
  Q := TFDQuery.Create(nil);
  ById := TDictionary<string, TResource>.Create;
  try
    Q.Connection := FDB;
    Q.Open('SELECT * FROM resources ORDER BY position, rowid');
    while not Q.Eof do
    begin
      Res := TResource.Create;
      Res.Id := Q.FieldByName('id').AsString;
      Res.Title := Q.FieldByName('title').AsString;
      Res.Url := Q.FieldByName('url').AsString;
      Res.DisplayUrl := Q.FieldByName('display_url').AsString;
      Res.Description.Eo := Q.FieldByName('description_eo').AsString;
      Res.Description.Es := Q.FieldByName('description_es').AsString;
      Res.Description.En := Q.FieldByName('description_en').AsString;
      Res.Category := Q.FieldByName('category').AsString;
      Res.Level := Q.FieldByName('level').AsString;
      Res.Format := Q.FieldByName('format').AsString;
      Res.IsFree := Q.FieldByName('is_free').AsInteger <> 0;
      Res.Author := Q.FieldByName('author').AsString;
      Res.Featured := Q.FieldByName('featured').AsInteger <> 0;
      Res.Year := Q.FieldByName('year').AsString;
      Res.StreamType := Q.FieldByName('stream_type').AsString;
      Res.StreamUrl := Q.FieldByName('stream_url').AsString;
      FResources.Add(Res);
      ById.Add(Res.Id, Res);
      Q.Next;
    end;
    Q.Close;

    Q.Open('SELECT resource_id, tag FROM resource_tags ORDER BY resource_id, position');
    while not Q.Eof do
    begin
      if ById.TryGetValue(Q.Fields[0].AsString, Res) then
        Res.Tags := Res.Tags + [Q.Fields[1].AsString];
      Q.Next;
    end;
    Q.Close;

    Q.Open('SELECT resource_id, lang FROM resource_languages ORDER BY resource_id, position');
    while not Q.Eof do
    begin
      if ById.TryGetValue(Q.Fields[0].AsString, Res) then
        Res.Languages := Res.Languages + [Q.Fields[1].AsString];
      Q.Next;
    end;
    Q.Close;

    Q.Open('SELECT resource_id, lang, text FROM resource_features ORDER BY resource_id, lang, position');
    while not Q.Eof do
    begin
      if ById.TryGetValue(Q.Fields[0].AsString, Res) then
      begin
        Lang := Q.Fields[1].AsString;
        if Lang = 'es' then
          Res.Features.Es := Res.Features.Es + [Q.Fields[2].AsString]
        else if Lang = 'en' then
          Res.Features.En := Res.Features.En + [Q.Fields[2].AsString]
        else
          Res.Features.Eo := Res.Features.Eo + [Q.Fields[2].AsString];
      end;
      Q.Next;
    end;
    Q.Close;

    for Res in FResources do
      Res.BuildIndex;
  finally
    ById.Free;
    Q.Free;
  end;
end;

procedure TSerchiStore.LoadKnowledge;
var
  Q: TFDQuery;
  ById: TDictionary<string, TKnowledgePanel>;
  Panel: TKnowledgePanel;
  Fact: TKnowledgeFact;
  Link: TKnowledgeLink;
begin
  Q := TFDQuery.Create(nil);
  ById := TDictionary<string, TKnowledgePanel>.Create;
  try
    Q.Connection := FDB;
    Q.Open('SELECT * FROM knowledge_panels ORDER BY position, id');
    while not Q.Eof do
    begin
      Panel := TKnowledgePanel.Create;
      Panel.Id := Q.FieldByName('id').AsString;
      Panel.Title := Q.FieldByName('title').AsString;
      Panel.Subtitle.Eo := Q.FieldByName('subtitle_eo').AsString;
      Panel.Subtitle.Es := Q.FieldByName('subtitle_es').AsString;
      Panel.Subtitle.En := Q.FieldByName('subtitle_en').AsString;
      Panel.Description.Eo := Q.FieldByName('description_eo').AsString;
      Panel.Description.Es := Q.FieldByName('description_es').AsString;
      Panel.Description.En := Q.FieldByName('description_en').AsString;
      FKnowledge.Add(Panel);
      ById.Add(Panel.Id, Panel);
      Q.Next;
    end;
    Q.Close;

    Q.Open('SELECT panel_id, keyword FROM knowledge_keywords ORDER BY panel_id, position');
    while not Q.Eof do
    begin
      if ById.TryGetValue(Q.Fields[0].AsString, Panel) then
        Panel.Keywords := Panel.Keywords + [Q.Fields[1].AsString];
      Q.Next;
    end;
    Q.Close;

    Q.Open('SELECT panel_id, label_eo, label_es, label_en, value FROM knowledge_facts ORDER BY panel_id, position');
    while not Q.Eof do
    begin
      if ById.TryGetValue(Q.Fields[0].AsString, Panel) then
      begin
        Fact.Label_.Eo := Q.Fields[1].AsString;
        Fact.Label_.Es := Q.Fields[2].AsString;
        Fact.Label_.En := Q.Fields[3].AsString;
        Fact.Value := Q.Fields[4].AsString;
        Panel.Facts := Panel.Facts + [Fact];
      end;
      Q.Next;
    end;
    Q.Close;

    Q.Open('SELECT panel_id, title, url FROM knowledge_links ORDER BY panel_id, position');
    while not Q.Eof do
    begin
      if ById.TryGetValue(Q.Fields[0].AsString, Panel) then
      begin
        Link.Title := Q.Fields[1].AsString;
        Link.Url := Q.Fields[2].AsString;
        Panel.Links := Panel.Links + [Link];
      end;
      Q.Next;
    end;
    Q.Close;
  finally
    ById.Free;
    Q.Free;
  end;
end;

procedure TSerchiStore.LoadForum;
var
  Q: TFDQuery;
  Users: TDictionary<string, TForumUser>;
  User: TForumUser;
  Topic: TForumTopic;
  Comment: TForumComment;
  Topics: TDictionary<string, TForumTopic>;
  Comments: TDictionary<string, TForumComment>;

  function UserOf(const AId: string): TForumUser;
  begin
    if not Users.TryGetValue(AId, Result) then
    begin
      Result := Default(TForumUser);
      Result.Id := AId;
      Result.Name := AId;
      Result.Role := 'learner';
      Result.AvatarColor := 'bg-emerald-600';
    end;
  end;

begin
  Q := TFDQuery.Create(nil);
  Users := TDictionary<string, TForumUser>.Create;
  Topics := TDictionary<string, TForumTopic>.Create;
  Comments := TDictionary<string, TForumComment>.Create;
  try
    Q.Connection := FDB;
    // user_current goes last, so it is the user a learner posts as
    Q.Open('SELECT * FROM forum_users ORDER BY id = ''user_current'', id');
    while not Q.Eof do
    begin
      User := Default(TForumUser);
      User.Id := Q.FieldByName('id').AsString;
      User.Name := Q.FieldByName('name').AsString;
      User.Role := Q.FieldByName('role').AsString;
      User.AvatarColor := Q.FieldByName('avatar_color').AsString;
      User.LevelBadge := Q.FieldByName('level_badge').AsString;
      Users.Add(User.Id, User);
      FUsers.AddOrSetValue(User.Role, User);
      Q.Next;
    end;
    Q.Close;

    Q.Open('SELECT * FROM forum_topics ORDER BY created_at DESC');
    while not Q.Eof do
    begin
      Topic := TForumTopic.Create;
      Topic.Id := Q.FieldByName('id').AsString;
      Topic.Title := Q.FieldByName('title').AsString;
      Topic.Content := Q.FieldByName('content').AsString;
      Topic.Author := UserOf(Q.FieldByName('author_id').AsString);
      Topic.Level := Q.FieldByName('level').AsString;
      Topic.Category := Q.FieldByName('category').AsString;
      Topic.CreatedAt := ISO8601ToDate(Q.FieldByName('created_at').AsString, False);
      Topic.UpdatedAt := ISO8601ToDate(Q.FieldByName('updated_at').AsString, False);
      Topic.Views := Q.FieldByName('views').AsInteger;
      Topic.Likes := Q.FieldByName('likes').AsInteger;
      Topic.IsPinned := Q.FieldByName('is_pinned').AsInteger <> 0;
      Topic.IsLocked := Q.FieldByName('is_locked').AsInteger <> 0;
      FTopics.Add(Topic);
      Topics.Add(Topic.Id, Topic);
      Q.Next;
    end;
    Q.Close;

    Q.Open('SELECT topic_id, tag FROM forum_topic_tags ORDER BY topic_id, position');
    while not Q.Eof do
    begin
      if Topics.TryGetValue(Q.Fields[0].AsString, Topic) then
        Topic.Tags := Topic.Tags + [Q.Fields[1].AsString];
      Q.Next;
    end;
    Q.Close;

    Q.Open('SELECT * FROM forum_comments ORDER BY created_at, rowid');
    while not Q.Eof do
    begin
      if Topics.TryGetValue(Q.FieldByName('topic_id').AsString, Topic) then
      begin
        Comment := TForumComment.Create;
        Comment.Id := Q.FieldByName('id').AsString;
        Comment.TopicId := Topic.Id;
        Comment.Author := UserOf(Q.FieldByName('author_id').AsString);
        Comment.Content := Q.FieldByName('content').AsString;
        Comment.CreatedAt := ISO8601ToDate(Q.FieldByName('created_at').AsString, False);
        Comment.Likes := Q.FieldByName('likes').AsInteger;
        Comment.IsModeratorNote := Q.FieldByName('is_moderator_note').AsInteger <> 0;
        Topic.Comments.Add(Comment);
        Comments.Add(Comment.Id, Comment);
      end;
      Q.Next;
    end;
    Q.Close;

    Q.Open('SELECT topic_id, visitor_id FROM forum_topic_likes');
    while not Q.Eof do
    begin
      if Topics.TryGetValue(Q.Fields[0].AsString, Topic) then
        Topic.LikedBy.Add(Q.Fields[1].AsString);
      Q.Next;
    end;
    Q.Close;

    Q.Open('SELECT comment_id, visitor_id FROM forum_comment_likes');
    while not Q.Eof do
    begin
      if Comments.TryGetValue(Q.Fields[0].AsString, Comment) then
        Comment.LikedBy.Add(Q.Fields[1].AsString);
      Q.Next;
    end;
    Q.Close;
  finally
    Comments.Free;
    Topics.Free;
    Users.Free;
    Q.Free;
  end;
end;

function TSerchiStore.Search(const AFilters: TSearchFilters;
  AResults: TList<TResource>): TKnowledgePanel;
var
  RawQuery, NormQ, ExactPhrase, W: string;
  ExcludeWords, AnyWords, Tokens: TArray<string>;
  Res: TResource;
  Scored: TList<TScored>;
  S: TScored;
  Tag: string;
  Match: Boolean;
  KP: TKnowledgePanel;
  KW, NormKW: string;
  I: Integer;

  function Contains(const AWord: string): Boolean;
  begin
    Result := Res.SearchText.Contains(AWord) or
      Res.NormalizedText.Contains(NormalizeText(AWord));
  end;

begin
  RawQuery := AFilters.Query.Trim;
  NormQ := NormalizeText(RawQuery);
  ExactPhrase := AFilters.ExactPhrase.Trim.ToLower;
  ExcludeWords := SplitWords(AFilters.ExcludeWords);
  AnyWords := SplitWords(AFilters.AnyWords);
  if RawQuery <> '' then
    Tokens := ExpandTokens(RawQuery)
  else
    Tokens := nil;

  Scored := TList<TScored>.Create;
  Lock;
  try
    for I := 0 to FResources.Count - 1 do
    begin
      Res := FResources[I];

      if (AFilters.Level <> 'all') and (Res.Level <> 'all') and (Res.Level <> AFilters.Level) then
        Continue;
      if (AFilters.Category <> 'all') and (Res.Category <> AFilters.Category) then
        Continue;
      if (AFilters.Format <> 'all') and (Res.Format <> AFilters.Format) then
        Continue;
      if AFilters.FreeOnly and not Res.IsFree then
        Continue;

      Match := True;
      for W in ExcludeWords do
        if Contains(W) then
        begin
          Match := False;
          Break;
        end;
      if not Match then
        Continue;

      if (ExactPhrase <> '') and not Contains(ExactPhrase) then
        Continue;

      if Length(AnyWords) > 0 then
      begin
        Match := False;
        for W in AnyWords do
          if Contains(W) then
          begin
            Match := True;
            Break;
          end;
        if not Match then
          Continue;
      end;

      if Length(Tokens) > 0 then
      begin
        Match := False;
        for W in Tokens do
          if Res.SearchText.Contains(W) or Res.NormalizedText.Contains(W) then
          begin
            Match := True;
            Break;
          end;
        if not Match then
          Continue;
      end;

      S.Res := Res;
      S.Index := I;
      S.Score := 0;
      if Res.Featured then
        Inc(S.Score, 15);
      if NormQ <> '' then
      begin
        if Res.NormalizedTitle.Contains(NormQ) then
          Inc(S.Score, 50);
        for Tag in Res.NormalizedTags do
          if Tag.Contains(NormQ) then
          begin
            Inc(S.Score, 25);
            Break;
          end;
      end;
      Scored.Add(S);
    end;
  finally
    Unlock;
  end;

  try
    // Sorting is made stable by falling back to the original index.
    if AFilters.SortBy = 'alpha' then
      Scored.Sort(TComparer<TScored>.Construct(
        function(const A, B: TScored): Integer
        begin
          Result := CompareText(A.Res.Title, B.Res.Title);
          if Result = 0 then
            Result := A.Index - B.Index;
        end))
    else if AFilters.SortBy = 'level' then
      Scored.Sort(TComparer<TScored>.Construct(
        function(const A, B: TScored): Integer
        begin
          Result := LevelWeight(A.Res.Level) - LevelWeight(B.Res.Level);
          if Result = 0 then
            Result := A.Index - B.Index;
        end))
    else
      Scored.Sort(TComparer<TScored>.Construct(
        function(const A, B: TScored): Integer
        begin
          Result := B.Score - A.Score;
          if Result = 0 then
            Result := A.Index - B.Index;
        end));

    for S in Scored do
      AResults.Add(S.Res);
  finally
    Scored.Free;
  end;

  // Knowledge panel match
  Result := nil;
  if NormQ <> '' then
    for KP in FKnowledge do
    begin
      for KW in KP.Keywords do
      begin
        NormKW := NormalizeText(KW);
        if NormQ.Contains(NormKW) or NormKW.Contains(NormQ) then
          Exit(KP);
      end;
    end;
end;

function TSerchiStore.FindResource(const AId: string): TResource;
var
  R: TResource;
begin
  Result := nil;
  Lock;
  try
    for R in FResources do
      if R.Id = AId then
        Exit(R);
  finally
    Unlock;
  end;
end;

function TSerchiStore.RandomFeatured: TResource;
var
  Pool: TList<TResource>;
  R: TResource;
begin
  Pool := TList<TResource>.Create;
  Lock;
  try
    for R in FResources do
      if R.Featured then
        Pool.Add(R);
    if Pool.Count = 0 then
      Pool.AddRange(FResources);
    if Pool.Count = 0 then
      Exit(nil);
    Result := Pool[Random(Pool.Count)];
  finally
    Unlock;
    Pool.Free;
  end;
end;

function TSerchiStore.UrlExists(const AUrl: string): Boolean;
var
  R: TResource;
  Clean: string;
begin
  Clean := CleanUrl(AUrl);
  Result := False;
  Lock;
  try
    for R in FResources do
      if CleanUrl(R.Url) = Clean then
        Exit(True);
  finally
    Unlock;
  end;
end;

function TSerchiStore.AddResource(AResource: TResource; const ASource: string): Boolean;
var
  Position, I: Integer;
  YearValue: Variant;
begin
  Lock;
  try
    Result := not UrlExists(AResource.Url); // TMonitor is re-entrant
    if not Result then
      Exit;
    if AResource.Id = '' then
      AResource.Id := NextId(IfThenStr(ASource = 'crawled', 'crawled', 'custom'));

    // New additions are listed first, as in the React version
    Position := FDB.ExecSQLScalar('SELECT COALESCE(MIN(position), 0) - 1 FROM resources');
    if AResource.Year = '' then
      YearValue := Null
    else
      YearValue := AResource.Year;

    FDB.StartTransaction;
    try
      FDB.ExecSQL('INSERT INTO resources (id, title, url, url_key, display_url, ' +
        'description_eo, description_es, description_en, category, level, format, ' +
        'is_free, author, featured, year, source, position) ' +
        'VALUES (:id, :title, :url, :url_key, :display_url, :d_eo, :d_es, :d_en, ' +
        ':category, :level, :format, :is_free, :author, :featured, :year, :source, :position)',
        [AResource.Id, AResource.Title, AResource.Url, CleanUrl(AResource.Url),
         AResource.DisplayUrl, AResource.Description.Eo, AResource.Description.Es,
         AResource.Description.En, AResource.Category, AResource.Level, AResource.Format,
         Ord(AResource.IsFree), AResource.Author, Ord(AResource.Featured), YearValue,
         ASource, Position]);
      for I := 0 to High(AResource.Tags) do
        FDB.ExecSQL('INSERT INTO resource_tags (resource_id, position, tag) VALUES (:id, :pos, :tag)',
          [AResource.Id, I, AResource.Tags[I]]);
      FDB.Commit;
    except
      FDB.Rollback;
      raise;
    end;

    AResource.BuildIndex;
    FResources.Insert(0, AResource);
  finally
    Unlock;
  end;
end;

function TSerchiStore.ResourceCount: Integer;
begin
  Lock;
  try
    Result := FResources.Count;
  finally
    Unlock;
  end;
end;

function TSerchiStore.UserForRole(const ARole: string): TForumUser;
begin
  Lock;
  try
    if not FUsers.TryGetValue(ARole, Result) then
    begin
      Result := Default(TForumUser);
      Result.Id := 'user_current';
      Result.Name := 'VerdaStelulo';
      Result.Role := 'learner';
      Result.AvatarColor := 'bg-emerald-600';
      Result.LevelBadge := 'A2';
    end;
  finally
    Unlock;
  end;
end;

function TSerchiStore.FindTopic(const AId: string): TForumTopic;
var
  T: TForumTopic;
begin
  Result := nil;
  for T in FTopics do
    if T.Id = AId then
      Exit(T);
end;

procedure TSerchiStore.ListTopics(const ACategory, ALevel, AQuery: string;
  AResults: TList<TForumTopic>);
var
  T: TForumTopic;
  Q: string;
begin
  Q := NormalizeText(AQuery);
  for T in FTopics do
  begin
    if (ACategory <> '') and (ACategory <> 'all') and (T.Category <> ACategory) then
      Continue;
    if (ALevel <> '') and (ALevel <> 'all') and (T.Level <> 'all') and (T.Level <> ALevel) then
      Continue;
    if (Q <> '') and not NormalizeText(T.Title + ' ' + T.Content + ' ' +
      string.Join(' ', T.Tags)).Contains(Q) then
      Continue;
    AResults.Add(T);
  end;
  // Pinned first, then most recently updated
  AResults.Sort(TComparer<TForumTopic>.Construct(
    function(const A, B: TForumTopic): Integer
    begin
      Result := Ord(B.IsPinned) - Ord(A.IsPinned);
      if Result = 0 then
        Result := CompareValue(B.UpdatedAt, A.UpdatedAt);
    end));
end;

function TSerchiStore.CreateTopic(const AUser: TForumUser; const ATitle, AContent,
  ACategory, ALevel: string; const ATags: TArray<string>; const AVisitor: string): TForumTopic;
var
  Stamp: string;
  I: Integer;
begin
  Result := TForumTopic.Create;
  try
    Result.Id := NextId('topic');
    Result.Title := ATitle;
    Result.Content := AContent;
    Result.Author := AUser;
    Result.Category := ACategory;
    Result.Level := ALevel;
    Result.Tags := ATags;
    Stamp := NowIso;
    Result.CreatedAt := ISO8601ToDate(Stamp, False);
    Result.UpdatedAt := Result.CreatedAt;
    Result.Views := 1;
    Result.Likes := 1;
    Result.LikedBy.Add(AVisitor);

    FDB.StartTransaction;
    try
      FDB.ExecSQL('INSERT INTO forum_topics (id, title, content, author_id, level, category, ' +
        'views, likes, created_at, updated_at) VALUES (:id, :title, :content, :author, :level, ' +
        ':category, 1, 1, :created, :updated)',
        [Result.Id, ATitle, AContent, AUser.Id, ALevel, ACategory, Stamp, Stamp]);
      for I := 0 to High(ATags) do
        FDB.ExecSQL('INSERT INTO forum_topic_tags (topic_id, position, tag) VALUES (:id, :pos, :tag)',
          [Result.Id, I, ATags[I]]);
      FDB.ExecSQL('INSERT INTO forum_topic_likes (topic_id, visitor_id) VALUES (:id, :visitor)',
        [Result.Id, AVisitor]);
      FDB.Commit;
    except
      FDB.Rollback;
      raise;
    end;
  except
    Result.Free;
    raise;
  end;
  FTopics.Insert(0, Result);
end;

function TSerchiStore.AddComment(ATopic: TForumTopic; const AUser: TForumUser;
  const AContent: string; AModNote: Boolean): TForumComment;
var
  Id, Stamp: string;
begin
  Id := NextId('comm');
  Stamp := NowIso;
  FDB.StartTransaction;
  try
    FDB.ExecSQL('INSERT INTO forum_comments (id, topic_id, author_id, content, ' +
      'is_moderator_note, created_at) VALUES (:id, :topic, :author, :content, :modnote, :created)',
      [Id, ATopic.Id, AUser.Id, AContent, Ord(AModNote), Stamp]);
    FDB.ExecSQL('UPDATE forum_topics SET updated_at = :updated WHERE id = :id', [Stamp, ATopic.Id]);
    FDB.Commit;
  except
    FDB.Rollback;
    raise;
  end;
  Result := TForumComment.Create;
  Result.Id := Id;
  Result.TopicId := ATopic.Id;
  Result.Author := AUser;
  Result.Content := AContent;
  Result.CreatedAt := ISO8601ToDate(Stamp, False);
  Result.IsModeratorNote := AModNote;
  ATopic.Comments.Add(Result);
  ATopic.UpdatedAt := Result.CreatedAt;
end;

procedure TSerchiStore.ToggleTopicLike(ATopic: TForumTopic; const AVisitor: string);
begin
  if ATopic.LikedBy.Contains(AVisitor) then
  begin
    FDB.ExecSQL('DELETE FROM forum_topic_likes WHERE topic_id = :id AND visitor_id = :visitor',
      [ATopic.Id, AVisitor]);
    ATopic.LikedBy.Remove(AVisitor);
    ATopic.Likes := Max(0, ATopic.Likes - 1);
  end
  else
  begin
    FDB.ExecSQL('INSERT OR IGNORE INTO forum_topic_likes (topic_id, visitor_id) VALUES (:id, :visitor)',
      [ATopic.Id, AVisitor]);
    ATopic.LikedBy.Add(AVisitor);
    Inc(ATopic.Likes);
  end;
  FDB.ExecSQL('UPDATE forum_topics SET likes = :likes WHERE id = :id', [ATopic.Likes, ATopic.Id]);
end;

procedure TSerchiStore.ToggleCommentLike(AComment: TForumComment; const AVisitor: string);
begin
  if AComment.LikedBy.Contains(AVisitor) then
  begin
    FDB.ExecSQL('DELETE FROM forum_comment_likes WHERE comment_id = :id AND visitor_id = :visitor',
      [AComment.Id, AVisitor]);
    AComment.LikedBy.Remove(AVisitor);
    AComment.Likes := Max(0, AComment.Likes - 1);
  end
  else
  begin
    FDB.ExecSQL('INSERT OR IGNORE INTO forum_comment_likes (comment_id, visitor_id) VALUES (:id, :visitor)',
      [AComment.Id, AVisitor]);
    AComment.LikedBy.Add(AVisitor);
    Inc(AComment.Likes);
  end;
  FDB.ExecSQL('UPDATE forum_comments SET likes = :likes WHERE id = :id', [AComment.Likes, AComment.Id]);
end;

procedure TSerchiStore.CountView(ATopic: TForumTopic);
begin
  Inc(ATopic.Views);
  FDB.ExecSQL('UPDATE forum_topics SET views = :views WHERE id = :id', [ATopic.Views, ATopic.Id]);
end;

procedure TSerchiStore.ToggleTopicFlag(ATopic: TForumTopic; const AFlag: string);
begin
  if AFlag = 'pin' then
  begin
    ATopic.IsPinned := not ATopic.IsPinned;
    FDB.ExecSQL('UPDATE forum_topics SET is_pinned = :value WHERE id = :id',
      [Ord(ATopic.IsPinned), ATopic.Id]);
  end
  else if AFlag = 'lock' then
  begin
    ATopic.IsLocked := not ATopic.IsLocked;
    FDB.ExecSQL('UPDATE forum_topics SET is_locked = :value WHERE id = :id',
      [Ord(ATopic.IsLocked), ATopic.Id]);
  end;
end;

procedure TSerchiStore.DeleteTopic(ATopic: TForumTopic);
begin
  // Tags, comments and likes go with it (ON DELETE CASCADE)
  FDB.ExecSQL('DELETE FROM forum_topics WHERE id = :id', [ATopic.Id]);
  FTopics.Remove(ATopic);
end;

procedure TSerchiStore.DeleteComment(ATopic: TForumTopic; AComment: TForumComment);
begin
  FDB.ExecSQL('DELETE FROM forum_comments WHERE id = :id', [AComment.Id]);
  ATopic.Comments.Remove(AComment);
end;

end.
