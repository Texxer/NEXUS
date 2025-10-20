# Quick Start

Get NEXUS running in 5 minutes.

## Prerequisites

- Rust 1.70+ ([https://rustup.rs](https://rustup.rs))
- Node.js 18+ ([https://nodejs.org](https://nodejs.org))
- Git

## Three Commands

```powershell
# 1. Install dependencies
npm install --prefix ui

# 2. Build
cargo tauri build

# 3. Run
.\target\release\nexus-pro.exe
```

## Development Mode

For active development with hot reload:

```powershell
cargo tauri dev
```

---

**Next**: See [02-ARCHITECTURE.md](02-ARCHITECTURE.md) to understand how it works.
