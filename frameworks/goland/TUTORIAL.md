# GoLand - Go IDE Tutorial

## What is GoLand?

GoLand is a full-featured IDE for Go (Golang) development by JetBrains. It provides intelligent code editing, debugging, testing, and built-in tools for Go projects.

**Language**: Go 1.13+  
**Version**: 2025.2 and later  
**Platform**: Windows, macOS, Linux

---

## Quick Start

### Installation

1. Download from [jetbrains.com/go](https://www.jetbrains.com/go/)
2. Install via Toolbox App
3. On launch, install Go SDK (or configure path)

### Create Go Project

```
1. File > New Project > Go
2. Configure:
   - Project name: "HelloGo"
   - Location: Choose directory
   - Go SDK: Auto-detect or select
3. Click Create
```

### Write Your First Program

```go
// main.go
package main

import "fmt"

func main() {
    fmt.Println("Hello, Go!")
}
```

**Run**: Shift+F10 or click green arrow  
**Debug**: Shift+F9 to debug with breakpoints

---

## Key Features

### Code Intelligence

- Code completion with Go modules
- Go-to definition and find usages
- Refactoring (rename, extract method)
- Smart documentation

### Debugging

- Breakpoints with conditions
- Step through execution
- Variable inspection
- Goroutine debugging

### Testing

- Run/Debug tests from gutter
- Test coverage analysis
- Benchmark support
- Testify framework integration

### Built-in Tools

- Terminal for go commands
- Go Modules support
- Build configurations
- Docker integration

### Code Quality

- Linters: golangci-lint, gofmt
- Code formatting: Ctrl+Alt+L
- Go Vet integration
- Static analysis

---

## Workflow Example

```
1. Create project with go.mod
2. Add dependency: go get example.com/pkg
3. Write code with IDE assistance
4. Format: Ctrl+Alt+L
5. Test: Run > Test Package
6. Run: Shift+F10
7. Debug: Set breakpoint, Shift+F9
```

---

## Common Tasks

### Managing Dependencies

- View go.mod in editor
- Auto-import missing packages
- Ctrl+Alt+O to optimize imports
- Tools > Go Modules > Tidy

### Running Tests

```
Right-click test file > Run Tests
Or: Run > Run...
Select test configuration
```

### Building & Deployment

```
Run > Edit Configurations
Create custom build configuration
Execute via Run menu
```

---

## Resources

- Official Docs: [jetbrains.com/help/go](https://www.jetbrains.com/help/go/)
- Go Lang: [golang.org](https://golang.org/)
- Go Modules: [golang.org/ref/mod](https://golang.org/ref/mod)
