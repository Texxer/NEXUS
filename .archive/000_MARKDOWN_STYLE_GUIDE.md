# Markdown Style Guide for Casino Project

## Overview

This document establishes the professional markdown standard for all documentation in the Casino project. All written content MUST follow these guidelines.


## 1. Document Structure

### Heading Hierarchy

Use exactly this structure - no exceptions:

```
# Main Title (h1 - only ONE per document)

## Major Section (h2 - top-level sections)

### Subsection (h3 - under major sections)

#### Detail Level (h4 - rarely needed)
```

CORRECT:
```markdown
# Game Animation Guide

## Phase 1: Slots Animation

### Reel Spinning Mechanism
```

INCORRECT:
```markdown
### Game Animation Guide    (Wrong - starts at h3)

# Phase 1: Slots           (Wrong - goes backward)
```


## 2. Text Formatting

### Emphasis Rules

Bold for important concepts:
```markdown
The GSAP library provides professional animations.
```

*Italic for file/folder names or special emphasis:*
```markdown
Edit the *casino.js* file to customize behavior.
```

### NEVER Use Backticks for Inline Code

WRONG:
```markdown
Use `casino.js` to configure the system.
You can't type backticks on Swiss keyboards!
```

CORRECT:
```markdown
Edit the *casino.js* file to configure the system.
Reference the "casino.js" file for options.
The "CONFIG_TIMEOUT" setting controls timing.
```

### Code Blocks - Use Clear Markers

For inline code references in body text, use quotes:

```markdown
Set the "maxBets" variable to 1000.
The "spinReels()" method animates all reels.
Check the "GSAP" library documentation.
```

For actual code blocks, use labeled sections:

```markdown
COMMAND:
npm install gsap

CODE:
function spinReel(element) {
  return AnimationUtils.spinWheel(element, 6, 3.5);
}

JSON:
{
  "timeout": 5000,
  "easing": "power2.out"
}

HTML:
<div class="game-board">
  <div class="reel"></div>
</div>

JS:
const gsap = window.gsap;
gsap.to(".reel", { rotation: 360 });
```


## 3. Lists & Bullets

### Standard Lists

Use 🎯 emoji for all bullet points (not just action items):

CORRECT:
```markdown
🎯 First feature description
🎯 Second feature description
🎯 Third feature description
```

WRONG:
```markdown
- First feature
* Second feature
• Third feature
```

### Numbered Lists (When Order Matters)

```markdown
1. First step in process
2. Second step in process
3. Final step in process
```

### Nested Lists

```markdown
🎯 Main feature
  🎯 Sub-feature A
  🎯 Sub-feature B

🎯 Another feature
  🎯 Related item
```


## 4. Special Notations

### Status Indicators

Use these and ONLY these:

```markdown
✅ Completed
🟡 In progress
⏳ Pending
❌ Failed/Not working
🔧 Under maintenance
```

### Information Boxes

Use tables for structured information:

```markdown
| Item | Status | Notes |
|------|--------|-------|
| Slots | ✅ | Fully animated |
| Dice | ✅ | GSAP integrated |
| Pending | 🟡 | Q4 update |
```

### Notes & Callouts

Use markdown quotes for important information:

```markdown
> ⚠️ WARNING: This setting affects all games!

> 💡 TIP: Use GSAP for smooth animations

> 📌 NOTE: Requires GSAP v3.5+
```


## 5. Links & References

### External Links

```markdown
Visit [GSAP Documentation](https://greensock.com/docs)
```

### Internal File References

Use quotes with full path or just the filename:

```markdown
See the "docs/SETUP-GUIDE.md" file for installation.
Check "casino.js" in the "js/" folder.
Review the "INTEGRATION-EXAMPLES.md" document.
```

### Section Links (within document)

```markdown
See [Installation](#installation) section below.
Refer to [Configuration Options](#configuration-options).
```


## 6. Code Examples

### Proper Code Block Example

```
CODE: JavaScript function example

```javascript
async function initSlots() {
  const reels = document.querySelectorAll(".reel");
  for (const reel of reels) {
    await AnimationUtils.spinReels(reel, 3);
  }
}
```

### Command Line Examples

```
COMMAND: Terminal commands

```bash
npm install
npm run build
npm start
```

### Configuration Examples

```
JSON: Configuration file structure

```json
{
  "games": {
    "slots": {
      "minBet": 20,
      "maxBet": 1000
    }
  }
}
```


## 7. Tables

### Proper Table Format

```markdown
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Value A  | Value B  | Value C  |
| Value D  | Value E  | Value F  |
```

### Alignment

```markdown
| Left | Center | Right |
|:-----|:------:|------:|
| Data | Data   | Data  |
```


## 8. Horizontal Rules

Use for major section breaks:

```markdown
```

This creates a clear visual separation between major sections.


## 9. Images (When Needed)

```markdown
![Alt text describing image](path/to/image.png)

Example:
![GSAP Animation Timeline](docs/images/timeline.png)
```


## 10. Document Metadata

### Front Matter (Optional)

```markdown
# Document Title

