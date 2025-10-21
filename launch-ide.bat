@echo off
setlocal enabledelayedexpansion

REM NEXUS IDE - Standalone Launcher
REM Opens the IDE in your default browser

set "SCRIPT_DIR=%~dp0"
set "IDE_FILE=%SCRIPT_DIR%nexus-ide-standalone.html"

echo Launching NEXUS IDE...

if not exist "!IDE_FILE!" (
    echo ERROR: nexus-ide-standalone.html not found!
    pause
    exit /b 1
)

REM Convert to file:// URL and open in browser
REM The ~ removes quotes and backslashes are converted by PowerShell

powershell -NoProfile -Command "Start-Process 'file:///%IDE_FILE:\=/%'"

echo IDE opened in browser. Close this window to exit.
pause
