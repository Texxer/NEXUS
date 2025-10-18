<script>
  import { invoke } from '@tauri-apps/api/tauri'
  import { FileText, Play, Settings } from 'lucide-svelte'

  let currentFile = 'main.rs'
  let fileContent = '// Start typing...'
  let cursorPos = 0

  async function handleOpenFile() {
    try {
      const content = await invoke('open_file', { path: currentFile })
      fileContent = content
    } catch (e) {
      console.error('Failed to open file:', e)
    }
  }

  async function handleSaveFile() {
    try {
      await invoke('save_file', { path: currentFile, content: fileContent })
      console.log('File saved')
    } catch (e) {
      console.error('Failed to save file:', e)
    }
  }

  async function handleGetCompletions() {
    try {
      const completions = await invoke('get_completions', {
        content: fileContent,
        language: 'rust',
        position: cursorPos
      })
      console.log('Completions:', completions)
    } catch (e) {
      console.error('Failed to get completions:', e)
    }
  }

  function handleEditorInput(e) {
    fileContent = e.target.value
    cursorPos = e.target.selectionStart
  }
</script>

<div class="flex flex-col h-full bg-[#1a1a1a]">
  <!-- Toolbar -->
  <div class="flex items-center justify-between bg-[#0f0f0f] border-b border-[#2d2d2d] px-4 py-2 gap-2">
    <div class="flex items-center gap-2">
      <FileText size={18} class="text-cyan-400" />
      <span class="text-sm text-gray-400">{currentFile}</span>
    </div>
    <div class="flex items-center gap-2">
      <button
        on:click={handleOpenFile}
        class="px-3 py-1 bg-[#252525] hover:bg-[#333333] text-sm rounded transition"
        title="Open file"
      >
        Open
      </button>
      <button
        on:click={handleSaveFile}
        class="px-3 py-1 bg-cyan-600 hover:bg-cyan-700 text-sm rounded transition"
        title="Save file"
      >
        Save
      </button>
      <button
        on:click={handleGetCompletions}
        class="px-3 py-1 bg-[#252525] hover:bg-[#333333] text-sm rounded transition"
        title="AI completions"
      >
        <Play size={14} class="inline mr-1" />
        AI
      </button>
    </div>
  </div>

  <!-- Editor Content -->
  <div class="flex-1 overflow-hidden">
    <textarea
      bind:value={fileContent}
      on:input={handleEditorInput}
      class="w-full h-full bg-[#1a1a1a] text-white font-mono text-sm resize-none outline-none p-4"
      spellcheck="false"
    />
  </div>
</div>

<style>
  textarea::selection {
    background-color: rgba(6, 182, 212, 0.3);
  }
</style>
