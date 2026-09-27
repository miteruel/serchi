unit WebModuleMain;

{ WebBroker module: routes requests, builds view models and renders
  WebStencils templates. HTMX requests (header "HX-Request") receive HTML
  fragments; normal requests receive full pages wrapped in layout.html. }

interface

uses
  System.SysUtils, System.Classes, System.Generics.Collections,
  Web.HTTPApp, Web.Stencils,
  Serchi.Models, Serchi.Store, Serchi.ViewModels;

type
  TWebModuleMain = class(TWebModule)
    procedure WebModuleBeforeDispatch(Sender: TObject; Request: TWebRequest;
      Response: TWebResponse; var Handled: Boolean);
  private
    FRequest: TWebRequest;
    FResponse: TWebResponse;
    FApp: TAppVM;
    FLang: string;
    FVisitor: string;
    FSaved: TList<string>;

    // Request helpers
    function Param(const AName: string; const ADefault: string = ''): string;
    function IsHtmx: Boolean;
    function IsPost: Boolean;
    function Cookie(const AName: string): string;
    procedure SetCookie(const AName, AValue: string);
    function T(const AKey: string): string;
    procedure LoadSavedIds;
    procedure StoreSavedIds;
    function CurrentUser: TForumUser;
    function CanModerate: Boolean;

    // Rendering
    procedure ProcessorValue(Sender: TObject; const AObjectName, APropName: string;
      var AReplaceText: string; var AHandled: Boolean);
    function RenderTemplate(const ATemplate: string; AModel: TObject): string;
    procedure SendHtml(const AHtml: string; AStatus: Integer = 200);
    procedure Render(const ATemplate: string; AModel: TObject);
    procedure Redirect(const AUrl: string);
    procedure SendStatic(const APath: string);

    // View model builders
    function ResourceVM(ARes: TResource): TResourceVM;
    procedure FillLevelOptions(AList: TObjectList<TOptionVM>; const ASelected: string);
    procedure FillCategoryOptions(AList: TObjectList<TOptionVM>; const ASelected: string);
    procedure FillFormatOptions(AList: TObjectList<TOptionVM>; const ASelected: string; AWithAll: Boolean);
    procedure FillForumCategoryOptions(AList: TObjectList<TOptionVM>; const ASelected: string; AWithAll: Boolean);
    function ReadFilters: TSearchFilters;
    function FiltersQueryString(const AFilters: TSearchFilters; APage: Integer): string;

    // Handlers
    procedure HandleHome;
    procedure HandleSearch;
    procedure HandleResource;
    procedure HandleLucky;
    procedure HandlePlayer;
    procedure HandleToggleBookmark;
    procedure HandleBookmarks;
    procedure HandleBookmarksCount;
    procedure HandleBookmarksClear;
    procedure HandleBookmarksExport;
    procedure HandleLanguage;
    procedure HandleRole;
    procedure HandleForum;
    procedure HandleForumTopic;
    procedure HandleForumCreate;
    procedure HandleForumReply;
    procedure HandleForumLike;
    procedure HandleForumCommentLike;
    procedure HandleForumModerate;
    procedure HandleForumCommentDelete;
    procedure HandleAddForm;
    procedure HandleAddSubmit;
    procedure HandleLiveSearch;
    procedure HandleImport;
  end;

var
  WebModuleClass: TComponentClass = TWebModuleMain;

  { Set by the program at startup (see SerchiWeb.dpr) }
  AppHome: string;

function TemplatesDir: string;
function StaticDir: string;
function DataDir: string;

implementation

{%CLASSGROUP 'System.Classes.TPersistent'}

{$R *.dfm}

uses
  System.IOUtils, System.JSON, System.DateUtils, System.NetEncoding, System.Math,
  Serchi.I18n, Serchi.Text, Serchi.Gemini, Serchi.Radio;

const
  PageSize = 20;
  CookieLang = 'serchi_lang';
  CookieSaved = 'serchi_saved';
  CookieRole = 'serchi_role';
  CookieVisitor = 'serchi_uid';
  DefaultSaved: array[0..2] of string = ('lernu-net', 'vortaro-piv', 'pasporta-servo');
  PopularSearches: array[0..7] of string = ('piv vortaro', 'lernu', 'pmeg', 'duolingo',
    'pasporta servo', 'tubaro', 'libera folio', 'podkasto');

function TemplatesDir: string;
begin
  Result := TPath.Combine(AppHome, 'templates');
end;

function StaticDir: string;
begin
  Result := TPath.Combine(AppHome, 'static');
end;

function DataDir: string;
begin
  Result := TPath.Combine(AppHome, 'data');
end;

function UrlEncode(const S: string): string;
begin
  Result := TNetEncoding.URL.Encode(S);
end;

{ ---------------------------------------------------------------------------
  Request helpers
  --------------------------------------------------------------------------- }

function TWebModuleMain.Param(const AName, ADefault: string): string;
begin
  if FRequest.ContentFields.IndexOfName(AName) >= 0 then
    Result := FRequest.ContentFields.Values[AName]
  else if FRequest.QueryFields.IndexOfName(AName) >= 0 then
    Result := FRequest.QueryFields.Values[AName]
  else
    Result := ADefault;
  Result := Result.Trim;
