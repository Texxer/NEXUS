# NEXUS IDE Architecture

This document describes the architecture and design decisions behind NEXUS IDE.

## Overview

NEXUS IDE follows a modern client-server architecture where:
- **Frontend**: Svelte 5 + TypeScript running in a WebView
- **Backend**: Rust + Tauri providing native capabilities
- **Communication**: JSON-RPC style IPC via Tauri commands

## Technology Stack

### Frontend

- **Svelte 5**: Reactive UI framework with excellent performance
  - Component-based architecture
  - Built-in state management via stores
  - Minimal bundle size (~30KB runtime)
  
- **TypeScript**: Type-safe JavaScript
  - Compile-time type checking
  - Better IDE support and refactoring
  - Interfaces for data structures

- **Vite**: Next-generation frontend build tool
  - Lightning-fast HMR (Hot Module Replacement)
  - Optimized production builds
  - Native ES modules support

- **CodeMirror 6**: Modern code editor library
  - Modular architecture
  - Support for 100+ languages via language-data
  - Extensible through plugins
  - Excellent performance with large files

### Backend

- **Rust**: Systems programming language
  - Memory safety without garbage collection
  - Zero-cost abstractions
  - Excellent for native performance

- **Tauri 2**: Framework for building desktop apps
  - Smaller bundle size than Electron
  - Native OS integration
  - Secure IPC between frontend and backend
  - Cross-platform support (Windows, macOS, Linux)

## Architecture Diagram

```
┌─────────────────────────────────────────────────────┐
│                   NEXUS IDE                          │
├─────────────────────────────────────────────────────┤
│                                                      │
│  ┌─────────────────────────────────────────────┐   │
│  │           Frontend (WebView)                 │   │
│  │                                               │   │
│  │  ┌──────────────┐  ┌──────────────┐         │   │
│  │  │ App.svelte   │  │   Stores     │         │   │
│  │  │              │  │ - fileStore  │         │   │
│  │  │  ┌────────┐  │  └──────────────┘         │   │
│  │  │  │Header  │  │                           │   │
│  │  │  └────────┘  │  ┌──────────────┐         │   │
│  │  │  ┌────────┐  │  │ Components   │         │   │
│  │  │  │Explorer│  │  │ - FileExplorer│        │   │
│  │  │  └────────┘  │  │ - Editor     │         │   │
│  │  │  ┌────────┐  │  │ - Terminal   │         │   │
│  │  │  │Editor  │  │  └──────────────┘         │   │
│  │  │  └────────┘  │                           │   │
│  │  │  ┌────────┐  │                           │   │
│  │  │  │Terminal│  │                           │   │
│  │  │  └────────┘  │                           │   │
│  │  └──────────────┘                           │   │
│  └─────────────────────────────────────────────┘   │
│                       ↕                             │
│              Tauri IPC (invoke)                     │
│                       ↕                             │
│  ┌─────────────────────────────────────────────┐   │
│  │           Backend (Rust)                     │   │
│  │                                               │   │
│  │  ┌──────────────────────────────────┐        │   │
│  │  │   Tauri Commands                 │        │   │
│  │  │   - read_file                    │        │   │
│  │  │   - write_file                   │        │   │
│  │  │   - list_directory               │        │   │
│  │  └──────────────────────────────────┘        │   │
│  │                                               │   │
│  │  ┌──────────────────────────────────┐        │   │
│  │  │   Plugins                        │        │   │
│  │  │   - tauri-plugin-shell           │        │   │
│  │  │   - tauri-plugin-fs              │        │   │
│  │  │   - tauri-plugin-dialog          │        │   │
│  │  │   - tauri-plugin-window-state    │        │   │
│  │  └──────────────────────────────────┘        │   │
│  └─────────────────────────────────────────────┘   │
│                       ↕                             │
│                  Native OS APIs                     │
│                                                      │
└─────────────────────────────────────────────────────┘
```

## Component Structure

### App.svelte (Main Component)

The root component that orchestrates the entire UI:

