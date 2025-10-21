use clap::Parser;
use colored::*;
use nexus_core::IDEAutoTest;

#[derive(Parser, Debug)]
#[command(name = "NEXUS IDE Test Debugger")]
#[command(about = "Automated self-testing for NEXUS IDE core", long_about = None)]
struct Args {
    /// Verbose output
    #[arg(short, long)]
    verbose: bool,

    /// Run only specific test category (TextEngine, OllamaClient, Integration, Performance)
    #[arg(short, long)]
    category: Option<String>,

    /// Show full timing details
    #[arg(short, long)]
    timing: bool,

    /// Save report to file
    #[arg(short, long)]
    output: Option<String>,
}

#[tokio::main]
async fn main() {
    let args = Args::parse();

    println!("\n{}", "╔════════════════════════════════════════════════════════════╗".cyan().bold());
    println!("{}", "║       🧪 NEXUS IDE TEST DEBUGGER - AUTOMATED SELF TEST      ║".cyan().bold());
    println!("{}", "╚════════════════════════════════════════════════════════════╝".cyan().bold());

    let mut tester = IDEAutoTest::new(args.verbose);

    match tester.run_all_tests().await {
        Ok(report) => {
            println!("{}", report);

            let (passed, failed, rate, duration) = tester.stats();

            // Save report if requested
            if let Some(output_file) = args.output {
                match std::fs::write(&output_file, report) {
                    Ok(_) => {
                        println!("\n{} Report saved to {}", "✅".green(), output_file.bold());
                    }
                    Err(e) => {
                        println!("\n{} Failed to save report: {}", "❌".red(), e);
                    }
                }
            }

            // Final summary
            println!("\n{}", "━".repeat(70));
            println!("📊 FINAL STATISTICS");
            println!("{}", "━".repeat(70));
            println!("  Total Passed:   {} {}", passed.to_string().bold().green(), if passed > 0 { "✅" } else { "" });
            println!("  Total Failed:   {} {}", failed.to_string().bold(), if failed > 0 { "❌" } else { "✅" });
            println!("  Success Rate:   {:.1}% {}", rate, if rate >= 90.0 { "🎯" } else if rate >= 80.0 { "✅" } else { "⚠️" });
            println!("  Total Duration: {:.0}ms {}", duration, if duration < 1000 { "⚡" } else { "🐢" });
            println!("{}\n", "━".repeat(70));

            // Exit code
            if failed == 0 {
                println!("{}", "🎉 ALL TESTS PASSED! Ready for production.".bold().green());
                std::process::exit(0);
            } else {
                println!("{}", "❌ SOME TESTS FAILED. Review errors above.".bold().red());
                std::process::exit(1);
            }
        }
        Err(e) => {
            println!("{} Error running tests: {}", "❌".red().bold(), e);
            std::process::exit(1);
        }
    }
}