end;

function TWebModuleMain.IsHtmx: Boolean;
begin
  Result := SameText(FRequest.GetFieldByName('HX-Request'), 'true');
end;

function TWebModuleMain.IsPost: Boolean;
begin
  Result := FRequest.MethodType = mtPost;
end;

function TWebModuleMain.Cookie(const AName: string): string;
begin
  Result := FRequest.CookieFields.Values[AName];
end;

procedure TWebModuleMain.SetCookie(const AName, AValue: string);
var
  C: TCookie;
begin
  C := FResponse.Cookies.Add;
  C.Name := AName;
  C.Value := AValue;
  C.Path := '/';
  C.Expires := IncDay(Now, 365);
end;

function TWebModuleMain.T(const AKey: string): string;
begin
  Result := I18n.T(FLang, AKey);
end;

procedure TWebModuleMain.LoadSavedIds;
var
  Id: string;
begin
  FSaved.Clear;
  if FRequest.CookieFields.IndexOfName(CookieSaved) < 0 then
    FSaved.AddRange(DefaultSaved)
  else
    for Id in Cookie(CookieSaved).Split(['.'], TStringSplitOptions.ExcludeEmpty) do
      if Store.FindResource(Id) <> nil then
        FSaved.Add(Id);
end;

procedure TWebModuleMain.StoreSavedIds;
begin
  SetCookie(CookieSaved, string.Join('.', FSaved.ToArray));
end;

function TWebModuleMain.CurrentUser: TForumUser;
begin
  Result := Store.UserForRole(FApp.Role);
end;

function TWebModuleMain.CanModerate: Boolean;
begin
  Result := FApp.IsModerator;
end;

{ ---------------------------------------------------------------------------
  Rendering
  --------------------------------------------------------------------------- }

procedure TWebModuleMain.ProcessorValue(Sender: TObject; const AObjectName,
  APropName: string; var AReplaceText: string; var AHandled: Boolean);
begin
  // @t.someKey -> localized UI string (see Serchi.I18n)
  if SameText(AObjectName, 't') then
  begin
    AReplaceText := T(APropName);
    AHandled := True;
  end;
end;

function TWebModuleMain.RenderTemplate(const ATemplate: string; AModel: TObject): string;
var
  Processor: TWebStencilsProcessor;
begin
  Processor := TWebStencilsProcessor.Create(nil);
  try
    Processor.InputFileName := TPath.Combine(TemplatesDir, ATemplate);
    Processor.OnValue := ProcessorValue;
    Processor.AddVar('App', FApp, False);
    if AModel <> nil then
      Processor.AddVar('Model', AModel, False);
    Result := Processor.Content;
  finally
    Processor.Free;
  end;
end;

procedure TWebModuleMain.SendHtml(const AHtml: string; AStatus: Integer);
begin
  FResponse.StatusCode := AStatus;
  FResponse.ContentType := 'text/html; charset=utf-8';
  FResponse.ContentStream := TBytesStream.Create(TEncoding.UTF8.GetBytes(AHtml));
end;

procedure TWebModuleMain.Render(const ATemplate: string; AModel: TObject);
begin
  SendHtml(RenderTemplate(ATemplate, AModel));
end;

procedure TWebModuleMain.Redirect(const AUrl: string);
begin
  if IsHtmx then
  begin
    FResponse.SetCustomHeader('HX-Redirect', AUrl);
    SendHtml('');
  end
  else
    FResponse.SendRedirect(AUrl);
end;

procedure TWebModuleMain.SendStatic(const APath: string);
var
  FileName, Ext: string;
begin
  FileName := TPath.GetFullPath(TPath.Combine(StaticDir, APath));
  if not FileName.StartsWith(TPath.GetFullPath(StaticDir)) or not TFile.Exists(FileName) then
  begin
    SendHtml('Not found', 404);
    Exit;
  end;
  Ext := TPath.GetExtension(FileName).ToLower;
  if Ext = '.css' then
    FResponse.ContentType := 'text/css; charset=utf-8'
  else if Ext = '.js' then
    FResponse.ContentType := 'text/javascript; charset=utf-8'
  else if Ext = '.svg' then
    FResponse.ContentType := 'image/svg+xml'
  else if Ext = '.png' then
    FResponse.ContentType := 'image/png'
  else
    FResponse.ContentType := 'application/octet-stream';
  FResponse.SetCustomHeader('Cache-Control', 'public, max-age=3600');
  FResponse.ContentStream := TFileStream.Create(FileName, fmOpenRead or fmShareDenyWrite);
end;

{ ---------------------------------------------------------------------------
  View model builders
  --------------------------------------------------------------------------- }

function TWebModuleMain.ResourceVM(ARes: TResource): TResourceVM;
begin
  Result := TResourceVM.Create(ARes, FLang, FSaved.Contains(ARes.Id),
    T('categories_' + ARes.Category), T('levels_' + ARes.Level), T('formats_' + ARes.Format));
