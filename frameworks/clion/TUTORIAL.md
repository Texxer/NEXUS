# CLion - Complete Tutorial

## What is CLion?

CLion is a cross-platform IDE for C and C++ development. It provides intelligent code editing, debugging, and build system integration for native application development.

**Version**: 2025.2 and later  
**Platform**: Windows, macOS, Linux, FreeBSD  
**Language**: C, C++, C++20 (partial C++23), CMake, Objective-C

---

## Installation & Setup

### System Requirements

- **RAM**: 8 GB minimum (16 GB recommended)
- **Disk Space**: 3.5 GB minimum (SSD with 5+ GB free recommended)
- **CPU**: Multi-core processor
- **Operating System**: Windows 10 1809+, macOS 12.0+, Linux (Ubuntu LTS/Fedora)

### Toolchain Requirements

**Windows Options:**
- Bundled MinGW (easiest)
- Cygwin 2.8+ with gcc-g++ and gdb
- MSVC (Visual Studio 2013-2022)
- WSL (Windows Subsystem for Linux)

**macOS:**
- Xcode Command Line Tools: `xcode-select --install`
- Homebrew for package management

**Linux:**
- GCC/G++ and GDB (Ubuntu: `sudo apt install build-essential gdb`)
- CMake 3.15+

### Installation Steps

