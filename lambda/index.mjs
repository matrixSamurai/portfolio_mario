import { ACTIVE_PROFILE } from './profileConfig.mjs';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const resumeData = {
  about: {
    title: "AI Engineer",
    description: "AI Engineer experienced in intelligent systems, AI agents, and scalable ML pipelines for real-world applications. Skilled with LLMs, LangChain, and LangSmith, focused on production readiness and performance."
  },
  education: [
    {
      degree: "Master of Business and Technology (AI Innovations Fellowship) (GPA: 3.71)",
      school: "Purdue University",
      location: "West Lafayette, IN",
      period: "Dec 2026",
      note: "Graduate Teaching Assistant (Python Programming, Data Visualization); Global Student Ambassador"
    },
    {
      degree: "Bachelor of Technology in Information Technology",
      school: "Guru Gobind Singh Indraprastha University",
      location: "Delhi, India",
      period: "2015 — 2019",
      note: "GPA: 3.53; Founding Head, AI & Blockchain Club"
    }
  ],
  experience: [
    {
      role: "AI Engineer",
      company: "Starportal Software LLP",
      location: "Noida, India",
      period: "Dec 2023 — July 2025",
      highlights: [
        "Built data ingestion pipelines for structured and unstructured sources, transforming raw documents into clean, queryable formats for downstream analytics and RAG-based workflows.",
        "Designed retrieval pipelines over large datasets using vector embeddings, optimized indexing, chunking, and ranking strategies to improve search relevance.",
        "Implemented LLM-powered utilities using LangChain for document querying and summarization, and improved response quality with structured evaluation and LangSmith tracing.",
        "Implemented Responsible AI safeguards including input filtering, PII redaction, prompt constraints, and output validation."
      ]
    },
    {
      role: "Software Engineer",
      company: "Intract Software Pvt Ltd",
      location: "Singapore",
      period: "Nov 2022 — Dec 2023",
      highlights: [
        "Built a large-scale fault-tolerant backend processing millions of events daily using Node.js and TypeScript, with policy rules, eligibility checks, fraud controls, and payout workflows powered by PostgreSQL, Redis, and Kafka/pub-sub.",
        "Developed low-latency data pipelines with event ingestion, caching, idempotent workers, API rate limiting, and audit logs, monitored via Prometheus, Grafana, and CI/CD quality checks.",
        "Owned production reliability for a high-traffic personalized analytics product, handling burst traffic through precomputation, caching, CDN delivery, and on-call support."
      ]
    },
    {
      role: "Software Developer",
      company: "Syndr LLC",
      location: "Delhi, India",
      period: "Oct 2021 — Nov 2022",
      highlights: [
        "Built and scaled distributed backend systems in Python and Java using Kubernetes and gRPC microservices for 50K+ users.",
        "Enabled autoscaling and zero-downtime deployments with resilient production reliability.",
        "Developed event-driven pipelines using queues/pub-sub, WebSocket fan-out, and cloud functions.",
        "Set up observability with SLIs/SLOs to handle traffic spikes reliably, contributing to a 40% engagement increase."
      ]
    },
    {
      role: "Software Developer",
      company: "ION Group",
      location: "Noida, India",
      period: "June 2019 — Oct 2021",
      highlights: [
        "Enhanced low-latency trading systems by evolving a TCP-based recovery protocol in C++, reducing master-slave sync time by 89% and improving uptime by 20+ minutes per session.",
        "Built an automated Linux benchmarking tool for high-volume logs using multithreading for parallel parsing, reducing manual analysis time by 80%.",
        "Delivered 100+ CI/CD releases and automated deployment pipelines for global banks, cutting incident response time by 60%."
      ]
    }
  ],
  projects: [
    {
      name: "Driver Behavior AI Twin — Real-Time Behavioral Modeling System",
      description: "Engineered a real-time telemetry pipeline for mobile sensor streams, detected driving anomalies, and built a personalized AI Twin that learns behavioral baselines and generates adaptive safety insights.",
      date: "Jan 2026"
    },
    {
      name: "Pulse — AI-Powered Healthcare Platform (LLM-Driven Clinical Workflows)",
      description: "Engineered an AI-driven healthcare platform for symptom triage, virtual consultations, and medical report analysis, serving 5K+ users with secure HIPAA-compliant RESTful APIs and inference pipelines.",
      date: "Apr 2025"
    }
  ],
  skills: {
    languages: ["Python", "Go", "Java", "C/C++", "JavaScript", "SQL"],
    frameworks: ["LangChain", "LangSmith", "Prompt Engineering", "Fine-tuning", "Vector Databases", "Embeddings"],
    devops: ["AWS", "GCP", "Azure", "Docker", "Kubernetes", "Terraform", "CI/CD", "Model Deployment", "Monitoring", "Model Evaluation"],
    systems: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "NoSQL", "Distributed Systems", "Microservices", "Event-Driven Architecture", "Concurrency", "Multithreading", "System Design", "TCP/IP"],
    essentials: ["Autonomous Agents", "RAG Systems", "Real-time AI Solutions"]
  },
  certifications: [
    "AWS Certified Cloud Practitioner",
    "AWS Certified AI Practitioner",
    "Teaching Assistant — Data Structures & Algorithms",
    "ACM ICPC Regional Finalist (2016, 2018)",
    "Vice-President — Toastmasters International",
    "Certified Yoga Teacher — Batch 2018"
  ],
  contact: {
    email: "ujjwal451@gmail.com",
    phone: "+1 765-409-4910",
    location: "West Lafayette, IN",
    linkedin: "https://www.linkedin.com/in/ujwlj/"
  }
};

