#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;
use std::fs;
use std::path::PathBuf;

#[tauri::command]
async fn open_file(path: String) -> Result<String, String> {
    fs::read_to_string(&path)
        .map_err(|e| format!("Failed to open file: {}", e))
}

#[tauri::command]
async fn save_file(path: String, content: String) -> Result<String, String> {
    fs::write(&path, &content)
        .map_err(|e| format!("Failed to save file: {}", e))?;
    Ok(format!("Saved {} bytes to {}", content.len(), path))
}

#[tauri::command]
async fn list_files(dir: String) -> Result<Vec<String>, String> {
    let path = PathBuf::from(&dir);
    if !path.is_dir() {
        return Err(format!("Not a directory: {}", dir));
    }
    
    let mut files = Vec::new();
    if let Ok(entries) = fs::read_dir(&path) {
        for entry in entries.flatten() {
            if let Ok(metadata) = entry.metadata() {
                let path = entry.path();
                if let Some(name) = path.file_name() {
                    if let Some(name_str) = name.to_str() {
                        if metadata.is_file() {
                            files.push(name_str.to_string());
                        }
                    }
                }
            }
        }
    }
    Ok(files)
}

#[tauri::command]
async fn analyze_code(code: String) -> Result<String, String> {
    let lang = if code.contains("fn ") || code.contains("let ") {
        "Rust"
    } else if code.contains("def ") || code.contains("import ") {
        "Python"
    } else if code.contains("const ") || code.contains("function ") {
        "JavaScript"
    } else {
        "Unknown"
    };
    
    let lines = code.lines().count();
    let words = code.split_whitespace().count();
    
    Ok(format!("Language: {} | Lines: {} | Words: {}", lang, lines, words))
}

#[tauri::command]
async fn get_completions(file: String, _line: usize, _column: usize) -> Result<Vec<String>, String> {
    let completions = if file.ends_with(".rs") {
        vec!["fn", "let", "const", "struct", "impl", "pub", "use", "match", "if", "for"]
    } else if file.ends_with(".py") {
        vec!["def", "class", "import", "from", "if", "for", "while", "return", "async", "await"]
    } else if file.ends_with(".js") || file.ends_with(".ts") {
        vec!["const", "let", "var", "function", "async", "class", "import", "export", "return", "if"]
    } else {
        vec!["fn", "const", "def", "class"]
    };
    
    Ok(completions.iter().map(|s| s.to_string()).collect())
}

#[tauri::command]
fn get_frontend_version() -> String {
    env!("CARGO_PKG_VERSION").to_string()
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            open_file,
            save_file,
            list_files,
            analyze_code,
            get_completions,
            get_frontend_version
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
