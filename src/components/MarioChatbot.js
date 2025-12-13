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

// Resume knowledge base extracted from PortfolioSection data
const resumeData = {
  about: {
    title: "Software Engineer · Backend & Distributed Systems",
    description: "Software Engineer with experience designing scalable backend systems and cloud‑native distributed services. Skilled in building low‑latency, high‑throughput applications and real‑time data pipelines. Currently pursuing a Master of Business and Technology at Purdue and seeking a Summer 2026 Software Engineering internship."
  },
  education: [
    {
      degree: "Master of Business and Technology - AI",
      school: "Purdue University, Daniels School of Business",
      location: "West Lafayette, IN",
      period: "Dec 2026 — Fellowship Awarded"
    },
    {
      degree: "Bachelor of Technology in Information Technology",
      school: "Guru Gobind Singh Indraprastha University",
      location: "Delhi, India",
      period: "2015 — 2019"
    }
  ],
  experience: [
    {
      role: "Python Programming Tutor",
      company: "Purdue University",
      location: "West Lafayette, IN",
      period: "Oct 2025 — Present",
      highlights: [
        "Conduct weekly tutoring sessions focused on Python, data structures, algorithms, and OOP.",
        "Guide students in debugging, code optimisation, modular design, and unit testing."
      ]
    },
    {
      role: "Engineering Lead (Founder Role)",
      company: "Starportal Software LLP",
      location: "Noida, India",
      period: "Dec 2023 — July 2025",
      highlights: [
        "Designed and implemented distributed transaction infrastructure across 10+ networks.",
        "Delivered high‑performance messaging and APIs that processed 1M+ messages per day.",
        "Achieved sub‑100 ms latency and 4× throughput using a WebSocket streaming layer for trading data.",
        "Implemented 2FA, TOTP, JWTs with RBAC, encrypted secrets, audit logs, and rate limits for secure operations.",
        "Built cloud‑native microservices on AWS and scaled products to 250K+ MAU."
      ]
    },
    {
      role: "Engineering Manager",
      company: "Intract Software Pvt Ltd",
      location: "Singapore",
      period: "Nov 2022 — Dec 2023",
      highlights: [
        "Architected core backend using Node.js, Redis, Docker, and Kafka, reducing database load by 40%.",
        "Built onboarding pipelines for 50+ B2B partners and supported a campaign with 1M users and $3M in revenue.",
        "Designed a rewards engine with fraud prevention, rate limits, checks, and auditable payout workflows."
      ]
    },
    {
      role: "Senior Software Developer",
      company: "Syndr LLC",
      location: "Delhi, India",
      period: "Oct 2021 — Nov 2022",
      highlights: [
        "Built distributed backend systems in Python and Java with Kubernetes orchestration and gRPC communication.",
        "Implemented event‑driven automation using cron jobs, WebSockets, and cloud functions, increasing user engagement by 50%+."
      ]
    },
    {
      role: "Software Developer",
      company: "ION Group",
      location: "Noida, India",
      period: "2019 — 2021",
      highlights: [
        "Developed React and TypeScript dashboards for system health and real‑time trader metrics.",
        "Built a Linux benchmarking tool with multithreading that reduced manual testing time by 80%.",
        "Delivered 100+ CI/CD pipelines that reduced incident response time by 60%."
      ]
    }
  ],
  projects: [
    {
      name: "Pulse — AI Healthcare Assistant",
      description: "Developed an AI health assistant using OpenAI LLMs for virtual consultations, symptom triage, and medical report analysis, integrated with HIPAA‑compliant storage and piloted with 5K+ users."
    },
    {
      name: "Thunder Wallet — Unified Digital Payments",
      description: "Built a non‑custodial wallet supporting multi‑rail payments with an award‑winning UI/UX experience."
    },
    {
      name: "Acquisense — AI Deal Intelligence Platform",
      description: "AI‑powered due diligence and automated deal‑sourcing platform for mergers and acquisitions. Surfaces high‑fit targets from large datasets, scores opportunities using financial and strategic signals, and generates explainable risk summaries so deal teams can focus on the most promising transactions."
    },
    {
      name: "Automated Benchmarking Tool",
      description: "Linux benchmarking tool with multithreaded parallel parsing that reduced release validation and manual analysis time by 80% for trading systems."
    }
  ],
  skills: {
    languages: ["Python", "Java", "C", "C++", "JavaScript", "TypeScript"],
    frameworks: ["React", "Node.js", "Spring Boot", "TensorFlow", "PyTorch", "LangChain"],
    ai: ["LLMs", "Applied AI", "Machine Learning", "Artificial Intelligence", "RAG pipelines"],
    databases: ["MySQL", "MongoDB", "PostgreSQL", "Redis", "SQL"],
    cloud: ["AWS", "Azure", "Kubernetes", "Microservices", "gRPC", "Docker", "CI/CD"],
    web: ["HTML", "CSS", "WebSockets", "REST APIs"],
    messaging: ["RabbitMQ", "Kafka", "SQS"]
  },
  certifications: [
    "AWS Certified Cloud Practitioner",
    "Google PM Certificate",
    "ACM ICPC Regional Qualifier (2016, 2018)",
    "Teaching Assistant — Programming and DSA",
    "Vice President — Toastmasters International (2018)",
    "Certified Yoga Teacher (2018)",
    "Club Head — AI & Blockchain, GGSIPU"
  ],
  contact: {
    email: "ujjwal451@gmail.com",
    phone: "+1 765-409-4910",
    location: "West Lafayette, IN",
    linkedin: "https://www.linkedin.com/in/ujwlj/"
  }
};

