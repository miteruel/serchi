{ Copyright (C) 2026 Antonio Alcázar Ruiz (MiTeruel) <mrgarciagarcia@gmail.com>
  Part of the PluTony project. Licensed under the GNU GPL v3.0 or later;
  see LICENSE for the full text. }

unit Serchi.Store;

{ Data store shared by every WebBroker module instance.
  Resources and knowledge panels are loaded from the SQLite database shared
  with the Node/React version (data/serchi.db, schema in data/schema.sql) and
  cached in memory for searching; new resources are written to the database.
  The forum (tables forum_*) is loaded the same way and every change to it is
  written to the database as well. When another program (the Node server)
  writes to the database, RefreshIfChanged reloads everything.
  Implements the search/ranking algorithm (port of the useMemo block in
  src/App.tsx). Access to mutable state is serialized with Lock/Unlock. }

interface

uses
  System.SysUtils, System.Classes, System.Generics.Collections, System.JSON,
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

  { A published course made with the course editor of the Node version
    (table courses); its content is JSON, rendered by Serchi.Courses }
  TCourseInfo = record
    Slug: string;
    Lang: string;   // es | en: language of the explanations
    Title: string;
  end;

  { An object replaced by a reload, freed only after a grace period because a
    request may still be rendering it (resources are used outside Lock) }
  TRetiredObject = record
    Obj: TObject;
    At: TDateTime;
  end;

  TSerchiStore = class
  private
    FLock: TObject;
    FDataVersion: Int64;
    FRetired: TList<TRetiredObject>;
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
    function DataVersion: Int64;
    procedure Retire(AObj: TObject);
  public
    { ADatabase: SQLite file; ADataDir: folder with synonyms.json;
      ASchemaFile: data/schema.sql, applied if the database has no tables }
    constructor Create(const ADatabase, ASchemaFile, ADataDir: string);
    destructor Destroy; override;

    procedure Lock;
    procedure Unlock;
    { Reloads resources, knowledge panels and forum if another connection
      (e.g. the Node server) changed the database since the last load.
      Cheap when nothing changed: one PRAGMA data_version query. }
    procedure RefreshIfChanged;

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

    // Courses and recordings made in the Node version (read only here)
    function PublishedCourses: TArray<TCourseInfo>;
    function FindPublishedCourse(const ASlug: string; out ACourse: TCourseInfo;
      out AContent: string): Boolean;
    function CourseImage(const AId: string; out AMime: string; out AData: TBytes): Boolean;
    function ApprovedRecording(const AId: string; out AMime: string; out AData: TBytes): Boolean;
    { Approved recordings, newest first: Key = word slug, Value = recording id }
    function ApprovedRecordings: TArray<TPair<string, string>>;
    { Synthetic voice of the editor courses' words (table synthetic_audio,
      made by the Node server or npm run audio:tts): slugs and MP3 audio }
    function SyntheticAudioSlugs: TArray<string>;
    function SyntheticAudio(const ASlug: string; out AData: TBytes): Boolean;
    procedure SaveSyntheticAudio(const ASlug, AText: string; const AData: TBytes);
    { Words whose synthetic voice a teacher removed (table muted_voices) }
    function MutedVoices: TArray<string>;
    procedure MuteVoice(const ASlug: string);
    function UnmuteVoice(const ASlug: string): Boolean;

    // Course editor and recorder (the JSON API used by public/editor.html and
    // public/grabar.html, same as server/courses.ts and server/audio.ts)
    function NewId(const APrefix: string): string;
    { JSON array of courses (without their content) }
    function CoursesJson(AOnlyPublished: Boolean): string;
    { JSON of one course with its content; '' if it does not exist }
    function CourseJson(const AId: string): string;
    { Returns the new course id }
    function CreateCourse(const ATitle, ALang: string): string;
    { Saves the whole course as sent by the editor; False if it does not exist }
    function UpdateCourse(const AId: string; AInput: TJSONObject): Boolean;
    function DeleteCourse(const AId: string): Boolean;
    function CourseForPreview(const AId: string; out ACourse: TCourseInfo;
      out AImageIds: TArray<string>): Boolean;
    { Returns the new picture id; '' if the course does not exist }
    function AddCourseImage(const ACourseId, AMime: string; const AData: TBytes): string;
    function PublishedCourseContents: TArray<string>;
    { Published courses: Key = title, Value = content JSON, ordered by title }
    function PublishedCourseTitledContents: TArray<TPair<string, string>>;
    function RecordingsByVisitorToday(const AVisitor: string): Integer;
    function PendingRecordingCount: Integer;
    { Stores a pending recording; returns its id }
    function AddRecording(const ASlug, AText, AMime: string; const AData: TBytes;
      const AVisitor, AName: string): string;
    function PendingRecordingsJson: string;
    { Speakers to thank on the course pages, as GET /api/recordings/credits:
      [{name, slugs}], only those who asked for it, most words first }
    procedure AddRecordingCredit(const AId, AName: string);
    function RecordingCreditsJson: string;
    function RecordingAudio(const AId: string; AIncludePending: Boolean; out AMime: string;
      out AData: TBytes): Boolean;
    function ApproveRecording(const AId: string): Boolean;
    function DeleteRecording(const AId: string): Boolean;

    property Knowledge: TObjectList<TKnowledgePanel> read FKnowledge;
  end;

