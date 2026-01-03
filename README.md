# VortexSMS

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/XeldarAlz/Vortex-SMS-Bomber/releases)
[![License](https://img.shields.io/badge/license-Non--Commercial-red.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node.js-%3E%3D12.0-brightgreen.svg)](https://nodejs.org/)
[![Platform](https://img.shields.io/badge/platform-Windows-blue.svg)]()
[![Sponsor](https://img.shields.io/badge/sponsor-30363D?style=flat-square&logo=GitHub-Sponsors&logoColor=#EA4AAA)](https://github.com/sponsors/XeldarAlz)

> **Language**: [English](README.md) | [Türkçe](README_TR.md)

```
██╗   ██╗ ██████╗ ██████╗ ████████╗███████╗██╗  ██╗    ███████╗███╗   ███╗███████╗
██║   ██║██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝╚██╗██╔╝    ██╔════╝████╗ ████║██╔════╝
██║   ██║██║   ██║██████╔╝   ██║   █████╗   ╚███╔╝     ███████╗██╔████╔██║███████╗
╚██╗ ██╔╝██║   ██║██╔══██╗   ██║   ██╔══╝   ██╔██╗     ╚════██║██║╚██╔╝██║╚════██║
 ╚████╔╝ ╚██████╔╝██║  ██║   ██║   ███████╗██╔╝ ██╗    ███████║██║ ╚═╝ ██║███████║
  ╚═══╝   ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝    ╚══════╝╚═╝     ╚═╝╚══════╝
```

## What is VortexSMS?

VortexSMS is a tool that sends SMS messages through many different services at once. You can use it to test SMS systems or for learning purposes.

## Features

- Works in English and Turkish
- Windows desktop app with modern UI
- 50+ different SMS services supported
- Configurable delays between messages
- Real-time progress and statistics
- Automatic updates from GitHub releases
- Beautiful terminal-style interface
- Sound effects and background music

## Screenshots

<div align="center">
  <img src="screenshots/app.png" alt="Desktop App" width="800"/>
</div>

## Installation

### Windows Desktop App (Recommended)

Download the latest version from [Releases](https://github.com/XeldarAlz/Vortex-SMS-Bomber/releases):

| File | Description |
|------|-------------|
| `VortexSMS-Setup-x.x.x.exe` | Installer (recommended) |
| `VortexSMS-Portable-x.x.x.exe` | Portable version (no installation needed) |

The app includes **automatic updates** - you'll be notified when a new version is available.

### Terminal Version (Windows/Mac/Linux)

For command-line usage or development:

**Requirements**: Node.js 12.0 or higher

```bash
# Clone the repository
git clone https://github.com/XeldarAlz/Vortex-SMS-Bomber.git
cd Vortex-SMS-Bomber

# Install dependencies
npm install

# Run the terminal version
npm start
```

## How to Use

### Desktop App

1. Download and install from [Releases](https://github.com/XeldarAlz/Vortex-SMS-Bomber/releases)
2. Launch the app
3. Choose your language (English or Turkish)
4. Enter the target phone number (10 digits, starting with 5)
5. Set the number of messages to send
6. Optionally set a delay between messages
7. Click **LAUNCH ATTACK** and watch the progress

### Terminal Version

```bash
npm start
# or
node index.js
```

Follow the on-screen prompts to configure and run.

## Development

### Building from Source

```bash
# Clone and enter the project
git clone https://github.com/XeldarAlz/Vortex-SMS-Bomber.git
cd Vortex-SMS-Bomber

# Install desktop dependencies
cd desktop
npm install

# Run in development mode
npm start

# Build Windows executables
npm run build:win
```

Build output will be in `desktop/build/`:
- `VortexSMS-Setup-x.x.x.exe` - NSIS installer
- `VortexSMS-Portable-x.x.x.exe` - Portable executable
- `latest.yml` - Auto-updater manifest

## Contributing

We welcome contributions! See [CONTRIBUTE.md](CONTRIBUTE.md) for detailed guidelines.

## Legal Notice

**WARNING: This tool is for educational purposes only.**

- Follow your local laws and regulations
- Get permission before testing any system
- Do not use to harass or harm others
- Unauthorized use may have legal consequences

The developers are not responsible for any misuse of this software.

## License

This project uses a **Non-Commercial License**. Commercial use is prohibited. See [LICENSE](LICENSE) for details.

## Support

- **Bug reports**: [Open an issue](https://github.com/XeldarAlz/Vortex-SMS-Bomber/issues)
- **Questions**: [GitHub Discussions](https://github.com/XeldarAlz/Vortex-SMS-Bomber/discussions)
- **Like the project?** Give it a star!

## Sponsors

Support the development of VortexSMS:

[![Sponsor](https://img.shields.io/badge/Sponsor-EA4AAA?style=for-the-badge&logo=github-sponsors&logoColor=white)](https://github.com/sponsors/XeldarAlz)
