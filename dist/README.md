# Zenith IDE

A modern, lightning-fast, intelligent open-source IDE combining the best of VS Code's extensibility, JetBrains' intelligence, Vim's efficiency, and Neovim's minimalism.

## Vision

Zenith is built on the principle that developers deserve an IDE that is:
- **⚡ Blazingly Fast** - Rust core engine for instant responsiveness
- **🧠 Intelligent** - Semantic code analysis comparable to JetBrains
- **✨ Beautiful** - Modern, minimal UI inspired by PhpStorm
- **🔌 Extensible** - VS Code-like plugin ecosystem
- **⌨️ Efficient** - Vim-inspired keyboard workflows and modal editing (optional)

## Quick Start

### Prerequisites
- Node.js 16+ 
- Rust 1.70+
- npm or yarn

### Development Setup

```bash
# Clone the repository
git clone https://github.com/zenith-ide/zenith.git
cd zenith

# Install dependencies
npm install

# Build the core (Rust)
cd core && cargo build --release && cd ..

# Start development server
npm run dev
```

### Building from Source

```bash
# Full production build
npm run build

# Create installers
npm run dist
```

## Architecture

### Core Components

```
zenith/
├── core/                    # Rust backend (LSP, analysis, file ops)
│   ├── src/
│   │   ├── main.rs         # Entry point
│   │   ├── editor/         # Text editor engine
│   │   ├── analyzer/       # Code analysis
│   │   ├── lsp/            # Language server protocol
│   │   ├── plugins/        # Plugin runtime
│   │   └── vfs/            # Virtual file system
│   ├── Cargo.toml
│   └── benches/            # Performance benchmarks
│
├── ui/                      # React/TypeScript frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Main app pages
│   │   ├── hooks/          # Custom React hooks
│   │   ├── stores/         # State management (Zustand)
│   │   ├── styles/         # Global styles
│   │   ├── utils/          # Utilities
│   │   └── App.tsx         # Root component
│   ├── package.json
│   ├── tsconfig.json
│   └── Makefile
│
├── plugins/                 # Built-in plugins
│   ├── git-integration/    # Git operations
│   ├── language-support/   # Language tools
│   ├── themes/             # Color schemes
│   ├── snippets/           # Code snippets
│   └── marketplace/        # Plugin management
│
├── docs/                    # Documentation
│   ├── architecture.md
│   ├── plugin-api.md
│   ├── keybindings.md
│   └── contributing.md
│
├── scripts/                 # Build and release scripts
├── tests/                   # Integration tests
├── .github/                 # GitHub workflows
└── Cargo.toml              # Workspace manifest
```

## Features

### Editor
- [x] Multi-cursor editing
- [x] Syntax highlighting (Tree-sitter)
- [x] Bracket matching and auto-pairing
- [ ] Code folding
- [ ] Minimap

### Navigation
- [x] File explorer with search
- [x] Command palette (Cmd+Shift+P)
- [x] Go to file (Cmd+P)
- [ ] Go to definition (Cmd+Click)
- [ ] Find all references

### Intelligence
- [ ] Semantic code completion
- [ ] Smart refactoring
- [ ] Inline error checking
- [ ] Code inspections
- [ ] Type hints and annotations

### Integration
- [x] Integrated terminal
- [x] Git status and operations
- [ ] Debug adapter protocol
- [ ] LSP support (TypeScript, Rust, Python, etc.)
- [ ] Task runner (npm, make, etc.)

### Customization
- [x] Theme system (dark, light, custom)
- [x] Configurable keybindings
- [x] Settings editor
- [ ] Custom color schemes
- [ ] Snippets system

### Plugins
- [ ] Plugin marketplace
- [x] JavaScript/TypeScript plugins
- [ ] WebAssembly plugins
- [ ] Native plugin support (Rust)
- [ ] Hot reload during development

## Roadmap

### Phase 1: MVP (v0.1)
- Basic text editor
- File explorer
- Syntax highlighting
- Terminal integration
- Basic theme support
- Configuration system

