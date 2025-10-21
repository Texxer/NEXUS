#! /usr/bin/env pwsh
# Bump version automatically after successful release
# Usage: ./scripts/bump-version.ps1 -From "0.1.1" -To "0.1.2"

param(
    [string]$From = "",
    [string]$To = ""
)

function Get-NextVersion {
    param([string]$Current)
    
    $parts = $Current -split '\.'
    if ($parts.Count -ne 3) {
        Write-Host "Invalid version format: $Current (expected X.Y.Z)" -ForegroundColor Red
        exit 1
    }
    
    $major, $minor, $patch = $parts
    $patch = [int]$patch + 1
    
    return "$major.$minor.$patch"
}

if (-not $From) {
    Write-Host "Error: -From version not specified" -ForegroundColor Red
    exit 1
}

if (-not $To) {
    $To = Get-NextVersion -Current $From
}

Write-Host "Bumping version from $From to $To..." -ForegroundColor Cyan

$files = @(
    @{Path = "Cargo.toml"; Pattern = 'version = "([0-9.]+)"'},
    @{Path = "src-tauri/Cargo.toml"; Pattern = 'version = "([0-9.]+)"'},
    @{Path = "src-tauri/tauri.conf.json"; Pattern = '"version": "([0-9.]+)"'},
    @{Path = "ui/package.json"; Pattern = '"version": "([0-9.]+)"'}
)

$updated = 0
foreach ($file in $files) {
    $filePath = Join-Path $PSScriptRoot ".." $file.Path
    if (Test-Path $filePath) {
        $content = Get-Content $filePath -Raw
        $newContent = $content -replace $file.Pattern, "`"version`": `"$To`""
        Set-Content $filePath $newContent
        Write-Host "✓ Updated: $($file.Path)" -ForegroundColor Green
        $updated++
    }
}

Write-Host "`n✅ Version bumped successfully: $From → $To ($updated files)" -ForegroundColor Green
Write-Host "`nNext steps:" -ForegroundColor Yellow
Write-Host "1. Review changes: git diff"
Write-Host "2. Commit: git commit -m 'chore: Bump version to $To'"
Write-Host "3. Tag: git tag -a v$To -m 'Release v$To'"
Write-Host "4. Push: git push origin main && git push origin v$To"
