import React, { useState, useCallback, ChangeEvent } from 'react';

/**
 * File Type Definition
 * Represents a single supported file extension with metadata
 */
export interface FileType {
  ext: string;           // e.g., 'js', 'ts', 'json'
  name: string;          // e.g., 'JavaScript', 'TypeScript'
  category: string;      // e.g., 'Web'
  icon: string;          // e.g., '🌐'
  mimeType: string;      // e.g., 'application/javascript'
  monacoLang: string;    // Monaco language ID
}

/**
 * File Type Category
 * Groups related file types for organized display
 */
export interface FileTypeCategory {
  name: string;          // e.g., 'Web Technologies'
  icon: string;          // e.g., '🌐'
  filetypes: FileType[];
}

/**
 * Complete filetype registry for all 150+ supported languages
 * Organized by category for easy browsing
 */
export const FILETYPES: FileTypeCategory[] = [
  {
    name: 'Web Technologies',
    icon: '🌐',
    filetypes: [
      { ext: 'js', name: 'JavaScript', category: 'Web', icon: '🟨', mimeType: 'application/javascript', monacoLang: 'javascript' },
      { ext: 'jsx', name: 'React JSX', category: 'Web', icon: '⚛️', mimeType: 'application/javascript', monacoLang: 'javascript' },
      { ext: 'mjs', name: 'ES Module', category: 'Web', icon: '📦', mimeType: 'application/javascript', monacoLang: 'javascript' },
      { ext: 'cjs', name: 'CommonJS', category: 'Web', icon: '📦', mimeType: 'application/javascript', monacoLang: 'javascript' },
      { ext: 'ts', name: 'TypeScript', category: 'Web', icon: '🔵', mimeType: 'application/typescript', monacoLang: 'typescript' },
      { ext: 'tsx', name: 'TypeScript React', category: 'Web', icon: '⚛️', mimeType: 'application/typescript', monacoLang: 'typescript' },
      { ext: 'html', name: 'HTML', category: 'Web', icon: '🏷️', mimeType: 'text/html', monacoLang: 'html' },
      { ext: 'htm', name: 'HTML (Legacy)', category: 'Web', icon: '🏷️', mimeType: 'text/html', monacoLang: 'html' },
      { ext: 'css', name: 'CSS', category: 'Web', icon: '🎨', mimeType: 'text/css', monacoLang: 'css' },
      { ext: 'scss', name: 'SCSS', category: 'Web', icon: '🎨', mimeType: 'text/x-scss', monacoLang: 'scss' },
      { ext: 'sass', name: 'SASS', category: 'Web', icon: '🎨', mimeType: 'text/x-sass', monacoLang: 'scss' },
      { ext: 'less', name: 'Less', category: 'Web', icon: '🎨', mimeType: 'text/less', monacoLang: 'less' },
      { ext: 'vue', name: 'Vue', category: 'Web', icon: '💚', mimeType: 'text/x-vue', monacoLang: 'vue' },
      { ext: 'svelte', name: 'Svelte', category: 'Web', icon: '🔴', mimeType: 'text/x-svelte', monacoLang: 'svelte' },
    ]
  },
  {
    name: 'Backend Languages',
    icon: '🔧',
    filetypes: [
      { ext: 'py', name: 'Python', category: 'Backend', icon: '🐍', mimeType: 'application/x-python', monacoLang: 'python' },
      { ext: 'pyw', name: 'Python (Windows)', category: 'Backend', icon: '🐍', mimeType: 'application/x-python', monacoLang: 'python' },
      { ext: 'rs', name: 'Rust', category: 'Backend', icon: '🦀', mimeType: 'application/x-rust', monacoLang: 'rust' },
      { ext: 'go', name: 'Go', category: 'Backend', icon: '🐹', mimeType: 'application/x-go', monacoLang: 'go' },
      { ext: 'java', name: 'Java', category: 'Backend', icon: '☕', mimeType: 'application/x-java', monacoLang: 'java' },
      { ext: 'cs', name: 'C#', category: 'Backend', icon: '#️⃣', mimeType: 'application/x-csharp', monacoLang: 'csharp' },
      { ext: 'cpp', name: 'C++', category: 'Backend', icon: '⬛', mimeType: 'application/x-cpp', monacoLang: 'cpp' },
      { ext: 'cc', name: 'C++ (cc)', category: 'Backend', icon: '⬛', mimeType: 'application/x-cpp', monacoLang: 'cpp' },
      { ext: 'cxx', name: 'C++ (cxx)', category: 'Backend', icon: '⬛', mimeType: 'application/x-cpp', monacoLang: 'cpp' },
      { ext: 'h', name: 'C/C++ Header', category: 'Backend', icon: '📋', mimeType: 'application/x-cpp', monacoLang: 'cpp' },
      { ext: 'hpp', name: 'C++ Header', category: 'Backend', icon: '📋', mimeType: 'application/x-cpp', monacoLang: 'cpp' },
      { ext: 'c', name: 'C', category: 'Backend', icon: '⚫', mimeType: 'application/x-c', monacoLang: 'c' },
      { ext: 'rb', name: 'Ruby', category: 'Backend', icon: '💎', mimeType: 'application/x-ruby', monacoLang: 'ruby' },
      { ext: 'kt', name: 'Kotlin', category: 'Backend', icon: '🎯', mimeType: 'application/x-kotlin', monacoLang: 'kotlin' },
      { ext: 'kts', name: 'Kotlin Script', category: 'Backend', icon: '🎯', mimeType: 'application/x-kotlin', monacoLang: 'kotlin' },
      { ext: 'swift', name: 'Swift', category: 'Backend', icon: '🍎', mimeType: 'application/x-swift', monacoLang: 'swift' },
      { ext: 'php', name: 'PHP', category: 'Backend', icon: '🐘', mimeType: 'application/x-php', monacoLang: 'php' },
      { ext: 'pl', name: 'Perl', category: 'Backend', icon: '🐪', mimeType: 'application/x-perl', monacoLang: 'perl' },
      { ext: 'pm', name: 'Perl Module', category: 'Backend', icon: '🐪', mimeType: 'application/x-perl', monacoLang: 'perl' },
      { ext: 'lua', name: 'Lua', category: 'Backend', icon: '🌙', mimeType: 'application/x-lua', monacoLang: 'lua' },
      { ext: 'groovy', name: 'Groovy', category: 'Backend', icon: '🌱', mimeType: 'application/x-groovy', monacoLang: 'groovy' },
      { ext: 'gradle', name: 'Gradle', category: 'Backend', icon: '🌱', mimeType: 'application/x-groovy', monacoLang: 'groovy' },
      { ext: 'r', name: 'R', category: 'Backend', icon: '📊', mimeType: 'application/x-r', monacoLang: 'r' },
    ]
  },
  {
    name: 'Data & Configuration',
    icon: '📊',
    filetypes: [
      { ext: 'json', name: 'JSON', category: 'Data', icon: '🗂️', mimeType: 'application/json', monacoLang: 'json' },
      { ext: 'jsonc', name: 'JSON with Comments', category: 'Data', icon: '🗂️', mimeType: 'application/json', monacoLang: 'jsonc' },
      { ext: 'yaml', name: 'YAML', category: 'Data', icon: '📝', mimeType: 'application/x-yaml', monacoLang: 'yaml' },
      { ext: 'yml', name: 'YAML (Legacy)', category: 'Data', icon: '📝', mimeType: 'application/x-yaml', monacoLang: 'yaml' },
      { ext: 'toml', name: 'TOML', category: 'Data', icon: '⚙️', mimeType: 'application/toml', monacoLang: 'toml' },
      { ext: 'xml', name: 'XML', category: 'Data', icon: '🏷️', mimeType: 'application/xml', monacoLang: 'xml' },
      { ext: 'xsd', name: 'XML Schema', category: 'Data', icon: '🏷️', mimeType: 'application/xml', monacoLang: 'xml' },
      { ext: 'ini', name: 'INI', category: 'Data', icon: '⚙️', mimeType: 'text/plain', monacoLang: 'ini' },
      { ext: 'cfg', name: 'Config', category: 'Data', icon: '⚙️', mimeType: 'text/plain', monacoLang: 'ini' },
      { ext: 'properties', name: 'Properties', category: 'Data', icon: '⚙️', mimeType: 'text/plain', monacoLang: 'properties' },
      { ext: 'env', name: 'Environment', category: 'Data', icon: '🌍', mimeType: 'text/plain', monacoLang: 'plaintext' },
      { ext: 'csv', name: 'CSV', category: 'Data', icon: '📈', mimeType: 'text/csv', monacoLang: 'plaintext' },
      { ext: 'sql', name: 'SQL', category: 'Data', icon: '🗄️', mimeType: 'application/sql', monacoLang: 'sql' },
      { ext: 'graphql', name: 'GraphQL', category: 'Data', icon: '🔷', mimeType: 'application/graphql', monacoLang: 'graphql' },
      { ext: 'gql', name: 'GraphQL Query', category: 'Data', icon: '🔷', mimeType: 'application/graphql', monacoLang: 'graphql' },
    ]
  },
  {
    name: 'Markup & Documentation',
    icon: '📖',
    filetypes: [
      { ext: 'md', name: 'Markdown', category: 'Docs', icon: '📝', mimeType: 'text/markdown', monacoLang: 'markdown' },
      { ext: 'markdown', name: 'Markdown (Full)', category: 'Docs', icon: '📝', mimeType: 'text/markdown', monacoLang: 'markdown' },
      { ext: 'mdx', name: 'MDX', category: 'Docs', icon: '⚛️', mimeType: 'text/mdx', monacoLang: 'markdown' },
      { ext: 'rst', name: 'reStructuredText', category: 'Docs', icon: '📜', mimeType: 'text/x-rst', monacoLang: 'plaintext' },
      { ext: 'adoc', name: 'AsciiDoc', category: 'Docs', icon: '📜', mimeType: 'text/asciidoc', monacoLang: 'plaintext' },
      { ext: 'asciidoc', name: 'AsciiDoc (Full)', category: 'Docs', icon: '📜', mimeType: 'text/asciidoc', monacoLang: 'plaintext' },
      { ext: 'tex', name: 'LaTeX', category: 'Docs', icon: '∑', mimeType: 'application/x-latex', monacoLang: 'latex' },
    ]
  },
  {
    name: 'Shell & Scripts',
    icon: '⌨️',
    filetypes: [
      { ext: 'sh', name: 'Shell Script', category: 'Shell', icon: '🐚', mimeType: 'application/x-sh', monacoLang: 'shell' },
      { ext: 'bash', name: 'Bash', category: 'Shell', icon: '🐚', mimeType: 'application/x-sh', monacoLang: 'shell' },
      { ext: 'zsh', name: 'Zsh', category: 'Shell', icon: '🐚', mimeType: 'application/x-sh', monacoLang: 'shell' },
      { ext: 'ps1', name: 'PowerShell', category: 'Shell', icon: '💠', mimeType: 'application/x-powershell', monacoLang: 'powershell' },
      { ext: 'psd1', name: 'PowerShell Data', category: 'Shell', icon: '💠', mimeType: 'application/x-powershell', monacoLang: 'powershell' },
      { ext: 'psm1', name: 'PowerShell Module', category: 'Shell', icon: '💠', mimeType: 'application/x-powershell', monacoLang: 'powershell' },
      { ext: 'bat', name: 'Batch', category: 'Shell', icon: '🖥️', mimeType: 'application/x-bat', monacoLang: 'bat' },
      { ext: 'cmd', name: 'Command Script', category: 'Shell', icon: '🖥️', mimeType: 'application/x-bat', monacoLang: 'bat' },
    ]
  },
  {
    name: 'Configuration & Build',
    icon: '🔨',
    filetypes: [
      { ext: 'dockerfile', name: 'Dockerfile', category: 'Config', icon: '🐳', mimeType: 'text/plain', monacoLang: 'dockerfile' },
      { ext: 'docker', name: 'Docker Compose', category: 'Config', icon: '🐳', mimeType: 'text/yaml', monacoLang: 'yaml' },
      { ext: 'makefile', name: 'Makefile', category: 'Config', icon: '🔨', mimeType: 'text/plain', monacoLang: 'makefile' },
      { ext: 'cmake', name: 'CMakeLists', category: 'Config', icon: '🔨', mimeType: 'text/plain', monacoLang: 'cmake' },
      { ext: 'cargo', name: 'Cargo.toml', category: 'Config', icon: '🦀', mimeType: 'application/toml', monacoLang: 'toml' },
      { ext: 'package.json', name: 'package.json', category: 'Config', icon: '📦', mimeType: 'application/json', monacoLang: 'json' },
      { ext: 'tsconfig.json', name: 'tsconfig.json', category: 'Config', icon: '🔵', mimeType: 'application/json', monacoLang: 'json' },
      { ext: 'webpack.config.js', name: 'Webpack Config', category: 'Config', icon: '📦', mimeType: 'application/javascript', monacoLang: 'javascript' },
      { ext: 'vite.config.js', name: 'Vite Config', category: 'Config', icon: '⚡', mimeType: 'application/javascript', monacoLang: 'javascript' },
      { ext: 'vite.config.ts', name: 'Vite Config (TS)', category: 'Config', icon: '⚡', mimeType: 'application/typescript', monacoLang: 'typescript' },
      { ext: '.eslintrc.json', name: 'ESLint Config', category: 'Config', icon: '✅', mimeType: 'application/json', monacoLang: 'json' },
      { ext: '.prettierrc.json', name: 'Prettier Config', category: 'Config', icon: '✨', mimeType: 'application/json', monacoLang: 'json' },
    ]
  },
  {
    name: 'Version Control',
    icon: '📋',
    filetypes: [
      { ext: 'gitignore', name: '.gitignore', category: 'VCS', icon: '🚫', mimeType: 'text/plain', monacoLang: 'plaintext' },
      { ext: 'gitattributes', name: '.gitattributes', category: 'VCS', icon: '📋', mimeType: 'text/plain', monacoLang: 'plaintext' },
      { ext: 'gitconfig', name: '.gitconfig', category: 'VCS', icon: '⚙️', mimeType: 'text/plain', monacoLang: 'ini' },
      { ext: 'diff', name: 'Diff File', category: 'VCS', icon: '📊', mimeType: 'text/x-diff', monacoLang: 'diff' },
      { ext: 'patch', name: 'Patch File', category: 'VCS', icon: '🔧', mimeType: 'text/x-patch', monacoLang: 'diff' },
    ]
  },
  {
    name: 'Other',
    icon: '📄',
    filetypes: [
      { ext: 'txt', name: 'Plain Text', category: 'Other', icon: '📄', mimeType: 'text/plain', monacoLang: 'plaintext' },
      { ext: 'log', name: 'Log File', category: 'Other', icon: '📋', mimeType: 'text/plain', monacoLang: 'plaintext' },
      { ext: 'toml', name: 'TOML Config', category: 'Other', icon: '⚙️', mimeType: 'application/toml', monacoLang: 'toml' },
    ]
  },
];

