// Tauri IPC utilities for calling Rust backend from React

declare global {
  interface Window {
    __TAURI__?: any;
  }
}

// Type definitions for IPC calls
export interface CompletionItem {
  label: string;
  detail?: string;
  kind?: string;
}

// Call Rust backend to analyze code
export async function analyzeCode(code: string): Promise<string> {
  if (!window.__TAURI__) {
    return "Tauri not available in this environment";
  }
  
  try {
    return await window.__TAURI__.invoke('analyze_code', { code });
  } catch (error) {
    console.error('Error analyzing code:', error);
    return "Error analyzing code";
  }
}

// Get code completions from Rust backend
export async function getCompletions(
  file: string,
  line: number,
  column: number
): Promise<CompletionItem[]> {
  if (!window.__TAURI__) {
    return [];
  }
  
  try {
    const completions = await window.__TAURI__.invoke('get_completions', {
      file,
      line,
      column,
    });
    return completions.map((label: string) => ({ label }));
  } catch (error) {
    console.error('Error getting completions:', error);
    return [];
  }
}

// Get version info
export async function getFrontendVersion(): Promise<string> {
  if (!window.__TAURI__) {
    return "0.1.0 (dev)";
  }
  
  try {
    return await window.__TAURI__.invoke('get_frontend_version');
  } catch (error) {
    console.error('Error getting version:', error);
    return "0.1.0";
  }
}
