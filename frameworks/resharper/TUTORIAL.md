# ReSharper - .NET Code Analysis Tool

## What is ReSharper?

ReSharper is a powerful code analysis and refactoring tool for Visual Studio by JetBrains. It provides extensive inspection, quick-fixes, refactoring capabilities, and coding assistance for C#, VB.NET, C++, XAML, and JavaScript.

**Supported Languages**: C#, VB.NET, C++, XAML, XML, HTML, ASP.NET, JavaScript, TypeScript, CSS  
**Version**: 2025.2 and later  
**Platform**: Windows (requires Visual Studio)

---

## Installation

### Prerequisites
- Visual Studio 2013 or later
- ReSharper requires Visual Studio installation

### Installation Steps
1. Download from [jetbrains.com/resharper](https://www.jetbrains.com/resharper/)
2. Run installer
3. Select Visual Studio version
4. Restart Visual Studio
5. Configure license

---

## Core Features

### Code Inspection

**Real-time Analysis:**
- Type checking
- Unused code detection
- Potential bugs
- Code smells
- Performance issues
- Security warnings

**Quick Actions:**
- Alt+Enter for code fixes
- Instant code transformations
- Bulk refactoring operations

### Refactoring

| Action | Shortcut |
|--------|----------|
| Rename | Ctrl+R, R |
| Extract Method | Ctrl+R, M |
| Extract Class | Custom |
| Inline | Ctrl+R, I |
| Move | Custom |
| Change Signature | Custom |

### Navigation

- Go to Declaration: Ctrl+B
- Find Usages: Shift+F12
- Go to Implementation: Ctrl+Alt+B
- Navigate to Symbol: Alt+G

### Unit Testing

- Run tests: Ctrl+U, R
- Debug tests: Ctrl+U, D
- Code coverage: Ctrl+U, C
- Performance profiling

---

## Code Quality

### Inspections
- ~500 built-in inspections
- Custom inspection rules
- Severity levels configuration
- Inspection profiles

### Code Cleanup
- Format code
- Organize imports
- Remove unused code
- Apply code style

### Duplicate Finder
- Find similar code patterns
- Mark code for refactoring
- Report duplicates

---

## ASP.NET Development

### Web Features
- Razor template support
- ASP.NET MVC navigation
- View/Controller association
- Route analysis

### JavaScript/TypeScript
- Full language support
- Framework detection
- Code completion
- Refactoring

---

## Command Line Tools

### Inspecting Code
```bash
inspectcode.exe /o=report.html Solution.sln
```

### Code Cleanup
```bash
cleanupcode.exe Solution.sln
```

### Architecture Analysis
```bash
dupfinder.exe Solution.sln
```

---

## Workflow

### Code Review with ReSharper

```
1. Open solution in Visual Studio
2. Alt+Enter to see code issues
3. Review suggestions
4. Apply fixes
5. Run unit tests
6. Commit changes
```

### Refactoring Large Codebase

```
1. Analyze > Run Inspection
2. Configure inspection scope
3. Review findings
4. Refactor: Rename, Extract, Inline
5. Run tests
6. Verify changes
```

---

## Resources
- **Official Docs**: [jetbrains.com/help/resharper](https://www.jetbrains.com/help/resharper/)
- **Plugins**: [jetbrains.com/resharper/plugins](https://www.jetbrains.com/resharper/plugins/)
- **Community**: JetBrains forums, Stack Overflow
