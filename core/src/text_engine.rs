use ropey::Rope;
use std::sync::Arc;
use tokio::sync::RwLock;
use anyhow::Result;

pub struct TextEngine {
    buffer: Arc<RwLock<Rope>>,
    cursor_position: Arc<RwLock<(usize, usize)>>,
}

impl TextEngine {
    pub fn new() -> Self {
        Self {
            buffer: Arc::new(RwLock::new(Rope::new())),
            cursor_position: Arc::new(RwLock::new((0, 0))),
        }
    }

    pub async fn load_file(&self, content: String) -> Result<()> {
        let mut buffer = self.buffer.write().await;
        *buffer = Rope::from_str(&content);
        Ok(())
    }

    pub async fn insert(&self, pos: usize, text: &str) -> Result<()> {
        let mut buffer = self.buffer.write().await;
        buffer.insert(pos, text);
        Ok(())
    }

    pub async fn delete(&self, pos: usize, len: usize) -> Result<()> {
        let mut buffer = self.buffer.write().await;
        let end = std::cmp::min(pos + len, buffer.len_chars());
        buffer.remove(pos..end);
        Ok(())
    }

    pub async fn get_content(&self) -> String {
        let buffer = self.buffer.read().await;
        buffer.to_string()
    }

    pub async fn get_line(&self, line_idx: usize) -> Option<String> {
        let buffer = self.buffer.read().await;
        Some(buffer.line(line_idx).to_string())
    }

    pub async fn len(&self) -> usize {
        let buffer = self.buffer.read().await;
        buffer.len_chars()
    }

    pub async fn line_count(&self) -> usize {
        let buffer = self.buffer.read().await;
        buffer.len_lines()
    }
}

impl Default for TextEngine {
    fn default() -> Self {
        Self::new()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn test_load_file() {
        let engine = TextEngine::new();
        engine.load_file("Hello, World!".to_string()).await.unwrap();
        assert_eq!(engine.get_content().await, "Hello, World!");
    }

    #[tokio::test]
    async fn test_insert() {
        let engine = TextEngine::new();
        engine.load_file("Hello World".to_string()).await.unwrap();
        engine.insert(5, ", Beautiful").await.unwrap();
        assert_eq!(engine.get_content().await, "Hello, Beautiful World");
    }

    #[tokio::test]
    async fn test_delete() {
        let engine = TextEngine::new();
        engine.load_file("Hello, World!".to_string()).await.unwrap();
        engine.delete(5, 2).await.unwrap();
        assert_eq!(engine.get_content().await, "HelloWorld!");
    }

    #[tokio::test]
    async fn test_line_operations() {
        let engine = TextEngine::new();
        engine.load_file("Line1\nLine2\nLine3".to_string()).await.unwrap();
        assert_eq!(engine.line_count().await, 3);
        assert_eq!(engine.get_line(1).await, Some("Line2".to_string()));
    }
}