1. Download from [jetbrains.com/clion](https://www.jetbrains.com/clion/download/)
2. Install via Toolbox App (recommended) or standalone installer
3. On first run, select your toolchain (compiler and debugger)
4. Configure CMake in Settings > Build, Execution, Deployment > CMake

---

## Core Features

### 1. Code Intelligence

- **Smart Completion**: Context-aware code suggestions
- **Refactoring**: Rename, extract function, inline, move safely
- **Navigation**: Jump to declaration, find usages, view class hierarchy
- **Quick Documentation**: Hover or press Ctrl+Q for symbol documentation

### 2. CMake Integration

- **CMakeLists.txt Editor**: Full syntax highlighting and validation
- **Build Configuration**: Debug, Release, and custom configurations
- **Visual Project Outline**: Understand project structure easily
- **CMake Reload**: Automatic reload detection with validation

### 3. Debugging

- **GDB Integration**: Step-by-step debugging with breakpoints
- **Watch Expressions**: Monitor variable values and expressions
- **Call Stack**: Navigate through function call hierarchy
- **Memory Inspector**: Examine memory at runtime
- **Thread View**: Debug multi-threaded applications

### 4. Built-in Tools

- **Terminal**: Integrated shell for compilation and testing
- **Unit Test Runners**: Support for Google Test (GTest), Catch2, Boost.Test
- **Version Control**: Git, Mercurial, Subversion integration
- **Database Tools**: Work with SQL databases directly

---

## Workflow

### Creating Your First C++ Project

```
1. File > New Project
2. Choose project type:
   - C++ Executable (console app)
   - C++ Library (static/shared)
   - C++ CMake Executable
3. Configure project:
   - Name: "HelloCPP"
   - Location: Choose directory
   - Language: C++ Standard (C++17, C++20)
4. Click "Create"
```

### Project Structure

```
project/
├── CMakeLists.txt           # Build configuration
├── main.cpp                 # Entry point
└── cmake-build-debug/       # Build output (auto-generated)
    └── HelloCPP             # Executable
```

### Building and Running

```
1. Build: Ctrl+F9 (Windows/Linux) or Cmd+F9 (Mac)
2. Run: Shift+F10 (Windows/Linux) or Ctrl+R (Mac)
3. Debug: Shift+F9 (Windows/Linux) or Ctrl+D (Mac)
```

### CMakeLists.txt Example

```cmake
cmake_minimum_required(VERSION 3.15)
project(HelloCPP)

set(CMAKE_CXX_STANDARD 17)

add_executable(HelloCPP main.cpp)
```

---

## Essential Features

### 1. Code Analysis

- **Inspections**: Real-time code quality checks
- **Quick Fixes**: Alt+Enter for instant problem resolution
- **Memory Checks**: Detect potential memory leaks
- **Performance Analysis**: Identify performance bottlenecks

*Access*: Analyze > Run Inspection by Name

### 2. Testing Support

**Google Test Example:**

```cpp
#include <gtest/gtest.h>

TEST(MathTest, Addition) {
    EXPECT_EQ(2 + 2, 4);
}

int main(int argc, char **argv) {
    ::testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}
```

- **Run Tests**: Right-click test file > Run or Debug
- **Test Output**: Gutter icons show pass/fail status
- **Coverage**: Tools > Run with Coverage

### 3. Embedded Development

- **Target Configuration**: Multiple build targets
- **Serial Monitor**: Monitor embedded device output
- **Flash Programming**: Direct device programming
- **Low-level Debugging**: Breakpoints in embedded code

### 4. Remote Development

- **SSH Connections**: Debug on remote machines
- **Docker Support**: Run compilation in containers
- **Build on Remote**: Use remote compiler and toolchain
- **Automatic Sync**: Files sync to remote during debug

---

## Advanced Features

### Profiling and Optimization

**CPU Profiler:**
- Tools > Analyze Running Process
- Identifies hot spots and optimization opportunities

**Memory Profiler:**
- Track memory allocation
- Detect memory leaks
- Analyze heap usage

### Refactoring

| Action | Shortcut |
|--------|----------|
| Rename | Shift+F6 |
| Extract Function | Ctrl+Alt+M |
| Inline | Ctrl+Alt+N |
| Move | Ctrl+Alt+Shift+M |
| Change Signature | Ctrl+F6 |

### Version Control

- **Git Integration**: Commit, push, pull directly from IDE
- **Diff View**: Visual comparison of changes
- **History**: Trace file history and diffs
- **Branches**: Create and switch branches visually

---

## Keyboard Shortcuts

| Action | Windows/Linux | Mac |
|--------|--------------|-----|
| Build | Ctrl+F9 | Cmd+F9 |
| Run | Shift+F10 | Ctrl+R |
| Debug | Shift+F9 | Ctrl+D |
| Find | Ctrl+F | Cmd+F |
| Go to Definition | Ctrl+B | Cmd+B |
| Find Usages | Alt+F7 | Cmd+Alt+F7 |
| Refactor Rename | Shift+F6 | Shift+F6 |
| Comment Line | Ctrl+/ | Cmd+/ |
| Format Code | Ctrl+Alt+L | Cmd+Alt+L |
| Commit | Ctrl+K | Cmd+K |

---

## Tips & Tricks

1. **Run Configuration**: Edit configurations for different build types
2. **Template Files**: Create custom file templates (Settings > File and Code Templates)
3. **Live Templates**: Use Ctrl+J to insert code snippets (e.g., `for` for loops)
4. **Smart Indentation**: Automatically aligns code based on conventions
5. **Find in Path**: Ctrl+Shift+F to search across entire project
6. **Breadcrumbs**: Navigate class hierarchy with breadcrumb trail

---

## Common Issues

### CMake Not Found
- Install CMake: `sudo apt install cmake` (Linux)
- Add to PATH if installed manually
- Configure path in Settings > Build, Execution, Deployment > CMake

### Compilation Errors
- Check CMakeLists.txt syntax
- Verify toolchain is configured correctly
- Clean build: Build > Clean Project
- Rebuild: Build > Rebuild Project

### Debugging Doesn't Work
- Ensure `Debug` configuration is selected
- Verify compiler supports debugging (`-g` flag)
- Check firewall for remote debugging

---

## Configuration Tips

### Optimize for Large Projects

```
Settings > Editor > General > Highlighting:
- Disable inspections for non-critical warnings
- Configure CPU time limits
```

### Custom Keymaps

```
Settings > Keymap:
- Import from Visual Studio, Vim, Emacs, etc.
- Create custom bindings
```

### Code Style

```
Settings > Code Style > C/C++:
- Configure naming conventions
- Set formatting rules
- Apply via Ctrl+Alt+L
```

---

## Resources

- **Official Docs**: [jetbrains.com/help/clion](https://www.jetbrains.com/help/clion/)
- **Quick Start**: [Quick Start Guide](https://www.jetbrains.com/help/clion/clion-quick-start-guide.html)
- **CMake Documentation**: [cmake.org](https://cmake.org/)
- **C++ Reference**: [cppreference.com](https://cppreference.com/)
- **GCC/GDB Docs**: [gnu.org](https://www.gnu.org/)

