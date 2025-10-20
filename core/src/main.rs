//! Zenith Core - The high-performance backend for the Zenith IDE
//!
//! This module provides:
//! - Text editing engine with efficient buffer management
//! - Code analysis and semantic understanding
//! - Language Server Protocol (LSP) integration
//! - Plugin runtime and management
//! - Virtual file system abstraction

mod editor;
mod analyzer;
mod lsp;
mod plugins;
mod vfs;
mod utils;

use anyhow::Result;
use std::sync::Arc;
use tokio::sync::RwLock;
use tracing::{info, Level};
use tracing_subscriber;

/// The main Zenith IDE core instance
pub struct ZenithCore {
    editor: Arc<RwLock<editor::Editor>>,
    analyzer: Arc<RwLock<analyzer::CodeAnalyzer>>,
    vfs: Arc<RwLock<vfs::VirtualFileSystem>>,
    lsp_server: Arc<lsp::LSPServer>,
    plugin_runtime: Arc<plugins::PluginRuntime>,
}

impl ZenithCore {
    /// Create a new Zenith core instance
    pub async fn new() -> Result<Self> {
        info!("Initializing Zenith Core");

        let editor = Arc::new(RwLock::new(editor::Editor::new()));
        let vfs = Arc::new(RwLock::new(vfs::VirtualFileSystem::new()));
        let analyzer = Arc::new(RwLock::new(analyzer::CodeAnalyzer::new(
            vfs.clone(),
        )));
        let lsp_server = Arc::new(lsp::LSPServer::new(
            analyzer.clone(),
            editor.clone(),
        ));
        let plugin_runtime = Arc::new(plugins::PluginRuntime::new());

        info!("Zenith Core initialized successfully");

        Ok(ZenithCore {
            editor,
            analyzer,
            vfs,
            lsp_server,
            plugin_runtime,
        })
    }

    /// Start the Zenith core
    pub async fn start(&self) -> Result<()> {
        info!("Starting Zenith Core");

        // Start LSP server
        self.lsp_server.start().await?;

        // Initialize plugin runtime
        self.plugin_runtime.initialize().await?;

        info!("Zenith Core started successfully");
        Ok(())
    }

    /// Shutdown the Zenith core gracefully
    pub async fn shutdown(&self) -> Result<()> {
        info!("Shutting down Zenith Core");

        // Stop LSP server
        self.lsp_server.stop().await?;

        // Cleanup plugin runtime
        self.plugin_runtime.cleanup().await?;

        info!("Zenith Core shutdown complete");
        Ok(())
    }

    /// Get a reference to the editor
    pub fn editor(&self) -> Arc<RwLock<editor::Editor>> {
        self.editor.clone()
    }

    /// Get a reference to the code analyzer
    pub fn analyzer(&self) -> Arc<RwLock<analyzer::CodeAnalyzer>> {
        self.analyzer.clone()
    }

    /// Get a reference to the virtual file system
    pub fn vfs(&self) -> Arc<RwLock<vfs::VirtualFileSystem>> {
        self.vfs.clone()
    }

    /// Get a reference to the LSP server
    pub fn lsp_server(&self) -> Arc<lsp::LSPServer> {
        self.lsp_server.clone()
    }

    /// Get a reference to the plugin runtime
    pub fn plugin_runtime(&self) -> Arc<plugins::PluginRuntime> {
        self.plugin_runtime.clone()
    }
}

#[tokio::main]
async fn main() -> Result<()> {
    // Initialize tracing
    tracing_subscriber::fmt()
        .with_max_level(Level::INFO)
        .init();

    info!("🚀 Zenith IDE - Starting Core Engine");

    // Create and start the core
    let zenith = ZenithCore::new().await?;
    zenith.start().await?;

    // Keep the server running
    tokio::signal::ctrl_c().await?;

    // Graceful shutdown
    zenith.shutdown().await?;

    info!("✨ Zenith Core terminated gracefully");
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn test_core_initialization() {
        let core = ZenithCore::new().await;
        assert!(core.is_ok());
    }
}
