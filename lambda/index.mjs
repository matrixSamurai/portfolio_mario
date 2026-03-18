const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const resumeData = {
  about: {
    title: "Software Engineer · Backend & Distributed Systems",
    description: "Software Engineer with experience architecting and scaling distributed systems, real-time data pipelines, and cloud-native backend services on Kubernetes. Proven track record of designing low-latency, high-throughput architectures, owning production reliability, and delivering resilient systems on modern cloud platforms."
  },
  education: [
    {
      degree: "Master of Business and Technology (Awarded Fellowship)",
      school: "Purdue University",
      location: "West Lafayette, IN",
      period: "Dec 2026",
      note: "Teaching Assistant & Python Programming Tutor"
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
      role: "Founder",
      company: "Starportal Software LLP",
      location: "Noida, India",
      period: "Dec 2023 — July 2025",
      highlights: [
        "Led Engineering and Product to build and scale a real-time trading platform to 300K+ MAU using Kafka, Redis, and WebSockets. Owned architecture, SRE, and growth levers including tiered pricing and analytics-driven roadmap, improving activation and retention while keeping acquisition costs low.",
        "Built high-throughput trading stack with Kafka (consumer groups, DLQs, idempotent producers), Redis for ultra-low latency, and WebSockets for bidirectional order flow. Designed resilient services with active-active deployment, circuit breakers, and controlled backpressure for 99.9% uptime.",
        "Implemented end-to-end security including 2FA/TOTP, device binding, short-lived JWTs with RBAC, and audit trails. Delivered predictions market module with signal aggregation, risk limits, and backtesting harness. Scaled Mini App to 300K+ MAU with tiered pricing and data-driven rollouts.",
        "Led cross-functional execution including on-call, mentoring engineers, and driving integrations with 50+ partners while aligning with compliance, finance, and community teams."
      ]
    },
    {
      role: "Senior Software Engineer",
      company: "Intract Software Pvt Ltd",
      location: "Singapore",
      period: "Nov 2022 — Dec 2023",
      highlights: [
        "Led end-to-end architecture of Intract Quest Platform using Node.js and TypeScript, designing policy-based rules engine, fraud controls, and scalable payout workflows backed by PostgreSQL, Redis, and event-driven orchestration.",
        "Built event ingestion pipeline using Kafka/pub-sub, Redis, and worker-based orchestration for reliable, low-latency reward campaigns. Implemented secure payout layer with batched execution, rate limiting, and idempotent workers, supported by Prometheus, Grafana, and CI/CD pipelines.",
        "Shipped Intract Rewind 2022, a Spotify Wrapped–style analytics experience with precomputed cohorts and CDN delivery, optimized for burst traffic, contributing to Product Hunt Launch of the Week recognition.",
        "Drove growth outcomes by integrating with 50+ external teams via REST APIs and webhooks, instrumenting analytics pipelines, and iterating reward mechanics to lift completion and retention while keeping acquisition costs low."
      ]
    },
    {
      role: "Senior Software Developer",
      company: "Syndr LLC",
      location: "Delhi, India",
      period: "Oct 2021 — Nov 2022",
      highlights: [
        "Architected distributed backend systems in Python and Java, deploying microservices on Kubernetes with gRPC APIs and smart load balancing. Built event-driven automation using cron jobs, WebSockets, and cloud functions, driving 40% engagement lift across 50K+ users.",
        "Designed microservices at scale with gRPC contracts, service discovery, HPA autoscaling, and zero-downtime canary/blue-green deploys. Implemented event pipelines with idempotent workers and controlled backpressure for reliable traffic burst handling.",
        "Hardened reliability with timeouts, retries, circuit breakers, and graceful degradation. Built end-to-end observability with SLIs/SLOs, structured logs, metrics, tracing, and automated testing, reducing MTTR and enabling fast rollbacks.",
        "Provided senior technical leadership through design reviews, RFCs, and mentoring. Partnered with Product, Infra, and Security to deliver compliant, cost-aware releases."
      ]
    },
    {
      role: "Software Developer",
      company: "ION Group",
      location: "Noida, India",
      period: "2019 — 2021",
      highlights: [
        "Built and optimized low-latency trading systems in C++, evolving a TCP-based recovery protocol that reduced master-to-replica sync time by 89% and improved trading uptime by 20+ minutes per session for global banks. Delivered 100+ CI/CD releases with automation that cut incident response time by 60%.",
        "Improved TCP recovery and failover with resumable synchronization, sequence gap repair, and congestion/backoff tuning. Optimized critical hot paths using multithreaded I/O, memory management, and batching strategies, stabilizing p99 latency during heavy market bursts.",
        "Delivered 100+ production releases through CI/CD with staged rollouts, automated testing, and one-click rollback. Built incident automation with health checks, alerts, dashboards, and runbooks, reducing MTTR across multiple client environments.",
        "Partnered with client trading desks, operations, and QA teams. Defined SLAs, led code/design reviews, authored technical documentation, and supported on-call responsibilities for consistent, reliable trading sessions."
      ]
    }
  ],
  projects: [
    {
      name: "Pulse — AI-Powered Healthcare Platform (LLM-Driven Clinical Workflows)",
      description: "Architected and built an AI-driven healthcare platform using LLM-based workflows for symptom triage, virtual consultations, and medical report analysis, serving 5K+ users with secure, HIPAA-compliant Restful APIs and inference pipelines.",
      date: "Apr 2025"
    },
    {
      name: "Thunder Wallet — Non-Custodial Payments Infrastructure",
      description: "Enabled secure multi-rail transactions via modular services and user-controlled key management; won Best UI/UX Award.",
      date: "Jan 2022"
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
    languages: ["Python", "Java", "C", "C++", "C#", "JavaScript", "Ruby", "TypeScript", "HTML", "CSS", "Node.js", "SQL", "Kotlin", "Swift", "R", "Golang", "Rust", "PHP", "Shell", "Bash", "GraphQL"],
    frameworks: ["React", "Spring Boot", ".NET", "MVC", "TensorFlow", "PyTorch", "LangChain", "Django"],
    devops: ["Linux", "Git", "Azure", "GCP", "TCP/IP", "DNS", "JIRA", "S3", "API Gateway", "Terraform", "NGINX", "Reverse Proxy", "Load Balancing", "DynamoDB", "Ansible", "Grafana", "ELK Stack", "Serverless Architecture", "Jenkins", "SDLC", "SDK", "Object-Oriented", "Performance Testing"],
    systems: ["MySQL", "MongoDB", "NoSQL", "IAM", "OpenID Connect", "Load Testing", "Event Sourcing", "Computer Science Fundamentals", "Service-Oriented Architecture", "Data Analysis", "System Design", "Design Patterns", "Applied AI", "Machine Learning"],
    essentials: ["Problem Solving", "Analytical Thinking", "Clear Communication", "Attention to Detail", "Critical Thinking", "Agile", "Adaptability", "Collaboration", "Continuous Learning", "Accountability", "Leadership", "Strategic Thinking", "Code Reviews", "Technical Documentation"]
  },
  certifications: [
    "AWS Certified Cloud Practitioner",
    "AWS Certified AI Practitioner",
    "Google Generative AI",
    "ACM ICPC Regional Finalist (2016, 2018)",
    "Teaching Assistant — Programming & DSA",
    "Vice President 2018 — Toastmasters International",
    "Certified Yoga Teacher — Batch 2018"
  ],
  contact: {
    email: "ujjwal451@gmail.com",
    phone: "+1 765-409-4910",
    location: "West Lafayette, IN",
    linkedin: "https://www.linkedin.com/in/ujwlj/"
  }
};

function createSystemPrompt() {
  return `You are Mario, Ujjwal's friendly assistant chatbot. You help visitors learn about Ujjwal's professional background, experience, and skills. Be conversational, helpful, and enthusiastic (like Mario!). Always stay in character as Mario.

Here is Ujjwal's resume information:

ABOUT:
${resumeData.about.title}
${resumeData.about.description}

EDUCATION:
${resumeData.education.map(edu => `• ${edu.degree} - ${edu.school}, ${edu.location} (${edu.period})${edu.note ? ` - ${edu.note}` : ''}`).join('\n')}

WORK EXPERIENCE:
${resumeData.experience.map(exp => {
  return `• ${exp.role} at ${exp.company} (${exp.location}, ${exp.period})\n  Key achievements:\n${exp.highlights.map(h => `  - ${h}`).join('\n')}`;
}).join('\n\n')}

PROJECTS:
${resumeData.projects.map(proj => `• ${proj.name}${proj.date ? ` (${proj.date})` : ''}: ${proj.description}`).join('\n\n')}

SKILLS:
Languages & Frameworks: ${resumeData.skills.languages.join(', ')}
Frameworks: ${resumeData.skills.frameworks.join(', ')}
DevOps: ${resumeData.skills.devops.join(', ')}
Systems & Architecture: ${resumeData.skills.systems.join(', ')}
Essentials: ${resumeData.skills.essentials.join(', ')}

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
}

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

export const handler = async (event) => {
  if (event.requestContext?.http?.method === 'OPTIONS' || event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: CORS_HEADERS, body: '' };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({ error: 'messages array is required' }),
      };
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: createSystemPrompt() },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        statusCode: response.status,
        headers: CORS_HEADERS,
        body: JSON.stringify({ error: errorData.error?.message || `OpenAI API error: ${response.status}` }),
      };
    }

    const data = await response.json();
    const reply = data.choices[0]?.message?.content || "Sorry, I couldn't generate a response.";

    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({ reply }),
    };
  } catch (error) {
    console.error('Lambda error:', error);
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
