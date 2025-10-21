# NEXUS IDE Launcher - PowerShell Version
$ErrorActionPreference = "Continue"

Write-Host "NEXUS IDE v0.1.0" -ForegroundColor Cyan
Write-Host "Advanced Code Editor" -ForegroundColor Cyan
Write-Host ""

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ideFile = Join-Path $scriptDir "nexus-ide-standalone.html"

if (-not (Test-Path $ideFile)) {
    Write-Host "ERROR: nexus-ide-standalone.html not found" -ForegroundColor Red
    exit 1
}

Write-Host "Launching IDE..." -ForegroundColor Green

$fileUrl = "file:///{0}" -f ($ideFile -replace '\\', '/')
Start-Process $fileUrl

Write-Host "[+] IDE opened in browser" -ForegroundColor Green
