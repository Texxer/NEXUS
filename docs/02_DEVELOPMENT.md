# 02 - Development Guide

## Getting Started

### Prerequisites

- Windows x64 OS
- Rust (1.70+): https://rustup.rs/
- Node.js (18+): https://nodejs.org/
- Git: https://git-scm.com/

### Project Structure

```
IDE/
├── src-tauri/           # Rust backend (Tauri framework)
│   ├── src/
│   │   ├── main.rs     # Application entry point
│   │   ├── editor.rs   # Editor components
│   │   ├── commands.rs # IPC commands
│   │   └── lib.rs      # Library exports
│   ├── Cargo.toml      # Rust manifest
│   └── tauri.conf.json # Tauri configuration
├── ui/                  # Frontend (Svelte/TypeScript)
│   ├── src/            # Svelte components
│   ├── public/         # Static assets
│   ├── package.json    # Node.js manifest
│   ├── vite.config.ts  # Vite build config
│   └── tsconfig.json   # TypeScript config
├── core/               # Shared libraries
└── docs/              # Documentation (this folder)
```

## Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/Texxer/NEXUS.git
cd IDE
```

### 2. Install Frontend Dependencies

```bash
npm install --prefix ui/
```

### 3. Install Rust Dependencies

```bash
cargo build
```

This downloads and compiles all Rust dependencies.

## Development Workflow

### Start Development Server

```bash
cargo tauri dev
```

This launches:
- Vite dev server (hot reload on code changes)
- Tauri window with live reloading
- Rust backend with auto-recompile

### Build for Production

```bash
cargo tauri build
```

Generates:
- `nexus-pro.exe` (portable executable, 8.70 MB)
- `NEXUS IDE_0.1.0_x64-setup.exe` (NSIS installer, 2.45 MB)
- `NEXUS IDE_0.1.0_x64_en-US.msi` (MSI installer, 3.37 MB)

### Debug Build (Faster)

```bash
cargo build --debug
```

Useful for quick testing during development.

## Project Structure Explained

### Backend (Tauri + Rust)

**`src-tauri/src/main.rs`** - Entry point
- Initializes Tauri application
- Sets up IPC handlers
- Manages window lifecycle

**`src-tauri/src/commands.rs`** - IPC Commands
- `open_file()` - Open file dialog
- `save_file()` - Save file dialog
- `get_completions()` - Code completions (placeholder)
- `get_diagnostics()` - Diagnostics (placeholder)

**`src-tauri/src/editor.rs`** - Editor Components
- `EditorBuffer` struct (placeholder)
- File manipulation methods
- Text navigation utilities

### Frontend (Svelte/TypeScript)

**`ui/src/App.svelte`** - Root component
- Main application layout
- Theme management
- Global state

**`ui/src/components/`** - Reusable components
- Editor view
- File explorer
- Status bar
- etc.

**`ui/src/stores/`** - State management
- Editor state (Svelte stores)
- File information
- Settings

## Code Quality

### TypeScript Strict Mode

All TypeScript code runs in strict mode:
```bash
npm run lint
```

### Rust Clippy Lints

Check for Rust issues:
```bash
cargo clippy
```

### Format Code

Format TypeScript:
```bash
npm run format --prefix ui/
```

Format Rust:
```bash
cargo fmt
```

## Testing

### Run Tests

```bash
npm run test --prefix ui/
```

### Debug in Browser DevTools

During `cargo tauri dev`:
1. Right-click in window
2. Select "Inspect" or "Inspect Element"
3. Use browser DevTools

## Troubleshooting

### Build Fails: "Cannot find module"
```bash
npm install --prefix ui/
cargo build
```

### Tauri Window Won't Open
- Check `tauri.conf.json` settings
- Verify WebKit2 is installed

### Port Already in Use
```bash
# Find and kill process using port 5173
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

## Git Workflow

### Create Feature Branch

```bash
git checkout -b feature/my-feature
```

### Commit Changes

```bash
git add .
git commit -m "feat: Add cool feature"
```

### Push to GitHub

```bash
git push origin feature/my-feature
```

### Create Pull Request

Go to https://github.com/Texxer/NEXUS and create PR.

## Performance Tips

1. **Use Svelte Transitions**: Don't overuse `on:click` handlers
2. **Lazy Load Components**: Use dynamic imports
3. **Optimize Bundle**: Code-split large modules
4. **Profile with DevTools**: Check memory/CPU usage
5. **Release Build**: Always test release optimizations

## Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Run tests and linting
5. Commit with clear messages
6. Create pull request

---

See [`03_BUILD_GUIDE.md`](03_BUILD_GUIDE.md) for detailed build instructions
