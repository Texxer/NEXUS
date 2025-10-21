import React from 'react';

interface StatusBarProps {
  theme: string;
  onToggleTerminal: () => void;
  statusMessage?: string;
  analysisResult?: string;
  detectedLanguage?: string;
}

export const StatusBar: React.FC<StatusBarProps> = ({ 
  onToggleTerminal,
  statusMessage = 'Ready',
  analysisResult = '',
  detectedLanguage = 'Unknown'
}) => {
  return (
    <div className="status-bar">
      <div className="status-left">
        <span className="status-item">✓ {statusMessage}</span>
        {detectedLanguage && detectedLanguage !== 'Unknown' && (
          <span className="status-item" style={{ marginLeft: '10px', color: '#ffc107' }}>
            🔤 {detectedLanguage}
          </span>
        )}
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
          title="Toggle Terminal (Ctrl+`)"
        >
          � Terminal
        </button>
      </div>
    </div>
  );
};
