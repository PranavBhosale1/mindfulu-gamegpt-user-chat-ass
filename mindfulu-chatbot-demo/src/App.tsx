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
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background decorative elements */}
      <div style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none'
      }}>
        <div style={{
          position: 'absolute',
          top: '-160px',
          right: '-160px',
          width: '320px',
          height: '320px',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(6, 182, 212, 0.3))',
          borderRadius: '50%',
          filter: 'blur(60px)',
          animation: 'float 3s ease-in-out infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '-160px',
          left: '-160px',
          width: '320px',
          height: '320px',
          background: 'linear-gradient(45deg, rgba(6, 182, 212, 0.3), rgba(99, 102, 241, 0.3))',
          borderRadius: '50%',
          filter: 'blur(60px)',
          animation: 'float 3s ease-in-out infinite 1s'
        }}></div>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '384px',
          height: '384px',
          background: 'linear-gradient(90deg, rgba(99, 102, 241, 0.2), rgba(6, 182, 212, 0.2))',
          borderRadius: '50%',
          filter: 'blur(60px)',
          animation: 'pulse-glow 2s ease-in-out infinite'
        }}></div>
      </div>

      {/* Header */}
      <header className="glass-effect" style={{ 
        padding: '16px 24px',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)',
              animation: 'pulse-glow 2s ease-in-out infinite'
            }}>
              <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'white' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div>
              <h1 className="gradient-text" style={{ 
                fontSize: '24px', 
                fontWeight: 'bold', 
                margin: 0 
              }}>MindfulU AI</h1>
              <p style={{ 
                fontSize: '14px', 
                color: '#64748b', 
                fontWeight: '500',
                margin: 0 
              }}>Your personal wellness assistant</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '12px',
              height: '12px',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              borderRadius: '50%',
              animation: 'pulse 2s ease-in-out infinite',
              boxShadow: '0 0 10px rgba(16, 185, 129, 0.5)'
            }}></div>
            <span style={{ 
              fontSize: '14px', 
              color: '#64748b', 
              fontWeight: '500' 
            }}>Online</span>
          </div>
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
          <div style={{ 
            flex: 1, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            padding: '0 24px',
            position: 'relative',
            zIndex: 10
          }}>
            <div className="animate-fade-in" style={{ 
              maxWidth: '768px', 
              width: '100%', 
              textAlign: 'center' 
            }}>
              <div style={{ marginBottom: '48px' }}>
                <div style={{
                  width: '96px',
                  height: '96px',
                  background: 'linear-gradient(135deg, #6366f1, #4f46e5, #06b6d4)',
                  borderRadius: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 32px',
                  animation: 'float 3s ease-in-out infinite',
                  boxShadow: '0 8px 32px rgba(99, 102, 241, 0.4)',
                  animation: 'pulse-glow 2s ease-in-out infinite'
                }}>
                  <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'white' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h2 className="gradient-text" style={{ 
                  fontSize: '36px', 
                  fontWeight: 'bold', 
                  marginBottom: '24px',
                  margin: 0
                }}>Welcome to MindfulU AI</h2>
                <p style={{ 
                  fontSize: '20px', 
                  color: '#475569', 
                  lineHeight: '1.6',
                  maxWidth: '512px',
                  margin: '0 auto'
                }}>
                  I'm your personal AI assistant, running completely locally on your machine. 
                  I'm here to help with mental wellness, behavioral assessment, and emotional support.
                </p>
              </div>

              {/* Quick Prompts */}
              <div style={{ marginBottom: '48px' }}>
                <h3 style={{ 
                  fontSize: '18px', 
                  fontWeight: '600', 
                  color: '#64748b',
                  marginBottom: '24px',
                  margin: 0
                }}>Try asking:</h3>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                  gap: '16px' 
                }}>
                  {quickPrompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickPrompt(prompt)}
                      className="card"
                      style={{
                        padding: '24px',
                        textAlign: 'left',
                        border: 'none',
                        cursor: 'pointer',
                        background: 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '16px',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{
                          width: '12px',
                          height: '12px',
                          background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
                          borderRadius: '50%',
                          transition: 'transform 0.3s ease'
                        }}></div>
                        <span style={{ 
                          color: '#475569', 
                          fontWeight: '500',
                          fontSize: '16px'
                        }}>{prompt}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Chat Messages */
          <div style={{ 
            flex: 1, 
            overflowY: 'auto', 
            padding: '24px',
            position: 'relative',
            zIndex: 10
          }}>
            {messages.map((message, index) => (
              <div key={index} className="animate-slide-up" style={{ 
                display: 'flex', 
                justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                marginBottom: '24px'
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'flex-end', 
                  gap: '12px',
                  maxWidth: '400px',
                  flexDirection: message.sender === 'user' ? 'row-reverse' : 'row'
                }}>
                  {/* Avatar */}
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                    background: message.sender === 'user' 
                      ? 'linear-gradient(135deg, #6366f1, #4f46e5)' 
                      : 'rgba(255, 255, 255, 0.9)',
                    border: message.sender === 'user' ? 'none' : '1px solid rgba(229, 231, 235, 0.5)'
                  }}>
                    {message.sender === 'user' ? (
                      <span style={{ 
                        fontSize: '14px', 
                        fontWeight: 'bold',
                        color: 'white'
                      }}>U</span>
                    ) : (
                      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#6366f1' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    )}
                  </div>
                  
                  {/* Message Bubble */}
                  <div className={`message-bubble ${message.sender === 'user' ? 'message-user' : 'message-ai'}`}>
                    <p style={{ margin: 0, lineHeight: '1.5' }}>{message.text}</p>
                    <div style={{ 
                      fontSize: '12px', 
                      marginTop: '8px',
                      fontWeight: '500',
                      opacity: message.sender === 'user' ? 0.8 : 0.6
                    }}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="animate-slide-up" style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '16px',
                    background: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid rgba(229, 231, 235, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
                  }}>
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#6366f1' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div className="message-bubble message-ai">
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <div style={{
                        width: '8px',
                        height: '8px',
                        background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
                        borderRadius: '50%',
                        animation: 'bounce 1s ease-in-out infinite'
                      }}></div>
                      <div style={{
                        width: '8px',
                        height: '8px',
                        background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
                        borderRadius: '50%',
                        animation: 'bounce 1s ease-in-out infinite 0.1s'
                      }}></div>
                      <div style={{
                        width: '8px',
                        height: '8px',
                        background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
                        borderRadius: '50%',
                        animation: 'bounce 1s ease-in-out infinite 0.2s'
                      }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Input Area */}
        <div className="glass-effect" style={{ 
          padding: '24px',
          position: 'relative',
          zIndex: 10
        }}>
          <form onSubmit={handleSubmit} style={{ 
            display: 'flex', 
            alignItems: 'flex-end', 
            gap: '16px' 
          }}>
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
              className="btn-primary"
              style={{ padding: '12px 24px' }}
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