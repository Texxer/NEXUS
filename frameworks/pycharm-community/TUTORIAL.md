# PyCharm Community - Complete Tutorial

## What is PyCharm Community?

PyCharm Community is a free, open-source Python IDE that provides intelligent code editing, project management, and debugging tools for Python development.

**Version**: 2025.1 and later  
**Platform**: Windows, macOS, Linux  
**Language**: Python (all versions), with support for HTML, CSS, JavaScript

---

## Installation & Setup

### System Requirements

- **RAM**: 4 GB minimum (8 GB recommended)
- **Disk Space**: 2.5 GB
- **CPU**: Multi-core processor
- **Operating System**: Windows 10+, macOS 10.8+, Linux
- **Java**: Bundled (JetBrains Runtime)

### Installation

1. Download from [jetbrains.com/pycharm](https://www.jetbrains.com/pycharm/) (Community Edition)
2. Install via Toolbox App or standalone installer
3. On first launch, configure Python interpreter
4. Create or open a project

### Configure Python Interpreter

```
File > Settings > Project > Python Interpreter
1. Add Interpreter > Add Local Interpreter
2. Choose environment type:
   - Venv (virtual environment)
   - Conda
   - Pipenv
   - System Python
3. Select Python version
4. Confirm installation
```

---

## Core Features

### 1. Code Intelligence

- **Smart Completion**: Type-aware autocompletion
- **Parameter Hints**: See function parameters while typing
- **Documentation Tooltips**: Hover for docstrings
- **Go to Definition**: Ctrl+B to navigate to code origin

### 2. Code Analysis

- **Real-time Inspection**: Syntax, type, and style errors
- **Quick Fixes**: Alt+Enter to apply suggestions
- **Intentions**: Ctrl+Alt+Intro for code improvements
- **PEP 8 Checking**: Code style compliance

### 3. Debugging

- **Breakpoints**: Click line number to set
- **Step Commands**: F10 (step over), F11 (step into)
- **Variable Watch**: Monitor expressions in debugger
- **Evaluate Expression**: Alt+F8 to run code in context

### 4. Testing Support

- **pytest, unittest**: Integrated test runners
- **Coverage**: Measure code coverage
- **Run Tests**: Right-click test > Run or Debug

### 5. Virtual Environment

- **Environment Selection**: Easy switching between environments
- **Dependency Management**: pip/poetry/pipenv integration
- **Auto-discovery**: Automatically finds environments

---

## Project Structure

### Creating Your First Project

```
1. File > New Project
2. Select project type:
   - Pure Python
   - Django (if plugins installed)
   - FastAPI (if plugins installed)
3. Configure:
   - Project name: "HelloPython"
   - Python interpreter: Virtual env or system
4. Click "Create"
```

### Typical Structure

```
project/
├── main.py              # Entry point
├── src/                 # Source code
├── tests/               # Test files
├── requirements.txt     # Dependencies (pip)
└── venv/                # Virtual environment
```

---

## Essential Tools

### 1. File Navigation

| Shortcut | Action |
|----------|--------|
| Ctrl+N | Go to Class |
| Ctrl+Shift+N | Go to File |
| Ctrl+B | Go to Definition |
| Ctrl+Alt+B | Go to Implementation |
| Alt+F7 | Find Usages |
| Ctrl+F | Find in File |
| Ctrl+H | Replace |

### 2. Python Console

**Access**: View > Tool Windows > Python Console

- Interactive Python shell
- Import modules and test code
- Execute statements
- View results immediately

### 3. Project View

- File tree on left side
- Expand/collapse folders
- Right-click for context menu
- Mark folders as excluded/source

### 4. Run Configurations

**Create Configuration:**
1. Run > Edit Configurations
2. Click + > Python
3. Set script path
4. Configure parameters
5. Save configuration

**Run:**
- Shift+F10 to run
- Shift+F9 to debug

### 5. Terminal

**Access**: View > Tool Windows > Terminal (or Ctrl+`)

- Integrated shell
- Run pip commands
- Execute scripts
- Git operations

---

## Development Workflow

### Creating a Simple CLI App

```python
# main.py
def greet(name: str) -> str:
    """Greet someone by name."""
    return f"Hello, {name}!"

if __name__ == "__main__":
    result = greet("World")
    print(result)
```

**Debug:**
1. Set breakpoint in greet()
2. Shift+F9 (Debug main.py)
3. Step through with F11
4. Watch variable values

### Installing Packages

**Option 1: Terminal**
```bash
pip install requests
# PyCharm auto-indexes
```

**Option 2: Settings**
1. Settings > Project > Python Interpreter
2. Click package list +
3. Search and install package

**Option 3: Via requirements.txt**
1. Add to requirements.txt: `requests==2.31.0`
2. Right-click > Install requirements

---

## Advanced Features

### Refactoring

| Action | Shortcut |
|--------|----------|
| Rename | Shift+F6 |
| Extract Variable | Ctrl+Alt+V |
| Extract Method | Ctrl+Alt+M |
| Inline | Ctrl+Alt+N |
| Change Signature | Ctrl+F6 |

### Code Generation

- **Alt+Insert**: Generate docstrings, overrides, properties
- **Generate __init__**: Automatically from class fields
- **Generate test**: Create test class from source

### Version Control

- **Commit**: Ctrl+K
- **Push**: Ctrl+Shift+K
- **Pull**: Ctrl+T
- **View History**: Right-click file > Git > Show History

---

## Testing

### Using pytest

```
tests/test_main.py:
```python
import pytest
from main import greet

def test_greet():
    assert greet("Alice") == "Hello, Alice!"

def test_greet_empty():
    with pytest.raises(ValueError):
        greet("")
```

**Run:**
- Right-click test file > Run pytest
- Right-click specific test > Run
- Shift+F10 to run last config

### Code Coverage

```
1. Run > Run... with Coverage
2. Select configuration
3. View coverage report:
   - Green: covered code
   - Red: uncovered code
   - Yellow: partial coverage
```

---

## Tips & Tricks

1. **Quick Documentation**: Ctrl+Q on any symbol
2. **Parameter Info**: Ctrl+P to see function parameters
3. **Reformat Code**: Ctrl+Alt+L to auto-format
4. **Optimize Imports**: Ctrl+Alt+O to remove unused imports
5. **Run Anything**: Ctrl+Shift+R to run any command
6. **Search Everywhere**: Shift+Shift to search all

---

## Common Tasks

### Setting Up Django (with plugin)

```
1. File > New Project > Django
2. PyCharm auto-configures:
   - Project structure
   - Django support
   - Manage.py integration
3. Run > Run server
4. Access at http://localhost:8000
```

### Database Tools

**Note**: Limited in Community Edition (see PyCharm Professional)

### Remote Development

**SSH Deployment:**
1. Settings > Project > Deployment
2. Add SFTP server
3. Configure credentials
4. Sync files automatically

---

## Performance Optimization

### Disable Unnecessary Inspections

```
Settings > Editor > Inspections
- Uncheck unused inspections
- Adjust severity levels
- Create custom profiles
```

### Exclude Large Directories

```
Right-click folder > Mark Directory as > Excluded
- Speeds up indexing
- Reduces memory usage
```

---

## Keyboard Shortcuts (Essential)

| Action | Windows/Linux | Mac |
|--------|--------------|-----|
| Compile | Ctrl+F9 | Cmd+F9 |
| Run | Shift+F10 | Ctrl+R |
| Debug | Shift+F9 | Ctrl+D |
| Find | Ctrl+F | Cmd+F |
| Replace | Ctrl+H | Cmd+H |
| Commit | Ctrl+K | Cmd+K |
| Push | Ctrl+Shift+K | Cmd+Shift+K |
| Reformat | Ctrl+Alt+L | Cmd+Alt+L |

---

## Resources

- **Official Docs**: [jetbrains.com/help/pycharm](https://www.jetbrains.com/help/pycharm/)
- **Getting Started**: [Quick Start Guide](https://www.jetbrains.com/help/pycharm/quick-start-guide.html)
- **Python Docs**: [python.org](https://www.python.org/)
- **PyCharm Blog**: Latest features and tips
- **Community**: Reddit r/PyCharm, official forums

