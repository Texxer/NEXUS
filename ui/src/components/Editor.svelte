<script>
  import hljs from 'highlight.js'
  import 'highlight.js/styles/atom-one-dark.css'

  let code = '// Welcome to NEXUS IDE\n// The fastest IDE on Earth\n\nfn main() {\n  println!("Hello, NEXUS!");\n}'
  let language = 'rust'
  let highlightedCode = ''

  $: {
    try {
      highlightedCode = hljs.highlight(code, { language }).value
    } catch (e) {
      highlightedCode = hljs.highlight(code, { language: 'plaintext' }).value
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Tab') {
      e.preventDefault()
      const start = e.target.selectionStart
      const end = e.target.selectionEnd
      code = code.substring(0, start) + '\t' + code.substring(end)
      e.target.selectionStart = e.target.selectionEnd = start + 1
    }
  }

  function handleScroll(e) {
    const pre = document.querySelector('.highlight-pre')
    if (pre) {
      pre.scrollTop = e.target.scrollTop
      pre.scrollLeft = e.target.scrollLeft
    }
  }
</script>

<div class="flex-1 flex flex-col bg-[#1e1e1e] text-[#d4d4d4] overflow-hidden">
  <!-- Tab bar -->
  <div class="flex items-center gap-2 px-4 py-2 bg-[#252526] border-b border-[#3e3e42]">
    <span class="text-sm font-semibold">main.rs</span>
    <span class="text-xs text-[#858585]">●</span>
  </div>

  <!-- Editor container -->
  <div class="flex-1 relative overflow-hidden">
    <!-- Syntax highlighting layer -->
    <pre class="highlight-pre absolute inset-0 p-4 font-mono text-sm overflow-hidden pointer-events-none bg-[#1e1e1e]"><code class="hljs language-{language}">{@html highlightedCode}</code></pre>

    <!-- Textarea overlay -->
    <textarea
      bind:value={code}
      on:keydown={handleKeyDown}
      on:scroll={handleScroll}
      class="relative w-full h-full p-4 bg-transparent text-transparent caret-[#d4d4d4] font-mono text-sm resize-none outline-none"
      spellcheck="false"
      style="color: transparent; background: transparent; position: relative; z-index: 1;"
    />
  </div>
</div>

<style>
  .highlight-pre {
    margin: 0;
    white-space: pre-wrap;
    word-wrap: break-word;
    color: #d4d4d4;
  }

  textarea {
    font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
    resize: none;
  }

  :global(.hljs) {
    background: transparent !important;
    padding: 0 !important;
  }

  :global(.hljs-string) {
    color: #ce9178;
  }

  :global(.hljs-number) {
    color: #b5cea8;
  }

  :global(.hljs-literal) {
    color: #569cd6;
  }

  :global(.hljs-attr) {
    color: #9cdcfe;
  }

  :global(.hljs-title) {
    color: #dcdcaa;
  }

  :global(.hljs-params) {
    color: #9cdcfe;
  }

  :global(.hljs-comment) {
    color: #6a9955;
  }

  :global(.hljs-keyword) {
    color: #569cd6;
  }

  :global(.hljs-function) {
    color: #dcdcaa;
  }
</style>
