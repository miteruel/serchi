unit Serchi.Radio;

{ Podcast feed reader for radio stations whose player type is "rss"
  (port of server/radio.ts). Only feed URLs stored in the database are
  fetched, and results are cached for 15 minutes. }

interface

uses
  System.SysUtils;

type
  TRadioEpisode = record
    Title: string;
    AudioUrl: string;
    Published: string;
  end;

  TRadioFeed = class
  public
    class function Parse(const AXml: string; ALimit: Integer = 10): TArray<TRadioEpisode>;
    class function LatestEpisodes(const AFeedUrl: string): TArray<TRadioEpisode>;
  end;

implementation

uses
  System.Classes, System.DateUtils, System.RegularExpressions, System.SyncObjs,
  System.Generics.Collections, System.Net.HttpClient, System.NetEncoding;

type
  TCacheEntry = record
    At: TDateTime;
    Episodes: TArray<TRadioEpisode>;
  end;

var
  Cache: TDictionary<string, TCacheEntry>;
  CacheLock: TCriticalSection;

function DecodeXml(const AText: string): string;
begin
  Result := TRegEx.Replace(AText, '<!\[CDATA\[([\s\S]*?)\]\]>', '$1');
  Result := TNetEncoding.HTML.Decode(Result).Trim;
end;

class function TRadioFeed.Parse(const AXml: string; ALimit: Integer): TArray<TRadioEpisode>;
var
  Items: TMatchCollection;
  Item: TMatch;
  Body, TypeAttr: string;
  Enclosure, M: TMatch;
  Ep: TRadioEpisode;
  List: TList<TRadioEpisode>;
begin
  List := TList<TRadioEpisode>.Create;
  try
    Items := TRegEx.Matches(AXml, '<item\b[^>]*>([\s\S]*?)</item>', [roIgnoreCase]);
    for Item in Items do
    begin
      Body := Item.Groups[1].Value;
      Enclosure := TRegEx.Match(Body, '<enclosure\b[^>]*\burl=["'']([^"'']+)["''][^>]*>', [roIgnoreCase]);
      if not Enclosure.Success then
        Continue;
      M := TRegEx.Match(Enclosure.Value, '\btype=["'']([^"'']+)["'']', [roIgnoreCase]);
      if M.Success then
        TypeAttr := M.Groups[1].Value
      else
        TypeAttr := 'audio/';
      if not TypeAttr.StartsWith('audio/') then
        Continue;

      Ep.AudioUrl := DecodeXml(Enclosure.Groups[1].Value);
      M := TRegEx.Match(Body, '<title\b[^>]*>([\s\S]*?)</title>', [roIgnoreCase]);
      if M.Success then
        Ep.Title := DecodeXml(M.Groups[1].Value)
      else
        Ep.Title := 'Elsendo';
      M := TRegEx.Match(Body, '<pubDate\b[^>]*>([\s\S]*?)</pubDate>', [roIgnoreCase]);
      if M.Success then
        Ep.Published := DecodeXml(M.Groups[1].Value)
      else
        Ep.Published := '';
      List.Add(Ep);
      if List.Count >= ALimit then
        Break;
    end;
    Result := List.ToArray;
  finally
    List.Free;
  end;
end;

class function TRadioFeed.LatestEpisodes(const AFeedUrl: string): TArray<TRadioEpisode>;
var
  Entry: TCacheEntry;
  Client: THTTPClient;
  Response: IHTTPResponse;
begin
  CacheLock.Enter;
  try
    if Cache.TryGetValue(AFeedUrl, Entry) and (MinutesBetween(Now, Entry.At) < 15) then
      Exit(Entry.Episodes);
  finally
    CacheLock.Leave;
  end;

  Client := THTTPClient.Create;
  try
    Client.ConnectionTimeout := 10000;
    Client.ResponseTimeout := 10000;
    Client.UserAgent := 'Serchilo/1.0 (+https://github.com/miteruel/serchi)';
    Response := Client.Get(AFeedUrl);
    if Response.StatusCode <> 200 then
      raise Exception.CreateFmt('Feed HTTP %d', [Response.StatusCode]);
    Result := Parse(Response.ContentAsString(TEncoding.UTF8));
  finally
    Client.Free;
  end;

  Entry.At := Now;
  Entry.Episodes := Result;
  CacheLock.Enter;
  try
    Cache.AddOrSetValue(AFeedUrl, Entry);
  finally
    CacheLock.Leave;
  end;
end;

initialization
  Cache := TDictionary<string, TCacheEntry>.Create;
  CacheLock := TCriticalSection.Create;

finalization
  CacheLock.Free;
  Cache.Free;

end.
