<script>
  import { FileText, ChevronDown } from 'lucide-svelte'

  let files = ['main.rs', 'lib.rs', 'config.json']
  let expanded = true
</script>

<div class="w-64 bg-[#0f0f0f] border-r border-[#2d2d2d] flex flex-col h-full">
  <!-- Header -->
  <div class="flex items-center justify-between px-4 py-3 border-b border-[#2d2d2d]">
    <h3 class="text-sm font-semibold text-white">Files</h3>
    <button
      on:click={() => (expanded = !expanded)}
      class="text-gray-400 hover:text-white transition"
    >
      <ChevronDown size={16} class={expanded ? '' : '-rotate-90'} />
    </button>
  </div>

  <!-- File List -->
  {#if expanded}
    <div class="flex-1 overflow-y-auto">
      {#each files as file}
        <button
          class="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-[#1a1a1a] hover:text-white transition flex items-center gap-2"
        >
          <FileText size={14} class="text-gray-500" />
          {file}
        </button>
      {/each}
    </div>
  {/if}

  <!-- Bottom Stats -->
  <div class="border-t border-[#2d2d2d] px-4 py-3 text-xs text-gray-500">
    <div>{files.length} files</div>
  </div>
</div>

<style>
</style>
