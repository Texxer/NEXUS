<script>
  import './app.css'
  import Editor from './components/Editor.svelte'
  import Sidebar from './components/Sidebar.svelte'
  import Terminal from './components/Terminal.svelte'
</script>

<div class="flex h-screen bg-[#0f0f0f]">
  <!-- Sidebar -->
  <Sidebar />

  <!-- Main Editor Area -->
  <div class="flex-1 flex flex-col">
    <!-- Editor -->
    <Editor />

    <!-- Terminal -->
    <Terminal />
  </div>
</div>
