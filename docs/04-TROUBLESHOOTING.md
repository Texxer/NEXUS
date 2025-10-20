# Troubleshooting

## Black Screen

**Symptoms**: Window opens but shows nothing

**Solutions**:

1. Check `src-tauri/tauri.conf.json` - CSP settings
2. Open dev tools: Press `F12`
3. Look for JavaScript errors in Console tab
4. Check Network tab for missing assets

## Build Errors

**Cargo fails**: `cargo clean && cargo tauri build`

**NPM fails**: `npm ci --prefix ui`

## Exe Not Updating

After `cargo tauri build`, the `.exe` still shows old version.

**Solution**:

```powershell
cargo clean
cargo tauri build
```

This forces a complete rebuild.

## Performance Issues

- Check if CSP is blocking assets
- Verify WebView2 is installed (Windows Update)
- Enable parallel builds: `.cargo/config.toml` (jobs=8)

---

**Previous**: See [03-BUILD.md](03-BUILD.md)  
**Index**: Return to [00-INDEX.md](00-INDEX.md)
