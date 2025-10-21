import { MonacoEditor } from './MonacoEditor';
import { FileTypeSelector, FileType } from './FileTypeSelector';
import { useState, useCallback } from 'react';
import { invoke } from '@tauri-apps/api/core';

interface EditorProps {
  file: string | null;
  content: string;
  onChange: (content: string) => void;
  onSave: () => void;
  onOpen: () => void;
  onFileChange?: (newFile: string) => void;
}

export const Editor = ({
  file,
  content,
  onChange,
  onSave,
  onOpen,
  onFileChange,
}: EditorProps) => {
  const [showFileTypeSelector, setShowFileTypeSelector] = useState(false);

  const handleSaveAs = useCallback(
    async (fileType: FileType) => {
      try {
        if (!file) {
          console.error('No file selected');
          return;
        }

        // Extract base path without extension
        const basePath = file.substring(0, file.lastIndexOf('.'));
        const newPath = `${basePath}.${fileType.ext}`;

        // Call Tauri command to save file
        const result = await invoke<{ new_path: string; bytes_written: number }>(
          'save_file_as',
          {
            path: file,
            content: content,
            target_extension: fileType.ext,
            apply_converter: false,
          }
        );

        console.log(`✅ Saved as ${result.new_path} (${result.bytes_written} bytes)`);

        // Update the current file path
        if (onFileChange) {
          onFileChange(result.new_path);
        }

        setShowFileTypeSelector(false);
      } catch (error) {
        console.error('Save As failed:', error);
      }
    },
    [file, content, onFileChange]
  );

  return (
    <div className="editor">
      <MonacoEditor
        file={file}
        content={content}
        onChange={onChange}
        onSave={onSave}
        onOpen={onOpen}
        onSaveAs={() => setShowFileTypeSelector(true)}
      />
      {showFileTypeSelector && (
        <FileTypeSelector
          currentFile={file}
          onSelectFileType={handleSaveAs}
          onCancel={() => setShowFileTypeSelector(false)}
        />
      )}
    </div>
  );
};
