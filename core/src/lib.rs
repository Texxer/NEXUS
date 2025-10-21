mod text_engine;
mod ollama_client;
// pub mod test_debugger;  // TODO: Fix and enable in next release
// pub mod auto_test;      // TODO: Fix and enable in next release

pub use text_engine::TextEngine;
pub use ollama_client::OllamaClient;
// pub use test_debugger::IDETestDebugger;
// pub use auto_test::IDEAutoTest;

use tokio::sync::RwLock;
use std::sync::Arc;
use anyhow::Result;

pub struct NexusEngine {
    text_engine: Arc<TextEngine>,
    ai_client: Arc<RwLock<OllamaClient>>,
}

impl NexusEngine {
    pub fn new(ollama_url: String, ollama_model: String) -> Self {
        Self {
            text_engine: Arc::new(TextEngine::new()),
            ai_client: Arc::new(RwLock::new(OllamaClient::new(ollama_url, ollama_model))),
        }
    }

    pub async fn load_file(&self, content: String) -> Result<()> {
        self.text_engine.load_file(content).await
    }

    pub async fn get_ai_completion(&self, context: &str) -> Result<String> {
        let client = self.ai_client.read().await;
        client.complete(context).await
    }

    pub async fn explain_code(&self, code: &str) -> Result<String> {
        let client = self.ai_client.read().await;
        client.explain(code).await
    }

    pub async fn fix_error(&self, error: &str, code: &str) -> Result<String> {
        let client = self.ai_client.read().await;
        client.fix_error(error, code).await
    }

    pub async fn insert_text(&self, pos: usize, text: &str) -> Result<()> {
        self.text_engine.insert(pos, text).await
    }

    pub async fn delete_text(&self, pos: usize, len: usize) -> Result<()> {
        self.text_engine.delete(pos, len).await
    }

    pub async fn get_content(&self) -> String {
        self.text_engine.get_content().await
    }

    pub async fn get_stats(&self) -> (usize, usize) {
        let len = self.text_engine.len().await;
        let lines = self.text_engine.line_count().await;
        (len, lines)
    }
}

impl Default for NexusEngine {
    fn default() -> Self {
        Self::new(
            "http://localhost:11434".to_string(),
            "deepseek-v3:671b-cloud".to_string(),
        )
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn test_engine_creation() {
        let engine = NexusEngine::default();
        let (len, lines) = engine.get_stats().await;
        assert_eq!(len, 0);
        assert_eq!(lines, 0);
    }

    #[tokio::test]
    async fn test_load_and_edit() {
        let engine = NexusEngine::default();
        engine.load_file("fn main() {}".to_string()).await.unwrap();
        let (len, lines) = engine.get_stats().await;
        assert!(len > 0);
    }
}
