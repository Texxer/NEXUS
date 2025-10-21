# Build Guide

## Development Build

```powershell
cargo tauri dev
```

� Hot reload on file changes
� Dev tools enabled
� Faster iteration

## Production Build

```powershell
cargo tauri build
```

� Optimized executable
� Smaller file size
� Output: `target/release/nexus-pro.exe`

## Build Optimization

File: `.cargo/config.toml`

```toml
[build]
jobs = 8
```

This enables parallel compilation (70% faster builds).

## Distribution

1. Build production version: `cargo tauri build`
2. Executable location: `target/release/nexus-pro.exe` (4.5 MB)
3. Share `.exe` file � no dependencies needed

---

**Previous**: See [02-ARCHITECTURE.md](02-ARCHITECTURE.md)  
**Next**: See [04-TROUBLESHOOTING.md](04-TROUBLESHOOTING.md) if issues arise.
