{ Copyright (C) 2026 Antonio Alcázar Ruiz (MiTeruel) <mrgarciagarcia@gmail.com>
  Part of the PluTony project. Licensed under the GNU GPL v3.0 or later;
  see LICENSE for the full text. }

unit Serchi.Courses;

{ Pages of the courses made with the course editor of the Node version
  (public/editor.html): /kursoj and /kurso/<slug>. The courses are read from
  the shared database (TSerchiStore.PublishedCourses / FindPublishedCourse).

  Port of renderCoursePage and renderCourseIndex in server/courses.ts: both
  versions produce the same HTML and use /kurso.css and /kurso.js. Texts are
  plain text with two marks, **bold** and Esperanto between double braces;
  everything else is escaped. }

interface

uses
  System.SysUtils, System.JSON, Serchi.Store;

const
  // Same limits as server/courses.ts and server/audio.ts
  CourseTitleMax = 120;
  CourseTextMax = 3000;
  CourseShortMax = 200;
  CourseLessonsMax = 40;
  CourseBlocksMax = 30;
  CourseItemsMax = 60;
  CourseImageMaxBytes = 2 * 1024 * 1024;
  RecordingMaxBytes = 1024 * 1024;
  RecordingsPerVisitorPerDay = 20;
  RecordingsMaxPending = 500;

