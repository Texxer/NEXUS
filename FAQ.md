# Frequently Asked Questions (FAQ)

## General Questions

### What is NEXUS IDE?

NEXUS IDE is a modern, cross-platform desktop code editor built with Svelte and Tauri. It provides a lightweight alternative to heavier IDEs while offering essential features like syntax highlighting, file browsing, and an integrated terminal.

### Why choose NEXUS IDE over other editors?

- **Lightweight**: Smaller bundle size than Electron-based editors
- **Fast**: Built with Rust backend for native performance
- **Modern**: Uses latest web technologies (Svelte 5, TypeScript)
- **Cross-platform**: Works on Windows, macOS, and Linux
- **Extensible**: Designed with future plugin support in mind

### Is NEXUS IDE free?

Yes, NEXUS IDE is completely free and open source under the MIT License.

## Installation & Setup

### What are the system requirements?

- **OS**: Windows 10+, macOS 10.15+, or Linux (recent distributions)
- **RAM**: 512MB minimum (1GB recommended)
- **Disk**: 100MB for application, plus space for projects
- **Development**: Node.js 18+, Rust (for building from source)

### How do I install NEXUS IDE?

See the [Quick Start Guide](QUICKSTART.md) for detailed installation instructions.

### Can I use NEXUS IDE without installing Node.js and Rust?

For **using** the pre-built binaries: No Node.js or Rust required.
For **building from source**: Yes, you need both Node.js and Rust.

### The build fails on Linux. What should I do?

Linux requires system dependencies. Install them with:
```bash
# Ubuntu/Debian
sudo apt-get install -y libwebkit2gtk-4.0-dev build-essential curl wget file libssl-dev libgtk-3-dev libayatana-appindicator3-dev librsvg2-dev

# Or run our setup script
./setup.sh
```

## Features

### What languages does NEXUS IDE support?

NEXUS IDE supports syntax highlighting for 100+ languages including:
- JavaScript, TypeScript, Python, Rust, Go, Java, C, C++
- HTML, CSS, JSON, Markdown, YAML
- And many more via CodeMirror Language Data

### Does NEXUS IDE have debugging capabilities?

Not yet. Debugging support is planned for a future release. Currently, you can use the integrated terminal to run debuggers.

### Can I use Git with NEXUS IDE?

While NEXUS IDE doesn't have built-in Git integration yet, you can use Git commands in the integrated terminal. Git GUI integration is planned for future releases.

### Does NEXUS IDE support Language Server Protocol (LSP)?

Not yet. LSP support is a high-priority feature planned for an upcoming release. This will enable features like IntelliSense, go-to-definition, and code refactoring.

### Can I customize the theme?

The current version uses a dark theme inspired by VS Code. Theme customization is planned for future releases.

### How do I open multiple files?

Click on files in the file explorer - they will open as tabs in the editor. You can have multiple files open simultaneously.

## Usage

### How do I save a file?

Press **Ctrl+S** (or **Cmd+S** on Mac) to save the current file. Files with unsaved changes show a "Modified" indicator.

### How do I search within a file?

Press **Ctrl+F** to open the search functionality in the editor.

### Can I split the editor view?

Split view is not available in the current version but is planned for a future release.

### How do I resize panels?

The file explorer width is adjustable (feature in development). The terminal height is currently fixed but will be resizable in a future update.

### Terminal commands don't work. Why?

The terminal uses your system's default shell. Make sure:
1. The command is installed and in your PATH
2. You have the necessary permissions
3. You're in the correct directory

### Can I use the terminal for interactive commands?

Yes, the terminal supports command history and interactive input. Use arrow keys to navigate command history.

## Development & Contributing

### How can I contribute?

See our [Contributing Guide](CONTRIBUTING.md) for detailed information on how to contribute.

### Where can I report bugs?

Report bugs by creating an issue on our [GitHub repository](https://github.com/Texxer/NEXUS/issues).

### Can I request features?

Yes! Feature requests are welcome. Create an issue on GitHub with the "enhancement" label.

### How is NEXUS IDE built?

NEXUS IDE uses:
- **Frontend**: Svelte 5 + TypeScript + Vite
- **Backend**: Rust + Tauri 2
- **Editor**: CodeMirror 6

See [ARCHITECTURE.md](ARCHITECTURE.md) for detailed technical information.

### Why Svelte instead of React or Vue?

Svelte offers:
- Smaller bundle size (no runtime)
- Better performance (compiled to vanilla JS)
- Simpler syntax
- Reactive by default

### Why Tauri instead of Electron?

Tauri provides:
- Smaller bundle size (~10MB vs 100MB+)
- Lower memory footprint
- Better security model
- Native performance via Rust

## Troubleshooting

### The application won't start

Try:
1. Check if you have the required system dependencies
2. Verify WebView2 is installed (Windows)
3. Check the console for error messages
4. Reinstall the application

### Files aren't showing in the explorer

Make sure:
1. You've selected a folder (click the 📂 button)
2. You have read permissions for the directory
3. The directory isn't empty

### Syntax highlighting isn't working

Syntax highlighting is automatic based on file extension. If it's not working:
1. Check if the file has a recognized extension
2. Try closing and reopening the file
3. Report the issue if the problem persists

### Performance is slow

Try:
1. Close unused file tabs
2. Avoid opening very large files (>10MB)
3. Clear the terminal output
4. Restart the application

### How do I reset settings?

Currently, only window state is persisted. To reset:
1. Close the application
2. Delete the window state file (location varies by OS)
3. Restart the application

## Updates

### How do I update NEXUS IDE?

Currently, updates require manual download from the GitHub releases page. Automatic updates are planned for future releases.

### How often is NEXUS IDE updated?

We aim for regular releases with bug fixes and new features. Check the [CHANGELOG](CHANGELOG.md) for release history.

### Will my settings be preserved during updates?

Yes, user settings and window state are preserved across updates.

## Privacy & Security

### Does NEXUS IDE collect any data?

No. NEXUS IDE does not collect, transmit, or store any user data. All operations are local to your machine.

### Is it safe to use NEXUS IDE with sensitive code?

Yes. NEXUS IDE runs entirely on your local machine with no network connections for code handling. See our [Security Policy](SECURITY.md) for details.

### Can I audit the source code?

Yes! NEXUS IDE is fully open source. You can review all code on our [GitHub repository](https://github.com/Texxer/NEXUS).

## Platform-Specific Questions

### Does NEXUS IDE work on Apple Silicon Macs?

Yes, NEXUS IDE supports both Intel and Apple Silicon Macs.

### Can I run NEXUS IDE on Linux ARM?

ARM builds would need to be created separately. Open an issue if you need ARM support.

### Does NEXUS IDE support Windows 7/8?

No, Windows 10 or later is required due to WebView2 requirements.

## Still Have Questions?

If your question isn't answered here:
1. Check the [README](README.md) and [Documentation](ARCHITECTURE.md)
2. Search existing [GitHub Issues](https://github.com/Texxer/NEXUS/issues)
3. Create a new issue with the "question" label
4. Join our community discussions (coming soon)
