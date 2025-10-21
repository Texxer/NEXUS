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

✓ Check if CSP is blocking assets
✓ Verify WebView2 is installed (Windows Update)
✓ Enable parallel builds: `.cargo/config.toml` (jobs=8)

## Build Blocked by Antivirus (AVG, Windows Defender, etc.)

**Symptoms**: Build fails with `build-script-build.exe` quarantined or blocked

**Root Cause**: Antivirus flags Cargo's temporary proc-macro build scripts as suspicious (false positive)

### Quick Fix: Add Exclusions

1. Open your antivirus (AVG, Windows Defender, etc.)
2. Go to **Settings** → **Exceptions/Exclusions**
3. Add these paths:

```plaintext
C:\Users\[YourUsername]\.cargo
C:\Users\[YourUsername]\OneDrive\generalAI\IDE\target
C:\Users\[YourUsername]\.rustup\toolchains
```

4. **Restore quarantined file** if present
5. Run: `cargo clean && cargo tauri build`

### Alternative: Pause Antivirus Temporarily

If adding exclusions doesn't work immediately:

1. Click antivirus icon in system tray
2. Select **Pause protection** (15 minutes)
3. Run build: `cargo tauri build`
4. Re-enable antivirus when done

### Complete Steps for AVG Specifically

**Step 1**: Open AVG from system tray

**Step 2**: Menu → **Settings**

**Step 3**: Find **Exceptions** or **Exclusions**

**Step 4**: Add folder:

```plaintext
C:\Users\[YourUsername]\.cargo
C:\Users\[YourUsername]\OneDrive\generalAI\IDE\target
```

**Step 5**: Go to **Quarantine** → Find `build-script-build.exe` → **Restore**

**Step 6**: Clean and rebuild:

```powershell
cargo clean
cargo tauri build
```

---

**Previous**: See [03-BUILD.md](03-BUILD.md)  
**Index**: Return to [00-INDEX.md](00-INDEX.md)
