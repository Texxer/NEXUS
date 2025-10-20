import React from 'react';

interface TerminalProps {
  onClose: () => void;
}

export const Terminal: React.FC<TerminalProps> = ({ onClose }) => {
  return (
    <div className="terminal">
      <div className="terminal-header">
        <span>Terminal</span>
        <button onClick={onClose}>✕</button>
      </div>
      <div className="terminal-content">
        $ npx zenith
      </div>
    </div>
  );
};
