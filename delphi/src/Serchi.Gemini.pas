{ Copyright (C) 2026 Antonio Alcázar Ruiz (MiTeruel) <mrgarciagarcia@gmail.com>
  Part of the PluTony project. Licensed under the GNU GPL v3.0 or later;
  see LICENSE for the full text. }

unit Serchi.Gemini;

{ Live web discovery using the Gemini REST API with Google Search grounding
  (port of the /api/live-search endpoint in server.ts). The API key is read
  from the GEMINI_API_KEY environment variable. }

interface

uses
  System.SysUtils, System.Generics.Collections;

type
  TLiveResult = record
    Title: string;
    Url: string;
    DisplayUrl: string;
    Snippet: string;
    Level: string;
    Category: string;
  end;

  TGeminiSearch = class
  public
    class function IsConfigured: Boolean;
    class function Search(const AQuery, ALang, ALevel: string): TArray<TLiveResult>;
  end;

const
  GeminiModel = 'gemini-3.8-flash';

implementation

uses
  System.Classes, System.JSON, System.Net.HttpClient, System.Net.URLClient,
  System.NetEncoding, System.RegularExpressions;

function HostOf(const AUrl: string): string;
begin
  try
    Result := TURI.Create(AUrl).Host;
  except
    Result := 'esperanto.org';
  end;
end;

class function TGeminiSearch.IsConfigured: Boolean;
begin
  Result := GetEnvironmentVariable('GEMINI_API_KEY') <> '';
end;

class function TGeminiSearch.Search(const AQuery, ALang, ALevel: string): TArray<TLiveResult>;
var
  Client: THTTPClient;
  Body, Resp, Candidate, Parts, Chunks, Item: TJSONValue;
  Req: TJSONObject;
  Response: IHTTPResponse;
  Prompt, Text, JsonText, LangName, Url: string;
  Stream: TStringStream;
  M: TMatch;
  Results: TList<TLiveResult>;
  R: TLiveResult;
  Seen: TList<string>;
  Obj: TJSONObject;
