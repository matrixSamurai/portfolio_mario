import React, { useState, useEffect, useRef } from 'react';
import './PortfolioSection.css';
import { IS_AI_PROFILE } from '../constants/profileConfig';

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
              <div style={{ textAlign: 'center', marginTop: '12px' }}>
                <span className="about-tagline">{IS_AI_PROFILE ? 'AI Engineer · Intelligent Systems' : 'Software Engineer · Distributed Systems'}</span>
                <p style={{ fontSize: '15px', fontWeight: '700', marginBottom: '4px', lineHeight: '1.5', color: '#1a1a1a' }}>
                  {IS_AI_PROFILE ? 'AI Agents · LLM Systems · Scalable ML Pipelines' : 'Low-latency Event-driven Systems · Cloud-native Backend'}
                </p>
                <div className="stats-grid">
                  <div className="stat-item">
                    <span className="stat-number">5+</span>
                    <span className="stat-label">Years Exp</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">{IS_AI_PROFILE ? '5K+' : '300K+'}</span>
                    <span className="stat-label">{IS_AI_PROFILE ? 'AI Users Served' : 'MAU Platform Scale'}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">{IS_AI_PROFILE ? 'Startup + Big Tech' : 'Startup + Big Tech'}</span>
                    <span className="stat-label">{IS_AI_PROFILE ? 'Experience' : 'Experience'}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">2026</span>
                    <span className="stat-label">Internship Target</span>
                  </div>
                </div>
                <div className="about-highlights">
                  {IS_AI_PROFILE ? (
                    <>
                      <span className="highlight-tag">LLMs</span>
                      <span className="highlight-tag">LangChain</span>
                      <span className="highlight-tag">LangSmith</span>
                      <span className="highlight-tag">RAG</span>
                      <span className="highlight-tag">Vector DBs</span>
                    </>
                  ) : (
                    <>
                      <span className="highlight-tag">Kafka</span>
                      <span className="highlight-tag">Kubernetes</span>
                      <span className="highlight-tag">Redis</span>
                      <span className="highlight-tag">gRPC</span>
                      <span className="highlight-tag">WebSockets</span>
                    </>
                  )}
                  <span className="highlight-tag">AWS</span>
                  <span className="highlight-tag">Python</span>
                  <span className="highlight-tag">{IS_AI_PROFILE ? 'Kubernetes' : 'Node.js'}</span>
                </div>
                <p style={{ fontSize: '14px', lineHeight: '1.85', color: '#444', textAlign: 'left' }}>
                  {IS_AI_PROFILE
                    ? 'AI Engineer experienced in intelligent systems, AI agents, and scalable ML pipelines for real-world applications. Skilled with LLMs, LangChain, and LangSmith, with strong focus on production readiness, performance, and deployment of autonomous agents and RAG systems.'
                    : 'Software Engineer specializing in distributed systems, AI-powered platforms, and cloud-native backend services. Experienced in building low-latency event-driven architectures, real-time pipelines, and scalable APIs for high-traffic applications. Seeking Summer 2026 Software Engineering Internship opportunities.'}
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
                    <h3>Master of Business and Technology</h3>
                    <p><strong>Purdue University</strong> &mdash; West Lafayette, IN</p>
                    <span className="education-date-badge">Dec 2026 · Awarded Fellowship · GPA: 3.71</span>
                    <p style={{ marginTop: '12px', marginBottom: '8px' }}><strong><em>Graduate Teaching Assistant</em></strong></p>
                    <ul style={{ marginTop: '8px', paddingLeft: '20px', textAlign: 'left' }}>
                      <li>Teaching Assistant for Python Programming and Data Visualization</li>
                      <li>Global Student Ambassador and Professional Development Committee leader</li>
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
                    <p><strong>Guru Gobind Singh Indraprastha University</strong> &mdash; Delhi, India</p>
                    <span className="education-date-badge">2015 &mdash; 2019 · GPA: 3.53</span>
                    <p style={{ marginTop: '8px' }}><strong>Founding Head, AI &amp; Blockchain Club</strong></p>
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
                    <h3>{IS_AI_PROFILE ? 'AI Engineer' : 'Senior Software Engineer'}</h3>
                    <p><strong>Starportal Software LLP</strong> &mdash; Noida, India</p>
                    <span className="date-badge">Dec 2023 &mdash; Jul 2025</span>
                  </div>
                  <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                    {IS_AI_PROFILE ? (
                      <>
                        <li>Built data ingestion pipelines for structured and unstructured sources, transforming raw documents into clean, queryable formats for downstream analytics and RAG workflows.</li>
                        <li>Designed retrieval pipelines over large datasets using vector embeddings and optimized indexing, chunking, and ranking strategies to improve search relevance.</li>
                        <li>Implemented LLM-powered utilities with LangChain for document querying and summarization, improving response quality using structured evaluation and LangSmith tracing.</li>
                        <li>Implemented responsible AI safeguards including input filtering, PII redaction, prompt constraints, and output validation.</li>
                      </>
                    ) : (
                      <>
                        <li>Architected a real-time AI trading platform serving 300K+ MAU, building event-driven pipelines in Python and Go with Kafka and WebSockets. Introduced Redis caching, reducing query latency by 62%.</li>
                        <li>Built internal LLM-powered observability and automation tools that analyze distributed service logs and production metrics using prompt pipelines, enabling faster root-cause detection across microservices.</li>
                        <li>Designed distributed backend services and GraphQL APIs using stateless microservices and Docker, owning the full SDLC from system design to deployment and production monitoring supporting millions of daily API requests.</li>
                        <li>Engineered platform security architecture implementing 2FA/TOTP, JWT authentication, RBAC, encrypted secrets, audit logs, and API rate limiting to secure trading workflows for thousands of active users.</li>
                      </>
                    )}
                  </ul>
                </div>
                <div className="experience-item">
                  <img
                    className="experience-logo"
                    src={`${process.env.PUBLIC_URL || ''}/workAssets/Intract.png`}
                    alt="Intract Software logo"
                  />
                  <div className="experience-text">
                    <h3>Software Engineer</h3>
                    <p><strong>Intract Software Pvt Ltd</strong> &mdash; Singapore</p>
                    <span className="date-badge">Nov 2022 &mdash; Dec 2023</span>
                  </div>
                  <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                    {IS_AI_PROFILE ? (
                      <>
                        <li>Built a large-scale fault tolerant backend processing millions of events daily using Node.js and TypeScript, with policy rules, eligibility checks, fraud controls, and payout workflows on PostgreSQL, Redis, and Kafka/pub-sub.</li>
                        <li>Developed low-latency data pipelines with event ingestion, caching, idempotent workers, API rate limiting, and audit logs, monitored using Prometheus, Grafana, and CI/CD quality checks.</li>
                        <li>Owned production reliability for a high-traffic personalized analytics product, handling traffic spikes using precomputation, caching, CDN delivery, and on-call support.</li>
                      </>
                    ) : (
                      <>
                        <li>Built a large-scale fault tolerant backend processing millions of events daily using Node.js and TypeScript, creating policy rules, eligibility checks, fraud controls, and scalable payout workflows powered by PostgreSQL, Redis, and Kafka/pub-sub.</li>
                        <li>Developed low-latency data pipelines and distributed processing systems with event ingestion, caching, idempotent workers, API rate limiting, and audit logs, monitored using Prometheus, Grafana, and CI/CD quality checks.</li>
                        <li>Owned production reliability for a high-traffic personalized analytics product (Intract Rewind 2022), handling traffic spikes using precomputation, caching, and CDN delivery, and leading on-call support and architecture reviews.</li>
                      </>
                    )}
                  </ul>
                </div>
                <div className="experience-item">
                  <img
                    className="experience-logo"
                    src={`${process.env.PUBLIC_URL || ''}/workAssets/syndr.png`}
                    alt="Syndr logo"
                  />
                  <div className="experience-text">
                    <h3>Software Developer</h3>
                    <p><strong>Syndr LLC</strong> &mdash; Delhi, India</p>
                    <span className="date-badge">Oct 2021 &mdash; Nov 2022</span>
                  </div>
                  <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                    {IS_AI_PROFILE ? (
                      <>
                        <li>Built and scaled distributed backend systems using Python and Java with Kubernetes and gRPC microservices, enabling autoscaling and zero-downtime deployments for 50K+ users.</li>
                        <li>Developed event-driven pipelines using queues/pub-sub, WebSocket fan-out, and cloud functions.</li>
                        <li>Set up observability with SLIs and SLOs to handle traffic spikes reliably, contributing to a 40% increase in engagement.</li>
                      </>
                    ) : (
                      <>
                        <li>Architected distributed backend systems in Python and Java, deploying microservices on Kubernetes with gRPC APIs and smart load balancing. Built event-driven automation using cron jobs, WebSockets, and cloud functions, driving 40% engagement lift across 50K+ users.</li>
                        <li>Designed microservices at scale with gRPC contracts, service discovery, HPA autoscaling, and zero-downtime canary/blue-green deploys. Implemented event pipelines with idempotent workers and controlled backpressure for reliable traffic burst handling.</li>
                        <li>Hardened reliability with timeouts, retries, circuit breakers, and graceful degradation. Built end-to-end observability with SLIs/SLOs, structured logs, metrics, tracing, and automated testing, reducing MTTR and enabling fast rollbacks.</li>
                        <li>Provided senior technical leadership through design reviews, RFCs, and mentoring. Partnered with Product, Infra, and Security to deliver compliant, cost-aware releases.</li>
                      </>
                    )}
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
                    <span className="date-badge">Jun 2019 &mdash; Oct 2021</span>
                  </div>
                  <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                    <li>Enhanced low-latency trading systems by evolving a TCP-based recovery protocol in C++, reducing master-slave sync time by 89% and improving uptime by 20+ minutes per session.</li>
                    <li>Built an automated Linux benchmarking tool with multithreading for parallel parsing, reducing release validation and manual analysis time by 80%.</li>
                    <li>Delivered 100+ CI/CD releases and automated deployment pipelines for global banks, cutting incident response time by 60%.</li>
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
                    src={`${process.env.PUBLIC_URL || ''}/workAssets/Driver.png`}
                    alt="Driver Behavior AI Twin logo"
                  />
                  <h3>Driver Behavior AI Twin</h3>
                  <p>Engineered a real-time telemetry pipeline for mobile sensor streams and anomaly detection, and built a personalized AI Twin to learn behavioral baselines and generate adaptive safety insights.</p>
                  <div className="tech-stack">
                    <span className="tech-tag">Python</span>
                    <span className="tech-tag">Streaming</span>
                    <span className="tech-tag">ML</span>
                    <span className="tech-tag">Real-time</span>
                    <span className="tech-tag">Analytics</span>
                  </div>
                </div>
                <div className="project-card">
                  <img
                    className="project-logo"
                    src={`${process.env.PUBLIC_URL || ''}/workAssets/Pulss.png`}
                    alt="Pulse project logo"
                  />
                  <h3>Pulse &mdash; AI-Powered Healthcare Platform</h3>
                  <p>LLM-driven clinical workflows for symptom triage, virtual consultations, and medical report analysis, serving 5K+ users with secure HIPAA-compliant RESTful APIs.</p>
                  <div className="tech-stack">
                    <span className="tech-tag">Python</span>
                    <span className="tech-tag">LLMs</span>
                    <span className="tech-tag">LangChain</span>
                    <span className="tech-tag">REST APIs</span>
                    <span className="tech-tag">Healthcare AI</span>
                  </div>
                </div>
                <div className="project-card">
                  <img
                    className="project-logo"
                    src={`${process.env.PUBLIC_URL || ''}/workAssets/ThunderWallet.png`}
                    alt="Thunder Wallet logo"
                  />
                  <h3>Thunder Wallet &mdash; Non-Custodial Payments</h3>
                  <p>Secure multi-rail transactions via modular services and user-controlled key management.</p>
                  <span className="award-badge">🏆 Best UI/UX Award</span>
                  <div className="tech-stack">
                    <span className="tech-tag">Solidity</span>
                    <span className="tech-tag">React</span>
                    <span className="tech-tag">Node.js</span>
                    <span className="tech-tag">Web3.js</span>
                    <span className="tech-tag">TypeScript</span>
                  </div>
                </div>
                <div className="project-card">
                  <img
                    className="project-logo"
                    src={`${process.env.PUBLIC_URL || ''}/workAssets/Acquisense.png`}
                    alt="Acquisense platform logo"
                  />
                  <h3>Acquisense &mdash; AI Deal Intelligence</h3>
                  <p>
                    AI-powered due diligence and deal-sourcing for M&amp;A. Scores opportunities with financial signals and generates explainable risk summaries.
                  </p>
                  <div className="tech-stack">
                    <span className="tech-tag">Python</span>
                    <span className="tech-tag">OpenAI API</span>
                    <span className="tech-tag">FastAPI</span>
                    <span className="tech-tag">React</span>
                    <span className="tech-tag">PostgreSQL</span>
                  </div>
                </div>
                <div className="project-card">
                  <img
                    className="project-logo"
                    src={`${process.env.PUBLIC_URL || ''}/workAssets/benchmark.png`}
                    alt="Benchmarking tool logo"
                  />
                  <h3>Automated Benchmarking Tool</h3>
                  <p>Linux benchmarking tool with multithreaded parallel parsing &mdash; reduced release validation time by 80% for trading systems.</p>
                  <div className="tech-stack">
                    <span className="tech-tag">C++</span>
                    <span className="tech-tag">Python</span>
                    <span className="tech-tag">Linux</span>
                    <span className="tech-tag">Shell</span>
                    <span className="tech-tag">CI/CD</span>
                  </div>
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
                  <h3>Languages</h3>
                  <div className="skill-tags">
                    <span className="skill-tag">Python</span>
                    <span className="skill-tag">Java</span>
                    <span className="skill-tag">C/C++</span>
                    <span className="skill-tag">JavaScript</span>
                    <span className="skill-tag">Go</span>
                    <span className="skill-tag">SQL</span>
                  </div>
                </div>
                <div className="skill-category">
                  <h3>{IS_AI_PROFILE ? 'AI/ML & GenAI' : 'Frameworks & Databases'}</h3>
                  <div className="skill-tags">
                    {IS_AI_PROFILE ? (
                      <>
                        <span className="skill-tag">LLMs</span>
                        <span className="skill-tag">AI Agents</span>
                        <span className="skill-tag">Prompt Engineering</span>
                        <span className="skill-tag">Fine-tuning</span>
                        <span className="skill-tag">Vector Databases</span>
                        <span className="skill-tag">Embeddings</span>
                        <span className="skill-tag">LangChain</span>
                        <span className="skill-tag">LangSmith</span>
                      </>
                    ) : (
                      <>
                        <span className="skill-tag">Spring Boot</span>
                        <span className="skill-tag">Django</span>
                        <span className="skill-tag">GraphQL</span>
                        <span className="skill-tag">PostgreSQL</span>
                        <span className="skill-tag">MySQL</span>
                        <span className="skill-tag">MongoDB</span>
                        <span className="skill-tag">Redis</span>
                        <span className="skill-tag">NoSQL</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="skill-category">
                  <h3>{IS_AI_PROFILE ? 'Cloud & MLOps' : 'AI/ML'}</h3>
                  <div className="skill-tags">
                    {IS_AI_PROFILE ? (
                      <>
                        <span className="skill-tag">AWS</span>
                        <span className="skill-tag">GCP</span>
                        <span className="skill-tag">Azure</span>
                        <span className="skill-tag">Docker</span>
                        <span className="skill-tag">Kubernetes</span>
                        <span className="skill-tag">Terraform</span>
                        <span className="skill-tag">CI/CD</span>
                        <span className="skill-tag">Model Deployment</span>
                        <span className="skill-tag">Monitoring</span>
                        <span className="skill-tag">Model Evaluation</span>
                      </>
                    ) : (
                      <>
                        <span className="skill-tag">LLM Integration</span>
                        <span className="skill-tag">Prompt Engineering</span>
                        <span className="skill-tag">RAG Pipelines</span>
                        <span className="skill-tag">AI Automation</span>
                        <span className="skill-tag">LangChain</span>
                        <span className="skill-tag">Generative AI</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="skill-category">
                  <h3>{IS_AI_PROFILE ? 'Databases' : 'Infrastructure'}</h3>
                  <div className="skill-tags">
                    {IS_AI_PROFILE ? (
                      <>
                        <span className="skill-tag">PostgreSQL</span>
                        <span className="skill-tag">MySQL</span>
                        <span className="skill-tag">MongoDB</span>
                        <span className="skill-tag">Redis</span>
                        <span className="skill-tag">NoSQL</span>
                      </>
                    ) : (
                      <>
                        <span className="skill-tag">Docker</span>
                        <span className="skill-tag">Kubernetes</span>
                        <span className="skill-tag">Terraform</span>
                        <span className="skill-tag">Azure</span>
                        <span className="skill-tag">GCP</span>
                        <span className="skill-tag">AWS S3</span>
                        <span className="skill-tag">Git</span>
                      </>
                    )}
                  </div>
                </div>
                {!IS_AI_PROFILE && (
                <div className="skill-category">
                  <h3>Systems</h3>
                  <div className="skill-tags">
                    <span className="skill-tag">Distributed Systems</span>
                    <span className="skill-tag">Event-Driven Architecture</span>
                    <span className="skill-tag">Concurrency</span>
                    <span className="skill-tag">Microservices</span>
                    <span className="skill-tag">Multithreading</span>
                    <span className="skill-tag">TCP/IP</span>
                  </div>
                </div>
                )}
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
                  <h3>Teaching & Leadership</h3>
                  <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                    <li><a href="https://drive.google.com/file/d/1Cf0A-iSpMMK0S518V2ak0ZTM_G6W3N2M/view" target="_blank" rel="noopener noreferrer" style={{ color: '#ff6b6b', textDecoration: 'underline' }}>Teaching Assistant &mdash; Data Structures &amp; Algorithms</a></li>
                    <li>Vice-president &mdash; Toastmasters International</li>
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
              <div className="contact-available" style={{ marginTop: '12px' }}>
                <span className="contact-available-dot"></span>
                Open to new opportunities
              </div>
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
                  <a href="https://www.linkedin.com/in/ujwlj/" target="_blank" rel="noopener noreferrer">linkedin.com/in/ujwlj</a>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📍</span>
                  <span>West Lafayette, IN &mdash; Open to remote &amp; relocation</span>
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

