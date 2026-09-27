unit Serchi.Store;

{ In-memory data store shared by every WebBroker module instance.
  Holds the curated resource index, knowledge panels and forum state, and
  implements the search/ranking algorithm (port of the useMemo block in
  src/App.tsx). Access to mutable state is serialized with Lock/Unlock. }

interface

uses
  System.SysUtils, System.Classes, System.Generics.Collections,
  Serchi.Models;

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
    procedure LoadResources(const AFile: string);
    procedure LoadKnowledge(const AFile: string);
    procedure LoadForum(const AFile: string);
    function NextId(const APrefix: string): string;
  public
    constructor Create(const ADataDir: string);
    destructor Destroy; override;

    procedure Lock;
    procedure Unlock;

    // Resources
    function Search(const AFilters: TSearchFilters; AResults: TList<TResource>): TKnowledgePanel;
    function FindResource(const AId: string): TResource;
    function RandomFeatured: TResource;
    function UrlExists(const AUrl: string): Boolean;
    function AddResource(AResource: TResource): Boolean;
    function ResourceCount: Integer;

    // Forum
    function UserForRole(const ARole: string): TForumUser;
    function FindTopic(const AId: string): TForumTopic;
    procedure ListTopics(const ACategory, ALevel, AQuery: string; AResults: TList<TForumTopic>);
    function CreateTopic(const AUser: TForumUser; const ATitle, AContent, ACategory,
      ALevel: string; const ATags: TArray<string>): TForumTopic;
    function AddComment(ATopic: TForumTopic; const AUser: TForumUser;
      const AContent: string; AModNote: Boolean): TForumComment;
    procedure ToggleTopicLike(ATopic: TForumTopic; const AVisitor: string);
    procedure ToggleCommentLike(AComment: TForumComment; const AVisitor: string);
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
  System.Math, Serchi.Text;

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

constructor TSerchiStore.Create(const ADataDir: string);
begin
  inherited Create;
  FLock := TObject.Create;
  FResources := TObjectList<TResource>.Create(True);
  FKnowledge := TObjectList<TKnowledgePanel>.Create(True);
  FTopics := TObjectList<TForumTopic>.Create(True);
  FUsers := TDictionary<string, TForumUser>.Create;
  LoadSynonyms(TPath.Combine(ADataDir, 'synonyms.json'));
  LoadResources(TPath.Combine(ADataDir, 'resources.json'));
  LoadKnowledge(TPath.Combine(ADataDir, 'knowledge.json'));
  LoadForum(TPath.Combine(ADataDir, 'forum.json'));
end;

destructor TSerchiStore.Destroy;
begin
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

procedure TSerchiStore.LoadResources(const AFile: string);
var
  Root, Item: TJSONValue;
begin
  Root := ParseJSONFile(AFile);
  try
    for Item in (Root as TJSONArray) do
      FResources.Add(TResource.FromJSON(Item as TJSONObject));
  finally
    Root.Free;
  end;
end;

procedure TSerchiStore.LoadKnowledge(const AFile: string);
var
  Root, Item: TJSONValue;
begin
  Root := ParseJSONFile(AFile);
  try
    for Item in (Root as TJSONArray) do
      FKnowledge.Add(TKnowledgePanel.FromJSON(Item as TJSONObject));
  finally
    Root.Free;
  end;
end;

procedure TSerchiStore.LoadForum(const AFile: string);
var
  Root, Item, CommentsObj: TJSONValue;
  Pair: TJSONPair;
  Topic: TForumTopic;
  Comment: TForumComment;
begin
  Root := ParseJSONFile(AFile);
  try
    for Item in (TJSONObject(Root).GetValue('topics') as TJSONArray) do
    begin
      Topic := TForumTopic.FromJSON(Item as TJSONObject);
      FTopics.Add(Topic);
      FUsers.AddOrSetValue(Topic.Author.Role, Topic.Author);
    end;
    CommentsObj := TJSONObject(Root).GetValue('comments');
    if CommentsObj is TJSONObject then
      for Pair in TJSONObject(CommentsObj) do
      begin
        Topic := FindTopic(Pair.JsonString.Value);
        if (Topic = nil) or not (Pair.JsonValue is TJSONArray) then
          Continue;
        for Item in TJSONArray(Pair.JsonValue) do
        begin
          Comment := TForumComment.FromJSON(Item as TJSONObject);
          Topic.Comments.Add(Comment);
          if not FUsers.ContainsKey(Comment.Author.Role) then
            FUsers.Add(Comment.Author.Role, Comment.Author);
        end;
      end;
  finally
    Root.Free;
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

function TSerchiStore.AddResource(AResource: TResource): Boolean;
begin
  Lock;
  try
    Result := not UrlExists(AResource.Url); // TMonitor is re-entrant
    if Result then
    begin
      if AResource.Id = '' then
        AResource.Id := NextId('custom');
      AResource.BuildIndex;
      FResources.Insert(0, AResource);
    end;
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
  ACategory, ALevel: string; const ATags: TArray<string>): TForumTopic;
begin
  Result := TForumTopic.Create;
  Result.Id := NextId('topic');
  Result.Title := ATitle;
  Result.Content := AContent;
  Result.Author := AUser;
  Result.Category := ACategory;
  Result.Level := ALevel;
  Result.Tags := ATags;
  Result.CreatedAt := Now;
  Result.UpdatedAt := Now;
  Result.Views := 1;
  FTopics.Insert(0, Result);
end;

function TSerchiStore.AddComment(ATopic: TForumTopic; const AUser: TForumUser;
  const AContent: string; AModNote: Boolean): TForumComment;
begin
  Result := TForumComment.Create;
  Result.Id := NextId('comm');
  Result.TopicId := ATopic.Id;
  Result.Author := AUser;
  Result.Content := AContent;
  Result.CreatedAt := Now;
  Result.IsModeratorNote := AModNote;
  ATopic.Comments.Add(Result);
  ATopic.UpdatedAt := Now;
end;

procedure TSerchiStore.ToggleTopicLike(ATopic: TForumTopic; const AVisitor: string);
begin
  if ATopic.LikedBy.Contains(AVisitor) then
  begin
    ATopic.LikedBy.Remove(AVisitor);
    ATopic.Likes := Max(0, ATopic.Likes - 1);
  end
  else
  begin
    ATopic.LikedBy.Add(AVisitor);
    Inc(ATopic.Likes);
  end;
end;

procedure TSerchiStore.ToggleCommentLike(AComment: TForumComment; const AVisitor: string);
begin
  if AComment.LikedBy.Contains(AVisitor) then
  begin
    AComment.LikedBy.Remove(AVisitor);
    AComment.Likes := Max(0, AComment.Likes - 1);
  end
  else
  begin
    AComment.LikedBy.Add(AVisitor);
    Inc(AComment.Likes);
  end;
end;

procedure TSerchiStore.DeleteTopic(ATopic: TForumTopic);
begin
  FTopics.Remove(ATopic);
end;

procedure TSerchiStore.DeleteComment(ATopic: TForumTopic; AComment: TForumComment);
begin
  ATopic.Comments.Remove(AComment);
end;

end.
