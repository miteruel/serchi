program SerchiWeb;

{ Serĉilo - Delphi + WebStencils + HTMX edition.
  Standalone WebBroker console server (Indy). Requires Delphi 12.2+ (WebStencils).

  Usage: SerchiWeb [port]         default port 8080 (or env PORT)
  Env:   GEMINI_API_KEY           enables the live Google Search discovery
         SERCHI_HOME              folder containing data/, templates/, static/
         SERCHI_DB                SQLite database (default: ../data/serchi.db,
                                  shared with the Node/React version) }

{$APPTYPE CONSOLE}

uses
  System.SysUtils,
  System.IOUtils,
  IdHTTPWebBrokerBridge,
  Web.WebReq,
  Web.WebBroker,
  WebModuleMain in 'src\WebModuleMain.pas' {WebModuleMain: TWebModule},
  Serchi.Text in 'src\Serchi.Text.pas',
  Serchi.Models in 'src\Serchi.Models.pas',
  Serchi.Store in 'src\Serchi.Store.pas',
  Serchi.I18n in 'src\Serchi.I18n.pas',
  Serchi.ViewModels in 'src\Serchi.ViewModels.pas',
  Serchi.Gemini in 'src\Serchi.Gemini.pas';

{ Looks for the folder holding templates/ starting at the executable folder
  and walking up (the exe usually lives in Win64\Debug or similar). }
function FindAppHome: string;
var
  Dir: string;
  I: Integer;
begin
  Result := GetEnvironmentVariable('SERCHI_HOME');
  if Result <> '' then
    Exit(TPath.GetFullPath(Result));
  Dir := ExtractFileDir(ParamStr(0));
  for I := 0 to 4 do
  begin
    if TDirectory.Exists(TPath.Combine(Dir, 'templates')) then
      Exit(Dir);
    Dir := ExtractFileDir(Dir);
  end;
  Result := GetCurrentDir;
end;

{ The SQLite database and its schema live in the repository's data/ folder,
  one level above delphi/. }
function FindDatabase: string;
begin
  Result := GetEnvironmentVariable('SERCHI_DB');
  if Result <> '' then
    Exit(TPath.GetFullPath(Result));
  Result := TPath.GetFullPath(TPath.Combine(AppHome, '..' + PathDelim + 'data' + PathDelim + 'serchi.db'));
  if not TFile.Exists(Result) and TFile.Exists(TPath.Combine(DataDir, 'serchi.db')) then
    Result := TPath.Combine(DataDir, 'serchi.db');
end;

procedure RunServer(APort: Integer);
var
  Server: TIdHTTPWebBrokerBridge;
begin
  Server := TIdHTTPWebBrokerBridge.Create(nil);
  try
    Server.DefaultPort := APort;
    Server.Active := True;
    Writeln(Format('Serchilo (Delphi + WebStencils + HTMX) listening on http://localhost:%d', [APort]));
    Writeln(Format('  %d resources loaded from %s', [Store.ResourceCount, FindDatabase]));
    if GetEnvironmentVariable('GEMINI_API_KEY') = '' then
      Writeln('  GEMINI_API_KEY not set: live Google Search discovery disabled');
    Writeln('Press ENTER to stop.');
    Readln;
    Server.Active := False;
  finally
    Server.Free;
  end;
end;

var
  Port: Integer;
begin
  ReportMemoryLeaksOnShutdown := DebugHook <> 0;
  try
    Randomize;
    AppHome := FindAppHome;
    // @Import/@LayoutPage use bare file names: make them resolve from templates/
    // whether WebStencils looks next to the current template or in the working dir.
    SetCurrentDir(TemplatesDir);
    I18n := TI18n.Create(TPath.Combine(DataDir, 'translations.json'));
    Store := TSerchiStore.Create(FindDatabase,
      TPath.Combine(ExtractFileDir(FindDatabase), 'schema.sql'), DataDir);
    try
      if WebRequestHandler <> nil then
        WebRequestHandler.WebModuleClass := WebModuleClass;
      Port := StrToIntDef(ParamStr(1), StrToIntDef(GetEnvironmentVariable('PORT'), 8080));
      RunServer(Port);
    finally
      Store.Free;
      I18n.Free;
    end;
  except
    on E: Exception do
    begin
      Writeln(E.ClassName, ': ', E.Message);
      ExitCode := 1;
    end;
  end;
end.
