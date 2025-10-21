import React, { useState, useRef, useEffect } from 'react';
import { executeCommand } from '../tauri-api';

interface TerminalProps {
  onClose: () => void;
}

export const Terminal: React.FC<TerminalProps> = ({ onClose }) => {
  const [output, setOutput] = useState<string>('$ Welcome to Terminal\n');
  const [input, setInput] = useState<string>('');
  const [isExecuting, setIsExecuting] = useState(false);
  const outputEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    outputEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [output]);

  const handleExecute = async () => {
    if (!input.trim()) return;

    setOutput(prev => prev + `\n$ ${input}\n`);
    setIsExecuting(true);

    try {
      // Parse command and args
      const parts = input.trim().split(' ');
      const cmd = parts[0];
      const args = parts.slice(1);

      const result = await executeCommand(cmd, args);
      setOutput(prev => prev + result + '\n');
    } catch (error) {
      setOutput(prev => prev + `Error: ${error instanceof Error ? error.message : 'Unknown error'}\n`);
    } finally {
      setIsExecuting(false);
      setInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleExecute();
    }
  };

  return (
    <div className="terminal">
      <div className="terminal-header">
        <span>💻 PowerShell Terminal</span>
        <button onClick={onClose}>✕</button>
      </div>
      <div className="terminal-content">
        {output.split('\n').map((line, idx) => (
          <div key={idx} className="terminal-line">
            {line}
          </div>
        ))}
        <div ref={outputEndRef} />
      </div>
      <div className="terminal-input-area">
        <span>$ </span>
        <input
          type="text"
          className="terminal-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter PowerShell command... (e.g., dir, pwd, npm --version)"
          disabled={isExecuting}
          autoFocus
        />
      </div>
    </div>
  );
};
