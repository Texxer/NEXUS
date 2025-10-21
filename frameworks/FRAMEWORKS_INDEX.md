# Frameworks & LLM Infrastructure

Complete collection of open-source IDE frameworks, model serving systems, and AI/ML infrastructure for analysis and integration into Zenith IDE.

## 📋 Cloned Repositories & IDEs

### IDE Frameworks - Open Source (8)

| Framework | URL | Status | Size | Language | Purpose |
|-----------|-----|--------|------|----------|---------|
| VS Code | [microsoft/vscode](https://github.com/microsoft/vscode) | ✅ | ~2GB | TypeScript | Modern electron-based IDE |
| IntelliJ Community | [JetBrains/intellij-community](https://github.com/JetBrains/intellij-community) | ⏳ Cloning | ~10GB | Java/Kotlin | Advanced IDE with semantic analysis |
| Vim | [vim/vim](https://github.com/vim/vim) | ✅ | ~200MB | C/VimScript | Modal text editor |
| Neovim | [neovim/neovim](https://github.com/neovim/neovim) | ✅ | ~200MB | C/Lua | Modern Vim fork |
| Eclipse PDT | [eclipse/pdt](https://github.com/eclipse/pdt) | ✅ | ~500MB | Java | PHP IDE built on Eclipse |
| Geany | [geany/geany](https://github.com/geany/geany) | ✅ | ~300MB | C/GTK | Lightweight text editor |
| Kate | [KDE/kate](https://github.com/KDE/kate) | ✅ | ~400MB | C++/KDE | Advanced text editor |
| CodeLite | [eranif/codelite](https://github.com/eranif/codelite) | ✅ | ~300MB | C++/wxWidgets | Lightweight IDE |

### JetBrains IDEs - Proprietary (14)

| Framework | Tutorial | Status | Language Focus | Purpose |
|-----------|----------|--------|-----------------|---------|
| Android Studio | [TUTORIAL.md](android-studio/TUTORIAL.md) | ✅ | Kotlin/Java | Official IDE for Android development |
| CLion | [TUTORIAL.md](clion/TUTORIAL.md) | ✅ | C/C++ | Cross-platform C/C++ IDE with CMake |
| DataGrip | [TUTORIAL.md](datagrip/TUTORIAL.md) | ✅ | SQL | Advanced database IDE & SQL client |
| DataSpell | [TUTORIAL.md](dataspell/TUTORIAL.md) | ✅ | Python/R | Jupyter notebooks & data science IDE |
| Fleet | [TUTORIAL.md](fleet/TUTORIAL.md) | ✅ | Multi-language | Lightweight polyglot editor (Light/Smart modes) |
| GoLand | [TUTORIAL.md](goland/TUTORIAL.md) | ✅ | Go | Full-featured Go IDE |
| IntelliJ IDEA Community | [TUTORIAL.md](intellij-community/TUTORIAL.md) | ✅ | Java/Kotlin | Open-source community IDE for JVM |
| IntelliJ IDEA Ultimate | [TUTORIAL.md](intellij-ultimate/TUTORIAL.md) | ✅ | Java/Kotlin | Enterprise-grade JVM IDE with web frameworks |
| PhpStorm | [TUTORIAL.md](phpstorm/TUTORIAL.md) | ✅ | PHP | Dedicated PHP IDE with framework support |
| PyCharm Community | [TUTORIAL.md](pycharm-community/TUTORIAL.md) | ✅ | Python | Free Python IDE |
| PyCharm Professional | [TUTORIAL.md](pycharm-professional/TUTORIAL.md) | ✅ | Python | Professional Python with web/data science |
| ReSharper | [TUTORIAL.md](resharper/TUTORIAL.md) | ✅ | C#/VB.NET | Visual Studio extension for .NET |
| ReSharper C++ | [TUTORIAL.md](resharper-cpp/TUTORIAL.md) | ✅ | C/C++ | Visual Studio extension for C++ |
| Rider | [TUTORIAL.md](rider/TUTORIAL.md) | ✅ | C#/F#/VB.NET | Cross-platform .NET IDE |
| RubyMine | [TUTORIAL.md](rubymine/TUTORIAL.md) | ✅ | Ruby | Full-featured Ruby and Rails IDE |
| RustRover | [TUTORIAL.md](rustrover/TUTORIAL.md) | ✅ | Rust | Official JetBrains Rust IDE |
| WebStorm | [TUTORIAL.md](webstorm/TUTORIAL.md) | ✅ | JavaScript/TypeScript | Advanced JavaScript/TypeScript IDE |

---

## 🎓 JetBrains IDE Tutorials Overview

Each IDE includes a comprehensive `TUTORIAL.md` with:
- ✅ Installation & system requirements
- ✅ First-time setup & project creation
- ✅ Core features & capabilities
- ✅ Language/framework-specific tools
- ✅ Debugging & testing workflows
- ✅ Code completion & refactoring
- ✅ Version control integration
- ✅ Keyboard shortcuts (platform-specific)
- ✅ Resources & community links

### IDE Selection Guide

**By Programming Language:**
- **Android Development**: Android Studio
- **C/C++**: CLion, ReSharper C++
- **C#/.NET**: Rider, ReSharper
- **Go**: GoLand
- **Java/Kotlin**: IntelliJ IDEA Community/Ultimate
- **PHP**: PhpStorm
- **Python**: PyCharm Community/Professional, DataSpell
- **Ruby**: RubyMine
- **Rust**: RustRover
- **JavaScript/TypeScript**: WebStorm, Fleet
- **SQL/Databases**: DataGrip
- **Multi-language**: Fleet (Light/Smart modes)

**By Use Case:**
- **Web Development**: PhpStorm, WebStorm, PyCharm Professional
- **Mobile Development**: Android Studio, Rider (Xamarin)
- **Data Science**: DataSpell, PyCharm Professional
- **Enterprise**: IntelliJ Ultimate, Rider, DataGrip
- **Lightweight Coding**: Fleet (Light Mode)
- **Full-Featured IDE**: IntelliJ Ultimate, PhpStorm, WebStorm
- **Tool Extension**: ReSharper (in Visual Studio)

---

## 🗂️ Directory Structure

```
frameworks/
├── OPEN SOURCE FRAMEWORKS/
│   ├── vscode/                      # VS Code source
│   ├── intellij-community/          # IntelliJ IDEA source (in progress)
│   ├── vim/                         # Vim source
│   ├── neovim/                      # Neovim source
│   ├── pdt/                         # Eclipse PDT (PHP IDE)
│   ├── geany/                       # Geany text editor
│   ├── kate/                        # Kate editor
│   ├── codelite/                    # CodeLite IDE
│   └── ollama/                      # Ollama model server
│
├── JETBRAINS IDEs (14)/
│   ├── android-studio/              # Android development
│   │   └── TUTORIAL.md              # Complete setup & usage guide
│   ├── clion/                       # C/C++ development
│   │   └── TUTORIAL.md
│   ├── datagrip/                    # Database IDE
│   │   └── TUTORIAL.md
│   ├── dataspell/                   # Data science & Jupyter
│   │   └── TUTORIAL.md
│   ├── fleet/                       # Lightweight polyglot editor
│   │   └── TUTORIAL.md
│   ├── goland/                      # Go development
│   │   └── TUTORIAL.md
│   ├── intellij-community/          # Java/Kotlin (free)
│   │   └── TUTORIAL.md
│   ├── intellij-ultimate/           # Java/Kotlin (enterprise)
│   │   └── TUTORIAL.md
│   ├── phpstorm/                    # PHP development
│   │   └── TUTORIAL.md
│   ├── pycharm-community/           # Python (free)
│   │   └── TUTORIAL.md
│   ├── pycharm-professional/        # Python (professional)
│   │   └── TUTORIAL.md
│   ├── resharper/                   # .NET in Visual Studio
│   │   └── TUTORIAL.md
│   ├── resharper-cpp/               # C++ in Visual Studio
│   │   └── TUTORIAL.md
│   ├── rider/                       # .NET cross-platform
│   │   └── TUTORIAL.md
│   ├── rubymine/                    # Ruby/Rails development
│   │   └── TUTORIAL.md
│   ├── rustrover/                   # Rust development
│   │   └── TUTORIAL.md
│   └── webstorm/                    # JavaScript/TypeScript development
│       └── TUTORIAL.md
│
├── DOCUMENTATION/
│   ├── IDE_ANALYSIS.md              # Comprehensive analysis of all frameworks
│   ├── OLLAMA_CLOUD_DOCS.md         # Ollama cloud documentation
│   └── FRAMEWORKS_INDEX.md          # This file
```

---

## 📊 Framework Analysis Summary

### Architecture Patterns

**Event-Driven Model**
- VS Code, Kate: Event-based plugin systems
- Neovim: Async RPC event loop
- Ollama: HTTP API event model

**Plugin Systems**
- VS Code: npm-based extension marketplace
- JetBrains: JAR/plugin.xml descriptor system
- Vim/Neovim: Vimscript/Lua scripting
- Ollama: REST API + client libraries

**UI Frameworks**
- VS Code: Custom Electron UI
- JetBrains: Swing + custom rendering
- Kate: Qt5/Qt6
- Geany: GTK+
- Ollama: CLI + Web UI

---

## 🤖 Ollama Integration

### What is Ollama?

Ollama is a platform for running and managing large language models locally or in the cloud:

**Local Mode:**
- Run models on your GPU
- No internet required
- Full privacy
- Models: Llama, Mistral, Neural Chat, etc.

**Cloud Mode:**
- Run large models without GPU
- API-first design
- Authentication via API keys
- Supported models: GPT-OSS, DeepSeek, Qwen, etc.

### Cloud Models Available

```
✓ deepseek-v3.1:671b-cloud     (671B parameters)
✓ gpt-oss:20b-cloud             (20B parameters)
✓ gpt-oss:120b-cloud            (120B parameters)
✓ kimi-k2:1t-cloud              (1T parameters)
✓ qwen3-coder:480b-cloud        (480B parameters)
✓ glm-4.6:cloud                 (GLM-4 model)
```

### Quick Start

```bash
# Sign in to cloud account
ollama signin

# Run a cloud model
ollama run gpt-oss:120b-cloud

# Or use the API
export OLLAMA_API_KEY=your_api_key
curl https://ollama.com/api/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OLLAMA_API_KEY" \
  -d '{"model": "gpt-oss:120b", "messages": [...]}'
```

### Python Integration

```python
from ollama import Client

client = Client(
    host="https://ollama.com",
    headers={'Authorization': f'Bearer {api_key}'}
)

response = client.chat(
    model='gpt-oss:120b',
    messages=[{'role': 'user', 'content': 'Hello!'}],
    stream=True
)
```

See `OLLAMA_CLOUD_DOCS.md` for complete documentation.

---

## 🔧 Use Cases for Zenith IDE

### 1. Code Completion & Analysis
- Use Ollama cloud models for intelligent code suggestions
- Syntax-aware completions via tree-sitter + LLM
- Context-aware refactoring recommendations

### 2. Documentation Generation
- Auto-generate docstrings using models
- Create API documentation
- Generate test cases

### 3. Error Analysis & Fixing
- AI-powered error diagnostics
- Automatic fix suggestions
- Learning explanations

### 4. Code Review Assistant
- Automated code review comments
- Security issue detection
- Performance optimization suggestions

### 5. Language Understanding
- Multi-language support via LLM
- Natural language search in codebase
- Semantic code navigation

---

## 📈 IDE Comparison Matrix

| Feature | VS Code | IntelliJ | Vim | Ollama | Zenith |
|---------|---------|----------|-----|--------|--------|
| Speed | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| AI Integration | ⭐⭐ | ⭐⭐ | ⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Extensibility | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Memory Usage | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Language Support | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Semantic Analysis | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

---

## 🎯 Integration Points for Zenith

### From VS Code
- ✅ Extension marketplace architecture
- ✅ Settings & keybindings system
- ✅ Integrated terminal approach
- ✅ File explorer patterns

### From JetBrains
- ✅ Semantic analysis (PSI trees)
- ✅ Refactoring engine architecture
- ✅ Inspection/linting system
- ✅ Database-backed code analysis

### From Vim
- ✅ Modal editing philosophy
- ✅ Keyboard-first efficiency
- ✅ Extensibility via scripting
- ✅ Performance optimization

### From Ollama
- ✅ Local + cloud AI model serving
- ✅ Simple REST API design
- ✅ Streaming response handling
- ✅ Multi-model architecture

---

## 📚 Documentation Files

### IDE Analysis
- **File**: `IDE_ANALYSIS.md`
- **Size**: 1,000+ lines
- **Content**: Detailed analysis of all open-source IDE frameworks
- **Topics**: Architecture, features, strengths, weaknesses, design patterns

### Ollama Cloud
- **File**: `OLLAMA_CLOUD_DOCS.md`
- **Size**: 240 lines
- **Content**: Complete Ollama cloud documentation
- **Topics**: Models, API, authentication, Python/CLI examples

### IDE Tutorials (17 Total)
- **Location**: `{ide-name}/TUTORIAL.md`
- **Total Size**: ~47,000 lines
- **Coverage**: Installation, setup, debugging, testing, frameworks, workflows

### Quick Reference Tables

**Framework Comparison**:
- See `📈 IDE Comparison Matrix` below for feature comparison
- See `IDE Selection Guide` above for language/use-case matching

### Zenith IDE Integration
- **Location**: `../IDE/`
- **Content**: Complete production-ready Zenith IDE implementation
- **Status**: Clean build, all tests passing

---

## 🚀 Next Steps

1. **Complete IntelliJ Clone** (if needed)
   ```bash
   cd intellij-community
   git log --oneline | head -20  # View recent commits
   ```

2. **Analyze Model Integration Points**
   - Study Ollama API for IDE integration
   - Design AI feature layer
   - Plan prompt engineering

3. **Implement AI Features in Zenith**
   - Code completion module
   - Error analysis engine
   - Documentation generator

4. **Build Plugin Ecosystem**
   - Language-specific plugins
   - Framework integrations
   - Tools & utilities

---

## 🔗 Useful Links

### Cloned Repositories
- [VS Code](https://github.com/microsoft/vscode)
- [IntelliJ IDEA](https://github.com/JetBrains/intellij-community)
- [Vim](https://github.com/vim/vim)
- [Neovim](https://github.com/neovim/neovim)
- [Ollama](https://github.com/ollama/ollama)

### Documentation
- [Ollama Docs](https://docs.ollama.com)
- [Ollama Cloud](https://docs.ollama.com/cloud)
- [Ollama API](https://ollama.com/api)

### Zenith IDE
- See `../IDE/README.md`
- See `../IDE/INDEX.md`
- See `../IDE/docs/architecture.md`

---

## 📝 License

This directory contains cloned open-source projects with their original licenses:
- VS Code: MIT
- IntelliJ Community: Community Edition License
- Vim: Vim License
- Neovim: Apache 2.0
- Eclipse PDT: EPL 2.0
- Geany: GPL 2.0
- Kate: LGPL
- CodeLite: GPL 2.0
- Ollama: MIT

Zenith IDE combines insights from these projects under MIT License.

---

*Last Updated: October 17, 2025*