end;

procedure TWebModuleMain.FillLevelOptions(AList: TObjectList<TOptionVM>; const ASelected: string);
const
  Levels: array[0..5] of string = ('all', 'A1', 'A2', 'B1', 'B2', 'C1');
var
  L: string;
begin
  for L in Levels do
    AList.Add(TOptionVM.Create(L, T('levels_' + L), L = ASelected));
end;

procedure TWebModuleMain.FillCategoryOptions(AList: TObjectList<TOptionVM>; const ASelected: string);
const
  Cats: array[0..10] of string = ('all', 'courses', 'news', 'projects', 'tools',
    'literature', 'media', 'community', 'radio', 'people', 'events');
var
  C: string;
begin
  for C in Cats do
    AList.Add(TOptionVM.Create(C, T('categories_' + C), C = ASelected));
end;

procedure TWebModuleMain.FillFormatOptions(AList: TObjectList<TOptionVM>;
  const ASelected: string; AWithAll: Boolean);
const
  Formats: array[0..7] of string = ('website', 'app', 'podcast', 'book', 'video',
    'forum', 'course', 'tool');
var
  F: string;
begin
  if AWithAll then
    AList.Add(TOptionVM.Create('all', T('categories_all'), ASelected = 'all'));
  for F in Formats do
    AList.Add(TOptionVM.Create(F, T('formats_' + F), F = ASelected));
end;

procedure TWebModuleMain.FillForumCategoryOptions(AList: TObjectList<TOptionVM>;
  const ASelected: string; AWithAll: Boolean);
const
  Cats: array[0..5] of string = ('general', 'questions', 'grammar', 'practice',
    'resources', 'events');
var
  C: string;
begin
  if AWithAll then
    AList.Add(TOptionVM.Create('all', T('forumCategories_all'), ASelected = 'all'));
  for C in Cats do
    AList.Add(TOptionVM.Create(C, T('forumCategories_' + C), C = ASelected));
end;

function TWebModuleMain.ReadFilters: TSearchFilters;
begin
  Result := TSearchFilters.Default;
  Result.Query := ConvertXSystem(Param('q'));
  Result.Category := Param('category', 'all');
  Result.Level := Param('level', 'all');
  Result.Format := Param('format', 'all');
  Result.FreeOnly := Param('free') <> '';
  Result.SortBy := Param('sort', 'relevance');
  Result.ExactPhrase := ConvertXSystem(Param('exact'));
  Result.AnyWords := ConvertXSystem(Param('any'));
  Result.ExcludeWords := ConvertXSystem(Param('exclude'));
  if Result.Category = '' then Result.Category := 'all';
  if Result.Level = '' then Result.Level := 'all';
  if Result.Format = '' then Result.Format := 'all';
end;

function TWebModuleMain.FiltersQueryString(const AFilters: TSearchFilters; APage: Integer): string;
begin
  Result := '/search?q=' + UrlEncode(AFilters.Query) +
    '&category=' + AFilters.Category + '&level=' + AFilters.Level +
    '&format=' + AFilters.Format + '&sort=' + AFilters.SortBy;
  if AFilters.FreeOnly then
    Result := Result + '&free=1';
  if AFilters.ExactPhrase <> '' then
    Result := Result + '&exact=' + UrlEncode(AFilters.ExactPhrase);
  if AFilters.AnyWords <> '' then
    Result := Result + '&any=' + UrlEncode(AFilters.AnyWords);
  if AFilters.ExcludeWords <> '' then
    Result := Result + '&exclude=' + UrlEncode(AFilters.ExcludeWords);
  if APage > 1 then
    Result := Result + '&page=' + APage.ToString;
end;

{ ---------------------------------------------------------------------------
  Search
  --------------------------------------------------------------------------- }

procedure TWebModuleMain.HandleHome;
var
  VM: TSearchVM;
  S: string;
  Filters: TSearchFilters;
  Found: TList<TResource>;
  Res: TResource;
begin
  FApp.Section := 'home';
  VM := TSearchVM.Create;
  Found := TList<TResource>.Create;
  try
    FillLevelOptions(VM.LevelOptions, Param('level', 'all'));
    FillCategoryOptions(VM.CategoryOptions, 'all');
    for S in PopularSearches do
      VM.Popular.Add(TTextVM.Create(S));
    // Radio section: stations that can be played online
    Filters := TSearchFilters.Default;
    Filters.Category := 'radio';
    Store.Search(Filters, Found);
    for Res in Found do
      if Res.StreamType <> '' then
        VM.Results.Add(ResourceVM(Res));
    // Famous Esperantists: featured people
    Found.Clear;
    Filters.Category := 'people';
    Store.Search(Filters, Found);
    for Res in Found do
      if Res.Featured then
        VM.People.Add(ResourceVM(Res));
    // Esperanto events: featured congresses and meetings
    Found.Clear;
    Filters.Category := 'events';
    Store.Search(Filters, Found);
    for Res in Found do
      if Res.Featured then
        VM.Events.Add(ResourceVM(Res));
    Render('home.html', VM);
  finally
    Found.Free;
    VM.Free;
  end;
