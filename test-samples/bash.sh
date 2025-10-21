#!/bin/bash
# Monaco Editor Test - Bash

echo "Testing Monaco Editor Integration"

build_ui() {
    cd ui
    npm install
    npm run build
    echo "✅ UI built successfully"
}

run_tests() {
    if [ -f "test-runner.js" ]; then
        node test-runner.js
    fi
}

main() {
    echo "Starting NEXUS Pro build..."
    build_ui
    run_tests
}

main "$@"