Last Updated: October 17, 2025
Status: Production Ready
Version: 1.0


## Content starts here
```

### Footer

```markdown

Generated: October 17, 2025
Status: ✅ Current
```


## 11. Common Mistakes to Avoid

### ❌ WRONG EXAMPLES

```markdown
❌ Don't use `backticks` for inline code
❌ Don't mix bullet styles: - * •
❌ Don't create h1 multiple times
❌ Don't use HTML when markdown works
❌ Don't indent code blocks with spaces
❌ Don't create 10 heading levels
❌ Don't mix emoji with text bullets
```

### ✅ CORRECT EXAMPLES

```markdown
✅ Use quotes for inline: "function()"
✅ Use 🎯 for all bullets consistently
✅ One h1 per document as the title
✅ Use markdown for everything
✅ Use code block markers: CODE:, COMMAND:, JSON:
✅ Use h1 for main, h2 for sections, h3 for subsections
✅ Use 🎯 emoji ONLY for bullets
```


## 12. File Naming Conventions

### Documentation Files

```
README.md                    Main overview
SETUP-GUIDE.md              Installation guide
PROJECT-STATUS.md           Status tracking
INTEGRATION-EXAMPLES.md     Code examples
IMPROVEMENT-GUIDE.md        Best practices
PHASE-2-ANIMATIONS.md       Feature documentation
```

### No Root .md Files

All markdown files belong in:
- `docs/` → Main documentation
- `docs/archive/` → Old/reference files
- `docs/games/` → Game-specific docs
- `docs/design/` → Design docs

Root markdown files are not acceptable!


## 13. File Organization

### Proper Document Location

```
Casino/
├── docs/
│   ├── README.md                    ✅
│   ├── SETUP-GUIDE.md               ✅
│   ├── PROJECT-STATUS.md            ✅
│   ├── INTEGRATION-EXAMPLES.md       ✅
│   ├── IMPROVEMENT-GUIDE.md          ✅
│   ├── COPYRIGHT.md                  ✅
│   ├── MARKDOWN-STYLE-GUIDE.md       ✅
│   │
│   ├── archive/
│   │   ├── Old_Documentation.md      ✅
│   │   └── Legacy_Notes.md           ✅
│   │
│   ├── games/
│   │   └── Game_Documentation.md     ✅
│   │
│   └── design/
│       └── Design_Documentation.md   ✅
│
├── config/
│   └── casino-qa.yml               ✅ (YAML, not MD)
│
├── deps/
│   └── requirements.txt             ✅ (Text, not MD)
│
└── scripts/
    └── cleanup_project.py           ✅ (Python, not MD)
```


## 14. Content Guidelines

### Writing Style

🎯 Be clear and concise
🎯 Use active voice
🎯 Define technical terms on first use
🎯 Provide examples
🎯 Link to related documentation

### Tone

- Professional but friendly
- Technical but accessible
- Informative but not verbose
- Consistent throughout

### Structure Each Document

```markdown
# Main Title

Brief description (1-2 sentences)

## Overview
(What is this about?)

## Getting Started
(How to begin?)

## Detailed Sections
(Main content)

## Troubleshooting
(Common issues and solutions)

## See Also
(Related documentation)


Generated: [Date]
Status: [Status]
```


## 15. Review Checklist

Before publishing any markdown:

- [ ] No backticks for inline code (use quotes instead)
- [ ] All bullets use 🎯 emoji
- [ ] Heading hierarchy is correct (h1 once, then h2→h3)
- [ ] No .md files in root directory
- [ ] All links are valid or marked as broken
- [ ] Code examples use labeled blocks (CODE:, COMMAND:, JSON:)
- [ ] Tables are properly formatted
- [ ] Status indicators are consistent (✅ 🟡 ⏳ ❌)
- [ ] No inline HTML (use markdown instead)
- [ ] File is in correct folder (docs/ or subfolder)
- [ ] Content is up to date
- [ ] No spelling errors


## 16. Examples by Document Type

### Quick Start Guide

```markdown
# Quick Start Guide

Time Required: 5 minutes
Difficulty: Beginner

## Prerequisites

🎯 Node.js 14+
🎯 Modern web browser
🎯 Text editor

## Installation

1. Clone the repository
2. Install dependencies
3. Start the server

## Next Steps

See [SETUP-GUIDE.md](SETUP-GUIDE.md) for detailed setup.


Generated: October 17, 2025
```

### Technical Reference

```markdown
# Technical Reference

## Configuration

### Settings Object

The "settings" object controls:

🎯 "timeout" - Operation timeout in milliseconds
🎯 "maxRetries" - Maximum retry attempts
🎯 "easing" - Animation easing function

CODE:
```javascript
const settings = {
  timeout: 5000,
  maxRetries: 3,
  easing: "power2.out"
};
```


