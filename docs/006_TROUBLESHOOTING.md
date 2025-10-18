# 🔧 TROUBLESHOOTING - Common Issues & Solutions

**Quick fixes for build, runtime, and performance issues**

## Build Issues

### Rust not found

```powershell
winget install -e --id Rustlang.Rust.MSVC
rustup update
```

### npm ERR! code ERESOLVE

```powershell
cd ui
npm install --legacy-peer-deps
```

### cargo build fails: cannot find -lSystem

```powershell
rustup update
cargo clean
cargo build --release
```

### Tauri build fails on Windows

```powershell
# Install Visual Studio Build Tools
winget install -e --id Microsoft.VisualStudio.BuildTools

# Or install VS Community
# Then rebuild
cargo tauri build
```

## Runtime Issues

### IDE won't start

1. Check Electron/Tauri logs:

   ```powershell
   $env:RUST_LOG="debug"
   .\RUN_NEXUS_QUICK.ps1
   ```

2. Clear cache:

   ```powershell
   rm -r core/target
   rm -r ui/node_modules
   cargo build --release
   ```

### Blank window on launch

- Check `dist/config/settings.json` exists
- Verify UI files built: `ls ui/dist/`
- Check Chrome DevTools: Press F12

### Cannot find module 'xyz'

```powershell
cd ui
npm install xyz --save
npm run build
```

## Performance Issues

### Slow startup (>500ms)

1. Profile with flamegraph:

   ```powershell
   cargo install flamegraph
   cargo flamegraph --bin nexus-core
   ```

2. Look for hot spots and optimize

### High memory usage (>300MB)

1. Check for memory leaks:

   ```powershell
   cargo install valgrind
   valgrind ./target/release/nexus-core
   ```

2. Profile with heaptrack:

   ```powershell
   # macOS
   brew install heaptrack
   ```

### Janky UI (not 60fps)

1. Open DevTools: F12
2. Check Performance tab
3. Profile rendering
4. Reduce re-renders in React/Svelte

## AI & Ollama Issues

### Connection refused to Ollama

```powershell
# Check Ollama running
ollama list

# If not, start it
ollama serve

# Or install
winget install Ollama.Ollama
```

### Model not found

```powershell
# List available models
ollama list

# Pull a model
ollama pull deepseek-coder
ollama pull qwen:1.8b
```

### Slow completions

1. Use smaller model: `ollama pull qwen:1.8b`
2. Check network latency
3. Implement caching in core

## File System Issues

### Permission denied when opening file

- Check file permissions
- Run IDE with admin if needed
- Check UAC settings

### File watcher not triggering

1. Restart IDE
2. Manually refresh: `Ctrl+R`
3. Check `notify` crate version in Cargo.toml

---

## LSP Issues

### Diagnostics not showing

1. Ensure LSP server started
2. Check core logs
3. Verify language server running on port 11434

### Go to definition not working

1. Check syntax is correct
2. Verify symbol index built
3. Check language support

## UI Component Issues

### Editor not responding to input

1. Check textarea has focus
2. Verify keydown handler attached
3. Check console for errors (F12)

### Syntax highlighting broken

1. Check highlight.js CSS loaded
2. Verify language detected correctly
3. Test with simple example

### Terminal not appearing

1. Check xterm.js imported
2. Verify terminal element mounted
3. Check CSS not hiding it

## Git Integration Issues

### Git status not updating

1. Check git installed: `git --version`
2. Verify repo initialized: `git status`
3. Restart IDE

### Diff view broken

1. Check file saved
2. Verify git aware
3. Restart IDE

## Plugin Issues

### Plugin won't load

1. Check manifest file: `nexus-plugin.toml`
2. Verify plugin format (WASM or native)
3. Check plugin API version

### Plugin crashes IDE

1. Disable plugin in settings
2. Check plugin code for panics
3. Add error handling

## Configuration Issues

### Settings not saving

1. Check `dist/config/` writable
2. Verify settings.json syntax (JSON)
3. Check file permissions

### Theme not applying

1. Verify theme name correct
2. Check CSS files exist
3. Restart IDE for changes

### Keybindings not working

1. Check keybindings.json format
2. Verify keybinding not conflicting
3. Restart IDE

## Performance Profiling

### Measure startup time

```powershell
# Windows
Measure-Command { & ".\dist\nexus-ide.exe" }

# Or use time command
time .\dist\nexus-ide.exe
```

### Profile with criterion

```powershell
cd core
cargo bench

# View results in target/criterion/
```

### Memory profiling (macOS)

```bash
instruments -t "Allocations" ./target/release/nexus-core
```

## Common Error Messages

| Error | Cause | Fix |
|-------|-------|-----|
| error[E0425]: cannot find function 'xyz' | Function not defined | Check import statements |
| error: linker 'cc' not found | C compiler missing | Install build tools |
| TypeError: Cannot read property 'x' of undefined | Null reference in JS | Add null checks |
| ENOENT: no such file or directory | File path wrong | Check path format |

## Debug Logging

### Enable Rust debug logs

```rust
// core/src/main.rs
use tracing::{info, debug, error};

fn main() {
    tracing_subscriber::fmt::init();
    
    debug!("Starting IDE...");
    info!("Loaded configuration");
}

// Run with
// $env:RUST_LOG="debug"
```

### Enable React debug

```typescript
// ui/src/App.tsx
if (process.env.NODE_ENV === 'development') {
  console.log('App mounted');
}
```

## Getting Help

1. Check logs first

   - Browser console (F12)
   - Rust logs (`RUST_LOG=debug`)
   - system logs

2. Search GitHub Issues

   - Tauri issues
   - Svelte issues
   - Electron issues

3. Minimal reproduction

   - Simplest case showing bug
   - Exact steps to reproduce
   - Expected vs actual behavior

4. Version info

   - `rustc --version`
   - `node --version`
   - `cargo --version`

## Performance Checklist

- [ ] Startup time <200ms
- [ ] Memory <200MB
- [ ] Keystroke latency <5ms
- [ ] File operations <30ms
- [ ] No memory leaks
- [ ] CPU usage <5% idle
- [ ] 60fps rendering
- [ ] No janky animations

---

Still stuck?

1. Check BUILD_LOG.md for daily progress
2. Review code in frameworks/ for examples
3. Search Tauri docs
4. Post on GitHub issues
