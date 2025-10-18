# NEXUS IDE - Windows Build & Setup Script
# This script automates the complete build and setup process

param(
    [Parameter(Mandatory=$false)]
    [ValidateSet("build", "clean", "release", "install", "run", "help")]
    [string]$Action = "help"
)

# ============================================================
# Configuration
# ============================================================

# Use current working directory or script directory
$ScriptDir = if ($MyInvocation.MyCommandPath) { Split-Path -Parent $MyInvocation.MyCommandPath } else { Get-Location }
$IDEDir = Join-Path $ScriptDir "IDE"
$BuildDir = Join-Path $IDEDir "build"
$DistDir = Join-Path $IDEDir "dist"
$OutputEXE = Join-Path $DistDir "nexus-ide.exe"

$Colors = @{
    Success = "Green"
    Error = "Red"
    Warning = "Yellow"
    Info = "Cyan"
    Header = "Magenta"
}

# ============================================================
# Helper Functions
# ============================================================

function Write-Header {
    param([string]$Text)
    Write-Host ""
    Write-Host "╔═" + ("═" * ($Text.Length + 2)) + "╗" -ForegroundColor $Colors.Header
    Write-Host "║ $Text ║" -ForegroundColor $Colors.Header
    Write-Host "╚═" + ("═" * ($Text.Length + 2)) + "╝" -ForegroundColor $Colors.Header
    Write-Host ""
}

function Write-Success {
    param([string]$Text)
    Write-Host "✅ $Text" -ForegroundColor $Colors.Success
}

function Write-Error-Custom {
    param([string]$Text)
    Write-Host "❌ $Text" -ForegroundColor $Colors.Error
}

function Write-Warning-Custom {
    param([string]$Text)
    Write-Host "⚠️  $Text" -ForegroundColor $Colors.Warning
}

function Write-Info {
    param([string]$Text)
    Write-Host "ℹ️  $Text" -ForegroundColor $Colors.Info
}

function Test-RustInstalled {
    try {
        $version = cargo --version
        Write-Success "Rust toolchain detected: $version"
        return $true
    }
    catch {
        Write-Error-Custom "Rust toolchain not found!"
        Write-Info "Please install from: https://rustup.rs/"
        return $false
    }
}

function New-DirectoriesIfNotExist {
    @($BuildDir, $DistDir) | ForEach-Object {
        if (-not (Test-Path $_)) {
            New-Item -ItemType Directory -Path $_ -Force | Out-Null
            Write-Info "Created directory: $_"
        }
    }
}

function Get-FileSizeMB {
    param([string]$FilePath)
    if (Test-Path $FilePath) {
        $bytes = (Get-Item $FilePath).Length
        return [math]::Round($bytes / 1MB, 2)
    }
    return 0
}

# ============================================================
# Main Functions
# ============================================================

