import React, { useState, useEffect, useRef } from 'react';
import './PortfolioSection.css';

const PortfolioSection = ({ section, onClose, nightMode = false }) => {
  const panelBodyRef = useRef(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);

  useEffect(() => {
    // Capture the ref value to use in cleanup
    const panelBodyElement = panelBodyRef.current;

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

    if (panelBodyElement) {
      panelBodyElement.addEventListener('scroll', handleScroll);
    }

    // Check on resize
    window.addEventListener('resize', checkScrollable);

    return () => {
      clearTimeout(timeoutId);
      if (panelBodyElement) {
        panelBodyElement.removeEventListener('scroll', handleScroll);
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
                  Software Engineer with experience architecting and scaling distributed systems, real-time data pipelines, and cloud-native backend services on Kubernetes. Proven track record of designing low-latency, high-throughput architectures, owning production reliability, and delivering resilient systems on modern cloud platforms.
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
                    <h3>Master of Business and Technology (Awarded Fellowship)</h3>
                    <p><strong>Purdue University</strong></p>
                    <p>West Lafayette, IN</p>
                    <p>Dec 2026</p>
                    <p><em>Teaching Assistant & Python Programming Tutor</em></p>
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
                    src={`${process.env.PUBLIC_URL || ''}/workAssets/starportal.png`}
                    alt="Starportal Software logo"
                  />
                  <div className="experience-text">
                    <h3>Engineering Lead</h3>
                    <p><strong>Starportal Software LLP</strong> &mdash; Noida, India</p>
                    <p>Dec 2023 &mdash; July 2025</p>
                  </div>
                  <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                    <li>Architected and scaled a real-time trading platform serving 300K+ MAU, building a high-throughput event-driven stack using Kafka (consumer groups, DLQs, idempotent producers), Redis for ultra-low-latency, and WebSockets for bidirectional order flow.</li>
                    <li>Designed resilient distributed services using Docker containers with stateless APIs, active-active deployments, health-based routing, circuit breakers, retries with timeouts, and controlled backpressure, maintaining uptime during rolling updates.</li>
                    <li>Implemented end-to-end security and trading primitives including 2FA/TOTP, device binding, short-lived JWTs with RBAC, encrypted secrets, audit trails, and rate limits, supporting secure execution of trading actions and platform APIs.</li>
                    <li>Drove platform growth and operational ownership by leading on-call and scaling a Telegram Mini App to 300K+ MAU, while launching tiered pricing, usage limits, and analytics-driven rollouts to improve activation, retention, and ARPU.</li>
                  </ul>
                </div>
                <div className="experience-item">
                  <img
                    className="experience-logo"
                    src={`${process.env.PUBLIC_URL || ''}/workAssets/Intract.png`}
                    alt="Intract Software logo"
                  />
                  <div className="experience-text">
                    <h3>Lead Software Engineer</h3>
                    <p><strong>Intract Software Pvt Ltd</strong> &mdash; Singapore</p>
                    <p>Nov 2022 &mdash; Dec 2023</p>
                  </div>
                  <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                    <li>Architected a large-scale, event-driven backend platform using Node.js and TypeScript, designing policy-based rules, eligibility checks, fraud controls, and scalable payout workflows backed by PostgreSQL, Redis, and Kafka / pub-sub.</li>
                    <li>Built low-latency data pipelines and distributed processing systems with event ingestion, caching, idempotent workers, rate limiting, and auditability, supported by Prometheus, Grafana, and CI/CD quality gates.</li>
                    <li>Owned production reliability by shipping a high-traffic personalized analytics experience (Intract Rewind 2022), optimizing for burst traffic using precomputation, caching, and CDN delivery while leading on-call and architecture reviews.</li>
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
                    <li>Architected and scaled distributed backend systems in Python and Java using Kubernetes and gRPC microservices, with autoscaling, zero-downtime deployments, and production-grade reliability patterns, supporting 50K+ users with high availability.</li>
                    <li>Built event-driven pipelines and observability foundations using queues or pub/sub, WebSocket fan-out, cloud functions, SLIs/SLOs, reliably handling traffic bursts and driving a 40% increase in user engagement.</li>
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
                    <li>Designed and optimized backend systems in C++, improving replication and fault recovery through resumable synchronization and adaptive backoff, reducing latency by 89% and improving availability.</li>
                    <li>Improved p99 latency and system stability by optimizing performance-critical code paths using multithreaded I/O, efficient memory management, batching, and contention reduction, enabling reliable operation under peak traffic and bursty workloads.</li>
                    <li>Shipped 50+ production releases using CI/CD with staged deployments, automated testing, monitoring, and rollback, while building incident automation and observability that reduced incident response time by 60% and improved on-call reliability.</li>
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
                  <h3>Pulse &mdash; AI-Powered Healthcare Platform (LLM-Driven Clinical Workflows)</h3>
                  <p>Architected and built an AI-driven healthcare platform using LLM-based workflows for symptom triage, virtual consultations, and medical report analysis, serving 5K+ users with secure, HIPAA-compliant Restful APIs and inference pipelines.</p>
                  <p style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>Apr 2025</p>
                </div>
                <div className="project-card">
                  <img
                    className="project-logo"
                    src={`${process.env.PUBLIC_URL || ''}/workAssets/ThunderWallet.png`}
                    alt="Thunder Wallet logo"
                  />
                  <h3>Thunder Wallet &mdash; Non-Custodial Payments Infrastructure</h3>
                  <p>Enabled secure multi-rail transactions via modular services and user-controlled key management; won Best UI/UX Award.</p>
                  <p style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>Jan 2022</p>
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
                  <h3>Languages & Frameworks</h3>
                  <div className="skill-tags">
                    <span className="skill-tag">Python</span>
                    <span className="skill-tag">Java</span>
                    <span className="skill-tag">C</span>
                    <span className="skill-tag">C++</span>
                    <span className="skill-tag">C#</span>
                    <span className="skill-tag">JavaScript</span>
                    <span className="skill-tag">Ruby</span>
                    <span className="skill-tag">TypeScript</span>
                    <span className="skill-tag">HTML</span>
                    <span className="skill-tag">CSS</span>
                    <span className="skill-tag">Node.js</span>
                    <span className="skill-tag">SQL</span>
                    <span className="skill-tag">Kotlin</span>
                    <span className="skill-tag">Swift</span>
                    <span className="skill-tag">R</span>
                    <span className="skill-tag">Golang</span>
                    <span className="skill-tag">Rust</span>
                    <span className="skill-tag">PHP</span>
                    <span className="skill-tag">Shell</span>
                    <span className="skill-tag">Bash</span>
                    <span className="skill-tag">GraphQL</span>
                    <span className="skill-tag">React</span>
                    <span className="skill-tag">Spring Boot</span>
                    <span className="skill-tag">.NET</span>
                    <span className="skill-tag">MVC</span>
                    <span className="skill-tag">TensorFlow</span>
                    <span className="skill-tag">PyTorch</span>
                    <span className="skill-tag">LangChain</span>
                    <span className="skill-tag">Django</span>
                  </div>
                </div>
                <div className="skill-category">
                  <h3>DevOps</h3>
                  <div className="skill-tags">
                    <span className="skill-tag">Linux</span>
                    <span className="skill-tag">Git</span>
                    <span className="skill-tag">Azure</span>
                    <span className="skill-tag">GCP</span>
                    <span className="skill-tag">TCP/IP</span>
                    <span className="skill-tag">DNS</span>
                    <span className="skill-tag">JIRA</span>
                    <span className="skill-tag">S3</span>
                    <span className="skill-tag">API Gateway</span>
                    <span className="skill-tag">Terraform</span>
                    <span className="skill-tag">NGINX</span>
                    <span className="skill-tag">Reverse Proxy</span>
                    <span className="skill-tag">Load Balancing</span>
                    <span className="skill-tag">DynamoDB</span>
                    <span className="skill-tag">Ansible</span>
                    <span className="skill-tag">Grafana</span>
                    <span className="skill-tag">ELK Stack</span>
                    <span className="skill-tag">Serverless Architecture</span>
                    <span className="skill-tag">Jenkins</span>
                    <span className="skill-tag">SDLC</span>
                    <span className="skill-tag">SDK</span>
                    <span className="skill-tag">Object-Oriented</span>
                    <span className="skill-tag">Performance Testing</span>
                  </div>
                </div>
                <div className="skill-category">
                  <h3>Systems & Architecture</h3>
                  <div className="skill-tags">
                    <span className="skill-tag">MySQL</span>
                    <span className="skill-tag">MongoDB</span>
                    <span className="skill-tag">NoSQL</span>
                    <span className="skill-tag">IAM</span>
                    <span className="skill-tag">OpenID Connect</span>
                    <span className="skill-tag">Load Testing</span>
                    <span className="skill-tag">Event Sourcing</span>
                    <span className="skill-tag">Computer Science Fundamentals</span>
                    <span className="skill-tag">Service-Oriented Architecture</span>
                    <span className="skill-tag">Data Analysis</span>
                    <span className="skill-tag">System Design</span>
                    <span className="skill-tag">Design Patterns</span>
                    <span className="skill-tag">Applied AI</span>
                    <span className="skill-tag">Machine Learning</span>
                  </div>
                </div>
                <div className="skill-category">
                  <h3>Essentials</h3>
                  <div className="skill-tags">
                    <span className="skill-tag">Problem Solving</span>
                    <span className="skill-tag">Analytical Thinking</span>
                    <span className="skill-tag">Clear Communication</span>
                    <span className="skill-tag">Attention to Detail</span>
                    <span className="skill-tag">Critical Thinking</span>
                    <span className="skill-tag">Agile</span>
                    <span className="skill-tag">Adaptability</span>
                    <span className="skill-tag">Collaboration</span>
                    <span className="skill-tag">Continuous Learning</span>
                    <span className="skill-tag">Accountability</span>
                    <span className="skill-tag">Leadership</span>
                    <span className="skill-tag">Strategic Thinking</span>
                    <span className="skill-tag">Code Reviews</span>
                    <span className="skill-tag">Technical Documentation</span>
                  </div>
                </div>
              </div>
            </div>
          )
        };
      case 'certifications':
        return {
          title: 'Certifications & Honors',
          icon: '🏆',
          content: (
            <div className="section-content">
              <div className="certifications-list">
                <div className="certification-item">
                  <h3>Competitions & Achievements</h3>
                  <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                    <li><a href="https://drive.google.com/file/d/1Y5QqRFMLorUSOB5uadf7b2z5bVUB4wMn/view" target="_blank" rel="noopener noreferrer" style={{ color: '#ff6b6b', textDecoration: 'underline' }}>ACM ICPC Regional Finalist (2016, 2018)</a></li>
                  </ul>
                </div>
                <div className="certification-item">
                  <h3>AWS Certifications</h3>
                  <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                    <li><a href="https://www.credly.com/badges/b5e7fc04-e66d-4b7b-95b3-b4576c7017b2" target="_blank" rel="noopener noreferrer" style={{ color: '#ff6b6b', textDecoration: 'underline' }}>Certified Cloud Practitioner</a></li>
                    <li><a href="https://www.credly.com/badges/97357130-cca0-4edf-bcb3-2f55a47bae80" target="_blank" rel="noopener noreferrer" style={{ color: '#ff6b6b', textDecoration: 'underline' }}>Certified AI Practitioner</a></li>
                  </ul>
                </div>
                <div className="certification-item">
                  <h3>Google</h3>
                  <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                    <li>Generative AI</li>
                  </ul>
                </div>
                <div className="certification-item">
                  <h3>Teaching & Leadership</h3>
                  <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                    <li><a href="https://drive.google.com/file/d/1Cf0A-iSpMMK0S518V2ak0ZTM_G6W3N2M/view" target="_blank" rel="noopener noreferrer" style={{ color: '#ff6b6b', textDecoration: 'underline' }}>Teaching Assistant &mdash; Programming & DSA</a></li>
                    <li>Vice President 2018 &mdash; Toastmasters International</li>
                    <li>Certified Yoga Teacher &mdash; Batch 2018</li>
                  </ul>
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
    <div className={`portfolio-section ${nightMode ? 'night-mode' : ''}`}>
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

