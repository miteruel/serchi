{ Copyright (C) 2026 Antonio Alcázar Ruiz (MiTeruel) <mrgarciagarcia@gmail.com>
  Part of the PluTony project. Licensed under the GNU GPL v3.0 or later;
  see LICENSE for the full text. }

unit Serchi.Tts;

{ Synthetic Esperanto voice with espeak-ng and lame (port of server/tts.ts),
  so every word of the courses has an example until someone records it.

  The programs are found in the PATH, or set ESPEAK_NG and LAME to their
  paths. On Windows the default folder of the eSpeak NG installer is tried
  too. Without them the courses simply have no synthetic voice.

  The voices of the editor courses are stored in the database (table
  synthetic_audio); the mini-course ones are files in public/audio/tts. Words
  whose voice a teacher removed (table muted_voices) are not made again. }

interface

uses
  System.SysUtils, Serchi.Store;

{ MP3 of an Esperanto text, slow and clear for children. False, with the
  program that failed in AError, when espeak-ng or lame are missing or fail. }
function SynthesizeMp3(const AText: string; out AData: TBytes; out AError: string): Boolean;

{ Makes, in the background, the synthetic voice of the published courses'
  words that have none. One run at a time: a call during a run makes it run
  again when it ends. ATtsDir is public/audio/tts. }
procedure UpdateCourseVoices(AStore: TSerchiStore; const ATtsDir: string);

{ Waits for a running UpdateCourseVoices (call it before freeing the store). }
procedure WaitForCourseVoices;

implementation

uses
{$IFDEF MSWINDOWS}
  Winapi.Windows,
{$ENDIF}
{$IFDEF POSIX}
  Posix.Stdlib,
{$ENDIF}
  System.Classes, System.IOUtils, System.Threading, System.Generics.Collections,
  Serchi.Courses;

var
  FLock: TObject;
  FTask: ITask;
  FRunning, FAgain, FWarned: Boolean;

function ToolPath(const AEnvVar, AName, AWindowsDefault: string): string;
begin
  Result := GetEnvironmentVariable(AEnvVar);
  if Result <> '' then
    Exit;
  Result := AName;
{$IFDEF MSWINDOWS}
  if (AWindowsDefault <> '') and TFile.Exists(AWindowsDefault) then
    Result := AWindowsDefault;
{$ENDIF}
end;

function Quote(const S: string): string;
begin
  Result := '"' + S + '"';
end;

{ Runs a command line and waits for it (up to 30 seconds). True if it exits with 0. }
function RunCommand(const ACommandLine: string): Boolean;
{$IFDEF MSWINDOWS}
var
  SI: TStartupInfo;
  PI: TProcessInformation;
  Cmd: string;
  Code: DWORD;
begin
  FillChar(SI, SizeOf(SI), 0);
  SI.cb := SizeOf(SI);
  Cmd := ACommandLine;
  UniqueString(Cmd); // CreateProcess may write to the command line
  Result := CreateProcess(nil, PChar(Cmd), nil, nil, False, CREATE_NO_WINDOW, nil, nil, SI, PI);
  if not Result then
    Exit;
  try
    if WaitForSingleObject(PI.hProcess, 30000) = WAIT_TIMEOUT then
    begin
      TerminateProcess(PI.hProcess, 1);
      Exit(False);
    end;
    Result := GetExitCodeProcess(PI.hProcess, Code) and (Code = 0);
  finally
    CloseHandle(PI.hThread);
    CloseHandle(PI.hProcess);
  end;
end;
{$ELSE}
var
  Cmd: UTF8String;
begin
  Cmd := UTF8String(ACommandLine + ' >/dev/null 2>&1');
  Result := _system(PAnsiChar(Cmd)) = 0;
end;
{$ENDIF}

function SynthesizeMp3(const AText: string; out AData: TBytes; out AError: string): Boolean;
var
  Dir, TextFile, WavFile, Mp3File: string;
