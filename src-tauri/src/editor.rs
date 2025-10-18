// Core text editor using Ropey buffer and Tree-sitter for syntax highlighting

use ropey::Rope;
use std::path::PathBuf;

#[derive(Clone, Debug)]
pub struct EditorBuffer {
    pub id: String,
    pub path: PathBuf,
    pub content: Rope,
    pub modified: bool,
    pub language: String,
}

impl EditorBuffer {
    pub fn new(id: String, path: PathBuf, content: String, language: String) -> Self {
        Self {
            id,
            path,
            content: Rope::from(content),
            modified: false,
            language,
        }
    }

    pub fn insert(&mut self, position: usize, text: &str) {
        self.content.insert(position, text);
        self.modified = true;
    }

    pub fn remove(&mut self, start: usize, end: usize) {
        self.content.remove(start..end);
        self.modified = true;
    }

    pub fn get_line(&self, line_num: usize) -> String {
        self.content
            .line(line_num)
            .map(|l| l.to_string())
            .unwrap_or_default()
    }

    pub fn line_count(&self) -> usize {
        self.content.len_lines()
    }

    pub fn char_at(&self, position: usize) -> Option<char> {
        self.content.char(position)
    }

    pub fn byte_to_char(&self, byte_idx: usize) -> usize {
        self.content.byte_to_char(byte_idx)
    }

    pub fn char_to_byte(&self, char_idx: usize) -> usize {
        self.content.char_to_byte(char_idx)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_insert_text() {
        let mut buffer = EditorBuffer::new(
            "test".to_string(),
            PathBuf::from("test.rs"),
            "fn main() {}".to_string(),
            "rust".to_string(),
        );
        buffer.insert(10, "\n");
        assert!(buffer.modified);
    }
}
