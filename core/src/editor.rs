//! Text editor engine with efficient buffer management
//!
//! This module provides the core editing capabilities:
//! - Multi-cursor editing
//! - Efficient text buffer (rope-based)
//! - Undo/redo support
//! - Selection management

use anyhow::Result;
use ropey::Rope;
use std::collections::HashMap;
use uuid::Uuid;

/// Represents a position in the document (line, column)
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub struct Position {
    pub line: usize,
    pub column: usize,
}

impl Position {
    pub fn new(line: usize, column: usize) -> Self {
        Position { line, column }
    }

    pub fn start() -> Self {
        Position { line: 0, column: 0 }
    }
}

/// Represents a range of text in the document
#[derive(Debug, Clone, Copy)]
pub struct Range {
    pub start: Position,
    pub end: Position,
}

impl Range {
    pub fn new(start: Position, end: Position) -> Self {
        Range { start, end }
    }
}

/// Represents a text selection
#[derive(Debug, Clone)]
pub struct Selection {
    pub primary: Range,
    pub secondary: Vec<Range>,
}

impl Selection {
    pub fn new(primary: Range) -> Self {
        Selection {
            primary,
            secondary: Vec::new(),
        }
    }

    pub fn add_cursor(&mut self, range: Range) {
        self.secondary.push(range);
    }
}

/// Undo/Redo operation
#[derive(Debug, Clone)]
pub struct EditOperation {
    pub id: String,
    pub position: Position,
    pub deleted: String,
    pub inserted: String,
}

/// The main text editor
pub struct Editor {
    // Document buffers
    buffers: HashMap<String, DocumentBuffer>,
    active_buffer: Option<String>,

    // Edit history
    undo_stack: Vec<Vec<EditOperation>>,
    redo_stack: Vec<Vec<EditOperation>>,
}

pub struct DocumentBuffer {
    pub id: String,
    pub name: String,
    pub content: Rope,
    pub selection: Selection,
    pub modified: bool,
}

impl DocumentBuffer {
    pub fn new(name: String) -> Self {
        DocumentBuffer {
            id: Uuid::new_v4().to_string(),
            name,
            content: Rope::new(),
            selection: Selection::new(Range::new(
                Position::start(),
                Position::start(),
            )),
            modified: false,
        }
    }

    pub fn insert(&mut self, pos: Position, text: &str) -> Result<()> {
        let byte_idx = self.position_to_byte(pos)?;
        self.content.insert(byte_idx, text);
        self.modified = true;
        Ok(())
    }

    pub fn delete(&mut self, range: Range) -> Result<String> {
        let start_byte = self.position_to_byte(range.start)?;
        let end_byte = self.position_to_byte(range.end)?;
        let deleted = self.content.byte_slice(start_byte..end_byte).to_string();
        self.content.remove(start_byte..end_byte);
        self.modified = true;
        Ok(deleted)
    }

    fn position_to_byte(&self, pos: Position) -> Result<usize> {
        if pos.line >= self.content.len_lines() {
            anyhow::bail!("Line out of bounds");
        }

        let mut byte_idx = 0;
        for _ in 0..pos.line {
            byte_idx += self.content.line(byte_idx).len_chars() + 1;
        }
        byte_idx += pos.column;

        Ok(byte_idx)
    }

    pub fn line_count(&self) -> usize {
        self.content.len_lines()
    }

    pub fn get_line(&self, line: usize) -> Option<String> {
        self.content.get_line(line).map(|l| l.to_string())
    }
}

impl Editor {
    pub fn new() -> Self {
        Editor {
            buffers: HashMap::new(),
            active_buffer: None,
            undo_stack: Vec::new(),
            redo_stack: Vec::new(),
        }
    }

    /// Create a new buffer
    pub fn create_buffer(&mut self, name: String) -> String {
        let buffer = DocumentBuffer::new(name);
        let id = buffer.id.clone();
        self.buffers.insert(id.clone(), buffer);
        if self.active_buffer.is_none() {
            self.active_buffer = Some(id.clone());
        }
        id
    }

    /// Get the active buffer
    pub fn active_buffer(&mut self) -> Option<&mut DocumentBuffer> {
        if let Some(ref id) = self.active_buffer {
            self.buffers.get_mut(id)
        } else {
            None
        }
    }

    /// Set active buffer
    pub fn set_active_buffer(&mut self, id: String) {
        if self.buffers.contains_key(&id) {
            self.active_buffer = Some(id);
        }
    }

    /// Insert text at the current cursor position
    pub fn insert(&mut self, pos: Position, text: &str) -> Result<()> {
        if let Some(buffer) = self.active_buffer() {
            buffer.insert(pos, text)?;
            self.record_operation(EditOperation {
                id: Uuid::new_v4().to_string(),
                position: pos,
                deleted: String::new(),
                inserted: text.to_string(),
            });
        }
        Ok(())
    }

    /// Delete a range of text
    pub fn delete(&mut self, range: Range) -> Result<()> {
        if let Some(buffer) = self.active_buffer() {
            let deleted = buffer.delete(range)?;
            self.record_operation(EditOperation {
                id: Uuid::new_v4().to_string(),
                position: range.start,
                deleted,
                inserted: String::new(),
            });
        }
        Ok(())
    }

    fn record_operation(&mut self, operation: EditOperation) {
        if let Some(ops) = self.undo_stack.last_mut() {
            ops.push(operation);
        } else {
            self.undo_stack.push(vec![operation]);
        }
        self.redo_stack.clear();
    }

    /// Undo the last operation
    pub fn undo(&mut self) -> Result<()> {
        if let Some(operations) = self.undo_stack.pop() {
            self.redo_stack.push(operations.clone());
            // Re-apply operations in reverse
            for op in operations.iter().rev() {
                if !op.deleted.is_empty() {
                    // Re-insert deleted text
                    if let Some(buffer) = self.active_buffer() {
                        buffer.insert(op.position, &op.deleted)?;
                    }
                }
            }
        }
        Ok(())
    }

    /// Redo the last undone operation
    pub fn redo(&mut self) -> Result<()> {
        if let Some(operations) = self.redo_stack.pop() {
            self.undo_stack.push(operations.clone());
            // Re-apply operations
            for op in operations {
                if !op.inserted.is_empty() {
                    if let Some(buffer) = self.active_buffer() {
                        buffer.insert(op.position, &op.inserted)?;
                    }
                }
            }
        }
        Ok(())
    }

    /// Get buffer by ID
    pub fn get_buffer(&self, id: &str) -> Option<&DocumentBuffer> {
        self.buffers.get(id)
    }

    /// Close a buffer
    pub fn close_buffer(&mut self, id: &str) -> Result<()> {
        self.buffers.remove(id);
        if self.active_buffer.as_ref().map(|x| x.as_str()) == Some(id) {
            self.active_buffer =
                self.buffers.keys().next().cloned();
        }
        Ok(())
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_editor_creation() {
        let editor = Editor::new();
        assert_eq!(editor.buffers.len(), 0);
    }

    #[test]
    fn test_buffer_creation() {
        let mut editor = Editor::new();
        let id = editor.create_buffer("test.rs".to_string());
        assert!(editor.get_buffer(&id).is_some());
    }

    #[test]
    fn test_text_insertion() {
        let mut editor = Editor::new();
        editor.create_buffer("test.rs".to_string());
        let result = editor.insert(Position::start(), "fn main() {}");
        assert!(result.is_ok());
    }
}
