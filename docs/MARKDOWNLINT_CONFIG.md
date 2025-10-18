# Markdownlint Configuration for NEXUS Pro

Based on [vscode-markdownlint](https://github.com/DavidAnson/vscode-markdownlint)

## Configuration Rules

### Enabled Rules

| Rule | Setting | Purpose |
|------|---------|---------|
| MD022 | lines: 1 | Headings surrounded by blank lines |
| MD032 | lists: true | Lists surrounded by blank lines |
| MD013 | line_length: 120 | Soft wrap at 120 chars |

### Disabled Rules

| Rule | Reason |
|------|--------|
| MD040 | Code language not required in fenced blocks |
| MD026 | No punctuation restriction in headings |

## Best Practices Applied

✅ Blank lines before/after headings  
✅ Blank lines around lists  
✅ Consistent indentation (2 spaces)  
✅ Code blocks with language hints  
✅ Tables for structured data  
✅ Emoji for visual hierarchy  

## Integration with NEXUS Pro Docs

All markdown files follow this standard configuration to ensure:

- Consistent formatting across all documents
- Better readability
- Proper rendering in GitHub/web viewers
- Clean git diffs

