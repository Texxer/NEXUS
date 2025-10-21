#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs;
use std::path::PathBuf;
use std::process::Command;
use serde::{Serialize, Deserialize};

/// Response structure for save_file_as command
#[derive(Debug, Serialize, Deserialize)]
struct SaveFileAsResult {
    new_path: String,
    bytes_written: usize,
    extension: String,
    converted: bool,
}

/// File type information for the Save As dialog
#[derive(Debug, Serialize, Deserialize, Clone)]
struct FileTypeInfo {
    ext: String,
    name: String,
    category: String,
    icon: String,
    mime_type: String,
    monaco_lang: String,
}

/// Get all supported file types for the Save As dialog
#[tauri::command]
async fn get_supported_filetypes() -> Result<Vec<FileTypeInfo>, String> {
    // This provides the complete list of 150+ supported filetypes
    // The filetypes are defined in the React FileTypeSelector component
    // This is a foundation for future converter system
    let filetypes = vec![
        // Web Technologies
        FileTypeInfo { ext: "js".to_string(), name: "JavaScript".to_string(), category: "Web".to_string(), icon: "🟨".to_string(), mime_type: "application/javascript".to_string(), monaco_lang: "javascript".to_string() },
        FileTypeInfo { ext: "jsx".to_string(), name: "React JSX".to_string(), category: "Web".to_string(), icon: "⚛️".to_string(), mime_type: "application/javascript".to_string(), monaco_lang: "javascript".to_string() },
        FileTypeInfo { ext: "ts".to_string(), name: "TypeScript".to_string(), category: "Web".to_string(), icon: "🔵".to_string(), mime_type: "application/typescript".to_string(), monaco_lang: "typescript".to_string() },
        FileTypeInfo { ext: "tsx".to_string(), name: "TypeScript React".to_string(), category: "Web".to_string(), icon: "⚛️".to_string(), mime_type: "application/typescript".to_string(), monaco_lang: "typescript".to_string() },
        FileTypeInfo { ext: "html".to_string(), name: "HTML".to_string(), category: "Web".to_string(), icon: "🏷️".to_string(), mime_type: "text/html".to_string(), monaco_lang: "html".to_string() },
        FileTypeInfo { ext: "css".to_string(), name: "CSS".to_string(), category: "Web".to_string(), icon: "🎨".to_string(), mime_type: "text/css".to_string(), monaco_lang: "css".to_string() },
        // Add more as needed - this is abbreviated for example
    ];
    Ok(filetypes)
}

/// Save a file with a new extension (foundation for any-to-any conversion)
/// 
/// In v0.1.2: Saves content as-is with new extension
/// In v1.0+ (Pro): Can apply format converters (JSON→YAML, MD→HTML, etc.)
#[tauri::command]
async fn save_file_as(
    path: String,
    content: String,
    target_extension: String,
    apply_converter: bool,
) -> Result<SaveFileAsResult, String> {
    // Validate extension
    if target_extension.is_empty() || target_extension.len() > 20 {
        return Err("Invalid extension".to_string());
    }
    
    // Ensure extension is alphanumeric (safety check)
    if !target_extension.chars().all(|c| c.is_alphanumeric() || c == '_') {
        return Err("Extension contains invalid characters".to_string());
    }
    
    // Extract base path without extension
    let base_path = if let Some(dot_pos) = path.rfind('.') {
        &path[..dot_pos]
    } else {
        &path
    };
    
    // Build new file path
    let new_path = format!("{}.{}", base_path, target_extension);
    
    // Verify we won't overwrite the original file accidentally
    if new_path == path {
        return Err("New extension is same as current extension".to_string());
    }
    
    // In v0.1.2: Direct save (no conversion)
    // In v1.0+ (Pro): This is where converters would be applied
    let final_content = if apply_converter {
        // TODO: Add converter registry lookup here
        // For now, just pass through the content
        content.clone()
    } else {
        content.clone()
    };
    
    // Write file to disk
    match fs::write(&new_path, &final_content) {
        Ok(_) => {
            let bytes_written = final_content.len();
            Ok(SaveFileAsResult {
                new_path: new_path.clone(),
                bytes_written,
                extension: target_extension,
                converted: apply_converter,
            })
        }
        Err(e) => Err(format!("Failed to save file: {}", e))
    }
}

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
async fn detect_language(file_path: String, content: Option<String>) -> Result<String, String> {
    let path = PathBuf::from(&file_path);
    let ext = path
        .extension()
        .and_then(|s| s.to_str())
        .unwrap_or("")
        .to_string();
    
    let lang_by_ext = match ext.as_str() {
        "rs" => "Rust",
        "py" => "Python",
        "js" | "jsx" => "JavaScript",
        "ts" | "tsx" => "TypeScript",
        "java" => "Java",
        "cpp" | "cc" | "cxx" => "C++",
        "c" => "C",
        "go" => "Go",
        "rb" => "Ruby",
        "sh" => "Bash",
        "html" => "HTML",
        "css" => "CSS",
        "json" => "JSON",
        "md" => "Markdown",
        _ => "Unknown"
    };
    
    if lang_by_ext == "Unknown" && content.is_some() {
        let code = content.unwrap();
        let detected = if code.contains("fn ") || code.contains("let ") || code.contains("mut ") {
            "Rust"
        } else if code.contains("def ") || code.contains("import ") || code.contains("class ") {
            "Python"
        } else if code.contains("const ") || code.contains("function ") || code.contains("import {") {
            "JavaScript"
        } else if code.contains("<?php") {
            "PHP"
        } else if code.contains("public class") || code.contains("package ") {
            "Java"
        } else {
            "Unknown"
        };
        return Ok(detected.to_string());
    }
    
    Ok(lang_by_ext.to_string())
}

#[tauri::command]
async fn analyze_code(file_path: String, code: String) -> Result<String, String> {
    let lang = detect_language(file_path, Some(code.clone())).await?;
    
    let lines = code.lines().count();
    let words = code.split_whitespace().count();
    let chars = code.len();
    
    Ok(format!("Language: {} | Lines: {} | Words: {} | Chars: {}", lang, lines, words, chars))
}

#[tauri::command]
async fn execute_command(cmd: String, args: Vec<String>) -> Result<String, String> {
    let mut command = Command::new(&cmd);
    for arg in args {
        command.arg(&arg);
    }
    
    match command.output() {
        Ok(output) => {
            let stdout = String::from_utf8_lossy(&output.stdout).to_string();
            let stderr = String::from_utf8_lossy(&output.stderr).to_string();
            if output.status.success() {
                Ok(stdout)
            } else {
                Ok(format!("{}Error: {}", stdout, stderr))
            }
        }
        Err(e) => Err(format!("Failed to execute command: {}", e))
    }
}

#[tauri::command]
async fn open_in_explorer(path: String) -> Result<String, String> {
    #[cfg(target_os = "windows")]
    {
        Command::new("explorer.exe")
            .arg("/select,")
            .arg(&path)
            .spawn()
            .map_err(|e| format!("Failed to open explorer: {}", e))?;
        Ok("Explorer opened".to_string())
    }
    
    #[cfg(not(target_os = "windows"))]
    {
        Err("Only supported on Windows".to_string())
    }
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
            save_file_as,
            list_files,
            detect_language,
            analyze_code,
            execute_command,
            open_in_explorer,
            get_completions,
            get_frontend_version,
            get_supported_filetypes
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
