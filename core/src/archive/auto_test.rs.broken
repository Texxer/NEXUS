use std::time::Instant;
use anyhow::Result;

use crate::text_engine::TextEngine;
use crate::ollama_client::OllamaClient;
use crate::NexusEngine;
use crate::test_debugger::{IDETestDebugger, TestResult};

pub struct IDEAutoTest {
    debugger: IDETestDebugger,
}

impl IDEAutoTest {
    pub fn new(verbose: bool) -> Self {
        Self {
            debugger: IDETestDebugger::new(verbose),
        }
    }

    pub async fn run_all_tests(&mut self) -> Result<String> {
        self.debugger.start_suite("NEXUS IDE Core Functionality");

        // TextEngine Tests
        self.test_text_engine().await;

        // OllamaClient Tests
        self.test_ollama_client().await;

        // NexusEngine Integration Tests
        self.test_nexus_engine().await;

        // Performance Tests
        self.test_performance().await;

        Ok(self.debugger.report())
    }

    async fn test_text_engine(&mut self) {
        println!("\n📝 Testing TextEngine...");

        // Test 1: Load file
        let start = Instant::now();
        let engine = TextEngine::new();
        let result = engine.load_file("fn main() {}".to_string()).await;
        let duration = start.elapsed().as_millis();

        match result {
            Ok(_) => {
                let len = engine.len().await;
                if len == 11 {
                    self.debugger
                        .add_result(TestResult::passed("TextEngine::load_file", "TextEngine", duration));
                } else {
                    self.debugger.add_result(TestResult::failed(
                        "TextEngine::load_file",
                        "TextEngine",
                        format!("expected 11 chars, got {}", len),
                        duration,
                    ));
                }
            }
            Err(e) => {
                self.debugger.add_result(TestResult::failed(
                    "TextEngine::load_file",
                    "TextEngine",
                    e.to_string(),
                    duration,
                ));
            }
        }

        // Test 2: Insert text
        let start = Instant::now();
        let engine = TextEngine::new();
        let _ = engine.load_file("hello".to_string()).await;
        let result = engine.insert(5, " world").await;
        let duration = start.elapsed().as_millis();

        match result {
            Ok(_) => {
                let content = engine.get_content().await;
                if content == "hello world" {
                    self.debugger
                        .add_result(TestResult::passed("TextEngine::insert", "TextEngine", duration));
                } else {
                    self.debugger.add_result(TestResult::failed(
                        "TextEngine::insert",
                        "TextEngine",
                        format!("expected 'hello world', got '{}'", content),
                        duration,
                    ));
                }
            }
            Err(e) => {
                self.debugger.add_result(TestResult::failed(
                    "TextEngine::insert",
                    "TextEngine",
                    e.to_string(),
                    duration,
                ));
            }
        }

        // Test 3: Delete text
        let start = Instant::now();
        let engine = TextEngine::new();
        let _ = engine.load_file("hello world".to_string()).await;
        let result = engine.delete(5, 6).await;
        let duration = start.elapsed().as_millis();

        match result {
            Ok(_) => {
                let content = engine.get_content().await;
                if content == "hello" {
                    self.debugger
                        .add_result(TestResult::passed("TextEngine::delete", "TextEngine", duration));
                } else {
                    self.debugger.add_result(TestResult::failed(
                        "TextEngine::delete",
                        "TextEngine",
                        format!("expected 'hello', got '{}'", content),
                        duration,
                    ));
                }
            }
            Err(e) => {
                self.debugger.add_result(TestResult::failed(
                    "TextEngine::delete",
                    "TextEngine",
                    e.to_string(),
                    duration,
                ));
            }
        }

        // Test 4: Line count
        let start = Instant::now();
        let engine = TextEngine::new();
        let _ = engine.load_file("line1\nline2\nline3".to_string()).await;
        let lines = engine.line_count().await;
        let duration = start.elapsed().as_millis();

        if lines == 3 {
            self.debugger
                .add_result(TestResult::passed("TextEngine::line_count", "TextEngine", duration));
        } else {
            self.debugger.add_result(TestResult::failed(
                "TextEngine::line_count",
                "TextEngine",
                format!("expected 3 lines, got {}", lines),
                duration,
            ));
        }

        // Test 5: Get line
        let start = Instant::now();
        let engine = TextEngine::new();
        let _ = engine.load_file("line1\nline2\nline3".to_string()).await;
        let line = engine.get_line(1).await;
        let duration = start.elapsed().as_millis();

        match line {
            Some(l) if l == "line2" => {
                self.debugger
                    .add_result(TestResult::passed("TextEngine::get_line", "TextEngine", duration));
            }
            _ => {
                self.debugger.add_result(TestResult::failed(
                    "TextEngine::get_line",
                    "TextEngine",
                    format!("expected 'line2', got {:?}", line),
                    duration,
                ));
            }
        }
    }

