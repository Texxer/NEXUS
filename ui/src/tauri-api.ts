// Tauri IPC utilities for calling Rust backend from React
import { invoke } from '@tauri-apps/api/core';

// Type definitions for IPC calls
export interface CompletionItem {
  label: string;
  detail?: string;
  kind?: string;
}

// Helper to safely invoke Tauri commands
async function safeInvoke<T>(command: string, args: Record<string, any> = {}): Promise<T | null> {
  try {
    return await invoke<T>(command, args);
  } catch (error) {
    console.error(`Tauri command '${command}' failed:`, error);
    return null;
  }
}

// Call Rust backend to analyze code
export async function analyzeCode(code: string): Promise<string> {
  const result = await safeInvoke<string>('analyze_code', { code });
  return result || `Analyzed ${code.length} chars`;
}

// Get code completions from Rust backend
export async function getCompletions(
  file: string,
  line: number,
  column: number
): Promise<CompletionItem[]> {
  const completions = await safeInvoke<string[]>('get_completions', {
    file,
    line,
    column,
  });
  return (completions || []).map((label: string) => ({ label }));
}

// Get version info
export async function getFrontendVersion(): Promise<string> {
  const version = await safeInvoke<string>('get_frontend_version');
  return version || "0.1.1";
}
