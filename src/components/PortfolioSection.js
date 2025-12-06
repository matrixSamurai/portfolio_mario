import React, { useState, useEffect, useRef } from 'react';
import './PortfolioSection.css';

const PortfolioSection = ({ section, onClose }) => {
  const panelBodyRef = useRef(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);

  useEffect(() => {
    const checkScrollable = () => {
      if (panelBodyRef.current) {
        const { scrollHeight, clientHeight, scrollTop } = panelBodyRef.current;
        const isScrollable = scrollHeight > clientHeight;
        // Only show if scrollable and at the top (not scrolled yet)
        setShowScrollIndicator(isScrollable && scrollTop === 0);
      }
    };

    // Check initially and after content loads
    checkScrollable();
    const timeoutId = setTimeout(checkScrollable, 100);

    // Hide indicator as soon as user starts scrolling
    const handleScroll = () => {
      if (panelBodyRef.current) {
        const { scrollTop } = panelBodyRef.current;
        if (scrollTop > 0) {
          setShowScrollIndicator(false);
        }
      }
    };

    if (panelBodyRef.current) {
      panelBodyRef.current.addEventListener('scroll', handleScroll);
    }

    // Check on resize
    window.addEventListener('resize', checkScrollable);

    return () => {
      clearTimeout(timeoutId);
      if (panelBodyRef.current) {
        panelBodyRef.current.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('resize', checkScrollable);
    };
  }, [section]);
  const getSectionData = () => {
    switch (section) {
      case 'about':
        return {
          title: 'About',
          icon: '👤',
          content: (
            <div className="section-content">
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <p style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '20px', lineHeight: '1.6' }}>
                  Software Engineer · Backend & Distributed Systems
                </p>
                <p style={{ fontSize: '14px', lineHeight: '1.8', marginBottom: '15px' }}>
                  Software Engineer with experience designing scalable backend systems and cloud‑native distributed
                  services. Skilled in building low‑latency, high‑throughput applications and real‑time data pipelines.
                  Currently pursuing a Master of Business and Technology at Purdue and seeking a Summer 2026 Software
                  Engineering internship.
                </p>
              </div>
            </div>
          )
        };
      case 'education':
        return {
          title: 'Education',
          icon: '🎓',
          content: (
            <div className="section-content">
              <div className="education-list">
                <div className="education-item">
                  <img
                    className="education-logo"
                    src={`${process.env.PUBLIC_URL || ''}/workAssets/purdue.png`}
                    alt="Purdue University logo"
                  />
                  <div className="education-text">
                    <h3>Master of Business and Technology - AI</h3>
                    <p><strong>Purdue University, Daniels School of Business</strong></p>
                    <p>West Lafayette, IN</p>
                    <p>Dec 2026 &mdash; Fellowship Awarded</p>
                  </div>
                </div>
                <div className="education-item">
                  <img
                    className="education-logo"
                    src={`${process.env.PUBLIC_URL || ''}/workAssets/ggsipu.png`}
                    alt="GGSIPU logo"
                  />
                  <div className="education-text">
                    <h3>Bachelor of Technology in Information Technology</h3>
                    <p><strong>Guru Gobind Singh Indraprastha University</strong></p>
                    <p>Delhi, India</p>
                    <p>2015 &mdash; 2019</p>
                  </div>
                </div>
              </div>
            </div>
          )
        };
      case 'experience':
        return {
          title: 'Work Experience',
          icon: '💼',
          content: (
            <div className="section-content">
              <div className="experience-list">
                <div className="experience-item">
                  <img
                    className="experience-logo"
                    src={`${process.env.PUBLIC_URL || ''}/workAssets/purdue.png`}
                    alt="Purdue University logo"
                  />
                  <div className="experience-text">
                    <h3>Python Programming Tutor</h3>
                    <p><strong>Purdue University</strong> &mdash; West Lafayette, IN</p>
                    <p>Oct 2025 &mdash; Present</p>
                  </div>
                  <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                    <li>Conduct weekly tutoring sessions focused on Python, data structures, algorithms, and OOP.</li>
                    <li>Guide students in debugging, code optimisation, modular design, and unit testing.</li>
                  </ul>
                </div>
                <div className="experience-item">
                  <img
                    className="experience-logo"
                    src={`${process.env.PUBLIC_URL || ''}/workAssets/starportal.png`}
                    alt="Starportal Software logo"
                  />
                  <div className="experience-text">
                    <h3>Engineering Lead (Founder Role)</h3>
                    <p><strong>Starportal Software LLP</strong> &mdash; Noida, India</p>
                    <p>Dec 2023 &mdash; July 2025</p>
                  </div>
                  <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                    <li>Designed and implemented distributed transaction infrastructure across 10+ networks.</li>
                    <li>Delivered high‑performance messaging and APIs that processed 1M+ messages per day.</li>
                    <li>Achieved sub‑100&nbsp;ms latency and 4× throughput using a WebSocket streaming layer for trading data.</li>
                    <li>Implemented 2FA, TOTP, JWTs with RBAC, encrypted secrets, audit logs, and rate limits for secure operations.</li>
                    <li>Built cloud‑native microservices on AWS and scaled products to 250K+ MAU.</li>
                  </ul>
                </div>
                <div className="experience-item">
                  <img
                    className="experience-logo"
                    src={`${process.env.PUBLIC_URL || ''}/workAssets/Intract.png`}
                    alt="Intract Software logo"
                  />
                  <div className="experience-text">
                    <h3>Engineering Manager</h3>
                    <p><strong>Intract Software Pvt Ltd</strong> &mdash; Singapore</p>
                    <p>Nov 2022 &mdash; Dec 2023</p>
                  </div>
                  <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                    <li>Architected core backend using Node.js, Redis, Docker, and Kafka, reducing database load by 40%.</li>
                    <li>Built onboarding pipelines for 50+ B2B partners and supported a campaign with 1M users and $3M in revenue.</li>
                    <li>Designed a rewards engine with fraud prevention, rate limits, checks, and auditable payout workflows.</li>
                  </ul>
                </div>
                <div className="experience-item">
                  <img
                    className="experience-logo"
                    src={`${process.env.PUBLIC_URL || ''}/workAssets/syndr.png`}
                    alt="Syndr logo"
                  />
                  <div className="experience-text">
                    <h3>Senior Software Developer</h3>
                    <p><strong>Syndr LLC</strong> &mdash; Delhi, India</p>
                    <p>Oct 2021 &mdash; Nov 2022</p>
                  </div>
                  <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                    <li>Built distributed backend systems in Python and Java with Kubernetes orchestration and gRPC communication.</li>
                    <li>Implemented event‑driven automation using cron jobs, WebSockets, and cloud functions, increasing user engagement by 50%+.</li>
                  </ul>
                </div>
                <div className="experience-item">
                  <img
                    className="experience-logo"
                    src={`${process.env.PUBLIC_URL || ''}/workAssets/ion-group.png`}
                    alt="ION Group logo"
                  />
                  <div className="experience-text">
                    <h3>Software Developer</h3>
                    <p><strong>ION Group</strong> &mdash; Noida, India</p>
                    <p>2019 &mdash; 2021</p>
                  </div>
                  <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                    <li>Developed React and TypeScript dashboards for system health and real‑time trader metrics.</li>
                    <li>Built a Linux benchmarking tool with multithreading that reduced manual testing time by 80%.</li>
                    <li>Delivered 100+ CI/CD pipelines that reduced incident response time by 60%.</li>
                  </ul>
                </div>
              </div>
            </div>
          )
        };
      case 'projects':
        return {
          title: 'Projects',
          icon: '🚀',
          content: (
            <div className="section-content">
              <div className="project-grid">
                <div className="project-card">
                  <img
                    className="project-logo"
                    src={`${process.env.PUBLIC_URL || ''}/workAssets/Pulss.png`}
                    alt="Pulse project logo"
                  />
                  <h3>Pulse &mdash; AI Healthcare Assistant</h3>
                  <p>Developed an AI health assistant using OpenAI LLMs for virtual consultations, symptom triage, and
                    medical report analysis, integrated with HIPAA‑compliant storage and piloted with 5K+ users.</p>
                </div>
                <div className="project-card">
                  <img
                    className="project-logo"
                    src={`${process.env.PUBLIC_URL || ''}/workAssets/ThunderWallet.png`}
                    alt="Thunder Wallet logo"
                  />
                  <h3>Thunder Wallet &mdash; Unified Digital Payments</h3>
                  <p>Built a non‑custodial wallet supporting multi‑rail payments with an award‑winning UI/UX experience.</p>
                </div>
                <div className="project-card">
                  <img
                    className="project-logo"
                    src={`${process.env.PUBLIC_URL || ''}/workAssets/Acquisense.png`}
                    alt="Acquisense platform logo"
                  />
                  <h3>Acquisense &mdash; AI Deal Intelligence Platform</h3>
                  <p>
                    AI‑powered due diligence and automated deal‑sourcing platform for mergers and acquisitions. Surfaces
                    high‑fit targets from large datasets, scores opportunities using financial and strategic signals, and
                    generates explainable risk summaries so deal teams can focus on the most promising transactions.
                  </p>
                </div>
                <div className="project-card">
                  <img
                    className="project-logo"
                    src={`${process.env.PUBLIC_URL || ''}/workAssets/benchmark.png`}
                    alt="Benchmarking tool logo"
                  />
                  <h3>Automated Benchmarking Tool</h3>
                  <p>Linux benchmarking tool with multithreaded parallel parsing that reduced release validation and manual
                    analysis time by 80% for trading systems.</p>
                </div>
              </div>
            </div>
          )
        };
      case 'skills':
        return {
          title: 'Skills',
          icon: '⚡',
          content: (
            <div className="section-content">
              <div className="skills-container">
                <div className="skill-category">
                  <h3>Programming Languages</h3>
                  <div className="skill-tags">
                    <span className="skill-tag">Python</span>
                    <span className="skill-tag">Java</span>
                    <span className="skill-tag">C</span>
                    <span className="skill-tag">C++</span>
                    <span className="skill-tag">JavaScript</span>
                    <span className="skill-tag">TypeScript</span>
                  </div>
                </div>
                <div className="skill-category">
                  <h3>Frameworks & Libraries</h3>
                  <div className="skill-tags">
                    <span className="skill-tag">React</span>
                    <span className="skill-tag">Node.js</span>
                    <span className="skill-tag">Spring Boot</span>
                    <span className="skill-tag">TensorFlow</span>
                    <span className="skill-tag">PyTorch</span>
                    <span className="skill-tag">LangChain</span>
                  </div>
                </div>
                <div className="skill-category">
                  <h3>AI & ML</h3>
                  <div className="skill-tags">
                    <span className="skill-tag">LLMs</span>
                    <span className="skill-tag">Applied AI</span>
                    <span className="skill-tag">Machine Learning</span>
                    <span className="skill-tag">Artificial Intelligence</span>
                    <span className="skill-tag">RAG pipelines</span>
                  </div>
                </div>
                <div className="skill-category">
                  <h3>Databases & Storage</h3>
                  <div className="skill-tags">
                    <span className="skill-tag">MySQL</span>
                    <span className="skill-tag">MongoDB</span>
                    <span className="skill-tag">PostgreSQL</span>
                    <span className="skill-tag">Redis</span>
                    <span className="skill-tag">SQL</span>
                  </div>
                </div>
                <div className="skill-category">
                  <h3>Cloud & Infrastructure</h3>
                  <div className="skill-tags">
                    <span className="skill-tag">AWS</span>
                    <span className="skill-tag">Azure</span>
                    <span className="skill-tag">Kubernetes</span>
                    <span className="skill-tag">Microservices</span>
                    <span className="skill-tag">gRPC</span>
                    <span className="skill-tag">Docker</span>
                    <span className="skill-tag">CI/CD</span>
                  </div>
                </div>
                <div className="skill-category">
                  <h3>Web Technologies</h3>
                  <div className="skill-tags">
                    <span className="skill-tag">HTML</span>
                    <span className="skill-tag">CSS</span>
                    <span className="skill-tag">WebSockets</span>
                    <span className="skill-tag">REST APIs</span>
                  </div>
                </div>
                <div className="skill-category">
                  <h3>Messaging & Queues</h3>
                  <div className="skill-tags">
                    <span className="skill-tag">RabbitMQ</span>
                    <span className="skill-tag">Kafka</span>
                    <span className="skill-tag">SQS</span>
                  </div>
                </div>
                <div className="skill-category">
                  <h3>Certifications & Honors</h3>
                  <div className="skill-tags">
                    <span className="skill-tag">AWS Certified Cloud Practitioner</span>
                    <span className="skill-tag">Google PM Certificate</span>
                    <span className="skill-tag">ACM ICPC Regional Qualifier (2016, 2018)</span>
                    <span className="skill-tag">Teaching Assistant &mdash; Programming and DSA</span>
                    <span className="skill-tag">Vice President &mdash; Toastmasters International (2018)</span>
                    <span className="skill-tag">Certified Yoga Teacher (2018)</span>
                    <span className="skill-tag">Club Head &mdash; AI &amp; Blockchain, GGSIPU</span>
                  </div>
                </div>
              </div>
            </div>
          )
        };
      case 'contact':
        return {
          title: 'Contact',
          icon: '📧',
          content: (
            <div className="section-content">
              <div className="contact-info">
                <div className="contact-item">
                  <span className="contact-icon">📧</span>
                  <a href="mailto:ujjwal451@gmail.com">ujjwal451@gmail.com</a>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📱</span>
                  <a href="tel:+17654094910">+1 765-409-4910</a>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">💼</span>
                  <a href="https://www.linkedin.com/in/ujwlj/" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📍</span>
                  <span>West Lafayette, IN</span>
                </div>
              </div>
              <div className="social-links">
                <a href="https://www.linkedin.com/in/ujwlj/" target="_blank" rel="noopener noreferrer" className="social-button">LinkedIn</a>
                <a href="mailto:ujjwal451@gmail.com" className="social-button">Email Me</a>
              </div>
            </div>
          )
        };
      default:
        return {
          title: 'Portfolio',
          icon: '📋',
          content: (
            <div className="section-content">
              <h2>Portfolio</h2>
              <p>Select a section to view details</p>
            </div>
          )
        };
    }
  };

  const sectionData = getSectionData();

  return (
    <div className="portfolio-section">
      <div className="section-panel">
        <div 
          className="panel-header"
          style={{
            backgroundImage: `url(${process.env.PUBLIC_URL || ''}/coin.png)`,
          }}
        >
          <div className="mario-header">
            <div className="header-content">
              <span className="section-icon">{sectionData.icon}</span>
              <h1>{sectionData.title}</h1>
            </div>
            <button 
              className="close-button" 
              onClick={onClose}
              aria-label="Close panel"
            >
              ×
            </button>
          </div>
        </div>
        <div className="panel-body" ref={panelBodyRef}>
          {sectionData.content}
          {showScrollIndicator && (
            <div className="scroll-indicator">
              <div className="scroll-arrow">↓</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioSection;

