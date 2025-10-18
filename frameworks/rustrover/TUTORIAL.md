# RustRover - Rust IDE Tutorial

## What is RustRover?

RustRover is a full-featured IDE for Rust development by JetBrains. It provides intelligent code editing, debugging, testing, and Cargo integration for Rust projects.

**Language**: Rust 1.56+  
**Toolchain**: Cargo, rustfmt, clippy  
**Version**: 2024.3 and later  
**Platform**: Windows, macOS, Linux

---

## Quick Start

### Installation

1. Download from [jetbrains.com/rustrover](https://www.jetbrains.com/rustrover/)
2. Install Rust from [rustup.rs](https://rustup.rs/)
3. Install RustRover via Toolbox
4. Configure Rust toolchain on launch

### Create Project

```
1. File > New Project > Rust
2. Configure:
   - Project name: "hello_rust"
   - Location: Choose directory
3. Click Create
```

### Write Rust Code

```rust
// src/main.rs
fn main() {
    println!("Hello, Rust!");
    
    let numbers = vec![1, 2, 3, 4, 5];
    for num in numbers {
        println!("Number: {}", num);
    }
}
```

**Run**: Shift+F10 or Run menu  
**Debug**: Shift+F9 with breakpoints

---

## Key Features

### Code Intelligence

- Code completion with trait methods
- Macro expansion support
- Type hints and inference
- Go-to definition for crates
- Find usages across project

### Debugging

- GDB/LLDB integration
- Breakpoints and conditional breaks
- Step through code
- Variable inspection
- Thread debugging

### Testing

- Unit test support
- Integration test runner
- Benchmark tests
- Run tests from gutter

### Cargo Integration

- Project and dependency management
- Clippy linting (built-in)
- Formatting with rustfmt
- Dependency updates

### Performance

- Profiler support
- Benchmarking tools
- Memory analysis

---

## Workflow

### Creating Library

```
1. New Rust Project > Library
2. Create modules: src/lib.rs
3. Implement functionality:
   pub fn process(data: &str) -> String { ... }
4. Write tests:
   #[cfg(test)] mod tests { ... }
5. Run tests: Cargo > Test
6. Publish to crates.io
```

### Working with Dependencies

```
1. Edit Cargo.toml:
   [dependencies]
   serde = "1.0"
   tokio = "1.0"

2. IDE auto-indexes crates
3. Code completion available
4. View crate documentation: Right-click > View Documentation
5. Update dependencies: Cargo > Update
```

### Debugging

```
1. Set breakpoint in code
2. Run > Debug (Shift+F9)
3. Step through with F10/F11
4. Inspect variables in debugger panel
5. Evaluate expressions: Alt+F8
```

---

## Common Tasks

### Creating Binary Project

- New Project > Binary
- Implement main logic
- Run with Shift+F10
- Debug with Shift+F9

### Unit Testing

- Tests in same file: #[test]
- Or separate tests/ directory
- Run: Right-click test > Run
- Or Run > Test Package

### Clippy Linting

- Built-in code quality checks
- View warnings in editor
- Apply fixes: Alt+Enter
- Very strict warnings help prevent bugs

---

## Tips & Tricks

1. **Expand Macros**: Right-click macro > Expand Macro
2. **Reformat Code**: Ctrl+Alt+L
3. **Optimize Imports**: Ctrl+Alt+O
4. **Refactoring**: Shift+F6 to rename safely
5. **Run Configuration**: Edit Cargo command parameters

---

## Resources

- Official Docs: [jetbrains.com/help/rustrover](https://www.jetbrains.com/help/rustrover/)
- Rust Book: [doc.rust-lang.org/book](https://doc.rust-lang.org/book/)
- Cargo: [doc.rust-lang.org/cargo](https://doc.rust-lang.org/cargo/)
- Crates.io: [crates.io](https://crates.io/)