function CleanUrl(const AUrl: string): string;
function LevelWeight(const ALevel: string): Integer;

var
  Store: TSerchiStore;

implementation

uses
  System.IOUtils, System.DateUtils, System.Generics.Defaults,
  System.Math, System.Variants, Data.DB,
  FireDAC.Stan.Intf, FireDAC.Stan.Option, FireDAC.Stan.Error, FireDAC.Stan.Def,
  FireDAC.Stan.Pool, FireDAC.Stan.Async, FireDAC.Phys.Intf, FireDAC.Phys,
  FireDAC.Phys.SQLite, FireDAC.Phys.SQLiteDef, FireDAC.Stan.ExprFuncs,
  FireDAC.DApt, FireDAC.ConsoleUI.Wait,
  Serchi.Text, Serchi.Courses;

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
  FRetired := TList<TRetiredObject>.Create;
  LoadSynonyms(TPath.Combine(ADataDir, 'synonyms.json'));
  OpenDatabase(ADatabase, ASchemaFile);
  LoadResources;
  LoadKnowledge;
  LoadForum;
  FDataVersion := DataVersion;
end;

destructor TSerchiStore.Destroy;
var
  R: TRetiredObject;
begin
  for R in FRetired do
    R.Obj.Free;
  FRetired.Free;
  FDB.Free;
  FUsers.Free;
  FTopics.Free;
  FKnowledge.Free;
  FResources.Free;
  FLock.Free;
  inherited;
end;

function TSerchiStore.DataVersion: Int64;
begin
  // Changes only when another connection commits to the database file
  Result := FDB.ExecSQLScalar('PRAGMA data_version');
end;

procedure TSerchiStore.Retire(AObj: TObject);
var
  R: TRetiredObject;
  I: Integer;
begin
  for I := FRetired.Count - 1 downto 0 do
    if FRetired[I].At < IncMinute(Now, -5) then
    begin
      FRetired[I].Obj.Free;
      FRetired.Delete(I);
    end;
  R.Obj := AObj;
  R.At := Now;
  FRetired.Add(R);
end;

procedure TSerchiStore.RefreshIfChanged;
var
  Version: Int64;
begin
  Lock;
  try
    Version := DataVersion;
    if Version = FDataVersion then
      Exit;
    // Load into fresh lists; the old ones may still be in use by other requests
    Retire(FResources);
    Retire(FKnowledge);
    Retire(FTopics);
    FResources := TObjectList<TResource>.Create(True);
    FKnowledge := TObjectList<TKnowledgePanel>.Create(True);
    FTopics := TObjectList<TForumTopic>.Create(True);
    FUsers.Clear;
    LoadResources;
    LoadKnowledge;
    LoadForum;
    FDataVersion := Version;
  finally
    Unlock;
  end;
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

