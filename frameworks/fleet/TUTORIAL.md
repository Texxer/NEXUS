# JetBrains Fleet - Complete Tutorial

## What is Fleet?

Fleet is a lightweight, polyglot code editor from JetBrains. It combines the simplicity of VS Code with the power of full-featured IDEs through Smart Mode, enabling you to work with any folder or file while supporting multiple languages.

**Version**: 1.48 and later  
**Platform**: Windows, macOS, Linux  
**Language**: Java, Kotlin, Python, Go, PHP, C++, C#, JavaScript, TypeScript, Rust, and more

---

## Installation & Setup

### System Requirements

- **RAM**: 4 GB minimum (8 GB recommended)
- **Disk Space**: 1 GB
- **OS**: Windows 10+, macOS 11+, Linux
- **Java**: Bundled (JetBrains Runtime)

### Installation Steps

1. Download [JetBrains Toolbox](https://www.jetbrains.com/toolbox-app/)
2. Install Toolbox App
3. Click "Install" next to JetBrains Fleet
4. For macOS: Choose correct processor (Apple Silicon or Intel)
5. Launch from Toolbox or command line: `fleet <directory>`

---

## Core Philosophy

Fleet operates in two modes:

### 1. **Light Mode** (Text Editor)
- Pure text editing without language services
- Fast, lightweight, perfect for quick edits
- Like VS Code at its core

### 2. **Smart Mode** (Full IDE)
- Activates full language support and intelligent features
- Enabled automatically when working with supported languages
- Press Ctrl+Shift+K and type "Smart Mode" to toggle manually

---

## Interface Overview

```
┌─────────────────────────────────────────────────┐
│  File  Edit  View  Run  Git  Tools  Help        │
├──────────┬──────────────────────────────────────┤
│          │                                      │
│  Files   │  editor.js (active tab)              │
│  Panel   │  [split view possible]               │
│          │  function hello() { ... }             │
│          │                                      │
│ (Alt+1)  │           (Main Editor)              │
├──────────┼──────────────────────────────────────┤
│   Tools (Alt+T)    │ Terminal, Debugger, Git    │
│                    │ etc.                        │
└────────────────────┴──────────────────────────────┘
```

---

## Getting Started

### Opening a Folder

**Method 1: From Workspace Menu**
1. Click workspace icon (top-left)
2. Select "Open"
3. Navigate and select folder

**Method 2: Command Line**
```bash
fleet /path/to/project
```

**Method 3: File Menu**
- File > Open

### Creating Files

```
Ctrl+N (or right-click in Files > New file)
Enter filename with extension: example.py
```

### Basic Editing

- **Split Vertical**: Ctrl+\ or drag tab to side
- **Split Horizontal**: Drag tab to top or bottom
- **Multiple Carets**: Ctrl+Alt+↑/↓ or Alt+Shift+Click
- **Expand Selection**: Alt+Shift+↑/↓
- **Find & Replace**: Ctrl+H

---

## Smart Mode - Language Features

### Enabling Smart Mode

Fleet automatically activates Smart Mode when you open code. Manually enable with:
```
Ctrl+Shift+K > type "Smart Mode"
```

### Supported Languages

#### Python
- Code completion and IntelliSense
- Virtual environment support
- Debugging with breakpoints
- Test runner integration

#### JavaScript/TypeScript
- Full language support
- Framework detection (React, Vue, Angular)
- Linting and formatting
- Node.js debugging

#### Go
- Code navigation
- Format on save
- Package management
- Debugging support

#### Java
- Maven/Gradle support
- Spring Framework integration
- Refactoring tools
- Run configurations

#### Rust
- Cargo integration
- Clippy linting
- Debugging
- Code actions

---

## Essential Tools

### 1. File View (Files Panel)

- Left sidebar shows directory structure
- Click arrow to expand folders
- Right-click for context menu: new file, rename, delete
- Filter by name using search

### 2. Go to Panel

**Access**: Ctrl+K

Unified search for:
- **Files**: Ctrl+K (default)
- **Symbols**: Ctrl+Shift+O
- **Commands**: Type action name

Type to filter results, press Enter to select.

### 3. Version Control (Git)

**Access**: Ctrl+Shift+G or View > Tools > Git

**Commit Changes:**
1. Open Git tool
2. View changed files
3. Select files to commit
4. Enter commit message
5. Click "Commit"

**Push Changes:**
1. Ctrl+Shift+G, Ctrl+Shift+P (or Git > Push)
2. Login to GitHub/GitLab/Bitbucket if prompted
3. GitHub: Use personal access token
4. GitLab/Bitbucket: Use credentials

**View History:**
- Click "History" tab in Git tool
- See all commits
- Click commit to view diff

### 4. Terminal

**Access**: Ctrl+T or View > Tools > Terminal

- Integrated shell (PowerShell on Windows, Bash on macOS/Linux)
- Run build commands
- Execute scripts
- Manage version control from command line

### 5. Find & Navigate

| Action | Shortcut |
|--------|----------|
| Find in file | Ctrl+F |
| Find & Replace | Ctrl+H |
| Find in all files | Ctrl+Shift+F |
| Go to Line | Ctrl+G |
| Go to File | Ctrl+K |
| Search symbols | Ctrl+Shift+O |

---

## Workflow Examples

### Python Development

```
1. Create project folder: mkdir my_project
2. Open in Fleet: fleet my_project
3. Create main.py: Ctrl+N > enter "main.py"
4. Write code with Smart Mode active:
   - Type print( and see autocomplete suggestions
5. Run: 
   - Open Terminal (Ctrl+T)
   - Execute: python main.py
6. Debug:
   - Set breakpoint (click line number)
   - Run > Debug (or Shift+F9)
```

### JavaScript Development

```
1. Initialize project: npm init
2. Open in Fleet: fleet .
3. Create index.js: Ctrl+N > "index.js"
4. Write code with TypeScript/React support
5. Smart Mode provides:
   - IntelliSense for Node/browser APIs
   - Framework detection (if using React/Vue)
6. Terminal for npm commands
```

### Git Workflow

```
1. Make code changes
2. Open Git tool (Ctrl+Shift+G)
3. Review changed files
4. Select files to commit
5. Write commit message
6. Click "Commit"
7. Push changes (Ctrl+Shift+G, P)
8. View history to track changes
```

---

## Customization

### Color Themes

**Access**: View > Color Theme or Ctrl+Shift+K, type "Theme"

Built-in themes:
- Light (default)
- Dark
- High Contrast
- Custom

### Font Configuration

```
Settings > Font:
- Size: Default or custom pixels
- Family: Monospace font selection
- Ligatures: Enable/disable
```

### Keybindings

```
Settings > Keybindings > Review and edit key bindings
- Customize any action
- Import VS Code keybindings
```

### Settings

```
Ctrl+Shift+K > type "Settings"
- Color Theme
- Font size
- Line height
- Tab size (spaces/tabs)
- Auto-save
- Various editor options
```

---

## Advanced Features

### Split View Shortcuts

```
Ctrl+\           Split Right
Alt+Shift+1      Focus First Split
Alt+Shift+2      Focus Last Split
Alt+Shift+]      Focus Next Split
Alt+Shift+[      Focus Previous Split
```

### Language-Specific Workflows

#### Python with Virtual Environments
```
1. Ctrl+Shift+K > "Select Interpreter"
2. Choose venv or conda environment
3. Terminal uses selected environment
```

#### Node.js Projects
```
1. npm install packages
2. Package.json scripts show in Run menu
3. Click to execute: npm run dev
```

#### Database Queries
```
Database tool available in Smart Mode
- Write SQL queries
- Execute against connected database
- View results
```

---

## Tips & Tricks

1. **Command Palette**: Ctrl+Shift+K for every action
2. **Quick Settings**: Press Ctrl+, to open Settings
3. **Go to Definition**: Click + Ctrl for navigation (in Smart Mode)
4. **Minimap**: Toggle with View menu
5. **Word Wrap**: Ctrl+Shift+K, type "Word Wrap"
6. **Zoom**: Ctrl++ to zoom in, Ctrl+- to zoom out

---

## Comparison: Light vs Smart Mode

| Feature | Light Mode | Smart Mode |
|---------|-----------|-----------|
| Code Completion | Basic | Full IntelliSense |
| Go to Definition | No | Yes |
| Refactoring | No | Yes |
| Debugging | No | Yes |
| Linting | No | Yes |
| Test Runner | No | Yes |
| Performance | ⚡ Very Fast | Standard |
| Memory | Low | Moderate |
| Use Case | Quick edits | Full development |

---

## Common Tasks

### Create a New Project
```
fleet /path/to/new/project
Ctrl+N > create files
```

### Import Existing Project
```
fleet /path/to/existing/project
Or use File > Open
```

### Debug Your Application
```
1. Set breakpoints (click line number)
2. Run > Debug Configuration
3. Configure debug parameters
4. Run > Debug (or Shift+F9)
5. Use debugger controls to step through
```

### Run Terminal Commands
```
Ctrl+T (open terminal)
Execute any command from project directory
```

---

## Resources

- **Official Docs**: [jetbrains.com/help/fleet](https://www.jetbrains.com/help/fleet/)
- **Getting Started**: [Fleet Getting Started](https://www.jetbrains.com/help/fleet/getting-started.html)
- **Language Guides**: Fleet docs include guides for Python, Java, Kotlin, Go, Rust, etc.
- **JetBrains Blog**: Latest Fleet features and updates

