# Markdownlint Configuration for NEXUS Pro

Based on [vscode-markdownlint](https://github.com/DavidAnson/vscode-markdownlint#configure)

See: [All Rules](https://github.com/DavidAnson/markdownlint/blob/main/README.md#rules)

## Configuration Rules

### Enabled Rules

| Rule | Setting | Purpose |
|------|---------|---------|
| MD003 | style: consistent | Heading style consistency (# not ##) |
| MD004 | style: consistent | List marker consistency (- not *) |
| MD007 | indent: 2 | List indentation (2 spaces) |
| MD013 | line_length: 120 | Soft wrap at 120 chars (code: 120) |
| MD024 | siblings_only | Allow duplicate heading names in different sections |
| MD022 | lines: 1 | Headings surrounded by blank lines (default) |
| MD032 | lists: true | Lists surrounded by blank lines (default) |

### Disabled/Custom Rules

| Rule | Setting | Reason |
|------|---------|--------|
| MD025 | false | Allow first-line heading variation |
| MD033 | false | Allow inline HTML (needed for badges, tables) |
| MD040 | false | Code language not required in fenced blocks |
| MD041 | false | First line doesn't need to be heading |

## Best Practices Applied

✅ Blank lines before/after headings (MD022)  
✅ Blank lines around lists (MD032)  
✅ Consistent heading style (MD003: # only)  
✅ Consistent list markers (MD004: - only)  
✅ Consistent list indentation (MD007: 2 spaces)  
✅ Line length limit (MD013: 120 chars)  
✅ Code blocks with language hints  
✅ Tables for structured data  
✅ Emoji for visual hierarchy  
✅ Inline HTML for badges and styling  

## Integration with NEXUS Pro Docs

All markdown files follow this standard configuration to ensure:

- Consistent formatting across all documents
- Better readability and maintenance
- Proper rendering in GitHub/web viewers
- Clean git diffs (no formatting churn)
- Professional documentation appearance
- Compliance with markdown best practices

