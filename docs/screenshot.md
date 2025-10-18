# NEXUS IDE Screenshots

## Main Interface

The NEXUS IDE features a modern, dark-themed interface with three main sections:

### Layout

```
┌─────────────────────────────────────────────────────────────────┐
│ ◈ NEXUS IDE                                          📁  💻     │  ← Header
├────────────┬────────────────────────────────────────────────────┤
│            │ App.svelte  main.ts  styles.css          ×  ×  ×  │  ← Tabs
│  Explorer  ├────────────────────────────────────────────────────┤
│            │                                                    │
│  📁 src    │  1  import { writable } from 'svelte/store';     │
│    📄 App  │  2                                                │  ← Editor
│    📘 main │  3  export const currentFile = writable(null);    │
│    🎨 css  │  4  export const openFiles = writable([]);       │
│            │  5                                                │
│            │                                                    │
│            ├────────────────────────────────────────────────────┤
│            │ Terminal                                     🗑️   │  ← Terminal
│            │ $ npm run dev                                     │
│            │ > nexus-ide@0.1.0 dev                            │
│            │ > vite                                            │
│            │                                                    │
└────────────┴────────────────────────────────────────────────────┘
```

## Features Demonstrated

### 1. File Explorer (Left Panel)
- Tree view of project files
- Icons for different file types:
  - 📁 Folders
  - 📄 Generic files
  - 📘 TypeScript files
  - 🎨 CSS files
  - 🦀 Rust files
  - 🐍 Python files
  - And more...

### 2. Editor (Center Panel)
- Syntax highlighting for all languages
- Line numbers
- Multiple file tabs
- Active file indicator
- Close buttons on tabs
- Dark theme optimized for coding

### 3. Terminal (Bottom Panel)
- Integrated command execution
- Command history
- Output display
- Clear terminal button

### 4. Header (Top)
- Application logo and name
- Toggle buttons for panels
- Keyboard shortcut indicators

## Color Scheme

The IDE uses a VSCode-inspired dark theme:
- Background: `#1e1e1e`
- Sidebar: `#252526`
- Active elements: `#007acc` (blue)
- Text: `#cccccc`
- Borders: `#3e3e42`

## Responsive Design

The interface adapts to different window sizes:
- Minimum window size: 800x600
- Panels can be toggled with keyboard shortcuts
- Resizable explorer panel

## Keyboard Shortcuts

Visible in the UI and tooltips:
- **Ctrl+B**: Toggle File Explorer
- **Ctrl+`**: Toggle Terminal
- **Ctrl+S**: Save current file
- **Ctrl+L**: Clear terminal

## Accessibility

- High contrast dark theme
- Keyboard navigation support
- ARIA labels on interactive elements
- Focus indicators on all controls