end;

procedure TWebModuleMain.HandleSearch;
var
  Filters: TSearchFilters;
  Found: TList<TResource>;
  Knowledge: TKnowledgePanel;
  VM: TSearchVM;
  Page, I, First, Last: Integer;
  Started: TDateTime;
  Seconds: string;
begin
  FApp.Section := 'search';
  Filters := ReadFilters;
  FApp.Query := Filters.Query;
  Page := StrToIntDef(Param('page'), 1);
  if Page < 1 then
    Page := 1;

  Started := Now;
  Found := TList<TResource>.Create;
  VM := TSearchVM.Create;
  try
    Knowledge := Store.Search(Filters, Found);
    Seconds := FormatFloat('0.00', Max(1, MilliSecondsBetween(Now, Started)) / 1000,
      TFormatSettings.Invariant);

    VM.Query := Filters.Query;
    VM.DisplayQuery := Filters.Query;
    VM.Total := Found.Count;
    VM.Stats := I18n.Fmt(FLang, 'resultsStats', [Found.Count.ToString, Seconds]);
    VM.FreeOnly := Filters.FreeOnly;
    VM.ExactPhrase := Filters.ExactPhrase;
    VM.AnyWords := Filters.AnyWords;
    VM.ExcludeWords := Filters.ExcludeWords;
    VM.AdvancedOpen := (Filters.ExactPhrase <> '') or (Filters.AnyWords <> '') or
      (Filters.ExcludeWords <> '');
    VM.LiveQuery := Filters.Query;
    if (Knowledge <> nil) and (Page = 1) then
      VM.SetKnowledge(TKnowledgeVM.Create(Knowledge, FLang));

    FillLevelOptions(VM.LevelOptions, Filters.Level);
    FillCategoryOptions(VM.CategoryOptions, Filters.Category);
    FillFormatOptions(VM.FormatOptions, Filters.Format, True);
    VM.SortOptions.Add(TOptionVM.Create('relevance', T('sortRelevance'), Filters.SortBy = 'relevance'));
    VM.SortOptions.Add(TOptionVM.Create('alpha', T('sortAlpha'), Filters.SortBy = 'alpha'));
    VM.SortOptions.Add(TOptionVM.Create('level', T('sortLevel'), Filters.SortBy = 'level'));

    First := (Page - 1) * PageSize;
    Last := Min(Found.Count, Page * PageSize) - 1;
    for I := First to Last do
      VM.Results.Add(ResourceVM(Found[I]));
    VM.HasMore := Found.Count > Page * PageSize;
    VM.NextPageUrl := FiltersQueryString(Filters, Page + 1);

    if IsHtmx and (Page > 1) then
      Render('_cards.html', VM)               // "load more": next cards only
    else if IsHtmx and (FRequest.GetFieldByName('HX-Target') = 'results') then
      Render('_results.html', VM)             // live filtering
    else
      Render('search.html', VM);              // full page
  finally
    VM.Free;
    Found.Free;
  end;
end;

procedure TWebModuleMain.HandleResource;
var
  Res: TResource;
  VM: TResourceVM;
begin
  Res := Store.FindResource(Param('id'));
  if Res = nil then
  begin
    SendHtml('', 404);
    Exit;
  end;
  if not IsHtmx then
  begin
    Redirect(Res.Url);
    Exit;
  end;
  VM := ResourceVM(Res);
  try
    Render('_detail.html', VM);
  finally
    VM.Free;
  end;
end;

procedure TWebModuleMain.HandleLucky;
var
  Res: TResource;
  VM: TResourceVM;
begin
  Res := Store.RandomFeatured;
  if Res = nil then
  begin
    SendHtml('');
    Exit;
  end;
  if not IsHtmx then
  begin
    Redirect(Res.Url);
    Exit;
  end;
  VM := ResourceVM(Res);
  try
    Render('_detail.html', VM);
  finally
    VM.Free;
  end;
end;

{ Online radio player, loaded into the #player bar (hx-preserve keeps it
  playing while the visitor navigates with hx-boost). }
procedure TWebModuleMain.HandlePlayer;
var
  Res: TResource;
  VM: TResourceVM;
  Episodes: TArray<TRadioEpisode>;
  Ep: TRadioEpisode;
begin
  Res := Store.FindResource(Param('id'));
  if (Res = nil) or (Res.StreamType = '') then
  begin
    SendHtml('', 404);
    Exit;
  end;
  VM := ResourceVM(Res);
  try
    if Res.StreamType = 'rss' then
      try
        Episodes := TRadioFeed.LatestEpisodes(Res.StreamUrl);
        for Ep in Episodes do
          VM.Episodes.Add(TEpisodeVM.Create(Ep.Title, Ep.AudioUrl, Ep.Published));
      except
        VM.EpisodesError := True;
      end;
    Render('_player.html', VM);
  finally
    VM.Free;
  end;
end;

{ ---------------------------------------------------------------------------
  Bookmarks (stored in a cookie)
  --------------------------------------------------------------------------- }

