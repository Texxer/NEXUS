# Security Policy

## Supported Versions

Currently, we are in the initial release phase. Security updates will be provided for:

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability in NEXUS IDE, please report it responsibly.

### How to Report

**Please do NOT create a public GitHub issue for security vulnerabilities.**

Instead, please report security issues via:
1. GitHub's Security Advisory feature (preferred)
2. Email to the maintainers (see GitHub profile for contact info)

### What to Include

When reporting a vulnerability, please include:

- Description of the vulnerability
- Steps to reproduce the issue
- Potential impact
- Suggested fix (if any)
- Your contact information

### Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Fix Timeline**: Depends on severity
  - Critical: Within 7 days
  - High: Within 30 days
  - Medium: Within 60 days
  - Low: Next release cycle

## Security Measures

NEXUS IDE implements several security measures:

### Tauri Security Model

- **Allowlist System**: Only explicitly enabled APIs are available
- **Scoped Filesystem**: File access requires explicit permissions
- **Content Security Policy**: Restricts resource loading
- **Secure IPC**: All communication between frontend and backend is validated

### Code Security

- **Input Validation**: All user inputs are validated
- **Path Sanitization**: File paths are sanitized to prevent directory traversal
- **Error Handling**: Errors don't expose sensitive information
- **Dependency Scanning**: Regular security audits of dependencies

### Best Practices

When contributing, please follow these security practices:

1. **No Hardcoded Secrets**: Never commit API keys, passwords, or tokens
2. **Validate All Inputs**: Always validate and sanitize user input
3. **Secure Defaults**: Use secure defaults for all configurations
4. **Error Messages**: Don't expose sensitive information in error messages
5. **Dependencies**: Keep dependencies up to date

## Security Audits

We regularly audit our dependencies using:
- `npm audit` for frontend dependencies
- `cargo audit` for Rust dependencies
- GitHub Dependabot alerts

## Known Security Considerations

### File System Access

- The IDE requires file system access to function
- Users explicitly grant access via system dialogs
- Access is scoped to selected directories

### Terminal Commands

- Terminal executes system commands with user privileges
- Commands run in the context of the application
- Be cautious when running untrusted commands

### Updates

- Currently, updates require manual download
- Future versions will include secure auto-update mechanism
- Code signing will be implemented for releases

## Acknowledgments

We appreciate security researchers who report vulnerabilities responsibly. Contributors who report valid security issues will be acknowledged in our release notes (unless they prefer to remain anonymous).

## Questions?

If you have questions about our security policy, please open a GitHub issue with the "security" label.
