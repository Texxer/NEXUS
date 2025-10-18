<script>
  let output = [
    'NEXUS IDE Terminal Ready',
    'Type commands to execute...',
    '',
    '> '
  ]
  let input = ''

  function handleCommand(e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (input.trim()) {
        output.push(input)
        output.push('Command executed: ' + input)
        output.push('> ')
        input = ''
        output = output
      }
    }
  }
</script>

<div class="h-40 bg-[#1e1e1e] border-t border-[#3e3e42] flex flex-col text-[#d4d4d4]">
  <div class="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-[#3e3e42]">
    <h3 class="text-sm font-semibold">TERMINAL</h3>
    <button class="text-xs px-2 py-1 hover:bg-[#3e3e42] rounded">✕</button>
  </div>

  <div class="flex-1 overflow-y-auto p-3 font-mono text-sm">
    {#each output as line}
      <div>{line}</div>
    {/each}
  </div>

  <div class="flex items-center gap-2 px-3 py-2 border-t border-[#3e3e42]">
    <span class="text-green-400">></span>
    <input
      bind:value={input}
      on:keydown={handleCommand}
      class="flex-1 bg-transparent text-[#d4d4d4] outline-none text-sm"
      placeholder="Type command..."
    />
  </div>
</div>
