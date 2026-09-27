unit Serchi.I18n;

{ UI translations loaded from data/translations.json (exported from
  src/translations/index.ts). Nested groups are flattened with "_":
  categories.courses -> "categories_courses". Keys are case-insensitive.
  Templates read them as @t.<key> through the processor's OnValue event. }

interface

uses
  System.SysUtils, System.Generics.Collections;

type
  TI18n = class
  private
    FLangs: TObjectDictionary<string, TDictionary<string, string>>;
  public
    constructor Create(const AFileName: string);
    destructor Destroy; override;
    function T(const ALang, AKey: string): string;
    function Fmt(const ALang, AKey: string; const AArgs: array of string): string;
  end;

const
  Languages: array[0..2] of string = ('eo', 'es', 'en');

function NormalizeLang(const ALang: string): string;

var
  I18n: TI18n;

implementation

uses
  System.IOUtils, System.JSON;

function NormalizeLang(const ALang: string): string;
begin
  Result := ALang.ToLower;
  if (Result <> 'es') and (Result <> 'en') then
    Result := 'eo';
end;

{ TI18n }

constructor TI18n.Create(const AFileName: string);

  procedure Flatten(ADict: TDictionary<string, string>; const APrefix: string; AObj: TJSONObject);
  var
    Pair: TJSONPair;
    Key: string;
  begin
    for Pair in AObj do
    begin
      Key := APrefix + Pair.JsonString.Value.ToLower;
      if Pair.JsonValue is TJSONObject then
        Flatten(ADict, Key + '_', TJSONObject(Pair.JsonValue))
      else
        ADict.AddOrSetValue(Key, Pair.JsonValue.Value);
    end;
  end;

var
  Root: TJSONValue;
  Pair: TJSONPair;
  Dict: TDictionary<string, string>;
begin
  inherited Create;
  FLangs := TObjectDictionary<string, TDictionary<string, string>>.Create([doOwnsValues]);
  Root := TJSONObject.ParseJSONValue(TFile.ReadAllText(AFileName, TEncoding.UTF8));
  try
    if Root is TJSONObject then
      for Pair in TJSONObject(Root) do
        if Pair.JsonValue is TJSONObject then
        begin
          Dict := TDictionary<string, string>.Create;
          FLangs.Add(Pair.JsonString.Value, Dict);
          Flatten(Dict, '', TJSONObject(Pair.JsonValue));
        end;
  finally
    Root.Free;
  end;
end;

destructor TI18n.Destroy;
begin
  FLangs.Free;
  inherited;
end;

function TI18n.T(const ALang, AKey: string): string;
var
  Dict: TDictionary<string, string>;
begin
  if FLangs.TryGetValue(ALang, Dict) and Dict.TryGetValue(AKey.ToLower, Result) then
    Exit;
  if FLangs.TryGetValue('eo', Dict) and Dict.TryGetValue(AKey.ToLower, Result) then
    Exit;
  Result := AKey;
end;

function TI18n.Fmt(const ALang, AKey: string; const AArgs: array of string): string;
var
  I: Integer;
begin
  Result := T(ALang, AKey);
  for I := 0 to High(AArgs) do
    Result := Result.Replace('{' + I.ToString + '}', AArgs[I]);
end;

end.
