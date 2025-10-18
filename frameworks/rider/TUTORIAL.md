# Rider - .NET IDE Tutorial

## What is Rider?

JetBrains Rider is a full-featured cross-platform IDE for .NET development. It provides intelligent C#, VB.NET, F# support, debugging, testing, and profiling tools.

**Languages**: C#, VB.NET, F#, XAML, XML, JSON  
**Frameworks**: .NET Framework, .NET Core, .NET 5+, Mono, ASP.NET, WPF, Unity  
**Version**: 2025.2 and later  
**Platform**: Windows, macOS, Linux

---

## Quick Start

### Installation
1. Download from [jetbrains.com/rider](https://www.jetbrains.com/rider/)
2. Install via Toolbox App
3. On launch, select .NET SDK or framework

### Create Project

```
1. File > New Solution
2. Select project template:
   - Console Application
   - ASP.NET Core Web App
   - Class Library
   - WPF Application
3. Configure name and framework
4. Click Create
```

### Write Code

```csharp
// Program.cs
using System;

class Program {
    static void Main() {
        Console.WriteLine("Hello from Rider!");
    }
}
```

**Run**: Shift+F10  
**Debug**: Shift+F9

---

## Key Features

### Code Intelligence
- IntelliSense for C#/.NET APIs
- Code completion with snippets
- Refactoring: Rename, Extract, Introduce
- Navigation: Go to definition, find usages

### Debugging
- Breakpoints and conditional breaks
- Step debugging (F10, F11)
- Watch windows
- Exception details
- Multithreading support

### Testing
- NUnit, xUnit, MSTest integration
- Run tests from gutter
- Test coverage analysis
- Performance profiling

### Build & Deployment
- MSBuild integration
- NuGet package management
- Publish profiles
- Docker support

### Version Control
- Git, SVN, Mercurial
- Commit/Push/Pull
- Branch management
- Merge conflict resolution

---

## Framework Support

### ASP.NET Core
- Razor syntax highlighting
- Template navigation
- API documentation
- Entity Framework assistance

### WPF
- XAML designer
- Data binding helpers
- Resource dictionary support

### Unity (via plugin)
- C# debugging in Unity Editor
- Project structure navigation
- Quick debugging

---

## Workflow

### Building Console App
```
1. Create Console Application
2. Write code with full IntelliSense
3. Run > Run 'App'
4. Debug > Debug 'App'
5. Build > Build Solution
6. Publish to self-contained executable
```

### ASP.NET Core API
```
1. Create ASP.NET Core Web API
2. Define models and controllers
3. Run server (F5)
4. Test endpoints via integrated REST client
5. Debug requests
6. Deploy to Azure or IIS
```

---

## Resources
- Official Docs: [jetbrains.com/help/rider](https://www.jetbrains.com/help/rider/)
- .NET Docs: [learn.microsoft.com/dotnet](https://learn.microsoft.com/dotnet)
- C# Guide: [learn.microsoft.com/dotnet/csharp](https://learn.microsoft.com/dotnet/csharp)
