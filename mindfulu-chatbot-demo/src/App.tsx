// src/App.tsx
import { useState, FormEvent, useEffect, useRef } from 'react';
import axios from 'axios';

interface Message {
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

const quickPrompts = [
  "How are you feeling today?",
  "Help me with stress management",
  "Tell me about mindfulness",
  "I need emotional support"
];

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatStarted = messages.length > 0;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { 
      sender: 'user', 
      text: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const OLLAMA_API_URL = 'http://localhost:11434/api/generate';
      const historyString = [...messages, userMessage].slice(-5).map(msg => 
        `${msg.sender === 'user' ? 'User' : 'Assistant'}: ${msg.text}`
      ).join('\n');

      const prompt = `You are a supportive AI assistant focused on mental wellness and behavioral assessment. Be empathetic, helpful, and professional.

${historyString}
Assistant:`;

      const response = await axios.post(OLLAMA_API_URL, {
        model: 'wmb/llamasupport',
        prompt: prompt,
        stream: false,
      });

      const aiMessage: Message = { 
        sender: 'ai', 
        text: response.data.response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
      console.error("Error communicating with Ollama:", error);
      const errorMessage: Message = { 
        sender: 'ai', 
        text: 'I apologize, but I\'m having trouble connecting to my AI model. Please make sure Ollama is running with the llamasupport model.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <div className="chat-container">
      {/* Header */}
      <header className="chat-header">
        <div className="chat-brand">
          <div className="chat-logo animate-pulse-glow">
            <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'white' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <div>
            <h1 className="chat-title">MindfulU AI</h1>
            <p className="chat-subtitle">Your personal wellness assistant</p>
          </div>
        </div>
        <div className="chat-status">
          <div className="status-indicator"></div>
          <span className="status-text">Online</span>
        </div>
      </header>

      {/* Chat Area */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {!chatStarted ? (
          /* Welcome Screen */
          <div className="welcome-container">
            <div className="welcome-content animate-fade-in">
              <div style={{ marginBottom: '48px' }}>
                <div className="welcome-icon">
                  <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'white' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h2 className="welcome-title">Welcome to MindfulU AI</h2>
                <p className="font-caveat" style={{fontSize: '1.5rem', color: 'var(--brand-pink)', marginBottom: '24px'}}>
                  Your Safe Space
                </p>
                <p className="welcome-subtitle">
                  I'm your personal AI assistant, running completely locally on your machine. 
                  I'm here to help with mental wellness, behavioral assessment, and emotional support.
                </p>
              </div>

              {/* Quick Prompts */}
              <div style={{ marginBottom: '48px' }}>
                <h3 className="welcome-section-title">Try asking:</h3>
                <div className="quick-prompts">
                  {quickPrompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickPrompt(prompt)}
                      className="quick-prompt-button"
                    >
                      <div className="quick-prompt-dot"></div>
                      <span className="quick-prompt-text">{prompt}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Chat Messages */
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message-container ${message.sender}`}>
                <div className="message-wrapper">
                  {/* Avatar */}
                  <div className={`message-avatar ${message.sender}`}>
                    {message.sender === 'user' ? (
                      <span className="message-avatar-text">U</span>
                    ) : (
                      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--brand-purple)' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    )}
                  </div>
                  
                  {/* Message Bubble */}
                  <div className={`message-bubble ${message.sender} animate-slide-up`}>
                    <p style={{ margin: 0, lineHeight: '1.5' }}>{message.text}</p>
                    <div className="message-timestamp">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="loading-container animate-slide-up">
                <div className="loading-wrapper">
                  <div className="loading-avatar">
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--brand-purple)' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div className="loading-bubble">
                    <div className="loading-dots">
                      <div className="loading-dot"></div>
                      <div className="loading-dot"></div>
                      <div className="loading-dot"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Input Area */}
        <div className="chat-input-area">
          <form onSubmit={handleSubmit} className="input-form">
            <div style={{ flex: 1 }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={chatStarted ? "Type your message..." : "Ask me anything about mental wellness..."}
                className="input-field"
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="send-button"
            >
              {isLoading ? (
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" style={{ animation: 'spin 1s linear infinite' }}>
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25"></circle>
                  <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;