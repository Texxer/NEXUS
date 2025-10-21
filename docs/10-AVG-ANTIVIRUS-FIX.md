# Fix AVG Antivirus Blocking Cargo Build Scripts

## Problem

AVG detected `build-script-build.exe` as **EvoGen** (malware heuristic) and quarantined it.

This blocks all Rust builds because Cargo's proc-macro build scripts execute temporary binaries that AVG flags as suspicious.

## Solution: Add AVG Exclusion

### Step 1: Open AVG

- Look for **AVG** in your system tray (bottom right)
- Click it to open AVG Antivirus

### Step 2: Go to Settings

- Menu → **Settings**
- Look for **Exceptions** or **Exclusions**

### Step 3: Add Exclusion Paths

Add these folders to the **exclusion list**:

```
C:\Users\Michael\.cargo
C:\Users\Michael\OneDrive\generalAI\IDE\target
D:\nexus-final-build
```

**Or (if those paths don't work in AVG):**
Add the specific process:

```
C:\Users\Michael\.rustup\toolchains\stable-x86_64-pc-windows-msvc\bin\cargo.exe
```

### Step 4: Restore Quarantined File

- In AVG, go to **Quarantine**
- Find `build-script-build.exe`
- Click **Restore**

### Step 5: Clear Cargo Cache & Retry Build

```powershell
cd C:\Users\Michael\OneDrive\generalAI\IDE
cargo clean
cargo tauri build
```

---

## Alternative: Disable AVG Temporarily

If adding exclusions doesn't work:

### Option A: Pause AVG Protection

- Click AVG in system tray
- Look for **Pause protection** or **Disable**
- Select "Pause for 15 minutes"
- Run: `cargo tauri build`
- Re-enable after build completes

### Option B: Uninstall AVG Temporarily

- Settings → Apps → Installed Apps
- Find **AVG**
- Click **Uninstall**
- Run: `cargo tauri build`
- Reinstall AVG after

---

## What to Do Right Now

1. **Restore the quarantined file** in AVG
2. **Add the exclusion paths** (preferred - permanent fix)
3. **Run the build command:**

```powershell
cd C:\Users\Michael\OneDrive\generalAI\IDE
cargo clean
cargo tauri build
```

---

## Expected Output After Fix

```
    Compiling proc-macro2 v1.0.101
    Compiling quote v1.0.41
    ...
    Finished `release` profile [optimized] target(s) in 2m 45s

✓ Built desktop app and generated:
  - target/release/NEXUS IDE.exe (8-10 MB)
  - target/release/bundle/msi/NEXUS IDE_0.1.0_x64_en-US.msi
```

---

## Quick Command (if you add exclusion)

```powershell
# Clean previous failed build
cargo clean

# Build full Tauri desktop app
cargo tauri build

# Check output
ls target/release/*.exe
ls target/release/bundle/msi/*.msi
```

---

**Let me know once you've added the exclusion and I can help with the next build!**
