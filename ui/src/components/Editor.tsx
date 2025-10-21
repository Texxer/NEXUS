import { MonacoEditor } from './MonacoEditor';

interface EditorProps {
  file: string | null;
  content: string;
  onChange: (content: string) => void;
  onSave: () => void;
  onOpen: () => void;
}

export const Editor = ({ file, content, onChange, onSave, onOpen }: EditorProps) => {
  return (
    <div className="editor">
      <MonacoEditor
        file={file}
        content={content}
        onChange={onChange}
        onSave={onSave}
        onOpen={onOpen}
      />
    </div>
  );
};