procedure TWebModuleMain.HandleToggleBookmark;
var
  Id: string;
  Res: TResource;
  VM: TResourceVM;
begin
  Id := Param('id');
  Res := Store.FindResource(Id);
  if Res = nil then
  begin
    SendHtml('', 404);
    Exit;
  end;
  if FSaved.Contains(Id) then
    FSaved.Remove(Id)
  else
    FSaved.Add(Id);
  StoreSavedIds;
  FApp.SavedCount := FSaved.Count;
  FResponse.SetCustomHeader('HX-Trigger', 'bookmarksChanged');
  VM := ResourceVM(Res);
  try
    Render('_bookmark_btn.html', VM);
  finally
    VM.Free;
  end;
end;

procedure TWebModuleMain.HandleBookmarks;
var
  VM: TSearchVM;
  Id: string;
  Res: TResource;
begin
  FApp.Section := 'bookmarks';
  VM := TSearchVM.Create;
  try
    for Id in FSaved do
    begin
      Res := Store.FindResource(Id);
      if Res <> nil then
        VM.Results.Add(ResourceVM(Res));
    end;
    VM.Total := VM.Results.Count;
    VM.Stats := VM.Total.ToString + ' ' + T('savedCount');
    Render('bookmarks.html', VM);
  finally
    VM.Free;
  end;
end;

procedure TWebModuleMain.HandleBookmarksCount;
begin
  SendHtml(FSaved.Count.ToString);
end;

procedure TWebModuleMain.HandleBookmarksClear;
begin
  FSaved.Clear;
  StoreSavedIds;
  Redirect('/bookmarks');
end;

procedure TWebModuleMain.HandleBookmarksExport;
var
  Arr: TJSONArray;
  Obj: TJSONObject;
  Id: string;
  Res: TResource;
begin
  Arr := TJSONArray.Create;
  try
    for Id in FSaved do
    begin
      Res := Store.FindResource(Id);
      if Res = nil then
        Continue;
      Obj := TJSONObject.Create;
      Obj.AddPair('id', Res.Id);
      Obj.AddPair('title', Res.Title);
      Obj.AddPair('url', Res.Url);
      Obj.AddPair('category', Res.Category);
      Obj.AddPair('level', Res.Level);
      Obj.AddPair('description', Res.Description.Get(FLang));
      Arr.AddElement(Obj);
    end;
    FResponse.ContentType := 'application/json; charset=utf-8';
    FResponse.SetCustomHeader('Content-Disposition', 'attachment; filename="serchilo-legosignoj.json"');
    FResponse.ContentStream := TBytesStream.Create(TEncoding.UTF8.GetBytes(Arr.Format(2)));
  finally
    Arr.Free;
  end;
end;

{ ---------------------------------------------------------------------------
  Preferences
  --------------------------------------------------------------------------- }

function SafeBack(const AReferer, ADefault: string): string;
var
  P: Integer;
begin
  // Keep only the local path of the Referer, never redirect off-site
  Result := AReferer;
  P := Result.IndexOf('://');
  if P >= 0 then
  begin
    Result := Result.Substring(P + 3);
    P := Result.IndexOf('/');
    if P >= 0 then
      Result := Result.Substring(P)
    else
      Result := '/';
  end;
  if (Result = '') or not Result.StartsWith('/') or Result.StartsWith('//') or
    Result.StartsWith('/lang') or Result.StartsWith('/role') then
    Result := ADefault;
end;

procedure TWebModuleMain.HandleLanguage;
begin
  SetCookie(CookieLang, NormalizeLang(Param('l')));
  Redirect(SafeBack(FRequest.Referer, '/'));
end;

procedure TWebModuleMain.HandleRole;
var
  Role: string;
begin
  Role := Param('r');
  if (Role <> 'moderator') and (Role <> 'teacher') then
    Role := 'learner';
  SetCookie(CookieRole, Role);
  Redirect(SafeBack(FRequest.Referer, '/forum'));
end;

{ ---------------------------------------------------------------------------
  Forum
  --------------------------------------------------------------------------- }

procedure TWebModuleMain.HandleForum;
var
  VM: TForumVM;
  Topics: TList<TForumTopic>;
  Topic: TForumTopic;
  Cat, Lvl: string;
begin
  FApp.Section := 'forum';
  Cat := Param('category', 'all');
  Lvl := Param('level', 'all');
  VM := TForumVM.Create;
  Topics := TList<TForumTopic>.Create;
  Store.Lock;
  try
    VM.Query := Param('q');
    Store.ListTopics(Cat, Lvl, VM.Query, Topics);
    for Topic in Topics do
      VM.Topics.Add(TTopicVM.Create(Topic, FLang, FVisitor, CanModerate, False));
    FillForumCategoryOptions(VM.CategoryOptions, Cat, True);
    FillLevelOptions(VM.LevelOptions, Lvl);
    FillForumCategoryOptions(VM.NewCategoryOptions, 'general', False);
    FillLevelOptions(VM.NewLevelOptions, 'all');
    if IsHtmx and (FRequest.GetFieldByName('HX-Target') = 'topics') then
      Render('_topics.html', VM)
    else
      Render('forum.html', VM);
  finally
    Store.Unlock;
    Topics.Free;
    VM.Free;
  end;
