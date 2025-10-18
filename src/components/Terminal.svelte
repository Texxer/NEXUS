<script lang="ts">
  import { onMount } from 'svelte';
  import { Command } from '@tauri-apps/plugin-shell';
  import { currentDirectory } from '../stores/fileStore';

  let terminalOutput: string[] = [];
  let currentCommand = '';
  let terminalContainer: HTMLDivElement;
  let commandHistory: string[] = [];
  let historyIndex = -1;
  let workingDirectory = '';

  // Subscribe to current directory
  currentDirectory.subscribe(dir => {
    workingDirectory = dir;
  });

  async function executeCommand() {
    if (!currentCommand.trim()) return;

    const cmd = currentCommand.trim();
    terminalOutput = [...terminalOutput, `$ ${cmd}`];
    commandHistory.push(cmd);
    historyIndex = commandHistory.length;

    try {
      // Parse command and arguments
      const parts = cmd.split(' ');
      const command = parts[0];
      const args = parts.slice(1);

      // Execute command using Tauri shell plugin
      const output = await Command.create(command, args, {
        cwd: workingDirectory || undefined
      }).execute();

      if (output.stdout) {
        terminalOutput = [...terminalOutput, output.stdout];
      }
      if (output.stderr) {
        terminalOutput = [...terminalOutput, `Error: ${output.stderr}`];
      }
      if (output.code !== 0) {
        terminalOutput = [...terminalOutput, `Exit code: ${output.code}`];
      }
    } catch (e) {
      terminalOutput = [...terminalOutput, `Error: ${e}`];
    }

    currentCommand = '';
    scrollToBottom();
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      executeCommand();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        currentCommand = commandHistory[historyIndex] || '';
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        currentCommand = commandHistory[historyIndex] || '';
      } else {
        historyIndex = commandHistory.length;
        currentCommand = '';
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      clearTerminal();
    }
  }

  function clearTerminal() {
    terminalOutput = [];
  }

  function scrollToBottom() {
    setTimeout(() => {
      if (terminalContainer) {
        terminalContainer.scrollTop = terminalContainer.scrollHeight;
      }
    }, 0);
  }

  onMount(() => {
    terminalOutput = [
      'NEXUS IDE Terminal',
      'Type commands to execute them in the current directory',
      'Press Ctrl+L to clear the terminal',
      ''
    ];
  });
</script>

<div class="terminal-container">
  <div class="terminal-header">
    <span class="terminal-title">Terminal</span>
    <button class="clear-button" on:click={clearTerminal} title="Clear Terminal (Ctrl+L)">
      🗑️
    </button>
  </div>
  
  <div class="terminal-output" bind:this={terminalContainer}>
    {#each terminalOutput as line}
      <div class="output-line">{line}</div>
    {/each}
    
    <div class="input-line">
      <span class="prompt">$</span>
      <input
        type="text"
        class="command-input"
        bind:value={currentCommand}
        on:keydown={handleKeydown}
        placeholder="Enter command..."
        autocomplete="off"
        spellcheck="false"
      />
    </div>
  </div>
</div>

<style>
  .terminal-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: #1e1e1e;
    color: #cccccc;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', monospace;
  }

  .terminal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 12px;
    background: #252526;
    border-bottom: 1px solid #3e3e42;
  }

  .terminal-title {
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #969696;
  }

  .clear-button {
    background: transparent;
    border: none;
    color: #cccccc;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 14px;
  }

  .clear-button:hover {
    background: #37373d;
  }

  .terminal-output {
    flex: 1;
    overflow-y: auto;
    padding: 8px 12px;
    font-size: 13px;
    line-height: 1.5;
  }

  .output-line {
    white-space: pre-wrap;
    word-break: break-word;
  }

  .input-line {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 4px;
  }

  .prompt {
    color: #4ec9b0;
    font-weight: bold;
  }

  .command-input {
    flex: 1;
    background: transparent;
    border: none;
    color: #cccccc;
    font-family: inherit;
    font-size: inherit;
    outline: none;
  }

  .command-input::placeholder {
    color: #5c5c5c;
  }
</style>
