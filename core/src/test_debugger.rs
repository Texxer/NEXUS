use anyhow::{anyhow, Result};
use std::time::Instant;
use colored::*;

#[derive(Debug, Clone)]
pub enum TestStatus {
    Passed,
    Failed(String),
    Skipped(String),
}

impl std::fmt::Display for TestStatus {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            TestStatus::Passed => write!(f, "{}", "✅ PASS".green()),
            TestStatus::Failed(msg) => write!(f, "{} {}", "❌ FAIL".red(), msg),
            TestStatus::Skipped(reason) => write!(f, "{} {}", "⏭️  SKIP".yellow(), reason),
        }
    }
}

#[derive(Debug, Clone)]
pub struct TestResult {
    pub name: String,
    pub status: TestStatus,
    pub duration_ms: u128,
    pub category: String,
}

impl TestResult {
    pub fn passed(name: &str, category: &str, duration_ms: u128) -> Self {
        Self {
            name: name.to_string(),
            status: TestStatus::Passed,
            duration_ms,
            category: category.to_string(),
        }
    }

    pub fn failed(name: &str, category: &str, error: String, duration_ms: u128) -> Self {
        Self {
            name: name.to_string(),
            status: TestStatus::Failed(error),
            duration_ms,
            category: category.to_string(),
        }
    }

    pub fn skipped(name: &str, category: &str, reason: &str) -> Self {
        Self {
            name: name.to_string(),
            status: TestStatus::Skipped(reason.to_string()),
            duration_ms: 0,
            category: category.to_string(),
        }
    }
}

pub struct IDETestDebugger {
    results: Vec<TestResult>,
    start_time: Option<Instant>,
    verbose: bool,
}

impl IDETestDebugger {
    pub fn new(verbose: bool) -> Self {
        Self {
            results: Vec::new(),
            start_time: None,
            verbose,
        }
    }

    pub fn start_suite(&mut self, name: &str) {
        println!("\n{}", "═".repeat(70));
        println!("{} {}", "🧪 TEST SUITE".bold().cyan(), name.bold());
        println!("{}", "═".repeat(70));
        self.start_time = Some(Instant::now());
    }

    pub fn add_result(&mut self, result: TestResult) {
        if self.verbose {
            println!(
                "  {} {} ({:.2}ms)",
                result.status,
                result.name.bright_black(),
                result.duration_ms
            );
        }
        self.results.push(result);
    }

