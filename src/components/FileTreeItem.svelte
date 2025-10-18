<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  export let entry: { name: string; is_dir: boolean; path: string };
  export let indentLevel: number = 0;
  export let expanded: boolean = false;

  const dispatch = createEventDispatcher();

  function getFileIcon(name: string, isDir: boolean): string {
    if (isDir) {
      return expanded ? '📂' : '📁';
    }
    
    const ext = name.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'ts':
      case 'tsx':
        return '📘';
      case 'js':
      case 'jsx':
        return '📙';
      case 'rs':
        return '🦀';
      case 'py':
        return '🐍';
      case 'html':
        return '🌐';
      case 'css':
      case 'scss':
        return '🎨';
      case 'json':
        return '📋';
      case 'md':
        return '📝';
      case 'svelte':
        return '🔶';
      default:
        return '📄';
    }
  }

  function handleClick() {
    if (entry.is_dir) {
      dispatch('toggle');
    } else {
      dispatch('open');
    }
  }
</script>

<button
  class="tree-item"
  class:directory={entry.is_dir}
  style="padding-left: {indentLevel * 16 + 8}px;"
  on:click={handleClick}
>
  <span class="icon">{getFileIcon(entry.name, entry.is_dir)}</span>
  <span class="name">{entry.name}</span>
</button>

<style>
  .tree-item {
    display: flex;
    align-items: center;
    gap: 6px;
    width: 100%;
    padding: 4px 8px;
    background: transparent;
    border: none;
    color: #cccccc;
    cursor: pointer;
    text-align: left;
    font-size: 13px;
    transition: background 0.1s;
  }

  .tree-item:hover {
    background: #37373d;
  }

  .tree-item:focus {
    outline: 1px solid #007acc;
    outline-offset: -1px;
  }

  .icon {
    font-size: 14px;
    flex-shrink: 0;
  }

  .name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .directory .name {
    font-weight: 500;
  }
</style>
