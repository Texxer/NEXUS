# 🏗️ Frameworks Directory

Complete collection of open-source IDE and editor frameworks for analysis and reference in building Zenith IDE.

---

## 📂 Directory Structure

```
frameworks/
├── README.md                          [This file]
├── FRAMEWORKS_INDEX.md                [Navigation & comparison]
│
├── microsoft-vscode/                  [VS Code]
│   └── repo/                          [VS Code repository]
│       ├── src/                       [TypeScript source]
│       ├── extensions/                [Built-in extensions]
│       └── ...
│
├── eclipse-pdt/                       [PHP Development Tools]
│   └── repo/                          [PDT repository]
│       ├── plugins/                   [Eclipse plugins]
│       └── ...
│
├── vim-vim/                           [Vim]
│   └── repo/                          [Vim repository]
│       ├── src/                       [C source code]
│       └── ...
│
├── neovim-neovim/                     [Neovim]
│   └── repo/                          [Neovim repository]
│       ├── src/                       [C/Lua source]
│       └── ...
│
├── geany-geany/                       [Geany]
│   └── repo/                          [Geany repository]
│       ├── src/                       [C source code]
│       └── ...
│
├── kde-kate/                          [Kate Editor]
│   └── repo/                          [Kate repository]
│       ├── src/                       [C++ source code]
│       └── ...
│
├── eranif-codelite/                   [CodeLite IDE]
│   └── repo/                          [CodeLite repository]
│       ├── CodeLite/                  [Main IDE code]
│       └── ...
│
├── intellij-community/                [IntelliJ IDEA Community]
│   ├── platform/                      [Core platform]
│   ├── plugins/                       [Language plugins]
│   └── ...
│
└── ollama/                            [Ollama � AI Model Server]
    ├── api/                           [REST API]
    ├── llm/                           [Language model support]
    ├── OLLAMA_CLOUD_DOCS.md           [Cloud API documentation]
    ├── OLLAMA_INTEGRATION_GUIDE.md    [Integration roadmap]
    └── ...

```

---

## 📖 What Each Framework Contains

### VS Code (`microsoft-vscode/repo/`)
� Language: TypeScript
� Type: Modern web-based code editor
� Key Files: `src/`, `extensions/`
� Purpose: Reference for extensibility, UI/UX patterns, performance
� Size: ~2GB

### Eclipse PDT (`eclipse-pdt/repo/`)
� Language: Java
� Type: PHP IDE built on Eclipse platform
� Key Files: `plugins/`
� Purpose: Reference for plugin architecture, language-specific features
� Size: ~500MB

### Vim (`vim-vim/repo/`)
� Language: C/VimScript
� Type: Classic modal text editor
� Key Files: `src/`
� Purpose: Reference for efficiency, modal editing, performance
� Size: ~200MB

### Neovim (`neovim-neovim/repo/`)
� Language: C/Lua
� Type: Modern Vim fork
� Key Files: `src/`
� Purpose: Reference for async architecture, extensibility
� Size: ~200MB

### Geany (`geany-geany/repo/`)
� Language: C/GTK
� Type: Lightweight text editor/IDE
� Key Files: `src/`
� Purpose: Reference for lightweight design, minimalism
� Size: ~300MB

### Kate (`kde-kate/repo/`)
� Language: C++/Qt
� Type: Advanced text editor
� Key Files: `src/`
� Purpose: Reference for Qt integration, text editor features
� Size: ~400MB

### CodeLite (`eranif-codelite/repo/`)
� Language: C++/wxWidgets
� Type: Lightweight C/C++ IDE
� Key Files: `CodeLite/`
� Purpose: Reference for lightweight IDE design
� Size: ~300MB

### IntelliJ IDEA Community (`intellij-community/`)
� Language: Kotlin/Java
� Type: Full-featured IDE
� Key Files: `platform/`, `plugins/`
� Purpose: Reference for semantic analysis, refactoring, inspection system
� Size: ~10GB

### Ollama (`ollama/`)
� Language: Go
� Type: AI Model Serving Platform
� Key Files: `api/`, `llm/`
� Documentation:
  � `OLLAMA_CLOUD_DOCS.md` - Cloud API reference
  � `OLLAMA_INTEGRATION_GUIDE.md` - Integration roadmap
