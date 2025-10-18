import React from 'react';

interface EditorProps {
  file: string | null;
  content: string;
  onChange: (content: string) => void;
}

export const Editor: React.FC<EditorProps> = ({ file, content, onChange }) => {
  return (
    <div className="editor">
      <div className="editor-header">
        <span>{file || 'No file selected'}</span>
      </div>
      <textarea
        className="editor-content"
        value={content}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Start typing..."
      />
    </div>
  );
};
