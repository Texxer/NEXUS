@echo off
REM NEXUS IDE - Web Server Launcher
REM Starts a local web server for the IDE

setlocal enabledelayedexpansion

set "SCRIPT_DIR=%~dp0"

echo Launching NEXUS IDE Web Server...
cd /d "!SCRIPT_DIR!"

python server.py

if errorlevel 1 (
    echo.
    echo ERROR: Could not start web server
    echo Make sure Python is installed: python.org
    echo.
    pause
)