end;

procedure TWebModuleMain.HandleForumTopic;
var
  VM: TForumVM;
  Topic: TForumTopic;
begin
  FApp.Section := 'forum';
  VM := TForumVM.Create;
  Store.Lock;
  try
    Topic := Store.FindTopic(Param('id'));
    if Topic = nil then
    begin
      Redirect('/forum');
      Exit;
    end;
    Inc(Topic.Views);
    VM.SetTopic(TTopicVM.Create(Topic, FLang, FVisitor, CanModerate, True));
    Render('topic.html', VM);
  finally
    Store.Unlock;
    VM.Free;
  end;
end;

procedure TWebModuleMain.HandleForumCreate;
var
  Title, Content, Tag: string;
  Tags: TList<string>;
  Topic: TForumTopic;
begin
  Title := ConvertXSystem(Param('title'));
  Content := ConvertXSystem(Param('content'));
  if (Title = '') or (Content = '') then
  begin
    // 200 so that htmx swaps the message into #topic-errors
    SendHtml('<p class="text-sm text-red-600">' + TNetEncoding.HTML.Encode(
      T('forumTopicTitleLabel') + ' / ' + T('forumTopicMessageLabel')) + ' *</p>');
    Exit;
  end;
  Tags := TList<string>.Create;
  try
    for Tag in Param('tags').Split([','], TStringSplitOptions.ExcludeEmpty) do
      if Tag.Trim <> '' then
        Tags.Add(Tag.Trim.ToLower);
    Store.Lock;
    try
      Topic := Store.CreateTopic(CurrentUser, Title, Content, Param('category', 'general'),
        Param('level', 'all'), Tags.ToArray);
      Topic.LikedBy.Add(FVisitor);
      Topic.Likes := 1;
      Redirect('/forum/topic?id=' + UrlEncode(Topic.Id));
    finally
      Store.Unlock;
    end;
  finally
    Tags.Free;
  end;
end;

procedure TWebModuleMain.HandleForumReply;
var
  Topic: TForumTopic;
  Comment: TForumComment;
  Content: string;
  VM: TCommentVM;
begin
  Content := ConvertXSystem(Param('content'));
  Store.Lock;
  try
    Topic := Store.FindTopic(Param('id'));
    if (Topic = nil) or (Content = '') or (Topic.IsLocked and not CanModerate) then
    begin
      SendHtml('', 204);
      Exit;
    end;
    Comment := Store.AddComment(Topic, CurrentUser, Content,
      CanModerate and (Param('modnote') <> ''));
    VM := TCommentVM.Create(Comment, FLang, FVisitor, CanModerate);
    try
      if IsHtmx then
        Render('_comment.html', VM)
      else
        Redirect('/forum/topic?id=' + UrlEncode(Topic.Id));
    finally
      VM.Free;
    end;
  finally
    Store.Unlock;
  end;
end;

procedure TWebModuleMain.HandleForumLike;
var
  Topic: TForumTopic;
  VM: TTopicVM;
begin
  Store.Lock;
  try
    Topic := Store.FindTopic(Param('id'));
    if Topic = nil then
    begin
      SendHtml('', 404);
      Exit;
    end;
    Store.ToggleTopicLike(Topic, FVisitor);
    VM := TTopicVM.Create(Topic, FLang, FVisitor, CanModerate, False);
    try
      Render('_topic_like.html', VM);
    finally
      VM.Free;
    end;
  finally
    Store.Unlock;
  end;
end;

procedure TWebModuleMain.HandleForumCommentLike;
var
  Topic: TForumTopic;
  C, Found: TForumComment;
  VM: TCommentVM;
begin
  Store.Lock;
  try
    Found := nil;
    Topic := Store.FindTopic(Param('topic'));
    if Topic <> nil then
      for C in Topic.Comments do
        if C.Id = Param('id') then
          Found := C;
    if Found = nil then
    begin
      SendHtml('', 404);
      Exit;
    end;
    Store.ToggleCommentLike(Found, FVisitor);
    VM := TCommentVM.Create(Found, FLang, FVisitor, CanModerate);
    try
      Render('_comment_like.html', VM);
    finally
      VM.Free;
    end;
  finally
    Store.Unlock;
  end;
end;

procedure TWebModuleMain.HandleForumModerate;
var
  Topic: TForumTopic;
  Action, Id: string;
begin
  if not CanModerate then
  begin
    SendHtml('', 403);
    Exit;
  end;
  Action := Param('action');
  Id := Param('id');
  Store.Lock;
  try
    Topic := Store.FindTopic(Id);
    if Topic = nil then
    begin
      Redirect('/forum');
      Exit;
    end;
    if Action = 'pin' then
      Topic.IsPinned := not Topic.IsPinned
    else if Action = 'lock' then
      Topic.IsLocked := not Topic.IsLocked
    else if Action = 'delete' then
    begin
      Store.DeleteTopic(Topic);
      Redirect('/forum');
      Exit;
    end;
  finally
    Store.Unlock;
  end;
  Redirect('/forum/topic?id=' + UrlEncode(Id));
