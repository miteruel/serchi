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
  Serchi.Store;

{ AContentJson: the "content" column of the courses table }
function RenderCoursePage(const ACourse: TCourseInfo; const AContentJson: string): string;
function RenderCourseIndex(const ACourses: TArray<TCourseInfo>): string;
function HtmlEscape(const S: string): string;
// Plain text -> HTML: escapes it, then **bold**, Esperanto in double braces and line breaks
function RichText(const S: string): string;

implementation

uses
  System.SysUtils, System.Classes, System.JSON, System.NetEncoding,
  System.RegularExpressions;

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

function RenderCoursePage(const ACourse: TCourseInfo; const AContentJson: string): string;
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
    SB.Append('">'#10'<link rel="stylesheet" href="/kurso.css">'#10'</head>'#10'<body>'#10)
      .Append('<div class="wrap">'#10)
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

end.
