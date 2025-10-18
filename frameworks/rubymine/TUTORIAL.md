# RubyMine - Ruby IDE Tutorial

## What is RubyMine?

RubyMine is a full-featured IDE for Ruby and Ruby on Rails development by JetBrains. It provides intelligent code editing, debugging, testing, and Rails-specific tools.

**Language**: Ruby 1.8.7+  
**Frameworks**: Rails, Sinatra, RSpec, Cucumber  
**Version**: 2025.2 and later  
**Platform**: Windows, macOS, Linux

---

## Quick Start

### Installation

1. Download from [jetbrains.com/rubymine](https://www.jetbrains.com/rubymine/)
2. Install Ruby and Ruby on Rails (or use rbenv)
3. Install RubyMine via Toolbox
4. Configure Ruby SDK on launch

### Create Rails Project

```
1. File > New Project > Rails
2. Configure:
   - Project name: "blog_app"
   - Ruby version: Select from list
   - Database: SQLite, PostgreSQL, etc.
3. Click Create
```

### Generate Resources

```bash
# Generate model
rails generate model User name:string email:string

# Generate controller
rails generate controller Pages home about

# Generate scaffold
rails generate scaffold Post title:string content:text
```

---

## Key Features

### Code Intelligence

- Ruby syntax highlighting
- ERB template support
- Rails helper completion
- Gem reference documentation

### Debugging

- Breakpoints with conditions
- Step execution
- Variable inspection
- Rails console access
- Debug Rails requests

### Testing

- RSpec framework integration
- Cucumber/Gherkin support
- Run tests from gutter
- Coverage analysis

### Rails Tools

- Routes navigation
- View/Controller association
- Model/Database schema sync
- Rake tasks integration

### Refactoring

- Rename safely across views
- Extract method/partial
- Move code between files
- Introduction variables

---

## Workflow Example

### Building Blog Application

```
1. Generate scaffold:
   rails generate scaffold Post title:string content:text

2. Migrate database:
   rake db:migrate

3. Create model associations:
   has_many :comments

4. Generate controller actions:
   Custom CRUD methods

5. Create views with RubyMine ERB support

6. Debug in browser:
   Run > Debug 'rails server'
   Set breakpoints in controller

7. Test:
   Run > Run RSpec
   View results and coverage
```

---

## Common Tasks

### Database Management

- View schema in IDE
- Run migrations from IDE
- Query database directly

### Gem Management

- View Gemfile dependencies
- Add gems with IDE assistant
- Bundle install integration

### Running Server

- Run > Run 'rails server'
- View logs in console
- Debug requests

### Testing

- Run individual tests from gutter
- Run entire test suite
- Coverage analysis
- Benchmark tests

---

## Resources

- Official Docs: [jetbrains.com/help/rubymine](https://www.jetbrains.com/help/rubymine/)
- Ruby: [ruby-lang.org](https://ruby-lang.org/)
- Rails: [rubyonrails.org](https://rubyonrails.org/)
- RSpec: [rspec.info](https://rspec.info/)