end;

procedure TWebModuleMain.HandleForumCommentDelete;
var
  Topic: TForumTopic;
  C: TForumComment;
begin
  if not CanModerate then
  begin
    SendHtml('', 403);
    Exit;
  end;
  Store.Lock;
  try
    Topic := Store.FindTopic(Param('topic'));
    if Topic <> nil then
      for C in Topic.Comments do
        if C.Id = Param('id') then
        begin
          Store.DeleteComment(Topic, C);
          Break;
        end;
  finally
    Store.Unlock;
  end;
  SendHtml(''); // hx-swap="outerHTML" removes the comment
end;

{ ---------------------------------------------------------------------------
  Add resources (manual + live Google Search grounding)
  --------------------------------------------------------------------------- }

procedure TWebModuleMain.HandleAddForm;
var
  VM: TAddVM;
begin
  FApp.Section := 'add';
  VM := TAddVM.Create;
  try
    VM.LiveQuery := Param('q');
    FillLevelOptions(VM.LevelOptions, 'all');
    FillCategoryOptions(VM.CategoryOptions, 'projects');
    VM.CategoryOptions.Delete(0); // no "all" when adding
    FillFormatOptions(VM.FormatOptions, 'website', False);
    Render('add.html', VM);
  finally
    VM.Free;
  end;
end;

function IsValidUrl(const AUrl: string): Boolean;
begin
  Result := (AUrl.StartsWith('http://') or AUrl.StartsWith('https://')) and
    (AUrl.IndexOf('.') > 0) and (AUrl.IndexOf(' ') < 0);
end;

function HostOfUrl(const AUrl: string): string;
begin
  Result := AUrl;
  if Result.StartsWith('https://') then
    Result := Result.Substring(8)
  else if Result.StartsWith('http://') then
    Result := Result.Substring(7);
  if Result.StartsWith('www.') then
    Result := Result.Substring(4);
  while Result.EndsWith('/') do
    Result := Result.Substring(0, Result.Length - 1);
end;

procedure TWebModuleMain.HandleAddSubmit;
var
  VM: TAddVM;
  Res: TResource;
  Url, Desc, Tag: string;
  Tags: TList<string>;
begin
  VM := TAddVM.Create;
  try
    Url := Param('url');
    if Url = '' then
    begin
      VM.IsError := True;
      VM.Message := T('urlRequiredNotice');
    end
    else if not IsValidUrl(Url) then
    begin
      VM.IsError := True;
      VM.Message := T('invalidUrlNotice');
    end
    else
    begin
      Res := TResource.Create;
      Res.Url := Url;
      Res.DisplayUrl := HostOfUrl(Url);
      Res.Title := ConvertXSystem(Param('title'));
      if Res.Title = '' then
        Res.Title := Res.DisplayUrl;
      Desc := ConvertXSystem(Param('description'));
      Res.Description.Eo := Desc;
      Res.Description.Es := Desc;
      Res.Description.En := Desc;
      Res.Category := Param('category', 'projects');
      Res.Level := Param('level', 'all');
      Res.Format := Param('format', 'website');
      Res.IsFree := Param('free') <> '';
      Tags := TList<string>.Create;
      try
        for Tag in Param('tags').Split([','], TStringSplitOptions.ExcludeEmpty) do
          if Tag.Trim <> '' then
            Tags.Add(Tag.Trim.ToLower);
        Res.Tags := Tags.ToArray;
      finally
        Tags.Free;
      end;
      if Store.AddResource(Res) then
      begin
        VM.IsSuccess := True;
        VM.Message := T('addSuccessNotice');
      end
      else
      begin
        Res.Free;
        VM.IsError := True;
        VM.Message := T('duplicateUrlError');
      end;
    end;
    Render('_add_result.html', VM);
  finally
    VM.Free;
  end;
end;

procedure TWebModuleMain.HandleLiveSearch;
var
  VM: TAddVM;
  Items: TArray<TLiveResult>;
  R: TLiveResult;
begin
  VM := TAddVM.Create;
  try
    VM.LiveQuery := ConvertXSystem(Param('q'));
    if VM.LiveQuery = '' then
    begin
      VM.IsError := True;
      VM.Message := T('crawlerQueryPlaceholder');
    end
    else if not TGeminiSearch.IsConfigured then
    begin
      VM.IsError := True;
      VM.Message := 'GEMINI_API_KEY ne estas agordita en la servilo.';
    end
    else
      try
        Items := TGeminiSearch.Search(VM.LiveQuery, FLang, Param('level'));
        for R in Items do
          VM.LiveItems.Add(TLiveItemVM.Create(R.Title, R.Url, R.DisplayUrl, R.Snippet,
            R.Level, R.Category, T('categories_' + R.Category), Store.UrlExists(R.Url)));
        if Length(Items) = 0 then
        begin
          VM.IsError := True;
          VM.Message := T('noCrawledFound');
        end;
      except
        on E: Exception do
        begin
          VM.IsError := True;
          VM.Message := E.Message;
        end;
      end;
    Render('_live_results.html', VM);
  finally
    VM.Free;
  end;
