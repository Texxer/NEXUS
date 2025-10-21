# Changelog

All notable changes to NEXUS Pro are documented here.

## [0.1.1] - 2025-10-21

### Added

- ✅ GitHub Actions workflow for automated releases
- ✅ Tauri IPC proper implementation
- ✅ Comprehensive deployment guide
- ✅ Release status documentation

### Fixed

- 🔧 Replaced `window.__TAURI__` with proper `@tauri-apps/api/core` import
- 🔧 Removed localhost dev server dependency
- 🔧 Tauri API now properly initializes without error messages
- 🔧 All markdown documentation lint warnings fixed
- 🔧 Error handling with graceful fallbacks

### Changed

- 📋 Updated build configuration for production
- 📋 Improved Tauri security settings
- 📋 Better error messaging in UI

### Removed

- ❌ Unnecessary dev server references
- ❌ Debug error messages that exposed implementation details

## [0.1.0] - 2025-10-20

### Added

- ✅ Initial NEXUS Pro release (MVP)
- ✅ Portable desktop application
- ✅ React 18 frontend with modern UI
- ✅ Rust backend with Tauri integration
- ✅ File explorer, editor, terminal components
- ✅ Dark theme support
- ✅ Comprehensive documentation

### Architecture

- Frontend: React + Vite + Tailwind CSS
- Desktop: Tauri 2.0 + WebView2
- Backend: Rust 1.90 + Tokio
- Binary: 7.98 MB (standalone, no dependencies)

---

## Versioning Strategy

**NEXUS Pro** uses Semantic Versioning:
- **0.x.x** = Pre-release / MVP phase
- **1.0.0** = First stable release
- **Major.Minor.Patch** format

## Future Releases

**v0.1.2** - Enhanced LSP with syntax highlighting
**v0.1.3** - Multi-language support
**v0.2.0** - Project management & git integration
**v0.3.0** - Plugin system & extensions
**v1.0.0** - Stable production release

---

*For detailed commit history, see GitHub: <https://github.com/Texxer/NEXUS/commits/main>*