{ AContentJson: the "content" column of the courses table. APreview adds the
  "preview" banner and noindex, as in the editor's preview. }
function RenderCoursePage(const ACourse: TCourseInfo; const AContentJson: string;
  APreview: Boolean = False): string;
function RenderCourseIndex(const ACourses: TArray<TCourseInfo>): string;
function HtmlEscape(const S: string): string;
// Plain text -> HTML: escapes it, then **bold**, Esperanto in double braces and line breaks
function RichText(const S: string): string;

{ Names, as audioSlug and courseSlug in the Node version:
  "Ĝis revido!" -> gxis-revido (recordings), "Ĉu vi ŝatas?" -> cu-vi-satas (courses) }
function AudioSlug(const S: string): string;
function CourseSlug(const S: string): string;

{ Cleans a course content sent by the editor (sanitizeContent in server/courses.ts).
  AImageIds: the pictures of this course. The caller frees the result. }
function SanitizeCourseContent(AInput: TJSONValue; const AImageIds: TArray<string>): TJSONObject;
{ Esperanto texts that can be recorded: of a course content and of a mini-course page }
function CourseEsperantoTexts(const AContentJson: string): TArray<string>;
function PageEsperantoTexts(const AHtml: string): TArray<string>;
{ MIME type from the first bytes, or '' if it is not an accepted format }
function DetectAudioType(const AData: TBytes): string;
function DetectImageType(const AData: TBytes): string;

implementation

uses
  System.Classes, System.NetEncoding, System.RegularExpressions, System.Generics.Collections;

type
  TCourseUi = record
    Day, Words, Answers, Challenge, Progress, DiplomaLocked, DiplomaDone, Finished,
    OfWord, Done, Mark, Name, Listen, Courses, Empty: string;
  end;

function UiFor(const ALang: string): TCourseUi;
begin
  if ALang = 'en' then
  begin
    Result.Day := 'Day';
    Result.Words := 'Words';
    Result.Answers := 'Show answers';
    Result.Challenge := 'Challenge of the day';
    Result.Progress := 'Tick off each day when you finish it';
    Result.DiplomaLocked := 'Mark every day as done to get your diploma.';
    Result.DiplomaDone := 'You have finished the course!';
    Result.Finished := 'You have finished! Scroll down to your diploma.';
    Result.OfWord := 'of';
    Result.Done := '✓ Done';
    Result.Mark := 'Mark as done';
    Result.Name := 'Write your name for the diploma';
    Result.Listen := 'Listen: ';
    Result.Courses := 'Courses';
    Result.Empty := 'This course has no lessons yet.';
  end
  else
  begin
    Result.Day := 'Día';
    Result.Words := 'Palabras';
    Result.Answers := 'Ver soluciones';
    Result.Challenge := 'Reto del día';
    Result.Progress := 'Marca cada día al terminarlo';
    Result.DiplomaLocked := 'Marca todos los días como hechos para conseguir tu diploma.';
    Result.DiplomaDone := '¡Has terminado el curso!';
    Result.Finished := '¡Has terminado! Baja hasta el diploma.';
    Result.OfWord := 'de';
    Result.Done := '✓ Hecho';
    Result.Mark := 'Marcar como hecho';
    Result.Name := 'Escribe tu nombre para el diploma';
    Result.Listen := 'Escuchar: ';
    Result.Courses := 'Cursos';
    Result.Empty := 'Este curso todavía no tiene lecciones.';
  end;
end;

function HtmlEscape(const S: string): string;
begin
  Result := S.Replace('&', '&amp;', [rfReplaceAll]);
  Result := Result.Replace('<', '&lt;', [rfReplaceAll]);
  Result := Result.Replace('>', '&gt;', [rfReplaceAll]);
  Result := Result.Replace('"', '&quot;', [rfReplaceAll]);
  Result := Result.Replace('''', '&#39;', [rfReplaceAll]);
end;

function RichText(const S: string): string;
begin
  Result := HtmlEscape(S);
  Result := TRegEx.Replace(Result, '\*\*(.+?)\*\*', '<b>$1</b>');
  Result := TRegEx.Replace(Result, '\{\{(.+?)\}\}', '<span class="eo" lang="eo">$1</span>');
  Result := Result.Replace(#13, '', [rfReplaceAll]);
  Result := Result.Replace(#10, '<br>', [rfReplaceAll]);
end;

// ---- JSON helpers (the content was validated when the Node version saved it) ----

function JStr(AObj: TJSONObject; const AName: string): string;
var
  V: TJSONValue;
begin
  Result := '';
  if AObj = nil then
    Exit;
  V := AObj.GetValue(AName);
  if V is TJSONString then
    Result := TJSONString(V).Value;
end;

function JArr(AObj: TJSONObject; const AName: string): TJSONArray;
var
  V: TJSONValue;
begin
  Result := nil;
  if AObj = nil then
    Exit;
  V := AObj.GetValue(AName);
  if V is TJSONArray then
    Result := TJSONArray(V);
end;

function Len(A: TJSONArray): Integer;
begin
  if A = nil then
    Result := 0
  else
    Result := A.Count;
end;

function ItemObj(A: TJSONArray; I: Integer): TJSONObject;
begin
  if A.Items[I] is TJSONObject then
    Result := TJSONObject(A.Items[I])
  else
    Result := nil;
end;

function ItemStr(A: TJSONArray; I: Integer): string;
begin
  if A.Items[I] is TJSONString then
    Result := TJSONString(A.Items[I]).Value
  else
    Result := '';
end;

function ImageUrl(const AId: string): string;
begin
  Result := '/api/course-images/' + TNetEncoding.URL.Encode(AId);
end;

function H3(const ATitle: string): string;
begin
  if ATitle = '' then
    Result := ''
  else
    Result := '<h3>' + HtmlEscape(ATitle) + '</h3>';
end;

// ---- Blocks ----

function RenderBlock(B: TJSONObject; const Ui: TCourseUi): string;
var
  Kind, Title: string;
  Items, Answers: TJSONArray;
  SB: TStringBuilder;
  I: Integer;
  HasAnswers: Boolean;
  W: TJSONObject;
begin
  Kind := JStr(B, 'type');
  Title := JStr(B, 'title');
  SB := TStringBuilder.Create;
  try
    if Kind = 'words' then
    begin
      if Title = '' then
        Title := Ui.Words;
      SB.Append('<div class="block">').Append(H3(Title)).Append('<div class="words">');
      Items := JArr(B, 'items');
      for I := 0 to Len(Items) - 1 do
      begin
        W := ItemObj(Items, I);
        SB.Append('<div class="word"><b lang="eo">').Append(HtmlEscape(JStr(W, 'eo')))
          .Append('</b><span>').Append(HtmlEscape(JStr(W, 'tr'))).Append('</span></div>');
      end;
      SB.Append('</div></div>');
    end
    else if Kind = 'text' then
      SB.Append('<div class="block">').Append(H3(Title)).Append('<p>')
        .Append(RichText(JStr(B, 'text'))).Append('</p></div>')
    else if Kind = 'rule' then
      SB.Append('<p class="rule">').Append(RichText(JStr(B, 'text'))).Append('</p>')
    else if Kind = 'exercise' then
    begin
      SB.Append('<div class="block">').Append(H3(Title)).Append('<ol class="ex">');
      Items := JArr(B, 'items');
      for I := 0 to Len(Items) - 1 do
        SB.Append('<li>').Append(RichText(ItemStr(Items, I))).Append('</li>');
      SB.Append('</ol>');
      Answers := JArr(B, 'answers');
      HasAnswers := False;
      for I := 0 to Len(Answers) - 1 do
        if ItemStr(Answers, I) <> '' then
          HasAnswers := True;
      if HasAnswers then
      begin
        SB.Append('<details><summary>').Append(Ui.Answers).Append('</summary><ol>');
        for I := 0 to Len(Answers) - 1 do
          SB.Append('<li>').Append(RichText(ItemStr(Answers, I))).Append('</li>');
        SB.Append('</ol></details>');
      end;
      SB.Append('</div>');
    end
    else if Kind = 'dialog' then
    begin
      SB.Append('<div class="block">').Append(H3(Title)).Append('<div class="dialog">');
      Items := JArr(B, 'lines');
      for I := 0 to Len(Items) - 1 do
      begin
        W := ItemObj(Items, I);
        if Odd(I) then
          SB.Append('<p class="say b">')
        else
          SB.Append('<p class="say a">');
        SB.Append('<b lang="eo">').Append(HtmlEscape(JStr(W, 'eo'))).Append('</b><i>')
          .Append(HtmlEscape(JStr(W, 'tr'))).Append('</i></p>');
      end;
      SB.Append('</div></div>');
    end;
    Result := SB.ToString;
  finally
    SB.Free;
  end;
end;

// ---- Pages ----

const
  StarHero = '<svg class="star" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="48" class="f-soft"/>' +
    '<polygon class="f-green" points="50,12 59.4,37.1 86.1,38.2 65.2,54.9 72.4,80.8 50,66 27.6,80.8 34.8,54.9 13.9,38.2 40.6,37.1"/></svg>';
  StarDiploma = '<svg class="star" viewBox="0 0 100 100" aria-hidden="true">' +
    '<polygon class="f-green" points="50,6 61,36 93,37 68,57 77,88 50,70 23,88 32,57 7,37 39,36"/></svg>';

function RenderCoursePage(const ACourse: TCourseInfo; const AContentJson: string;
  APreview: Boolean): string;
var
  Ui: TCourseUi;
  Parsed: TJSONValue;
  Content, Lesson: TJSONObject;
  Lessons, Blocks: TJSONArray;
  SB: TStringBuilder;
  Intro, Challenge, N, Img, Lang: string;
  I, J: Integer;
  Kurso, Texts: TJSONObject;
begin
  Lang := ACourse.Lang;
  if Lang <> 'en' then
    Lang := 'es';
  Ui := UiFor(Lang);
  Parsed := TJSONObject.ParseJSONValue(AContentJson);
  SB := TStringBuilder.Create;
  Kurso := TJSONObject.Create;
  try
    if Parsed is TJSONObject then
      Content := TJSONObject(Parsed)
    else
      Content := nil;
    Intro := JStr(Content, 'intro');
    Lessons := JArr(Content, 'lessons');

    SB.Append('<!doctype html>'#10'<html lang="').Append(Lang).Append('">'#10'<head>'#10)
      .Append('<meta charset="utf-8">'#10)
      .Append('<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">'#10)
      .Append('<title>').Append(HtmlEscape(ACourse.Title)).Append('</title>'#10)
      .Append('<meta name="description" content="');
    if Intro <> '' then
      SB.Append(HtmlEscape(Copy(Intro, 1, 160)))
    else
      SB.Append(HtmlEscape(ACourse.Title));
    SB.Append('">'#10);
    if APreview then
      SB.Append('<meta name="robots" content="noindex">'#10);
    SB.Append('<link rel="stylesheet" href="/kurso.css">'#10'</head>'#10'<body>'#10);
    if APreview then
      SB.Append('<p class="preview-banner">Vista previa · Preview</p>'#10);
    SB.Append('<div class="wrap">'#10)
      .Append('  <nav class="top" aria-label="Navigation"><a href="/">← Serĉilo</a><a href="/kursoj">')
      .Append(Ui.Courses).Append('</a></nav>'#10)
      .Append('  <header class="hero">').Append(StarHero).Append('<div><h1>')
      .Append(HtmlEscape(ACourse.Title)).Append('</h1>');
    if Intro <> '' then
      SB.Append('<p>').Append(RichText(Intro)).Append('</p>');
    SB.Append('</div></header>'#10);

    // Day picker
    if Len(Lessons) > 0 then
    begin
      SB.Append('  <div class="block"><ol class="days" id="days">');
      for I := 0 to Len(Lessons) - 1 do
      begin
        N := IntToStr(I + 1);
        SB.Append('<li><a href="#tago-').Append(N).Append('" data-day="').Append(N)
          .Append('"><span class="n">').Append(N).Append('</span>')
          .Append(HtmlEscape(JStr(ItemObj(Lessons, I), 'title'))).Append('</a></li>');
      end;
      SB.Append('</ol><p class="progress" id="progress"></p></div>'#10);
    end
    else
      SB.Append('  <p>').Append(Ui.Empty).Append('</p>'#10);

    // Lessons
    for I := 0 to Len(Lessons) - 1 do
    begin
      Lesson := ItemObj(Lessons, I);
      N := IntToStr(I + 1);
      SB.Append('<section class="lesson" id="tago-').Append(N).Append('" aria-labelledby="h-').Append(N).Append('">'#10)
        .Append('  <div class="lesson-head"><div><span class="tag">Tago ').Append(N).Append(' · ')
        .Append(Ui.Day).Append(' ').Append(N).Append('</span>'#10)
        .Append('  <h2 id="h-').Append(N).Append('"><span lang="eo">').Append(HtmlEscape(JStr(Lesson, 'title')))
        .Append('</span>');
      if JStr(Lesson, 'subtitle') <> '' then
        SB.Append(' <small>').Append(HtmlEscape(JStr(Lesson, 'subtitle'))).Append('</small>');
      SB.Append('</h2></div>');
      Img := JStr(Lesson, 'image');
      if Img <> '' then
        SB.Append('<img class="art" src="').Append(ImageUrl(Img)).Append('" alt="')
          .Append(HtmlEscape(JStr(Lesson, 'imageAlt'))).Append('" loading="lazy">');
      SB.Append('</div>'#10);
      Blocks := JArr(Lesson, 'blocks');
      for J := 0 to Len(Blocks) - 1 do
        if ItemObj(Blocks, J) <> nil then
          SB.Append('  ').Append(RenderBlock(ItemObj(Blocks, J), Ui)).Append(#10);
      Challenge := JStr(Lesson, 'challenge');
      SB.Append('  <div class="challenge">');
      if Challenge <> '' then
        SB.Append('<p><b>').Append(Ui.Challenge).Append(':</b> ').Append(RichText(Challenge)).Append('</p>');
      SB.Append('<button type="button" class="check" data-day="').Append(N)
        .Append('" aria-pressed="false">').Append(Ui.Done).Append('</button></div>'#10)
        .Append('</section>'#10);
    end;

    // Diploma
    if Len(Lessons) > 0 then
      SB.Append('  <section class="diploma" aria-labelledby="dip-h">').Append(StarDiploma)
        .Append('<h2 id="dip-h">Gratulon!</h2><p id="dip-text" class="locked">').Append(Ui.DiplomaLocked)
        .Append('</p><p class="name" id="dip-name"></p><label for="dip-input">').Append(Ui.Name)
        .Append('</label><input id="dip-input" type="text" maxlength="40" autocomplete="given-name" placeholder="Via nomo">')
        .Append('</section>'#10);

    SB.Append('  <footer><span class="eo">Ĝis revido!</span> · Liberanimo Teruel</footer>'#10'</div>'#10);

    // Data for /kurso.js (same shape as window.KURSO in server/courses.ts)
    Texts := TJSONObject.Create;
    Texts.AddPair('progress', Ui.Progress);
    Texts.AddPair('locked', Ui.DiplomaLocked);
    Texts.AddPair('done', Ui.DiplomaDone);
    Texts.AddPair('finished', Ui.Finished);
    Texts.AddPair('of', Ui.OfWord);
    Texts.AddPair('doneBtn', Ui.Done);
    Texts.AddPair('mark', Ui.Mark);
    Texts.AddPair('listen', Ui.Listen);
    Kurso.AddPair('slug', ACourse.Slug);
    Kurso.AddPair('days', TJSONNumber.Create(Len(Lessons)));
    Kurso.AddPair('texts', Texts);
    SB.Append('<script>window.KURSO = ').Append(Kurso.ToJSON.Replace('<', '<', [rfReplaceAll]))
      .Append(';</script>'#10'<script src="/kurso.js"></script>'#10'</body>'#10'</html>'#10);
    Result := SB.ToString;
  finally
    Kurso.Free;
    SB.Free;
    Parsed.Free;
  end;
end;

function RenderCourseIndex(const ACourses: TArray<TCourseInfo>): string;
var
  SB: TStringBuilder;
  C: TCourseInfo;
begin
  SB := TStringBuilder.Create;
  try
    SB.Append('<!doctype html>'#10'<html lang="es">'#10'<head>'#10'<meta charset="utf-8">'#10)
      .Append('<meta name="viewport" content="width=device-width, initial-scale=1">'#10)
      .Append('<title>Kursoj · Cursos · Courses</title>'#10)
      .Append('<link rel="stylesheet" href="/kurso.css">'#10'</head>'#10'<body>'#10'<div class="wrap">'#10)
      .Append('  <nav class="top" aria-label="Navigation"><a href="/">← Serĉilo</a></nav>'#10)
      .Append('  <header><h1>Kursoj · Cursos · Courses</h1></header>'#10)
      .Append('  <ul class="course-list">'#10)
      .Append('    <li><a href="/minikurso" hreflang="es">Esperanto en 7 tagoj</a> <span class="muted">(español)</span></li>'#10)
      .Append('    <li><a href="/minikurso-en" hreflang="en">Esperanto en 7 tagoj</a> <span class="muted">(English)</span></li>'#10);
    for C in ACourses do
    begin
      SB.Append('    <li><a href="/kurso/').Append(TNetEncoding.URL.Encode(C.Slug)).Append('" hreflang="')
        .Append(HtmlEscape(C.Lang)).Append('">').Append(HtmlEscape(C.Title)).Append('</a> <span class="muted">(');
      if C.Lang = 'en' then
        SB.Append('English')
      else
        SB.Append('español');
      SB.Append(')</span></li>'#10);
    end;
    SB.Append('  </ul>'#10'  <footer>Liberanimo Teruel</footer>'#10'</div>'#10'</body>'#10'</html>'#10);
    Result := SB.ToString;
  finally
    SB.Free;
  end;
end;

// ---- Names ----

{ Removes the accents of the letters used in Spanish, French, Catalan... (the
  Node version uses Unicode NFD; this covers the same letters in practice) }
function Unaccent(C: Char): Char;
const
  From = 'áàâäãåéèêëíìîïóòôöõúùûüñçýÿ';
  Into = 'aaaaaaeeeeiiiiooooouuuuncyy';
var
  P: Integer;
begin
  P := Pos(C, From);
  if P > 0 then
    Result := Into[P]
  else
    Result := C;
end;

function MakeSlug(const S: string; AXSystem: Boolean): string;
var
  C: Char;
  SB: TStringBuilder;
begin
  SB := TStringBuilder.Create;
  try
    for C in S.ToLower do
      case C of
        'ĉ': if AXSystem then SB.Append('cx') else SB.Append('c');
        'ĝ': if AXSystem then SB.Append('gx') else SB.Append('g');
        'ĥ': if AXSystem then SB.Append('hx') else SB.Append('h');
        'ĵ': if AXSystem then SB.Append('jx') else SB.Append('j');
        'ŝ': if AXSystem then SB.Append('sx') else SB.Append('s');
        'ŭ': if AXSystem then SB.Append('ux') else SB.Append('u');
      else
        SB.Append(Unaccent(C));
      end;
    Result := TRegEx.Replace(SB.ToString, '[^a-z0-9]+', '-');
    while Result.StartsWith('-') do
      Result := Result.Substring(1);
    while Result.EndsWith('-') do
      Result := Result.Substring(0, Result.Length - 1);
  finally
    SB.Free;
  end;
end;

function AudioSlug(const S: string): string;
begin
  Result := MakeSlug(S, True);
end;

function CourseSlug(const S: string): string;
begin
  Result := Copy(MakeSlug(S, False), 1, 60);
end;

// ---- Validation of the editor's content ----

function Clean(AObj: TJSONObject; const AName: string; AMax: Integer): string;
begin
  Result := Copy(JStr(AObj, AName).Trim, 1, AMax);
end;

function CleanItem(A: TJSONArray; I, AMax: Integer): string;
begin
  Result := Copy(ItemStr(A, I).Trim, 1, AMax);
end;

function Min(A, B: Integer): Integer;
begin
  if A < B then
    Result := A
  else
    Result := B;
end;

// List of eo/tr pairs, keeping only the items with Esperanto text
function CleanPairs(AList: TJSONArray): TJSONArray;
var
  I: Integer;
  Eo: string;
  W: TJSONObject;
begin
  Result := TJSONArray.Create;
  for I := 0 to Min(Len(AList), CourseItemsMax) - 1 do
  begin
    W := ItemObj(AList, I);
    Eo := Clean(W, 'eo', CourseShortMax);
    if Eo <> '' then
      Result.AddElement(TJSONObject.Create
        .AddPair('eo', Eo)
        .AddPair('tr', Clean(W, 'tr', CourseShortMax)));
  end;
end;

function CleanStrings(AList: TJSONArray; ADropEmpty: Boolean): TJSONArray;
var
  I: Integer;
  S: string;
begin
  Result := TJSONArray.Create;
  for I := 0 to Min(Len(AList), CourseItemsMax) - 1 do
  begin
    S := CleanItem(AList, I, CourseShortMax);
    if (S <> '') or not ADropEmpty then
      Result.Add(S);
  end;
end;

function CleanBlock(B: TJSONObject): TJSONObject;
var
  Kind, Title: string;
begin
  Result := nil;
  if B = nil then
    Exit;
  Kind := JStr(B, 'type');
  Title := Clean(B, 'title', CourseShortMax);
  if Kind = 'words' then
    Result := TJSONObject.Create.AddPair('type', Kind).AddPair('title', Title)
      .AddPair('items', CleanPairs(JArr(B, 'items')))
  else if Kind = 'text' then
    Result := TJSONObject.Create.AddPair('type', Kind).AddPair('title', Title)
      .AddPair('text', Clean(B, 'text', CourseTextMax))
  else if Kind = 'rule' then
    Result := TJSONObject.Create.AddPair('type', Kind).AddPair('text', Clean(B, 'text', CourseTextMax))
  else if Kind = 'exercise' then
    Result := TJSONObject.Create.AddPair('type', Kind).AddPair('title', Title)
      .AddPair('items', CleanStrings(JArr(B, 'items'), True))
      .AddPair('answers', CleanStrings(JArr(B, 'answers'), False))
  else if Kind = 'dialog' then
    Result := TJSONObject.Create.AddPair('type', Kind).AddPair('title', Title)
      .AddPair('lines', CleanPairs(JArr(B, 'lines')));
end;

function SanitizeCourseContent(AInput: TJSONValue; const AImageIds: TArray<string>): TJSONObject;
var
  Input, L, Lesson, Block: TJSONObject;
  Lessons, Blocks, OutLessons, OutBlocks: TJSONArray;
  I, J: Integer;
  Img, Id: string;
  Known: Boolean;
begin
  if AInput is TJSONObject then
    Input := TJSONObject(AInput)
  else
    Input := nil;
  Result := TJSONObject.Create;
  Result.AddPair('intro', Clean(Input, 'intro', CourseTextMax));
  OutLessons := TJSONArray.Create;
  Result.AddPair('lessons', OutLessons);
  Lessons := JArr(Input, 'lessons');
  for I := 0 to Min(Len(Lessons), CourseLessonsMax) - 1 do
  begin
    L := ItemObj(Lessons, I);
    Lesson := TJSONObject.Create;
    OutLessons.AddElement(Lesson);
    Lesson.AddPair('title', Clean(L, 'title', CourseShortMax));
    Lesson.AddPair('subtitle', Clean(L, 'subtitle', CourseShortMax));
    // Only pictures uploaded to this course
    Img := JStr(L, 'image');
    Known := False;
    for Id in AImageIds do
      if Id = Img then
        Known := True;
    if (Img <> '') and Known then
      Lesson.AddPair('image', Img)
    else
      Lesson.AddPair('image', TJSONNull.Create);
    Lesson.AddPair('imageAlt', Clean(L, 'imageAlt', CourseShortMax));
    OutBlocks := TJSONArray.Create;
    Lesson.AddPair('blocks', OutBlocks);
    Blocks := JArr(L, 'blocks');
    for J := 0 to Min(Len(Blocks), CourseBlocksMax) - 1 do
    begin
      Block := CleanBlock(ItemObj(Blocks, J));
      if Block <> nil then
        OutBlocks.AddElement(Block);
    end;
    Lesson.AddPair('challenge', Clean(L, 'challenge', CourseTextMax));
  end;
end;

// ---- Words that can be recorded ----

procedure AddMarked(AList: TList<string>; const AText: string);
var
  M: TMatch;
begin
  for M in TRegEx.Matches(AText, '\{\{(.+?)\}\}') do
    if M.Groups[1].Value.Trim <> '' then
      AList.Add(M.Groups[1].Value.Trim);
end;

function CourseEsperantoTexts(const AContentJson: string): TArray<string>;
var
  Parsed: TJSONValue;
  Content, Lesson, B: TJSONObject;
  Lessons, Blocks, Items: TJSONArray;
  I, J, K: Integer;
  Kind: string;
  List: TList<string>;
begin
  List := TList<string>.Create;
  Parsed := TJSONObject.ParseJSONValue(AContentJson);
  try
    if Parsed is TJSONObject then
      Content := TJSONObject(Parsed)
    else
      Content := nil;
    Lessons := JArr(Content, 'lessons');
    for I := 0 to Len(Lessons) - 1 do
    begin
      Lesson := ItemObj(Lessons, I);
      Blocks := JArr(Lesson, 'blocks');
      for J := 0 to Len(Blocks) - 1 do
      begin
        B := ItemObj(Blocks, J);
        Kind := JStr(B, 'type');
        if (Kind = 'words') or (Kind = 'dialog') then
        begin
          if Kind = 'words' then
            Items := JArr(B, 'items')
          else
            Items := JArr(B, 'lines');
          for K := 0 to Len(Items) - 1 do
            if JStr(ItemObj(Items, K), 'eo') <> '' then
              List.Add(JStr(ItemObj(Items, K), 'eo'));
        end
        else if (Kind = 'text') or (Kind = 'rule') then
          AddMarked(List, JStr(B, 'text'))
        else if Kind = 'exercise' then
        begin
          Items := JArr(B, 'items');
          for K := 0 to Len(Items) - 1 do
            AddMarked(List, ItemStr(Items, K));
          Items := JArr(B, 'answers');
          for K := 0 to Len(Items) - 1 do
            AddMarked(List, ItemStr(Items, K));
        end;
      end;
      AddMarked(List, JStr(Lesson, 'challenge'));
    end;
    Result := List.ToArray;
  finally
    Parsed.Free;
    List.Free;
  end;
end;

function PageEsperantoTexts(const AHtml: string): TArray<string>;
var
  M: TMatch;
  Text: string;
  List: TList<string>;
  G: Integer;
begin
  List := TList<string>.Create;
  try
    for M in TRegEx.Matches(AHtml,
      '<div class="word"><b>([^<]+)</b>|<p class="say [ab]"><b>([^<]+)</b>|<span class="eo">([^<]+)</span>') do
    begin
      Text := '';
      for G := 1 to 3 do
        if (G < M.Groups.Count) and M.Groups[G].Success and (M.Groups[G].Value <> '') then
          Text := M.Groups[G].Value.Trim;
      // "kato → katoj" shows a rule, not something to say out loud
      if (Text <> '') and not Text.Contains('→') then
        List.Add(Text);
    end;
    Result := List.ToArray;
  finally
    List.Free;
  end;
end;

// ---- File types ----

function StartsWithText(const AData: TBytes; AOffset: Integer; const AText: AnsiString): Boolean;
var
  I: Integer;
begin
  Result := Length(AData) >= AOffset + Length(AText);
  if Result then
    for I := 1 to Length(AText) do
      if AData[AOffset + I - 1] <> Byte(AText[I]) then
        Exit(False);
end;

function DetectAudioType(const AData: TBytes): string;
begin
  Result := '';
  if Length(AData) < 12 then
    Exit;
  if (AData[0] = $1A) and (AData[1] = $45) and (AData[2] = $DF) and (AData[3] = $A3) then
    Result := 'audio/webm'
  else if StartsWithText(AData, 0, 'OggS') then
    Result := 'audio/ogg'
  else if StartsWithText(AData, 4, 'ftyp') then
    Result := 'audio/mp4';
end;

function DetectImageType(const AData: TBytes): string;
begin
  Result := '';
  if Length(AData) < 12 then
    Exit;
  if (AData[0] = $89) and StartsWithText(AData, 1, 'PNG') then
    Result := 'image/png'
  else if (AData[0] = $FF) and (AData[1] = $D8) and (AData[2] = $FF) then
    Result := 'image/jpeg'
  else if StartsWithText(AData, 0, 'RIFF') and StartsWithText(AData, 8, 'WEBP') then
    Result := 'image/webp'
  else if StartsWithText(AData, 0, 'GIF8') then
    Result := 'image/gif';
  // SVG is not accepted: it can carry scripts
end;

end.