{ Courses and recordings (tables courses, course_images, recordings) }

function TSerchiStore.PublishedCourses: TArray<TCourseInfo>;
var
  Q: TFDQuery;
  C: TCourseInfo;
  List: TList<TCourseInfo>;
begin
  Lock;
  Q := TFDQuery.Create(nil);
  List := TList<TCourseInfo>.Create;
  try
    Q.Connection := FDB;
    Q.Open('SELECT slug, lang, title FROM courses WHERE published = 1 ORDER BY title');
    while not Q.Eof do
    begin
      C.Slug := Q.Fields[0].AsString;
      C.Lang := Q.Fields[1].AsString;
      C.Title := Q.Fields[2].AsString;
      List.Add(C);
      Q.Next;
    end;
    Result := List.ToArray;
  finally
    List.Free;
    Q.Free;
    Unlock;
  end;
end;

function TSerchiStore.FindPublishedCourse(const ASlug: string; out ACourse: TCourseInfo;
  out AContent: string): Boolean;
var
  Q: TFDQuery;
begin
  Lock;
  Q := TFDQuery.Create(nil);
  try
    Q.Connection := FDB;
    Q.Open('SELECT slug, lang, title, content FROM courses WHERE slug = :slug AND published = 1', [ASlug]);
    Result := not Q.Eof;
    if Result then
    begin
      ACourse.Slug := Q.Fields[0].AsString;
      ACourse.Lang := Q.Fields[1].AsString;
      ACourse.Title := Q.Fields[2].AsString;
      AContent := Q.Fields[3].AsString;
    end;
  finally
    Q.Free;
    Unlock;
  end;
end;

function TSerchiStore.CourseImage(const AId: string; out AMime: string; out AData: TBytes): Boolean;
var
  Q: TFDQuery;
begin
  Lock;
  Q := TFDQuery.Create(nil);
  try
    Q.Connection := FDB;
    Q.Open('SELECT mime, data FROM course_images WHERE id = :id', [AId]);
    Result := not Q.Eof;
    if Result then
    begin
      AMime := Q.Fields[0].AsString;
      AData := Q.Fields[1].AsBytes;
    end;
  finally
    Q.Free;
    Unlock;
  end;
end;

function TSerchiStore.ApprovedRecording(const AId: string; out AMime: string; out AData: TBytes): Boolean;
begin
  // Pending recordings are only for moderators
  Result := RecordingAudio(AId, False, AMime, AData);
end;

function TSerchiStore.ApprovedRecordings: TArray<TPair<string, string>>;
var
  Q: TFDQuery;
  List: TList<TPair<string, string>>;
begin
  Lock;
  Q := TFDQuery.Create(nil);
  List := TList<TPair<string, string>>.Create;
  try
    Q.Connection := FDB;
    Q.Open('SELECT slug, id FROM recordings WHERE status = ''approved'' ' +
      'ORDER BY reviewed_at DESC, created_at DESC');
    while not Q.Eof do
    begin
      List.Add(TPair<string, string>.Create(Q.Fields[0].AsString, Q.Fields[1].AsString));
      Q.Next;
    end;
    Result := List.ToArray;
  finally
    List.Free;
    Q.Free;
    Unlock;
  end;
end;

function TSerchiStore.SyntheticAudioSlugs: TArray<string>;
var
  Q: TFDQuery;
  List: TList<string>;
begin
  Lock;
  Q := TFDQuery.Create(nil);
  List := TList<string>.Create;
  try
    Q.Connection := FDB;
    Q.Open('SELECT slug FROM synthetic_audio');
    while not Q.Eof do
    begin
      List.Add(Q.Fields[0].AsString);
      Q.Next;
    end;
    Result := List.ToArray;
  finally
    List.Free;
    Q.Free;
    Unlock;
  end;
end;

