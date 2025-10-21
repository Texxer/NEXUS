import { useState, useEffect } from 'react';
import { FileExplorer } from './components/FileExplorer';
import { Editor } from './components/Editor';
import { Sidebar } from './components/Sidebar';
import { StatusBar } from './components/StatusBar';
import { Terminal } from './components/Terminal';
import { analyzeCode, getCompletions } from './tauri-api';
import './App.css';

function App() {
  const [activeFile, setActiveFile] = useState<string | null>(null);
  const [files, setFiles] = useState<string[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [showTerminal, setShowTerminal] = useState(false);
  const [code, setCode] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<string>('');

  // Load initial files
  useEffect(() => {
    setFiles([
      'src/main.ts',
      'src/editor.ts',
      'src/analyzer.ts',
      'README.md',
    ]);
  }, []);

  // Analyze code when it changes
  const handleCodeChange = async (newCode: string) => {
    setCode(newCode);
    if (newCode.length > 0) {
      const result = await analyzeCode(newCode);
      setAnalysisResult(result);
    }
  };

  // Get completions when user presses Ctrl+Space
  const handleGetCompletions = async () => {
    if (activeFile) {
      const completions = await getCompletions(activeFile, 0, code.length);
      console.log('Completions:', completions);
    }
  };

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
              content={code}
              onChange={handleCodeChange}
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
      
      {analysisResult && (
        <div style={{ 
          position: 'fixed', 
          bottom: 40, 
          right: 10, 
          padding: '8px', 
          background: '#333', 
          color: '#fff',
          borderRadius: '4px',
          fontSize: '12px'
        }}>
          {analysisResult}
        </div>
      )}
    </div>
  );
}

export default App;
