unit Serchi.Text;

{ Esperanto text utilities (port of src/utils/esperanto.ts):
  - X-sistemo conversion (cx -> ĉ, ...)
  - Accent folding for tolerant matching
  - Multilingual synonym expansion of search tokens }

interface

uses
  System.SysUtils, System.Classes, System.Generics.Collections;

function ConvertXSystem(const AText: string): string;
function StripAccents(const AText: string): string;
function NormalizeText(const AText: string): string;
function SplitWords(const AText: string): TArray<string>;
function ExpandTokens(const AQuery: string): TArray<string>;

procedure LoadSynonyms(const AFileName: string);

implementation

uses
  System.IOUtils, System.JSON;

var
  Synonyms: TObjectDictionary<string, TList<string>>;

function ConvertXSystem(const AText: string): string;
const
  Src: array[0..5] of Char = ('c', 'g', 'h', 'j', 's', 'u');
  DstLower: array[0..5] of Char = ('ĉ', 'ĝ', 'ĥ', 'ĵ', 'ŝ', 'ŭ');
  DstUpper: array[0..5] of Char = ('Ĉ', 'Ĝ', 'Ĥ', 'Ĵ', 'Ŝ', 'Ŭ');
var
  SB: TStringBuilder;
  I, K: Integer;
  C: Char;
  Replaced: Boolean;
begin
  if AText = '' then
    Exit('');
  SB := TStringBuilder.Create(Length(AText));
  try
    I := 1;
    while I <= Length(AText) do
    begin
      C := AText[I];
      Replaced := False;
      if (I < Length(AText)) and CharInSet(AText[I + 1], ['x', 'X']) then
        for K := Low(Src) to High(Src) do
          if C = Src[K] then
          begin
            SB.Append(DstLower[K]);
            Replaced := True;
            Break;
          end
          else if C = UpCase(Src[K]) then
          begin
            SB.Append(DstUpper[K]);
            Replaced := True;
            Break;
          end;
      if Replaced then
        Inc(I, 2)
      else
      begin
        SB.Append(C);
        Inc(I);
      end;
    end;
    Result := SB.ToString;
  finally
    SB.Free;
  end;
end;

function StripAccents(const AText: string): string;
const
  From = 'áàâäãåéèêëíìîïóòôöõúùûüñçýÿĉĝĥĵŝŭ';
  Into = 'aaaaaaeeeeiiiiooooouuuuncyycghjsu';
var
  I, P: Integer;
begin
  Result := AText;
  for I := 1 to Length(Result) do
  begin
    P := Pos(Result[I], From);
    if P > 0 then
      Result[I] := Into[P];
  end;
end;

function NormalizeText(const AText: string): string;
begin
  if AText = '' then
    Exit('');
  Result := StripAccents(ConvertXSystem(AText.ToLower)).Trim;
end;

function SplitWords(const AText: string): TArray<string>;
var
  Parts: TArray<string>;
  W: string;
  L: TList<string>;
begin
  L := TList<string>.Create;
  try
    Parts := AText.ToLower.Split([' ', #9, #10, #13], TStringSplitOptions.ExcludeEmpty);
    for W in Parts do
      L.Add(W);
    Result := L.ToArray;
  finally
    L.Free;
  end;
end;

function ExpandTokens(const AQuery: string): TArray<string>;
var
  Tokens: TList<string>;
  Word, Syn: string;
  SynList: TList<string>;

  procedure AddToken(const S: string);
  begin
    if (S <> '') and not Tokens.Contains(S) then
      Tokens.Add(S);
  end;

begin
  Tokens := TList<string>.Create;
  try
    for Word in SplitWords(AQuery) do
    begin
      AddToken(Word);
      AddToken(ConvertXSystem(Word));
      AddToken(NormalizeText(Word));
      if (Synonyms <> nil) and Synonyms.TryGetValue(StripAccents(Word), SynList) then
        for Syn in SynList do
        begin
          AddToken(Syn);
          AddToken(NormalizeText(Syn));
        end;
    end;
    Result := Tokens.ToArray;
  finally
    Tokens.Free;
  end;
end;

procedure LoadSynonyms(const AFileName: string);
var
  Root: TJSONValue;
  Pair: TJSONPair;
  Item: TJSONValue;
  List: TList<string>;
begin
  Synonyms.Clear;
  if not TFile.Exists(AFileName) then
    Exit;
  Root := TJSONObject.ParseJSONValue(TFile.ReadAllText(AFileName, TEncoding.UTF8));
  try
    if Root is TJSONObject then
      for Pair in TJSONObject(Root) do
      begin
        List := TList<string>.Create;
        if Pair.JsonValue is TJSONArray then
          for Item in TJSONArray(Pair.JsonValue) do
            List.Add(Item.Value);
        Synonyms.AddOrSetValue(Pair.JsonString.Value, List);
      end;
  finally
    Root.Free;
  end;
end;

initialization
  Synonyms := TObjectDictionary<string, TList<string>>.Create([doOwnsValues]);

finalization
  Synonyms.Free;

end.
