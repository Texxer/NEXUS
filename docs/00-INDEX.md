# NEXUS Documentation Index

**v0.2.0** • Fast, offline IDE built with Tauri + Svelte

---

## Quick Start

| Section | Time |
|---------|------|
| **[00-QUICK_START](01-QUICK_START.md)** | 5 min |
| **[01-ARCHITECTURE](02-ARCHITECTURE.md)** | 15 min |
| **[02-BUILD](03-BUILD.md)** | 10 min |
| **[03-TROUBLESHOOTING](04-TROUBLESHOOTING.md)** | 5 min |

---

## What is NEXUS?

**Ultra-fast, open-source IDE** optimized for speed and minimalism.

- **4.5 MB executable** (vs 150+ MB Electron)
- **500ms startup** (vs 2-3s VS Code)
- **Offline first** - no cloud, no tracking
- **Built with**: Tauri 2.8 + Svelte 5 + WebView2

---

## I want to...

- **🚀 Start coding now** → [QUICK_START](01-QUICK_START.md)
- **🔧 Understand the tech** → [ARCHITECTURE](02-ARCHITECTURE.md)
- **📦 Build & deploy** → [BUILD](03-BUILD.md)
- **🐛 Fix a problem** → [TROUBLESHOOTING](04-TROUBLESHOOTING.md)

---

## Technology Stack

```
Frontend  │ Svelte 5 + Vite 7 + Tailwind 3
Desktop   │ Tauri 2.8 + WebView2
Backend   │ Rust (Tower-LSP planned)
Build     │ Cargo + npm
```

---

## Project Structure

```
NEXUS/
├── ui/              # Svelte frontend
│   ├── src/
│   │   ├── App.svelte
│   │   ├── main.ts
│   │   └── hooks/
│   ├── index.html
│   └── package.json
│
├── core/            # Rust backend (LSP)
│   ├── src/
│   └── Cargo.toml
│
├── src-tauri/       # Tauri bridge
│   ├── tauri.conf.json
│   └── src/main.rs
│
└── docs/            # This folder
```

---

## Common Commands

```powershell
# Development
cargo tauri dev

# Production build
cargo tauri build

# Run
.\target\release\nexus-pro.exe
```

---

**Start with [01-QUICK_START.md](01-QUICK_START.md)** → 5 minutes to running 🎯
