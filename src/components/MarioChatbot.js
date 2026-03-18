import React, { useState, useRef, useEffect } from 'react';
import './MarioChatbot.css';

// Markdown renderer component with link support
const MarkdownText = ({ text, nightMode = false }) => {
  if (!text) return null;

  // Clean markdown syntax before processing
  let cleanedText = text;
  
  // Remove markdown headers (###, ####, etc.)
  cleanedText = cleanedText.replace(/^#{1,6}\s+/gm, '');
  
  // Remove markdown list markers that aren't part of content (standalone - or *)
  cleanedText = cleanedText.replace(/^[-*]\s+/gm, '');
  
  // Remove markdown blockquote markers
  cleanedText = cleanedText.replace(/^>\s+/gm, '');
  
  // Remove markdown horizontal rules
  cleanedText = cleanedText.replace(/^[-*_]{3,}$/gm, '');

  // Split by lines to handle line breaks
  const lines = cleanedText.split('\n');
  
  // URL regex pattern
  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}[^\s]*)/g;
  
  return (
    <>
      {lines.map((line, lineIndex) => {
        // Skip empty lines but preserve them for spacing
        if (line.trim() === '') {
          return <br key={lineIndex} />;
        }

        // Process markdown in the line
        const parts = [];
        let currentIndex = 0;
        let keyCounter = 0;

        // First, find all URLs
        const urlMatches = [];
        let urlMatch;
        urlRegex.lastIndex = 0;
        while ((urlMatch = urlRegex.exec(line)) !== null) {
          urlMatches.push({
            start: urlMatch.index,
            end: urlMatch.index + urlMatch[0].length,
            content: urlMatch[0],
            url: urlMatch[0].startsWith('http') ? urlMatch[0] : `https://${urlMatch[0]}`,
            tag: 'link'
          });
        }

        // Find all bold matches (**text**)
        const boldMatches = [];
        const boldRegex = /\*\*(.*?)\*\*/g;
        let boldMatch;
        while ((boldMatch = boldRegex.exec(line)) !== null) {
          boldMatches.push({
            start: boldMatch.index,
            end: boldMatch.index + boldMatch[0].length,
            content: boldMatch[1],
            tag: 'strong',
            fullMatch: boldMatch[0]
          });
        }

        // Find all code matches (`text`)
        const codeMatches = [];
        const codeRegex = /`(.*?)`/g;
        let codeMatch;
        while ((codeMatch = codeRegex.exec(line)) !== null) {
          codeMatches.push({
            start: codeMatch.index,
            end: codeMatch.index + codeMatch[0].length,
            content: codeMatch[1],
            tag: 'code',
            fullMatch: codeMatch[0]
          });
        }

        // Find italic matches (*text*) but exclude those that are part of **
        const italicMatches = [];
        const italicRegex = /\*(.*?)\*/g;
        let italicMatch;
        while ((italicMatch = italicRegex.exec(line)) !== null) {
          // Check if this match is part of a bold match
          const matchIndex = italicMatch.index;
          const matchEnd = italicMatch.index + italicMatch[0].length;
          const isPartOfBold = boldMatches.some(bm => 
            matchIndex >= bm.start && matchIndex < bm.end
          );
          if (!isPartOfBold) {
            italicMatches.push({
              start: matchIndex,
              end: matchEnd,
              content: italicMatch[1],
              tag: 'em',
              fullMatch: italicMatch[0]
            });
          }
        }

        // Combine all matches and sort by position
        const allMatches = [...urlMatches, ...boldMatches, ...codeMatches, ...italicMatches];
        allMatches.sort((a, b) => a.start - b.start);

        // Remove overlapping matches (prioritize: code > link > bold > italic)
        const filteredMatches = [];
        let lastEnd = -1;
        allMatches.forEach(match => {
          if (match.start >= lastEnd) {
            filteredMatches.push(match);
            lastEnd = match.end;
          } else {
            // Check if current match should replace the last one
            const lastMatch = filteredMatches[filteredMatches.length - 1];
            const priority = { code: 4, link: 3, strong: 2, em: 1 };
            if (priority[match.tag] > priority[lastMatch.tag]) {
              filteredMatches.pop();
              filteredMatches.push(match);
              lastEnd = match.end;
            }
          }
        });

        // Build parts array
        filteredMatches.forEach(match => {
          // Add text before match
          if (match.start > currentIndex) {
            const beforeText = line.substring(currentIndex, match.start);
            if (beforeText) {
              parts.push({ type: 'text', content: beforeText, key: keyCounter++ });
            }
          }

          // Add formatted match
          parts.push({ 
            type: match.tag, 
            content: match.content, 
            url: match.url,
            key: keyCounter++ 
          });
          currentIndex = match.end;
        });

        // Add remaining text
        if (currentIndex < line.length) {
          const remainingText = line.substring(currentIndex);
          if (remainingText) {
            parts.push({ type: 'text', content: remainingText, key: keyCounter++ });
          }
        }

        // If no matches, just add the whole line as text
        if (parts.length === 0) {
          parts.push({ type: 'text', content: line, key: keyCounter++ });
        }

        // Render the line
        return (
          <React.Fragment key={lineIndex}>
            {parts.map(part => {
              switch (part.type) {
                case 'link':
                  return (
                    <a 
                      key={part.key} 
                      href={part.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ 
                        color: nightMode ? '#4A9FB0' : '#ff6b6b', 
                        textDecoration: 'underline' 
                      }}
                    >
                      {part.content}
                    </a>
                  );
                case 'strong':
                  return <strong key={part.key}>{part.content}</strong>;
                case 'em':
                  return <em key={part.key}>{part.content}</em>;
                case 'code':
                  return <code key={part.key}>{part.content}</code>;
                default:
                  return <span key={part.key}>{part.content}</span>;
              }
            })}
            {lineIndex < lines.length - 1 && <br />}
          </React.Fragment>
        );
      })}
    </>
  );
};

