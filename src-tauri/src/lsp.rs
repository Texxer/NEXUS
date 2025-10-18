// Language Server Protocol integration
// Connects to language servers for semantic analysis and diagnostics

use serde::{Deserialize, Serialize};
use std::path::PathBuf;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Diagnostic {
    pub line: u32,
    pub column: u32,
    pub message: String,
    pub severity: DiagnosticSeverity,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub enum DiagnosticSeverity {
    Error,
    Warning,
    Information,
    Hint,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CompletionItem {
    pub label: String,
    pub detail: Option<String>,
    pub documentation: Option<String>,
    pub kind: CompletionKind,
    pub sort_text: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum CompletionKind {
    Text,
    Method,
    Function,
    Constructor,
    Field,
    Variable,
    Class,
    Interface,
    Module,
    Property,
    Unit,
    Value,
    Enum,
    Keyword,
    Snippet,
    Color,
    Reference,
    Folder,
    EnumMember,
    Constant,
    Struct,
    EventListener,
    Operator,
    TypeParameter,
}

pub struct LanguageServer {
    pub language: String,
    pub path: PathBuf,
}

impl LanguageServer {
    pub fn new(language: String, path: PathBuf) -> Self {
        Self { language, path }
    }

    pub async fn get_diagnostics(&self, _content: &str) -> Vec<Diagnostic> {
        // TODO: Implement LSP communication
        vec![]
    }

    pub async fn get_completions(
        &self,
        _content: &str,
        _line: u32,
        _column: u32,
    ) -> Vec<CompletionItem> {
        // TODO: Implement LSP communication
        vec![]
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_diagnostic_creation() {
        let diag = Diagnostic {
            line: 1,
            column: 5,
            message: "test error".to_string(),
            severity: DiagnosticSeverity::Error,
        };
        assert_eq!(diag.line, 1);
    }
}