function Build-Release {
    Write-Header "Building NEXUS IDE Release"
    
    # Verify prerequisites
    if (-not (Test-RustInstalled)) {
        exit 1
    }
    
    # Create directories
    New-DirectoriesIfNotExist
    
    Write-Info "Current directory: $IDEDir"
    Write-Info "Build target: $BuildDir"
    Write-Info "Output: $OutputEXE"
    Write-Host ""
    
    # Check Cargo.toml
    if (-not (Test-Path (Join-Path $IDEDir "Cargo.toml"))) {
        Write-Error-Custom "Cargo.toml not found in $IDEDir"
        exit 1
    }
    
    Write-Info "Starting Rust compilation (this may take 2-5 minutes)..."
    Write-Host ""
    
    # Build
    Push-Location $IDEDir
    try {
        cargo build --release
        if ($LASTEXITCODE -ne 0) {
            Write-Error-Custom "Build failed with exit code $LASTEXITCODE"
            exit 1
        }
    }
    finally {
        Pop-Location
    }
    
    Write-Success "Rust core compiled successfully!"
    Write-Host ""
    
    # Find and copy executable
    $exePath = Get-ChildItem -Path (Join-Path $IDEDir "target\release") -Filter "*.exe" | 
               Sort-Object -Property LastWriteTime -Descending | 
               Select-Object -First 1
    
    if (-not $exePath) {
        Write-Error-Custom "Could not find compiled executable!"
        exit 1
    }
    
    Write-Info "Found executable: $($exePath.FullName)"
    Copy-Item -Path $exePath.FullName -Destination $OutputEXE -Force
    
    Write-Success "Executable copied to: $OutputEXE"
    Write-Host ""
    
    # Create launcher script
    Write-Info "Creating launcher script..."
    $launcherPath = Join-Path $DistDir "RUN_NEXUS_IDE.bat"
    @"
@echo off
REM NEXUS IDE Launcher
echo.
echo ╔════════════════════════════════════════╗
echo ║     NEXUS IDE - Loading...             ║
echo ╚════════════════════════════════════════╝
echo.
echo Launching NEXUS IDE Core...
echo.
%~dp0nexus-ide.exe %*
pause
"@ | Set-Content -Path $launcherPath -Force
    
    Write-Success "Launcher created: $launcherPath"
    Write-Host ""
    
    # Create configuration
    Write-Info "Creating configuration..."
    $configDir = Join-Path $DistDir "config"
    if (-not (Test-Path $configDir)) {
        New-Item -ItemType Directory -Path $configDir -Force | Out-Null
    }
    
    $configPath = Join-Path $configDir "settings.json"
    @"
{
  "editor": {
    "fontSize": 14,
    "fontFamily": "Fira Code",
    "tabSize": 2,
    "insertSpaces": true,
    "wordWrap": "on"
  },
  "theme": "nexus-dark",
  "keybindings": "vs-code",
  "plugins": {
    "enabled": ["git", "eslint", "prettier"]
  }
}
"@ | Set-Content -Path $configPath -Force
    
    Write-Success "Configuration created: $configPath"
    Write-Host ""
    
    # Copy documentation
    Write-Info "Copying documentation..."
    $docFiles = @("NEXUS_IDE_SPEC.md", "NEXUS_USAGE_GUIDE.md", "README.md")
    $docFiles | ForEach-Object {
        $src = Join-Path $IDEDir $_
        if (Test-Path $src) {
            Copy-Item -Path $src -Destination (Join-Path $DistDir $_) -Force
            Write-Success "Copied: $_"
        }
    }
    
    Write-Host ""
    Show-BuildSummary
}

function Clean-Build {
    Write-Header "Cleaning Build Artifacts"
    
    Push-Location $IDEDir
    try {
        Write-Info "Running: cargo clean"
        cargo clean
    }
    finally {
        Pop-Location
    }
    
    Write-Success "Build artifacts cleaned!"
}

function Install-Portable {
    Write-Header "Installing NEXUS IDE (Portable)"
    
    if (-not (Test-Path $OutputEXE)) {
        Write-Error-Custom "Executable not found! Run 'build' first."
        exit 1
    }
    
    # Create Program Files directory
    $installDir = "C:\Program Files\NEXUS IDE"
    Write-Info "Installation directory: $installDir"
    
    if (-not (Test-Path $installDir)) {
        New-Item -ItemType Directory -Path $installDir -Force | Out-Null
        Write-Success "Created directory"
    }
    
    # Copy all files
    Write-Info "Copying files..."
    Get-ChildItem $DistDir -Recurse | ForEach-Object {
        $relative = $_.FullName.Substring($DistDir.Length + 1)
        $dest = Join-Path $installDir $relative
        
        if ($_.PSIsContainer) {
            if (-not (Test-Path $dest)) {
                New-Item -ItemType Directory -Path $dest -Force | Out-Null
            }
        }
        else {
            Copy-Item -Path $_.FullName -Destination $dest -Force
        }
    }
    
    Write-Success "Installation complete!"
    Write-Info "Location: $installDir"
    Write-Host ""
    
    # Add to PATH (optional)
    $response = Read-Host "Add NEXUS IDE to PATH for command-line access? (Y/N)"
    if ($response -eq "Y" -or $response -eq "y") {
        $currentPath = [Environment]::GetEnvironmentVariable("Path", "User")
        if ($currentPath -notlike "*NEXUS IDE*") {
            [Environment]::SetEnvironmentVariable(
                "Path",
                "$currentPath;$installDir",
                "User"
            )
            Write-Success "Added to PATH! (may require terminal restart)"
        }
    }
    
    Write-Host ""
    Write-Info "To run NEXUS IDE, type: nexus-ide.exe"
}

function Run-IDE {
    Write-Header "Starting NEXUS IDE"
    
    if (-not (Test-Path $OutputEXE)) {
        Write-Error-Custom "Executable not found! Run 'build' first."
        exit 1
    }
    
    Write-Info "Launching: $OutputEXE"
    & $OutputEXE
}

