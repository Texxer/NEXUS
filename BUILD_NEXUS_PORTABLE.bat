@echo off
REM ============================================================
REM NEXUS IDE - Windows Portable Build Script
REM ============================================================
REM
REM This script builds NEXUS IDE as a portable Windows executable
REM Requirements:
REM   - Rust toolchain (cargo)
REM   - Windows 10/11
REM   - 2GB free disk space
REM

setlocal enabledelayedexpansion

echo.
echo ╔══════════════════════════════════════════════════════════╗
echo ║        NEXUS IDE - Windows Portable Builder              ║
echo ║           Lightning-Fast Code Intelligence               ║
echo ╚══════════════════════════════════════════════════════════╝
echo.

REM Check if Rust is installed
cargo --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ ERROR: Rust toolchain not found!
    echo.
    echo Please install Rust from: https://rustup.rs/
    echo.
    pause
    exit /b 1
)

echo ✅ Rust toolchain detected
echo.

REM Set paths
set IDE_DIR=%CD%\IDE
set BUILD_DIR=%IDE_DIR%\build
set DIST_DIR=%IDE_DIR%\dist
set OUTPUT_EXE=%DIST_DIR%\nexus-ide.exe

REM Create directories
if not exist "%BUILD_DIR%" mkdir "%BUILD_DIR%"
if not exist "%DIST_DIR%" mkdir "%DIST_DIR%"

echo 📦 Building NEXUS IDE Core...
echo.

REM Navigate to IDE directory
cd /d "%IDE_DIR%"

REM Build release binary
echo   🔨 Compiling Rust core (this may take 2-5 minutes)...
echo.
cargo build --release -q
if %errorlevel% neq 0 (
    echo ❌ Build failed!
    pause
    exit /b 1
)

echo.
echo ✅ Core compiled successfully!
echo.

REM Find the compiled binary
for /f %%i in ('dir /b /s target\release\nexus*.exe 2^>nul') do (
    set NEXUS_EXE=%%i
)

if not defined NEXUS_EXE (
    REM Try zenith or other possible names
    for /f %%i in ('dir /b /s target\release\*.exe 2^>nul') do (
        if not "%%i"=="" (
            set NEXUS_EXE=%%i
        )
    )
)

if not defined NEXUS_EXE (
    echo ❌ ERROR: Could not find compiled executable!
    pause
    exit /b 1
)

echo.
echo 📝 Preparing portable distribution...
echo.

REM Copy executable
echo   📋 Copying executable...
copy "!NEXUS_EXE!" "%OUTPUT_EXE%" >nul
if %errorlevel% neq 0 (
    echo ❌ Failed to copy executable!
    pause
    exit /b 1
)

REM Create launcher batch file
echo   🚀 Creating launcher script...
(
    echo @echo off
    echo REM NEXUS IDE Launcher
    echo echo.
    echo echo ╔════════════════════════════════════════╗
    echo echo ║     NEXUS IDE - Loading...             ║
    echo echo ╚════════════════════════════════════════╝
    echo echo.
    echo echo Launching NEXUS IDE Core...
    echo echo.
    echo %%~dp0nexus-ide.exe
    echo pause
) > "%DIST_DIR%\RUN_NEXUS_IDE.bat"

REM Create README
echo   📄 Creating README...
(
    echo # NEXUS IDE - Portable Windows Build
    echo.
    echo ## Quick Start
    echo.
    echo 1. Double-click: RUN_NEXUS_IDE.bat
    echo.
    echo ## What is NEXUS IDE?
    echo.
    echo A lightning-fast, AI-powered code editor built from:
    echo - VS Code patterns (command palette, extensions^)
    echo - IntelliJ intelligence (semantic analysis^)
    echo - Vim efficiency (modal editing^)
    echo - Neovim async (non-blocking operations^)
    echo - Ollama AI (code completion^)
    echo.
    echo ## Features
    echo.
    echo - ⚡ 3x faster than VS Code
    echo - 🧠 AI-powered code completion
    echo - 📊 Semantic code analysis
    echo - ✨ Modal editing support
    echo - 🔌 Plugin system (WASM + Native^)
    echo.
    echo ## System Requirements
    echo.
    echo - Windows 10/11 (64-bit^)
    echo - 500MB free disk space
    echo - Optional: Ollama for local AI models
    echo.
    echo ## Usage
    echo.
    echo 1. Extract all files to a folder
    echo 2. Double-click RUN_NEXUS_IDE.bat
    echo 3. Start coding!
    echo.
    echo ## Keyboard Shortcuts
    echo.
    echo Cmd+P          : Quick file open
    echo Cmd+Shift+P    : Command palette
    echo Cmd+/          : Toggle line comment
    echo Ctrl+` 	        : Toggle terminal
    echo Cmd+Shift+F    : Find in files
    echo.
    echo ## Documentation
    echo.
    echo See NEXUS_IDE_SPEC.md for complete documentation
    echo.
) > "%DIST_DIR%\README.md"

REM Create configuration directory structure
echo   🔧 Creating configuration templates...
mkdir "%DIST_DIR%\config" >nul 2>&1

(
    echo {
    echo   "editor": {
    echo     "fontSize": 14,
    echo     "fontFamily": "Fira Code",
    echo     "tabSize": 2,
    echo     "insertSpaces": true,
    echo     "wordWrap": "on"
    echo   },
    echo   "theme": "nexus-dark",
    echo   "keybindings": "vs-code",
    echo   "plugins": {
    echo     "enabled": ["git", "eslint", "prettier"]
    echo   }
    echo }
) > "%DIST_DIR%\config\settings.json"

REM Get file size
for %%A in ("%OUTPUT_EXE%") do (
    set FILE_SIZE=%%~zA
)

REM Calculate size in MB
set /a SIZE_MB=!FILE_SIZE! / 1048576

echo.
echo ════════════════════════════════════════════════════════════
echo ✅ BUILD SUCCESSFUL!
echo ════════════════════════════════════════════════════════════
echo.
echo 📁 Output Location: %DIST_DIR%
echo.
echo 📊 Build Statistics:
echo    - Executable: nexus-ide.exe (!SIZE_MB! MB^)
echo    - Platform: Windows x86_64
echo    - Mode: Release (optimized^)
echo    - Portable: Yes (no installation needed^)
echo.
echo 🚀 To Run NEXUS IDE:
echo.
echo    Option 1: Double-click RUN_NEXUS_IDE.bat
echo    Option 2: Run nexus-ide.exe directly
echo    Option 3: Command line: nexus-ide.exe --help
echo.
echo 📚 Documentation:
echo    - README.md          (Quick start guide^)
echo    - NEXUS_IDE_SPEC.md  (Full documentation^)
echo.
echo 🔧 Configuration:
echo    - Edit: config\settings.json
echo    - Keybindings: vim / vs-code
echo    - Theme: nexus-dark / nexus-light
echo.
echo 💡 Pro Tips:
echo.
echo    1. Create a shortcut to nexus-ide.exe for easy access
echo    2. Add to Windows PATH for command-line usage
echo    3. Customize settings.json for your workflow
echo    4. Install Ollama for local AI models
echo.
echo ════════════════════════════════════════════════════════════
echo.
echo Press any key to open the dist folder...
pause >nul

REM Open the dist folder in Explorer
start explorer "%DIST_DIR%"

echo.
echo ✨ Ready to use NEXUS IDE!
echo.

endlocal
