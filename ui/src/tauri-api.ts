import { invoke } from '@tauri-apps/api/core';

export interface CompletionItem {
  label: string;
  detail?: string;
  kind?: string;
}

async function safeInvoke<T>(command: string, args: Record<string, any> = {}): Promise<T | null> {
  try {
    return await invoke<T>(command, args);
  } catch (error) {
    console.error(`Tauri command '${command}' failed:`, error);
    return null;
  }
}

export async function openFile(path: string): Promise<string> {
  const result = await safeInvoke<string>('open_file', { path });
  return result || '';
}

export async function saveFile(path: string, content: string): Promise<string> {
  const result = await safeInvoke<string>('save_file', { path, content });
  return result || 'File saved';
}

export async function listFiles(dir: string): Promise<string[]> {
  const result = await safeInvoke<string[]>('list_files', { dir });
  return result || [];
}

export async function detectLanguage(filePath: string, content?: string): Promise<string> {
  const result = await safeInvoke<string>('detect_language', { file_path: filePath, content });
  return result || 'Unknown';
}

export async function analyzeCode(filePath: string, code: string): Promise<string> {
  const result = await safeInvoke<string>('analyze_code', { file_path: filePath, code });
  return result || `Analyzed ${code.length} chars`;
}

export async function executeCommand(cmd: string, args: string[]): Promise<string> {
  const result = await safeInvoke<string>('execute_command', { cmd, args });
  return result || '';
}

export async function openInExplorer(path: string): Promise<string> {
  const result = await safeInvoke<string>('open_in_explorer', { path });
  return result || 'Opened in explorer';
}

export async function getCompletions(
  file: string,
  line: number,
  column: number
): Promise<CompletionItem[]> {
  const completions = await safeInvoke<string[]>('get_completions', { file, line, column });
  return (completions || []).map((label: string) => ({ label }));
}

export async function getFrontendVersion(): Promise<string> {
  const version = await safeInvoke<string>('get_frontend_version');
  return version || "0.1.2";
}
