# Contributing to NEXUS Pro

Thank you for interest in contributing to NEXUS Pro! This document outlines how to get involved.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the idea, not the person
- Help others learn and grow

## Getting Started

### For Bug Reports

1. Check [existing issues](https://github.com/Texxer/NEXUS/issues)
2. Create a new issue with:
   - Clear description of the bug
   - Steps to reproduce
   - Expected vs actual behavior
   - Your environment (OS, version)

### For Feature Requests

1. Check [GitHub Discussions](https://github.com/Texxer/NEXUS/discussions)
2. Open a discussion describing:
   - What problem it solves
   - Why it's useful
   - Any implementation ideas

### For Code Contributions

1. **Fork** the repository
2. **Create a branch**: `git checkout -b feature/your-feature`
3. **Make changes** following our guidelines
4. **Test thoroughly**: `cargo test && npm test`
5. **Commit with clear messages**: `git commit -m "feat: add xyz"`
6. **Push** to your fork
7. **Create a Pull Request** with description

## Development Setup

See [03-BUILD.md](03-BUILD.md) for building from source.

### Running Tests

```bash
# Run Rust tests
cargo test

# Run UI tests  (when configured)
cd ui && npm test
```

### Code Style

**Rust**
- Use `cargo fmt` to format code
- Follow Rust naming conventions
- Use meaningful variable names

**TypeScript/React**
- Use 2-space indentation
- Follow ESLint rules (if configured)
- Use TypeScript for type safety

**Markdown**
- Use 2-space lists
- Add blank lines around headings
- Wrap links in angle brackets

## Commit Messages

Use conventional commits format:

```
feat: add new feature
fix: resolve bug
docs: update documentation
refactor: improve code structure
test: add test cases
ci: update CI/CD pipeline
chore: maintenance tasks
```

Example:
```
feat: Add syntax highlighting support

- Integrate tree-sitter for language parsing
- Support 5 languages in initial release
- Add theme switching for syntax colors

Closes #123
```

## Pull Request Process

1. **Update docs** if you change functionality
2. **Add tests** for new features
3. **Ensure builds pass**: Check GitHub Actions
4. **Write clear PR description** explaining changes
5. **Respond to review feedback** promptly

### PR Checklist

- [ ] Code compiles without errors
- [ ] Tests pass (existing and new)
- [ ] Documentation updated
- [ ] Commit messages are clear
- [ ] No breaking changes (or clearly documented)

## Project Areas

### Areas Needing Help

- 🎨 **UI/UX** - React components, styling, responsiveness
- 🦀 **Backend** - Rust code analysis, LSP implementation
- 📚 **Documentation** - Guides, tutorials, examples
- 🧪 **Testing** - Unit tests, integration tests
- 🐛 **Bug Fixes** - Issues marked `good-first-issue`

### Current Focus (v0.1.1)

- Stabilizing MVP features
- Improving documentation
- Setting up CI/CD
- Building community feedback

## Questions?

- 📝 **Issues**: <https://github.com/Texxer/NEXUS/issues>
- 💬 **Discussions**: <https://github.com/Texxer/NEXUS/discussions>
- 📧 **Email**: (add if applicable)

---

**We appreciate all contributions, from code to bug reports to documentation!** 🙏
