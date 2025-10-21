import { useState, useEffect } from 'react';
import { FileExplorer } from './components/FileExplorer';
import { Editor } from './components/Editor';
import { Sidebar } from './components/Sidebar';
import { StatusBar } from './components/StatusBar';
import { Terminal } from './components/Terminal';
import { ChatPanel } from './components/ChatPanel';
import { openFile, saveFile, listFiles, detectLanguage, analyzeCode, openInExplorer } from './tauri-api';
import './App.css';

function App() {
  const [activeFile, setActiveFile] = useState<string | null>(null);
  const [files, setFiles] = useState<string[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [showTerminal, setShowTerminal] = useState(false);
  const [showChat, setShowChat] = useState(true);
  const [code, setCode] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<string>('');
  const [detectedLanguage, setDetectedLanguage] = useState<string>('Unknown');
  const [currentDir, setCurrentDir] = useState<string>('C:\\Users\\Michael\\OneDrive\\generalAI\\IDE\\ui\\src');
  const [statusMessage, setStatusMessage] = useState<string>('Ready');

  // Load files from current directory
  const loadFilesFromDir = async (dir: string) => {
    try {
      const fileList = await listFiles(dir);
      setFiles(fileList.sort());
      setCurrentDir(dir);
      setStatusMessage(`Loaded: ${fileList.length} files`);
    } catch (error) {
      setStatusMessage(`Error loading files: ${error}`);
    }
  };

  // Load initial files
  useEffect(() => {
    loadFilesFromDir(currentDir);
  }, []);

  // Setup Ctrl+` to toggle terminal
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === '`') {
        e.preventDefault();
        setShowTerminal(prev => !prev);
        setStatusMessage(`Terminal ${showTerminal ? 'closed' : 'opened'}`);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [showTerminal]);

  // Handle file selection and load
  const handleSelectFile = async (file: string) => {
    const filePath = `${currentDir}\\${file}`;
    try {
      const content = await openFile(filePath);
      setCode(content);
      setActiveFile(file);
      
      // Detect language
      const lang = await detectLanguage(filePath, content);
      setDetectedLanguage(lang);
      
      setStatusMessage(`Opened: ${file} (${lang})`);
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
      setStatusMessage(`✅ Saved: ${activeFile}`);
    } catch (error) {
      setStatusMessage(`Error saving file: ${error}`);
    }
  };

  // Handle open file dialog - open in Windows Explorer
  const handleOpen = async () => {
    try {
      await openInExplorer(currentDir);
      setStatusMessage('Opened in Explorer');
    } catch (error) {
      setStatusMessage(`Error opening explorer: ${error}`);
    }
  };

  // Analyze code when it changes
  const handleCodeChange = async (newCode: string) => {
    setCode(newCode);
    
    if (newCode.length > 50 && activeFile) {
      try {
        const filePath = `${currentDir}\\${activeFile}`;
        const result = await analyzeCode(filePath, newCode);
        setAnalysisResult(result);
      } catch (error) {
        console.error('Analysis error:', error);
      }
    }
  };

  return (
    <div className={`zenith-container ${theme}`}>
      <div className="zenith-layout">
        <Sidebar 
          activeFile={activeFile} 
          theme={theme} 
          showTerminal={showTerminal}
          onThemeChange={setTheme}
          onToggleTerminal={() => setShowTerminal(!showTerminal)}
        />
        
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

        {showChat && (
          <ChatPanel selectedCode={code.substring(0, 100)} fileName={activeFile || undefined} />
        )}
      </div>
      
      <StatusBar 
        theme={theme}
        onToggleTerminal={() => setShowTerminal(!showTerminal)}
        statusMessage={statusMessage}
        analysisResult={analysisResult}
        detectedLanguage={detectedLanguage}
      />
    </div>
  );
}

export default App;
