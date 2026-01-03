# Contributing to VortexSMS

Thanks for your interest in contributing to VortexSMS! This guide will help you get started.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Commit Convention](#commit-convention)
- [Pull Request Process](#pull-request-process)
- [Project Structure](#project-structure)
- [Adding New Features](#adding-new-features)

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow
- Keep discussions professional

## Getting Started

### Prerequisites

- **Node.js** 12.0 or higher
- **npm** (comes with Node.js)
- **Git** for version control

### Development Setup

```bash
# 1. Fork the repository on GitHub

# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/Vortex-SMS-Bomber.git
cd Vortex-SMS-Bomber

# 3. Add upstream remote
git remote add upstream https://github.com/XeldarAlz/Vortex-SMS-Bomber.git

# 4. Install dependencies for CLI
npm install

# 5. Install dependencies for Desktop app
cd desktop
npm install

# 6. Run in development mode
npm start           # Desktop app
npm run start:dev   # Desktop app with DevTools
```

### Building the Desktop App

```bash
cd desktop
npm run build:win   # Build Windows installer and portable
```

Output files will be in `desktop/build/`.

## How to Contribute

### Reporting Bugs

Before creating an issue:
1. **Search existing issues** to avoid duplicates
2. **Update to the latest version** and check if the bug still exists

When creating an issue, include:
- **Clear title** describing the problem
- **Steps to reproduce** the bug
- **Expected behavior** vs **actual behavior**
- **Screenshots or logs** if applicable
- **Environment info**: OS, app version, Node.js version

### Suggesting Features

Open an issue with the `enhancement` label:
- **Describe the feature** you'd like to see
- **Explain why** it would be useful
- **Provide examples** or mockups if possible
- **Consider implementation** challenges

### Improving Documentation

- Fix typos or clarify existing docs
- Add examples or tutorials
- Translate to other languages
- Update outdated information

### Submitting Code

1. **Find an issue** to work on (or create one)
2. **Comment** that you're working on it
3. **Fork and branch** (see workflow below)
4. **Write code** following our style guide
5. **Test thoroughly** before submitting
6. **Create a Pull Request**

## Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/) for clear history.

### Format

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation changes |
| `style` | Code formatting (no logic change) |
| `refactor` | Code refactoring |
| `perf` | Performance improvements |
| `test` | Adding or fixing tests |
| `chore` | Maintenance, dependencies |
| `ci` | CI/CD changes |

### Scopes (optional)

- `core` - Core bombing logic
- `ui` - User interface
- `desktop` - Electron app
- `services` - SMS services
- `locales` - Translations
- `build` - Build system

### Examples

```bash
# New feature
git commit -m "feat(services): add new SMS service provider"

# Bug fix
git commit -m "fix(ui): resolve button not responding on click"

# Documentation
git commit -m "docs: update installation instructions"

# Breaking change
git commit -m "feat(core)!: change API response format

BREAKING CHANGE: Response now returns object instead of array"
```

## Pull Request Process

### Branch Naming

```
feature/short-description   # New features
fix/issue-description       # Bug fixes
docs/what-changed          # Documentation
refactor/what-refactored   # Refactoring
```

### Workflow

```bash
# 1. Sync with upstream
git checkout main
git fetch upstream
git merge upstream/main

# 2. Create feature branch
git checkout -b feature/your-feature

# 3. Make changes and commit
git add .
git commit -m "feat: your feature description"

# 4. Push to your fork
git push origin feature/your-feature

# 5. Create Pull Request on GitHub
```

### PR Checklist

Before submitting, ensure:

- [ ] Code follows the existing style
- [ ] Changes are tested locally
- [ ] Documentation is updated if needed
- [ ] Commit messages follow convention
- [ ] PR title is clear and descriptive
- [ ] PR description explains the changes

### PR Description Template

```markdown
## What does this PR do?

Brief description of the changes.

## Why is this needed?

Explain the motivation.

## How to test?

Steps to verify the changes work.

## Screenshots (if applicable)

Add screenshots for UI changes.

## Related Issues

Closes #123
```

## Project Structure

```
Vortex-SMS-Bomber/
├── src/                    # Shared source code
│   ├── core/               # Core bombing logic
│   │   └── bomber.js       # Main bomber function
│   ├── locales/            # Language files
│   │   ├── en.js           # English
│   │   ├── tr.js           # Turkish
│   │   └── index.js        # Language manager
│   ├── services/           # SMS service definitions
│   │   ├── categories/     # Services by category
│   │   │   ├── food.js     # Food delivery services
│   │   │   ├── retail.js   # Retail services
│   │   │   ├── transport.js # Transportation
│   │   │   ├── utilities.js # Utility services
│   │   │   └── other.js    # Miscellaneous
│   │   ├── helpers.js      # Shared helper functions
│   │   └── index.js        # Service collection
│   ├── ui/                 # CLI UI components
│   └── utils/              # Utility functions
│       ├── logger.js       # Logging utility
│       └── request-handler.js # HTTP request handler
│
├── desktop/                # Electron desktop app
│   ├── assets/             # Icons and audio
│   │   ├── audio/          # Sound effects
│   │   ├── icon.ico        # Windows icon
│   │   └── icon.png        # App icon
│   ├── renderer/           # Frontend code
│   │   ├── app.js          # Main app logic
│   │   ├── locales.js      # UI translations
│   │   └── ...             # Other UI modules
│   ├── src/                # Copy of shared src (for build)
│   ├── main.js             # Electron main process
│   ├── preload.js          # IPC bridge
│   ├── index.html          # Main UI
│   ├── styles.css          # Styling
│   └── package.json        # Desktop app config
│
├── index.js                # CLI entry point
├── package.json            # Project config
└── README.md               # Documentation
```

## Adding New Features

### Adding a New SMS Service

1. Choose the appropriate category in `src/services/categories/`
2. Add your service function:

```javascript
// src/services/categories/other.js
async function newService(phone) {
    const url = 'https://api.example.com/sms';
    const data = {
        phone: phone,
        // ... other required fields
    };
    
    return await makeRequest(url, 'POST', data, {
        'Content-Type': 'application/json'
    });
}

module.exports = {
    // ... existing exports
    newService
};
```

3. Register in `src/services/index.js`:

```javascript
const services = [
    // ... existing services
    { name: 'NewService', fn: other.newService }
];
```

### Adding a New Language

1. Create `src/locales/xx.js` (replace `xx` with language code)
2. Copy structure from `en.js` and translate all strings
3. Register in `src/locales/index.js`:

```javascript
const xx = require('./xx');

const languages = {
    en,
    tr,
    xx  // Add new language
};
```

4. Update `desktop/renderer/locales.js` with UI translations

### Adding UI Features

1. Update `desktop/renderer/app.js` for logic
2. Update `desktop/index.html` for structure
3. Update `desktop/styles.css` for styling
4. Update `desktop/renderer/locales.js` for translations

## Questions?

- Open a [Discussion](https://github.com/XeldarAlz/Vortex-SMS-Bomber/discussions)
- Check existing [Issues](https://github.com/XeldarAlz/Vortex-SMS-Bomber/issues)

Thank you for contributing!
