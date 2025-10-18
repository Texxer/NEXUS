# WebStorm - JavaScript/TypeScript IDE Tutorial

## What is WebStorm?

WebStorm is a full-featured IDE for JavaScript and TypeScript development by JetBrains. It provides intelligent code editing, debugging, testing, and framework support for modern web development.

**Languages**: JavaScript, TypeScript, HTML, CSS, JSON  
**Frameworks**: React, Vue, Angular, Next.js, Nuxt, Svelte  
**Version**: 2025.1 and later  
**Platform**: Windows, macOS, Linux

---

## Quick Start

### Installation
1. Download from [jetbrains.com/webstorm](https://www.jetbrains.com/webstorm/)
2. Install Node.js from [nodejs.org](https://nodejs.org/)
3. Install WebStorm via Toolbox
4. Configure Node interpreter on launch

### Create Web Project

**React Project:**
```
1. File > New Project > React
2. Configure with TypeScript (recommended)
3. Click Create
WebStorm runs: npx create-react-app
```

**Vue Project:**
```
1. File > New Project > Vue
2. Select Vue version (3 recommended)
3. Click Create
WebStorm runs: npm create vue@latest
```

### Run Development Server

```
1. Terminal: npm run dev
   Or Run > Run 'dev'
2. Browser opens at localhost:3000
3. Changes auto-reload
```

---

## Key Features

### Code Intelligence
- Code completion for JavaScript/TypeScript
- Component prop suggestions
- CSS class/ID completion
- Framework-specific helpers
- Library documentation

### Debugging
- Breakpoints in code
- Step debugging
- Watch expressions
- Console access
- Browser DevTools integration

### Testing
- Jest integration
- Vitest support
- Test runner in gutter
- Coverage analysis
- Debug tests

### Frameworks
- **React**: JSX, hooks, component navigation
- **Vue**: Template syntax, v-directives
- **Angular**: Decorators, dependency injection
- **TypeScript**: Type checking, type definitions

### Package Management
- npm, yarn, pnpm support
- Dependency visualization
- Version management
- Security audit integration

---

## Workflow Example

### Building React Component

```typescript
// components/Button.tsx
import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  onClick, 
  children 
}) => (
  <button onClick={onClick}>
    {children}
  </button>
);
```

**Features while coding:**
- Auto-import component
- Type hints for props
- JSX syntax highlighting
- Go-to definition for dependencies

### Testing Component

```typescript
// components/Button.test.tsx
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

test('renders button', () => {
  render(<Button onClick={() => {}}>Click me</Button>);
  expect(screen.getByRole('button')).toBeInTheDocument();
});
```

**Run**: Right-click test > Run  
**Debug**: Right-click test > Debug

---

## Common Tasks

### Creating API Integration

```
1. Create fetch/axios client
2. WebStorm auto-suggests:
   - Response types
   - Error handling
3. Use types in components
4. Test with mock data
```

### CSS Styling

```
1. Style modules or Tailwind
2. Class name auto-completion
3. Color picker for colors
4. CSS variable references
```

### Environment Variables

```
1. Create .env files
2. WebStorm recognizes variables
3. Code completion in process.env
4. Type-safe environment setup
```

### Debugging in Browser

```
1. Run > Debug 'npm run dev'
2. Set breakpoints in code
3. Browser breakpoints pause execution
4. Inspect variables in DevTools
5. Console access in IDE
```

---

## Keyboard Shortcuts

| Action | Windows/Linux | Mac |
|--------|--------------|-----|
| Run | Shift+F10 | Ctrl+R |
| Debug | Shift+F9 | Ctrl+D |
| Test | Shift+F10 | Ctrl+R |
| Format | Ctrl+Alt+L | Cmd+Alt+L |
| Rename | Shift+F6 | Shift+F6 |
| Find | Ctrl+F | Cmd+F |
| Replace | Ctrl+H | Cmd+H |
| Commit | Ctrl+K | Cmd+K |

---

## Resources
- Official Docs: [jetbrains.com/help/webstorm](https://www.jetbrains.com/help/webstorm/)
- JavaScript: [javascript.info](https://javascript.info/)
- TypeScript: [typescriptlang.org](https://www.typescriptlang.org/)
- React: [react.dev](https://react.dev/)
- Vue: [vuejs.org](https://vuejs.org/)
- Node.js: [nodejs.org](https://nodejs.org/)
