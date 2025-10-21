import { useState, useEffect } from 'react';
import { FileExplorer } from './components/FileExplorer';
import { Editor } from './components/Editor';
import { Sidebar } from './components/Sidebar';
import { StatusBar } from './components/StatusBar';
import { Terminal } from './components/Terminal';
import { openFile, saveFile, listFiles, analyzeCode } from './tauri-api';
import './App.css';

function App() {
  const [activeFile, setActiveFile] = useState<string | null>(null);
  const [files, setFiles] = useState<string[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [showTerminal, setShowTerminal] = useState(false);
  const [code, setCode] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<string>('');
  const [currentDir, setCurrentDir] = useState<string>('C:\\Users\\Michael\\OneDrive\\generalAI\\IDE\\ui\\src');
  const [statusMessage, setStatusMessage] = useState<string>('Ready');

  // Load files from current directory
  const loadFilesFromDir = async (dir: string) => {
    const fileList = await listFiles(dir);
    setFiles(fileList.sort());
    setCurrentDir(dir);
  };

  // Load initial files
  useEffect(() => {
    loadFilesFromDir(currentDir);
  }, []);

  // Handle file selection and load
  const handleSelectFile = async (file: string) => {
    const filePath = `${currentDir}\\${file}`;
    try {
      const content = await openFile(filePath);
      setCode(content);
      setActiveFile(file);
      setStatusMessage(`Opened: ${file}`);
    } catch (error) {
      setStatusMessage(`Error opening file: ${error}`);
    }
  };

  // Handle save
  const handleSave = async () => {
    if (!activeFile) {
      setStatusMessage('No file selected to save');
      return;
    }
    const filePath = `${currentDir}\\${activeFile}`;
    try {
      await saveFile(filePath, code);
      setStatusMessage(`Saved: ${activeFile}`);
    } catch (error) {
      setStatusMessage(`Error saving file: ${error}`);
    }
  };

  // Handle open file dialog (simplified - just loads current directory)
  const handleOpen = async () => {
    setStatusMessage('Opening file...');
  };

  // Analyze code when it changes
  const handleCodeChange = async (newCode: string) => {
    setCode(newCode);
    if (newCode.length > 100) {
      const result = await analyzeCode(newCode);
      setAnalysisResult(result);
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
              onSelectFile={handleSelectFile}
              currentDir={currentDir}
            />
            <Editor 
              file={activeFile}
              content={code}
              onChange={handleCodeChange}
              onSave={handleSave}
              onOpen={handleOpen}
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
        statusMessage={statusMessage}
        analysisResult={analysisResult}
      />
    </div>
  );
}

export default App;
