# NEXUS IDE Quick Start Guide

Get up and running with NEXUS IDE in minutes!

## 🚀 Quick Installation

### Prerequisites Check

Before starting, make sure you have:
- Node.js v18+ (`node --version`)
- npm (`npm --version`)
- Rust (`cargo --version`)

Don't have these? See [installation prerequisites](README.md#prerequisites).

### Install and Run

```bash
# 1. Clone the repository
git clone https://github.com/Texxer/NEXUS.git
cd NEXUS

# 2. Install dependencies
npm install

# 3. Run the development version
npm run tauri:dev
```

That's it! The IDE will open in a few seconds.

## 🎯 First Steps

### 1. Open a Project Folder

1. Click the **📂** button in the top-right corner
2. Select a folder containing your code
3. The file tree will appear in the left panel

### 2. Open and Edit a File

1. Click on any file in the explorer
2. The file opens in the editor with syntax highlighting
3. Start editing - changes are tracked automatically
4. Press **Ctrl+S** (or **Cmd+S** on Mac) to save

### 3. Use the Integrated Terminal

1. The terminal is at the bottom of the window
2. Type commands just like in your system terminal
3. Press **Enter** to execute
4. Use **↑** and **↓** to navigate command history

### 4. Customize Your Workspace

- **Toggle File Explorer**: Press **Ctrl+B** (or **Cmd+B**)
- **Toggle Terminal**: Press **Ctrl+`** (or **Cmd+`**)
- **Clear Terminal**: Press **Ctrl+L** when terminal is focused

## 📝 Common Tasks

### Opening Multiple Files

Click on files in the explorer - they'll open as tabs at the top of the editor. Click any tab to switch between files.

### Closing Files

Click the **×** button on any tab to close that file.

### Running Commands

Type in the terminal at the bottom:
```bash
# Install dependencies
npm install

# Run tests
npm test

# Start a server
npm start
```

### Saving Your Work

Files automatically show a **● Modified** indicator when edited. Press **Ctrl+S** to save.

## 🎨 Editor Features

### Syntax Highlighting

The editor automatically detects your file type and applies appropriate syntax highlighting:
- JavaScript/TypeScript
- Rust
- Python
- HTML/CSS
- JSON/Markdown
- And 100+ more languages!

### Code Editing Features

- **Line Numbers**: Always visible on the left
- **Bracket Matching**: Automatically highlights matching brackets
- **Code Folding**: Collapse sections of code
- **Search**: Press **Ctrl+F** to search in the current file
- **Auto-completion**: Start typing to see suggestions

## 🔧 Building for Production

When you're ready to create a distributable version:

```bash
npm run tauri:build
```

The built application will be in `src-tauri/target/release/bundle/`.

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| **Ctrl+B** / **Cmd+B** | Toggle file explorer |
| **Ctrl+`** / **Cmd+`** | Toggle terminal |
| **Ctrl+S** / **Cmd+S** | Save current file |
| **Ctrl+F** | Find in file |
| **Ctrl+L** | Clear terminal |

## 🆘 Troubleshooting

### Build Fails on Linux

Make sure you have all system dependencies:
```bash
sudo apt-get install -y libwebkit2gtk-4.0-dev build-essential curl wget file libssl-dev libgtk-3-dev libayatana-appindicator3-dev librsvg2-dev
```

### Terminal Commands Don't Work

The terminal uses your system shell. Make sure the command is available in your PATH.

### File Won't Save

Check that you have write permissions for the file. The IDE will show an error message if saving fails.

## 📚 Learn More

- [Full Documentation](README.md)
- [Architecture Overview](ARCHITECTURE.md)
- [Contributing Guide](CONTRIBUTING.md)

## 💡 Tips

1. **Work with Git repositories**: The IDE works great with Git - just open your repo folder
2. **Multiple windows**: You can run multiple instances of the IDE for different projects
3. **Terminal tricks**: Use `cd` to change directories, `ls` to list files (or `dir` on Windows)
4. **Efficient editing**: Learn the keyboard shortcuts to speed up your workflow

## 🎉 What's Next?

Now that you're up and running:
- Explore the codebase to understand the structure
- Try editing some files
- Run your project's build commands in the terminal
- Check out the [architecture documentation](ARCHITECTURE.md) to learn how it works

---

**Happy coding with NEXUS IDE!** 🚀
