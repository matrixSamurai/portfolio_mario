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
                    <p style={{ marginTop: '12px', marginBottom: '8px' }}><strong><em>Teaching Assistant & Python Programming Tutor</em></strong></p>
                    <ul style={{ marginTop: '8px', paddingLeft: '20px', textAlign: 'left' }}>
                      <li>Conduct weekly tutoring sessions focused on Python programming, data structures, algorithms, and object-oriented design</li>
                      <li>Mentor students in debugging techniques, code optimization, and building modular solutions with test-driven development (TDD)</li>
                    </ul>
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
                    <h3>Founder</h3>
                    <p><strong>Starportal Software LLP</strong> &mdash; Noida, India</p>
                    <p>Dec 2023 &mdash; July 2025</p>
                  </div>
                  <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                    <li>Led Engineering and Product to build and scale a real-time trading platform to 300K+ MAU using Kafka, Redis, and WebSockets. Owned architecture, SRE, and growth levers including tiered pricing and analytics-driven roadmap, improving activation and retention while keeping acquisition costs low.</li>
                    <li>Built high-throughput trading stack with Kafka (consumer groups, DLQs, idempotent producers), Redis for ultra-low latency, and WebSockets for bidirectional order flow. Designed resilient services with active-active deployment, circuit breakers, and controlled backpressure for 99.9% uptime.</li>
                    <li>Implemented end-to-end security including 2FA/TOTP, device binding, short-lived JWTs with RBAC, and audit trails. Delivered predictions market module with signal aggregation, risk limits, and backtesting harness. Scaled Mini App to 300K+ MAU with tiered pricing and data-driven rollouts.</li>
                    <li>Led cross-functional execution including on-call, mentoring engineers, and driving integrations with 50+ partners while aligning with compliance, finance, and community teams.</li>
                  </ul>
                </div>
                <div className="experience-item">
                  <img
                    className="experience-logo"
                    src={`${process.env.PUBLIC_URL || ''}/workAssets/Intract.png`}
                    alt="Intract Software logo"
                  />
                  <div className="experience-text">
                    <h3>Senior Software Engineer</h3>
                    <p><strong>Intract Software Pvt Ltd</strong> &mdash; Singapore</p>
                    <p>Nov 2022 &mdash; Dec 2023</p>
                  </div>
                  <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                    <li>Led end-to-end architecture of Intract Quest Platform using Node.js and TypeScript, designing policy-based rules engine, fraud controls, and scalable payout workflows backed by PostgreSQL, Redis, and event-driven orchestration.</li>
                    <li>Built event ingestion pipeline using Kafka/pub-sub, Redis, and worker-based orchestration for reliable, low-latency reward campaigns. Implemented secure payout layer with batched execution, rate limiting, and idempotent workers, supported by Prometheus, Grafana, and CI/CD pipelines.</li>
                    <li>Shipped Intract Rewind 2022, a Spotify Wrapped–style analytics experience with precomputed cohorts and CDN delivery, optimized for burst traffic, contributing to Product Hunt Launch of the Week recognition.</li>
                    <li>Drove growth outcomes by integrating with 50+ external teams via REST APIs and webhooks, instrumenting analytics pipelines, and iterating reward mechanics to lift completion and retention while keeping acquisition costs low.</li>
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
                    <li>Architected distributed backend systems in Python and Java, deploying microservices on Kubernetes with gRPC APIs and smart load balancing. Built event-driven automation using cron jobs, WebSockets, and cloud functions, driving 40% engagement lift across 50K+ users.</li>
                    <li>Designed microservices at scale with gRPC contracts, service discovery, HPA autoscaling, and zero-downtime canary/blue-green deploys. Implemented event pipelines with idempotent workers and controlled backpressure for reliable traffic burst handling.</li>
                    <li>Hardened reliability with timeouts, retries, circuit breakers, and graceful degradation. Built end-to-end observability with SLIs/SLOs, structured logs, metrics, tracing, and automated testing, reducing MTTR and enabling fast rollbacks.</li>
                    <li>Provided senior technical leadership through design reviews, RFCs, and mentoring. Partnered with Product, Infra, and Security to deliver compliant, cost-aware releases.</li>
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
                    <li>Built and optimized low-latency trading systems in C++, evolving a TCP-based recovery protocol that reduced master-to-replica sync time by 89% and improved trading uptime by 20+ minutes per session for global banks. Delivered 100+ CI/CD releases with automation that cut incident response time by 60%.</li>
                    <li>Improved TCP recovery and failover with resumable synchronization, sequence gap repair, and congestion/backoff tuning. Optimized critical hot paths using multithreaded I/O, memory management, and batching strategies, stabilizing p99 latency during heavy market bursts.</li>
                    <li>Delivered 100+ production releases through CI/CD with staged rollouts, automated testing, and one-click rollback. Built incident automation with health checks, alerts, dashboards, and runbooks, reducing MTTR across multiple client environments.</li>
                    <li>Partnered with client trading desks, operations, and QA teams. Defined SLAs, led code/design reviews, authored technical documentation, and supported on-call responsibilities for consistent, reliable trading sessions.</li>
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

