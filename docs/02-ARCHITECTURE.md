# Architecture

NEXUS is built on three layers: frontend UI, desktop bridge, and Rust backend.

## Technology Stack

| Layer | Technology | Size | Startup |
|-------|-----------|------|---------|
| **Frontend** | Svelte 5 + Vite 7 + Tailwind | 16 KB | — |
| **Desktop** | Tauri 2.8 | 4.5 MB | 500ms |
| **Backend** | Rust (planned: Tower-LSP) | — | — |
| **Runtime** | WebView2 | Native | — |

## Why This Stack

- **Tauri**: 30x smaller than Electron, native performance
- **Svelte**: Fine-grained reactivity, no virtual DOM overhead
- **Rust**: Memory-safe, perfect for language servers
- **WebView2**: Native on Windows 10+

## Project Structure

```
ui/                 Frontend (Svelte)
├── src/
│   ├── App.svelte              Main component
│   ├── main.ts                 Entry point
│   ├── hooks/useRPC.ts         IPC communication
│   └── components/             UI components
├── index.html
├── vite.config.ts
└── tailwind.config.js

core/               Rust backend
├── src/
└── Cargo.toml

src-tauri/          Tauri configuration
├── tauri.conf.json Configuration (window, CSP, permissions)
└── src/main.rs     Rust entry point

.cargo/config.toml  Build optimization (jobs=8)
```

## Data Flow

User Input → Svelte UI → RPC Call → Tauri Bridge → Rust Backend → Response

---

**Next**: See [03-BUILD.md](03-BUILD.md) for build commands.
