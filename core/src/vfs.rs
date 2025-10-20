//! Virtual File System abstraction
//!
//! Provides:
//! - File operations
//! - File watching
//! - Virtual file support

use anyhow::{anyhow, Result};
use std::collections::HashMap;
use std::fs;
use std::path::Path;

/// Virtual File System
pub struct VirtualFileSystem {
    cache: HashMap<String, String>,
}

impl VirtualFileSystem {
    pub fn new() -> Self {
        VirtualFileSystem {
            cache: HashMap::new(),
        }
    }

    /// Read a file
    pub fn read_file(&self, path: &str) -> Result<String> {
        // Check cache first
        if let Some(content) = self.cache.get(path) {
            return Ok(content.clone());
        }

        // Read from disk
        let content = fs::read_to_string(path)
            .map_err(|e| anyhow!("Failed to read file: {}", e))?;

        Ok(content)
    }

    /// Write a file
    pub fn write_file(&mut self, path: &str, content: &str) -> Result<()> {
        fs::write(path, content)
            .map_err(|e| anyhow!("Failed to write file: {}", e))?;
        self.cache.insert(path.to_string(), content.to_string());
        Ok(())
    }

    /// Check if a file exists
    pub fn file_exists(&self, path: &str) -> bool {
        Path::new(path).exists()
    }

    /// List directory contents
    pub fn list_dir(&self, path: &str) -> Result<Vec<String>> {
        let entries = fs::read_dir(path)
            .map_err(|e| anyhow!("Failed to read directory: {}", e))?;

        let mut files = Vec::new();
        for entry in entries {
            let entry = entry?;
            let path = entry.path();
            files.push(path.to_string_lossy().to_string());
        }

        Ok(files)
    }

    /// Create a directory
    pub fn create_dir(&self, path: &str) -> Result<()> {
        fs::create_dir_all(path)
            .map_err(|e| anyhow!("Failed to create directory: {}", e))
    }

    /// Delete a file
    pub fn delete_file(&mut self, path: &str) -> Result<()> {
        fs::remove_file(path)
            .map_err(|e| anyhow!("Failed to delete file: {}", e))?;
        self.cache.remove(path);
        Ok(())
    }

    /// Clear the cache
    pub fn clear_cache(&mut self) {
        self.cache.clear();
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::fs;
    use tempfile::TempDir;

    #[test]
    fn test_vfs_file_operations() {
        let temp_dir = TempDir::new().unwrap();
        let file_path = temp_dir.path().join("test.txt").to_string_lossy().to_string();

        let mut vfs = VirtualFileSystem::new();

        // Write file
        vfs.write_file(&file_path, "Hello, World!").unwrap();
        assert!(vfs.file_exists(&file_path));

        // Read file
        let content = vfs.read_file(&file_path).unwrap();
        assert_eq!(content, "Hello, World!");

        // Delete file
        vfs.delete_file(&file_path).unwrap();
        assert!(!vfs.file_exists(&file_path));
    }
}