    async fn test_ollama_client(&mut self) {
        println!("\n🤖 Testing OllamaClient...");

        // Test 1: Client creation
        let start = Instant::now();
        let client = OllamaClient::new(
            "http://localhost:11434".to_string(),
            "deepseek-v3:671b-cloud".to_string(),
        );
        let duration = start.elapsed().as_millis();
        self.debugger
            .add_result(TestResult::passed("OllamaClient::new", "OllamaClient", duration));

        // Test 2: Health check (skip if offline)
        let start = Instant::now();
        let health_result = client.is_healthy().await;
        let duration = start.elapsed().as_millis();

        if health_result {
            self.debugger
                .add_result(TestResult::passed("OllamaClient::health_check", "OllamaClient", duration));
        } else {
            self.debugger.add_result(TestResult::skipped(
                "OllamaClient::complete",
                "OllamaClient",
                "Ollama service not available (offline test)",
            ));
            self.debugger.add_result(TestResult::skipped(
                "OllamaClient::explain",
                "OllamaClient",
                "Ollama service not available (offline test)",
            ));
            self.debugger.add_result(TestResult::skipped(
                "OllamaClient::fix_error",
                "OllamaClient",
                "Ollama service not available (offline test)",
            ));
            return;
        }

        // Test 3: Completion
        let start = Instant::now();
        let result = client.complete("fn main()").await;
        let duration = start.elapsed().as_millis();

        match result {
            Ok(completion) => {
                if !completion.is_empty() {
                    self.debugger
                        .add_result(TestResult::passed("OllamaClient::complete", "OllamaClient", duration));
                } else {
                    self.debugger.add_result(TestResult::failed(
                        "OllamaClient::complete",
                        "OllamaClient",
                        "empty response".to_string(),
                        duration,
                    ));
                }
            }
            Err(e) => {
                self.debugger.add_result(TestResult::failed(
                    "OllamaClient::complete",
                    "OllamaClient",
                    e.to_string(),
                    duration,
                ));
            }
        }

        // Test 4: Explain
        let start = Instant::now();
        let result = client.explain("let x = 42;").await;
        let duration = start.elapsed().as_millis();

        match result {
            Ok(explanation) => {
                if !explanation.is_empty() {
                    self.debugger
                        .add_result(TestResult::passed("OllamaClient::explain", "OllamaClient", duration));
                } else {
                    self.debugger.add_result(TestResult::failed(
                        "OllamaClient::explain",
                        "OllamaClient",
                        "empty response".to_string(),
                        duration,
                    ));
                }
            }
            Err(e) => {
                self.debugger.add_result(TestResult::failed(
                    "OllamaClient::explain",
                    "OllamaClient",
                    e.to_string(),
                    duration,
                ));
            }
        }
    }

