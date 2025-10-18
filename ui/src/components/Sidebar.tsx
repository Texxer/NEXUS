import React from 'react';

interface SidebarProps {
  activeFile: string | null;
  theme: string;
  onThemeChange: (theme: 'light' | 'dark') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ theme, onThemeChange }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-icons">
        <button title="Explorer" className="sidebar-icon active">📁</button>
        <button title="Search" className="sidebar-icon">🔍</button>
        <button title="Source Control" className="sidebar-icon">📦</button>
        <button title="Debug" className="sidebar-icon">🐛</button>
        <button title="Extensions" className="sidebar-icon">🧩</button>
      </div>
      <div className="sidebar-bottom">
        <button 
          title="Toggle Theme"
          className="sidebar-icon"
          onClick={() => onThemeChange(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </div>
  );
};