    pub fn report(&self) -> String {
        let total = self.results.len();
        let passed = self.results.iter().filter(|r| matches!(r.status, TestStatus::Passed)).count();
        let failed = self
            .results
            .iter()
            .filter(|r| matches!(r.status, TestStatus::Failed(_)))
            .count();
        let skipped = self
            .results
            .iter()
            .filter(|r| matches!(r.status, TestStatus::Skipped(_)))
            .count();

        let total_time: u128 = self.results.iter().map(|r| r.duration_ms).sum();
        let pass_rate = if total > 0 { (passed as f64 / total as f64) * 100.0 } else { 0.0 };

        let mut report = String::new();

        // Summary box
        report.push_str("\n");
        report.push_str("┌────────────────────────────────────────────────────────────────────────┐\n");
        report.push_str("│ 📊 TEST SUMMARY                                                        │\n");
        report.push_str("├────────────────────────────────────────────────────────────────────────┤\n");
        report.push_str(&format!(
            "│ Total Tests:        {:>3} │ {}                                    │\n",
            total,
            if total > 0 { "✅" } else { "⏭️ " }
        ));
        report.push_str(&format!(
            "│ Passed:             {:>3} │ {:<45} │\n",
            passed,
            format!("{}%", pass_rate as u32)
        ));
        report.push_str(&format!(
            "│ Failed:             {:>3} │ {}                                    │\n",
            failed,
            if failed == 0 { "✅" } else { "❌" }
        ));
        report.push_str(&format!(
            "│ Skipped:            {:>3} │ {}                                    │\n",
            skipped,
            if skipped == 0 { "✅" } else { "⏭️ " }
        ));
        report.push_str(&format!(
            "│ Total Duration:  {:>6}ms │ {}                                    │\n",
            total_time,
            if total_time < 1000 { "⚡ Fast!".green() } else { "🐌 Slow".yellow() }
        ));
        report.push_str("└────────────────────────────────────────────────────────────────────────┘\n");

        // Results by category
        let mut categories = std::collections::HashMap::new();
        for result in &self.results {
            categories
                .entry(result.category.clone())
                .or_insert_with(Vec::new)
                .push(result);
        }

        if !categories.is_empty() {
            report.push_str("\n┌────────────────────────────────────────────────────────────────────────┐\n");
            report.push_str("│ 📂 RESULTS BY CATEGORY                                                 │\n");
            report.push_str("├────────────────────────────────────────────────────────────────────────┤\n");

            for (category, tests) in &categories {
                let cat_passed = tests.iter().filter(|r| matches!(r.status, TestStatus::Passed)).count();
                let cat_failed = tests
                    .iter()
                    .filter(|r| matches!(r.status, TestStatus::Failed(_)))
                    .count();

                report.push_str(&format!(
                    "│ {} {:<32} [Pass: {:>2} | Fail: {:>2} | Total: {:>2}]  │\n",
                    if cat_failed == 0 { "✅" } else { "❌" },
                    category,
                    cat_passed,
                    cat_failed,
                    tests.len()
                ));
            }
            report.push_str("└────────────────────────────────────────────────────────────────────────┘\n");
        }

        // Failed tests details
        let failures: Vec<_> = self.results.iter().filter(|r| matches!(r.status, TestStatus::Failed(_))).collect();
        if !failures.is_empty() {
            report.push_str("\n┌────────────────────────────────────────────────────────────────────────┐\n");
            report.push_str("│ ❌ FAILURES                                                            │\n");
            report.push_str("├────────────────────────────────────────────────────────────────────────┤\n");

            for failure in failures {
                if let TestStatus::Failed(msg) = &failure.status {
                    report.push_str(&format!(
                        "│ {} {} ({:.2}ms)         │\n",
                        "❌".red(),
                        failure.name,
                        failure.duration_ms
                    ));
                    report.push_str(&format!("│    Error: {}  │\n", msg));
                }
            }
            report.push_str("└────────────────────────────────────────────────────────────────────────┘\n");
        }

        // Final status
        report.push_str("\n");
        let status_icon = if failed == 0 { "🟢 PASS" } else { "🔴 FAIL" };
        let status_color = if failed == 0 { "green" } else { "red" };
        report.push_str(&format!("{}\n", status_icon.color(status_color).bold()));

        report
    }

    pub fn success_rate(&self) -> f64 {
        let total = self.results.len();
        if total == 0 {
            return 0.0;
        }
        let passed = self.results.iter().filter(|r| matches!(r.status, TestStatus::Passed)).count();
        (passed as f64 / total as f64) * 100.0
    }

    pub fn total_duration_ms(&self) -> u128 {
        self.results.iter().map(|r| r.duration_ms).sum()
    }

    pub fn failed_count(&self) -> usize {
        self.results
            .iter()
            .filter(|r| matches!(r.status, TestStatus::Failed(_)))
            .count()
    }

    pub fn passed_count(&self) -> usize {
        self.results.iter().filter(|r| matches!(r.status, TestStatus::Passed)).count()
    }

    pub fn all_passed(&self) -> bool {
        self.failed_count() == 0
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_debugger_creation() {
        let debugger = IDETestDebugger::new(false);
        assert_eq!(debugger.passed_count(), 0);
        assert!(debugger.all_passed());
    }

    #[test]
    fn test_add_results() {
        let mut debugger = IDETestDebugger::new(false);
        debugger.add_result(TestResult::passed("test1", "core", 100));
        debugger.add_result(TestResult::failed("test2", "core", "assertion failed".to_string(), 150));

        assert_eq!(debugger.passed_count(), 1);
        assert_eq!(debugger.failed_count(), 1);
        assert!(!debugger.all_passed());
    }

    #[test]
    fn test_success_rate() {
        let mut debugger = IDETestDebugger::new(false);
        debugger.add_result(TestResult::passed("t1", "cat", 10));
        debugger.add_result(TestResult::passed("t2", "cat", 10));
        debugger.add_result(TestResult::failed("t3", "cat", "err".to_string(), 10));

        let rate = debugger.success_rate();
        assert!(rate < 70.0 && rate > 60.0); // ~66.67%
    }
}
