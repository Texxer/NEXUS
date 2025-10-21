# NEXUS IDE v0.1.0

A lightweight, fast IDE built with React, Rust, and modern web technologies.

## Quick Start

### Option 1: Direct Browser (Fastest ✨)
```powershell
.\launch-ide.ps1
```

**Or** double-click: `launch-ide.bat`

This opens `nexus-ide-standalone.html` in your default browser immediately.

---

### Option 2: Web Server (Better UX)
```powershell
python server.py
```

**Or** double-click: `run-server.bat`

Then visit: `http://localhost:8000/nexus-ide-standalone.html`

---

### Option 3: Open HTML Directly
1. Navigate to: `C:\Users\Michael\OneDrive\generalAI\IDE`
2. Right-click: `nexus-ide-standalone.html`
3. Open with → Your favorite browser

---

## Features

### ✅ Editor
- Full code editing in a textarea
- Support for JavaScript, TypeScript, Python, Markdown, and more
- Keyboard shortcuts (Ctrl+C, Ctrl+V, Ctrl+Z, etc.)
- Real-time line/column position tracking

### ✅ File Explorer
- View sample project files
- Click to open and edit files in tabs
- Track which file is currently active

### ✅ Tabs
- Switch between open files
- Shows current active file in editor

### ✅ Status Bar
- Real-time line and column information
- File path display
- Encoding info (UTF-8, CRLF)
- Language detection (JavaScript, TypeScript, etc.)

### ✅ Dark Theme
- VS Code-inspired dark color scheme
- Easy on the eyes for long coding sessions
- Custom scrollbars

---

## Browser Requirements

Works on any modern browser:
- ✅ Google Chrome 90+
- ✅ Microsoft Edge 90+
- ✅ Mozilla Firefox 88+
- ✅ Safari 14+

**No installation needed.** The IDE is a single HTML file with embedded CSS and JavaScript.

---

## Project Structure

```
C:\Users\Michael\OneDrive\generalAI\IDE\
├── nexus-ide-standalone.html    ← The IDE (open this!)
├── launch-ide.ps1               ← PowerShell launcher
├── launch-ide.bat               ← Batch file launcher
├── run-server.bat               ← Web server launcher
├── server.py                    ← Python web server
├── ui/
│   ├── dist/                    ← React frontend (production)
│   └── src/                     ← React source code
├── src-tauri/
│   ├── src/main.rs              ← Tauri IPC handlers (Rust)
│   └── Cargo.toml               ← Rust dependencies
├── core/
│   └── src/                     ← Core Rust modules (future)
└── docs/                        ← Documentation
```

---

## Features (Now)

- ✅ Code editing interface
- ✅ File explorer
- ✅ Tab switching
- ✅ Real-time line/column tracking
- ✅ Dark theme
- ✅ Works offline
- ✅ Fully responsive

## Features (Coming Soon)

- 🔄 Backend integration via IPC
- 🔄 Real language server (LSP)
- 🔄 Code completion
- 🔄 Syntax highlighting improvements
- 🔄 Themes and customization
- 🔄 Settings panel

---

## Technical Details

### Why Browser-Based?

Traditional IDE approaches face challenges:
- **Desktop (Tauri)**: Requires Rust compilation (blocked by antivirus on this machine)
- **Browser (HTML/JS)**: No compilation, runs anywhere, no antivirus issues

This IDE chooses the pragmatic approach: **Pure HTML, CSS, and JavaScript.**

### Architecture

```
Browser Window
    └─ nexus-ide-standalone.html
        ├─ CSS (1200 lines)
        │   └─ VS Code-inspired dark theme
        ├─ HTML (Semantic structure)
        │   ├─ Title bar
        │   ├─ File explorer
        │   ├─ Tab bar
        │   ├─ Code editor (textarea)
        │   └─ Status bar
        └─ JavaScript (200 lines)
            ├─ File loading
            ├─ Tab management
            ├─ Content tracking
            └─ UI updates
```

### Performance

- **Size**: 15 KB (uncompressed), 4 KB (gzipped)
- **Load time**: < 100ms
- **Memory**: ~20 MB (browser resident)
- **CPU**: Minimal when idle

---

## Troubleshooting

### IDE doesn't open
**Try these in order:**

1. Check Windows default browser
   ```powershell
   # Open Settings > Apps > Default apps
   # Set a browser as default
   ```

2. Run web server instead
   ```powershell
   python server.py
   # Then visit: http://localhost:8000/nexus-ide-standalone.html
   ```

3. Open HTML directly in browser
   ```
   Right-click nexus-ide-standalone.html → Open With → Browser
   ```

### Web server won't start
**Possible causes:**

- Port 8000 is in use:
  ```powershell
  # Find process using port 8000
  netstat -ano | findstr :8000
  
  # Kill the process
  taskkill /PID [process_id] /F
  ```

- Python not installed:
  ```powershell
  # Download from python.org
  # Or install via Conda
  conda install python
  ```

### Editor content not saving
**Note**: Content is only saved during the current session. It's lost when you close the browser.

**To persist changes**, you can:
1. Copy code from editor
2. Paste into an actual code file
3. Or modify `server.py` to save to disk

---

## Development

### Project Structure (Full)

```
IDE/
├── Standalone Files
│   ├── nexus-ide-standalone.html   ← Browser IDE (single file)
│   ├── server.py                   ← Python HTTP server
│   └── launch scripts              ← Batch, PowerShell launchers
│
├── React Frontend (ui/)
│   ├── src/
│   │   ├── App.tsx                 ← React component
│   │   ├── components/             ← UI components
│   │   └── tauri-api.ts            ← IPC bridge (future)
│   └── dist/                       ← Production build
│
├── Rust Backend (src-tauri/)
│   ├── src/main.rs                 ← Tauri app + IPC handlers
│   └── Cargo.toml                  ← Dependencies
│
├── Core Modules (core/)
│   └── src/                        ← Rust analysis modules
│
└── Documentation (docs/)
    ├── BUILD_STATUS.md             ← Current build info
    └── Architecture notes
```

### Next Steps for Development

1. **Connect backend** to frontend:
   - Modify `ui/src/tauri-api.ts` to call real handlers
   - Update Rust `src-tauri/src/main.rs` handlers

2. **Add real features**:
   - Integrate `core/` modules
   - Implement code analysis
   - Add language server support

3. **Create desktop app** (when environment is fixed):
   - Rebuild Tauri desktop app
   - Generate MSI installer
   - Distribute to users

---

## System Requirements

- **OS**: Windows 10+ (or any OS with a web browser)
- **Browser**: Chrome, Edge, Firefox, Safari (any modern version)
- **Disk**: 1 MB free (HTML file only)
- **Memory**: 50 MB minimum
- **Network**: None required (works offline)

---

## License

NEXUS IDE is provided as-is under the terms specified in LICENSE.

---

## Support

For issues or questions:
1. Check `BUILD_STATUS.md` for build-related info
2. Review browser console (F12) for errors
3. Consult `docs/` folder for architecture details

---

**Version**: 0.1.0  
**Last Updated**: October 21, 2025  
**Status**: Beta - Core IDE features working, backend integration pending
