# Contributing to NEXUS IDE

Thank you for considering contributing to NEXUS IDE! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help create a welcoming environment for all contributors

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/NEXUS.git
   cd NEXUS
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Create a branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### Running the Development Server

```bash
npm run tauri:dev
```

This will start both the Vite development server and the Tauri application with hot-reload enabled.

### Code Style

- **Frontend (TypeScript/Svelte)**:
  - Use 2 spaces for indentation
  - Use single quotes for strings
  - Add semicolons at the end of statements
  - Use TypeScript types where appropriate

- **Backend (Rust)**:
  - Follow Rust standard formatting (use `cargo fmt`)
  - Run `cargo clippy` to catch common mistakes
  - Write clear error messages

### Testing Your Changes

1. **Manual Testing**:
   - Test all features you've modified
   - Try edge cases and error scenarios
   - Test on different platforms if possible

2. **Build Test**:
   ```bash
   npm run build
   npm run tauri:build
   ```

## Submitting Changes

1. **Commit your changes** with clear messages:
   ```bash
   git commit -m "Add feature: description of what you added"
   ```

2. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

3. **Create a Pull Request**:
   - Go to the original NEXUS repository
   - Click "New Pull Request"
   - Select your fork and branch
   - Describe your changes clearly
   - Reference any related issues

## Pull Request Guidelines

- Keep PRs focused on a single feature or fix
- Include a clear description of changes
- Update documentation if needed
- Ensure the code builds successfully
- Test your changes thoroughly

## Areas for Contribution

### High Priority
- Bug fixes and improvements
- Documentation improvements
- Performance optimizations
- Accessibility enhancements

### Feature Requests
- LSP (Language Server Protocol) integration
- Git integration
- Plugin system
- Additional themes
- Keyboard shortcut customization

### Good First Issues
- UI/UX improvements
- Icon additions
- Documentation updates
- Small bug fixes

## Project Structure

```
NEXUS/
├── src/                    # Frontend Svelte/TypeScript code
│   ├── components/         # Reusable UI components
│   ├── stores/            # State management
│   ├── App.svelte         # Main application component
│   └── main.ts            # Application entry point
├── src-tauri/             # Backend Rust code
│   ├── src/
│   │   ├── lib.rs         # Main library with Tauri commands
│   │   └── main.rs        # Application entry point
│   └── Cargo.toml         # Rust dependencies
└── tests/                 # Test files (to be added)
```

## Adding New Features

### Frontend Components
1. Create a new `.svelte` file in `src/components/`
2. Use TypeScript for type safety
3. Follow existing component patterns
4. Add appropriate props and events

### Backend Commands
1. Add new command in `src-tauri/src/lib.rs`
2. Use the `#[tauri::command]` attribute
3. Handle errors appropriately
4. Update command handler registration

### Stores
1. Create or update stores in `src/stores/`
2. Use Svelte's writable stores
3. Export stores and helper functions
4. Document store usage

## Questions?

If you have questions or need help:
- Open an issue on GitHub
- Tag it with "question"
- Provide as much context as possible

## Thank You!

Your contributions help make NEXUS IDE better for everyone. We appreciate your time and effort!