function TSerchiStore.SyntheticAudio(const ASlug: string; out AData: TBytes): Boolean;
var
  Q: TFDQuery;
begin
  Lock;
  Q := TFDQuery.Create(nil);
  try
    Q.Connection := FDB;
    Q.Open('SELECT audio FROM synthetic_audio WHERE slug = :slug', [ASlug]);
    Result := not Q.Eof;
    if Result then
      AData := Q.Fields[0].AsBytes;
  finally
    Q.Free;
    Unlock;
  end;
end;

function TSerchiStore.MutedVoices: TArray<string>;
var
  Q: TFDQuery;
  List: TList<string>;
begin
  Lock;
  Q := TFDQuery.Create(nil);
  List := TList<string>.Create;
  try
    Q.Connection := FDB;
    Q.Open('SELECT slug FROM muted_voices ORDER BY slug');
    while not Q.Eof do
    begin
      List.Add(Q.Fields[0].AsString);
      Q.Next;
    end;
    Result := List.ToArray;
  finally
    List.Free;
    Q.Free;
    Unlock;
  end;
end;

procedure TSerchiStore.MuteVoice(const ASlug: string);
begin
  Lock;
  try
    FDB.ExecSQL('INSERT OR IGNORE INTO muted_voices (slug) VALUES (:slug)', [ASlug]);
    FDB.ExecSQL('DELETE FROM synthetic_audio WHERE slug = :slug', [ASlug]);
  finally
    Unlock;
  end;
end;

function TSerchiStore.UnmuteVoice(const ASlug: string): Boolean;
begin
  Lock;
  try
    Result := FDB.ExecSQL('DELETE FROM muted_voices WHERE slug = :slug', [ASlug]) > 0;
  finally
    Unlock;
  end;
end;

{ Course editor and recorder }

function TSerchiStore.NewId(const APrefix: string): string;
begin
  Result := APrefix + '-' + TGUID.NewGuid.ToString.Replace('{', '').Replace('}', '')
    .Replace('-', '').ToLower;
end;

function InputStr(AObj: TJSONObject; const AName: string; AMax: Integer): string;
var
  V: TJSONValue;
begin
  Result := '';
  if AObj = nil then
    Exit;
  V := AObj.GetValue(AName);
  if V is TJSONString then
    Result := Copy(TJSONString(V).Value.Trim, 1, AMax);
end;

function CourseRowJson(Q: TFDQuery; AWithContent: Boolean): TJSONObject;
var
  Content: TJSONValue;
begin
  Result := TJSONObject.Create;
  Result.AddPair('id', Q.FieldByName('id').AsString);
  Result.AddPair('slug', Q.FieldByName('slug').AsString);
  Result.AddPair('lang', Q.FieldByName('lang').AsString);
  Result.AddPair('title', Q.FieldByName('title').AsString);
  Result.AddPair('published', TJSONBool.Create(Q.FieldByName('published').AsInteger <> 0));
  if AWithContent then
  begin
    Content := TJSONObject.ParseJSONValue(Q.FieldByName('content').AsString);
    if Content = nil then
      Content := TJSONObject.Create;
    Result.AddPair('content', Content);
  end;
  Result.AddPair('updatedAt', Q.FieldByName('updated_at').AsString);
end;

function TSerchiStore.CoursesJson(AOnlyPublished: Boolean): string;
var
  Q: TFDQuery;
  List: TJSONArray;
begin
  Lock;
  Q := TFDQuery.Create(nil);
  List := TJSONArray.Create;
  try
    Q.Connection := FDB;
    if AOnlyPublished then
      Q.Open('SELECT id, slug, lang, title, published, updated_at FROM courses WHERE published = 1 ORDER BY title')
    else
      Q.Open('SELECT id, slug, lang, title, published, updated_at FROM courses ORDER BY title');
    while not Q.Eof do
    begin
      List.AddElement(CourseRowJson(Q, False));
      Q.Next;
    end;
    Result := List.ToJSON;
  finally
    List.Free;
    Q.Free;
    Unlock;
  end;
