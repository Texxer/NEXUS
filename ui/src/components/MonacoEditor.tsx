import React, { useRef, useEffect, useCallback } from 'react';
import Editor, { useMonaco } from '@monaco-editor/react';
import type { editor as editorType } from 'monaco-editor';

interface MonacoEditorProps {
  file: string | null;
  content: string;
  onChange: (content: string) => void;
  onSave: () => void;
  onOpen: () => void;
}

/**
 * MonacoEditor Wrapper Component
 * Provides a professional code editor with:
 * - Line numbers and gutter
 * - Syntax highlighting for 150+ languages
 * - Code folding and minimap
 * - All keybinds (Ctrl+S, Ctrl+O, Ctrl+/)
 * - VS Code dark theme
 * - Smart indentation and formatting
 */
export const MonacoEditor = ({
  file,
  content,
  onChange,
  onSave,
  onOpen,
}: MonacoEditorProps) => {
  const editorRef = useRef<editorType.IStandaloneCodeEditor | null>(null);
  useMonaco();

  // Detect language from file extension
  const getLanguageFromFile = useCallback((fileName: string): string => {
    if (!fileName) return 'text';

    const ext = fileName.split('.').pop()?.toLowerCase() || '';
    const langMap: Record<string, string> = {
      // Web
      js: 'javascript',
      jsx: 'javascript',
      ts: 'typescript',
      tsx: 'typescript',
      html: 'html',
      htm: 'html',
      css: 'css',
      scss: 'scss',
      sass: 'scss',
      less: 'less',

      // Backend
      py: 'python',
      rb: 'ruby',
      go: 'go',
      rs: 'rust',
      java: 'java',
      kotlin: 'kotlin',
      swift: 'swift',
      cpp: 'cpp',
      c: 'c',
      cc: 'cpp',
      cxx: 'cpp',
      h: 'cpp',
      hpp: 'cpp',
      cs: 'csharp',
      php: 'php',

      // Data & Config
      json: 'json',
      xml: 'xml',
      yaml: 'yaml',
      yml: 'yaml',
      toml: 'toml',
      ini: 'ini',
      properties: 'properties',
      env: 'plaintext',

      // Markup & Documentation
      md: 'markdown',
      markdown: 'markdown',
      tex: 'latex',
      sql: 'sql',
      graphql: 'graphql',

      // Shell & Scripts
      sh: 'shell',
      bash: 'shell',
      zsh: 'shell',
      ps1: 'powershell',
      bat: 'bat',
      cmd: 'bat',

      // Other
      vue: 'vue',
      r: 'r',
      pl: 'perl',
      lua: 'lua',
      groovy: 'groovy',
      gradle: 'groovy',
      dockerfile: 'dockerfile',
      docker: 'dockerfile',
      gitignore: 'plaintext',
      gitattributes: 'plaintext',
      diff: 'diff',
      patch: 'diff',
    };

    return langMap[ext] || 'plaintext';
  }, []);

  const detectedLanguage = getLanguageFromFile(file || '');

  // Handle editor mount
  const handleEditorMount = useCallback((editor: editorType.IStandaloneCodeEditor) => {
    editorRef.current = editor;
    editor.focus();
  }, []);

  // Handle content change
  const handleChange = useCallback((value: string | undefined) => {
    if (value !== undefined) {
      onChange(value);
    }
  }, [onChange]);

  // Setup keyboard shortcuts
  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;

    // Handle Ctrl+S, Ctrl+O, Ctrl+/ using editor's onKeyDown event
    const keydownListener = editor.onKeyDown((e) => {
      // Ctrl+S - Save (keyCode 49 = 'S')
      if (e.ctrlKey && e.keyCode === 49) {
        e.preventDefault();
        console.log('✅ Ctrl+S pressed (Monaco) - saving');
        onSave();
      }
      // Ctrl+O - Open (keyCode 48 = 'O')
      else if (e.ctrlKey && e.keyCode === 48) {
        e.preventDefault();
        console.log('✅ Ctrl+O pressed (Monaco) - opening');
        onOpen();
      }
      // Ctrl+/ - Comment (keyCode 191 = '/')
      else if (e.ctrlKey && (e.keyCode as any) === 191) {
        e.preventDefault();
        editor.trigger('custom', 'editor.action.commentLine', {});
      }
    });

    return () => keydownListener?.dispose();
  }, [onSave, onOpen]);

  // Focus editor on file change
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  }, [file]);

  return (
    <div className="monaco-editor-wrapper">
      <div className="editor-header">
        <span className="editor-title">
          {file ? (
            <>
              <span className="file-icon">📄</span>
              <span>{file}</span>
              <span className="language-badge">{detectedLanguage.toUpperCase()}</span>
            </>
          ) : (
            'No file selected'
          )}
        </span>
        <div className="editor-shortcuts">
          <span title="Ctrl+S - Save">💾</span>
          <span title="Ctrl+O - Open">📂</span>
          <span title="Ctrl+/ - Comment">💬</span>
          <span title="Ctrl+` - Terminal">⌨️</span>
        </div>
      </div>

      <Editor
        height="100%"
        defaultLanguage="javascript"
        language={detectedLanguage}
        value={content}
        onChange={handleChange}
        onMount={handleEditorMount}
        theme="vs-dark"
        options={{
          // Line numbers and gutters
          lineNumbers: 'on',
          lineNumbersMinChars: 3,
          glyphMargin: true,
          folding: true,
          codeLens: false,

          // Display and layout
          wordWrap: 'off',
          wrappingStrategy: 'advanced',
          wrappingIndent: 'deepIndent',
          minimap: {
            enabled: true,
            size: 'proportional',
            showSlider: 'always',
          },

          // Indentation
          tabSize: 2,
          insertSpaces: true,
          detectIndentation: true,

          // Rendering performance
          renderWhitespace: 'selection',
          renderControlCharacters: false,
          renderLineHighlight: 'line',
          scrollBeyondLastLine: false,

          // Editor features
          quickSuggestions: {
            other: true,
            comments: false,
            strings: false,
          },
          suggestOnTriggerCharacters: true,
          acceptSuggestionOnEnter: 'smart',
          tabCompletion: 'on',

          // Keyboard
          autoClosingBrackets: 'always',
          autoClosingQuotes: 'always',
          autoSurround: 'languageDefined',
          copyWithSyntaxHighlighting: true,

          // Font and appearance
          fontSize: 14,
          fontFamily: "'Fira Code', 'Courier New', monospace",
          fontLigatures: true,
          letterSpacing: 0,

          // Behavior
          smoothScrolling: true,
          mouseWheelScrollSensitivity: 1,
          scrollbar: {
            vertical: 'auto',
            horizontal: 'auto',
            useShadows: true,
            verticalScrollbarSize: 12,
            horizontalScrollbarSize: 12,
          },
        }}
      />

      <style>{`
        .monaco-editor-wrapper {
          display: flex;
          flex-direction: column;
          height: 100%;
          background-color: #1e1e1e;
          border-radius: 4px;
          overflow: hidden;
        }

        .editor-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 16px;
          background-color: #2d2d30;
          border-bottom: 1px solid #464647;
          color: #cccccc;
          font-size: 12px;
          font-weight: 500;
        }

        .editor-title {
          display: flex;
          align-items: center;
          gap: 8px;
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .file-icon {
          flex-shrink: 0;
        }

        .language-badge {
          background-color: #007acc;
          color: white;
          padding: 2px 6px;
          border-radius: 3px;
          font-size: 10px;
          font-weight: 600;
          margin-left: 8px;
        }

        .editor-shortcuts {
          display: flex;
          gap: 12px;
          color: #858585;
          cursor: help;
          flex-shrink: 0;
        }

        .editor-shortcuts span {
          transition: color 0.2s;
        }

        .editor-shortcuts span:hover {
          color: #cccccc;
        }
      `}</style>
    </div>
  );
};