begin
  Result := False;
  AData := nil;
  AError := '';
  Dir := TPath.Combine(TPath.GetTempPath, 'serchi-tts-' +
    TGUID.NewGuid.ToString.Replace('{', '').Replace('}', ''));
  TDirectory.CreateDirectory(Dir);
  try
    TextFile := TPath.Combine(Dir, 'text.txt');
    WavFile := TPath.Combine(Dir, 'voice.wav');
    Mp3File := TPath.Combine(Dir, 'voice.mp3');
    // The text goes in a file (UTF-8, no BOM) so no quoting can break the command
    TFile.WriteAllBytes(TextFile, TEncoding.UTF8.GetBytes(AText));
    // 120 words per minute, short gaps between words
    if not RunCommand(Quote(ToolPath('ESPEAK_NG', 'espeak-ng', 'C:\Program Files\eSpeak NG\espeak-ng.exe')) +
      ' -v eo -s 120 -g 4 -b 1 -f ' + Quote(TextFile) + ' -w ' + Quote(WavFile)) or not TFile.Exists(WavFile) then
    begin
      AError := 'espeak-ng';
      Exit;
    end;
    if not RunCommand(Quote(ToolPath('LAME', 'lame', '')) + ' --quiet -m m -b 48 ' +
      Quote(WavFile) + ' ' + Quote(Mp3File)) or not TFile.Exists(Mp3File) then
    begin
      AError := 'lame';
      Exit;
    end;
    AData := TFile.ReadAllBytes(Mp3File);
    Result := Length(AData) > 0;
  finally
    try
      TDirectory.Delete(Dir, True);
    except
      // a leftover temporary folder is not worth failing for
    end;
  end;
end;

procedure FillCourseVoices(AStore: TSerchiStore; const ATtsDir: string);
var
  Have: TDictionary<string, Boolean>;
  FileName, Slug, Content, Text, Error: string;
  Data: TBytes;
begin
  Have := TDictionary<string, Boolean>.Create;
  try
    if TDirectory.Exists(ATtsDir) then
      for FileName in TDirectory.GetFiles(ATtsDir, '*.mp3') do
        Have.AddOrSetValue(TPath.GetFileNameWithoutExtension(FileName), True);
    for Slug in AStore.SyntheticAudioSlugs do
      Have.AddOrSetValue(Slug, True);
    for Slug in AStore.MutedVoices do // removed by a teacher: not made again
      Have.AddOrSetValue(Slug, True);
    for Content in AStore.PublishedCourseContents do
      for Text in CourseEsperantoTexts(Content) do
      begin
        Slug := AudioSlug(Text);
        if (Slug = '') or Have.ContainsKey(Slug) then
          Continue;
        Have.Add(Slug, True);
        if not SynthesizeMp3(Text, Data, Error) then
        begin
          if not FWarned then
          begin
            FWarned := True;
            Writeln('Synthetic voice: ', Error, ' is not installed or failed; ' +
              'set ESPEAK_NG and LAME to their paths');
          end;
          Exit;
        end;
        AStore.SaveSyntheticAudio(Slug, Text, Data);
      end;
  finally
    Have.Free;
  end;
end;

procedure UpdateCourseVoices(AStore: TSerchiStore; const ATtsDir: string);
var
  TtsDir: string;
begin
  TtsDir := ATtsDir;
  TMonitor.Enter(FLock);
  try
    if FRunning then
    begin
      FAgain := True;
      Exit;
    end;
    FRunning := True;
    FTask := TTask.Run(
      procedure
      var
        Again: Boolean;
      begin
        repeat
          try
            FillCourseVoices(AStore, TtsDir);
          except
            on E: Exception do
              Writeln('Synthetic voice: ', E.Message);
          end;
          TMonitor.Enter(FLock);
          try
            Again := FAgain;
            FAgain := False;
            if not Again then
              FRunning := False;
          finally
            TMonitor.Exit(FLock);
          end;
        until not Again;
      end);
  finally
    TMonitor.Exit(FLock);
  end;
end;

procedure WaitForCourseVoices;
var
  Task: ITask;
begin
  TMonitor.Enter(FLock);
  try
    Task := FTask;
  finally
    TMonitor.Exit(FLock);
  end;
  if Task <> nil then
    Task.Wait;
end;

initialization
  FLock := TObject.Create;

finalization
  FLock.Free;

end.
