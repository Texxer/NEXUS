# 03 - Complete Build Guide

## Build Process Overview

NEXUS IDE uses a two-stage build process:

1. **Frontend Build** (Vite): Compiles Svelte/TypeScript to optimized assets
2. **Tauri Build**: Bundles frontend + Rust backend into distributable executables

## Prerequisites

- Rust 1.70+
- Node.js 18+
- Windows x64

## Step-by-Step Build

### Step 1: Install Dependencies

```bash
cd IDE
npm install --prefix ui/
```

This installs Node.js dependencies for the frontend.

### Step 2: Build Frontend

```bash
npm run build --prefix ui/
```

Output: `ui/dist/` directory with compiled assets

**Build Artifacts**:
- `index.html` (0.43 KB gzipped)
- `assets/index-*.css` (1.89 KB gzipped)
- `assets/index-*.js` (311.45 KB gzipped)
- `assets/` directory with all assets

### Step 3: Build with Tauri

```bash
cargo tauri build
```

This:
1. Runs `npm run build` in ui/ (unless already built)
2. Compiles Rust backend with optimizations
3. Bundles everything into executables
4. Creates Windows installers

**Build Output Location**: `target/release/`

**Generated Artifacts**:
- `nexus-pro.exe` (8.70 MB) - Portable executable
- `bundle/nsis/NEXUS IDE_0.1.0_x64-setup.exe` (2.45 MB)
- `bundle/msi/NEXUS IDE_0.1.0_x64_en-US.msi` (3.37 MB)

## Full Build Timeline

```
cargo tauri build
│
├─ Frontend (npm run build)
│  ├─ TypeScript compilation (tsc)      [~1s]
│  ├─ Vite bundling                     [~2-3s]
│  └─ Output: dist/ directory
│
├─ Rust Backend (cargo build --release) [~20-30s]
│  ├─ Compilation with optimizations    
│  └─ Output: target/release/nexus-pro.exe
│
├─ NSIS Installer Generation            [~2-3s]
│  ├─ Binary patching
│  ├─ Installer generation
│  └─ Output: bundle/nsis/*.exe
│
└─ MSI Installer Generation             [~2-3s]
   ├─ Binary patching
   ├─ MSI creation
   └─ Output: bundle/msi/*.msi

Total Time: ~35 seconds
```

## Build Variants

### Development Build (Faster, Larger, Debuggable)

```bash
cargo tauri dev
```

- Compiles without optimizations
- Includes debug symbols
- Enables DevTools
- Supports hot reload

Use for: Testing during development

### Release Build (Slower, Smaller, Optimized)

```bash
cargo tauri build
```

- Full optimization passes (O3)
- Smaller executable
- No debug symbols
- Stripped binary

Use for: Distribution to users

### Debug Build (Raw Rust Only)

```bash
cargo build --debug
```

- Compiles Rust without frontend integration
- For backend development only
- Not a valid standalone application

## Configuration Files

### `src-tauri/tauri.conf.json`

Main Tauri configuration:
- Window settings
- Installer configuration
- Bundle identifiers
- Permissions

### `src-tauri/Cargo.toml`

Rust dependencies:
- Tauri framework version
- Backend libraries
- Build options

### `ui/vite.config.ts`

Frontend build configuration:
- Asset handling
- Optimization settings
- Dev server port

### `ui/package.json`

Node.js dependencies:
- Svelte, TypeScript, Vite
- Build scripts
- Dev tools

## Build Optimization

### Current Optimizations

- **Release Profile**: Maximum optimizations (O3)
- **LTO**: Link-time optimization enabled
- **Asset Minification**: CSS and JS minified
- **Gzip Compression**: Assets gzipped
- **Installer Compression**: LZMA 7-zip level

### Potential Improvements

1. **Code Splitting**: Break up 940KB JS chunk
2. **Lazy Loading**: Load UI components on-demand
3. **Tree Shaking**: Remove unused dependencies
4. **Profiling**: Use cargo-flamegraph for hotspots

## Troubleshooting Build Issues

### Issue: "Cannot find npm"

```bash
# Solution: Ensure Node.js is installed and in PATH
node --version
npm --version
```

### Issue: Cargo takes forever to compile

```bash
# Solution: Use incremental compilation
export CARGO_INCREMENTAL=1

# Or check for large dependencies
cargo tree --duplicates
```

### Issue: "Permission denied" on Windows

```bash
# Solution: Run as administrator or use:
cargo clean
cargo tauri build
```

### Issue: WebKit2 errors

```bash
# Solution: Ensure WebKit2 runtime is available
# Windows should have this built-in, but may need:
# - Update Visual Studio Build Tools
# - Reinstall Windows SDK
```

### Issue: Installer generation fails

```bash
# Solution: Check NSIS/MSI tools are installed
# Tauri downloads them automatically, but try:
cargo tauri build --verbose
```

## Build Output

### Executable Details

```
nexus-pro.exe
├─ Version: 0.1.0
├─ Product: NEXUS IDE
├─ Arch: x64 (Windows)
├─ Size: 8.70 MB
└─ Signing: Unsigned (can add certificates)
```

### Installer Details

**NSIS** (`*-setup.exe`)
- Traditional Windows installer
- InstallShield-like interface
- Uninstall support
- Registry entries

**MSI** (`*.msi`)
- Windows Installer format
- Silent installation support
- Group Policy compatible
- Repair/modify options

## Next Steps After Building

### 1. Test the Build

```bash
# Run portable executable
./target/release/nexus-pro.exe

# Or test installer
./target/release/bundle/nsis/NEXUS IDE_0.1.0_x64-setup.exe
```

### 2. Create GitHub Release

```bash
git tag v0.1.0
git push origin v0.1.0

# Then upload artifacts to GitHub Releases
```

### 3. Fix Warnings (Before Release)

```bash
# Fix npm vulnerabilities
npm audit fix --force --prefix ui/

# Rebuild
cargo tauri build
```

### 4. Set Up Auto-Update (Optional)

Implement tauri-plugin-updater for automatic updates.

## Performance Metrics

| Metric | Value |
|--------|-------|
| Build Time | ~35s |
| Exe Size | 8.70 MB |
| Installer Size | 2.45-3.37 MB |
| Startup Time | ~2-3s |
| Memory (Idle) | ~50-100 MB |
| Memory (With File) | ~150-200 MB |

## References

- Tauri Docs: https://docs.tauri.app/
- Vite Docs: https://vitejs.dev/
- Svelte Docs: https://svelte.dev/
- Rust Docs: https://doc.rust-lang.org/

---

**See [`01_BUILD_STATUS.md`](01_BUILD_STATUS.md) for current build artifacts**
