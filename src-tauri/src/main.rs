// NEXUS Pro - The Fastest IDE on Earth
// MVP Core: Editor + LSP + Ollama Integration

#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::sync::Arc;
use tauri::Menu;

mod editor;
mod lsp;
mod ollama;
mod commands;

#[derive(Clone, serde::Serialize)]
struct Payload {
    message: String,
}

fn main() {
    let menu = Menu::default();

    tauri::Builder::default()
        .menu(menu)
        .invoke_handler(tauri::generate_handler![
            commands::open_file,
            commands::save_file,
            commands::get_completions,
            commands::get_diagnostics,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
