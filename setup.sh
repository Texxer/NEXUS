#!/bin/bash

# NEXUS IDE Development Setup Script
# This script helps set up the development environment

set -e

echo "🚀 NEXUS IDE Development Setup"
echo "================================"
echo ""

# Check Node.js
echo "Checking Node.js..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    echo "Please install Node.js from: https://nodejs.org/"
    exit 1
fi
NODE_VERSION=$(node --version)
echo "✅ Node.js $NODE_VERSION found"

# Check npm
echo "Checking npm..."
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed"
    exit 1
fi
NPM_VERSION=$(npm --version)
echo "✅ npm $NPM_VERSION found"

# Check Rust
echo "Checking Rust..."
if ! command -v cargo &> /dev/null; then
    echo "❌ Rust is not installed"
    echo "Please install Rust from: https://rustup.rs/"
    exit 1
fi
RUST_VERSION=$(rustc --version)
echo "✅ Rust found: $RUST_VERSION"

# Check system dependencies on Linux
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    echo ""
    echo "Checking Linux system dependencies..."
    
    # Check for webkit2gtk
    if ! pkg-config --exists webkit2gtk-4.0; then
        echo "⚠️  webkit2gtk-4.0 not found"
        echo ""
        echo "Please install required system dependencies:"
        echo ""
        echo "Ubuntu/Debian:"
        echo "  sudo apt-get install -y libwebkit2gtk-4.0-dev build-essential curl wget file libssl-dev libgtk-3-dev libayatana-appindicator3-dev librsvg2-dev"
        echo ""
        echo "Fedora:"
        echo "  sudo dnf install webkit2gtk4.0-devel openssl-devel curl wget file libappindicator-gtk3-devel librsvg2-devel"
        echo ""
        echo "Arch:"
        echo "  sudo pacman -S webkit2gtk base-devel curl wget file openssl appmenu-gtk-module gtk3 libappindicator-gtk3 librsvg libvips"
        echo ""
        exit 1
    else
        echo "✅ System dependencies found"
    fi
fi

echo ""
echo "Installing npm dependencies..."
npm install

echo ""
echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "  1. Run development server: npm run tauri:dev"
echo "  2. Build for production: npm run tauri:build"
echo "  3. Read the docs: README.md"
echo ""
echo "Happy coding! 🎉"
