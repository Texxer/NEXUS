# NEXUS Pro - Markdown Style Guide

## Overview
This document defines the consistent markdown style used across all NEXUS Pro documentation.

---

## Heading Hierarchy

### Standard Format
- **H1 (`#`)**: Document title only (once per file)
- **H2 (`##`)**: Major sections (blank line before and after)
- **H3 (`###`)**: Subsections (blank line before, not after)
- **H4+ (`####`)**: Deep nesting (avoid if possible)

### Example

```markdown
# Document Title

## Section One

### Subsection

Content here.

## Section Two
```

---

## Blank Line Rules

| Context | Rule |
|---------|------|
| Before H2 | Always blank line |
| After H2 | Always blank line |
| Before H3 | Always blank line |
| After H3 | NO blank line (content follows) |
| Before lists | Always blank line |
| After lists | Always blank line |
| Before code blocks | Always blank line |
| After code blocks | Always blank line |

---

## Lists

### Unordered Lists
- Use `-` for bullets
- Always blank line before list starts
- Always blank line after list ends
- Nest with 2 spaces

**Good:**
```markdown
Here's a list:

- Item one
- Item two
  - Nested item
  - Another nested

Next paragraph.
```

**Bad:**
```markdown
Here's a list:
- Item one
- Item two
Next paragraph.
```

---

## Code Blocks

### Format
- Triple backticks with language specified
- Blank line before opening backticks
- Blank line after closing backticks

**Good:**
```markdown
Here's code:

```rust
fn main() {
    println!("Hello");
}
```

Next paragraph.
```

**Bad:**
```markdown
Here's code:
```rust
fn main() {
    println!("Hello");
}
```
Next paragraph.
```

---

## Inline Formatting

- `**bold**` for emphasis
- `*italic*` for light emphasis
- `` `code` `` for inline code
- Links: `[text](url)` with no spaces inside brackets

---

## Tables

- Blank line before table
- Blank line after table
- Use standard markdown table format

```markdown
Previous paragraph.

| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |

Next paragraph.
```

---

## Horizontal Rules

- Use `---` (3 hyphens)
- Blank line before
- Blank line after
- Use for major section breaks

---

## Document Structure

```
# Title

Brief intro (1-2 lines)

---

## Section 1

### Subsection 1.1

Content with blank lines between paragraphs.

- Bullet list
- With items

Next paragraph.

---

## Section 2

[Same pattern]
```

---

## Emoji Usage

✅ Use for:
- Status indicators (✅, ⏳, ❌)
- Important callouts (🚀, 💡, ⚠️)
- Section headers (📊, 🎯, 📈)

❌ Don't use:
- Random decoration
- More than 2 per paragraph
- In code blocks

---

## File Naming

- Use `NNN_TITLE_HERE.md` format for numbered docs
- Numbers are 3 digits (001, 002, 012)
- Separate words with underscores
- UPPERCASE for acronyms

Examples:
- `012_IDE_IMPLEMENTATION_PLAN_V2.md`
- `013_NEXUS_PRO_BUSINESS_STRATEGY_V2.md`

---

## Line Length

- Soft wrap at 100 characters for readability
- Code blocks can exceed this

---

## Checklist Items

Use markdown checkboxes:

```markdown
- [ ] Not done
- [x] Completed
```

---

## Footnotes / References

Link to other docs:

```markdown
See [Document Name](./path/to/file.md) for details.
```

---

## Special Sections

### Important Notes
Use blockquotes for warnings:

```markdown
> **⚠️ Warning**: This is important.
```

### Callouts
Use bold for emphasis:

```markdown
**🚀 Next Step**: Do this thing.
```

---

## Examples by Document Type

### Strategy Documents (012, 013, 014)

```markdown
# Title

Brief intro

---

## Executive Summary

Key point one
Key point two

---

## Section One

### Subsection

Content with lists and code blocks as needed.

---

## Section Two

[Pattern continues]
```

### Quick Reference (QUICKSTART, etc.)

```markdown
# Quick Title

## Task 1

Steps:
1. First step
2. Second step

## Task 2

[Pattern continues]
```

---

## Validation

All files should:
- ✅ Have blank lines before H2/H3
- ✅ Have blank lines around lists
- ✅ Have blank lines around code blocks
- ✅ Specify language in code blocks
- ✅ Have consistent heading hierarchy
- ✅ Use proper inline formatting

---

**Last Updated**: October 18, 2025  
**Version**: 1.0
