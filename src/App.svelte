<script lang="ts">
  import FileExplorer from './components/FileExplorer.svelte';
  import Editor from './components/Editor.svelte';
  import Terminal from './components/Terminal.svelte';
  import { currentFile, openFiles } from './stores/fileStore';
  import { onMount } from 'svelte';

  let showFileExplorer = true;
  let showTerminal = true;
  let explorerWidth = 250;
  let terminalHeight = 200;

  function toggleFileExplorer() {
    showFileExplorer = !showFileExplorer;
  }

  function toggleTerminal() {
    showTerminal = !showTerminal;
  }

  // Keyboard shortcuts
  function handleKeydown(e: KeyboardEvent) {
    // Ctrl/Cmd + B: Toggle file explorer
    if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
      e.preventDefault();
      toggleFileExplorer();
    }
    // Ctrl/Cmd + `: Toggle terminal
    if ((e.ctrlKey || e.metaKey) && e.key === '`') {
      e.preventDefault();
      toggleTerminal();
    }
  }

  onMount(() => {
    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  });
</script>

<main class="ide-container">
  <div class="header">
    <div class="logo">
      <span class="logo-icon">◈</span>
      <span class="logo-text">NEXUS IDE</span>
    </div>
    <div class="toolbar">
      <button 
        class="toolbar-button" 
        class:active={showFileExplorer}
        on:click={toggleFileExplorer}
        title="Toggle File Explorer (Ctrl+B)"
      >
        📁
      </button>
      <button 
        class="toolbar-button"
        class:active={showTerminal}
        on:click={toggleTerminal}
        title="Toggle Terminal (Ctrl+`)"
      >
        💻
      </button>
    </div>
  </div>

  <div class="main-content">
    {#if showFileExplorer}
      <div class="file-explorer" style="width: {explorerWidth}px;">
        <FileExplorer />
      </div>
      <div class="resizer"></div>
    {/if}

    <div class="editor-container">
      <div class="tabs">
        {#each $openFiles as file}
          <div
            class="tab"
            class:active={$currentFile === file}
            role="tab"
            tabindex="0"
            on:click={() => currentFile.set(file)}
            on:keydown={(e) => e.key === 'Enter' && currentFile.set(file)}
          >
            <span class="tab-name">{file.split('/').pop()}</span>
            <button
              type="button"
              class="tab-close"
              on:click|stopPropagation={() => {
                openFiles.update(files => files.filter(f => f !== file));
                if ($currentFile === file && $openFiles.length > 0) {
                  currentFile.set($openFiles[0]);
                } else if ($openFiles.length === 0) {
                  currentFile.set(null);
                }
              }}
              aria-label="Close tab"
            >×</button>
          </div>
        {/each}
      </div>

      <div class="editor-wrapper">
        {#if $currentFile}
          <Editor file={$currentFile} />
        {:else}
          <div class="welcome-screen">
            <div class="welcome-content">
              <h1>◈ NEXUS IDE</h1>
              <p>A modern, cross-platform desktop IDE</p>
              <div class="welcome-features">
                <div class="feature">
                  <span class="feature-icon">🎨</span>
                  <span>Syntax Highlighting for 100+ Languages</span>
                </div>
                <div class="feature">
                  <span class="feature-icon">📁</span>
                  <span>File Explorer</span>
                </div>
                <div class="feature">
                  <span class="feature-icon">💻</span>
                  <span>Integrated Terminal</span>
                </div>
                <div class="feature">
                  <span class="feature-icon">⚡</span>
                  <span>High Performance</span>
                </div>
              </div>
              <p class="welcome-hint">Open a file to start editing</p>
            </div>
          </div>
        {/if}
      </div>

      {#if showTerminal}
        <div class="terminal-wrapper" style="height: {terminalHeight}px;">
          <Terminal />
        </div>
      {/if}
    </div>
  </div>
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow: hidden;
  }

  .ide-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background: #1e1e1e;
    color: #cccccc;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 16px;
    background: #252526;
    border-bottom: 1px solid #3e3e42;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 600;
    font-size: 14px;
  }

  .logo-icon {
    font-size: 20px;
    color: #61dafb;
  }

  .logo-text {
    letter-spacing: 0.5px;
  }

  .toolbar {
    display: flex;
    gap: 4px;
  }

  .toolbar-button {
    padding: 6px 12px;
    background: transparent;
    border: none;
    color: #cccccc;
    cursor: pointer;
    border-radius: 4px;
    font-size: 16px;
    transition: background 0.2s;
  }

  .toolbar-button:hover {
    background: #37373d;
  }

  .toolbar-button.active {
    background: #37373d;
  }

  .main-content {
    display: flex;
    flex: 1;
    overflow: hidden;
  }

  .file-explorer {
    background: #252526;
    border-right: 1px solid #3e3e42;
    overflow-y: auto;
    flex-shrink: 0;
  }

  .resizer {
    width: 4px;
    cursor: col-resize;
    background: #3e3e42;
  }

  .resizer:hover {
    background: #007acc;
  }

  .editor-container {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
  }

  .tabs {
    display: flex;
    background: #2d2d30;
    border-bottom: 1px solid #3e3e42;
    overflow-x: auto;
  }

  .tab {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background: transparent;
    color: #969696;
    cursor: pointer;
    border-right: 1px solid #3e3e42;
    font-size: 13px;
    white-space: nowrap;
    outline: none;
  }

  .tab:hover {
    background: #37373d;
  }

  .tab:focus {
    outline: 1px solid #007acc;
    outline-offset: -1px;
  }

  .tab.active {
    background: #1e1e1e;
    color: #ffffff;
  }

  .tab-name {
    user-select: none;
  }

  .tab-close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    border-radius: 3px;
    font-size: 16px;
    line-height: 1;
    opacity: 0.7;
    background: transparent;
    border: none;
    color: inherit;
    cursor: pointer;
    padding: 0;
  }

  .tab-close:hover {
    background: #464647;
    opacity: 1;
  }

  .editor-wrapper {
    flex: 1;
    overflow: hidden;
  }

  .terminal-wrapper {
    border-top: 1px solid #3e3e42;
    overflow: hidden;
  }

  .welcome-screen {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    background: #1e1e1e;
  }

  .welcome-content {
    text-align: center;
    max-width: 600px;
    padding: 40px;
  }

  .welcome-content h1 {
    font-size: 48px;
    margin: 0 0 16px 0;
    color: #61dafb;
  }

  .welcome-content > p {
    font-size: 18px;
    color: #969696;
    margin: 0 0 40px 0;
  }

  .welcome-features {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 40px;
  }

  .feature {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px;
    background: #252526;
    border-radius: 8px;
    text-align: left;
  }

  .feature-icon {
    font-size: 24px;
  }

  .welcome-hint {
    font-size: 14px;
    color: #646464;
    margin-top: 20px;
  }
</style>
