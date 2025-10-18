#!/usr/bin/env pwsh
<#
.SYNOPSIS
    NEXUS IDE Test Debugger - Automated self-testing harness

.DESCRIPTION
    Runs the IDE test suite with options for verbose output, timing, and report generation

.PARAMETER Verbose
    Show detailed output for each test

.PARAMETER Timing
    Display detailed timing information

.PARAMETER Output
    Save report to specified file

.PARAMETER Category
    Filter tests by category (TextEngine, OllamaClient, Integration, Performance)

.PARAMETER Clean
    Clean build artifacts before testing

.PARAMETER NoCache
    Disable cargo cache

.EXAMPLE
    .\run_tests.ps1
    
.EXAMPLE
    .\run_tests.ps1 -Verbose -Output "test_results.txt"
#>

param(
    [switch]$Verbose,
    [switch]$Timing,
    [string]$Output = "",
    [string]$Category = "",
    [switch]$Clean,
    [switch]$NoCache
)

$ErrorActionPreference = "Stop"

# Colors
$Green = "Green"
$Red = "Red"
$Yellow = "Yellow"
$Cyan = "Cyan"

# Header
Write-Host "`n" -ForegroundColor $Cyan
Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor $Cyan
Write-Host "║       🧪 NEXUS IDE TEST DEBUGGER - LAUNCHER                ║" -ForegroundColor $Cyan
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor $Cyan
Write-Host ""

# Check if we're in the right directory
if (-not (Test-Path "Cargo.toml")) {
    Write-Host "❌ Error: Cargo.toml not found!" -ForegroundColor $Red
    Write-Host "Please run this script from the 'core' directory" -ForegroundColor $Yellow
    exit 1
}

# Clean if requested
if ($Clean) {
    Write-Host "🧹 Cleaning build artifacts..." -ForegroundColor $Yellow
    cargo clean
    if ($?) {
        Write-Host "✅ Clean complete" -ForegroundColor $Green
    } else {
        Write-Host "❌ Clean failed" -ForegroundColor $Red
        exit 1
    }
}

Write-Host ""
Write-Host "📦 Building test binary..." -ForegroundColor $Cyan

# Build the test binary
$buildArgs = @("build", "--release", "--bin", "test_debugger")
if ($NoCache) {
    $buildArgs += "--offline"
}

& cargo @buildArgs 2>&1 | ForEach-Object { Write-Host $_ }

if ($LASTEXITCODE -ne 0) {
    Write-Host "`n❌ Build failed!" -ForegroundColor $Red
    exit 1
}

Write-Host "`n✅ Build successful!" -ForegroundColor $Green

# Run tests
Write-Host ""
Write-Host "🚀 Running tests..." -ForegroundColor $Cyan
Write-Host ""

$testArgs = @()

if ($Verbose) {
    $testArgs += "--verbose"
}

if ($Timing) {
    $testArgs += "--timing"
}

if ($Category) {
    $testArgs += "--category"
    $testArgs += $Category
}

if ($Output) {
    $testArgs += "--output"
    $testArgs += $Output
}

# Run the test binary
$testBinary = ".\target\release\test_debugger.exe"
if (-not (Test-Path $testBinary)) {
    Write-Host "❌ Test binary not found at $testBinary" -ForegroundColor $Red
    exit 1
}

& $testBinary @testArgs

$testExitCode = $LASTEXITCODE

# Summary
Write-Host ""
Write-Host "━".PadRight(70, "━") -ForegroundColor $Cyan

if ($testExitCode -eq 0) {
    Write-Host "✅ All tests passed!" -ForegroundColor $Green
    if ($Output) {
        Write-Host "📄 Report saved to: $Output" -ForegroundColor $Green
    }
} else {
    Write-Host "❌ Some tests failed. Review output above." -ForegroundColor $Red
}

Write-Host "━".PadRight(70, "━") -ForegroundColor $Cyan
Write-Host ""

exit $testExitCode
