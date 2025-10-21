# NEXUS IDE Launcher
$ErrorActionPreference = "Continue"

Write-Host "Starting NEXUS IDE..." -ForegroundColor Green
Write-Host "Version: 0.1.0" -ForegroundColor Cyan

$exePath = "$PSScriptRoot\target\release\nexus-ide.exe"

if (-not (Test-Path $exePath)) {
    Write-Host "ERROR: $exePath not found!" -ForegroundColor Red
    exit 1
}

Write-Host "EXE path: $exePath" -ForegroundColor Gray
Write-Host "Frontend: $PSScriptRoot\ui\dist\" -ForegroundColor Gray

# Check if frontend exists
if (-not (Test-Path "$PSScriptRoot\ui\dist\index.html")) {
    Write-Host "ERROR: Frontend not found at ui/dist/index.html" -ForegroundColor Red
    exit 1
}

Write-Host "Frontend OK" -ForegroundColor Green

try {
    # Try to run the EXE with error output
    & $exePath
    $exitCode = $LASTEXITCODE
    
    if ($exitCode -ne 0) {
        Write-Host "ERROR: EXE exited with code $exitCode" -ForegroundColor Red
    } else {
        Write-Host "IDE closed normally" -ForegroundColor Green
    }
} catch {
    Write-Host "ERROR: Failed to run EXE" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    exit 1
}
