// Tauri command handlers - bridges between frontend and backend

use std::path::PathBuf;
use tokio::fs;

#[tauri::command]
pub async fn open_file(path: String) -> Result<String, String> {
    let file_path = PathBuf::from(&path);
    
    fs::read_to_string(&file_path)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn save_file(path: String, content: String) -> Result<(), String> {
    let file_path = PathBuf::from(&path);
    
    // Ensure directory exists
    if let Some(parent) = file_path.parent() {
        fs::create_dir_all(parent)
            .await
            .map_err(|e| e.to_string())?;
    }
    
    fs::write(&file_path, content)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn get_completions(
    _content: String,
    _language: String,
    _position: u32,
) -> Result<Vec<String>, String> {
    // TODO: Integrate with Ollama client
    Ok(vec![])
}

#[tauri::command]
pub async fn get_diagnostics(
    _content: String,
    _language: String,
) -> Result<Vec<serde_json::Value>, String> {
    // TODO: Integrate with LSP
    Ok(vec![])
}
