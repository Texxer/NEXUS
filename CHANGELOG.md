# Changelog

All notable changes to NEXUS IDE will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-10-18

### Added

#### Core Features
- **File Explorer**: Browse project files with tree view
  - Directory expansion/collapse
  - File type icons (JavaScript, TypeScript, Rust, Python, etc.)
  - Native folder selection dialog
  - Sorted display (directories first, then alphabetical)

- **Code Editor**: Full-featured editing with CodeMirror 6
  - Syntax highlighting for 100+ languages
  - Line numbers and active line highlighting
  - Bracket matching
  - Code folding
  - Auto-completion
  - Search and replace
  - File save functionality (Ctrl+S / Cmd+S)
  - Dirty state tracking for unsaved changes

- **Integrated Terminal**: Execute shell commands
  - Command execution via Tauri shell plugin
  - Command history (navigate with arrow keys)
  - Clear terminal (Ctrl+L)
  - Working directory synchronization
  - Real-time output display

- **Modern UI**: Dark theme optimized for coding
  - Three-panel layout (explorer, editor, terminal)
  - Resizable panels
  - Multiple file tabs
  - Tab close buttons
  - Keyboard shortcuts
  - Responsive design

#### Technical Infrastructure
- **Frontend**: Svelte 5 + TypeScript + Vite
  - Component-based architecture
  - Reactive state management with stores
  - Type-safe development

- **Backend**: Rust + Tauri 2
  - File system operations (read, write, list)
  - Native performance
  - Cross-platform support (Windows, macOS, Linux)
  - Secure IPC communication

- **Window State**: Persistent window position and size
  - Automatic restoration on app restart
  - Via tauri-plugin-window-state

#### Developer Tools
- **Documentation**:
  - Comprehensive README with installation instructions
  - Architecture documentation
  - Contributing guidelines
  - Quick start guide
  - Code of conduct

- **CI/CD**:
  - GitHub Actions workflow
  - Multi-platform builds (Ubuntu, Windows, macOS)
  - Frontend and backend linting
  - Automated testing pipeline

- **Development Environment**:
  - VS Code configuration
  - Recommended extensions
  - TypeScript configuration
  - Svelte configuration

#### Keyboard Shortcuts
- **Ctrl+B** / **Cmd+B**: Toggle file explorer
- **Ctrl+`** / **Cmd+`**: Toggle terminal
- **Ctrl+S** / **Cmd+S**: Save current file
- **Ctrl+F**: Find in file
- **Ctrl+L**: Clear terminal

### Language Support

Syntax highlighting for:
- Web: JavaScript, TypeScript, HTML, CSS, JSON, Markdown
- Systems: Rust, C, C++, Go
- Scripting: Python, Ruby, Perl, Shell, PowerShell
- JVM: Java, Kotlin, Scala, Groovy
- Functional: Haskell, Elm, Elixir, OCaml
- Mobile: Swift, Dart, Kotlin
- Database: SQL, PostgreSQL, MySQL
- Data: YAML, TOML, XML
- And 80+ more via CodeMirror Language Data

### Security
- Content Security Policy (CSP) configuration
- Scoped filesystem access
- Secure IPC between frontend and backend
- Input validation on all commands

### Performance
- Fast startup time
- Efficient file operations
- Optimized bundle size
- Lazy loading of language extensions
- Minimal memory footprint

### Known Limitations
- No Git integration yet (planned for future release)
- No LSP support yet (planned for future release)
- No plugin system yet (planned for future release)
- Terminal is read-only for some operations

### Dependencies

#### Frontend
- Svelte 5.17.1
- TypeScript 5.3.3
- Vite 6.0.11
- CodeMirror 6.0.1
- Tauri API 2.1.1

#### Backend
- Tauri 2.0
- Rust 1.90.0 (or later)
- tauri-plugin-shell 2.0
- tauri-plugin-fs 2.0
- tauri-plugin-dialog 2.0
- tauri-plugin-window-state 2.0

### Platform Support
- ✅ Windows 10/11
- ✅ macOS 10.15+
- ✅ Linux (Ubuntu 20.04+, Fedora 36+, Arch)

---

## [Unreleased]

### Planned Features
- 🤖 AI-powered code completion
- 🔍 Language Server Protocol (LSP) integration
- 🔌 Plugin system
- 🎨 Theme customization
- 🔄 Git integration
- 🐛 Integrated debugger
- 📊 Multi-project workspaces
- 🌐 Remote development support

---

[0.1.0]: https://github.com/Texxer/NEXUS/releases/tag/v0.1.0
