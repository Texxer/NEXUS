import React from 'react';

interface StatusBarProps {
  theme: string;
  onToggleTerminal: () => void;
}

export const StatusBar: React.FC<StatusBarProps> = ({ onToggleTerminal }) => {
  return (
    <div className="status-bar">
      <div className="status-left">
        <span className="status-item">✓ Ready</span>
      </div>
      <div className="status-right">
        <button 
          className="status-item"
          onClick={onToggleTerminal}
          title="Toggle Terminal"
        >
          Terminal
        </button>
      </div>
    </div>
  );
};
