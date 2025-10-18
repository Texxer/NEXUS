.PHONY: help setup build test clean run dev lint format check-all

help:
	@echo "Zenith IDE - Development Commands"
	@echo "=================================="
	@echo ""
	@echo "Setup:"
	@echo "  make setup          Install all dependencies"
	@echo ""
	@echo "Development:"
	@echo "  make dev            Start development server (React + Rust)"
	@echo "  make run            Run the IDE"
	@echo ""
	@echo "Build:"
	@echo "  make build          Build everything (release)"
	@echo "  make build-core     Build Rust core only"
	@echo "  make build-ui       Build UI only"
	@echo ""
	@echo "Testing:"
	@echo "  make test           Run all tests"
	@echo "  make test-core      Test Rust core"
	@echo "  make test-ui        Test UI"
	@echo ""
	@echo "Code Quality:"
	@echo "  make lint           Run linters"
	@echo "  make format         Format code"
	@echo "  make check-all      Run all checks"
	@echo ""
	@echo "Cleaning:"
	@echo "  make clean          Clean build artifacts"
	@echo ""

setup:
	@echo "🔧 Setting up Zenith IDE..."
	cd core && cargo build --release && cargo test
	cd ../ui && npm install
	@echo "✓ Setup complete!"

build: build-core build-ui
	@echo "✓ Build complete!"

build-core:
	@echo "📦 Building Rust core..."
	cd core && cargo build --release

build-ui:
	@echo "📦 Building UI..."
	cd ui && npm run build

test: test-core test-ui
	@echo "✓ All tests passed!"

test-core:
	@echo "🧪 Testing Rust core..."
	cd core && cargo test

test-ui:
	@echo "🧪 Testing UI..."
	cd ui && npm test

dev:
	@echo "🚀 Starting development server..."
	@echo "Frontend: http://localhost:5173"
	cd ui && npm run dev

run: build
	@echo "▶️  Running Zenith IDE..."
	cd core && cargo run --release

lint:
	@echo "🔍 Linting..."
	cd core && cargo clippy -- -D warnings
	cd ../ui && npm run lint

format:
	@echo "✨ Formatting code..."
	cd core && cargo fmt
	cd ../ui && npm run format

check-all: lint test
	@echo "✓ All checks passed!"

clean:
	@echo "🗑️  Cleaning build artifacts..."
	cd core && cargo clean
	cd ../ui && rm -rf dist node_modules
	@echo "✓ Clean complete!"

# Watch and rebuild on changes
watch-core:
	cd core && cargo watch -x build

watch-ui:
	cd ui && npm run dev

# Generate documentation
docs:
	cd core && cargo doc --no-deps --open

# Create a new plugin scaffold
new-plugin:
	@read -p "Enter plugin name: " name; \
	mkdir -p plugins/$$name; \
	echo "export function activate(context: any) {" > plugins/$$name/index.ts; \
	echo "  console.log('$$name activated');" >> plugins/$$name/index.ts; \
	echo "}" >> plugins/$$name/index.ts; \
	echo "✓ Plugin created at plugins/$$name"

# Docker build
docker-build:
	docker build -t zenith-ide .

docker-run:
	docker run -it zenith-ide
