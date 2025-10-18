# Android Studio - Complete Tutorial

## What is Android Studio?

Android Studio is the official, full-featured IDE for Android app development. It provides powerful code editing, debugging, and deployment tools optimized for building Android applications.

**Version**: 2025.1.4 and later  
**Platform**: Windows, macOS, Linux, ChromeOS  
**Language**: Java, Kotlin, C/C++, XML, HTML, CSS

---

## Installation & Setup

### System Requirements

- **RAM**: 8 GB minimum (16 GB recommended)
- **Disk Space**: 3.5 GB minimum (SSD recommended for 5+ GB)
- **CPU**: Multi-core processor recommended
- **Operating System**: Windows 10+, macOS 12.0+, Linux (Ubuntu LTS/Fedora), ChromeOS

### Installation Steps

1. Download from [developer.android.com/studio](https://developer.android.com/studio)
2. Run the installer for your platform (`.exe` for Windows, `.dmg` for Mac, `.tar.gz` for Linux)
3. Follow the setup wizard
4. Configure Android SDK and emulator during first-run setup

### Quick Configuration

After installation:
- Set up an Android device emulator
- Configure the Android SDK from `Settings > Appearance & Behavior > System Settings > Android SDK`
- Install required SDK platforms and tools

---

## Core Features

### 1. Intelligent Code Editor

- **Code Completion**: Context-aware suggestions for Kotlin, Java, and C/C++
- **Syntax Highlighting**: Full support for Android-specific XML and Java/Kotlin
- **Live Edit**: See Compose UI changes reflected immediately during editing
- **Quick Fixes**: Alt+Enter for instant code corrections

**Example**: Start typing `onCreate` and Android Studio will suggest the complete method signature.

### 2. Design Tools

- **Layout Editor**: Visual drag-and-drop UI builder with live preview
- **Jetpack Compose Preview**: Real-time preview of Compose layouts
- **Constraint Layout Support**: Build responsive designs for any screen size
- **Animation Inspector**: Inspect and debug Compose animations

### 3. Flexible Build System (Gradle)

- **Multiple Build Variants**: Generate different app versions from single codebase
- **Build Analyzer**: Visualize build time bottlenecks and optimize builds
- **Module Support**: Organize code into logical, reusable modules
- **Custom Configuration**: Fine-grained control over build process

### 4. Android Emulator

- **Multiple Device Profiles**: Test on phones, tablets, foldables, Wear OS, TV, ChromeOS
- **Fast Performance**: Hardware acceleration and snapshots for quick testing
- **Gesture Support**: Simulate touch, swipes, rotations, and hardware buttons
- **Network Simulation**: Test different connectivity scenarios

### 5. Gemini AI Assistant

- **Code Generation**: AI-powered code suggestions for Android development
- **Bug Fixing**: Automatic detection and fixing of common Android issues
- **Documentation Q&A**: Ask questions about Android development patterns

---

## Workflow

### Creating Your First Android App

```
1. File > New > New Project
2. Select "Empty Activity" template
3. Configure project:
   - Name: "Hello World"
   - Package: "com.example.helloworld"
   - Language: Kotlin or Java
   - Minimum API: API 24 (Android 7.0+)
4. Click "Finish"
```

### Understanding the Project Structure

```
app/
├── manifests/
│   └── AndroidManifest.xml          # App configuration
├── java/
│   └── MainActivity.kt              # App entry point
├── res/
│   ├── layout/
│   │   └── activity_main.xml        # UI layouts
│   ├── values/
│   │   └── strings.xml              # String resources
│   └── drawable/                    # Images and graphics
└── build.gradle.kts                 # Build configuration
```

### Running Your App

1. **Create Virtual Device** (if not exists):
   - Tools > Device Manager > Create Device
   - Select device model and Android version

2. **Run on Emulator**:
   - Click green play icon (Run)
   - Select target device
   - App launches in emulator

3. **Debug**:
   - Set breakpoints (click left margin)
   - Run > Debug 'app' (Shift+F9)
   - Step through code with F8 (step over) or F7 (step into)

---

## Essential Tools

### Android Profiler
- **Memory Profiler**: Track heap usage and detect memory leaks
- **CPU Profiler**: Analyze which code consumes CPU time
- **Network Profiler**: Monitor network requests
- **Energy Profiler**: Check battery drain

*Access*: View > Tool Windows > Profiler

### Database Inspector
- View SQLite databases in real-time
- Query and modify database content
- Useful for debugging data issues

*Access*: View > Tool Windows > Database Inspector

### Logcat
- Monitor app logs and system messages
- Filter by package name, log level, or search term
- Essential for debugging

*Access*: View > Tool Windows > Logcat (or press `Alt+6`)

### Layout Inspector
- Inspect live UI hierarchy
- View properties of layout elements
- Identify UI performance issues

*Access*: Tools > Layout Inspector

### APK Analyzer
- Analyze app size and content
- Find opportunities to reduce APK size
- Compare versions to track size changes

*Access*: Build > Analyze APK

---

## Advanced Features

### Version Control Integration

Android Studio integrates with Git:
- **Commit Changes**: Ctrl+K (Windows/Linux) or Cmd+K (Mac)
- **Push**: Ctrl+Shift+K (Windows/Linux)
- **Pull**: Ctrl+T (Windows/Linux)
- **View History**: Right-click file > Git > Show History
- **Branches**: VCS > Git > Manage Branches

### Testing Framework Integration

- **Unit Testing**: Built-in support for JUnit, Mockito
- **UI Testing**: Espresso framework for automated UI tests
- **Run Tests**: Right-click test class > Run

### Jetpack Libraries

Android Studio simplifies using Google's Jetpack libraries:
- **Lifecycle**: Manage app component lifecycle
- **Room**: SQLite abstraction layer
- **Navigation**: Handle in-app navigation
- **ViewModel**: Retain data across configuration changes
- **Compose**: Modern declarative UI framework

### Cloud Integration

- **Firebase Integration**: Built-in Firebase Assistant
- **Google Cloud**: Deploy to Google Cloud Platform
- **Android Studio Cloud**: Code in browser, skip local installation

---

## Keyboard Shortcuts

| Action | Windows/Linux | Mac |
|--------|--------------|-----|
| Run app | Shift+F10 | Ctrl+R |
| Debug app | Shift+F9 | Ctrl+D |
| Build project | Ctrl+F9 | Cmd+F9 |
| Find | Ctrl+F | Cmd+F |
| Find & Replace | Ctrl+H | Cmd+H |
| Go to Definition | Ctrl+B | Cmd+B |
| Show Logcat | Alt+6 | Cmd+6 |
| Commit | Ctrl+K | Cmd+K |
| Format Code | Ctrl+Alt+L | Cmd+Alt+L |

---

## Tips & Tricks

1. **Device Manager**: Quickly access and manage virtual devices
2. **Instant Run**: See code changes without rebuilding (Kotlin/Compose)
3. **Vector Drawable Import**: File > New > Vector Asset to convert SVG
4. **Extract Layout**: Refactor code into reusable XML layouts
5. **Rename Safely**: Shift+F6 to rename across entire project
6. **Code Inspection**: Analyze > Run Inspection by Name for project-wide analysis

---

## Common Issues

### Emulator Won't Start
- Update GPU drivers
- Enable virtualization in BIOS
- Try nested virtualization settings in Device Manager

### Gradle Build Fails
- File > Invalidate Caches > Invalidate and Restart
- Delete `.gradle` folder
- Update Gradle version in `build.gradle.kts`

### App Crashes
- Check Logcat for stack traces
- Use Android Profiler to identify memory/thread issues
- Enable strict mode in development settings

---

## Resources

- **Official Documentation**: [developer.android.com](https://developer.android.com/)
- **Android Studio Guide**: [developer.android.com/studio/intro](https://developer.android.com/studio/intro)
- **Kotlin Docs**: [kotlinlang.org](https://kotlinlang.org/)
- **Jetpack Reference**: [developer.android.com/jetpack](https://developer.android.com/jetpack)
- **Community**: Stack Overflow, Reddit r/androiddev, official forums

