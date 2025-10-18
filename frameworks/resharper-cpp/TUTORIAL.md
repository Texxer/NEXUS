# ReSharper C++ - C++ Code Analysis for Visual Studio

## What is ReSharper C++?

ReSharper C++ is a code analysis and refactoring tool for C++ development in Visual Studio by JetBrains. It provides intelligent code inspection, refactoring, code generation, and debugging enhancements for modern C++ (up to C++20).

**Supported**: C, C++, C++/CLI, C++20, Objective-C, CMake  
**Version**: 2025.2 and later  
**Platform**: Windows (requires Visual Studio 2015 or later)

---

## Installation

### Prerequisites

- Visual Studio 2015 or later
- C++ workload installed

### Installation Steps

1. Download from [jetbrains.com/resharper/cpp](https://www.jetbrains.com/resharper/cpp/)
2. Run installer
3. Select Visual Studio version
4. Install ReSharper C++
5. Restart Visual Studio

---

## Core Features

### Code Analysis

**Real-time Inspection:**

- Type checking
- Syntax validation
- Header file analysis
- Macro expansion
- Template instantiation
- CPU-intensive operations warning

**Quick Fixes:**

- Alt+Enter for suggestions
- Code generation
- Fix includes
- Cleanup unused

### C++ Refactoring

| Action | Shortcut |
|--------|----------|
| Rename | Ctrl+R, R |
| Extract Method | Ctrl+R, M |
| Extract Variable | Ctrl+R, V |
| Inline | Ctrl+R, I |
| Move to Header | Custom |
| Change Signature | Custom |

### Code Generation

- **Alt+Insert**: Generate methods, constructors
- **Implement virtual methods**
- **Generate PIMPL pattern**
- **Create getters/setters**

---

## Navigation

### C++ Navigation

- Go to Declaration: Ctrl+B
- Find Usages: Shift+F12
- Show Type Hierarchy: Ctrl+Alt+H
- Include Graph: Navigation > Symbols

### Header Navigation

- Navigate between .h and .cpp
- View includes
- Optimize include paths

---

## Build Integration

### CMake Support

- CMakeLists.txt editing
- Build configuration
- Compilation output analysis
- Error navigation

### MSBuild Support

- Project file analysis
- Build target execution
- Property evaluation

---

## Advanced Features

### Code Inspection Settings

```
Tools > Options > ReSharper C++
- Code inspections
- Severity levels
- Custom rules
- Inspection profiles
```

### Clang-Tidy Integration

- Run Clang-Tidy checks
- Integration with IDE
- Bulk refactoring

### Static Analysis

- Memory leaks detection
- Array bounds checking
- Uninitialized variable detection
- Dead code removal

---

## Workflow

### Code Quality Improvement

```
1. Open C++ project
2. Alt+Enter on issues
3. Review ReSharper suggestions
4. Apply fixes
5. Run static analysis
6. Build project
7. Test changes
```

### Large Project Refactoring

```
1. Run Inspect Code (Alt+Shift+F11)
2. Configure inspection scope
3. Review issues found
4. Refactor: Rename, Extract, Move
5. Rebuild solution
6. Verify no errors
7. Commit changes
```

---

## Performance Tips

### Disable Unnecessary Inspections

- Tools > Options > ReSharper C++
- Uncheck unused inspections
- Improves IDE responsiveness

### Configure Indexing

- Exclude large directories
- Focus on source files
- Skip generated code

---

## Resources

- **Official Docs**: [jetbrains.com/help/resharper/cpp](https://www.jetbrains.com/help/resharper/cpp/)
- **C++ Standard**: [cppreference.com](https://en.cppreference.com/)
- **CMake**: [cmake.org](https://cmake.org/)
