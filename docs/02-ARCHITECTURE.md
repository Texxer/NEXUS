# Architecture

NEXUS is built on three layers: frontend UI, desktop bridge, and Rust backend.

## Technology Stack

| Layer | Technology | Size | Startup |
|-------|-----------|------|---------|
| **Frontend** | React 18 + Vite 5 + Tailwind CSS | 20 KB | — |
| **Desktop** | Tauri 2.8 | 4.5 MB | 500ms |
| **Backend** | Rust (planned: Tower-LSP) | — | — |
| **Runtime** | WebView2 | Native | — |

## Why This Stack

- **Tauri**: 30x smaller than Electron, native performance
- **React**: Proven ecosystem, component reusability
- **Vite**: Instant hot reload, optimized production builds
- **Rust**: Memory-safe, perfect for language servers
- **WebView2**: Native on Windows 10+

## Project Structure

```
ui/                 Frontend (React)
├── src/
│   ├── App.tsx                 Main component
│   ├── main.tsx                Entry point
│   ├── App.css                 Global styles
│   └── components/             UI components
│       ├── Editor.tsx
│       ├── FileExplorer.tsx
│       ├── Sidebar.tsx
│       ├── Terminal.tsx
│       └── StatusBar.tsx
├── index.html
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json

core/               Rust backend
├── src/
│   ├── main.rs
│   ├── lib.rs
│   └── *.rs                    Module implementations
└── Cargo.toml

.cargo/config.toml  Build optimization (jobs=8)
```

## UI Layout

The frontend uses a VS Code-inspired layout:

```
┌─────────────────────────────────────────┐
│ Sidebar (50px) │ FileExplorer │ Editor  │
│   (Icons)      │   (250px)    │ (flex)  │
├────────────────────────────────────────-│
│ StatusBar (24px) - Theme & Terminal     │
└─────────────────────────────────────────┘
```

## Data Flow

User Input → React UI → Tauri IPC → Rust Backend → Response

---

**Next**: See [03-BUILD.md](03-BUILD.md) for build commands.
