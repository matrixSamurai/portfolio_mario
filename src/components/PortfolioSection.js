import React from 'react';
import './PortfolioSection.css';

const PortfolioSection = ({ section, onClose }) => {
  const getSectionData = () => {
    switch (section) {
      case 'about':
        return {
          title: 'About',
          icon: '👤',
          content: (
            <div className="section-content">
              <h2>About</h2>
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <p style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '20px', lineHeight: '1.6' }}>
                  Software Engineer from West Lafayette, USA
                </p>
                <p style={{ fontSize: '14px', lineHeight: '1.8', marginBottom: '15px' }}>
                  6+ years building distributed systems and cloud-native applications. I specialize in low-latency, high-throughput backend services delivering platforms used by 2M+ users with 99.9% reliability ⚡
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
              <h2>Education</h2>
              <div className="education-list">
                <div className="education-item">
                  <h3>Master of Business and Technology</h3>
                  <p><strong>Purdue University, Daniels School of Business</strong></p>
                  <p>West Lafayette, IN</p>
                  <p>December 2026 (Awarded Fellowship)</p>
                </div>
                <div className="education-item">
                  <h3>Bachelor of Technology in Information Technology</h3>
                  <p><strong>Guru Gobind Singh Indraprastha University</strong></p>
                  <p>Delhi, India</p>
                  <p>June 2015 - May 2019 | GPA: 3.57</p>
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
              <h2>Work Experience</h2>
              <div className="experience-list">
                <div className="experience-item">
                  <h3>Python Programming Tutor</h3>
                  <p><strong>Purdue University</strong> | West Lafayette, IN</p>
                  <p>Oct 2025 - Present</p>
                  <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                    <li>Conduct weekly tutoring sessions for students, reinforcing core Python programming concepts including data structures, algorithms, and object-oriented design.</li>
                    <li>Guide students in debugging, optimizing code, and implementing clean, modular solutions aligned with best practices in software development.</li>
                  </ul>
                </div>
                <div className="experience-item">
                  <h3>Engineering Lead (Founder Role)</h3>
                  <p><strong>Starportal Software LLP</strong> | Noida, India</p>
                  <p>Dec 2023 - July 2025</p>
                  <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                    <li>Designed and implemented distributed transaction infrastructure across 10+ networks, leveraging JavaScript for high-performance messaging and high-throughput APIs that processed 1M+ msgs/day.</li>
                    <li>Achieved sub-100ms latency and 4× throughput efficiency by engineering a WebSocket-based streaming layer for high-frequency trading data, enabling traders to execute orders faster and improve profitability.</li>
                    <li>Implemented secure authentication and platform hardening, 2FA/TOTP, short-lived JWTs with RBAC, encrypted secrets, audit trails, and rate limits protecting trading actions and APIs end-to-end.</li>
                    <li>Architected cloud-native microservices on AWS, scaling to 250K+ and 50K+ MAU users, with real-time data pipelines.</li>
                  </ul>
                </div>
                <div className="experience-item">
                  <h3>Engineering Manager</h3>
                  <p><strong>Intract Software Pvt Ltd</strong> | Singapore</p>
                  <p>Nov 2022 - Dec 2023</p>
                  <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                    <li>Worked cross-functionally with B2B partners and product managers to design scalable integration pipelines.</li>
                    <li>Engineered scalable onboarding flows and integration pipelines for 50+ apps as B2B partner, enabling a 6-week campaign that onboarded 1M+ users and drove $3M+ in quarterly revenue through fault-tolerant pipelines.</li>
                    <li>Built a rewards engine with checks, fraud prevention, rate limits, and auditable payouts to drive quest retention.</li>
                  </ul>
                </div>
                <div className="experience-item">
                  <h3>Senior Software Developer</h3>
                  <p><strong>Syndr LLC</strong> | Delhi, India</p>
                  <p>Oct 2021 - Nov 2022</p>
                  <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                    <li>Architected distributed backend systems in Python and Java, implementing service orchestration with Kubernetes, gRPC-based inter-service communication, and load balancing to support large concurrent users with high availability.</li>
                    <li>Implemented event-driven automation services using cron jobs, WebSockets, and cloud functions, engaging 50K+ users and boosting participation by 52%, while documenting API specs/design decisions.</li>
                  </ul>
                </div>
                <div className="experience-item">
                  <h3>Software Developer</h3>
                  <p><strong>Ion Group</strong> | Noida, India</p>
                  <p>June 2019 - Oct 2021</p>
                  <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                    <li>Enhanced financial services trading systems for global banks, driving measurable industry impact.</li>
                    <li>Built an automated Linux benchmarking tool to compare and validate new system releases against previous versions by feeding high-volume log data, leveraging multithreading for parallel parsing, reducing manual analysis time by 80%.</li>
                    <li>Delivered 100+ CI/CD releases and automated pipelines for global banks, cutting incident response time by 60%.</li>
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
              <h2>Projects</h2>
              <div className="project-grid">
                <div className="project-card">
                  <h3>Distributed Trading Infrastructure</h3>
                  <p>Built high-performance messaging system processing 1M+ messages/day with sub-100ms latency using WebSocket streaming for real-time trading data</p>
                </div>
                <div className="project-card">
                  <h3>Cloud-Native Microservices</h3>
                  <p>Architected scalable AWS microservices supporting 250K+ users with real-time data pipelines and distributed transaction infrastructure</p>
                </div>
                <div className="project-card">
                  <h3>B2B Integration Platform</h3>
                  <p>Engineered onboarding flows for 50+ apps, enabling 1M+ user onboarding in 6 weeks and driving $3M+ quarterly revenue</p>
                </div>
                <div className="project-card">
                  <h3>Automated Benchmarking Tool</h3>
                  <p>Developed Linux benchmarking system with multithreaded parallel parsing, reducing manual analysis time by 80% for financial trading systems</p>
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
              <h2>Skills</h2>
              <div className="skills-container">
                <div className="skill-category">
                  <h3>Programming Languages</h3>
                  <div className="skill-tags">
                    <span className="skill-tag">Python</span>
                    <span className="skill-tag">Java</span>
                    <span className="skill-tag">C/C++</span>
                    <span className="skill-tag">JavaScript</span>
                    <span className="skill-tag">TypeScript</span>
                    <span className="skill-tag">Go</span>
                    <span className="skill-tag">Rust</span>
                    <span className="skill-tag">Bash</span>
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
              <h2>Contact</h2>
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
        <div className="panel-body">
          {sectionData.content}
        </div>
      </div>
    </div>
  );
};

export default PortfolioSection;

