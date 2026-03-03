// ============================================================
// MODEL LAYER — Pure data, no DOM, no logic
// ============================================================

export const profileData = {
  name: "Akash P",
  firstName: "AKASH",
  roles: ["Python Developer", "Backend Engineer", "API Architect"],
  tagline:
    "I build scalable backend systems, RESTful APIs, and enterprise solutions — and I love solving real-world problems with code.",
  bio: "Aspiring Python Developer with hands-on experience in building scalable REST APIs with FastAPI and Flask, implementing JWT-based authentication, and designing database-driven enterprise systems. Currently working on SAP-integrated backend services with Clean Architecture principles, Docker-based deployment, and workflow automation.",
  avatar: "assets/images/dp.png",
  devicesIllustration: "assets/images/devices.svg",
  resumeHighlights: [
    "Strong foundation in Git workflows, API development, debugging, and team collaboration",
    "Experience with Clean Architecture, Docker-based deployment, and workflow automation",
  ],
};

export const skillsData = [
  {
    id: "backend",
    title: "Backend Development",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/><polyline points="7 8 10 11 7 14"/><line x1="12" y1="14" x2="16" y2="14"/></svg>`,
    description:
      "I build robust, scalable backend services with clean architecture and production-ready APIs.",
    enjoyTitle: "What I build:",
    enjoyList: "REST APIs, Auth Systems, Microservices, Automation",
    toolsTitle: "Tech Stack:",
    tools: ["Python", "FastAPI", "Flask", "SQLAlchemy", "Pydantic", "JWT"],
  },
  {
    id: "database",
    title: "Databases & DevOps",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`,
    description:
      "I design efficient database schemas and ship containerized services with CI/CD best practices.",
    enjoyTitle: "Databases:",
    enjoyList: "PostgreSQL, MongoDB, SQL",
    toolsTitle: "DevOps Tools:",
    tools: ["Docker", "Docker Compose", "Git", "GitHub Workflows", "Postman", "Linux"],
  },
  {
    id: "frontend",
    title: "Frontend & Data",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    description:
      "I also work with frontend technologies and data libraries for full-stack and analytics projects.",
    enjoyTitle: "Frontend:",
    enjoyList: "React.js, JavaScript, HTML, CSS",
    toolsTitle: "Data & Analytics:",
    tools: ["Pandas", "NumPy", "Python Scripting", "Automation"],
  },
];

export const experienceData = [
  {
    id: "exp-1",
    role: "Software Intern",
    subtitle: "Frontend + Python Backend Exposure",
    company: "MethodHub Software Pvt. Ltd.",
    location: "Chennai, India",
    period: "Nov 2025 – Present",
    highlights: [
      "Converted Figma designs into responsive React.js screens for internal recruitment workflow modules.",
      "Implemented login/logout flow and prepared API integration structure for backend connectivity.",
      "Worked on extending Apache Superset by developing and testing custom plugin components and dashboard integrations.",
      "Assisted in Superset feature exploration, including KPI chart configurations, role-based access, and performance monitoring utilities.",
      "Actively transitioning into backend development responsibilities aligned with Python-based services.",
    ],
  },
  {
    id: "exp-2",
    role: "Python Developer Intern",
    subtitle: "",
    company: "Leister Technologies India Pvt. Ltd.",
    location: "Chennai, India",
    period: "Jun 2025 – Sep 2025",
    highlights: [
      "Developed HRMS backend services using FastAPI with Clean Architecture for modular and testable codebases.",
      "Designed secure JWT authentication and role-based access control for enterprise workflows.",
      "Built RESTful APIs for employee, document, and HR process automation with structured validation using Pydantic.",
      "Automated HR document generation (offer letters, payslips), reducing manual workload by 40%.",
      "Containerized backend services using Docker and Docker Compose for deployment consistency.",
      "Supported SAP-integrated Flutter application testing including API validation, UAT simulation, and bug reporting.",
    ],
  },
];

export const projectsData = [
  {
    id: "proj-1",
    title: "College Project Hub",
    category: "FastAPI + PostgreSQL + Flutter",
    period: "Dec 2024 – May 2025",
    description:
      "Built scalable backend using FastAPI, SQLAlchemy, Alembic migrations, and PostgreSQL. Implemented async REST APIs with JWT authentication and structured role-based access. Enabled student collaboration via secure chat and file upload modules.",
    link: "#",
    icon: "assets/images/project-uiux.png",
    color: "#6c63ff",
  },
  {
    id: "proj-2",
    title: "CBCS Enrollment System",
    category: "React.js + Node.js + MongoDB",
    period: "Oct 2023 – Mar 2024",
    description:
      "Developed elective enrollment portal used by 50+ students with role-based access workflows. Generated reports and analytics using Python Pandas, improving administrative processing efficiency.",
    link: "#",
    icon: "assets/images/project-navi.png",
    color: "#00d4ff",
  },
  {
    id: "proj-3",
    title: "Self-Learning Python Projects",
    category: "Flask + FastAPI + Automation",
    period: "Jan 2025 – Present",
    description:
      "Built mini backend applications using Flask and FastAPI to practice CRUD APIs and modular service design. Developed automation scripts such as file organizers, data extractors, and API-based utilities.",
    link: "https://github.com/Akashapp-dev",
    icon: "assets/images/project-webdev.png",
    color: "#ff6b6b",
  },
];

export const certificationsData = [
  {
    id: "cert-1",
    title: "Data Analysis with Python",
    issuer: "IBM Professional Certificate",
    description: "IBM certified professional course on data analysis using Python",
    image: "assets/images/cert-web-development.jpeg",
  },
  {
    id: "cert-2",
    title: "Python for Data Science",
    issuer: "IBM Professional Certificate",
    description: "IBM certified professional course on Python for Data Science",
    image: "assets/images/cert-python-datascience.jpeg",
  },
  {
    id: "cert-3",
    title: "OCI Foundations Associate",
    issuer: "Oracle",
    description: "Oracle Cloud Infrastructure Foundations Associate Certification",
    image: "assets/images/cert-google-ads.jpeg",
  },
  {
    id: "cert-4",
    title: "Google Play Academy",
    issuer: "Google",
    description: "Google Play Academy Certified Developer",
    image: "assets/images/cert-web-development.jpeg",
  },
];

export const educationData = [
  {
    id: "edu-1",
    degree: "B.Tech in Information Technology",
    institution: "Sathyabama Institute of Science and Technology",
    location: "Chennai, India",
    period: "Jun 2021 – Jun 2025",
    grade: "CGPA: 7.48",
  },
  {
    id: "edu-2",
    degree: "Senior Secondary (HSC) — CBSE",
    institution: "Oxaliss International School",
    location: "Kallakurichi, India",
    period: "Jun 2020 – Jun 2021",
    grade: "71.5%",
  },
];

export const socialLinks = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/akashpoomalai",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`,
  },
  {
    name: "GitHub",
    url: "https://github.com/Akashapp-dev",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`,
  },
  {
    name: "Email",
    url: "mailto:akashbtechit@gmail.com",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
  },
  {
    name: "Phone",
    url: "tel:+919363003443",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  },
];

export const contactInfo = {
  location: "Chennai, Tamil Nadu",
  address: "India",
  phone: "+91 9363003443",
  phoneHours: "Mon to Fri 9am to 6pm",
  email: "akashbtechit@gmail.com",
  formAction: "https://formsubmit.co/ajax/akashbtechit@gmail.com",
};

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certs" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];
