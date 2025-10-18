# NEXUS IDE

A modern, cross-platform desktop IDE built with Svelte and Tauri.

![NEXUS IDE](https://img.shields.io/badge/version-0.1.0-blue.svg)
![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey.svg)

## Features

✨ **Modern UI** - Clean, responsive interface built with Svelte
- Dark theme optimized for extended coding sessions
- Resizable panels and customizable layout

📁 **File Explorer** - Navigate your project structure
- Tree view with folder expansion/collapse
- File type icons for easy identification
- Directory browsing with native file dialogs

🎨 **Advanced Editor** - Powered by CodeMirror 6
- Syntax highlighting for 100+ languages
- Line numbers and active line highlighting
- Bracket matching and code folding
- Auto-completion support
- Search and replace functionality
- Auto-save with Ctrl+S / Cmd+S

💻 **Integrated Terminal** - Execute commands within the IDE
- Run shell commands directly
- Command history (arrow keys)
- Clear terminal (Ctrl+L)
- Working directory synchronized with opened project

🚀 **High Performance** - Built with Rust and WebAssembly
- Native performance via Tauri
- Small bundle size compared to Electron
- Low memory footprint

💾 **Persistent Window State** - Remembers your workspace
- Window position and size preserved across sessions
- Automatic state restoration on startup

🔧 **Cross-Platform** - Build once, run everywhere
- Windows support
- macOS support  
- Linux support

## Language Support

The editor includes syntax highlighting and language support for:

- **Web**: JavaScript, TypeScript, HTML, CSS, JSON, Markdown
- **Systems**: Rust, C, C++, Go
- **Scripting**: Python, Ruby, Perl, Shell
- **JVM**: Java, Kotlin, Scala
- **Mobile**: Swift, Dart
- **Functional**: Haskell, Elm, Elixir
- **Data**: SQL, YAML, TOML
- **And 80+ more languages** via CodeMirror Language Data

## Prerequisites

Before building NEXUS IDE, ensure you have the following installed:

### All Platforms
- **Node.js** (v18 or later) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Rust** (latest stable) - [Install](https://rustup.rs/)

### Platform-Specific Requirements

#### Windows
- Microsoft Visual Studio C++ Build Tools
- WebView2 (usually pre-installed on Windows 10/11)

#### macOS
- Xcode Command Line Tools: `xcode-select --install`

#### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install -y \
  libwebkit2gtk-4.0-dev \
  build-essential \
  curl \
  wget \
  file \
  libssl-dev \
  libgtk-3-dev \
  libayatana-appindicator3-dev \
  librsvg2-dev
```

#### Linux (Fedora)
```bash
sudo dnf install \
  webkit2gtk4.0-devel \
  openssl-devel \
  curl \
  wget \
  file \
  libappindicator-gtk3-devel \
  librsvg2-devel
```

#### Linux (Arch)
```bash
sudo pacman -S \
  webkit2gtk \
  base-devel \
  curl \
  wget \
  file \
  openssl \
  appmenu-gtk-module \
  gtk3 \
  libappindicator-gtk3 \
  librsvg \
  libvips
```

## Installation

1. **Clone the repository**
```bash
git clone https://github.com/Texxer/NEXUS.git
cd NEXUS
```

2. **Install dependencies**
```bash
npm install
```

3. **Run in development mode**
```bash
npm run tauri:dev
```

4. **Build for production**
```bash
npm run tauri:build
```

The built application will be in `src-tauri/target/release/bundle/`

## Development

### Project Structure

```
NEXUS/
├── src/                    # Frontend source code
│   ├── components/         # Svelte components
│   │   ├── Editor.svelte   # Code editor with syntax highlighting
│   │   ├── FileExplorer.svelte  # File browser
│   │   ├── FileTreeItem.svelte  # Tree item component
│   │   └── Terminal.svelte      # Integrated terminal
│   ├── stores/            # Svelte stores
│   │   └── fileStore.ts   # File state management
│   ├── App.svelte         # Main app component
│   ├── main.ts            # Entry point
│   └── app.css            # Global styles
├── src-tauri/             # Backend Rust code
│   ├── src/
│   │   ├── lib.rs         # Tauri commands and setup
│   │   └── main.rs        # App entry point
│   ├── Cargo.toml         # Rust dependencies
│   └── tauri.conf.json    # Tauri configuration
├── index.html             # HTML entry point
├── vite.config.ts         # Vite configuration
├── svelte.config.js       # Svelte configuration
└── package.json           # Node dependencies
```

### Available Scripts

- `npm run dev` - Start Vite development server
- `npm run build` - Build frontend for production
- `npm run preview` - Preview production build
- `npm run tauri:dev` - Run Tauri in development mode
- `npm run tauri:build` - Build Tauri application

### Keyboard Shortcuts

- **Ctrl+B / Cmd+B** - Toggle file explorer
- **Ctrl+\` / Cmd+\`** - Toggle terminal
- **Ctrl+S / Cmd+S** - Save current file
- **Ctrl+L** - Clear terminal (when terminal is focused)

## Architecture

NEXUS IDE uses a modern architecture:

- **Frontend**: Svelte 5 + TypeScript + Vite
  - Reactive UI with minimal bundle size
  - CodeMirror 6 for editor functionality
  - Component-based architecture

- **Backend**: Rust + Tauri 2
  - Native file system operations
  - Secure IPC between frontend and backend
  - Cross-platform window management

- **Communication**: Tauri Commands
  - `read_file` - Read file contents
  - `write_file` - Write file contents
  - `list_directory` - List directory contents

## Future Enhancements

The IDE is designed with extensibility in mind for future features:

- 🤖 **AI Integration** - Code completion and suggestions
- 🔍 **LSP Support** - Language Server Protocol integration
- 🐛 **Debugging** - Integrated debugger
- 🔌 **Plugin System** - Extensible architecture
- 🎨 **Themes** - Multiple color schemes
- 🔄 **Git Integration** - Version control within IDE
- 📊 **Project Management** - Multi-project workspaces
- 🌐 **Remote Development** - SSH and container support

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Built with [Tauri](https://tauri.app/) - A framework for building desktop applications
- Editor powered by [CodeMirror 6](https://codemirror.net/) - Extensible code editor
- UI built with [Svelte](https://svelte.dev/) - Cybernetically enhanced web apps
- Icons from Unicode emoji set

## Support

For issues, questions, or suggestions, please [open an issue](https://github.com/Texxer/NEXUS/issues) on GitHub.

---

**Built with ❤️ using Svelte, Tauri, and Rust**
