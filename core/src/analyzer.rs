//! Code analysis engine for semantic understanding
//!
//! Provides:
//! - Syntax tree parsing with Tree-sitter
//! - Symbol indexing and resolution
//! - Type inference
//! - Error detection and reporting

use crate::vfs::VirtualFileSystem;
use anyhow::Result;
use std::collections::HashMap;
use std::sync::Arc;
use tokio::sync::RwLock;

/// A diagnostic message
#[derive(Debug, Clone)]
pub struct Diagnostic {
    pub line: usize,
    pub column: usize,
    pub message: String,
    pub level: DiagnosticLevel,
}

#[derive(Debug, Clone, PartialEq)]
pub enum DiagnosticLevel {
    Error,
    Warning,
    Information,
    Hint,
}

/// A symbol in the code (function, class, variable, etc.)
#[derive(Debug, Clone)]
pub struct Symbol {
    pub name: String,
    pub kind: SymbolKind,
    pub line: usize,
    pub column: usize,
    pub doc: Option<String>,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum SymbolKind {
    Function,
    Class,
    Struct,
    Enum,
    Interface,
    Method,
    Variable,
    Constant,
    Module,
    Namespace,
}

/// Analysis result for a single file
#[derive(Debug, Clone)]
pub struct AnalysisResult {
    pub file_path: String,
    pub symbols: Vec<Symbol>,
    pub diagnostics: Vec<Diagnostic>,
    pub last_analyzed: std::time::SystemTime,
}

impl AnalysisResult {
    pub fn new(file_path: String) -> Self {
        AnalysisResult {
            file_path,
            symbols: Vec::new(),
            diagnostics: Vec::new(),
            last_analyzed: std::time::SystemTime::now(),
        }
    }
}

/// Code analyzer using Tree-sitter
pub struct CodeAnalyzer {
    vfs: Arc<RwLock<VirtualFileSystem>>,
    analysis_cache: HashMap<String, AnalysisResult>,
}

impl CodeAnalyzer {
    pub fn new(vfs: Arc<RwLock<VirtualFileSystem>>) -> Self {
        CodeAnalyzer {
            vfs,
            analysis_cache: HashMap::new(),
        }
    }

    /// Analyze a file and extract symbols
    pub async fn analyze_file(&mut self, file_path: &str) -> Result<AnalysisResult> {
        // Check cache
        if let Some(result) = self.analysis_cache.get(file_path) {
            return Ok(result.clone());
        }

        let vfs = self.vfs.read().await;
        let content = vfs.read_file(file_path)?;

        let mut result = AnalysisResult::new(file_path.to_string());

        // Simple analysis - extract basic patterns
        // In a real implementation, this would use Tree-sitter
        result.symbols = self.extract_symbols(&content, file_path)?;
        result.diagnostics = self.lint_file(&content, file_path)?;

        self.analysis_cache.insert(file_path.to_string(), result.clone());

        Ok(result)
    }

    /// Extract symbols from source code
    fn extract_symbols(&self, content: &str, _file_path: &str) -> Result<Vec<Symbol>> {
        let mut symbols = Vec::new();

        // Simple pattern matching for Rust code
        for (line_idx, line) in content.lines().enumerate() {
            let trimmed = line.trim();

            // Function definitions
            if trimmed.starts_with("fn ") {
                if let Some(name) = self.extract_name_after(trimmed, "fn ") {
                    symbols.push(Symbol {
                        name,
                        kind: SymbolKind::Function,
                        line: line_idx,
                        column: line.find("fn").unwrap_or(0),
                        doc: None,
                    });
                }
            }

            // Struct definitions
            if trimmed.starts_with("struct ") {
                if let Some(name) = self.extract_name_after(trimmed, "struct ") {
                    symbols.push(Symbol {
                        name,
                        kind: SymbolKind::Struct,
                        line: line_idx,
                        column: line.find("struct").unwrap_or(0),
                        doc: None,
                    });
                }
            }

            // Implementation blocks
            if trimmed.starts_with("impl ") {
                if let Some(name) = self.extract_name_after(trimmed, "impl ") {
                    symbols.push(Symbol {
                        name,
                        kind: SymbolKind::Module,
                        line: line_idx,
                        column: line.find("impl").unwrap_or(0),
                        doc: None,
                    });
                }
            }
        }

        Ok(symbols)
    }

    /// Lint a file for common issues
    fn lint_file(&self, content: &str, _file_path: &str) -> Result<Vec<Diagnostic>> {
        let mut diagnostics = Vec::new();

        for (line_idx, line) in content.lines().enumerate() {
            // Check for trailing whitespace
            if line.ends_with(" ") || line.ends_with("\t") {
                diagnostics.push(Diagnostic {
                    line: line_idx,
                    column: line.len(),
                    message: "Trailing whitespace".to_string(),
                    level: DiagnosticLevel::Warning,
                });
            }

            // Check line length
            if line.len() > 120 {
                diagnostics.push(Diagnostic {
                    line: line_idx,
                    column: 120,
                    message: format!(
                        "Line too long ({} > 120)",
                        line.len()
                    ),
                    level: DiagnosticLevel::Information,
                });
            }
        }

        Ok(diagnostics)
    }

    /// Extract a name after a keyword
    fn extract_name_after(&self, line: &str, keyword: &str) -> Option<String> {
        let after_keyword = line.strip_prefix(keyword)?;
        let name = after_keyword
            .split_whitespace()
            .next()?
            .split('(')
            .next()?
            .split('<')
            .next()?
            .split('{')
            .next()?
            .to_string();

        if !name.is_empty() {
            Some(name)
        } else {
            None
        }
    }

    /// Get hover information for a symbol at position
    pub fn get_hover_info(&self, _file_path: &str, _line: usize, _column: usize) -> Option<String> {
        // This would be implemented to return type information, docstrings, etc.
        Some("Type information would appear here".to_string())
    }

    /// Clear the cache
    pub fn clear_cache(&mut self) {
        self.analysis_cache.clear();
    }

    /// Get completion suggestions at position
    pub fn get_completions(&self, _file_path: &str, _line: usize, _column: usize) -> Vec<CompletionItem> {
        vec![
            CompletionItem {
                label: "fn".to_string(),
                kind: "Keyword".to_string(),
                detail: Some("Function keyword".to_string()),
            },
            CompletionItem {
                label: "struct".to_string(),
                kind: "Keyword".to_string(),
                detail: Some("Struct keyword".to_string()),
            },
        ]
    }
}

/// Completion suggestion
#[derive(Debug, Clone)]
pub struct CompletionItem {
    pub label: String,
    pub kind: String,
    pub detail: Option<String>,
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_extract_function_name() {
        let analyzer = CodeAnalyzer::new(Arc::new(RwLock::new(
            VirtualFileSystem::new(),
        )));
        let name =
            analyzer.extract_name_after("fn hello_world() {", "fn ");
        assert_eq!(name, Some("hello_world".to_string()));
    }

    #[test]
    fn test_diagnostic_level() {
        let level = DiagnosticLevel::Error;
        assert_eq!(level, DiagnosticLevel::Error);
    }
}
