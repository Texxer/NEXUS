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
    // Focus editor on mount
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+S for save
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        console.log('✅ Ctrl+S pressed - saving');
        onSave();
      }
      // Ctrl+O for open
      else if ((e.ctrlKey || e.metaKey) && e.key === 'o') {
        e.preventDefault();
        console.log('✅ Ctrl+O pressed - opening');
        onOpen();
      }
      // Ctrl+/ for toggle comment
      else if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        console.log('✅ Ctrl+/ pressed - toggling comment');
        toggleComment();
      }
    };

    // Attach listener to textarea directly
    textarea.addEventListener('keydown', handleKeyDown);
    return () => textarea.removeEventListener('keydown', handleKeyDown);
  }, [onSave, onOpen, content]);

  const toggleComment = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);

    if (!selectedText) {
      // No selection, comment current line
      const lineStart = content.lastIndexOf('\n', start) + 1;
      const lineEnd = content.indexOf('\n', start);
      const actualEnd = lineEnd === -1 ? content.length : lineEnd;
      const line = content.substring(lineStart, actualEnd);
      const trimmed = line.trim();
      const isCommented = trimmed.startsWith('//');

      if (isCommented) {
        const newLine = line.replace(/^\s*\/\/\s?/, '');
        const newContent = content.substring(0, lineStart) + newLine + content.substring(actualEnd);
        onChange(newContent);
      } else {
        const newLine = '// ' + line;
        const newContent = content.substring(0, lineStart) + newLine + content.substring(actualEnd);
        onChange(newContent);
      }
    } else {
      // Multi-line selection
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
    }
  };

  return (
    <div className="editor">
      <div className="editor-header">
        <span className="editor-title">{file || 'No file selected'}</span>
        <div className="editor-shortcuts">
          <span title="Ctrl+S - Save">💾</span>
          <span title="Ctrl+O - Open">📂</span>
          <span title="Ctrl+/ - Comment">💬</span>
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