- **Layout Management**: 3-panel layout (explorer, editor, terminal)
- **State Coordination**: Manages global state via stores
- **Keyboard Shortcuts**: Global shortcuts (Ctrl+B, Ctrl+`)
- **Theme**: Applies dark theme styling

### FileExplorer Component

Manages file system browsing:

- **Directory Listing**: Uses `list_directory` command
- **Tree Navigation**: Expandable/collapsible folders
- **File Selection**: Opens files in editor
- **Native Dialogs**: Uses system file picker

**Data Flow**:
```
User clicks "Open Folder" 
  → Tauri dialog opens 
  → User selects directory 
  → list_directory(path) 
  → Update entries state 
  → Render tree view
```

### Editor Component

Code editing with syntax highlighting:

- **CodeMirror 6 Integration**: Full-featured code editor
- **Language Detection**: Auto-detects language from file extension
- **File Operations**: Read/write via Tauri commands
- **State Management**: Tracks dirty state for unsaved changes

**Data Flow**:
```
File selected 
  → read_file(path) 
  → Create CodeMirror view 
  → User edits 
  → Mark as dirty 
  → User saves (Ctrl+S) 
  → write_file(path, content)
```

### Terminal Component

Integrated command execution:

- **Shell Integration**: Uses tauri-plugin-shell
- **Command History**: Navigate with arrow keys
- **Working Directory**: Synced with current project
- **Output Display**: Real-time command output

### Stores

Svelte stores for state management:

- **currentFile**: Currently active file path
- **openFiles**: Array of open file paths
- **fileContents**: Map of file paths to content
- **currentDirectory**: Current working directory

## Backend API

### Tauri Commands

#### `read_file(path: String) -> Result<String, String>`
Reads file contents from disk.

**Security**: Uses Tauri's scoped filesystem access

#### `write_file(path: String, content: String) -> Result<(), String>`
Writes content to a file.

**Security**: Requires explicit user permission via capabilities

#### `list_directory(path: String) -> Result<Vec<DirEntry>, String>`
Lists files and directories in a path.

**Returns**: Array of `{ name, is_dir, path }` objects, sorted (directories first, then alphabetically)

## Security Model

NEXUS IDE follows Tauri's security-first approach:

1. **CSP**: Content Security Policy restricts what resources can load
2. **Allowlist**: Only explicitly enabled APIs are available
3. **Scoped Filesystem**: File access requires explicit permissions
4. **IPC Validation**: All commands validate inputs

## Performance Considerations

### Frontend Optimization

- **Code Splitting**: Vite automatically splits code by route
- **Lazy Loading**: CodeMirror language extensions load on demand
- **Virtual Scrolling**: Large file trees use virtual rendering
- **Reactive Updates**: Svelte's compiler generates optimal update code

### Backend Optimization

- **Async Operations**: All I/O is non-blocking
- **Efficient IPC**: JSON serialization minimized
- **Native Performance**: Rust provides zero-cost abstractions

## Build Process

### Development Build

```bash
npm run tauri:dev
```

1. Vite starts development server (port 1420)
2. Tauri watches for changes
3. Hot Module Replacement for instant updates
4. Source maps for debugging

### Production Build

```bash
npm run tauri:build
```

1. Vite builds optimized frontend bundle
2. Tree-shaking removes unused code
3. Minification reduces bundle size
4. Cargo builds optimized Rust binary
5. Tauri bundles application for target platform

## Future Architecture

### Planned Enhancements

1. **Language Server Protocol (LSP)**
   - Add LSP client in frontend
   - Run language servers in backend
   - Provide IntelliSense, diagnostics, etc.

2. **Plugin System**
   - WASM-based plugins for safety
   - API for extending functionality
   - Plugin marketplace integration

3. **Git Integration**
   - Native Git operations via libgit2
   - Visual diff and merge tools
   - Branch management UI

4. **AI Integration**
   - Local or cloud-based AI models
   - Code completion and suggestions
   - Natural language code generation

## Testing Strategy

### Unit Tests
- Frontend: Svelte Testing Library
- Backend: Rust's built-in test framework

### Integration Tests
- E2E tests with Playwright
- Test IPC communication
- Verify file operations

### Performance Tests
- Measure bundle size
- Profile memory usage
- Benchmark editor performance

## Deployment

### Distribution Channels

- **GitHub Releases**: Automated releases via CI/CD
- **Platform Stores**: Future integration with:
  - Microsoft Store (Windows)
  - Mac App Store (macOS)
  - Snap/Flatpak (Linux)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on:
- Code structure
- Adding new features
- Testing requirements
- Pull request process
