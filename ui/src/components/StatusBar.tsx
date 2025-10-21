import React from 'react';

interface StatusBarProps {
  theme: string;
  onToggleTerminal: () => void;
  statusMessage?: string;
  analysisResult?: string;
}

export const StatusBar: React.FC<StatusBarProps> = ({ 
  onToggleTerminal,
  statusMessage = 'Ready',
  analysisResult = ''
}) => {
  return (
    <div className="status-bar">
      <div className="status-left">
        <span className="status-item">✓ {statusMessage}</span>
        {analysisResult && (
          <span className="status-item" style={{ marginLeft: '10px', color: '#888' }}>
            {analysisResult}
          </span>
        )}
      </div>
      <div className="status-right">
        <button 
          className="status-item"
          onClick={onToggleTerminal}
          title="Toggle Terminal"
        >
          🖥️ Terminal
        </button>
      </div>
    </div>
  );
};
