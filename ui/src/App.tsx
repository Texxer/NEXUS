import { useState, useEffect } from 'react';
import { FileExplorer } from './components/FileExplorer';
import { Editor } from './components/Editor';
import { Sidebar } from './components/Sidebar';
import { StatusBar } from './components/StatusBar';
import { Terminal } from './components/Terminal';
import './App.css';

function App() {
  const [activeFile, setActiveFile] = useState<string | null>(null);
  const [files, setFiles] = useState<string[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [showTerminal, setShowTerminal] = useState(false);

  // Load initial files
  useEffect(() => {
    // This would fetch from the backend
    setFiles([
      'src/main.ts',
      'src/editor.ts',
      'src/analyzer.ts',
      'README.md',
    ]);
  }, []);

  return (
    <div className={`zenith-container ${theme}`}>
      <div className="zenith-layout">
        <Sidebar activeFile={activeFile} theme={theme} onThemeChange={setTheme} />
        
        <div className="zenith-main">
          <div className="zenith-editor-area">
            <FileExplorer 
              files={files} 
              activeFile={activeFile}
              onSelectFile={setActiveFile}
            />
            <Editor 
              file={activeFile}
              content=""
              onChange={() => {}}
            />
          </div>
          
          {showTerminal && (
            <Terminal onClose={() => setShowTerminal(false)} />
          )}
        </div>
      </div>
      
      <StatusBar 
        theme={theme}
        onToggleTerminal={() => setShowTerminal(!showTerminal)}
      />
    </div>
  );
}

export default App;
