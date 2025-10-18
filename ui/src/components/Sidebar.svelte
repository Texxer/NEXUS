<script>
  let files = [
    { id: 1, name: 'main.rs', icon: '📄', selected: true },
    { id: 2, name: 'lib.rs', icon: '📄' },
    { id: 3, name: 'config.toml', icon: '⚙️' },
  ]

  function selectFile(fileId) {
    files = files.map(f => ({
      ...f,
      selected: f.id === fileId
    }))
  }
</script>

<div class="w-64 bg-[#252526] border-r border-[#3e3e42] flex flex-col h-screen">
  <!-- Header -->
  <div class="px-4 py-3 border-b border-[#3e3e42]">
    <h2 class="text-sm font-semibold text-[#cccccc]">EXPLORER</h2>
  </div>

  <!-- File List -->
  <div class="flex-1 overflow-y-auto">
    {#each files as file (file.id)}
      <button
        on:click={() => selectFile(file.id)}
        class="w-full px-4 py-2 text-sm flex items-center gap-2 text-left {file.selected
          ? 'bg-[#37373d] text-[#ffffff] border-l-2 border-[#007acc]'
          : 'text-[#cccccc] hover:bg-[#2d2d30]'}"
      >
        <span>{file.icon}</span>
        <span>{file.name}</span>
      </button>
    {/each}
  </div>

  <!-- Bottom Actions -->
  <div class="border-t border-[#3e3e42] p-3 flex gap-2">
    <button class="flex-1 px-3 py-1 bg-[#007acc] text-white text-xs rounded hover:bg-[#1084d7]">
      + New File
    </button>
  </div>
</div>