### Phase 2: Intelligence (v0.2)
- Semantic analysis engine
- Code completion
- Error checking
- Go to definition/references
- Refactoring suggestions

### Phase 3: Ecosystem (v0.3)
- Plugin system
- Extension marketplace
- Community plugins
- Language packs

### Phase 4: Production (v1.0)
- Debugger integration
- Advanced VCS features
- Performance optimization
- Stability and hardening
- Official language support

## Technology Stack

### Core
- **Language**: Rust 1.70+
- **Editor Engine**: Custom (inspired by Xi, VS Code)
- **Parsing**: tree-sitter
- **LSP**: LSP protocol implementation
- **Async**: Tokio runtime

### UI
- **Framework**: React 18+
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS Modules
- **State**: Zustand
- **Bundler**: Vite
- **Desktop**: Tauri (lightweight Electron alternative)

### Build & Deployment
- **Package Manager**: Cargo (Rust), npm (Node)
- **CI/CD**: GitHub Actions
- **Platforms**: Windows, macOS, Linux
- **Distribution**: Installers, portable, package managers

## Configuration

Zenith uses a JSON-based configuration system (`.zenith/config.json`):

```json
{
  "editor": {
    "fontSize": 14,
    "fontFamily": "Fira Code",
    "tabSize": 2,
    "insertSpaces": true,
    "wordWrap": "on"
  },
  "theme": "zenith-dark",
  "keybindings": "vim",
  "plugins": {
    "enabled": ["git", "eslint", "prettier"]
  }
}
```

## Keybindings

### Editor (VS Code defaults + Vim mode optional)

| Action | Binding |
|--------|---------|
| Open file | `Cmd+P` |
| Command palette | `Cmd+Shift+P` |
| Find | `Cmd+F` |
| Replace | `Cmd+H` |
| Go to line | `Cmd+G` |
| Toggle sidebar | `Cmd+B` |
| Toggle terminal | `` Ctrl+` `` |
| Add cursor above | `Cmd+Alt+↑` |
| Add cursor below | `Cmd+Alt+↓` |
| Multi-cursor select | `Cmd+D` |

### Vim Mode (Optional)

When Vim mode is enabled, standard Vim keybindings apply:
- `h/j/k/l` - Navigation
- `i/a/I/A` - Insert mode
- `dd/yy/p` - Delete/Copy/Paste
- `gg/G` - Go to start/end
- `:w/:q/:wq` - Commands

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](docs/contributing.md) for details on:
- Code style guidelines
- Pull request process
- Development setup
- Testing requirements

## Community

- **GitHub Issues**: Bug reports and feature requests
- **Discussions**: General questions and ideas
- **Discord**: Real-time community chat
- **Twitter**: [@ZenithIDE](https://twitter.com/zenithide)

## License

Zenith is licensed under the MIT License - see [LICENSE](LICENSE) for details.

## Acknowledgments

This project draws inspiration from:
- **VS Code** - Extension system and UI paradigms
- **JetBrains IDEs** - Code intelligence and developer productivity
- **Vim/Neovim** - Modal editing and efficiency
- **Eclipse** - Plugin architecture
- **Sublime Text** - Minimalism and performance
- **Zed** - Modern development and Rust foundation

## FAQ

### Why Rust for the core?
Rust provides the performance, memory safety, and concurrency we need for an IDE that never stutters or crashes.

### How does it compare to VS Code?
Zenith aims to be VS Code's performance plus JetBrains' intelligence, with a more minimal UI and faster startup time.

### Can I use my VS Code extensions?
Not directly, but the plugin API is similar. Migration paths and adapters will be provided.

### When will it be ready?
MVP targeting Q2 2025, with continuous improvements thereafter.

### How can I contribute?
Start by reading our [Contributing Guide](docs/contributing.md), then pick an issue and submit a PR!

---

**Made with ❤️ by the Zenith community**