end;

function TSerchiStore.CourseJson(const AId: string): string;
var
  Q: TFDQuery;
  Obj: TJSONObject;
begin
  Result := '';
  Lock;
  Q := TFDQuery.Create(nil);
  try
    Q.Connection := FDB;
    Q.Open('SELECT * FROM courses WHERE id = :id', [AId]);
    if not Q.Eof then
    begin
      Obj := CourseRowJson(Q, True);
      try
        Result := Obj.ToJSON;
      finally
        Obj.Free;
      end;
    end;
  finally
    Q.Free;
    Unlock;
  end;
end;

{ A free address for the course: base, base-2, base-3... }
function UniqueCourseSlug(ADB: TFDConnection; const AWanted, AExceptId: string): string;
var
  Base, Owner: string;
  N: Integer;
begin
  Base := CourseSlug(AWanted);
  if Base = '' then
    Base := 'kurso';
  Result := Base;
  N := 2;
  while True do
  begin
    Owner := VarToStr(ADB.ExecSQLScalar('SELECT id FROM courses WHERE slug = :slug', [Result]));
    if (Owner = '') or (Owner = AExceptId) then
      Exit;
    Result := Base + '-' + IntToStr(N);
    Inc(N);
  end;
end;

function TSerchiStore.CreateCourse(const ATitle, ALang: string): string;
var
  Lang: string;
begin
  Lang := 'es';
  if ALang = 'en' then
    Lang := 'en';
  Lock;
  try
    Result := NewId('course');
    FDB.ExecSQL('INSERT INTO courses (id, slug, lang, title, content) VALUES (:id, :slug, :lang, :title, :content)',
      [Result, UniqueCourseSlug(FDB, ATitle, ''), Lang, Copy(ATitle.Trim, 1, CourseTitleMax),
       '{"intro":"","lessons":[]}']);
  finally
    Unlock;
  end;
end;

function TSerchiStore.UpdateCourse(const AId: string; AInput: TJSONObject): Boolean;
var
  Q: TFDQuery;
  Title, Slug, Lang, Img: string;
  Published: Boolean;
  Images: TList<string>;
  Content: TJSONObject;
  Lessons: TJSONArray;
  V: TJSONValue;
  Used: TList<string>;
  I: Integer;
begin
  Lock;
  Q := TFDQuery.Create(nil);
  Images := TList<string>.Create;
  Used := TList<string>.Create;
  Content := nil;
  try
    Q.Connection := FDB;
    Q.Open('SELECT slug, lang, title, published FROM courses WHERE id = :id', [AId]);
    Result := not Q.Eof;
    if not Result then
      Exit;
    Title := InputStr(AInput, 'title', CourseTitleMax);
    if Title = '' then
      Title := Q.FieldByName('title').AsString;
    Slug := InputStr(AInput, 'slug', 60);
    if Slug = '' then
      Slug := Q.FieldByName('slug').AsString;
    Lang := InputStr(AInput, 'lang', 2);
    if (Lang <> 'es') and (Lang <> 'en') then
      Lang := Q.FieldByName('lang').AsString;
    Published := Q.FieldByName('published').AsInteger <> 0;
    V := AInput.GetValue('published');
    if V is TJSONBool then
      Published := TJSONBool(V).AsBoolean;
    Q.Close;

    Q.Open('SELECT id FROM course_images WHERE course_id = :id', [AId]);
    while not Q.Eof do
    begin
      Images.Add(Q.Fields[0].AsString);
      Q.Next;
    end;
    Q.Close;

    Content := SanitizeCourseContent(AInput.GetValue('content'), Images.ToArray);
    FDB.ExecSQL('UPDATE courses SET slug = :slug, lang = :lang, title = :title, content = :content, ' +
      'published = :published, updated_at = strftime(''%Y-%m-%dT%H:%M:%fZ'',''now'') WHERE id = :id',
      [UniqueCourseSlug(FDB, Slug, AId), Lang, Title, Content.ToJSON, Ord(Published), AId]);

    // Pictures no lesson uses any more are deleted
    Lessons := Content.GetValue('lessons') as TJSONArray;
    for I := 0 to Lessons.Count - 1 do
    begin
      V := TJSONObject(Lessons.Items[I]).GetValue('image');
      if V is TJSONString then
        Used.Add(TJSONString(V).Value);
    end;
    for Img in Images do
      if not Used.Contains(Img) then
        FDB.ExecSQL('DELETE FROM course_images WHERE id = :id', [Img]);
  finally
    Content.Free;
    Used.Free;
    Images.Free;
    Q.Free;
    Unlock;
  end;
