# Contributing to Zenith IDE

Thank you for your interest in contributing to Zenith! This guide will help you get started.

## Code of Conduct

Be respectful, inclusive, and professional. We're building this together.

## Getting Started

### Prerequisites

- Rust 1.70+ - Install from [rustup.rs](https://rustup.rs/)

- Node.js 16+ - Download from [nodejs.org](https://nodejs.org/)

- Git - For version control

### Development Setup

1. Clone the repository
   ```bash
   git clone https://github.com/zenith-ide/zenith.git
   cd zenith
   ```

2. Build the Rust core
   ```bash
   cd core
   cargo build --release
   cd ..
   ```

3. Install frontend dependencies
   ```bash
   cd ui
   npm install
   cd ..
   ```

4. Run tests
   ```bash
   # Rust tests
   cd core && cargo test && cd ..
   
   # Frontend tests
   cd ui && npm test && cd ..
   ```

5. Start development server
   ```bash
   npm run dev
   ```

## Commit Style

Follow conventional commits:

```text
type(scope): subject

body

footer
```text
Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`

Examples:

- `feat(editor): add multi-cursor support`

- `fix(analyzer): resolve symbol resolution bug`

- `docs: update architecture guide`

## Pull Request Process

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Make your changes
4. Add tests for new functionality
5. Run `cargo fmt` and `cargo clippy` for Rust code
6. Run `npm run lint` for TypeScript code
7. Push to your fork
8. Create a Pull Request with a clear description

## Areas for Contribution

### High Priority

- [ ] LSP integration for more languages

- [ ] Debugger support (DAP)

- [ ] Performance optimizations

- [ ] Theme system improvements

- [ ] Plugin documentation

### Medium Priority

- [ ] Additional built-in themes

- [ ] Snippet system

- [ ] Git integration enhancements

- [ ] Search and replace features

- [ ] Code folding

### Good First Issues

- Documentation improvements

- Bug fixes

- UI/UX enhancements

- Tests

- Examples

## Testing

### Rust
```bash
cd core
cargo test
cargo test -- --nocapture  # Show println output
```text

### TypeScript
```bash
cd ui
npm test
npm run lint
```text

## Performance

When optimizing:
1. Measure first: `cargo bench`
2. Profile the bottleneck
3. Implement solution
4. Verify improvement
5. Add regression tests

## Documentation

- Update README.md for major changes

- Document public APIs with rustdoc/JSDoc

- Update ARCHITECTURE.md for structural changes

- Add examples in `/docs`

## Release Process

1. Update version in Cargo.toml and package.json
2. Update CHANGELOG.md
3. Create git tag: `git tag v0.1.0`
4. Push tag: `git push origin v0.1.0`
5. Build binaries
6. Create GitHub release with binaries

## Questions?

- Open an issue for bugs

- Start a discussion for ideas

- Check existing issues before opening new ones

- Join our community Discord

Happy coding! 🚀