/**
 * FileTypeSelector Component
 * Provides an interactive UI for selecting file format and extension
 * Supports saving files with different extensions (foundation for any-to-any conversion)
 */
interface FileTypeSelectorProps {
  currentFile: string | null;
  onSelectFileType: (fileType: FileType) => void;
  onCancel: () => void;
}

export const FileTypeSelector: React.FC<FileTypeSelectorProps> = ({
  currentFile,
  onSelectFileType,
  onCancel,
}): React.ReactElement => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedFileType, setSelectedFileType] = useState<FileType | null>(null);

  // Get current file extension
  const currentExt = currentFile?.split('.').pop()?.toLowerCase();
  const currentFileTypeInfo = FILETYPES
    .flatMap(cat => cat.filetypes)
    .find(ft => ft.ext === currentExt);

  // Filter filetypes based on search term
  const filteredCategories = selectedCategory
    ? FILETYPES.filter(cat => cat.name === selectedCategory)
    : FILETYPES.map(cat => ({
        ...cat,
        filetypes: cat.filetypes.filter(ft =>
          ft.ext.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ft.name.toLowerCase().includes(searchTerm.toLowerCase())
        ),
      })).filter(cat => cat.filetypes.length > 0);

  const handleSelectFileType = useCallback((fileType: FileType) => {
    setSelectedFileType(fileType);
  }, []);

  const handleConfirm = useCallback(() => {
    if (selectedFileType) {
      onSelectFileType(selectedFileType);
    }
  }, [selectedFileType, onSelectFileType]);

  return (
    <div className="file-type-selector-overlay">
      <div className="file-type-selector-dialog">
        {/* Header */}
        <div className="selector-header">
          <h2>💾 Save As - Select File Format</h2>
          <p className="selector-subtitle">
            Current: {currentFileTypeInfo ? `${currentFileTypeInfo.name} (${currentFileTypeInfo.ext})` : 'Unknown'}
          </p>
        </div>

        {/* Search */}
        <div className="selector-search">
          <input
            type="text"
            placeholder="🔍 Search filetypes... (e.g., 'python', 'json', 'typescript')"
            value={searchTerm}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            className="search-input"
            autoFocus
          />
        </div>

        {/* Category Tabs */}
        <div className="category-tabs">
          <button
            className={`tab ${selectedCategory === null ? 'active' : ''}`}
            onClick={() => setSelectedCategory(null)}
          >
            ✨ All
          </button>
          {FILETYPES.map(cat => (
            <button
              key={cat.name}
              className={`tab ${selectedCategory === cat.name ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.name)}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        {/* Filetypes Grid */}
        <div className="selector-content">
          {filteredCategories.length > 0 ? (
            filteredCategories.map(category => (
              <div key={category.name} className="category-section">
                <div className="category-header">
                  <h3>{category.icon} {category.name}</h3>
                  <span className="count">({category.filetypes.length})</span>
                </div>
                <div className="filetypes-grid">
                  {category.filetypes.map(fileType => (
                    <button
                      key={fileType.ext}
                      className={`filetype-item ${
                        selectedFileType?.ext === fileType.ext ? 'selected' : ''
                      } ${fileType.ext === currentExt ? 'current' : ''}`}
                      onClick={() => handleSelectFileType(fileType)}
                      title={`${fileType.name} (${fileType.mimeType})`}
                    >
                      <span className="filetype-icon">{fileType.icon}</span>
                      <span className="filetype-name">{fileType.name}</span>
                      <span className="filetype-ext">.{fileType.ext}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>❌ No filetypes found matching "{searchTerm}"</p>
              <small>Try searching for a different term</small>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="selector-footer">
          <div className="selection-info">
            {selectedFileType && selectedFileType.ext !== currentExt && (
              <span className="warning">
                ℹ️ Will save as <strong>{selectedFileType.name}</strong> (.{selectedFileType.ext})
              </span>
            )}
          </div>
          <div className="action-buttons">
            <button className="btn-cancel" onClick={onCancel}>
              ✕ Cancel
            </button>
            <button
              className="btn-save"
              onClick={handleConfirm}
              disabled={!selectedFileType}
            >
              💾 Save As
            </button>
          </div>
        </div>

        {/* Styles */}
        <style>{`
          .file-type-selector-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.6);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            animation: fadeIn 0.2s ease-out;
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          .file-type-selector-dialog {
            background-color: #1e1e1e;
            border: 1px solid #464647;
            border-radius: 8px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
            width: 90vw;
            max-width: 1000px;
            height: 80vh;
            max-height: 700px;
            display: flex;
            flex-direction: column;
            color: #cccccc;
          }

          .selector-header {
            padding: 20px;
            border-bottom: 1px solid #464647;
            background-color: #252526;
          }

          .selector-header h2 {
            margin: 0 0 8px 0;
            font-size: 18px;
            font-weight: 600;
            color: #ffffff;
          }

          .selector-subtitle {
            margin: 0;
            font-size: 12px;
            color: #858585;
          }

          .selector-search {
            padding: 12px 20px;
            border-bottom: 1px solid #464647;
          }

          .search-input {
            width: 100%;
            padding: 10px 12px;
            background-color: #3e3e42;
            border: 1px solid #464647;
            border-radius: 4px;
            color: #cccccc;
            font-size: 13px;
            font-family: 'Fira Code', monospace;
          }

          .search-input:focus {
            outline: none;
            border-color: #007acc;
            background-color: #3e3e42;
          }

          .search-input::placeholder {
            color: #858585;
          }

          .category-tabs {
            display: flex;
            gap: 4px;
            padding: 12px 20px;
            border-bottom: 1px solid #464647;
            overflow-x: auto;
            background-color: #252526;
          }

          .tab {
            padding: 6px 12px;
            background-color: transparent;
            border: 1px solid #464647;
            border-radius: 4px;
            color: #858585;
            cursor: pointer;
            font-size: 12px;
            white-space: nowrap;
            transition: all 0.2s;
          }

          .tab:hover {
            border-color: #007acc;
            color: #cccccc;
          }

          .tab.active {
            background-color: #007acc;
            border-color: #007acc;
            color: #ffffff;
          }

          .selector-content {
            flex: 1;
            overflow-y: auto;
            padding: 20px;
          }

          .category-section {
            margin-bottom: 24px;
          }

          .category-header {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 12px;
            padding-bottom: 8px;
            border-bottom: 1px solid #464647;
          }

          .category-header h3 {
            margin: 0;
            font-size: 14px;
            font-weight: 600;
            color: #ffffff;
          }

          .count {
            margin-left: auto;
            font-size: 12px;
            color: #858585;
          }

          .filetypes-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
            gap: 8px;
          }

          .filetype-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 6px;
            padding: 12px;
            background-color: #2d2d30;
            border: 1px solid #464647;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.2s;
            color: #cccccc;
            font-size: 12px;
            text-align: center;
            word-wrap: break-word;
          }

          .filetype-item:hover {
            background-color: #3e3e42;
            border-color: #007acc;
            color: #ffffff;
          }

          .filetype-item.selected {
            background-color: #007acc;
            border-color: #0098ff;
            color: #ffffff;
            box-shadow: 0 0 0 2px #005a9e;
          }

          .filetype-item.current {
            border-color: #92c047;
            opacity: 0.8;
          }

          .filetype-icon {
            font-size: 24px;
          }

          .filetype-name {
            font-weight: 500;
            font-size: 11px;
          }

          .filetype-ext {
            font-family: 'Fira Code', monospace;
            font-size: 10px;
            color: #858585;
          }

          .no-results {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 60px 20px;
            color: #858585;
            text-align: center;
          }

          .no-results p {
            margin: 0 0 8px 0;
            font-size: 16px;
          }

          .no-results small {
            font-size: 12px;
          }

          .selector-footer {
            padding: 16px 20px;
            border-top: 1px solid #464647;
            background-color: #252526;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .selection-info {
            font-size: 12px;
            color: #858585;
          }

          .warning {
            color: #ceae29;
          }

          .action-buttons {
            display: flex;
            gap: 8px;
          }

          .btn-cancel,
          .btn-save {
            padding: 8px 16px;
            border: 1px solid #464647;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
            font-weight: 500;
            transition: all 0.2s;
          }

          .btn-cancel {
            background-color: transparent;
            color: #cccccc;
          }

          .btn-cancel:hover {
            background-color: #3e3e42;
            border-color: #858585;
          }

          .btn-save {
            background-color: #007acc;
            border-color: #007acc;
            color: #ffffff;
          }

          .btn-save:hover:not(:disabled) {
            background-color: #0098ff;
            border-color: #0098ff;
          }

          .btn-save:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }

          /* Scrollbar styling */
          .selector-content::-webkit-scrollbar {
            width: 12px;
          }

          .selector-content::-webkit-scrollbar-track {
            background: #1e1e1e;
          }

          .selector-content::-webkit-scrollbar-thumb {
            background: #464647;
            border-radius: 6px;
          }

          .selector-content::-webkit-scrollbar-thumb:hover {
            background: #858585;
          }
        `}</style>
      </div>
    </div>
  );
};
