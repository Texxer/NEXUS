# NEXUS Pro v0.1.1 Release

## Release Summary

NEXUS Pro v0.1.1 is a portable, lightweight IDE for code analysis and language server integration, built with Rust, React, and Tauri.

## What's New

### ✅ Features

- **Portable Desktop Application**: Single 8.3 MB executable - no installation required
- **Modern React UI**: Fast, responsive interface with file explorer and editor
- **Rust Backend**: High-performance code analysis engine
- **Tauri Integration**: Secure desktop app with native OS integration
- **Dark Theme**: Professional dark mode for extended coding sessions

### 🔧 Fixes (v0.1.1)

- Fixed Tauri API initialization with proper `@tauri-apps/api/core` imports
- Removed localhost dependency - truly standalone portable app
- Fixed markdown documentation lint warnings
- Improved error handling with graceful fallbacks

### 🚀 Technical Stack

- **Frontend**: React 18, Vite 5, Tailwind CSS 3
- **Desktop**: Tauri 2.0, WebView2 runtime
- **Backend**: Rust 1.90, Tokio async runtime
- **Build**: Cargo, npm, GitHub Actions

## System Requirements

- **OS**: Windows 10+ (x86_64)
- **Memory**: 100 MB minimum
- **Disk Space**: 20 MB installation
- **Prerequisites**: None - fully portable!

## Installation

1. Download `nexus-pro-v0.1.1.exe` from the Release page
2. Run the executable - no installation needed
3. Start coding immediately!

## Usage

```bash
# Simply execute the binary
nexus-pro-v0.1.1.exe
```

### Keyboard Shortcuts

- **Ctrl+O** - Open file
- **Ctrl+S** - Save file
- **Ctrl+/** - Toggle comment
- **Ctrl+Shift+P** - Command palette (coming soon)

## Known Limitations

- **v0.1.1 is an MVP** (Minimum Viable Product)
- Language Server Protocol backend is experimental
- Limited language support (foundation laid for expansion)
- No multi-file project support yet

## Future Roadmap

- **v0.1.2**: Enhanced LSP implementation with syntax highlighting
- **v0.1.3**: Multi-language support (Python, JavaScript, Rust, Go)
- **v0.2.0**: Project management and git integration
- **v0.3.0**: Plugin system and community extensions

## Download

Get the latest release: **nexus-pro-v0.1.1.exe** (8.3 MB)

## Support

For issues, questions, or contributions:

- 📝 [GitHub Issues](<https://github.com/Texxer/NEXUS/issues>)
- 💬 [GitHub Discussions](<https://github.com/Texxer/NEXUS/discussions>)

## License

Licensed under Apache 2.0 - See LICENSE file for details

---

**Built with ❤️ by the NEXUS team**  
*Making portable IDEs fast and accessible*