end;

function TSerchiStore.DeleteCourse(const AId: string): Boolean;
begin
  Lock;
  try
    // Its pictures go with it (ON DELETE CASCADE)
    Result := FDB.ExecSQL('DELETE FROM courses WHERE id = :id', [AId]) > 0;
  finally
    Unlock;
  end;
end;

function TSerchiStore.CourseForPreview(const AId: string; out ACourse: TCourseInfo;
  out AImageIds: TArray<string>): Boolean;
var
  Q: TFDQuery;
  Images: TList<string>;
begin
  Lock;
  Q := TFDQuery.Create(nil);
  Images := TList<string>.Create;
  try
    Q.Connection := FDB;
    Q.Open('SELECT slug, lang, title FROM courses WHERE id = :id', [AId]);
    Result := not Q.Eof;
    if Result then
    begin
      ACourse.Slug := Q.Fields[0].AsString;
      ACourse.Lang := Q.Fields[1].AsString;
      ACourse.Title := Q.Fields[2].AsString;
    end;
    Q.Close;
    Q.Open('SELECT id FROM course_images WHERE course_id = :id', [AId]);
    while not Q.Eof do
    begin
      Images.Add(Q.Fields[0].AsString);
      Q.Next;
    end;
    AImageIds := Images.ToArray;
  finally
    Images.Free;
    Q.Free;
    Unlock;
  end;
end;

{ Runs an INSERT whose parameter :data is binary (BLOB) }
procedure InsertWithBlob(ADB: TFDConnection; const ASQL: string; const ANames: array of string;
  const AValues: array of string; const AData: TBytes);
var
  Q: TFDQuery;
  Stream: TBytesStream;
  I: Integer;
begin
  Q := TFDQuery.Create(nil);
  Stream := TBytesStream.Create(AData);
  try
    Q.Connection := ADB;
    Q.SQL.Text := ASQL;
    for I := 0 to High(ANames) do
      Q.ParamByName(ANames[I]).AsString := AValues[I];
    Q.ParamByName('data').LoadFromStream(Stream, ftBlob);
    Q.ExecSQL;
  finally
    Stream.Free;
    Q.Free;
  end;
end;

procedure TSerchiStore.SaveSyntheticAudio(const ASlug, AText: string; const AData: TBytes);
begin
  Lock;
  try
    InsertWithBlob(FDB, 'INSERT OR REPLACE INTO synthetic_audio (slug, text, audio) VALUES (:slug, :text, :data)',
      ['slug', 'text'], [ASlug, AText], AData);
  finally
    Unlock;
  end;
end;

function TSerchiStore.AddCourseImage(const ACourseId, AMime: string; const AData: TBytes): string;
begin
  Lock;
  try
    Result := '';
    if VarToStr(FDB.ExecSQLScalar('SELECT id FROM courses WHERE id = :id', [ACourseId])) = '' then
      Exit;
    Result := NewId('img');
    InsertWithBlob(FDB, 'INSERT INTO course_images (id, course_id, mime, data) VALUES (:id, :course, :mime, :data)',
      ['id', 'course', 'mime'], [Result, ACourseId, AMime], AData);
  finally
    Unlock;
  end;
end;

function TSerchiStore.PublishedCourseContents: TArray<string>;
var
  Q: TFDQuery;
  List: TList<string>;
