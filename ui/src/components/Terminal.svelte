<script>
  import { Terminal as TerminalIcon } from 'lucide-svelte'

  let output = ['NEXUS Pro v0.0.1', '> Ready for input', '']
  let input = ''

  function handleSubmit() {
    if (input.trim()) {
      output = [...output, `$ ${input}`, 'Command executed', '']
      input = ''
    }
  }
</script>

<div class="h-48 bg-[#0f0f0f] border-t border-[#2d2d2d] flex flex-col">
  <!-- Header -->
  <div class="flex items-center gap-2 px-4 py-2 bg-[#0f0f0f] border-b border-[#2d2d2d]">
    <TerminalIcon size={16} class="text-cyan-400" />
    <span class="text-sm text-gray-300">Terminal</span>
  </div>

  <!-- Output -->
  <div class="flex-1 overflow-y-auto bg-[#0a0a0a] font-mono text-xs text-gray-300 p-3">
    {#each output as line}
      <div class="text-gray-400">{line}</div>
    {/each}
  </div>

  <!-- Input -->
  <div class="flex items-center gap-2 bg-[#0a0a0a] border-t border-[#2d2d2d] px-3 py-2">
    <span class="text-cyan-400">$</span>
    <input
      bind:value={input}
      on:keydown={(e) => e.key === 'Enter' && handleSubmit()}
      class="flex-1 bg-transparent outline-none text-xs text-white font-mono"
      placeholder="Type a command..."
    />
  </div>
</div>

<style>
</style>