const softwareResumeData = {
  about: {
    title: "Software Engineer · Backend & Distributed Systems",
    description: "Software Engineer with experience architecting and scaling distributed systems, real-time data pipelines, and cloud-native backend services on Kubernetes."
  },
  education: resumeData.education,
  experience: [
    {
      role: "Founder",
      company: "Starportal Software LLP",
      location: "Noida, India",
      period: "Dec 2023 — July 2025",
      highlights: [
        "Led engineering and product to build and scale a real-time trading platform to 300K+ MAU using Kafka, Redis, and WebSockets.",
        "Built high-throughput trading stack with Kafka, Redis, and WebSockets with resilient active-active service design.",
        "Implemented end-to-end security including 2FA/TOTP, JWT with RBAC, and audit trails.",
        "Led cross-functional execution, on-call, mentoring, and 50+ partner integrations."
      ]
    },
    {
      role: "Senior Software Engineer",
      company: "Intract Software Pvt Ltd",
      location: "Singapore",
      period: "Nov 2022 — Dec 2023",
      highlights: [
        "Led end-to-end architecture of Intract Quest Platform using Node.js and TypeScript.",
        "Built event ingestion and payout orchestration with Kafka/pub-sub, Redis, idempotent workers, and rate limiting.",
        "Shipped Intract Rewind 2022 with precomputed cohorts and CDN delivery for burst traffic.",
        "Integrated with 50+ external teams via REST APIs and webhooks."
      ]
    }
  ],
  projects: [
    {
      name: "Pulse — AI-Powered Healthcare Platform (LLM-Driven Clinical Workflows)",
      description: "AI-driven healthcare platform for triage, virtual consultations, and medical report analysis.",
      date: "Apr 2025"
    },
    {
      name: "Thunder Wallet — Non-Custodial Payments Infrastructure",
      description: "Secure multi-rail transactions via modular services and user-controlled key management.",
      date: "Jan 2022"
    },
    {
      name: "Acquisense — AI Deal Intelligence Platform",
      description: "AI-powered due diligence and deal-sourcing with explainable risk summaries."
    },
    {
      name: "Automated Benchmarking Tool",
      description: "Linux benchmarking tool with multithreaded parsing that reduced validation time by 80%."
    }
  ],
  skills: {
    languages: ["Python", "Java", "C/C++", "JavaScript", "TypeScript", "Node.js", "SQL"],
    frameworks: ["React", "Spring Boot", "Django", "LangChain"],
    devops: ["Linux", "AWS", "GCP", "Kubernetes", "Terraform", "Redis", "Grafana"],
    systems: ["Distributed Systems", "Microservices", "Event-Driven Architecture", "System Design", "TCP/IP"],
    essentials: ["Problem Solving", "Leadership", "Collaboration"]
  },
  certifications: resumeData.certifications,
  contact: resumeData.contact
};

const activeResume = ACTIVE_PROFILE === 'ai' ? resumeData : softwareResumeData;

function createSystemPrompt() {
  return `You are Mario, Ujjwal's friendly assistant chatbot. You help visitors learn about Ujjwal's professional background, experience, and skills. Be conversational, helpful, and enthusiastic (like Mario!). Always stay in character as Mario.

Here is Ujjwal's resume information:

ABOUT:
${activeResume.about.title}
${activeResume.about.description}

EDUCATION:
${activeResume.education.map(edu => `• ${edu.degree} - ${edu.school}, ${edu.location} (${edu.period})${edu.note ? ` - ${edu.note}` : ''}`).join('\n')}

WORK EXPERIENCE:
${activeResume.experience.map(exp => {
  return `• ${exp.role} at ${exp.company} (${exp.location}, ${exp.period})\n  Key achievements:\n${exp.highlights.map(h => `  - ${h}`).join('\n')}`;
}).join('\n\n')}

PROJECTS:
${activeResume.projects.map(proj => `• ${proj.name}${proj.date ? ` (${proj.date})` : ''}: ${proj.description}`).join('\n\n')}

SKILLS:
Languages & Frameworks: ${activeResume.skills.languages.join(', ')}
Frameworks: ${activeResume.skills.frameworks.join(', ')}
DevOps: ${activeResume.skills.devops.join(', ')}
Systems & Architecture: ${activeResume.skills.systems.join(', ')}
Essentials: ${activeResume.skills.essentials.join(', ')}

CERTIFICATIONS & HONORS:
${activeResume.certifications.map(c => `• ${c}`).join('\n')}

CONTACT INFORMATION:
Email: ${activeResume.contact.email}
Phone: ${activeResume.contact.phone}
Location: ${activeResume.contact.location}
LinkedIn: ${activeResume.contact.linkedin}

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