begin
  if not IsConfigured then
    raise Exception.Create('GEMINI_API_KEY is not configured on the server');

  if ALang = 'es' then LangName := 'Spanish'
  else if ALang = 'en' then LangName := 'English'
  else LangName := 'Esperanto';
  if ALevel = '' then
    Prompt := 'any'
  else
    Prompt := ALevel;

  Prompt :=
    'You are an expert Esperanto web indexer. Use Google Search grounding to discover active, ' +
    'real-world URLs, websites, articles, podcasts, or tools for Esperanto learners and speakers.'#10 +
    'Target query: "' + AQuery + '"'#10 +
    'Optional level filter: "' + Prompt + '"'#10#10 +
    'Format your answer as a JSON array of objects with this exact schema:'#10 +
    '[{"title": "...", "url": "https://...", "displayUrl": "domain.com/path", ' +
    '"snippet": "1-2 sentence summary in ' + LangName + '", ' +
    '"suggestedLevel": "A1|A2|B1|B2|C1|all", ' +
    '"suggestedCategory": "courses|news|projects|tools|literature|media|community"}]'#10 +
    'Output ONLY valid JSON. Do not fabricate URLs; ensure they come from the real search grounding.';

  Req := TJSONObject.Create;
  Req.AddPair('contents', TJSONArray.Create(
    TJSONObject.Create.AddPair('parts', TJSONArray.Create(
      TJSONObject.Create.AddPair('text', Prompt)))));
  Req.AddPair('tools', TJSONArray.Create(
    TJSONObject.Create.AddPair('google_search', TJSONObject.Create)));

  Results := TList<TLiveResult>.Create;
  Seen := TList<string>.Create;
  Client := THTTPClient.Create;
  Stream := TStringStream.Create(Req.ToJSON, TEncoding.UTF8);
  Resp := nil;
  try
    Client.ContentType := 'application/json';
    Client.CustomHeaders['x-goog-api-key'] := GetEnvironmentVariable('GEMINI_API_KEY');
    Response := Client.Post('https://generativelanguage.googleapis.com/v1beta/models/' +
      GeminiModel + ':generateContent', Stream);
    if Response.StatusCode <> 200 then
      raise Exception.CreateFmt('Gemini API error %d: %s',
        [Response.StatusCode, Response.ContentAsString(TEncoding.UTF8)]);

    Resp := TJSONObject.ParseJSONValue(Response.ContentAsString(TEncoding.UTF8));
    Candidate := nil;
    if (Resp is TJSONObject) and (TJSONObject(Resp).GetValue('candidates') is TJSONArray) and
      (TJSONArray(TJSONObject(Resp).GetValue('candidates')).Count > 0) then
      Candidate := TJSONArray(TJSONObject(Resp).GetValue('candidates')).Items[0];

    // Concatenate text parts
    Text := '';
    if Candidate is TJSONObject then
    begin
      Parts := nil;
      if TJSONObject(Candidate).GetValue('content') is TJSONObject then
        Parts := TJSONObject(TJSONObject(Candidate).GetValue('content')).GetValue('parts');
      if Parts is TJSONArray then
        for Item in TJSONArray(Parts) do
          if (Item is TJSONObject) and (TJSONObject(Item).GetValue('text') <> nil) then
            Text := Text + TJSONObject(Item).GetValue('text').Value;
    end;

    // Parse the model's JSON (optionally wrapped in a ```json fence)
    M := TRegEx.Match(Text, '```(?:json)?\s*([\s\S]*?)\s*```');
    if M.Success then
      JsonText := M.Groups[1].Value
    else
      JsonText := Text;
    Body := TJSONObject.ParseJSONValue(JsonText);
    try
      if Body is TJSONArray then
        for Item in TJSONArray(Body) do
          if Item is TJSONObject then
          begin
            Obj := TJSONObject(Item);
            R.Url := Obj.GetValue<string>('url', '');
            if not R.Url.StartsWith('http') or Seen.Contains(R.Url.ToLower) then
              Continue;
            R.Title := Obj.GetValue<string>('title', 'Esperanto Resource');
            R.DisplayUrl := Obj.GetValue<string>('displayUrl', HostOf(R.Url));
            R.Snippet := Obj.GetValue<string>('snippet', '');
            R.Level := Obj.GetValue<string>('suggestedLevel', 'all');
            R.Category := Obj.GetValue<string>('suggestedCategory', 'projects');
            Seen.Add(R.Url.ToLower);
            Results.Add(R);
          end;
    finally
      Body.Free;
    end;

    // Merge grounding chunks that the model did not list
    if (Candidate is TJSONObject) and
      (TJSONObject(Candidate).GetValue('groundingMetadata') is TJSONObject) then
    begin
      Chunks := TJSONObject(TJSONObject(Candidate).GetValue('groundingMetadata')).GetValue('groundingChunks');
      if Chunks is TJSONArray then
        for Item in TJSONArray(Chunks) do
          if (Item is TJSONObject) and (TJSONObject(Item).GetValue('web') is TJSONObject) then
          begin
            Obj := TJSONObject(TJSONObject(Item).GetValue('web'));
            Url := Obj.GetValue<string>('uri', '');
            if not Url.StartsWith('http') or Seen.Contains(Url.ToLower) then
              Continue;
            R.Url := Url;
            R.Title := Obj.GetValue<string>('title', HostOf(Url));
            R.DisplayUrl := HostOf(Url);
            R.Snippet := '';
            R.Level := 'all';
            R.Category := 'projects';
            Seen.Add(Url.ToLower);
            Results.Add(R);
          end;
    end;

    Result := Results.ToArray;
  finally
    Resp.Free;
    Stream.Free;
    Client.Free;
    Seen.Free;
    Results.Free;
    Req.Free;
  end;
end;

end.
