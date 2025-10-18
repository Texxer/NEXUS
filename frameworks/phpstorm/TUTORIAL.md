# PhpStorm - Complete Tutorial

## What is PhpStorm?

PhpStorm is a full-featured IDE for PHP development by JetBrains. It provides intelligent code editing, debugging, testing, and deployment tools optimized for PHP, JavaScript, CSS, HTML, and databases.

**Version**: 2025.2 and later  
**Platform**: Windows, macOS, Linux  
**Language**: PHP (5.3+, including 8.3), JavaScript, TypeScript, HTML, CSS, XML, Databases (SQL)

---

## Installation & Setup

### System Requirements

- **RAM**: 8 GB minimum (16 GB recommended)
- **Disk Space**: 2.5 GB minimum
- **CPU**: Multi-core processor recommended
- **Operating System**: Windows 10+, macOS 11+, Linux
- **Java**: Bundled (JetBrains Runtime)

### Installation Steps

1. Download from [jetbrains.com/phpstorm](https://www.jetbrains.com/phpstorm/)
2. Install via Toolbox App (recommended) or standalone installer
3. On first launch, configure PHP interpreter
4. Optional: Setup debugger (Xdebug) for local debugging

### Configuring PHP Environment

```
Settings > Languages & Frameworks > PHP
1. Select PHP Language Level (5.3 - 8.3)
2. Add or select PHP Interpreter:
   - Local PHP (from system)
   - Docker/Vagrant/WSL
   - Remote via SSH
3. Configure include paths
4. Setup CLI interpreter for scripts
```

---

## Core Features

### 1. Smart Code Editing

- **Code Completion**: Context-aware suggestions for PHP functions, classes, variables
- **Live Templates**: Predefined code snippets (type `for` + Tab for loop)
- **Code Generation**: Alt+Insert to generate getters, setters, constructors
- **Refactoring**: Safely rename, extract methods, move code

### 2. Code Quality Analysis

**Real-time Inspections:**
- Syntax errors highlighted immediately
- Type checking and mismatches
- Unused variables and imports
- Performance warnings

**Quick Fixes:**
- Alt+Enter to apply automatic fixes
- Hover over error to see suggestions

**Static Analysis:**
- Built-in PHP inspections
- Integration with third-party tools:
  - PHP CS Fixer
  - Laravel Pint
  - PHPStan
  - Psalm
  - PHP_CodeSniffer
  - PHP Mess Detector

### 3. Debugging with Xdebug

**Prerequisites:**
- Install Xdebug extension: `pecl install xdebug`
- Add to php.ini: `zend_extension=xdebug.so`
- Configure in PhpStorm: Settings > Languages & Frameworks > PHP > Debug

**Debugging Session:**
```
1. Set breakpoint (click line number)
2. Run > Debug (or Shift+F9)
3. Open PHP page in browser
4. IDE breaks at breakpoint
5. Step through code with F8/F7
6. Inspect variables in Debug panel
```

### 4. Framework Support

#### Laravel
- Artisan command runner in terminal
- Blade template support with syntax highlighting
- Migration and model generation
- Service container inspection

#### Symfony
- Twig template support
- Doctrine ORM integration
- Console command execution
- Service configuration navigation

#### WordPress
- Theme and plugin development
- Hook detection and navigation
- Function reference

#### Others
- Yii, CakePHP, Zend, Magento, etc.

---

## Project Setup

### Creating Your First PHP Project

```
1. File > New Project
2. Select PHP project type
3. Configure:
   - Project name: "HelloPHP"
   - Location: Choose directory
   - PHP Language Level: 8.2+
4. Click "Create"
```

### Project Structure

```
project/
├── index.php           # Entry point
├── includes/           # PHP includes/utilities
├── public/             # Publicly accessible files
├── resources/          # Views, assets
└── vendor/             # Composer dependencies
```

---

## Essential Tools

### 1. Code Editor & Navigation

| Shortcut | Action |
|----------|--------|
| Ctrl+B / Cmd+B | Go to Declaration |
| Ctrl+Alt+B | Go to Implementation |
| Alt+F7 | Find Usages |
| Ctrl+F | Find in File |
| Ctrl+Shift+F | Find in All Files |
| Ctrl+H | Replace |
| Ctrl+Shift+O | Go to Class |
| Ctrl+Shift+A | Action Search |

### 2. Test Framework Integration

**PHPUnit:**
```
1. Configure: Settings > Languages & Frameworks > PHP > Test Frameworks
2. Create test file: tests/MyTest.php
3. Extend PHPUnit\Framework\TestCase
4. Right-click > Run Tests
```

**Example Test:**
```php
<?php
namespace Tests;

use PHPUnit\Framework\TestCase;

class MyTest extends TestCase {
    public function testAddition() {
        $this->assertEquals(4, 2 + 2);
    }
}
```

**Other Frameworks:** Pest, Behat, PHPSpec, Codeception

### 3. Database Tools

**Connect to Database:**
1. View > Tool Windows > Database
2. Click + > New Data Source
3. Configure connection (host, port, username, password)
4. Test connection
5. Browse tables, run queries

**Run SQL Queries:**
- Open .sql file or create new
- Write query
- Ctrl+Enter to execute
- View results in Results tab

### 4. Version Control

**Git Integration:**
- Ctrl+K > Commit changes
- Ctrl+Shift+K > Push
- View > Tool Windows > Git
- Manage branches, view history, resolve conflicts

### 5. Deployment

**Configure Deployment Server:**
```
Settings > Build, Execution, Deployment > Deployment
1. Add new server (SFTP, FTP, SSH, etc.)
2. Configure credentials and paths
3. Set upload paths
4. Enable automatic upload on save (optional)
```

**Deploy Files:**
- Upload: Right-click file > Deployment > Upload
- Download: Right-click file > Deployment > Download
- Sync: Tools > Deployment > Sync

---

## Advanced Features

### Live Templates

**Built-in Examples:**
- `for` → for loop
- `foreach` → foreach loop
- `if` → if statement
- `func` → function declaration
- `class` → class definition

**Create Custom Template:**
1. Settings > Editor > Live Templates
2. Click +, select language (PHP)
3. Define abbreviation and template
4. Use $VAR$ for variables
5. Use $END$ for cursor position

### Code Generation

Press **Alt+Insert** to generate:
- Getters/Setters
- Constructor
- Equals/HashCode
- ToString
- Implement methods

### Composer Integration

**Built-in Composer:**
1. Create/edit `composer.json`
2. Right-click > "Composer" menu
3. Install, update, remove packages
4. PhpStorm updates project structure automatically

**Command Line:**
1. Tools > Composer > Run Composer Command
2. Select command (install, update, require, etc.)
3. Add arguments if needed

### REST Client

**Built-in HTTP Client:**
```
1. Create .http or .rest file
2. Write request:

POST http://localhost:8000/api/users
Content-Type: application/json

{
  "name": "John",
  "email": "john@example.com"
}

3. Press Ctrl+Alt+Enter to execute
```

---

## Workflow Example

### Building a Simple REST API

```
1. Create project structure:
   src/
   ├── controller/
   ├── model/
   └── routes.php
   tests/
   └── ApiTest.php
   public/
   └── index.php

2. Use Laravel Artisan or Composer to set up framework

3. Develop with PhpStorm:
   - Create controller with code generation
   - Write models with ORM support
   - Define routes with navigation support
   - Create unit tests with test runner

4. Debug:
   - Set breakpoints in request handlers
   - Debug > Run with debugger
   - Make HTTP request from REST client
   - Step through code

5. Deploy:
   - Configure deployment server
   - Sync with remote server
   - View logs from deployment server
```

---

## Performance Optimization

### Code Inspection

```
Analyze > Run Inspection by Name
- Unused code analysis
- Performance issues
- Security vulnerabilities
- Code smells
```

### Built-in Profiler

```
Tools > Analyze Running Process
- CPU profiling
- Memory allocation
- Method execution time
```

### Database Performance

```
Tools > Analyze Database Queries
- Query execution plans
- Identify slow queries
- View query statistics
```

---

## Keyboard Shortcuts (Essential)

| Action | Windows/Linux | Mac |
|--------|--------------|-----|
| Open Project | Ctrl+Alt+O | Cmd+O |
| Create File | Ctrl+Alt+Insert | Cmd+Alt+Insert |
| Comment | Ctrl+/ | Cmd+/ |
| Format Code | Ctrl+Alt+L | Cmd+Alt+L |
| Rename | Shift+F6 | Shift+F6 |
| Extract Method | Ctrl+Alt+M | Cmd+Alt+M |
| Run Debug | Shift+F9 | Ctrl+D |
| Commit | Ctrl+K | Cmd+K |
| Push | Ctrl+Shift+K | Cmd+Shift+K |

---

## Tips & Tricks

1. **PHP-CLI Interpreter**: Configure for running scripts without web server
2. **Smart Documentation**: Ctrl+Q to view function documentation
3. **Code Inspection on Demand**: Analyze > Run Inspection
4. **Docker Support**: Develop inside Docker containers
5. **Remote Interpreters**: Debug on remote servers over SSH
6. **Database Schema Navigation**: Ctrl+Shift+O to navigate database objects

---

## Common Issues

### Xdebug Not Working
- Verify Xdebug installed: `php -m | grep Xdebug`
- Check IDE key matches configuration
- Port 9003 must be available
- Firewall may be blocking connection

### Code Inspection Too Aggressive
- Settings > Editor > Inspections
- Disable specific inspections
- Adjust severity levels
- Create inspection profile

### Performance Issues
- File > Invalidate Caches > Invalidate and Restart
- Exclude large folders: Settings > Project > Directories
- Disable unused plugins: Settings > Plugins

---

## Resources

- **Official Docs**: [jetbrains.com/help/phpstorm](https://www.jetbrains.com/help/phpstorm/)
- **Quick Start**: [PhpStorm Features Guide](https://www.jetbrains.com/help/phpstorm/quick-start-guide-phpstorm.html)
- **Laravel Guide**: [jetbrains.com/help/phpstorm/laravel](https://www.jetbrains.com/help/phpstorm/laravel.html)
- **Xdebug Setup**: [xdebug.org](https://xdebug.org/)
- **PHP Official**: [php.net](https://www.php.net/)

