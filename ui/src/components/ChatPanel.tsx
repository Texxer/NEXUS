import React, { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatPanelProps {
  selectedCode?: string;
  fileName?: string;
}

export const ChatPanel: React.FC<ChatPanelProps> = ({ selectedCode, fileName }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `👋 Welcome to NEXUS AI Chat! I'm here to help you with code analysis, suggestions, and debugging. Ask me anything about your code!`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // TODO: Connect to Ollama backend at localhost:11434
      // For now, show a placeholder response
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `🤖 Ollama backend not connected yet.\n\nYour question: "${input}"\n\nTo enable AI features:\n1. Install Ollama from ollama.ai\n2. Run: ollama serve\n3. Pull a model: ollama pull mistral\n4. Restart NEXUS Pro\n\nOnce Ollama is running, I'll analyze your ${fileName ? 'file (' + fileName + ')' : 'code'} and provide intelligent suggestions!`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e as any).ctrlKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-panel">
      <div className="chat-header">
        <span>🤖 AI Assistant</span>
        <span className="chat-status">{isLoading ? '⏳ Thinking...' : '✅ Ready'}</span>
      </div>

      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`chat-message chat-message-${msg.role}`}>
            <div className="chat-message-role">{msg.role === 'user' ? '👤' : '🤖'}</div>
            <div className="chat-message-content">{msg.content}</div>
            <div className="chat-message-time">
              {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="chat-message chat-message-assistant chat-typing">
            <div className="typing-indicator">
              <span></span><span></span><span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-area">
        {selectedCode && (
          <div className="chat-context">
            📝 Selected code: {selectedCode.substring(0, 50)}...
          </div>
        )}
        <div className="chat-input-wrapper">
          <textarea
            className="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything about your code... (Ctrl+Enter to send)"
            disabled={isLoading}
            rows={3}
          />
          <button
            className="chat-send-btn"
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            title="Send message (Ctrl+Enter)"
          >
            {isLoading ? '⏳' : '📤'}
          </button>
        </div>
      </div>
    </div>
  );
};
