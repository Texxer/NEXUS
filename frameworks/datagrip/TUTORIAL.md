# DataGrip - Database IDE Tutorial

## What is DataGrip?

DataGrip is a dedicated IDE for SQL development and database management by JetBrains. It supports all major database systems and provides intelligent SQL editing, querying, and administration tools.

**Supports**: PostgreSQL, MySQL, MariaDB, Oracle, SQL Server, SQLite, and 20+ other databases  
**Version**: 2025.2 and later  
**Platform**: Windows, macOS, Linux

---

## Quick Start

### Installation

1. Download from [jetbrains.com/datagrip](https://www.jetbrains.com/datagrip/)
2. Install via Toolbox App or standalone
3. Launch and configure database connection

### Connect to Database

1. **Create Data Source**:
   - Click "Database" icon in left sidebar
   - Click + > Data Source > Select database type
   - Enter host, port, user, password
   - Test Connection
   - Click OK

2. **Browse Database**:
   - View tables, schemas, procedures
   - Right-click for context menu
   - View table data, create queries

### Write & Run Queries

**Creating Query File:**

1. Right-click data source > New > Query
2. Write SQL: `SELECT * FROM users;`
3. Press Ctrl+Enter or click Run button
4. View results below

**Features:**

- SQL syntax highlighting and validation
- Code completion for table names, columns
- Parameter hints for functions
- Format code: Ctrl+Alt+L

---

## Key Features

### Database Explorer

- Visual database structure navigation
- Search across all objects
- Drag table names into queries

### Query Console

- Execute multiple statements
- See results in separate tabs
- Export results to CSV, JSON, SQL
- Parameter substitution

### Data Editor

- Browse table data with sorting/filtering
- Edit data directly in grid
- Add/delete rows
- Commit changes to database

### Schema Tools

- Create/edit tables visually
- Manage columns, indexes, constraints
- View foreign key relationships
- Schema comparison and migration

### Version Control Integration

- Commit/push database changes
- Track DDL changes
- Git integration for scripts

---

## Workflow Example

```
1. Create table:
   CREATE TABLE users (
     id INT PRIMARY KEY AUTO_INCREMENT,
     name VARCHAR(100),
     email VARCHAR(100)
   );

2. Insert data:
   INSERT INTO users (name, email) 
   VALUES ('John', 'john@example.com');

3. Query:
   SELECT * FROM users 
   WHERE name LIKE '%John%';

4. Export results to CSV
5. Create index for performance
```

---

## Resources

- Docs: [jetbrains.com/help/datagrip](https://www.jetbrains.com/help/datagrip/)
- SQL Reference: Each database vendor's docs