end;

procedure TWebModuleMain.HandleImport;
var
  Res: TResource;
  Item: TLiveItemVM;
  Snippet: string;
begin
  Res := TResource.Create;
  Res.Url := Param('url');
  Res.Title := Param('title');
  Res.DisplayUrl := Param('displayUrl', HostOfUrl(Res.Url));
  Snippet := Param('snippet');
  Res.Description.Eo := Snippet;
  Res.Description.Es := Snippet;
  Res.Description.En := Snippet;
  Res.Level := Param('level', 'all');
  Res.Category := Param('category', 'projects');
  Res.Format := 'website';
  Res.IsFree := True;
  Res.Tags := ['google', 'web'];
  if not IsValidUrl(Res.Url) or not Store.AddResource(Res, 'crawled') then
    Res.Free;
  Item := TLiveItemVM.Create(Param('title'), Param('url'), Param('displayUrl'), Snippet,
    Param('level'), Param('category'), T('categories_' + Param('category')), True);
  try
    FResponse.SetCustomHeader('HX-Trigger', 'resourcesChanged');
    Render('_live_item.html', Item);
  finally
    Item.Free;
  end;
end;

{ ---------------------------------------------------------------------------
  Dispatcher
  --------------------------------------------------------------------------- }

procedure TWebModuleMain.WebModuleBeforeDispatch(Sender: TObject; Request: TWebRequest;
  Response: TWebResponse; var Handled: Boolean);
var
  Path: string;
  User: TForumUser;
begin
  Handled := True;
  FRequest := Request;
  FResponse := Response;
  Path := Request.PathInfo;
  if (Path.Length > 1) and Path.EndsWith('/') then
    Path := Path.Substring(0, Path.Length - 1);

  if Path.StartsWith('/static/') then
  begin
    SendStatic(Path.Substring(Length('/static/')));
    Exit;
  end;

  FApp := TAppVM.Create;
  FSaved := TList<string>.Create;
  try
    FLang := NormalizeLang(Cookie(CookieLang));
    FVisitor := Cookie(CookieVisitor);
    if FVisitor = '' then
    begin
      FVisitor := TGUID.NewGuid.ToString.Replace('{', '').Replace('}', '');
      SetCookie(CookieVisitor, FVisitor);
    end;
    LoadSavedIds;

    FApp.Lang := FLang;
    FApp.Role := Cookie(CookieRole);
    if FApp.Role = '' then
      FApp.Role := 'learner';
    User := CurrentUser;
    FApp.UserName := User.Name;
    FApp.UserAvatar := User.AvatarColor;
    FApp.UserLevel := User.LevelBadge;
    FApp.SavedCount := FSaved.Count;
    FApp.LiveSearchEnabled := TGeminiSearch.IsConfigured;
    FApp.ResourceCount := Store.ResourceCount;
    FApp.Year := YearOf(Now).ToString;
    FApp.Section := 'search';

    try
      if Path = '/' then HandleHome
      else if Path = '/search' then HandleSearch
      else if Path = '/resource' then HandleResource
      else if Path = '/lucky' then HandleLucky
      else if Path = '/player' then HandlePlayer
      else if (Path = '/bookmark') and IsPost then HandleToggleBookmark
      else if Path = '/bookmarks' then HandleBookmarks
      else if Path = '/bookmarks/count' then HandleBookmarksCount
      else if (Path = '/bookmarks/clear') and IsPost then HandleBookmarksClear
      else if Path = '/bookmarks/export' then HandleBookmarksExport
      else if Path = '/lang' then HandleLanguage
      else if Path = '/role' then HandleRole
      else if Path = '/forum' then HandleForum
      else if (Path = '/forum/topic') and IsPost then HandleForumCreate
      else if Path = '/forum/topic' then HandleForumTopic
      else if (Path = '/forum/reply') and IsPost then HandleForumReply
      else if (Path = '/forum/like') and IsPost then HandleForumLike
      else if (Path = '/forum/comment-like') and IsPost then HandleForumCommentLike
      else if (Path = '/forum/mod') and IsPost then HandleForumModerate
      else if (Path = '/forum/comment-delete') and IsPost then HandleForumCommentDelete
      else if (Path = '/add') and IsPost then HandleAddSubmit
      else if Path = '/add' then HandleAddForm
      else if (Path = '/live-search') and IsPost then HandleLiveSearch
      else if (Path = '/import') and IsPost then HandleImport
      else
      begin
        FApp.Section := '';
        SendHtml(RenderTemplate('notfound.html', nil), 404);
      end;
    except
      on E: Exception do
        SendHtml('<h1>500</h1><pre>' + TNetEncoding.HTML.Encode(E.ClassName + ': ' + E.Message) +
          '</pre>', 500);
    end;
  finally
    FreeAndNil(FSaved);
    FreeAndNil(FApp);
  end;
end;

end.
