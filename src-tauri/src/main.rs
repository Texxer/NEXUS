#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Minimal NEXUS IDE executable
// Serves the React frontend embedded or from disk

use std::path::Path;

fn main() {
    println!("NEXUS IDE v0.1.0");
    println!("Starting desktop application...");
    
    // Check if ui/dist exists
    let dist_path = Path::new("ui/dist");
    if dist_path.exists() {
        println!("✓ Found frontend at {}", dist_path.display());
    } else {
        eprintln!("⚠ Frontend not found at {}", dist_path.display());
        eprintln!("Run 'npm run build' in ui/ to build the frontend");
    }
    
    // In a real build, this would:
    // 1. Start a local HTTP server serving ui/dist
    // 2. Create a WebView window pointing to http://localhost:PORT
    // 3. Handle IPC for backend communication
    
    println!("Backend Rust modules available:");
    println!("  - core:: (language server, code analysis)");
    println!("\nApplication ready. (GUI functionality pending Tauri linking)");
}
