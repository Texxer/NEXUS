<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { invoke } from '@tauri-apps/api/core';
  import { EditorView, keymap } from '@codemirror/view';
  import { EditorState } from '@codemirror/state';
  import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
  import { searchKeymap, highlightSelectionMatches } from '@codemirror/search';
  import { autocompletion, completionKeymap } from '@codemirror/autocomplete';
  import { bracketMatching, foldGutter, foldKeymap } from '@codemirror/language';
  import { lineNumbers, highlightActiveLineGutter } from '@codemirror/view';
  import { highlightActiveLine, drawSelection } from '@codemirror/view';
  import { languages } from '@codemirror/language-data';
  import { syntaxHighlighting, defaultHighlightStyle } from '@codemirror/language';
  import { oneDark } from '@codemirror/theme-one-dark';

  export let file: string;

  let editorContainer: HTMLDivElement;
  let view: EditorView | null = null;
  let content = '';
  let loading = false;
  let error = '';
  let isDirty = false;
  let lastSavedContent = '';

  async function loadFile() {
    try {
      loading = true;
      error = '';
      content = await invoke<string>('read_file', { path: file });
      lastSavedContent = content;
      isDirty = false;
      
      if (view) {
        view.destroy();
      }
      createEditor();
    } catch (e) {
      error = `Failed to load file: ${e}`;
      content = '';
    } finally {
      loading = false;
    }
  }

  async function saveFile() {
    try {
      const currentContent = view?.state.doc.toString() || '';
      await invoke('write_file', { path: file, content: currentContent });
      lastSavedContent = currentContent;
      isDirty = false;
      console.log('File saved:', file);
    } catch (e) {
      error = `Failed to save file: ${e}`;
    }
  }

  function getLanguageExtension(filename: string) {
    const ext = filename.split('.').pop()?.toLowerCase();
    
    // Try to find language by extension
    for (const lang of languages) {
      if (lang.extensions?.includes(`.${ext}`)) {
        return lang.load();
      }
    }
    
    return null;
  }

  async function createEditor() {
    if (!editorContainer) return;

    const languageExtension = await getLanguageExtension(file);
    const extensions = [
      lineNumbers(),
      highlightActiveLineGutter(),
      highlightActiveLine(),
      history(),
      foldGutter(),
      drawSelection(),
      EditorState.allowMultipleSelections.of(true),
      bracketMatching(),
      autocompletion(),
      highlightSelectionMatches(),
      syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
      oneDark,
      keymap.of([
        ...defaultKeymap,
        ...historyKeymap,
        ...foldKeymap,
        ...completionKeymap,
        ...searchKeymap,
        {
          key: 'Mod-s',
          run: () => {
            saveFile();
            return true;
          }
        }
      ]),
      EditorView.updateListener.of((update) => {
        if (update.docChanged) {
          const newContent = update.state.doc.toString();
          isDirty = newContent !== lastSavedContent;
        }
      }),
    ];

    if (languageExtension) {
      extensions.push(languageExtension);
    }

    view = new EditorView({
      state: EditorState.create({
        doc: content,
        extensions,
      }),
      parent: editorContainer,
    });
  }

  onMount(() => {
    loadFile();
  });

  onDestroy(() => {
    if (view) {
      view.destroy();
    }
  });

  $: if (file) {
    loadFile();
  }

  // Auto-save on Ctrl+S / Cmd+S
  function handleKeydown(e: KeyboardEvent) {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      saveFile();
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="editor-component">
  {#if loading}
    <div class="status">Loading...</div>
  {/if}
  
  {#if error}
    <div class="error">{error}</div>
  {/if}

  <div class="editor-wrapper">
    <div class="editor-status-bar">
      <span class="file-path">{file}</span>
      {#if isDirty}
        <span class="dirty-indicator">● Modified</span>
      {/if}
      <button class="save-button" on:click={saveFile} disabled={!isDirty}>
        Save (Ctrl+S)
      </button>
    </div>
    <div class="editor" bind:this={editorContainer}></div>
  </div>
</div>

<style>
  .editor-component {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: #282c34;
  }

  .status,
  .error {
    padding: 8px 16px;
    font-size: 13px;
  }

  .error {
    background: #5a1d1d;
    color: #f48771;
    border-left: 3px solid #f48771;
  }

  .editor-wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
  }

  .editor-status-bar {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 4px 12px;
    background: #21252b;
    border-bottom: 1px solid #181a1f;
    font-size: 12px;
    color: #abb2bf;
  }

  .file-path {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .dirty-indicator {
    color: #e5c07b;
    font-weight: 500;
  }

  .save-button {
    padding: 4px 12px;
    background: #528bff;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    font-size: 11px;
    font-weight: 500;
  }

  .save-button:hover:not(:disabled) {
    background: #6ea0ff;
  }

  .save-button:disabled {
    background: #3e4451;
    color: #5c6370;
    cursor: not-allowed;
  }

  .editor {
    flex: 1;
    overflow: auto;
  }

  :global(.cm-editor) {
    height: 100%;
    font-size: 14px;
  }

  :global(.cm-scroller) {
    overflow: auto;
  }

  :global(.cm-content) {
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace;
  }
</style>
