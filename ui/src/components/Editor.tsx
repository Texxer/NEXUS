import React, { useRef, useEffect } from 'react';

interface EditorProps {
  file: string | null;
  content: string;
  onChange: (content: string) => void;
  onSave: () => void;
  onOpen: () => void;
}

export const Editor: React.FC<EditorProps> = ({ file, content, onChange, onSave, onOpen }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        onSave();
      }
      if (e.ctrlKey && e.key === 'o') {
        e.preventDefault();
        onOpen();
      }
      if (e.ctrlKey && e.key === '/') {
        e.preventDefault();
        toggleComment();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSave, onOpen, content]);

  const toggleComment = () => {
    if (!textareaRef.current) return;
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    if (!selectedText) return;
    
    const lines = selectedText.split('\n');
    const isCommented = lines.every(line => line.trim().startsWith('//'));
    const newLines = lines.map(line => {
      if (isCommented) {
        return line.replace(/^\s*\/\/\s?/, '');
      } else {
        return '// ' + line;
      }
    });
    const newContent = content.substring(0, start) + newLines.join('\n') + content.substring(end);
    onChange(newContent);
  };

  return (
    <div className="editor">
      <div className="editor-header">
        <span className="editor-title">{file || 'No file selected'}</span>
        <div className="editor-shortcuts">
          <span title="Ctrl+S">💾</span>
          <span title="Ctrl+O">📂</span>
          <span title="Ctrl+/">💬</span>
        </div>
      </div>
      <textarea
        ref={textareaRef}
        className="editor-content"
        value={content}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Start typing... (Ctrl+O to open, Ctrl+S to save, Ctrl+/ to comment)"
        spellCheck="false"
      />
    </div>
  );
};