begin
  Lock;
  Q := TFDQuery.Create(nil);
  List := TList<string>.Create;
  try
    Q.Connection := FDB;
    Q.Open('SELECT content FROM courses WHERE published = 1 ORDER BY title');
    while not Q.Eof do
    begin
      List.Add(Q.Fields[0].AsString);
      Q.Next;
    end;
    Result := List.ToArray;
  finally
    List.Free;
    Q.Free;
    Unlock;
  end;
end;

function TSerchiStore.PublishedCourseTitledContents: TArray<TPair<string, string>>;
var
  Q: TFDQuery;
  List: TList<TPair<string, string>>;
begin
  Lock;
  Q := TFDQuery.Create(nil);
  List := TList<TPair<string, string>>.Create;
  try
    Q.Connection := FDB;
    Q.Open('SELECT title, content FROM courses WHERE published = 1 ORDER BY title');
    while not Q.Eof do
    begin
      List.Add(TPair<string, string>.Create(Q.Fields[0].AsString, Q.Fields[1].AsString));
      Q.Next;
    end;
    Result := List.ToArray;
  finally
    List.Free;
    Q.Free;
    Unlock;
  end;
end;

function TSerchiStore.RecordingsByVisitorToday(const AVisitor: string): Integer;
begin
  Lock;
  try
    Result := FDB.ExecSQLScalar('SELECT COUNT(*) FROM recordings WHERE visitor_id = :v AND ' +
      'created_at > strftime(''%Y-%m-%dT%H:%M:%fZ'', ''now'', ''-1 day'')', [AVisitor]);
  finally
    Unlock;
  end;
end;

function TSerchiStore.PendingRecordingCount: Integer;
begin
  Lock;
  try
    Result := FDB.ExecSQLScalar('SELECT COUNT(*) FROM recordings WHERE status = ''pending''');
  finally
    Unlock;
  end;
end;

function TSerchiStore.AddRecording(const ASlug, AText, AMime: string; const AData: TBytes;
  const AVisitor, AName: string): string;
