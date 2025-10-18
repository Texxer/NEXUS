#!/usr/bin/env pwsh
# NEXUS IDE Complete Launcher
# Launches backend, frontend, and Electron desktop window

Write-Host "`n╔════════════════════════════════════════╗" -ForegroundColor Magenta
Write-Host "║      NEXUS IDE - Complete Launch       ║" -ForegroundColor Magenta
Write-Host "╚════════════════════════════════════════╝`n" -ForegroundColor Magenta

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommandPath
$IDEDir = Join-Path $ScriptDir "IDE"
$UIDir = Join-Path $IDEDir "ui"

# Function to start process in new window
function Start-ProcessInWindow {
    param(
        [string]$Title,
        [string]$Command,
        [string]$WorkingDirectory
    )
    Write-Host "  ▶ Starting: $Title" -ForegroundColor Cyan
    
    $processInfo = New-Object System.Diagnostics.ProcessStartInfo
    $processInfo.FileName = "powershell.exe"
    $processInfo.Arguments = "-NoExit -Command `"Set-Location '$WorkingDirectory'; $Command`""
    $processInfo.UseShellExecute = $true
    $processInfo.WindowStyle = [System.Diagnostics.ProcessWindowStyle]::Normal
    
    [System.Diagnostics.Process]::Start($processInfo) | Out-Null
}

# Check prerequisites
Write-Host "[1/3] Checking prerequisites..." -ForegroundColor Yellow

if (-not (Test-Path $IDEDir)) {
    Write-Host "  ❌ IDE directory not found at: $IDEDir" -ForegroundColor Red
    exit 1
}

if (-not (Get-Command cargo -ErrorAction SilentlyContinue)) {
    Write-Host "  ❌ Rust/Cargo not found. Please install from https://rustup.rs" -ForegroundColor Red
    exit 1
}

if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Host "  ❌ Node.js/npm not found. Please install from https://nodejs.org" -ForegroundColor Red
    exit 1
}

if (-not (Test-Path (Join-Path $UIDir "dist"))) {
    Write-Host "  ⚠️  UI not built. Building now..." -ForegroundColor Yellow
    Push-Location $UIDir
    npm run build
    Pop-Location
}

Write-Host "  ✅ All prerequisites found`n" -ForegroundColor Green

# Start backend
Write-Host "[2/3] Starting Backend Core Engine..." -ForegroundColor Yellow
Start-ProcessInWindow -Title "NEXUS Backend" -Command "cargo run --release" -WorkingDirectory $IDEDir
Start-Sleep -Milliseconds 2000

# Start frontend dev server
Write-Host "[3/3] Starting Frontend UI Server..." -ForegroundColor Yellow
Start-ProcessInWindow -Title "NEXUS Frontend" -Command "npm run dev" -WorkingDirectory $UIDir
Start-Sleep -Milliseconds 2000

# Start Electron app
Write-Host "[4/3] Launching Electron GUI Window..." -ForegroundColor Yellow
Push-Location $UIDir
npm run dev:electron 2>$null &
Pop-Location

Write-Host "`n╔════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║      NEXUS IDE is Starting!            ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════╝" -ForegroundColor Green

Write-Host "`n📍 Access Points:" -ForegroundColor Cyan
Write-Host "   Backend Core: Running in terminal window" -ForegroundColor Cyan
Write-Host "   Frontend UI:  Running in terminal window" -ForegroundColor Cyan
Write-Host "   Desktop App:  Launching in native window..." -ForegroundColor Cyan

Write-Host "`n💡 To stop NEXUS IDE, close all terminal windows or press Ctrl+C`n" -ForegroundColor Yellow

# Keep script running
while ($true) {
    Start-Sleep -Seconds 1
}