// Create system prompt with resume data
const createSystemPrompt = () => {
  return `You are Mario, Ujjwal's friendly assistant chatbot. You help visitors learn about Ujjwal's professional background, experience, and skills. Be conversational, helpful, and enthusiastic (like Mario!). Always stay in character as Mario.

Here is Ujjwal's resume information:

ABOUT:
${resumeData.about.title}
${resumeData.about.description}

EDUCATION:
${resumeData.education.map(edu => `• ${edu.degree} - ${edu.school}, ${edu.location} (${edu.period})`).join('\n')}

WORK EXPERIENCE:
${resumeData.experience.map(exp => {
  return `• ${exp.role} at ${exp.company} (${exp.location}, ${exp.period})\n  Key achievements:\n${exp.highlights.map(h => `  - ${h}`).join('\n')}`;
}).join('\n\n')}

PROJECTS:
${resumeData.projects.map(proj => `• ${proj.name}: ${proj.description}`).join('\n\n')}

SKILLS:
Programming Languages: ${resumeData.skills.languages.join(', ')}
Frameworks & Libraries: ${resumeData.skills.frameworks.join(', ')}
AI & ML: ${resumeData.skills.ai.join(', ')}
Databases: ${resumeData.skills.databases.join(', ')}
Cloud & Infrastructure: ${resumeData.skills.cloud.join(', ')}
Web Technologies: ${resumeData.skills.web.join(', ')}
Messaging & Queues: ${resumeData.skills.messaging.join(', ')}

CERTIFICATIONS & HONORS:
${resumeData.certifications.map(c => `• ${c}`).join('\n')}

CONTACT INFORMATION:
Email: ${resumeData.contact.email}
Phone: ${resumeData.contact.phone}
Location: ${resumeData.contact.location}
LinkedIn: ${resumeData.contact.linkedin}

When answering questions:
- Be friendly and enthusiastic (like Mario!)
- Provide accurate information from the resume above
- If asked about something not in the resume, politely say you don't have that information
- Keep responses concise but informative
- Use emojis occasionally to keep it fun
- Always stay in character as Mario helping Ujjwal
- Use markdown formatting for better readability:
  - Use **bold** for important terms, job titles, company names, project names, and key skills
  - Use *italic* for emphasis when needed
  - Use \`code\` formatting for technical terms, programming languages, or technologies
  - Use line breaks to separate different sections or points`;
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
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
    
    if (!apiKey || apiKey === 'your_openai_api_key_here') {
      return "⚠️ OpenAI API key is not configured. Please add your API key to the .env file as REACT_APP_OPENAI_API_KEY.";
    }

    try {
      // Ensure currentMessages is an array
      if (!currentMessages || !Array.isArray(currentMessages)) {
        throw new Error('Invalid messages array');
      }

      // Build conversation history from current messages
      const conversationHistory = currentMessages
        .filter(msg => msg && (msg.type === 'user' || msg.type === 'bot'))
        .map(msg => ({
          role: msg.type === 'user' ? 'user' : 'assistant',
          content: msg.text || ''
        }));

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: createSystemPrompt()
            },
            ...conversationHistory
          ],
          temperature: 0.7,
          max_tokens: 500
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || "Sorry, I couldn't generate a response.";
    } catch (error) {
      console.error('OpenAI API error:', error);
      return `⚠️ Error: ${error.message}. Please check your API key and try again.`;
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