begin
  Lock;
  try
    Result := NewId('rec');
    InsertWithBlob(FDB, 'INSERT INTO recordings (id, slug, text, mime, audio, visitor_id, name) ' +
      'VALUES (:id, :slug, :text, :mime, :data, :visitor, NULLIF(:name, ''''))',
      ['id', 'slug', 'text', 'mime', 'visitor', 'name'],
      [Result, ASlug, AText, AMime, AVisitor, Copy(AName.Trim, 1, 60)], AData);
  finally
    Unlock;
  end;
end;

procedure TSerchiStore.AddRecordingCredit(const AId, AName: string);
begin
  Lock;
  try
    FDB.ExecSQL('INSERT INTO recording_credits (recording_id, name) VALUES (:id, :name)',
      [AId, Copy(AName.Trim, 1, 60)]);
  finally
    Unlock;
  end;
end;

function TSerchiStore.RecordingCreditsJson: string;
var
  Q: TFDQuery;
  Index: TDictionary<string, Integer>;
  Names: TList<string>;
  Slugs: TObjectList<TList<string>>;
  Order: TList<Integer>;
  Key, Slug: string;
  I, N: Integer;
  List, Words: TJSONArray;
  Item: TJSONObject;
begin
  Lock;
  Q := TFDQuery.Create(nil);
  Index := TDictionary<string, Integer>.Create;
  Names := TList<string>.Create;
  Slugs := TObjectList<TList<string>>.Create(True);
  Order := TList<Integer>.Create;
  List := TJSONArray.Create;
  try
    Q.Connection := FDB;
    // A name is written as in its first recording
    Q.Open('SELECT c.name, r.slug FROM recording_credits c JOIN recordings r ON r.id = c.recording_id ' +
      'WHERE r.status = ''approved'' ORDER BY r.created_at, r.rowid');
    while not Q.Eof do
    begin
      Key := Q.Fields[0].AsString.Trim.ToLower;
      if not Index.TryGetValue(Key, N) then
      begin
        N := Names.Add(Q.Fields[0].AsString.Trim);
        Slugs.Add(TList<string>.Create);
        Index.Add(Key, N);
      end;
      Slug := Q.Fields[1].AsString;
      if not Slugs[N].Contains(Slug) then
        Slugs[N].Add(Slug);
      Q.Next;
    end;
    for I := 0 to Names.Count - 1 do
      Order.Add(I);
    Order.Sort(TComparer<Integer>.Construct(
      function(const A, B: Integer): Integer
      begin
        Result := Slugs[B].Count - Slugs[A].Count;
        if Result = 0 then
          Result := CompareText(Names[A], Names[B]);
      end));
    for N in Order do
    begin
      Slugs[N].Sort;
      Words := TJSONArray.Create;
      for Slug in Slugs[N] do
        Words.Add(Slug);
      Item := TJSONObject.Create;
      Item.AddPair('name', Names[N]);
      Item.AddPair('slugs', Words);
      List.AddElement(Item);
    end;
    Result := List.ToJSON;
  finally
    List.Free;
    Order.Free;
    Slugs.Free;
    Names.Free;
    Index.Free;
    Q.Free;
    Unlock;
  end;
end;

function TSerchiStore.PendingRecordingsJson: string;
var
  Q: TFDQuery;
  List: TJSONArray;
  Item: TJSONObject;
begin
  Lock;
  Q := TFDQuery.Create(nil);
  List := TJSONArray.Create;
  try
    Q.Connection := FDB;
    Q.Open('SELECT r.id, r.slug, r.text, r.name, r.created_at, c.recording_id IS NOT NULL FROM recordings r ' +
      'LEFT JOIN recording_credits c ON c.recording_id = r.id WHERE r.status = ''pending'' ORDER BY r.created_at');
    while not Q.Eof do
    begin
      Item := TJSONObject.Create;
      Item.AddPair('id', Q.Fields[0].AsString);
      Item.AddPair('slug', Q.Fields[1].AsString);
      Item.AddPair('text', Q.Fields[2].AsString);
      if Q.Fields[3].IsNull then
        Item.AddPair('name', TJSONNull.Create)
      else
        Item.AddPair('name', Q.Fields[3].AsString);
      Item.AddPair('createdAt', Q.Fields[4].AsString);
      // The name will be shown on the course pages once approved
      Item.AddPair('credit', TJSONBool.Create(Q.Fields[5].AsInteger <> 0));
      List.AddElement(Item);
      Q.Next;
    end;
    Result := List.ToJSON;
  finally
    List.Free;
    Q.Free;
    Unlock;
  end;
end;

function TSerchiStore.RecordingAudio(const AId: string; AIncludePending: Boolean; out AMime: string;
  out AData: TBytes): Boolean;
var
  Q: TFDQuery;
begin
  Lock;
  Q := TFDQuery.Create(nil);
  try
    Q.Connection := FDB;
    Q.Open('SELECT mime, audio, status FROM recordings WHERE id = :id', [AId]);
    Result := not Q.Eof and (AIncludePending or (Q.Fields[2].AsString = 'approved'));
    if Result then
    begin
      AMime := Q.Fields[0].AsString;
      AData := Q.Fields[1].AsBytes;
    end;
  finally
    Q.Free;
    Unlock;
  end;
end;

function TSerchiStore.ApproveRecording(const AId: string): Boolean;
begin
  Lock;
  try
    Result := FDB.ExecSQL('UPDATE recordings SET status = ''approved'', ' +
      'reviewed_at = strftime(''%Y-%m-%dT%H:%M:%fZ'',''now'') WHERE id = :id AND status = ''pending''', [AId]) > 0;
  finally
    Unlock;
  end;
end;

function TSerchiStore.DeleteRecording(const AId: string): Boolean;
begin
  Lock;
  try
    Result := FDB.ExecSQL('DELETE FROM recordings WHERE id = :id', [AId]) > 0;
  finally
    Unlock;
  end;
end;

end.
