{ Copyright (C) 2026 Antonio Alcázar Ruiz (MiTeruel) <mrgarciagarcia@gmail.com>
  Part of the PluTony project. Licensed under the GNU GPL v3.0 or later;
  see LICENSE for the full text. }

unit Serchi.ViewModels;

{ View models exposed to the WebStencils templates through AddVar.
  WebStencils reads public properties via RTTI, so every value a template
  needs (already localized and formatted) is published here as a property.
  Collections are TObjectList<T> so templates can iterate them with @ForEach. }

interface

uses
  System.SysUtils, System.Generics.Collections,
  Serchi.Models;

type
  TTextVM = class
  private
    FText: string;
  public
    constructor Create(const AText: string);
    property Text: string read FText;
  end;

  TOptionVM = class
  private
    FValue, FLabel: string;
    FSelected: Boolean;
  public
    constructor Create(const AValue, ALabel: string; ASelected: Boolean);
    property Value: string read FValue;
    property Label_: string read FLabel;
    property Caption: string read FLabel;
    property Selected: Boolean read FSelected;
  end;

  TLinkVM = class
  private
    FTitle, FUrl: string;
  public
    constructor Create(const ATitle, AUrl: string);
    property Title: string read FTitle;
    property Url: string read FUrl;
  end;

  TEpisodeVM = class
  private
    FTitle, FAudioUrl, FPubDate: string;
  public
    constructor Create(const ATitle, AAudioUrl, APubDate: string);
    property Title: string read FTitle;
    property AudioUrl: string read FAudioUrl;
    property PubDate: string read FPubDate;
  end;

  { Global, per-request information used by the layout }
  TAppVM = class
  private
    FLang: string;
    FSavedCount: Integer;
    FRole: string;
    FUserName: string;
    FUserAvatar: string;
    FUserLevel: string;
    FLiveSearchEnabled: Boolean;
    FResourceCount: Integer;
    FQuery: string;
    FSection: string;
    FYear: string;
  public
    property Lang: string read FLang write FLang;
    function IsEo: Boolean;
    function IsEs: Boolean;
    function IsEn: Boolean;
    property IsLangEo: Boolean read IsEo;
    property IsLangEs: Boolean read IsEs;
    property IsLangEn: Boolean read IsEn;
    property SavedCount: Integer read FSavedCount write FSavedCount;
    property Role: string read FRole write FRole;
    function GetIsModerator: Boolean;
    function GetIsTeacher: Boolean;
    function GetIsLearner: Boolean;
    property IsModerator: Boolean read GetIsModerator;
    property IsTeacher: Boolean read GetIsTeacher;
    property IsLearner: Boolean read GetIsLearner;
    property UserName: string read FUserName write FUserName;
    property UserAvatar: string read FUserAvatar write FUserAvatar;
    property UserLevel: string read FUserLevel write FUserLevel;
    property LiveSearchEnabled: Boolean read FLiveSearchEnabled write FLiveSearchEnabled;
    property ResourceCount: Integer read FResourceCount write FResourceCount;
    property Query: string read FQuery write FQuery;
    { home | search | forum | bookmarks | add }
    property Section: string read FSection write FSection;
    function GetIsSearchSection: Boolean;
    function GetIsForumSection: Boolean;
    function GetIsHomeSection: Boolean;
    property IsSearchSection: Boolean read GetIsSearchSection;
    property IsForumSection: Boolean read GetIsForumSection;
    property IsHomeSection: Boolean read GetIsHomeSection;
    function GetIsResultsPage: Boolean;
    function GetShowHeaderSearch: Boolean;
    property IsResultsPage: Boolean read GetIsResultsPage;
    property ShowHeaderSearch: Boolean read GetShowHeaderSearch;
    property Year: string read FYear write FYear;
  end;

  TResourceVM = class
  private
    FRes: TResource;
    FLang: string;
    FSaved: Boolean;
    FDescription, FCategoryLabel, FLevelLabel, FFormatLabel: string;
    FTags: TObjectList<TTextVM>;
    FFeatures: TObjectList<TTextVM>;
    FEpisodes: TObjectList<TEpisodeVM>;
    FEpisodesError: Boolean;
    function GetLanguagesText: string;
    function GetEmbedUrl: string;
  public
    constructor Create(ARes: TResource; const ALang: string; ASaved: Boolean;
      const ACategoryLabel, ALevelLabel, AFormatLabel: string);
    destructor Destroy; override;
    function GetId: string;
    function GetTitle: string;
    function GetUrl: string;
    function GetDisplayUrl: string;
    function GetLevel: string;
    function GetCategory: string;
    function GetIsFree: Boolean;
    function GetFeatured: Boolean;
    function GetAuthor: string;
    function GetYear: string;
    function GetHasAuthor: Boolean;
    function GetHasYear: Boolean;
    function GetHasFeatures: Boolean;
    function GetHasLevel: Boolean;
    property Id: string read GetId;
    property Title: string read GetTitle;
    property Url: string read GetUrl;
    property DisplayUrl: string read GetDisplayUrl;
    property Description: string read FDescription;
    property Level: string read GetLevel;
    property HasLevel: Boolean read GetHasLevel;
    property LevelLabel: string read FLevelLabel;
    property Category: string read GetCategory;
    property CategoryLabel: string read FCategoryLabel;
    property FormatLabel: string read FFormatLabel;
    property IsFree: Boolean read GetIsFree;
    property Featured: Boolean read GetFeatured;
    property Author: string read GetAuthor;
    property HasAuthor: Boolean read GetHasAuthor;
    property Year: string read GetYear;
    property HasYear: Boolean read GetHasYear;
    property LanguagesText: string read GetLanguagesText;
    property Saved: Boolean read FSaved;
    property Tags: TObjectList<TTextVM> read FTags;
    property Features: TObjectList<TTextVM> read FFeatures;
    property HasFeatures: Boolean read GetHasFeatures;
    { Online player (radio stations) }
    function GetHasStream: Boolean;
    function GetIsSpotify: Boolean;
    function GetIsZeno: Boolean;
    function GetIsRss: Boolean;
    function GetIsAudio: Boolean;
    function GetStreamUrl: string;
    function GetHasEpisodes: Boolean;
    function GetFirstEpisodeUrl: string;
    property HasStream: Boolean read GetHasStream;
    property IsSpotify: Boolean read GetIsSpotify;
    property IsZeno: Boolean read GetIsZeno;
    property IsRss: Boolean read GetIsRss;
    property IsAudio: Boolean read GetIsAudio;
    property StreamUrl: string read GetStreamUrl;
    { Spotify / Zeno.FM embed player URL derived from the stored page URL }
    property EmbedUrl: string read GetEmbedUrl;
    property Episodes: TObjectList<TEpisodeVM> read FEpisodes;
    property HasEpisodes: Boolean read GetHasEpisodes;
    property FirstEpisodeUrl: string read GetFirstEpisodeUrl;
    property EpisodesError: Boolean read FEpisodesError write FEpisodesError;
  end;

  TKnowledgeVM = class
  private
    FTitle, FSubtitle, FDescription: string;
    FFacts: TObjectList<TOptionVM>; // Value = fact value, Caption = fact label
    FLinks: TObjectList<TLinkVM>;
  public
    constructor Create(APanel: TKnowledgePanel; const ALang: string);
    destructor Destroy; override;
    property Title: string read FTitle;
    property Subtitle: string read FSubtitle;
    property Description: string read FDescription;
    property Facts: TObjectList<TOptionVM> read FFacts;
    property Links: TObjectList<TLinkVM> read FLinks;
  end;

  { Search results, bookmarks and home page }
  TSearchVM = class
  private
    FQuery, FDisplayQuery, FStats, FExactPhrase, FAnyWords, FExcludeWords: string;
    FResults, FPeople, FEvents, FKids: TObjectList<TResourceVM>;
    FKnowledge: TKnowledgeVM;
    FTotal: Integer;
    FHasMore: Boolean;
    FNextPageUrl: string;
    FFreeOnly, FAdvancedOpen: Boolean;
    FLevelOptions, FCategoryOptions, FFormatOptions, FSortOptions: TObjectList<TOptionVM>;
    FPopular: TObjectList<TTextVM>;
    FLiveQuery: string;
    function GetHasResults: Boolean;
    function GetHasPeople: Boolean;
    function GetHasEvents: Boolean;
    function GetHasKids: Boolean;
    function GetHasKnowledge: Boolean;
    function GetHasQuery: Boolean;
  public
    constructor Create;
    destructor Destroy; override;
    procedure SetKnowledge(AValue: TKnowledgeVM);
    property Query: string read FQuery write FQuery;
    property DisplayQuery: string read FDisplayQuery write FDisplayQuery;
    property HasQuery: Boolean read GetHasQuery;
    property Stats: string read FStats write FStats;
    property Total: Integer read FTotal write FTotal;
    property Results: TObjectList<TResourceVM> read FResults;
    property HasResults: Boolean read GetHasResults;
    { Home page: famous Esperantists (featured resources of the 'people' category) }
    property People: TObjectList<TResourceVM> read FPeople;
    property HasPeople: Boolean read GetHasPeople;
    { Home page: main Esperanto events (featured resources of the 'events' category) }
    property Events: TObjectList<TResourceVM> read FEvents;
    property HasEvents: Boolean read GetHasEvents;
    { Home page: kids' corner (featured resources of the 'kids' category) }
    property Kids: TObjectList<TResourceVM> read FKids;
    property HasKids: Boolean read GetHasKids;
    property Knowledge: TKnowledgeVM read FKnowledge;
    property HasKnowledge: Boolean read GetHasKnowledge;
    property HasMore: Boolean read FHasMore write FHasMore;
    property NextPageUrl: string read FNextPageUrl write FNextPageUrl;
    property FreeOnly: Boolean read FFreeOnly write FFreeOnly;
    property ExactPhrase: string read FExactPhrase write FExactPhrase;
    property AnyWords: string read FAnyWords write FAnyWords;
    property ExcludeWords: string read FExcludeWords write FExcludeWords;
    property AdvancedOpen: Boolean read FAdvancedOpen write FAdvancedOpen;
    property LevelOptions: TObjectList<TOptionVM> read FLevelOptions;
    property CategoryOptions: TObjectList<TOptionVM> read FCategoryOptions;
    property FormatOptions: TObjectList<TOptionVM> read FFormatOptions;
    property SortOptions: TObjectList<TOptionVM> read FSortOptions;
    property Popular: TObjectList<TTextVM> read FPopular;
    property LiveQuery: string read FLiveQuery write FLiveQuery;
  end;

  TCommentVM = class
  private
    FId, FTopicId, FAuthorName, FAuthorAvatar, FAuthorRole, FAuthorLevel,
      FContent, FCreated: string;
    FLikes: Integer;
    FLiked, FIsModNote, FCanModerate: Boolean;
  public
    constructor Create(AComment: TForumComment; const ALang, AVisitor: string; ACanModerate: Boolean);
    property Id: string read FId;
    property TopicId: string read FTopicId;
    property AuthorName: string read FAuthorName;
    property AuthorAvatar: string read FAuthorAvatar;
    property AuthorRole: string read FAuthorRole;
    property AuthorLevel: string read FAuthorLevel;
    property Content: string read FContent;
    property Created: string read FCreated;
    property Likes: Integer read FLikes;
    property Liked: Boolean read FLiked;
    property IsModNote: Boolean read FIsModNote;
    property CanModerate: Boolean read FCanModerate;
  end;

  TTopicVM = class
  private
    FId, FTitle, FContent, FExcerpt, FAuthorName, FAuthorAvatar, FAuthorRole,
      FAuthorLevel, FLevel, FLevelLabel, FCategoryLabel, FCreated: string;
    FViews, FLikes, FReplies: Integer;
    FLiked, FIsPinned, FIsLocked, FCanModerate: Boolean;
    FTags: TObjectList<TTextVM>;
    FComments: TObjectList<TCommentVM>;
    function GetHasComments: Boolean;
    function GetCanReply: Boolean;
  public
    constructor Create(ATopic: TForumTopic; const ALang, AVisitor: string;
      ACanModerate, AWithComments: Boolean);
    destructor Destroy; override;
    property Id: string read FId;
    property Title: string read FTitle;
    property Content: string read FContent;
    property Excerpt: string read FExcerpt;
    property AuthorName: string read FAuthorName;
    property AuthorAvatar: string read FAuthorAvatar;
    property AuthorRole: string read FAuthorRole;
    property AuthorLevel: string read FAuthorLevel;
    property Level: string read FLevel;
    property LevelLabel: string read FLevelLabel;
    property CategoryLabel: string read FCategoryLabel;
    property Created: string read FCreated;
    property Views: Integer read FViews;
    property Likes: Integer read FLikes;
    property Replies: Integer read FReplies;
    property Liked: Boolean read FLiked;
    property IsPinned: Boolean read FIsPinned;
    property IsLocked: Boolean read FIsLocked;
    property CanModerate: Boolean read FCanModerate;
    property CanReply: Boolean read GetCanReply;
    property Tags: TObjectList<TTextVM> read FTags;
    property Comments: TObjectList<TCommentVM> read FComments;
    property HasComments: Boolean read GetHasComments;
  end;

  TForumVM = class
  private
    FQuery: string;
    FTopics: TObjectList<TTopicVM>;
    FCategoryOptions, FLevelOptions, FNewCategoryOptions, FNewLevelOptions: TObjectList<TOptionVM>;
    FTopic: TTopicVM;
    function GetHasTopics: Boolean;
  public
    constructor Create;
    destructor Destroy; override;
    procedure SetTopic(AValue: TTopicVM);
    property Query: string read FQuery write FQuery;
    property Topics: TObjectList<TTopicVM> read FTopics;
    property HasTopics: Boolean read GetHasTopics;
    property CategoryOptions: TObjectList<TOptionVM> read FCategoryOptions;
    property LevelOptions: TObjectList<TOptionVM> read FLevelOptions;
    property NewCategoryOptions: TObjectList<TOptionVM> read FNewCategoryOptions;
    property NewLevelOptions: TObjectList<TOptionVM> read FNewLevelOptions;
    property Topic: TTopicVM read FTopic;
  end;

  TLiveItemVM = class
  private
    FTitle, FUrl, FDisplayUrl, FSnippet, FLevel, FCategory, FCategoryLabel: string;
    FInIndex: Boolean;
  public
    constructor Create(const ATitle, AUrl, ADisplayUrl, ASnippet, ALevel,
      ACategory, ACategoryLabel: string; AInIndex: Boolean);
    property Title: string read FTitle;
    property Url: string read FUrl;
    property DisplayUrl: string read FDisplayUrl;
    property Snippet: string read FSnippet;
    property Level: string read FLevel;
    property Category: string read FCategory;
    property CategoryLabel: string read FCategoryLabel;
    property InIndex: Boolean read FInIndex write FInIndex;
  end;

  { Add-resource form and live Google-grounded discovery }
  { Page that asks for the moderator key (FORUM_MODERATOR_KEY) }
  TModeratorVM = class
  private
    FIsError: Boolean;
  public
    property IsError: Boolean read FIsError write FIsError;
  end;

  TAddVM = class
  private
    FMessage: string;
    FIsError, FIsSuccess: Boolean;
    FLiveQuery: string;
    FLiveItems: TObjectList<TLiveItemVM>;
    FLevelOptions, FCategoryOptions, FFormatOptions: TObjectList<TOptionVM>;
    function GetHasMessage: Boolean;
    function GetHasLiveItems: Boolean;
  public
    constructor Create;
    destructor Destroy; override;
    property Message: string read FMessage write FMessage;
    property HasMessage: Boolean read GetHasMessage;
    property IsError: Boolean read FIsError write FIsError;
    property IsSuccess: Boolean read FIsSuccess write FIsSuccess;
    property LiveQuery: string read FLiveQuery write FLiveQuery;
    property LiveItems: TObjectList<TLiveItemVM> read FLiveItems;
    property HasLiveItems: Boolean read GetHasLiveItems;
    property LevelOptions: TObjectList<TOptionVM> read FLevelOptions;
    property CategoryOptions: TObjectList<TOptionVM> read FCategoryOptions;
    property FormatOptions: TObjectList<TOptionVM> read FFormatOptions;
  end;

function RelativeTime(AWhen: TDateTime; const ALang: string): string;

implementation

uses
  System.DateUtils, Serchi.I18n;

function RelativeTime(AWhen: TDateTime; const ALang: string): string;
var
  Mins: Int64;
  Amount: string;
begin
  Mins := MinutesBetween(Now, AWhen);
  if Mins < 1 then
    Amount := '< 1 min'
  else if Mins < 60 then
    Amount := Mins.ToString + ' min'
  else if Mins < 60 * 24 then
    Amount := (Mins div 60).ToString + ' h'
  else
    Amount := (Mins div (60 * 24)).ToString + ' d';
  if ALang = 'es' then
    Result := 'hace ' + Amount
  else if ALang = 'en' then
    Result := Amount + ' ago'
  else
    Result := 'antaŭ ' + Amount;
end;

function RoleLabel(const ARole, ALang: string): string;
begin
  if ARole = 'moderator' then
    Result := I18n.T(ALang, 'moderatorBadge')
  else if ARole = 'teacher' then
    Result := I18n.T(ALang, 'teacherBadge')
  else
    Result := I18n.T(ALang, 'learnerBadge');
end;

{ TTextVM }

constructor TTextVM.Create(const AText: string);
begin
  inherited Create;
  FText := AText;
end;

{ TOptionVM }

constructor TOptionVM.Create(const AValue, ALabel: string; ASelected: Boolean);
begin
  inherited Create;
  FValue := AValue;
  FLabel := ALabel;
  FSelected := ASelected;
end;

{ TLinkVM }

constructor TLinkVM.Create(const ATitle, AUrl: string);
begin
  inherited Create;
  FTitle := ATitle;
  FUrl := AUrl;
end;

{ TAppVM }

function TAppVM.IsEo: Boolean;
begin
  Result := FLang = 'eo';
end;

function TAppVM.IsEs: Boolean;
begin
  Result := FLang = 'es';
end;

function TAppVM.IsEn: Boolean;
begin
  Result := FLang = 'en';
end;

function TAppVM.GetIsModerator: Boolean;
begin
  Result := FRole = 'moderator';
end;

function TAppVM.GetIsTeacher: Boolean;
begin
  Result := FRole = 'teacher';
end;

function TAppVM.GetIsLearner: Boolean;
begin
  Result := not (GetIsModerator or GetIsTeacher);
end;

function TAppVM.GetIsSearchSection: Boolean;
begin
  Result := (FSection = 'search') or (FSection = 'bookmarks') or (FSection = 'add');
end;

function TAppVM.GetIsForumSection: Boolean;
begin
  Result := FSection = 'forum';
end;

function TAppVM.GetIsHomeSection: Boolean;
begin
  Result := FSection = 'home';
end;

function TAppVM.GetIsResultsPage: Boolean;
begin
  Result := FSection = 'search';
end;

function TAppVM.GetShowHeaderSearch: Boolean;
begin
  Result := (FSection <> 'home') and (FSection <> 'search');
end;

{ TResourceVM }

constructor TResourceVM.Create(ARes: TResource; const ALang: string; ASaved: Boolean;
  const ACategoryLabel, ALevelLabel, AFormatLabel: string);
var
  S: string;
begin
  inherited Create;
  FRes := ARes;
  FLang := ALang;
  FSaved := ASaved;
  FDescription := ARes.Description.Get(ALang);
  FCategoryLabel := ACategoryLabel;
  FLevelLabel := ALevelLabel;
  FFormatLabel := AFormatLabel;
  FTags := TObjectList<TTextVM>.Create(True);
  for S in ARes.Tags do
    FTags.Add(TTextVM.Create(S));
  FFeatures := TObjectList<TTextVM>.Create(True);
  for S in ARes.Features.Get(ALang) do
    FFeatures.Add(TTextVM.Create(S));
  FEpisodes := TObjectList<TEpisodeVM>.Create(True);
end;

destructor TResourceVM.Destroy;
begin
  FEpisodes.Free;
  FFeatures.Free;
  FTags.Free;
  inherited;
end;

function TResourceVM.GetId: string;
begin
  Result := FRes.Id;
end;

function TResourceVM.GetTitle: string;
begin
  Result := FRes.Title;
end;

function TResourceVM.GetUrl: string;
begin
  Result := FRes.Url;
end;

function TResourceVM.GetDisplayUrl: string;
begin
  Result := FRes.DisplayUrl;
end;

function TResourceVM.GetLevel: string;
begin
  Result := FRes.Level;
end;

function TResourceVM.GetHasLevel: Boolean;
begin
  Result := FRes.Level <> 'all';
end;

function TResourceVM.GetCategory: string;
begin
  Result := FRes.Category;
end;

function TResourceVM.GetIsFree: Boolean;
begin
  Result := FRes.IsFree;
end;

function TResourceVM.GetFeatured: Boolean;
begin
  Result := FRes.Featured;
end;

function TResourceVM.GetAuthor: string;
begin
  Result := FRes.Author;
end;

function TResourceVM.GetYear: string;
begin
  Result := FRes.Year;
end;

function TResourceVM.GetHasAuthor: Boolean;
begin
  Result := FRes.Author <> '';
end;

function TResourceVM.GetHasYear: Boolean;
begin
  Result := FRes.Year <> '';
end;

function TResourceVM.GetHasFeatures: Boolean;
begin
  Result := FFeatures.Count > 0;
end;

function TResourceVM.GetHasStream: Boolean;
begin
  Result := FRes.StreamType <> '';
end;

function TResourceVM.GetIsSpotify: Boolean;
begin
  Result := FRes.StreamType = 'spotify';
end;

function TResourceVM.GetIsZeno: Boolean;
begin
  Result := FRes.StreamType = 'zeno';
end;

function TResourceVM.GetIsRss: Boolean;
begin
  Result := FRes.StreamType = 'rss';
end;

function TResourceVM.GetIsAudio: Boolean;
begin
  Result := FRes.StreamType = 'audio';
end;

function TResourceVM.GetStreamUrl: string;
begin
  Result := FRes.StreamUrl;
end;

function TResourceVM.GetEmbedUrl: string;
var
  Slug: string;
begin
  Result := '';
  if GetIsSpotify then
    Result := FRes.StreamUrl.Replace('open.spotify.com/', 'open.spotify.com/embed/')
  else if GetIsZeno then
  begin
    // https://zeno.fm/radio/<slug>/ -> https://zeno.fm/player/<slug>
    Slug := FRes.StreamUrl.Substring(FRes.StreamUrl.IndexOf('/radio/') + Length('/radio/'));
    Slug := Slug.Replace('/', '');
    Result := 'https://zeno.fm/player/' + Slug;
  end;
end;

function TResourceVM.GetHasEpisodes: Boolean;
begin
  Result := FEpisodes.Count > 0;
end;

function TResourceVM.GetFirstEpisodeUrl: string;
begin
  if FEpisodes.Count > 0 then
    Result := FEpisodes[0].AudioUrl
  else
    Result := '';
end;

function TResourceVM.GetLanguagesText: string;
begin
  Result := string.Join(', ', FRes.Languages).ToUpper;
end;

{ TEpisodeVM }

constructor TEpisodeVM.Create(const ATitle, AAudioUrl, APubDate: string);
begin
  inherited Create;
  FTitle := ATitle;
  FAudioUrl := AAudioUrl;
  FPubDate := APubDate;
end;

{ TKnowledgeVM }

constructor TKnowledgeVM.Create(APanel: TKnowledgePanel; const ALang: string);
var
  F: TKnowledgeFact;
  L: TKnowledgeLink;
begin
  inherited Create;
  FTitle := APanel.Title;
  FSubtitle := APanel.Subtitle.Get(ALang);
  FDescription := APanel.Description.Get(ALang);
  FFacts := TObjectList<TOptionVM>.Create(True);
  for F in APanel.Facts do
    FFacts.Add(TOptionVM.Create(F.Value, F.Label_.Get(ALang), False));
  FLinks := TObjectList<TLinkVM>.Create(True);
  for L in APanel.Links do
    FLinks.Add(TLinkVM.Create(L.Title, L.Url));
end;

destructor TKnowledgeVM.Destroy;
begin
  FLinks.Free;
  FFacts.Free;
  inherited;
end;

{ TSearchVM }

constructor TSearchVM.Create;
begin
  inherited;
  FResults := TObjectList<TResourceVM>.Create(True);
  FPeople := TObjectList<TResourceVM>.Create(True);
  FEvents := TObjectList<TResourceVM>.Create(True);
  FKids := TObjectList<TResourceVM>.Create(True);
  FLevelOptions := TObjectList<TOptionVM>.Create(True);
  FCategoryOptions := TObjectList<TOptionVM>.Create(True);
  FFormatOptions := TObjectList<TOptionVM>.Create(True);
  FSortOptions := TObjectList<TOptionVM>.Create(True);
  FPopular := TObjectList<TTextVM>.Create(True);
end;

destructor TSearchVM.Destroy;
begin
  FPopular.Free;
  FSortOptions.Free;
  FFormatOptions.Free;
  FCategoryOptions.Free;
  FLevelOptions.Free;
  FKnowledge.Free;
  FKids.Free;
  FEvents.Free;
  FPeople.Free;
  FResults.Free;
  inherited;
end;

procedure TSearchVM.SetKnowledge(AValue: TKnowledgeVM);
begin
  FKnowledge.Free;
  FKnowledge := AValue;
end;

function TSearchVM.GetHasResults: Boolean;
begin
  Result := FResults.Count > 0;
end;

function TSearchVM.GetHasPeople: Boolean;
begin
  Result := FPeople.Count > 0;
end;

function TSearchVM.GetHasEvents: Boolean;
begin
  Result := FEvents.Count > 0;
end;

function TSearchVM.GetHasKids: Boolean;
begin
  Result := FKids.Count > 0;
end;

function TSearchVM.GetHasKnowledge: Boolean;
begin
  Result := FKnowledge <> nil;
end;

function TSearchVM.GetHasQuery: Boolean;
begin
  Result := FQuery <> '';
end;

{ TCommentVM }

constructor TCommentVM.Create(AComment: TForumComment; const ALang, AVisitor: string;
  ACanModerate: Boolean);
begin
  inherited Create;
  FId := AComment.Id;
  FTopicId := AComment.TopicId;
  FAuthorName := AComment.Author.Name;
  FAuthorAvatar := AComment.Author.AvatarColor;
  FAuthorRole := RoleLabel(AComment.Author.Role, ALang);
  FAuthorLevel := AComment.Author.LevelBadge;
  FContent := AComment.Content;
  FCreated := RelativeTime(AComment.CreatedAt, ALang);
  FLikes := AComment.Likes;
  FLiked := AComment.LikedBy.Contains(AVisitor);
  FIsModNote := AComment.IsModeratorNote;
  FCanModerate := ACanModerate;
end;

{ TTopicVM }

constructor TTopicVM.Create(ATopic: TForumTopic; const ALang, AVisitor: string;
  ACanModerate, AWithComments: Boolean);
var
  S: string;
  C: TForumComment;
begin
  inherited Create;
  FId := ATopic.Id;
  FTitle := ATopic.Title;
  FContent := ATopic.Content;
  if ATopic.Content.Length > 180 then
    FExcerpt := ATopic.Content.Substring(0, 177) + '...'
  else
    FExcerpt := ATopic.Content;
  FAuthorName := ATopic.Author.Name;
  FAuthorAvatar := ATopic.Author.AvatarColor;
  FAuthorRole := RoleLabel(ATopic.Author.Role, ALang);
  FAuthorLevel := ATopic.Author.LevelBadge;
  FLevel := ATopic.Level;
  FLevelLabel := I18n.T(ALang, 'levels_' + ATopic.Level);
  FCategoryLabel := I18n.T(ALang, 'forumCategories_' + ATopic.Category);
  FCreated := RelativeTime(ATopic.CreatedAt, ALang);
  FViews := ATopic.Views;
  FLikes := ATopic.Likes;
  FReplies := ATopic.Comments.Count;
  FLiked := ATopic.LikedBy.Contains(AVisitor);
  FIsPinned := ATopic.IsPinned;
  FIsLocked := ATopic.IsLocked;
  FCanModerate := ACanModerate;
  FTags := TObjectList<TTextVM>.Create(True);
  for S in ATopic.Tags do
    FTags.Add(TTextVM.Create(S));
  FComments := TObjectList<TCommentVM>.Create(True);
  if AWithComments then
    for C in ATopic.Comments do
      FComments.Add(TCommentVM.Create(C, ALang, AVisitor, ACanModerate));
end;

destructor TTopicVM.Destroy;
begin
  FComments.Free;
  FTags.Free;
  inherited;
end;

function TTopicVM.GetHasComments: Boolean;
begin
  Result := FComments.Count > 0;
end;

function TTopicVM.GetCanReply: Boolean;
begin
  Result := not FIsLocked or FCanModerate;
end;

{ TForumVM }

constructor TForumVM.Create;
begin
  inherited;
  FTopics := TObjectList<TTopicVM>.Create(True);
  FCategoryOptions := TObjectList<TOptionVM>.Create(True);
  FLevelOptions := TObjectList<TOptionVM>.Create(True);
  FNewCategoryOptions := TObjectList<TOptionVM>.Create(True);
  FNewLevelOptions := TObjectList<TOptionVM>.Create(True);
end;

destructor TForumVM.Destroy;
begin
  FTopic.Free;
  FNewLevelOptions.Free;
  FNewCategoryOptions.Free;
  FLevelOptions.Free;
  FCategoryOptions.Free;
  FTopics.Free;
  inherited;
end;

procedure TForumVM.SetTopic(AValue: TTopicVM);
begin
  FTopic.Free;
  FTopic := AValue;
end;

function TForumVM.GetHasTopics: Boolean;
begin
  Result := FTopics.Count > 0;
end;

{ TLiveItemVM }

constructor TLiveItemVM.Create(const ATitle, AUrl, ADisplayUrl, ASnippet, ALevel,
  ACategory, ACategoryLabel: string; AInIndex: Boolean);
begin
  inherited Create;
  FTitle := ATitle;
  FUrl := AUrl;
  FDisplayUrl := ADisplayUrl;
  FSnippet := ASnippet;
  FLevel := ALevel;
  FCategory := ACategory;
  FCategoryLabel := ACategoryLabel;
  FInIndex := AInIndex;
end;

{ TAddVM }

constructor TAddVM.Create;
begin
  inherited;
  FLiveItems := TObjectList<TLiveItemVM>.Create(True);
  FLevelOptions := TObjectList<TOptionVM>.Create(True);
  FCategoryOptions := TObjectList<TOptionVM>.Create(True);
  FFormatOptions := TObjectList<TOptionVM>.Create(True);
end;

destructor TAddVM.Destroy;
begin
  FFormatOptions.Free;
  FCategoryOptions.Free;
  FLevelOptions.Free;
  FLiveItems.Free;
  inherited;
end;

function TAddVM.GetHasMessage: Boolean;
begin
  Result := FMessage <> '';
end;

function TAddVM.GetHasLiveItems: Boolean;
begin
  Result := FLiveItems.Count > 0;
end;

end.
