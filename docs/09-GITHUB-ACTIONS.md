# GitHub Actions & Automated Releases

NEXUS Pro uses GitHub Actions for continuous integration and automated release deployment.

## How It Works

### Automated Release Workflow

**File**: `.github/workflows/build-release.yml`

**Trigger**: Push a git tag (e.g., `v0.1.1`, `v0.1.2`)

**Process**:

1. Checkout code
2. Setup Rust toolchain + Node.js
3. Install npm dependencies
4. Build React UI (`npm run build`)
5. Build Tauri application (`cargo build --release`)
6. Create GitHub release
7. Upload binary automatically

---

## For Users: Getting Releases

### Manual Tracking

1. Visit [GitHub Releases](https://github.com/Texxer/NEXUS/releases)
2. Download the latest `nexus-pro-v*.exe`
3. Run it - no installation needed!

### Automatic Updates (Future)

*In v0.2.0+, we'll add in-app update checking*

---

## For Developers: Creating Releases

### Release Process (3 steps!)

```bash
# 1. Make your changes and commit
git add .
git commit -m "feat: add amazing feature"

# 2. Create a version tag
git tag -a v0.1.2 -m "Release v0.1.2: Feature description"

# 3. Push (this triggers GitHub Actions!)
git push origin main
git push origin v0.1.2
```

### GitHub Actions Does The Rest!

- ✅ Builds on GitHub servers
- ✅ Creates release automatically
- ✅ Uploads binary to Releases page
- ✅ No local compilation needed

---

## Release Versioning

### Version Format

**`v<MAJOR>.<MINOR>.<PATCH>`**

Examples:
- `v0.1.0` - First release
- `v0.1.1` - Bug fix
- `v0.2.0` - New features
- `v1.0.0` - Stable release

### Semantic Versioning

- **MAJOR**: Major features/breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes only

### Tagging Convention

```bash
# New feature release
git tag -a v0.1.2 -m "Release v0.1.2

Features:
- Syntax highlighting
- Code completions

Fixes:
- Performance improvements
- UI polish"

# Bug fix only
git tag -a v0.1.1 -m "Release v0.1.1 - Bug fixes"

# Major release
git tag -a v1.0.0 -m "Release v1.0.0 - Stable!"
```

---

## Release Notes Template

When creating a release tag, use this format:

```
Release v0.1.2 - Feature Title

## What's New

### Features
- Feature 1 description
- Feature 2 description

### Fixes
- Fix 1 description
- Fix 2 description

### Technical Changes
- Backend improvement
- Performance optimization

## Downloads

**Windows**: nexus-pro-v0.1.2.exe (7.98 MB)

## Installation

1. Download the EXE
2. Run it - no installation needed!
3. Start coding

## Documentation

See [docs/](https://github.com/Texxer/NEXUS/tree/main/docs) for guides.
```

---

## Build Requirements

For GitHub Actions to work:

### Repository Setup

- ✅ `.github/workflows/build-release.yml` - workflow file
- ✅ Rust toolchain configured
- ✅ Node.js for UI build
- ✅ Cargo.toml properly configured

### Workflow Permissions

GitHub Actions needs:
- ✅ Read code
- ✅ Create releases
- ✅ Upload artifacts

*These are enabled by default for public repos*

---

## Troubleshooting

### Build Fails in GitHub Actions

**Check**:

1. Local build works: `cargo build --release`
2. UI builds: `cd ui && npm run build`
3. All dependencies installed
4. Rust version is stable

### Release Not Appearing

**Check**:

1. Tag was pushed: `git push origin v0.1.x`
2. Workflow file exists: `.github/workflows/build-release.yml`
3. GitHub Actions is enabled in repo settings
4. Check workflow logs for errors

### Binary Not Uploading

**Check**:

1. Binary name matches: `nexus-pro-v*.exe`
2. Built in release folder: `target/release/`
3. Workflow upload step configured correctly

---

## Next Steps

1. **For next release**: Follow the 3-step process above
2. **Monitor builds**: Check GitHub Actions tab
3. **Share releases**: Announce in GitHub Discussions
4. **Collect feedback**: Enable GitHub Issues & Discussions

---

*Questions?* See [GitHub Actions documentation](https://docs.github.com/en/actions)