    async fn test_nexus_engine(&mut self) {
        println!("\n⚙️ Testing NexusEngine...");

        let engine = NexusEngine::default();

        // Test 1: Engine creation
        let start = Instant::now();
        let (len, lines) = engine.get_stats().await;
        let duration = start.elapsed().as_millis();

        if len == 0 && lines == 0 {
            self.debugger
                .add_result(TestResult::passed("NexusEngine::new", "Integration", duration));
        } else {
            self.debugger.add_result(TestResult::failed(
                "NexusEngine::new",
                "Integration",
                format!("expected empty engine, got {} bytes, {} lines", len, lines),
                duration,
            ));
        }

        // Test 2: Load and edit
        let start = Instant::now();
        let _ = engine.load_file("fn main() {}".to_string()).await;
        let result = engine.insert_text(11, "\n// comment".to_string()).await;
        let duration = start.elapsed().as_millis();

        if result.is_ok() {
            let content = engine.get_content().await;
            if content.contains("// comment") {
                self.debugger
                    .add_result(TestResult::passed("NexusEngine::insert_text", "Integration", duration));
            } else {
                self.debugger.add_result(TestResult::failed(
                    "NexusEngine::insert_text",
                    "Integration",
                    "comment not found in content".to_string(),
                    duration,
                ));
            }
        } else {
            self.debugger.add_result(TestResult::failed(
                "NexusEngine::insert_text",
                "Integration",
                "operation failed".to_string(),
                duration,
            ));
        }

        // Test 3: Delete text
        let start = Instant::now();
        let engine = NexusEngine::default();
        let _ = engine.load_file("hello world".to_string()).await;
        let result = engine.delete_text(5, 6).await;
        let duration = start.elapsed().as_millis();

        if result.is_ok() {
            let content = engine.get_content().await;
            if content == "hello" {
                self.debugger
                    .add_result(TestResult::passed("NexusEngine::delete_text", "Integration", duration));
            } else {
                self.debugger.add_result(TestResult::failed(
                    "NexusEngine::delete_text",
                    "Integration",
                    format!("expected 'hello', got '{}'", content),
                    duration,
                ));
            }
        } else {
            self.debugger.add_result(TestResult::failed(
                "NexusEngine::delete_text",
                "Integration",
                "operation failed".to_string(),
                duration,
            ));
        }
    }

    async fn test_performance(&mut self) {
        println!("\n⚡ Testing Performance...");

        let engine = TextEngine::new();

        // Test 1: Fast file load
        let start = Instant::now();
        let _ = engine.load_file("let x = 42;".repeat(100)).await;
        let duration = start.elapsed().as_millis();

        if duration < 100 {
            self.debugger
                .add_result(TestResult::passed("Performance::fast_load", "Performance", duration));
        } else {
            self.debugger.add_result(TestResult::failed(
                "Performance::fast_load",
                "Performance",
                format!("took {}ms, expected <100ms", duration),
                duration,
            ));
        }

        // Test 2: Fast insert
        let start = Instant::now();
        let _ = engine.insert(50, "new content").await;
        let duration = start.elapsed().as_millis();

        if duration < 100 {
            self.debugger
                .add_result(TestResult::passed("Performance::fast_insert", "Performance", duration));
        } else {
            self.debugger.add_result(TestResult::failed(
                "Performance::fast_insert",
                "Performance",
                format!("took {}ms, expected <100ms", duration),
                duration,
            ));
        }

        // Test 3: Fast deletion
        let start = Instant::now();
        let _ = engine.delete(25, 10).await;
        let duration = start.elapsed().as_millis();

        if duration < 100 {
            self.debugger
                .add_result(TestResult::passed("Performance::fast_delete", "Performance", duration));
        } else {
            self.debugger.add_result(TestResult::failed(
                "Performance::fast_delete",
                "Performance",
                format!("took {}ms, expected <100ms", duration),
                duration,
            ));
        }
    }

    pub fn stats(&self) -> (usize, usize, f64, u128) {
        (
            self.debugger.passed_count(),
            self.debugger.failed_count(),
            self.debugger.success_rate(),
            self.debugger.total_duration_ms(),
        )
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn test_auto_test_creation() {
        let tester = IDEAutoTest::new(false);
        let (passed, failed, rate, _) = tester.stats();
        assert_eq!(passed, 0);
        assert_eq!(failed, 0);
        assert_eq!(rate, 0.0);
    }
}
