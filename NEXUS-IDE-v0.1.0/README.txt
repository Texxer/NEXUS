# NEXUS IDE v0.1.0 - Portable Edition

## Quick Start

1. Run: nexus-ide.exe
2. The app will start with the embedded React frontend

## Components Included

- **nexus-ide.exe** (141 KB) - Desktop application binary
- **frontend/** - React UI (pre-built)

## System Requirements

- Windows 10 or later
- WebView2 runtime (pre-installed on Windows 10+)

## Build Information

- Frontend: React 18 + Vite
- Backend: Rust + Tauri
- IPC: Full Rust ↔ React communication ready

## Next Steps

To complete the full Tauri desktop build with GUI:
1. Disable Windows Defender temporarily
2. Run: cargo tauri build
3. This will create NEXUS IDE.exe (full desktop app with WebView)

## Architecture

React Frontend (ui/dist)
         ↓ (Tauri IPC)
Rust Backend (src-tauri/main.rs)
         ↓ (can connect to)
Core Rust Modules (core/)