function Show-Help {
    Write-Header "NEXUS IDE Build & Setup Script"
    
    Write-Host "Usage: .\BUILD_NEXUS.ps1 -Action <action>" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Available Actions:" -ForegroundColor Green
    Write-Host ""
    Write-Host "  build      Build release binary (requires Rust)" -ForegroundColor Yellow
    Write-Host "  clean      Clean build artifacts" -ForegroundColor Yellow
    Write-Host "  release    Build optimized release" -ForegroundColor Yellow
    Write-Host "  install    Install portable executable to Program Files" -ForegroundColor Yellow
    Write-Host "  run        Run NEXUS IDE" -ForegroundColor Yellow
    Write-Host "  help       Show this message" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Examples:" -ForegroundColor Green
    Write-Host ""
    Write-Host "  # Build NEXUS IDE" -ForegroundColor Gray
    Write-Host "  .\BUILD_NEXUS.ps1 -Action build" -ForegroundColor White
    Write-Host ""
    Write-Host "  # Install to Program Files" -ForegroundColor Gray
    Write-Host "  .\BUILD_NEXUS.ps1 -Action install" -ForegroundColor White
    Write-Host ""
    Write-Host "  # Run the IDE" -ForegroundColor Gray
    Write-Host "  .\BUILD_NEXUS.ps1 -Action run" -ForegroundColor White
    Write-Host ""
    Write-Host "Quick Start:" -ForegroundColor Green
    Write-Host ""
    Write-Host "  1. .\BUILD_NEXUS.ps1 -Action build" -ForegroundColor White
    Write-Host "  2. .\BUILD_NEXUS.ps1 -Action install" -ForegroundColor White
    Write-Host "  3. .\BUILD_NEXUS.ps1 -Action run" -ForegroundColor White
    Write-Host ""
    Write-Host "System Requirements:" -ForegroundColor Green
    Write-Host "  - Windows 10/11 (64-bit)" -ForegroundColor Gray
    Write-Host "  - Rust toolchain (from https://rustup.rs)" -ForegroundColor Gray
    Write-Host "  - 2GB free disk space" -ForegroundColor Gray
    Write-Host ""
}

function Show-BuildSummary {
    $size = Get-FileSizeMB $OutputEXE
    
    Write-Host "════════════════════════════════════════════════════════════" -ForegroundColor Green
    Write-Success "BUILD SUCCESSFUL!"
    Write-Host "════════════════════════════════════════════════════════════" -ForegroundColor Green
    Write-Host ""
    Write-Info "Output Location: $DistDir"
    Write-Host ""
    Write-Host "Build Statistics:" -ForegroundColor Cyan
    Write-Host "  • Executable: nexus-ide.exe ($size MB)"
    Write-Host "  • Platform: Windows x86_64"
    Write-Host "  • Mode: Release (optimized)"
    Write-Host "  • Portable: Yes (no installation needed)"
    Write-Host ""
    Write-Host "Next Steps:" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "  1. Install to Program Files:" -ForegroundColor Gray
    Write-Host "     .\BUILD_NEXUS.ps1 -Action install" -ForegroundColor White
    Write-Host ""
    Write-Host "  2. Run NEXUS IDE:" -ForegroundColor Gray
    Write-Host "     .\BUILD_NEXUS.ps1 -Action run" -ForegroundColor White
    Write-Host ""
    Write-Host "  3. Or manually run:" -ForegroundColor Gray
    Write-Host "     & '$OutputEXE'" -ForegroundColor White
    Write-Host ""
    Write-Host "Documentation:" -ForegroundColor Cyan
    Write-Host "  • Quick Start: $DistDir\NEXUS_USAGE_GUIDE.md"
    Write-Host "  • Full Spec: $DistDir\NEXUS_IDE_SPEC.md"
    Write-Host "  • README: $DistDir\README.md"
    Write-Host ""
}

# ============================================================
# Main Dispatcher
# ============================================================

switch ($Action.ToLower()) {
    "build" {
        Build-Release
    }
    "clean" {
        Clean-Build
    }
    "release" {
        Build-Release
    }
    "install" {
        Install-Portable
    }
    "run" {
        Run-IDE
    }
    "help" {
        Show-Help
    }
    default {
        Show-Help
    }
}