� Purpose: AI-powered features for Zenith IDE
� Size: ~50MB

---

## 🎯 Using These Frameworks

### For Code Analysis
```bash
cd frameworks/microsoft-vscode/repo
grep -r "completion" src/ | head -20
```

### For Architecture Study
```bash
cd frameworks/eclipse-pdt/repo
find plugins/ -name "*.xml" | head -10  # View plugin definitions
```

### For Performance Tips
```bash
cd frameworks/vim-vim/repo
less src/main.c  # Study lightweight design
```

### For Understanding Plugins
```bash
cd frameworks/neovim-neovim/repo
ls -la runtime/plugin/  # See plugin system
```

### For AI Integration
```bash
cd frameworks/ollama
cat OLLAMA_INTEGRATION_GUIDE.md
```

---

## 📊 Framework Comparison

| Framework | Type | Language | Best For | Size |
|-----------|------|----------|----------|------|
| VS Code | Editor | TypeScript | Extensibility, UI | 2GB |
| IntelliJ | IDE | Kotlin/Java | Intelligence, Refactoring | 10GB |
| Vim | Editor | C | Efficiency, Modal | 200MB |
| Neovim | Editor | C/Lua | Async, Modern | 200MB |
| Eclipse PDT | IDE | Java | Plugin System | 500MB |
| Geany | Editor | C | Lightweight | 300MB |
| Kate | Editor | C++ | Qt Integration | 400MB |
| CodeLite | IDE | C++ | Lightweight IDE | 300MB |
| Ollama | Server | Go | AI Features | 50MB |

---

## 🔧 Getting Started with Frameworks

### Clone Updates
To update any framework with latest changes:
```bash
cd frameworks/microsoft-vscode/repo
git pull origin master
```

### View Commit History
```bash
cd frameworks/vim-vim/repo
git log --oneline | head -20
```

### Analyze Code Structure
```bash
cd frameworks/neovim-neovim/repo
find src/ -name "*.c" | wc -l  # Count C files
```

### Study Documentation
```bash
cd frameworks/ollama
cat README.md
cat OLLAMA_CLOUD_DOCS.md
cat OLLAMA_INTEGRATION_GUIDE.md
```

---

## 📚 Reference Materials

### Ollama Documentation
� Cloud API: `ollama/OLLAMA_CLOUD_DOCS.md`
� Integration Guide: `ollama/OLLAMA_INTEGRATION_GUIDE.md`
� Official Docs: https://docs.ollama.com
� Models: https://ollama.com/models

### IDE Frameworks
� VS Code: https://github.com/microsoft/vscode
� IntelliJ: https://github.com/JetBrains/intellij-community
� Vim: https://github.com/vim/vim
� Neovim: https://github.com/neovim/neovim
� Geany: https://github.com/geany/geany
� Kate: https://github.com/KDE/kate
� CodeLite: https://github.com/eranif/codelite
� Eclipse PDT: https://github.com/eclipse/pdt

---

## 🎯 Usage Tips

1. Search for Patterns: Use `grep` to find architectural patterns
2. Compare Approaches: Look at how different frameworks solve the same problem
3. Study Git History: Understand evolution of projects with `git log`
4. Read PRs: Check merged PRs for best practices
5. Extract Code: Copy proven patterns into Zenith IDE

---

## 📝 Navigation Guide

For a complete navigation guide, see:
� `FRAMEWORKS_INDEX.md` - Detailed framework index and comparison

For Zenith IDE project:
� Go back to `../` root directory
� See `ZENITH_OLLAMA_SUMMARY.md` for project overview
� See `IDE/` for main IDE implementation

---

## ✨ Summary

This directory contains 9 carefully selected frameworks representing:
� ✅ Modern web-based editors (VS Code)
� ✅ Powerful IDEs with intelligence (IntelliJ)
� ✅ Efficient modal editors (Vim, Neovim)
� ✅ Lightweight editors (Geany, Kate, CodeLite)
� ✅ Plugin-based architectures (Eclipse PDT)
� ✅ AI Model serving (Ollama)

Use these as reference and inspiration for building Zenith IDE.

---

Organized October 17, 2025  
Ready for analysis and integration ✅
