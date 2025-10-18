# Architecture

## Overview

Zenith IDE is built on a modular, client-server architecture:

```text
┌─────────────────────────────────────────────┐
│           Zenith UI (React)                 │
│  ┌─────────────────────────────────────┐   │
│  │ Editor | FileExplorer | Terminal    │   │
│  │ Sidebar | StatusBar | Panels        │   │
│  └─────────────────────────────────────┘   │
└──────────────────────┬──────────────────────┘
                       │ IPC/HTTP
        ┌──────────────┴──────────────┐
        │                             │
┌───────▼──────────────┐   ┌──────────▼────────┐
│  Zenith Core (Rust)  │   │  External LSP    │
│ ┌──────────────────┐ │   │  Servers         │
│ │ Editor Engine    │ │   │ (TypeScript,     │
│ │ Code Analyzer    │ │   │  Python, etc)    │
│ │ LSP Bridge       │ │   │                  │
│ │ Plugin Runtime   │ │   │                  │
│ │ Virtual FS       │ │   │                  │
│ └──────────────────┘ │   │                  │
└──────────────────────┘   └──────────────────┘
```text

## Core Components

### 1. Editor Engine (`editor.rs`)

- Rope-based text buffer - Efficient text manipulation

- Multi-cursor support - Edit multiple locations simultaneously

- Undo/Redo system - Complete operation history

- Selection management - Multiple selection types

- Performance - O(log n) operations on large files

```rust
pub struct Editor {
    buffers: HashMap<String, DocumentBuffer>,
    active_buffer: Option<String>,
    undo_stack: Vec<Vec<EditOperation>>,
    redo_stack: Vec<Vec<EditOperation>>,
}
```text

### 2. Code Analyzer (`analyzer.rs`)

- Syntax tree parsing - Tree-sitter integration

- Symbol extraction - Function, class, variable detection

- Linting - Basic code quality checks

- Diagnostics - Error and warning reporting

- Cache - Memoization of analysis results

```rust
pub struct CodeAnalyzer {
    vfs: Arc<RwLock<VirtualFileSystem>>,
    analysis_cache: HashMap<String, AnalysisResult>,
}
```text

### 3. LSP Server (`lsp.rs`)

- Language Server Protocol - Standard for language support

- Hover information - Type/doc display

- Goto definition - Jump to symbol definition

- Completions - Code suggestions

- Diagnostics - Publishing errors/warnings

### 4. Plugin Runtime (`plugins.rs`)

- Plugin loading - Dynamic plugin registration

- Plugin lifecycle - Initialization and cleanup

- Hot reload - Update plugins without restart

- Isolation - Sandboxed plugin execution

### 5. Virtual File System (`vfs.rs`)

- File operations - Read, write, delete

- Directory listing - File tree navigation

- File watching - Change notifications

- Caching - Frequently accessed files

## Data Flow

### Edit Operations
```text
User Input
    ↓
UI Component (TextArea)
    ↓
Editor.insert() / Editor.delete()
    ↓
DocumentBuffer.insert() / DocumentBuffer.delete()
    ↓
Rope (rope-based buffer)
    ↓
Record in undo_stack
    ↓
Notify UI of changes
```text

### Code Analysis
```text
File Changed (File Watcher)
    ↓
VirtualFileSystem.read_file()
    ↓
CodeAnalyzer.analyze_file()
    ↓
Extract Symbols (AST traversal)
    ↓
Run Linter (line-by-line checks)
    ↓
Cache Result
    ↓
Publish Diagnostics via LSP
```text

### Completion
```text
User Types / Triggers Completion
    ↓
LSP Server.completions()
    ↓
CodeAnalyzer.get_completions()
    ↓
Pattern Matching / Symbol Lookup
    ↓
Return CompletionItems
    ↓
UI Display Autocomplete Menu
```text

## Threading Model

All heavy operations are async:

```rust
pub async fn analyze_file(&mut self, file_path: &str) -> Result<AnalysisResult>
pub async fn start(&self) -> Result<()>
pub async fn hover(&self, file_path: &str, line: usize, column: usize) -> Result<Option<String>>
```text
Uses Tokio for efficient async runtime:

- Non-blocking I/O

- Concurrent request handling

- Efficient resource usage

## Extension Points

### Plugin API
```typescript
interface ZenithPlugin {
  activate(context: ExtensionContext): Promise<void>;
  deactivate(): Promise<void>;
  
  // Contribute features
  contributeCommands(): Command[];
  contributeKeybindings(): Keybinding[];
  contributeThemes(): Theme[];
  contributeLanguages(): Language[];
}
```text

### Custom Commands
```typescript
context.subscriptions.push(
  commands.registerCommand('my-plugin.doSomething', () => {
    // Custom command logic
  })
);
```text

## Performance Considerations

1. Rope for text - O(log n) insertions/deletions
2. Analysis caching - Avoid re-analysis of unchanged files
3. Lazy loading - Features loaded on-demand
4. Async operations - Non-blocking UI
5. Tree-sitter - Incremental parsing

## Security

- Plugin sandboxing (JavaScript only, no direct system access)

- File operations restricted to workspace

- Network requests require explicit permission

- VSCode-compatible API reduces attack surface
