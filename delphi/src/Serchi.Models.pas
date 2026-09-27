unit Serchi.Models;

{ Domain model loaded from delphi/data/*.json (exported from the TypeScript
  sources with `npm run export:delphi`). }

interface

uses
  System.SysUtils, System.Classes, System.JSON, System.Generics.Collections;

type
  TLocalized = record
    Eo, Es, En: string;
    function Get(const ALang: string): string;
    class function FromJSON(AValue: TJSONValue): TLocalized; static;
  end;

  TLocalizedList = record
    Eo, Es, En: TArray<string>;
    function Get(const ALang: string): TArray<string>;
  end;

  TResource = class
  public
    Id: string;
    Title: string;
    Url: string;
    DisplayUrl: string;
    Description: TLocalized;
    Category: string;
    Level: string;
    Tags: TArray<string>;
    IsFree: Boolean;
    Format: string;
    Author: string;
    Featured: Boolean;
    Year: string;
    Languages: TArray<string>;
    Features: TLocalizedList;
    // Precomputed search haystacks
    SearchText: string;
    NormalizedText: string;
    NormalizedTitle: string;
    NormalizedTags: TArray<string>;
    procedure BuildIndex;
    class function FromJSON(AObj: TJSONObject): TResource; static;
  end;

  TKnowledgeFact = record
    Label_: TLocalized;
    Value: string;
  end;

  TKnowledgeLink = record
    Title: string;
    Url: string;
  end;

  TKnowledgePanel = class
  public
    Id: string;
    Keywords: TArray<string>;
    Title: string;
    Subtitle: TLocalized;
    Description: TLocalized;
    Facts: TArray<TKnowledgeFact>;
    Links: TArray<TKnowledgeLink>;
    class function FromJSON(AObj: TJSONObject): TKnowledgePanel; static;
  end;

  TForumUser = record
    Id: string;
    Name: string;
    Role: string;        // learner | teacher | moderator
    AvatarColor: string; // Tailwind class, e.g. bg-emerald-600
    LevelBadge: string;
    class function FromJSON(AValue: TJSONValue): TForumUser; static;
  end;

  TForumComment = class
  public
    Id: string;
    TopicId: string;
    Author: TForumUser;
    Content: string;
    CreatedAt: TDateTime;
    Likes: Integer;
    LikedBy: TList<string>;
    IsModeratorNote: Boolean;
    constructor Create;
    destructor Destroy; override;
    class function FromJSON(AObj: TJSONObject): TForumComment; static;
  end;

  TForumTopic = class
  public
    Id: string;
    Title: string;
    Content: string;
    Author: TForumUser;
    Level: string;
    Category: string;
    Tags: TArray<string>;
    CreatedAt: TDateTime;
    UpdatedAt: TDateTime;
    Views: Integer;
    Likes: Integer;
    LikedBy: TList<string>;
    IsPinned: Boolean;
    IsLocked: Boolean;
    Comments: TObjectList<TForumComment>;
    constructor Create;
    destructor Destroy; override;
    class function FromJSON(AObj: TJSONObject): TForumTopic; static;
  end;

function JSONStrings(AValue: TJSONValue): TArray<string>;
function JSONStr(AObj: TJSONObject; const AName: string; const ADefault: string = ''): string;
function JSONBool(AObj: TJSONObject; const AName: string): Boolean;
function JSONInt(AObj: TJSONObject; const AName: string): Integer;
function JSONDate(AObj: TJSONObject; const AName: string): TDateTime;

implementation

uses
  System.DateUtils, Serchi.Text;

function JSONStrings(AValue: TJSONValue): TArray<string>;
var
  Item: TJSONValue;
  L: TList<string>;
begin
  L := TList<string>.Create;
  try
    if AValue is TJSONArray then
      for Item in TJSONArray(AValue) do
        L.Add(Item.Value);
    Result := L.ToArray;
  finally
    L.Free;
  end;
end;

function JSONStr(AObj: TJSONObject; const AName, ADefault: string): string;
var
  V: TJSONValue;
begin
  V := AObj.GetValue(AName);
  if (V = nil) or (V is TJSONNull) then
    Result := ADefault
  else
    Result := V.Value; // works for strings and numbers (e.g. "year")
end;

function JSONBool(AObj: TJSONObject; const AName: string): Boolean;
var
  V: TJSONValue;
begin
  V := AObj.GetValue(AName);
  Result := (V is TJSONBool) and TJSONBool(V).AsBoolean;
end;

function JSONInt(AObj: TJSONObject; const AName: string): Integer;
var
  V: TJSONValue;
begin
  V := AObj.GetValue(AName);
  if V is TJSONNumber then
    Result := TJSONNumber(V).AsInt
  else
    Result := 0;
end;

function JSONDate(AObj: TJSONObject; const AName: string): TDateTime;
var
  S: string;
begin
  S := JSONStr(AObj, AName);
  if S = '' then
    Exit(Now);
  Result := ISO8601ToDate(S, False);
end;

{ TLocalized }

function TLocalized.Get(const ALang: string): string;
begin
  if ALang = 'es' then
    Result := Es
  else if ALang = 'en' then
    Result := En
  else
    Result := Eo;
  if Result = '' then
    Result := Eo;
end;

class function TLocalized.FromJSON(AValue: TJSONValue): TLocalized;
begin
  Result := Default(TLocalized);
  if AValue is TJSONObject then
  begin
    Result.Eo := JSONStr(TJSONObject(AValue), 'eo');
    Result.Es := JSONStr(TJSONObject(AValue), 'es');
    Result.En := JSONStr(TJSONObject(AValue), 'en');
  end;
end;

{ TLocalizedList }

function TLocalizedList.Get(const ALang: string): TArray<string>;
begin
  if ALang = 'es' then
    Result := Es
  else if ALang = 'en' then
    Result := En
  else
    Result := Eo;
end;

{ TResource }

procedure TResource.BuildIndex;
var
  I: Integer;
begin
  SearchText := (Title + ' ' + DisplayUrl + ' ' + Description.Eo + ' ' +
    Description.Es + ' ' + Description.En + ' ' + string.Join(' ', Tags) + ' ' +
    Author).ToLower;
  NormalizedText := NormalizeText(SearchText);
  NormalizedTitle := NormalizeText(Title);
  SetLength(NormalizedTags, Length(Tags));
  for I := 0 to High(Tags) do
    NormalizedTags[I] := NormalizeText(Tags[I]);
end;

class function TResource.FromJSON(AObj: TJSONObject): TResource;
var
  F: TJSONValue;
begin
  Result := TResource.Create;
  Result.Id := JSONStr(AObj, 'id');
  Result.Title := JSONStr(AObj, 'title');
  Result.Url := JSONStr(AObj, 'url');
  Result.DisplayUrl := JSONStr(AObj, 'displayUrl');
  Result.Description := TLocalized.FromJSON(AObj.GetValue('description'));
  Result.Category := JSONStr(AObj, 'category', 'projects');
  Result.Level := JSONStr(AObj, 'level', 'all');
  Result.Tags := JSONStrings(AObj.GetValue('tags'));
  Result.IsFree := JSONBool(AObj, 'isFree');
  Result.Format := JSONStr(AObj, 'format', 'website');
  Result.Author := JSONStr(AObj, 'author');
  Result.Featured := JSONBool(AObj, 'featured');
  Result.Year := JSONStr(AObj, 'year');
  Result.Languages := JSONStrings(AObj.GetValue('languages'));
  F := AObj.GetValue('features');
  if F is TJSONObject then
  begin
    Result.Features.Eo := JSONStrings(TJSONObject(F).GetValue('eo'));
    Result.Features.Es := JSONStrings(TJSONObject(F).GetValue('es'));
    Result.Features.En := JSONStrings(TJSONObject(F).GetValue('en'));
  end;
  Result.BuildIndex;
end;

{ TKnowledgePanel }

class function TKnowledgePanel.FromJSON(AObj: TJSONObject): TKnowledgePanel;
var
  Arr: TJSONValue;
  I: Integer;
  O: TJSONObject;
begin
  Result := TKnowledgePanel.Create;
  Result.Id := JSONStr(AObj, 'id');
  Result.Keywords := JSONStrings(AObj.GetValue('keywords'));
  Result.Title := JSONStr(AObj, 'title');
  Result.Subtitle := TLocalized.FromJSON(AObj.GetValue('subtitle'));
  Result.Description := TLocalized.FromJSON(AObj.GetValue('description'));

  Arr := AObj.GetValue('facts');
  if Arr is TJSONArray then
  begin
    SetLength(Result.Facts, TJSONArray(Arr).Count);
    for I := 0 to TJSONArray(Arr).Count - 1 do
    begin
      O := TJSONArray(Arr).Items[I] as TJSONObject;
      Result.Facts[I].Label_ := TLocalized.FromJSON(O.GetValue('label'));
      Result.Facts[I].Value := JSONStr(O, 'value');
    end;
  end;

  Arr := AObj.GetValue('links');
  if Arr is TJSONArray then
  begin
    SetLength(Result.Links, TJSONArray(Arr).Count);
    for I := 0 to TJSONArray(Arr).Count - 1 do
    begin
      O := TJSONArray(Arr).Items[I] as TJSONObject;
      Result.Links[I].Title := JSONStr(O, 'title');
      Result.Links[I].Url := JSONStr(O, 'url');
    end;
  end;
end;

{ TForumUser }

class function TForumUser.FromJSON(AValue: TJSONValue): TForumUser;
begin
  Result := Default(TForumUser);
  if AValue is TJSONObject then
  begin
    Result.Id := JSONStr(TJSONObject(AValue), 'id');
    Result.Name := JSONStr(TJSONObject(AValue), 'name');
    Result.Role := JSONStr(TJSONObject(AValue), 'role', 'learner');
    Result.AvatarColor := JSONStr(TJSONObject(AValue), 'avatarColor', 'bg-emerald-600');
    Result.LevelBadge := JSONStr(TJSONObject(AValue), 'levelBadge');
  end;
end;

{ TForumComment }

constructor TForumComment.Create;
begin
  inherited;
  LikedBy := TList<string>.Create;
end;

destructor TForumComment.Destroy;
begin
  LikedBy.Free;
  inherited;
end;

class function TForumComment.FromJSON(AObj: TJSONObject): TForumComment;
begin
  Result := TForumComment.Create;
  Result.Id := JSONStr(AObj, 'id');
  Result.TopicId := JSONStr(AObj, 'topicId');
  Result.Author := TForumUser.FromJSON(AObj.GetValue('author'));
  Result.Content := JSONStr(AObj, 'content');
  Result.CreatedAt := JSONDate(AObj, 'createdAt');
  Result.Likes := JSONInt(AObj, 'likes');
  Result.IsModeratorNote := JSONBool(AObj, 'isModeratorNote');
end;

{ TForumTopic }

constructor TForumTopic.Create;
begin
  inherited;
  LikedBy := TList<string>.Create;
  Comments := TObjectList<TForumComment>.Create(True);
end;

destructor TForumTopic.Destroy;
begin
  Comments.Free;
  LikedBy.Free;
  inherited;
end;

class function TForumTopic.FromJSON(AObj: TJSONObject): TForumTopic;
begin
  Result := TForumTopic.Create;
  Result.Id := JSONStr(AObj, 'id');
  Result.Title := JSONStr(AObj, 'title');
  Result.Content := JSONStr(AObj, 'content');
  Result.Author := TForumUser.FromJSON(AObj.GetValue('author'));
  Result.Level := JSONStr(AObj, 'level', 'all');
  Result.Category := JSONStr(AObj, 'category', 'general');
  Result.Tags := JSONStrings(AObj.GetValue('tags'));
  Result.CreatedAt := JSONDate(AObj, 'createdAt');
  Result.UpdatedAt := JSONDate(AObj, 'updatedAt');
  Result.Views := JSONInt(AObj, 'views');
  Result.Likes := JSONInt(AObj, 'likes');
  Result.IsPinned := JSONBool(AObj, 'isPinned');
  Result.IsLocked := JSONBool(AObj, 'isLocked');
end;

end.
