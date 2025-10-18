# 🚀 NEXUS IDE - BUILD & RUN SCRIPT

**Quick Start: Get NEXUS IDE Running in 5 Minutes**

## Prerequisites Check

Write-Host "🔍 Checking prerequisites..." -ForegroundColor Cyan

# Check Rust
if (!(Get-Command cargo -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Rust not found. Installing..." -ForegroundColor Red
    Write-Host "Please run: winget install -e --id Rustlang.Rust.MSVC" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Rust found: $(cargo --version)" -ForegroundColor Green

# Check Node.js
if (!(Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Node.js not found. Installing..." -ForegroundColor Red
    Write-Host "Please run: winget install -e --id OpenJS.NodeJS" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Node.js found: $(node --version)" -ForegroundColor Green

## Build Core (Rust)

Write-Host "`n📦 Building Rust core..." -ForegroundColor Cyan
Push-Location core

# Build in release mode
cargo build --release

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Rust build failed!" -ForegroundColor Red
    Pop-Location
    exit 1
}

Write-Host "✅ Rust core built successfully!" -ForegroundColor Green
Pop-Location

## Build UI (React + Electron)

Write-Host "`n🎨 Building UI..." -ForegroundColor Cyan
Push-Location ui

# Install dependencies
if (!(Test-Path "node_modules")) {
    Write-Host "Installing npm dependencies..." -ForegroundColor Yellow
    npm install
}

# Build UI
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ UI build failed!" -ForegroundColor Red
    Pop-Location
    exit 1
}

Write-Host "✅ UI built successfully!" -ForegroundColor Green
Pop-Location

## Create Distribution

Write-Host "`n📁 Creating distribution..." -ForegroundColor Cyan

# Ensure dist folder exists
if (!(Test-Path "dist")) {
    New-Item -ItemType Directory -Path "dist" | Out-Null
}

# Copy Rust binary
Copy-Item "core\target\release\zenith-core.exe" "dist\" -Force -ErrorAction SilentlyContinue
if (!(Test-Path "dist\zenith-core.exe")) {
    Copy-Item "core\target\release\zenith-core.dll" "dist\" -Force -ErrorAction SilentlyContinue
}

# Copy UI build
if (Test-Path "ui\dist") {
    Copy-Item "ui\dist\*" "dist\" -Recurse -Force
}

# Create config directory
if (!(Test-Path "dist\config")) {
    New-Item -ItemType Directory -Path "dist\config" | Out-Null
}

# Create default settings
$settings = @{
    editor = @{
        fontSize = 14
        fontFamily = "Fira Code, Consolas, monospace"
        tabSize = 2
        insertSpaces = $true
        lineNumbers = $true
    }
    theme = "nexus-dark"
    ai = @{
        enabled = $true
        provider = "ollama"
        endpoint = "http://localhost:11434"
        model = "deepseek-coder"
    }
    keybindings = "vs-code"
} | ConvertTo-Json -Depth 10

$settings | Out-File "dist\config\settings.json" -Encoding UTF8

Write-Host "✅ Distribution created in: dist\" -ForegroundColor Green

## Run IDE

Write-Host "`n🚀 Starting NEXUS IDE..." -ForegroundColor Cyan
Push-Location ui

# Run in development mode
npm run dev:electron

Pop-Location

Write-Host "`n✨ NEXUS IDE is running!" -ForegroundColor Green
Write-Host "Press Ctrl+C to stop" -ForegroundColor Yellow