Generated: October 17, 2025
```


## 17. Swiss Keyboard Users

### Important Notes

✅ All inline code uses quotes ("code") - NO backticks
✅ Code blocks marked with labels - Backticks auto-generated
✅ All documentation is keyboard-accessible
✅ Use quotes for any file/function references in text

🎯 You never need to type a backtick!

## 18. Formatting Rules - CRITICAL

### NO Horizontal Rules

❌ NEVER use --- (horizontal rule)
❌ NEVER use ** (bold emphasis)

Use heading hierarchy instead for visual separation.

### Text Emphasis ONLY

Use *italic* for file names and special emphasis:
- *casino.js* (file reference)
- *important concept* (emphasis)
- *configuration value* (special term)

## 19. Comprehensive Emoji Reference List

### Status & Completion (Use for progress tracking)

✅ Complete/Done/Success/Verified
🟡 In Progress/Partial/Caution/Working
⏳ Pending/Waiting/Queued
❌ Failed/Error/Not Working/Blocked
🔧 Under Maintenance/Needs Work
🔄 Updated/Refreshed/Changed
⚠️ Warning/Important/Critical

### Actions & Checkmarks

✔️ Approved/Accepted
☑️ Checked/Selected
🆗 Confirmed/OK
👍 Good/Thumbs Up
👎 Bad/Thumbs Down
✋ Stop/Hold/Wait

### Communication & Feedback

💬 Comment/Discussion/Chat
📢 Announcement/Alert/Notice
📣 Shout/Important Message
💭 Thought/Idea/Consider
🗣️ Speaking/Voice
📝 Note/Documentation/Write

### Indicators & Markers

🎯 Target/Goal/Objective/Action Item
📌 Important/Pin/Mark
🏷️ Label/Tag/Category
📍 Location/Position/Here
🔹 Point/Bullet (alternative)
🔸 Important Point
▶️ Next/Forward/Play
◀️ Previous/Back
🔄 Cycle/Refresh/Update
♻️ Recycle/Reuse

### Development & Code

💻 Computer/Code/Programming
🖥️ Desktop/Server
📱 Mobile/Phone
⚙️ Settings/Configuration
🔧 Tools/Fix/Maintenance
🔨 Build/Construction
📦 Package/Deploy
🚀 Launch/Deploy/Go Live
🐛 Bug/Issue
🎨 Design/Style
🎭 Version/Release

### Success & Quality

✨ Excellent/Polish/Quality
⭐ Feature/Notable/Important
🏆 Achievement/Best
🎖️ Award/Recognition
🏅 Second Place/Good Job
💎 Premium/Valuable
🌟 Star/Featured

### Games & Casino (Project-specific)

🎰 Slots Game
🎲 Dice/Gaming
🃏 Cards/Playing
🎯 Target/Aim/Roulette
🎪 Carnival/Entertainment
🏃 Speed/Action
💰 Money/Betting/Winnings
🤑 Money Face/Profit

### Navigation & Direction

⬆️ Up/Increase/Boost
⬇️ Down/Decrease/Lower
⬅️ Left/Previous
➡️ Right/Next
↔️ Both/Either/Choice
🔝 Top/Beginning
🔚 End/Finish

### Timing & Duration

⏱️ Timer/Stopwatch/Time
⏰ Clock/Alarm
🕐 Time Reference
⌛ Time Passing/Patience
⏳ Waiting/Loading
🔔 Notification/Bell

### Information & Help

ℹ️ Information/Details
❓ Question/Help
❔ Question (alternative)
❕ Exclamation
⚠️ Warning/Caution
🚫 Prohibited/No
🔒 Locked/Secure
🔓 Unlocked/Open

### Productivity & Organization

📋 List/Checklist/Form
📊 Data/Chart/Analytics
📈 Growth/Increase/Up
📉 Decline/Decrease/Down
🗂️ Files/Organization
📁 Folder/Directory
📂 Open Folder
✉️ Email/Message

### Celebration & Emotion

🎉 Party/Success/Celebration
🎊 Celebration/Festive
🎈 Balloon/Festive
🎁 Gift/Reward
😊 Happy/Positive
😂 Laughing/Funny
🤗 Hug/Welcome
❤️ Love/Heart/Important

### Nature & Elements

🔥 Hot/Critical/Trending
❄️ Cold/Cool/Chill
💧 Drop/Small/Minimal
💨 Wind/Fast/Quick
⚡ Lightning/Fast/Energy
🌟 Star/Shine


## Final Summary

DO:
✅ Use 🎯 for bullet points
✅ Use quotes for inline code
✅ Use h1 once per document
✅ Keep .md files in docs/
✅ Use clear section structure
✅ Label code blocks (CODE:, COMMAND:, JSON:)
✅ Use status indicators (✅ 🟡 ⏳)

DON'T:
❌ Use backticks for inline code
❌ Mix bullet styles
❌ Put .md files in root
❌ Create confusing heading hierarchy
❌ Use HTML when markdown works
❌ Forget to label code blocks
❌ Use unlabeled or vague notation


Version: 1.0
Last Updated: October 17, 2025
Status: ✅ Official Style Guide