const MarioChatbot = ({ nightMode = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: "👋 Hi! I'm Mario, Ujjwal's assistant! Ask me anything about his resume - education, experience, projects, skills, or contact info!"
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const messagesRef = useRef([]);

  const messagesContainerRef = useRef(null);

  const isUserScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current && !isUserScrollingRef.current) {
      const container = messagesContainerRef.current;
      // Only auto-scroll if user is near the bottom (within 100px)
      const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100;
      
      if (isNearBottom || messages.length <= 2) {
        // Use direct scrollTop assignment instead of scrollIntoView for better performance
        requestAnimationFrame(() => {
          if (container && !isUserScrollingRef.current) {
            container.scrollTop = container.scrollHeight;
          }
        });
      }
    }
  };

  // Track user scrolling
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      isUserScrollingRef.current = true;
      
      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      // Reset flag after user stops scrolling for 500ms
      scrollTimeoutRef.current = setTimeout(() => {
        isUserScrollingRef.current = false;
      }, 500);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [isOpen]);

  // Keep messagesRef in sync with messages state
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    scrollToBottom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages.length]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
    
    // Add/remove class to body to optimize game rendering when chatbot is open
    if (isOpen) {
      document.body.classList.add('chatbot-open');
    } else {
      document.body.classList.remove('chatbot-open');
    }
    
    return () => {
      document.body.classList.remove('chatbot-open');
    };
  }, [isOpen]);

  // Prevent keyboard events from reaching the game when chatbot is open
  useEffect(() => {
    if (!isOpen) return;

    const handleGlobalKeyDown = (e) => {
      // If the chatbot input is focused, stop propagation
      if (document.activeElement === inputRef.current) {
        e.stopPropagation();
      }
    };

    const handleGlobalKeyUp = (e) => {
      // If the chatbot input is focused, stop propagation
      if (document.activeElement === inputRef.current) {
        e.stopPropagation();
      }
    };

    // Use capture phase to intercept events before they reach the game
    document.addEventListener('keydown', handleGlobalKeyDown, true);
    document.addEventListener('keyup', handleGlobalKeyUp, true);

    return () => {
      document.removeEventListener('keydown', handleGlobalKeyDown, true);
      document.removeEventListener('keyup', handleGlobalKeyUp, true);
    };
  }, [isOpen]);

  const callOpenAI = async (userMessage, currentMessages) => {
    try {
      if (!currentMessages || !Array.isArray(currentMessages)) {
        throw new Error('Invalid messages array');
      }

      const conversationHistory = currentMessages
        .filter(msg => msg && (msg.type === 'user' || msg.type === 'bot'))
        .map(msg => ({
          role: msg.type === 'user' ? 'user' : 'assistant',
          content: msg.text || ''
        }));

      const response = await fetch('https://dfuxom6mu7asoyv3pdddwybthy0vijuh.lambda-url.us-east-2.on.aws/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: conversationHistory })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `API error: ${response.status}`);
      }

      const data = await response.json();
      return data.reply || "Sorry, I couldn't generate a response.";
    } catch (error) {
      console.error('Chat API error:', error);
      return `⚠️ Error: ${error.message}. Please try again.`;
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      type: 'user',
      text: inputValue.trim()
    };

    const question = inputValue.trim();
    setInputValue('');
    setIsLoading(true);
    
    // Build current messages array including the new user message
    const currentMessages = [...messagesRef.current, userMessage];
    
    // Add user message to state
    setMessages(currentMessages);
    
    // Call API with current messages (including the new user message)
    try {
      const answer = await callOpenAI(question, currentMessages);
      setIsLoading(false);
      
      // Add bot response, checking for duplicates
      setMessages(prevMsgs => {
        // Check if this exact message already exists
        const hasDuplicate = prevMsgs.some(msg => 
          msg.type === 'bot' && msg.text === answer
        );
        if (hasDuplicate) {
          return prevMsgs;
        }
        
        const botMessage = {
          type: 'bot',
          text: answer
        };
        return [...prevMsgs, botMessage];
      });
    } catch (error) {
      setIsLoading(false);
      setMessages(prevMsgs => {
        const errorMessage = {
          type: 'bot',
          text: `⚠️ Sorry, I encountered an error: ${error.message}`
        };
        // Check for duplicate error messages
        const hasDuplicate = prevMsgs.some(msg => 
          msg.type === 'bot' && msg.text === errorMessage.text
        );
        if (hasDuplicate) {
          return prevMsgs;
        }
        return [...prevMsgs, errorMessage];
      });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      e.stopPropagation();
      handleSend();
    }
  };

  // Prevent keyboard events from propagating to the game
  const handleKeyDown = (e) => {
    e.stopPropagation();
    // Allow normal typing, but prevent game controls
  };

  const handleKeyUp = (e) => {
    e.stopPropagation();
  };

  // Prevent clicks inside chatbot from propagating
  const handleChatbotClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div 
      className={`mario-chatbot ${isOpen ? 'open' : ''}`} 
      onClick={handleChatbotClick}
      style={{
        // Force GPU acceleration
        transform: 'translateZ(0)',
        WebkitTransform: 'translateZ(0)',
        willChange: 'transform'
      }}
    >
      {isOpen ? (
        <div className={`chatbot-window ${nightMode ? 'night-mode' : ''}`} onClick={handleChatbotClick}>
          <div className="chatbot-header" onClick={handleChatbotClick}>
            <div className="chatbot-avatar">
              <img 
                src={`${process.env.PUBLIC_URL || ''}/1.png`} 
                alt="Mario Assistant" 
                className="mario-avatar-img"
              />
            </div>
            <div className="chatbot-header-info">
              <h3>Mario Assistant</h3>
              <p>Ask me about Ujjwal's resume!</p>
            </div>
            <button 
              className="chatbot-close"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
              aria-label="Close chatbot"
            >
              ×
            </button>
          </div>
          <div className="chatbot-messages" ref={messagesContainerRef} onClick={handleChatbotClick}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.type}`}>
                {msg.type === 'bot' && (
                  <div className="message-avatar">
                    <img 
                      src={`${process.env.PUBLIC_URL || ''}/1.png`} 
                      alt="Mario" 
                    />
                  </div>
                )}
                <div className="message-content">
                  <div className="message-text">
                    <MarkdownText text={msg.text} nightMode={nightMode} />
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="message bot">
                <div className="message-avatar">
                  <img 
                    src={`${process.env.PUBLIC_URL || ''}/1.png`} 
                    alt="Mario" 
                  />
                </div>
                <div className="message-content">
                  <div className="message-text loading">
                    <span className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="chatbot-input-container" onClick={handleChatbotClick}>
            <input
              ref={inputRef}
              type="text"
              className="chatbot-input"
              placeholder="Ask about education, experience, projects, skills..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              onKeyDown={handleKeyDown}
              onKeyUp={handleKeyUp}
              onClick={handleChatbotClick}
              disabled={isLoading}
            />
            <button 
              className="chatbot-send"
              onClick={(e) => {
                e.stopPropagation();
                handleSend();
              }}
              aria-label="Send message"
              disabled={isLoading}
            >
              →
            </button>
          </div>
        </div>
      ) : (
        <button 
          className="chatbot-toggle"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(true);
          }}
          aria-label="Open chatbot"
        >
          <img 
            src={`${process.env.PUBLIC_URL || ''}/1.png`} 
            alt="Mario" 
            className="chatbot-toggle-avatar"
          />
          <span className="chatbot-pulse"></span>
        </button>
      )}
    </div>
  );
};

export default MarioChatbot;
