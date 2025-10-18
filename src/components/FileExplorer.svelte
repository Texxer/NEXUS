<script lang="ts">
  import { invoke } from '@tauri-apps/api/core';
  import { open } from '@tauri-apps/plugin-dialog';
  import { currentFile, openFiles, currentDirectory } from '../stores/fileStore';
  import { onMount } from 'svelte';

  interface DirEntry {
    name: string;
    is_dir: boolean;
    path: string;
  }

  let rootPath: string = '';
  let entries: DirEntry[] = [];
  let expandedDirs = new Set<string>();
  let loading = false;
  let error = '';

  async function selectFolder() {
    try {
      const selected = await open({
        directory: true,
        multiple: false,
      });

      if (selected && typeof selected === 'string') {
        rootPath = selected;
        currentDirectory.set(rootPath);
        await loadDirectory(rootPath);
      }
    } catch (e) {
      error = `Failed to select folder: ${e}`;
    }
  }

  async function loadDirectory(path: string): Promise<DirEntry[]> {
    try {
      loading = true;
      error = '';
      const result = await invoke<DirEntry[]>('list_directory', { path });
      if (path === rootPath) {
        entries = result;
      }
      return result;
    } catch (e) {
      error = `Failed to load directory: ${e}`;
      return [];
    } finally {
      loading = false;
    }
  }

  async function toggleDirectory(entry: DirEntry) {
    if (!entry.is_dir) return;

    const path = entry.path;
    if (expandedDirs.has(path)) {
      expandedDirs.delete(path);
      expandedDirs = expandedDirs;
    } else {
      expandedDirs.add(path);
      expandedDirs = expandedDirs;
      await loadDirectory(path);
    }
  }

  async function openFile(entry: DirEntry) {
    if (entry.is_dir) {
      await toggleDirectory(entry);
      return;
    }

    try {
      currentFile.set(entry.path);
      openFiles.update(files => {
        if (!files.includes(entry.path)) {
          return [...files, entry.path];
        }
        return files;
      });
    } catch (e) {
      error = `Failed to open file: ${e}`;
    }
  }

  function getIndentLevel(path: string): number {
    if (!rootPath) return 0;
    const relativePath = path.substring(rootPath.length);
    return (relativePath.match(/[\/\\]/g) || []).length;
  }

  onMount(() => {
    // Try to load the current directory if set
    const unsubscribe = currentDirectory.subscribe(async (dir) => {
      if (dir && !rootPath) {
        rootPath = dir;
        await loadDirectory(dir);
      }
    });

    return unsubscribe;
  });
</script>

<div class="file-explorer-container">
  <div class="explorer-header">
    <h3>Explorer</h3>
    <button class="icon-button" on:click={selectFolder} title="Open Folder">
      📂
    </button>
  </div>

  {#if error}
    <div class="error-message">{error}</div>
  {/if}

  {#if loading}
    <div class="loading">Loading...</div>
  {/if}

  {#if !rootPath}
    <div class="empty-state">
      <p>No folder opened</p>
      <button class="primary-button" on:click={selectFolder}>
        Open Folder
      </button>
    </div>
  {:else}
    <div class="file-tree">
      {#each entries as entry}
        <FileTreeItem 
          {entry} 
          indentLevel={0}
          expanded={expandedDirs.has(entry.path)}
          on:toggle={() => toggleDirectory(entry)}
          on:open={() => openFile(entry)}
        />
      {/each}
    </div>
  {/if}
</div>

<script context="module" lang="ts">
  import FileTreeItem from './FileTreeItem.svelte';
</script>

<style>
  .file-explorer-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    color: #cccccc;
  }

  .explorer-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    border-bottom: 1px solid #3e3e42;
  }

  .explorer-header h3 {
    margin: 0;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #969696;
  }

  .icon-button {
    background: transparent;
    border: none;
    color: #cccccc;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 14px;
  }

  .icon-button:hover {
    background: #37373d;
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
    text-align: center;
  }

  .empty-state p {
    margin: 0 0 16px 0;
    color: #969696;
    font-size: 13px;
  }

  .primary-button {
    padding: 8px 16px;
    background: #007acc;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 13px;
    font-weight: 500;
  }

  .primary-button:hover {
    background: #0098ff;
  }

  .error-message {
    padding: 8px 12px;
    background: #5a1d1d;
    color: #f48771;
    font-size: 12px;
    border-left: 3px solid #f48771;
    margin: 8px;
  }

  .loading {
    padding: 12px;
    text-align: center;
    color: #969696;
    font-size: 13px;
  }

  .file-tree {
    flex: 1;
    overflow-y: auto;
    padding: 4px 0;
  }
</style>
