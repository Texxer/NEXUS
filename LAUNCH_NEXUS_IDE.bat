@echo off
REM NEXUS IDE Launcher
REM Launches the NEXUS IDE with backend and frontend

title NEXUS IDE
echo.
echo ╔════════════════════════════════════════╗
echo ║         NEXUS IDE - Starting...        ║
echo ╚════════════════════════════════════════╝
echo.

REM Get the script directory
cd /d "%~dp0"

REM Start the backend (Rust core)
echo [1/2] Starting Backend Core Engine...
start "NEXUS Backend" cmd /k "cd IDE && cargo run --release"

REM Wait for backend to initialize
timeout /t 3 /nobreak

REM Start the frontend dev server
echo [2/2] Starting Frontend UI...
start "NEXUS Frontend" cmd /k "cd IDE\ui && npm run dev"

REM Wait for frontend to start
timeout /t 2 /nobreak

REM Open in browser
echo.
echo ✓ NEXUS IDE is starting!
echo   Backend: http://localhost:11434 (Ollama integration)
echo   Frontend: http://localhost:5173/
echo.
echo Launching browser window...
start http://localhost:5173/

echo.
echo To stop NEXUS IDE, close both console windows.
pause
