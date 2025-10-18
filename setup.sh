#!/bin/bash
# Quick Start Script for Zenith IDE Development

set -e

echo "🚀 Zenith IDE - Quick Start Setup"
echo "=================================="
echo ""

# Check prerequisites
echo "✓ Checking prerequisites..."

if ! command -v cargo &> /dev/null; then
    echo "❌ Rust is not installed. Please install from https://rustup.rs/"
    exit 1
fi

if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install from https://nodejs.org/"
    exit 1
fi

echo "✓ Prerequisites found"
echo ""

# Build Rust core
echo "📦 Building Rust core..."
cd core
cargo build --release
cargo test
cd ..
echo "✓ Rust core built successfully"
echo ""

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd ui
npm install
cd ..
echo "✓ Frontend dependencies installed"
echo ""

# Run TypeScript type check
echo "🔍 Type checking TypeScript..."
cd ui
npm run lint
cd ..
echo "✓ TypeScript checks passed"
echo ""

# Print next steps
echo "✨ Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Start development: npm run dev"
echo "  2. Run Rust tests: cd core && cargo test"
echo "  3. Read documentation: cat docs/architecture.md"
echo "  4. Create a plugin: read docs/plugin-api.md"
echo ""
echo "Happy coding! 🎉"
