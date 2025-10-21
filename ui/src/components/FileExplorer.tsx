import React from 'react';
import './FileExplorer.css';

interface FileExplorerProps {
  files: string[];
  activeFile: string | null;
  onSelectFile: (file: string) => void;
  currentDir: string;
}

export const FileExplorer: React.FC<FileExplorerProps> = ({
  files,
  activeFile,
  onSelectFile,
  currentDir,
}) => {
  const getFileIcon = (file: string) => {
    if (file.endsWith('.rs')) return '🦀';
    if (file.endsWith('.ts') || file.endsWith('.tsx')) return '📘';
    if (file.endsWith('.js') || file.endsWith('.jsx')) return '📕';
    if (file.endsWith('.py')) return '🐍';
    if (file.endsWith('.md')) return '📝';
    if (file.endsWith('.json')) return '⚙️';
    if (file.endsWith('.css')) return '🎨';
    if (file.endsWith('.html')) return '🌐';
    return '📄';
  };

  return (
    <div className="file-explorer">
      <div className="file-explorer-header">
        <span>📁 Explorer</span>
      </div>
      <div className="file-explorer-path" title={currentDir}>{currentDir}</div>
      <div className="file-explorer-content">
        {files.length === 0 ? (
          <div className="file-explorer-empty">No files</div>
        ) : (
          files.map((file) => (
            <div
              key={file}
              className={`file-item ${activeFile === file ? 'active' : ''}`}
              onClick={() => onSelectFile(file)}
              title={file}
            >
              <span className="file-icon">{getFileIcon(file)}</span>
              <span className="file-name">{file}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
