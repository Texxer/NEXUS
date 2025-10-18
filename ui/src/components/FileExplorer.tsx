import React from 'react';
import './FileExplorer.css';

interface FileExplorerProps {
  files: string[];
  activeFile: string | null;
  onSelectFile: (file: string) => void;
}

export const FileExplorer: React.FC<FileExplorerProps> = ({
  files,
  activeFile,
  onSelectFile,
}) => {
  return (
    <div className="file-explorer">
      <div className="file-explorer-header">
        <span>Explorer</span>
      </div>
      <div className="file-explorer-content">
        {files.map((file) => (
          <div
            key={file}
            className={`file-item ${activeFile === file ? 'active' : ''}`}
            onClick={() => onSelectFile(file)}
          >
            <span className="file-icon">📄</span>
            <span className="file-name">{file}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
