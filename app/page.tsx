"use client";

import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  BookOpen,
  Briefcase,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Code2,
  Compass,
  Cpu,
  Database,
  ExternalLink,
  FileText,
  GraduationCap,
  Home as HomeIcon,
  Languages,
  Layers3,
  Mail,
  MapPin,
  Menu,
  Pause,
  Phone,
  Play,
  Rocket,
  Send,
  Server,
  Sparkles,
  Terminal,
  Wrench,
  X,
} from "lucide-react";
import {
  type ComponentType,
  type CSSProperties,
  type ReactNode,
  type SVGProps,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

/* =========================================================================
   TYPES & DATA MODELS
   ========================================================================= */

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;
type SkillLevel = "Core" | "Working" | "Learning" | "Basic";

type NavItem = {
  label: string;
  href: `#${string}`;
  id: string;
  icon: IconComponent;
};

type ProjectLink = {
  label: string;
  href: string;
};

type Project = {
  name: string;
  slug: string;
  role?: string;
  category: string;
  description: string;
  accent: string;
  visual: "commerce" | "product" | "extension";
  image: string;
  fallbackImage?: string;
  badge: string;
  statBadge: string;
  technologies: string[];
  highlights: string[];
  repositoryLinks: ProjectLink[];
  liveDemo?: string;
  caseStudy: Array<{
    title: string;
    body: string;
  }>;
};

type SkillGroup = {
  title: string;
  icon: IconComponent;
  description: string;
  skills: Array<{
    name: string;
    level: SkillLevel;
  }>;
};

type CursorSpark = {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  driftX: number;
  driftY: number;
};

/* =========================================================================
   CINEMATIC BACKGROUND SLIDESHOW ASSETS
   5 Ultra-High-Definition Developer Workspaces & Coding Screens
   ========================================================================= */

const backgroundSlides = [
  {
    url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=2560&q=85",
    alt: "Developer Code Editor on Dual Displays",
    caption: "Full-Stack Code Architecture",
  },
  {
    url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=2560&q=85",
    alt: "Clean Laptop Workspace with Code Matrix",
    caption: "Modern Frontend Engineering",
  },
  {
    url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=2560&q=85",
    alt: "Cyberpunk Developer Setup at Night",
    caption: "High-Performance Web Workflows",
  },
  {
    url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=2560&q=85",
    alt: "Glowing Cyber Matrix Digital Code Streams",
    caption: "REST APIs & Data Pipelines",
  },
  {
    url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=2560&q=85",
    alt: "Modern Developer Desk with Live Code View",
    caption: "Clean Component Architecture",
  },
];

/* =========================================================================
   PORTFOLIO CONTENT & IDENTITY (STRICTLY FULL-STACK WEB DEVELOPER)
   ========================================================================= */

const personal = {
  name: "MD. Asif Rayhan Joy",
  shortName: "Asif Rayhan",
  title: "Full-Stack Web Developer",
  headline:
    "Full-Stack Web Developer | Next.js · React.js · TypeScript · Node.js · Plasmo",
  subtitle:
    "Full-Stack Web Developer specializing in Next.js, React, TypeScript, Node.js, and Chrome WebExtensions (Plasmo) with PostgreSQL and MongoDB.",
  bio: "Full-Stack Web Developer with 3 years of professional experience delivering scalable full-stack web platforms and high-performance browser extensions with modern frontend architectures, robust backend systems, and clean code.",
  location: "Dhaka, Bangladesh",
  email: "mdasifrayhanjoy2@gmail.com",
  phone: "01302271472",
  github: "https://github.com/asifrayhanjoy",
  linkedin: "https://www.linkedin.com/in/md-asif-rayhan-joy-4177372a4/",
  portfolio: "https://portfolio-neon-omega-77.vercel.app/",
};

const navItems: NavItem[] = [
  { label: "Home", href: "#home", id: "home", icon: HomeIcon },
  { label: "Projects", href: "#projects", id: "projects", icon: Code2 },
  { label: "Tech Stack", href: "#skills", id: "skills", icon: Layers3 },
  { label: "Experience", href: "#experience", id: "experience", icon: Briefcase },
  { label: "About", href: "#about", id: "about", icon: BookOpen },
  { label: "Process", href: "#process", id: "process", icon: Rocket },
  { label: "Contact", href: "#contact", id: "contact", icon: Mail },
];

const heroStats = [
  { value: "3Y+", label: "Web Development", sub: "Production web applications" },
  { value: "15+", label: "Full-Stack Modules", sub: "APIs, UIs, DB schemas" },
  { value: "AI", label: "Accelerated Workflows", sub: "Cursor, Claude Code, RAG" },
  { value: "BD", label: "Dhaka, Bangladesh", sub: "Available for global remote" },
];

const coreStack = [
  { name: "Next.js 15", color: "#38bdf8" },
  { name: "React 19", color: "#61dafb" },
  { name: "TypeScript", color: "#818cf8" },
  { name: "Node.js", color: "#4ade80" },
  { name: "NestJS", color: "#ea284e" },
  { name: "Go (Golang)", color: "#00add8" },
  { name: "Plasmo", color: "#f43f5e" },
  { name: "Manifest V3", color: "#fb923c" },
  { name: "PostgreSQL", color: "#60a5fa" },
  { name: "MongoDB", color: "#34d399" },
  { name: "Prisma ORM", color: "#c084fc" },
  { name: "Redis", color: "#ef4444" },
  { name: "Tailwind CSS", color: "#22d3ee" },
  { name: "TanStack Query", color: "#f97316" },
  { name: "Zustand", color: "#fbbf24" },
  { name: "shadcn/ui", color: "#f472b6" },
  { name: "Docker", color: "#38bdf8" },
  { name: "Vitest", color: "#a3e635" },
];

const cursorSparkColors = ["#00f5a0", "#00d9f5", "#38bdf8", "#818cf8", "#f472b6"];

const capabilityHighlights = [
  {
    title: "System Architecture & Delivery",
    body: "Directing sprint delivery, technical code reviews, and architecture at DigiVibe—aligning milestones and keeping releases on schedule.",
  },
  {
    title: "Frontend Architecture & Browser Extensions",
    body: "Deep expertise in Next.js, React, TypeScript, micro-interactions, and Plasmo framework for high-performance Chrome Manifest V3 browser extensions.",
  },
  {
    title: "Backend & Hybrid Database Architecture",
    body: "Deep expertise building robust REST APIs with Node.js and Express.js, JWT/RBAC security, and hybrid database design (PostgreSQL via Prisma ORM & MongoDB).",
  },
];

type ExperienceEntry = {
  role: string;
  type: string;
  duration: string;
  location: string;
  bullets: string[];
};

const experiences: ExperienceEntry[] = [
  {
    role: "Team Lead & Full-Stack Developer",
    type: "DigiVibe (Full-time / Web Platform Engineering)",
    duration: "Jun 2025 – Present",
    location: "Dhaka, Bangladesh (Remote)",
    bullets: [
      "Led cross-functional engineering sprints, daily standups, code reviews, and deployment pipelines.",
      "Architected 3 isolated sub-systems (Customer, Merchant, Admin Portals) with JWT token rotation and fine-grained RBAC.",
      "Designed hybrid transactional schemas using PostgreSQL (Prisma) and document stores in MongoDB.",
      "Automated background tasks with Python and low-latency session caching via Redis.",
    ],
  },
  {
    role: "Full-Stack Software Engineer",
    type: "Full-time / Web & Extension Development",
    duration: "Oct 2023 – Jun 2025 (~1.5+ Years)",
    location: "Dhaka, Bangladesh (Remote)",
    bullets: [
      "Delivered scalable production web applications, interactive user dashboards, and responsive frontends with Next.js, React, and TypeScript.",
      "Developed high-fidelity technical assessment prototypes, including Bytespace with hybrid database deployments.",
      "Engineered real-time rental platforms such as Next Thekana with WebSocket feeds for live listing updates and interactive map components.",
      "Built high-utility web tools including Rentiful rental manager and Invoice Generator with complex dynamic calculation workflows.",
    ],
  },
];

/* =========================================================================
   PROJECT SHOWCASE WITH REAL HIGH-RES VISUAL MOCKUPS
   ========================================================================= */

const projects: Project[] = [
  {
    name: "DigiVibe — Digital Subscription Platform",
    slug: "digivibe",
    role: "Team Lead & Full-Stack Developer (Jun 2025 – Present)",
    category: "Full-Stack & E-Commerce Platform",
    accent: "#00f5a0",
    visual: "commerce",
    // 📸 REAL SCREENSHOT ASSET: Drop your screenshot into public/assets/digivibe-preview.png
    // image: "/assets/digivibe-preview.png" for https://digi-vibe.vercel.app/en
    image: "/assets/digivibe-preview.png",
    fallbackImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=85",
    badge: "Production Live",
    statBadge: "Multi-Portal SaaS",
    description:
      "A multi-portal real-time e-commerce subscription platform for digital tools, AI services (ChatGPT, YouTube Premium, VPNs), and IT utility products.",
    technologies: [
      "Next.js 15",
      "React",
      "TypeScript",
      "Node.js",
      "Express.js",
      "NestJS",
      "Python",
      "Go",
      "PostgreSQL (Prisma)",
      "MongoDB",
      "Redis",
      "SQLite",
      "MySQL",
      "Tailwind CSS",
    ],
    highlights: [
      "Led cross-functional engineering sprints, daily standups, code reviews, and deployment pipelines",
      "Architected 3 isolated sub-systems (Customer, Merchant, Admin Portals) with JWT token rotation and fine-grained RBAC",
      "Designed hybrid transactional schemas using PostgreSQL (Prisma) and document stores in MongoDB",
      "Automated background tasks with Python and low-latency session caching via Redis",
    ],
    repositoryLinks: [
      {
        label: "GitHub",
        href: "https://github.com/asifrayhanjoy",
      },
    ],
    liveDemo: "https://digi-vibe.vercel.app/en",
    caseStudy: [
      {
        title: "Scope",
        body: "Led the architecture and development of DigiVibe, a multi-portal subscription platform for digital products and AI utilities.",
      },
      {
        title: "System Shape",
        body: "Next.js 15 & React frontend with Node.js/Express and NestJS REST APIs, Python task automation scripts, and hybrid PostgreSQL (Prisma ORM) & MongoDB database layers.",
      },
      {
        title: "Engineering Focus",
        body: "Multi-portal state management, JWT token rotation, RBAC security, Redis caching, and hybrid database schema design.",
      },
    ],
  },
  {
    name: "YouTube Cleaner — Web Dashboard & Extension",
    slug: "youtube-cleaner",
    role: "Extension Developer & Frontend Engineer",
    category: "Browser Systems & Tooling",
    accent: "#f43f5e",
    visual: "extension",
    // 📸 AUTHENTIC OFFICIAL YOUTUBE BRAND BADGE (Icon + Wordmark + Extension Tag)
    image: "/assets/youtube-brand-badge.svg",
    fallbackImage: "/assets/youtube-brand-badge.svg",
    badge: "Manifest V3 Active",
    statBadge: "0ms DOM Latency",
    description:
      "A Manifest V3 Chrome extension and web companion dashboard built with Plasmo and TypeScript for real-time SPA DOM mutation cleanup, ad suppression, and auto-skipping promotional segments.",
    technologies: [
      "TypeScript",
      "Plasmo Framework",
      "Chrome Manifest V3",
      "DOM APIs",
      "CSS Injection",
      "MutationObserver",
      "SPA Navigation Hooks",
    ],
    highlights: [
      "Built an automated Chrome MV3 utility to eliminate dynamic DOM overlays and ad blocks in real time",
      "Intercepted SPA navigation events (yt-navigate-finish) to preserve extension execution state across dynamic client-side routes",
      "Implemented debounced MutationObserver listeners to prevent layout thrashing, DOM loops, and video stutter",
      "Injected dynamic stylesheet rules to remove companion cards, banner ads, and feed clutter",
    ],
    repositoryLinks: [
      {
        label: "GitHub",
        href: "https://github.com/asifrayhanjoy",
      },
    ],
    liveDemo: "https://youtube-cleaner-web.vercel.app/",
    caseStudy: [
      {
        title: "Scope",
        body: "Built a lightweight, high-performance Chrome extension and web dashboard using Plasmo framework & TypeScript to eliminate video ads and cleanup YouTube's SPA DOM.",
      },
      {
        title: "System Shape",
        body: "Manifest V3 content scripts, background service worker, MutationObserver DOM watchers, and dynamic CSS injection rules.",
      },
      {
        title: "Engineering Focus",
        body: "Real-time DOM mutation cleanup, SPA lifecycle event handling (yt-navigate-finish), debounced listeners, and false-positive guardrails.",
      },
    ],
  },
  {
    name: "Bytespace — Full-Stack Technical Assessment",
    slug: "bytespace-new",
    role: "Full-Stack Web Developer",
    category: "Full-Stack Web Application",
    accent: "#818cf8",
    visual: "product",
    // 📸 High-resolution evaluation & code platform dashboard UI mockup
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=85",
    fallbackImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=85",
    badge: "Evaluation Platform",
    statBadge: "Hybrid PostgreSQL + Mongo",
    description:
      "Full-stack web application featuring Next.js, TypeScript, and a hybrid database deployment, developed under tight deadlines as part of a technical assessment.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "NestJS",
      "Go",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Tailwind CSS",
      "Vercel",
    ],
    highlights: [
      "High-fidelity full-stack prototype engineered under tight technical evaluation deadlines",
      "Implemented hybrid database persistence leveraging PostgreSQL for relational records and MongoDB for dynamic data",
      "Automated preview deployments and CI/CD pipelines via Vercel",
      "Engineered low-latency session caching and responsive UI state management",
    ],
    repositoryLinks: [
      {
        label: "GitHub",
        href: "https://github.com/asifrayhanjoy",
      },
    ],
    liveDemo: "https://bytespace-new.vercel.app",
    caseStudy: [
      {
        title: "Scope",
        body: "Full-stack prototype application developed as part of a technical evaluation under tight deadlines, deployed on Vercel.",
      },
      {
        title: "System Shape",
        body: "Next.js & React full-stack application backed by Node.js, NestJS, MongoDB, PostgreSQL, Redis, and Tailwind CSS.",
      },
      {
        title: "Engineering Focus",
        body: "Rapid prototype implementation under strict deadlines, clean component structure, dual DB data modeling, and Vercel cloud deployment.",
      },
    ],
  },
  {
    name: "Next Thekana — Real-Time Rental Platform",
    slug: "next-thekana",
    role: "Full-Stack Web Developer",
    category: "Real-Time Web Platform",
    accent: "#38bdf8",
    visual: "product",
    // 📸 Real-time rental & listing platform UI mockup
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=85",
    fallbackImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=85",
    badge: "WebSocket Sync",
    statBadge: "Real-Time Feeds",
    description:
      "Collaborated on a real-time rental and service platform featuring duplex WebSocket sync, modular responsive UI components, and secure RESTful backend endpoints.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "WebSockets",
      "REST APIs",
    ],
    highlights: [
      "Integrated duplex WebSocket channels for instant booking state synchronization and live listing updates",
      "Built responsive, reusable UI components optimized across mobile and desktop viewports",
      "Connected secure REST API layers for advanced search filters and inquiries",
    ],
    repositoryLinks: [
      {
        label: "GitHub",
        href: "https://github.com/asifrayhanjoy",
      },
    ],
    caseStudy: [
      {
        title: "Scope",
        body: "Delivered user interfaces and real-time listing sync features for a rental platform.",
      },
      {
        title: "System Shape",
        body: "Modular frontend architecture connected to RESTful backend endpoints and WebSocket feeds.",
      },
      {
        title: "Engineering Focus",
        body: "Component reusability, responsive UI, real-time data sync, and clean API integration.",
      },
    ],
  },
  {
    name: "Invoice Generator & Impact Tracker",
    slug: "invoice-generator",
    role: "Full-Stack Web Developer",
    category: "SaaS & Financial Tooling",
    accent: "#f472b6",
    visual: "product",
    // 📸 High-res financial invoice & calculation engine UI mockup
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=85",
    fallbackImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=85",
    badge: "Production Live",
    statBadge: "Dynamic Calc Engine",
    description:
      "In-browser financial calculation engine and SaaS invoice generation platform producing structured, print-ready vector PDFs and shareable client payment links.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Vector PDF Engine",
    ],
    highlights: [
      "In-browser calculation engine computing dynamic subtotals, tiered discounts, and multi-region tax/VAT splits",
      "Client-side vector PDF generation producing structured, print-ready invoices directly from dynamic form state",
      "Shareable client payment links and robust schema validation",
    ],
    repositoryLinks: [
      {
        label: "GitHub",
        href: "https://github.com/asifrayhanjoy",
      },
    ],
    liveDemo: "https://my-app-tl6i.vercel.app/",
    caseStudy: [
      {
        title: "Scope",
        body: "Created a focused financial productivity tool for generating client invoices, managing billing records, and tracking transaction impact.",
      },
      {
        title: "System Shape",
        body: "Next.js & React interactive form components with client-side vector PDF compilation and dynamic calculation modules.",
      },
      {
        title: "Engineering Focus",
        body: "Form handling, calculation precision, PDF export formatting, and seamless cloud deployment.",
      },
    ],
  },
  {
    name: "Rentiful — Rental Web Application",
    slug: "rentful",
    role: "Full-Stack Web Developer",
    category: "Web Application",
    accent: "#2dd4bf",
    visual: "product",
    // 📸 Modular rental web application component architecture UI mockup
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1600&q=85",
    fallbackImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1600&q=85",
    badge: "Modular UI",
    statBadge: "Component Architecture",
    description:
      "Developed a modern rental web application focusing on component-based architecture, clean state management, and optimized responsive layouts.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "State Management",
    ],
    highlights: [
      "Designed component-based scalable architecture decoupling UI presentation from logic",
      "Clean global state handling and efficient client-side routing",
      "Mobile-first responsive layouts with sub-second rendering",
    ],
    repositoryLinks: [
      {
        label: "GitHub",
        href: "https://github.com/asifrayhanjoy",
      },
    ],
    caseStudy: [
      {
        title: "Scope",
        body: "Designed and implemented a rental web application focused on frontend polish and usability.",
      },
      {
        title: "System Shape",
        body: "React/Next.js page routing and component system styled with Tailwind CSS.",
      },
      {
        title: "Engineering Focus",
        body: "Clean component boundaries, intuitive UI flows, and state management.",
      },
    ],
  },
  {
    name: "PH Healthcare — Clinical & Appointment Platform",
    slug: "ph-healthcare",
    role: "Full-Stack Web Developer",
    category: "Healthcare & Utility Platform",
    accent: "#06b6d4",
    visual: "product",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=85",
    fallbackImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=85",
    badge: "Medical Portal",
    statBadge: "Slot Scheduling Engine",
    description:
      "A clinical management and appointment scheduling platform featuring patient booking pipelines, calendar slot management, and responsive medical dashboards.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Tailwind CSS",
    ],
    highlights: [
      "Patient appointment booking pipelines, calendar slot management, and responsive medical dashboards",
      "Interactive doctor scheduling and real-time consultation slot reservation systems",
      "Role-based patient history access control and secure health profile management",
      "Mobile-first responsive layouts with streamlined clinician workflows",
    ],
    repositoryLinks: [
      {
        label: "GitHub",
        href: "https://github.com/asifrayhanjoy",
      },
    ],
    caseStudy: [
      {
        title: "Scope",
        body: "Engineered PH Healthcare, a full-stack digital medical clinic application connecting patients with healthcare specialists.",
      },
      {
        title: "System Shape",
        body: "Next.js application backed by Node.js service endpoints, dynamic booking matrices, and secure patient portals.",
      },
      {
        title: "Engineering Focus",
        body: "Calendar scheduling concurrency, booking slot locking, responsive dashboard layouts, and robust form validation.",
      },
    ],
  },
];

const skillGroups: SkillGroup[] = [
  {
    title: "Frontend & State",
    icon: Layers3,
    description: "Modern UI architecture, responsive layouts & client state management.",
    skills: [
      { name: "Next.js 15 (App & Pages Router)", level: "Core" },
      { name: "React 19", level: "Core" },
      { name: "TypeScript", level: "Core" },
      { name: "TanStack Query", level: "Core" },
      { name: "Zustand", level: "Core" },
      { name: "Radix Primitives", level: "Core" },
      { name: "shadcn/ui", level: "Core" },
      { name: "Tailwind CSS", level: "Core" },
      { name: "JavaScript (ES6+)", level: "Core" },
    ],
  },
  {
    title: "Browser Systems & Tooling",
    icon: Code2,
    description: "Chrome extensions, Manifest V3 architecture & DOM automation.",
    skills: [
      { name: "Chrome Extensions (Manifest V3)", level: "Core" },
      { name: "Plasmo Framework", level: "Core" },
      { name: "MutationObserver", level: "Core" },
      { name: "DOM Automation", level: "Core" },
      { name: "SPA Navigation Hooks", level: "Core" },
    ],
  },
  {
    title: "Backend & Microservices",
    icon: Server,
    description: "RESTful APIs, microservices, real-time protocols & server automation.",
    skills: [
      { name: "NestJS", level: "Core" },
      { name: "Node.js", level: "Core" },
      { name: "Express.js", level: "Core" },
      { name: "Python", level: "Working" },
      { name: "Go (Golang)", level: "Working" },
      { name: "RESTful APIs", level: "Core" },
      { name: "GraphQL", level: "Working" },
      { name: "gRPC", level: "Working" },
      { name: "WebSockets", level: "Core" },
      { name: "Kafka", level: "Working" },
      { name: "Redis", level: "Core" },
      { name: "JWT (Token Rotation)", level: "Core" },
      { name: "RBAC Security", level: "Core" },
    ],
  },
  {
    title: "Databases & ORM",
    icon: Database,
    description: "Relational & Document database design with modern ORM mapping.",
    skills: [
      { name: "PostgreSQL", level: "Core" },
      { name: "Prisma ORM", level: "Core" },
      { name: "MongoDB", level: "Core" },
      { name: "MySQL", level: "Working" },
      { name: "SQLite", level: "Working" },
      { name: "Supabase", level: "Working" },
      { name: "Redis", level: "Core" },
    ],
  },
  {
    title: "DevOps & Testing",
    icon: Wrench,
    description: "Testing frameworks, containerization, CI/CD pipelines & developer tooling.",
    skills: [
      { name: "Vitest", level: "Core" },
      { name: "Docker", level: "Working" },
      { name: "Vercel CI/CD", level: "Core" },
      { name: "Postman", level: "Core" },
      { name: "Git / GitHub", level: "Core" },
      { name: "Cursor AI", level: "Core" },
      { name: "Claude Code", level: "Core" },
    ],
  },
];

const processSteps = [
  {
    step: "01",
    title: "Understand",
    body: "Clarify the workflow, users, data needs, constraints, and success criteria before choosing the implementation path.",
    tags: ["User Flow", "Requirements", "Success Criteria"],
  },
  {
    step: "02",
    title: "Shape",
    body: "Map the pages, API contracts, database models, authentication flow, and reusable UI structure.",
    tags: ["System Arch", "Data Model", "API Contracts"],
  },
  {
    step: "03",
    title: "Build",
    body: "Implement the interface, backend logic, validations, integrations, and state flows with practical TypeScript discipline.",
    tags: ["Design System", "Server Logic", "Integrations"],
  },
  {
    step: "04",
    title: "Refine",
    body: "Review behavior, fix edge cases, improve accessibility, and polish performance until the result feels complete.",
    tags: ["Debugging", "Accessibility", "Performance"],
  },
];

const languages = [
  { name: "Bengali", level: "Native" },
  { name: "English", level: "Professional Working Proficiency" },
  { name: "Hindi", level: "Professional Working Proficiency" },
  { name: "Urdu", level: "Professional Working Proficiency" },
];

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.string().trim().email("Please enter a valid email address."),
  subject: z
    .string()
    .trim()
    .min(4, "Please add a subject.")
    .max(120, "Subject must be under 120 characters."),
  message: z
    .string()
    .trim()
    .min(20, "Please write at least 20 characters.")
    .max(1000, "Message must be under 1000 characters."),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const copyrightYear = 2026;

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/* =========================================================================
   CUSTOM SOCIAL ICONS
   ========================================================================= */

function GithubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      aria-hidden="true"
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      aria-hidden="true"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

/* =========================================================================
   INTERSECTION OBSERVER HOOK
   ========================================================================= */

function useActiveSection() {
  const [activeSection, setActiveSection] = useState(navItems[0].id);

  useEffect(() => {
    let ticking = false;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!ticking) {
          requestAnimationFrame(() => {
            const visibleEntry = entries
              .filter((entry) => entry.isIntersecting)
              .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

            if (visibleEntry?.target.id) {
              const targetId = visibleEntry.target.id;
              setActiveSection((prev) => (prev === targetId ? prev : targetId));
            }
            ticking = false;
          });
          ticking = true;
        }
      },
      {
        rootMargin: "-25% 0px -40% 0px",
        threshold: [0.1, 0.3],
      },
    );

    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  return activeSection;
}

/* =========================================================================
   CURSOR TRAIL INTERACTION
   ========================================================================= */

const CursorTrailLayer = memo(function CursorTrailLayer() {
  const [cursorSparks, setCursorSparks] = useState<CursorSpark[]>([]);
  const nextSparkId = useRef(0);
  const lastSparkAt = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    let rafId: number | null = null;
    const timeouts: number[] = [];

    const handlePointerMove = (event: globalThis.PointerEvent) => {
      if (event.pointerType !== "mouse") {
        return;
      }

      const now = window.performance.now();
      if (now - lastSparkAt.current < 45) {
        return;
      }
      lastSparkAt.current = now;

      if (rafId) {
        cancelAnimationFrame(rafId);
      }

      rafId = requestAnimationFrame(() => {
        const sparkId = nextSparkId.current;
        nextSparkId.current += 1;

        const spark: CursorSpark = {
          id: sparkId,
          x: event.clientX,
          y: event.clientY,
          color: cursorSparkColors[sparkId % cursorSparkColors.length],
          size: 4 + (sparkId % 3) * 2,
          driftX: Math.round((Math.random() - 0.5) * 32),
          driftY: Math.round((Math.random() - 0.5) * 32),
        };

        setCursorSparks((currentSparks) => [...currentSparks.slice(-8), spark]);

        const timeoutId = window.setTimeout(() => {
          setCursorSparks((currentSparks) =>
            currentSparks.filter((item) => item.id !== spark.id),
          );
        }, 650);

        timeouts.push(timeoutId);
      });
    };

    const handlePointerLeave = () => {
      setCursorSparks([]);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave, { passive: true });

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      timeouts.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  if (cursorSparks.length === 0) {
    return null;
  }

  return (
    <div className="cursor-trail-layer" aria-hidden="true">
      {cursorSparks.map((spark) => (
        <span
          key={spark.id}
          className="cursor-spark"
          style={
            {
              "--spark-left": `${spark.x}px`,
              "--spark-top": `${spark.y}px`,
              "--spark-size": `${spark.size}px`,
              "--spark-color": spark.color,
              "--spark-drift-x": `${spark.driftX}px`,
              "--spark-drift-y": `${spark.driftY}px`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
});

/* =========================================================================
   DYNAMIC BACKGROUND SLIDESHOW WITH TUNED VISIBILITY & KEN BURNS
   - Clearly discernible imagery with tuned overlay tint (0.65 -> 0.75)
   - Subtle backdrop blur (2px)
   - Smooth 4.6s Ken Burns pan & zoom motion
   ========================================================================= */

const BackgroundSlideshow = memo(function BackgroundSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isPlaying || shouldReduceMotion) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % backgroundSlides.length);
    }, 4600);

    return () => clearInterval(timer);
  }, [isPlaying, shouldReduceMotion]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + backgroundSlides.length) % backgroundSlides.length);
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % backgroundSlides.length);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* 5 Background Slides with Smooth Crossfade & Active Ken Burns Pan/Zoom */}
      {backgroundSlides.map((slide, index) => {
        const isActive = index === currentIndex;

        return (
          <div
            key={slide.url}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000 ease-in-out",
              isActive ? "opacity-75" : "opacity-0",
            )}
          >
            <img
              src={slide.url}
              alt={slide.alt}
              className={cn(
                "w-full h-full object-cover object-center transform-gpu",
                isActive && !shouldReduceMotion && "kenburns-active",
              )}
            />
          </div>
        );
      })}

      {/* Tuned Luxury Dark Gradient Overlay for Discernible Background & Flawless Legibility */}
      <div
        className="absolute inset-0 backdrop-blur-[2px]"
        style={{
          background:
            "linear-gradient(180deg, rgba(10, 15, 30, 0.65) 0%, rgba(7, 10, 20, 0.70) 50%, rgba(5, 7, 15, 0.78) 100%)",
        }}
      />
      <div className="absolute inset-0 bg-tech-grid opacity-15" />

      {/* Floating HUD Controls (Interactive) */}
      <div className="absolute bottom-6 right-6 pointer-events-auto hidden sm:flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/80 px-3 py-1.5 backdrop-blur-xl shadow-2xl z-20">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous background"
          className="grid size-6 place-items-center rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition"
        >
          <ChevronLeft className="size-3.5" />
        </button>

        <div className="flex items-center gap-1.5 px-1.5">
          {backgroundSlides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === currentIndex
                  ? "w-5 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                  : "w-1.5 bg-white/20 hover:bg-white/40",
              )}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next background"
          className="grid size-6 place-items-center rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition"
        >
          <ChevronRight className="size-3.5" />
        </button>

        <span className="text-[10px] font-mono text-slate-400 px-1 border-l border-white/10">
          0{currentIndex + 1}/0{backgroundSlides.length}
        </span>

        <button
          type="button"
          onClick={() => setIsPlaying((p) => !p)}
          aria-label={isPlaying ? "Pause background slideshow" : "Play background slideshow"}
          className="grid size-6 place-items-center rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition"
        >
          {isPlaying ? <Pause className="size-2.5" /> : <Play className="size-2.5" />}
        </button>
      </div>
    </div>
  );
});

/* =========================================================================
   STICKY / FLOATING GLASSMORPHISM NAVBAR (RECRUITER & CEO-CENTRIC)
   - Quick navigation: Projects, Tech Stack, Experience, About, Contact
   - Quick Actions: Resume / CV, GitHub, LinkedIn, "Hire Me / Book Call"
   ========================================================================= */

const FloatingNavbar = memo(function FloatingNavbar({
  activeSection,
}: {
  activeSection: string;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center p-3 sm:p-5 transition-all duration-300 pointer-events-none">
        <nav
          aria-label="Primary navigation"
          className={cn(
            "pointer-events-auto flex items-center justify-between w-full max-w-[1440px] rounded-full px-4 sm:px-6 py-2.5 transition-all duration-300",
            isScrolled
              ? "bg-slate-950/85 border border-white/15 shadow-[0_16px_40px_rgba(0,0,0,0.6)] backdrop-blur-2xl"
              : "bg-slate-950/50 border border-white/10 backdrop-blur-xl shadow-lg",
          )}
        >
          {/* Brand Logo */}
          <a
            href="#home"
            className="group flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-full"
          >
            <div className="relative flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 via-teal-400 to-indigo-500 font-mono text-xs font-black text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.5)] transition group-hover:scale-105">
              AR
            </div>
            <div className="hidden sm:block leading-none">
              <span className="font-mono text-sm font-bold tracking-tight text-white group-hover:text-cyan-300 transition">
                ASIF<span className="text-cyan-400">.DEV</span>
              </span>
              <span className="block text-[10px] font-mono tracking-widest uppercase text-slate-400 mt-0.5">
                Full-Stack Developer
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-1 rounded-full border border-white/5 bg-white/[0.03] p-1 backdrop-blur-md">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400",
                    isActive
                      ? "text-white bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
                      : "text-slate-400 hover:text-white hover:bg-white/5",
                  )}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,1)]" />
                  )}
                </a>
              );
            })}
          </div>

          {/* Action Hub */}
          <div className="flex items-center gap-2">
            {/* Quick Resume Link */}
            <a
              href={`mailto:${personal.email}?subject=Resume%20Request%20-%20Md.%20Asif%20Rayhan%20Joy`}
              className="hidden lg:inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-mono font-medium text-slate-300 hover:text-white hover:bg-white/10 transition"
              title="Request Resume / CV"
            >
              <FileText className="size-3.5 text-cyan-400" />
              <span>Resume</span>
            </a>

            <a
              href={personal.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Profile"
              className="hidden sm:grid size-8 place-items-center rounded-full border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:border-cyan-400/40 hover:bg-white/10 transition"
            >
              <GithubIcon className="size-4" />
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn Profile"
              className="hidden sm:grid size-8 place-items-center rounded-full border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:border-cyan-400/40 hover:bg-white/10 transition"
            >
              <LinkedinIcon className="size-4" />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-teal-400 px-4 py-1.5 text-xs font-bold text-slate-950 shadow-[0_0_24px_rgba(34,211,238,0.35)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] hover:brightness-110 transition active:scale-95"
            >
              <span>Hire Me</span>
              <ArrowRight className="size-3.5" />
            </a>

            {/* Mobile Hamburger */}
            <button
              type="button"
              aria-label="Toggle Navigation Menu"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="grid size-9 place-items-center rounded-full border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10 transition md:hidden"
            >
              {isMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-20 z-50 rounded-3xl border border-white/15 bg-slate-950/95 p-4 shadow-2xl backdrop-blur-3xl md:hidden"
          >
            <div className="grid gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition",
                      isActive
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                        : "text-slate-300 hover:bg-white/5 hover:text-white",
                    )}
                  >
                    <Icon className="size-4 text-cyan-400" />
                    {item.label}
                  </a>
                );
              })}
              <div className="pt-2 mt-2 border-t border-white/10 flex gap-2">
                <a
                  href="#contact"
                  onClick={closeMenu}
                  className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 to-teal-400 py-3 text-sm font-bold text-slate-950 shadow-lg"
                >
                  Hire Me / Book Call
                  <ArrowRight className="size-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

/* =========================================================================
   HERO SECTION (AWWWARDS / LINEAR HIGH-END TECH AESTHETIC)
   - Name strictly on ONE SINGLE LINE (whitespace-nowrap)
   - Zero "Team Lead" / "Leadership" phrasing
   - Core identity: "Full-Stack Web Developer"
   ========================================================================= */

const HeroSection = memo(function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-28 pb-16 sm:px-8 md:px-12 lg:px-16 xl:px-20 overflow-hidden"
    >
      <div className="mx-auto w-full max-w-[1440px]">
        <div className="grid gap-12 xl:gap-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:justify-between w-full">
          {/* Left Column: Headlines & Call to Actions */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-2xl lg:max-w-none"
          >
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3.5 py-1.5 text-xs font-mono font-medium text-cyan-300 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.2)]">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              <span>Available for Full-Stack Web Development Roles</span>
            </div>

            {/* Sub-headline */}
            <p className="mt-6 font-mono text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">
              Full-Stack Web Developer
            </p>

            {/* Full Name strictly on ONE SINGLE LINE */}
            <h1 className="mt-3 font-extrabold tracking-tight text-white whitespace-nowrap text-[clamp(1.9rem,5.2vw,4.5rem)] leading-none">
              {personal.name}
            </h1>

            {/* Subtitle with High-Contrast Typography */}
            <p className="mt-5 text-lg sm:text-xl font-semibold leading-relaxed text-slate-200 max-w-2xl">
              {personal.subtitle}
            </p>

            {/* Bio paragraph */}
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-400 max-w-2xl">
              {personal.bio}
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-teal-400 to-indigo-500 px-6 py-3 text-sm font-bold text-slate-950 shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_40px_rgba(6,182,212,0.7)] hover:brightness-110 transition active:scale-95"
              >
                <span>Live Projects</span>
                <ArrowRight className="size-4" />
              </a>

              <a
                href={personal.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10 hover:border-white/20 transition active:scale-95 backdrop-blur-md"
              >
                <GithubIcon className="size-4" />
                <span>GitHub</span>
                <ArrowUpRight className="size-3.5 text-slate-400" />
              </a>

              <a
                href={personal.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10 hover:border-white/20 transition active:scale-95 backdrop-blur-md"
              >
                <LinkedinIcon className="size-4" />
                <span>LinkedIn</span>
                <ArrowUpRight className="size-3.5 text-slate-400" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/20 px-5 py-3 text-sm font-semibold text-cyan-300 hover:bg-cyan-950/40 hover:border-cyan-500/50 transition active:scale-95 backdrop-blur-md"
              >
                <Mail className="size-4" />
                <span>Get in Touch</span>
              </a>
            </div>

            {/* Meta Details */}
            <div className="mt-8 flex flex-wrap items-center gap-5 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <MapPin className="size-3.5 text-cyan-400" />
                {personal.location}
              </span>
              <a
                href={`mailto:${personal.email}`}
                className="flex items-center gap-1.5 hover:text-cyan-300 transition"
              >
                <Mail className="size-3.5 text-amber-400" />
                {personal.email}
              </a>
              <span className="flex items-center gap-1.5">
                <Phone className="size-3.5 text-emerald-400" />
                {personal.phone}
              </span>
            </div>
          </motion.div>

          {/* Right Column: Active Project Focus & Live Terminal Widget */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-xl lg:max-w-none lg:ml-auto"
          >
            <div className="glass-panel rounded-3xl p-6 sm:p-7 relative overflow-hidden">
              {/* Terminal Window Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <span className="size-3 rounded-full bg-[#ff5f57]" />
                  <span className="size-3 rounded-full bg-[#ffbd2e]" />
                  <span className="size-3 rounded-full bg-[#28c840]" />
                  <span className="ml-2 font-mono text-xs text-slate-400 flex items-center gap-1.5">
                    <Terminal className="size-3 text-cyan-400" />
                    active-project.tsx
                  </span>
                </div>
                <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-emerald-300 border border-emerald-500/20 flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  ACTIVE WORKFLOW
                </span>
              </div>

              {/* Current Focus / Active Project Showcase */}
              <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4.5">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-cyan-400">
                    Current Focus · Production Web App
                  </p>
                  <span className="font-mono text-[10px] text-slate-400">Next.js 16</span>
                </div>
                <h2 className="mt-2 text-xl font-bold text-white">
                  DigiVibe — Digital Subscription Platform
                </h2>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">
                  Full-stack e-commerce engine with multi-portal client apps, high-throughput Node.js REST APIs, JWT authentication, and a hybrid PostgreSQL & MongoDB data layer.
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {["Next.js", "TypeScript", "Prisma ORM", "PostgreSQL", "MongoDB"].map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] text-cyan-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                  <a
                    href="https://digi-vibe.vercel.app/en"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-cyan-400/20 to-teal-400/20 border border-cyan-400/30 px-3 py-1.5 text-xs font-mono font-bold text-cyan-300 hover:bg-cyan-400/30 hover:border-cyan-400/50 transition active:scale-95"
                  >
                    <span>Live Demo</span>
                    <ArrowUpRight className="size-3" />
                  </a>
                  <span className="font-mono text-[10px] text-emerald-400 flex items-center gap-1">
                    <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    digi-vibe.vercel.app
                  </span>
                </div>
              </div>

              {/* Stats 2x2 Grid (Developer Focused) */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                {heroStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-white/5 bg-white/[0.02] p-3.5 hover:border-cyan-500/20 transition"
                  >
                    <p className="font-mono text-2xl font-black text-white">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-xs font-bold text-slate-300">
                      {stat.label}
                    </p>
                    <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                      {stat.sub}
                    </p>
                  </div>
                ))}
              </div>

              {/* Architecture Layer Stack */}
              <div className="mt-4 rounded-2xl border border-white/5 bg-white/[0.02] p-4">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1.5 font-bold text-slate-300">
                    <Cpu className="size-3.5 text-cyan-400" />
                    Stack Architecture Map
                  </span>
                  <span className="text-[10px] text-cyan-400">60 FPS Render</span>
                </div>
                <div className="mt-3 space-y-2 text-xs">
                  {[
                    ["Client", "React 19 · Next.js 15 · TanStack · Zustand · Tailwind"],
                    ["Extensions", "Plasmo · Manifest V3 · DOM Automation · Hooks"],
                    ["Backend", "NestJS · Node.js · Express · Go · Python · gRPC"],
                    ["Data Layer", "PostgreSQL (Prisma) · MongoDB · Redis · Kafka"],
                  ].map(([layer, tech]) => (
                    <div key={layer} className="flex items-center gap-3">
                      <span className="w-20 shrink-0 font-mono text-[11px] font-semibold text-slate-400">
                        {layer}
                      </span>
                      <span className="h-px flex-1 bg-white/10" />
                      <span className="font-mono text-[11px] font-medium text-slate-300 text-right">
                        {tech}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

/* =========================================================================
   INFINITE MARQUEE TECH RIBBON
   ========================================================================= */

const StackRibbon = memo(function StackRibbon() {
  const marqueeList = useMemo(() => [...coreStack, ...coreStack], []);

  return (
    <section className="relative z-10 border-y border-white/10 bg-slate-950/60 backdrop-blur-xl py-6 overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between gap-4 mb-3">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-400">
            Core Production Technologies & Frameworks
          </p>
          <span className="h-px flex-1 bg-white/10" />
        </div>
      </div>

      <div className="relative overflow-hidden w-full py-2">
        {/* Gradient edge masks */}
        <div className="absolute left-0 inset-y-0 w-24 bg-gradient-to-r from-[#05070c] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 inset-y-0 w-24 bg-gradient-to-l from-[#05070c] to-transparent z-10 pointer-events-none" />

        <div className="marquee-track flex gap-3 px-4">
          {marqueeList.map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              className="flex items-center gap-2.5 rounded-full border border-white/10 bg-slate-900/60 px-5 py-2.5 text-xs font-mono font-bold text-slate-200 shadow-md backdrop-blur-md transition hover:border-cyan-400/50 hover:bg-slate-800/80 whitespace-nowrap"
            >
              <span
                className="size-2 rounded-full shadow-[0_0_8px_currentColor]"
                style={{ backgroundColor: item.color, color: item.color }}
              />
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

/* =========================================================================
   PROJECT VISUAL COMPONENT (RICH BROWSER MOCKUP WITH REAL UI PREVIEWS)
   ========================================================================= */

function ProjectVisual({ project }: { project: Project }) {
  const isYouTubeCleaner = project.slug === "youtube-cleaner";

  return (
    <div className="w-full relative aspect-[16/9] sm:aspect-[16/10] overflow-hidden bg-slate-950 group">
      {/* Realistic Browser Chrome Header (Scaled down, full width edge-to-edge) */}
      <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between border-b border-white/10 bg-slate-950/90 px-3 py-1.5 backdrop-blur-md w-full">
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-[#ff5f57]" />
          <span className="size-2 rounded-full bg-[#ffbd2e]" />
          <span className="size-2 rounded-full bg-[#28c840]" />
          <div className="hidden sm:flex items-center gap-1 ml-2 rounded-full bg-white/5 border border-white/10 px-2 py-0.5 text-[9px] font-mono text-slate-400">
            <span className="text-emerald-400">https://</span>
            <span className="text-slate-200 truncate max-w-[220px]">
              {project.liveDemo
                ? project.liveDemo.replace(/^https?:\/\//, "").replace(/\/$/, "")
                : `${project.slug}.vercel.app`}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-mono font-bold ${isYouTubeCleaner
                ? "bg-rose-500/10 border border-rose-500/25 text-rose-300"
                : "bg-cyan-500/10 border border-cyan-500/20 text-cyan-300"
              }`}
          >
            <span
              className={`size-1 rounded-full animate-pulse ${isYouTubeCleaner ? "bg-rose-400" : "bg-cyan-400"
                }`}
            />
            {project.badge}
          </span>
        </div>
      </div>

      {/* Main Preview Canvas (Edge-to-edge 100% Full Width & Height) */}
      <div className="w-full h-full pt-6 overflow-hidden relative">
        {isYouTubeCleaner ? (
          /* High-Fidelity Custom Centered Container for YouTube Cleaner (Full-bleed, edge-to-edge) */
          <div className="w-full h-full flex flex-col items-center justify-center relative bg-gradient-to-b from-[#1a0306] via-[#0b0d14] to-[#04060a] px-4 py-6 select-none">
            {/* Ambient Red Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,0,0,0.18)_0%,transparent_70%)] pointer-events-none" />

            {/* Blueprint Grid Lines */}
            <div
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px),
                                  linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)`,
                backgroundSize: "36px 36px",
              }}
            />

            {/* Official YouTube Brand Logo (Exact Vector Icons & Wordmark) */}
            <div className="relative z-10 flex items-center justify-center gap-2 sm:gap-2.5 transition-transform duration-500 group-hover:scale-105">
              {/* Official YouTube Red Play Icon */}
              <svg
                viewBox="0 0 29 20"
                className="h-7 sm:h-8 w-auto shrink-0 drop-shadow-[0_0_12px_rgba(255,0,0,0.45)]"
                fill="none"
              >
                <path
                  d="M27.9727 3.12324C27.6435 1.89323 26.6768 0.926623 25.4468 0.597366C23.2197 2.24288e-07 14.285 0 14.285 0C14.285 0 5.35042 2.24288e-07 3.12323 0.597366C1.89323 0.926623 0.926623 1.89323 0.597366 3.12324C2.24288e-07 5.35042 0 10 0 10C0 10 2.24288e-07 14.6496 0.597366 16.8768C0.926623 18.1068 1.89323 19.0734 3.12323 19.4026C5.35042 20 14.285 20 14.285 20C14.285 20 23.2197 20 25.4468 19.4026C26.6768 19.0734 27.6435 18.1068 27.9727 16.8768C28.5701 14.6496 28.5701 10 28.5701 10C28.5701 10 28.5677 5.35042 27.9727 3.12324Z"
                  fill="#FF0000"
                />
                <path
                  d="M11.4253 14.2854L18.8477 10.0004L11.4253 5.71533V14.2854Z"
                  fill="#FFFFFF"
                />
              </svg>

              {/* Official YouTube Pure White Wordmark */}
              <svg viewBox="0 0 52 20" className="h-6 sm:h-7 w-auto shrink-0" fill="#FFFFFF">
                <path d="M4.6024 13.0036L1.3945 1.41846H4.1932L5.3174 6.6701C5.6043 7.96361 5.8136 9.06662 5.95 9.97913H6.0323C6.1264 9.32532 6.3381 8.22937 6.665 6.68892L7.8291 1.41846H10.6278L7.3799 13.0036V18.561H4.6001V13.0036H4.6024Z" />
                <path d="M11.4697 18.1937C10.9053 17.8127 10.5031 17.22 10.2632 16.4157C10.0257 15.6114 9.9058 14.5437 9.9058 13.2078V11.3898C9.9058 10.0422 10.0422 8.95805 10.315 8.14196C10.5878 7.32588 11.0135 6.72851 11.592 6.35457C12.1706 5.98063 12.9302 5.79248 13.871 5.79248C14.7976 5.79248 15.5384 5.98298 16.0981 6.36398C16.6555 6.74497 17.0647 7.34234 17.3234 8.15137C17.5821 8.96275 17.7115 10.0422 17.7115 11.3898V13.2078C17.7115 14.5437 17.5845 15.6161 17.3329 16.4251C17.0812 17.2365 16.672 17.8292 16.1075 18.2031C15.5431 18.5771 14.7764 18.7652 13.8098 18.7652C12.8126 18.7675 12.0342 18.5747 11.4697 18.1937ZM14.6353 16.2323C14.7905 15.8231 14.8705 15.1575 14.8705 14.2309V10.3292C14.8705 9.43077 14.7929 8.77225 14.6353 8.35833C14.4777 7.94206 14.2026 7.7351 13.8074 7.7351C13.4265 7.7351 13.156 7.94206 13.0008 8.35833C12.8432 8.77461 12.7656 9.43077 12.7656 10.3292V14.2309C12.7656 15.1575 12.8408 15.8254 12.9914 16.2323C13.1419 16.6415 13.4123 16.8461 13.8074 16.8461C14.2026 16.8461 14.4777 16.6415 14.6353 16.2323Z" />
                <path d="M26.8154 18.5634H24.6094L24.3648 17.03H24.3037C23.7039 18.1871 22.8055 18.7656 21.6061 18.7656C20.7759 18.7656 20.1621 18.4928 19.767 17.9496C19.3719 17.4039 19.1743 16.5526 19.1743 15.3955V6.03751H21.9942V15.2308C21.9942 15.7906 22.0553 16.188 22.1776 16.4256C22.2999 16.6631 22.5045 16.783 22.7914 16.783C23.036 16.783 23.2712 16.7078 23.497 16.5573C23.7228 16.4067 23.8874 16.2162 23.9979 15.9858V6.03516H26.8154V18.5634Z" />
                <path d="M34.4755 3.68758H31.6768V18.5629H28.9181V3.68758H26.1194V1.42041H34.4755V3.68758Z" />
                <path d="M41.2768 18.5634H39.0708L38.8262 17.03H38.7651C38.1654 18.1871 37.267 18.7656 36.0675 18.7656C35.2373 18.7656 34.6235 18.4928 34.2284 17.9496C33.8333 17.4039 33.6357 16.5526 33.6357 15.3955V6.03751H36.4556V15.2308C36.4556 15.7906 36.5167 16.188 36.639 16.4256C36.7613 16.6631 36.9659 16.783 37.2529 16.783C37.4974 16.783 37.7326 16.7078 37.9584 16.5573C38.1842 16.4067 38.3488 16.2162 38.4593 15.9858V6.03516H41.2768V18.5634Z" />
                <path d="M50.609 8.0387C50.4373 7.24849 50.1621 6.67699 49.7812 6.32186C49.4002 5.96674 48.8757 5.79035 48.2078 5.79035C47.6904 5.79035 47.2059 5.93616 46.7567 6.23014C46.3075 6.52412 45.9594 6.90747 45.7148 7.38489H45.6937V0.785645H42.9773V18.5608H45.3056L45.5925 17.3755H45.6537C45.8724 17.7988 46.1993 18.1304 46.6344 18.3774C47.0695 18.622 47.554 18.7443 48.0855 18.7443C49.038 18.7443 49.7412 18.3045 50.1904 17.4272C50.6396 16.5476 50.8653 15.1765 50.8653 13.3092V11.3266C50.8653 9.92722 50.7783 8.82892 50.609 8.0387ZM48.0243 13.1492C48.0243 14.0617 47.9867 14.7767 47.9114 15.2941C47.8362 15.8115 47.7115 16.1808 47.5328 16.3971C47.3564 16.6158 47.1165 16.724 46.8178 16.724C46.585 16.724 46.371 16.6699 46.1734 16.5594C45.9759 16.4512 45.816 16.2866 45.6937 16.0702V8.96062C45.7877 8.6196 45.9524 8.34209 46.1852 8.12337C46.4157 7.90465 46.6697 7.79646 46.9401 7.79646C47.2271 7.79646 47.4481 7.90935 47.6034 8.13278C47.7609 8.35855 47.8691 8.73485 47.9303 9.26636C47.9914 9.79787 48.022 10.5528 48.022 11.5335V13.1492H48.0243Z" />
              </svg>
            </div>

            {/* Official Extension Badge Pill */}
            <div className="relative z-10 mt-2.5 sm:mt-3 flex items-center gap-2 rounded-full bg-slate-900/90 border border-rose-500/40 px-3 sm:px-3.5 py-1 sm:py-1.5 shadow-[0_0_20px_rgba(244,63,94,0.18)]">
              {/* Chrome Extension Puzzle Icon */}
              <svg viewBox="0 0 24 24" className="size-3.5 text-rose-400 shrink-0" fill="currentColor">
                <path d="M19 13h-2V9c0-1.1-.9-2-2-2h-4c0-1.66-1.34-3-3-3S5 5.34 5 7H1c-1.1 0-2 .9-2 2v4c1.66 0 3 1.34 3 3s-1.34 3-3 3v4c0 1.1.9 2 2 2h4c0-1.66 1.34-3 3-3s3 1.34 3 3h4c1.1 0 2-.9 2-2v-4c1.66 0 3-1.34 3-3s-1.34-3-3-3z" />
              </svg>
              <span className="font-sans text-[10px] sm:text-[11px] font-bold tracking-wider text-slate-100 uppercase">
                Cleaner Extension
              </span>
              <span className="h-2.5 w-px bg-white/20" />
              <div className="flex items-center gap-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-1.5 py-0.5 text-[8px] sm:text-[9px] font-mono font-bold text-emerald-400">
                <span className="size-1 rounded-full bg-emerald-400 animate-pulse" />
                MV3
              </div>
            </div>
          </div>
        ) : (
          /* Standard Image Preview (w-full h-full object-cover edge-to-edge) */
          <img
            src={project.image}
            onError={(e) => {
              if (project.fallbackImage && e.currentTarget.src !== project.fallbackImage) {
                e.currentTarget.src = project.fallbackImage;
              }
            }}
            alt={`${project.name} UI Mockup Preview`}
            className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
        )}

        {/* Ambient Dark Gradient Vignette for Depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />

        {/* Floating Quick Stat Chips (Scaled down, full width spread) */}
        <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between pointer-events-none z-10">
          <span className="rounded-md bg-slate-950/85 border border-white/10 px-2 py-0.5 text-[10px] font-mono font-medium text-slate-300 backdrop-blur-md">
            {project.statBadge}
          </span>
          <span
            className={`rounded-md px-2 py-0.5 text-[10px] font-mono font-semibold backdrop-blur-md flex items-center gap-1 ${isYouTubeCleaner
                ? "bg-rose-500/15 border border-rose-500/25 text-rose-300"
                : "bg-cyan-500/15 border border-cyan-500/25 text-cyan-300"
              }`}
          >
            <Sparkles className="size-2.5" />
            {isYouTubeCleaner ? "Official Badge" : "Live UI"}
          </span>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   PROJECTS SHOWCASE SECTION (AWWWARDS / VERCEL QUALITY)
   - Real high-resolution UI mockup images
   - Quick 1-click recruiter action buttons: [Live Preview ↗], [Source Code ↗]
   - Architectural Case Study expandable tabs
   ========================================================================= */

const ProjectsSection = memo(function ProjectsSection() {
  const [activeCaseStudy, setActiveCaseStudy] = useState<string | null>(null);

  return (
    <section id="projects" className="relative z-10 px-4 py-16 sm:py-20 sm:px-6 md:px-10 lg:px-12">
      <div className="mx-auto w-full max-w-[1240px]">
        {/* Section Header (Scaled down, compact and focused) */}
        <div className="max-w-2xl">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-400">
            Production Works & Case Studies
          </p>
          <h2 className="mt-1.5 text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
            Full–stack web applications with verified production architecture.
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
            Click directly into live demos and verified source repositories. Each project features clean component boundaries, robust server logic, and high-performance frontend workflows.
          </p>
        </div>

        {/* Projects Grid (Compact & Refined Density) */}
        <div className="mt-8 grid gap-5 sm:gap-6 md:grid-cols-2 w-full">
          {projects.map((project) => (
            <div
              key={project.slug}
              className="glass-panel-interactive rounded-2xl overflow-hidden flex flex-col justify-between group border border-white/10 shadow-lg w-full"
            >
              <div className="w-full">
                {/* Visual Mockup Frame */}
                <ProjectVisual project={project} />

                <div className="p-4 sm:p-5">
                  {/* Category & Status */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                      {project.category}
                    </span>
                    {project.role && (
                      <span className="rounded-full bg-white/5 border border-white/10 px-2 py-0.5 text-[9px] font-mono text-slate-300">
                        {project.role}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="mt-2 text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-cyan-300 transition">
                    {project.name}
                  </h3>

                  {/* Description */}
                  <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Highlights */}
                  <div className="mt-3 space-y-1.5">
                    {project.highlights.slice(0, 3).map((highlight) => (
                      <div key={highlight} className="flex items-start gap-1.5 text-[11px] text-slate-300">
                        <CheckCircle2 className="size-3 shrink-0 text-cyan-400 mt-0.5" />
                        <span className="leading-snug">{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="mt-3.5 flex flex-wrap gap-1">
                    {project.technologies.slice(0, 8).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-mono text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 8 && (
                      <span className="rounded-md border border-white/10 bg-white/[0.03] px-1.5 py-0.5 text-[9px] font-mono text-slate-500">
                        +{project.technologies.length - 8}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* 1-Click Recruiter Action Hub */}
              <div className="p-4 sm:p-5 pt-0 flex flex-wrap items-center justify-between gap-2.5 border-t border-white/5 mt-3">
                <div className="flex items-center gap-1.5">
                  {project.liveDemo ? (
                    <a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 rounded-lg bg-gradient-to-r from-cyan-400 to-teal-400 px-3 py-1.5 text-[11px] font-bold text-slate-950 shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] hover:brightness-110 transition active:scale-95"
                    >
                      <span>Live Preview</span>
                      <ArrowUpRight className="size-3" />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-[10px] font-mono text-slate-400">
                      Extension Repo
                    </span>
                  )}

                  {project.repositoryLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-semibold text-slate-300 hover:bg-white/10 hover:border-white/20 transition"
                    >
                      <GithubIcon className="size-3" />
                      <span>Source Code</span>
                      <ArrowUpRight className="size-2.5 text-slate-400" />
                    </a>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setActiveCaseStudy((curr) => (curr === project.slug ? null : project.slug))
                  }
                  className="font-mono text-[11px] text-cyan-400 hover:text-cyan-300 transition flex items-center gap-1 font-semibold"
                >
                  {activeCaseStudy === project.slug ? "Close" : "Case Study"}
                  <ArrowRight className="size-3" />
                </button>
              </div>

              {/* Expandable Case Study Section */}
              <AnimatePresence>
                {activeCaseStudy === project.slug && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden border-t border-white/10 bg-black/40 p-4 sm:p-5"
                  >
                    <p className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-400 mb-3">
                      Architectural Case Study Breakdown
                    </p>
                    <div className="grid gap-3 sm:grid-cols-3">
                      {project.caseStudy.map((item) => (
                        <div key={item.title} className="rounded-2xl border border-white/5 bg-white/[0.03] p-3.5">
                          <p className="font-mono text-xs font-bold text-slate-200">{item.title}</p>
                          <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">{item.body}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

/* =========================================================================
   ABOUT SECTION (BENTO GRID WITH FULL CONTENT PRESERVATION)
   ========================================================================= */

const AboutSection = memo(function AboutSection() {
  return (
    <section id="about" className="relative z-10 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="max-w-3xl">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">
            About & Engineering Scope
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Frontend, backend, and extension engineering with a polished product finish.
          </h2>
          <p className="mt-4 text-base text-slate-400 leading-relaxed">
            A portfolio built around real project work, honest skill levels, and complete application development from web interfaces to browser extensions and server layers.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="mt-12 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          {/* Main Narrative Card */}
          <div className="glass-panel rounded-3xl p-7 sm:p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2.5">
                <Sparkles className="size-5 text-cyan-400" />
                Engineering Philosophy & Professional Trajectory
              </h3>
              <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                I am a Full-Stack Web Developer with 3 years of hands-on experience delivering scalable full-stack web platforms and high-performance browser extensions. I maintain deep expertise in TypeScript across frontend and backend, micro-interactions, robust REST APIs, JWT/RBAC security, and hybrid database design (PostgreSQL via Prisma & MongoDB).
              </p>
            </div>

            {/* What I Bring to a Team */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-400 mb-4">
                What I bring to a team
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    label: "Full-Stack Web Architecture & Delivery",
                    text: "End-to-end full-stack web development directing sprint planning, technical code reviews, and system architecture while coordinating team milestones.",
                  },
                  {
                    label: "Frontend Architecture & Micro-interactions",
                    text: "Deep expertise in Next.js (App & Pages Router), React.js, TypeScript, micro-interactions, and Tailwind CSS with modern client state management.",
                  },
                  {
                    label: "Browser Extensions & Specialized Tools",
                    text: "Extensive experience building Chrome Manifest V3 extensions with Plasmo framework, SPA DOM lifecycle handling, MutationObserver, and dynamic CSS injection.",
                  },
                  {
                    label: "Backend & Hybrid Database Design",
                    text: "Hands-on expertise building robust REST APIs with Node.js and Express.js, implementing JWT/RBAC security, and hybrid database design (PostgreSQL via Prisma ORM & MongoDB).",
                  },
                  {
                    label: "AI-Assisted Engineering",
                    text: "Pragmatic use of modern developer tools (Cursor, Claude Code) to accelerate debugging, refactoring, and codebase exploration while maintaining full engineering judgment and code quality.",
                  },
                  {
                    label: "Problem Solving & Adaptability",
                    text: "Strong analytical mindset capable of quickly understanding complex domain logic, adopting new technologies, and shipping clean, maintainable code.",
                  },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="size-4 shrink-0 text-cyan-400 mt-0.5" />
                      <div>
                        <span className="font-bold text-white text-xs block">{item.label}</span>
                        <span className="text-slate-400 text-xs mt-1 block leading-relaxed">{item.text}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Profile & Contact Card */}
          <div className="flex flex-col gap-6">
            <div className="glass-panel rounded-3xl p-7">
              <div className="flex items-center gap-4 border-b border-white/10 pb-5">
                <div className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400 to-indigo-600 font-mono text-xl font-black text-slate-950 shadow-lg">
                  AR
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">{personal.name}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{personal.title}</p>
                  <span className="inline-flex items-center gap-1.5 mt-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-mono text-emerald-400">
                    <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Verified Credentials
                  </span>
                </div>
              </div>

              <div className="mt-5 space-y-4 text-xs font-mono">
                <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                  <span className="text-slate-400 flex items-center gap-2">
                    <MapPin className="size-3.5 text-cyan-400" /> Location
                  </span>
                  <span className="text-slate-200 font-bold">{personal.location}</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                  <span className="text-slate-400 flex items-center gap-2">
                    <Mail className="size-3.5 text-cyan-400" /> Email
                  </span>
                  <a href={`mailto:${personal.email}`} className="text-cyan-300 hover:underline truncate max-w-[180px]">
                    {personal.email}
                  </a>
                </div>
                <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                  <span className="text-slate-400 flex items-center gap-2">
                    <Phone className="size-3.5 text-cyan-400" /> Phone
                  </span>
                  <span className="text-slate-200 font-bold">{personal.phone}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-2">
                    <GithubIcon className="size-3.5 text-cyan-400" /> GitHub
                  </span>
                  <a
                    href={personal.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-300 hover:underline flex items-center gap-1"
                  >
                    asifrayhanjoy <ArrowUpRight className="size-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Three Technical Highlights */}
            <div className="space-y-3">
              {capabilityHighlights.map((cap) => (
                <div key={cap.title} className="glass-panel rounded-2xl p-4 border border-white/10 hover:border-cyan-500/30 transition">
                  <p className="font-bold text-white text-xs">{cap.title}</p>
                  <p className="mt-1 text-slate-400 text-xs leading-relaxed">{cap.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

/* =========================================================================
   SKILLS & TAXONOMY SECTION
   ========================================================================= */

const SkillsSection = memo(function SkillsSection() {
  const levelBadgeClass: Record<SkillLevel, string> = {
    Core: "border-cyan-400/40 bg-cyan-500/10 text-cyan-300",
    Working: "border-indigo-400/40 bg-indigo-500/10 text-indigo-300",
    Learning: "border-amber-400/40 bg-amber-500/10 text-amber-300",
    Basic: "border-rose-400/40 bg-rose-500/10 text-rose-300",
  };

  return (
    <section id="skills" className="relative z-10 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">
            Technical Stack & Taxonomy
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            A focused toolkit with honest, production-tested skill levels.
          </h2>
          <p className="mt-4 text-base text-slate-400 leading-relaxed">
            Core strengths are separated from working, learning, and basic technologies so the portfolio reads clearly in technical review.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => {
            const Icon = group.icon;
            return (
              <div
                key={group.title}
                className="glass-panel-interactive rounded-3xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <div className="grid size-11 place-items-center rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shadow-inner">
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base">{group.title}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">{group.description}</p>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill.name}
                        className={cn(
                          "inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs font-mono font-medium backdrop-blur-md",
                          levelBadgeClass[skill.level],
                        )}
                      >
                        {skill.name}
                        <span className="text-[9px] uppercase tracking-wider opacity-60">
                          {skill.level}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

/* =========================================================================
   EXPERIENCE & EDUCATION (PRESERVES NORTHERN UNIVERSITY OF BUSINESS & TECHNOLOGY KHULNA)
   ========================================================================= */

const ExperienceSection = memo(function ExperienceSection() {
  return (
    <section id="experience" className="relative z-10 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">
            Professional Experience & Background
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Software Development & System Architecture
          </h2>
          <p className="mt-4 text-base text-slate-400 leading-relaxed">
            3 years of professional experience across full-stack software development, system architecture, and production delivery.
          </p>
        </div>

        {/* Timeline of Roles */}
        <div className="mt-12 space-y-6">
          {experiences.map((exp) => (
            <div key={exp.role} className="glass-panel rounded-3xl p-7 sm:p-8">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-5">
                <div>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-400">
                    {exp.type}
                  </span>
                  <h3 className="mt-1 text-2xl font-bold text-white">{exp.role}</h3>
                </div>
                <div className="text-left sm:text-right font-mono text-xs">
                  <p className="font-bold text-slate-200">{exp.duration}</p>
                  <p className="text-slate-400 mt-0.5">{exp.location}</p>
                </div>
              </div>

              <ul className="mt-6 space-y-3">
                {exp.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3 text-sm text-slate-300 leading-relaxed">
                    <CheckCircle2 className="size-4 shrink-0 text-cyan-400 mt-1" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Education & AI Engineering Row */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {/* Exact Preserved Educational Institution */}
          <div className="glass-panel rounded-3xl p-7 border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.15)] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3.5">
                <div className="grid size-12 place-items-center rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                  <GraduationCap className="size-6" />
                </div>
                <div>
                  <p className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-400">
                    Educational Institution
                  </p>
                  <h3 className="mt-1 text-xl font-bold text-white">
                    Northern University of Business & Technology Khulna
                  </h3>
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-white/[0.03] border border-white/5 p-4">
                <p className="text-base font-bold text-slate-200">
                  Honours in English
                </p>
                <p className="mt-1 text-xs font-mono text-slate-400">
                  Satkhira, Bangladesh (Currently studying)
                </p>
              </div>
            </div>

            <p className="mt-4 text-xs text-slate-400">
              Pursuing undergraduate degree in English alongside professional full-stack software development workflows.
            </p>
          </div>

          {/* AI-Assisted Workflow */}
          <div className="glass-panel rounded-3xl p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3.5">
                <div className="grid size-12 place-items-center rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                  <Sparkles className="size-6" />
                </div>
                <div>
                  <p className="font-mono text-xs font-bold uppercase tracking-wider text-amber-400">
                    Engineering & Workflow
                  </p>
                  <h3 className="mt-1 text-xl font-bold text-white">
                    AI-Assisted Development
                  </h3>
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-white/[0.03] border border-white/5 p-4">
                <p className="text-sm text-slate-300 leading-relaxed">
                  Pragmatic use of modern developer tools (Cursor, Claude Code) to accelerate debugging, refactoring, and codebase exploration while maintaining full engineering judgment and code quality.
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2 text-xs font-mono">
              <span className="rounded-lg bg-white/5 px-2.5 py-1 text-slate-300">Cursor AI</span>
              <span className="rounded-lg bg-white/5 px-2.5 py-1 text-slate-300">Claude Code</span>
              <span className="rounded-lg bg-white/5 px-2.5 py-1 text-slate-300">RAG Integration</span>
            </div>
          </div>
        </div>

        {/* Spoken Languages */}
        <div className="mt-8 grid gap-4 grid-cols-2 sm:grid-cols-4">
          {languages.map((lang) => (
            <div key={lang.name} className="glass-panel rounded-2xl p-4 text-center">
              <Languages className="size-4 text-cyan-400 mx-auto mb-2" />
              <p className="font-bold text-white text-sm">{lang.name}</p>
              <p className="text-[11px] font-mono text-slate-400 mt-1">{lang.level}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

/* =========================================================================
   AI CAPABILITIES & PROCESS SECTIONS
   ========================================================================= */

const AiCapabilitiesSection = memo(function AiCapabilitiesSection() {
  return (
    <section id="ai-capabilities" className="relative z-10 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">
            AI & RAG Competencies
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            AI-assisted software development with practical application focus.
          </h2>
          <p className="mt-4 text-base text-slate-400 leading-relaxed">
            I work with AI development workflows to accelerate code exploration, debugging, refactoring, prototyping, and feature delivery without replacing engineering judgment.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "RAG & Knowledge Workflows",
              body: "I can work with retrieval pipelines, document-based knowledge apps, and LLM-driven question-answering patterns.",
            },
            {
              title: "LLM Integration",
              body: "I can connect AI workflows into application logic, support integration boundaries, and work with embeddings and vector search concepts.",
            },
            {
              title: "AI-Assisted Delivery",
              body: "Tools such as Claude Code, OpenAI Codex, ChatGPT, and Cursor are used for code generation, refactoring, debugging, and understanding unfamiliar codebases.",
            },
          ].map((item) => (
            <div key={item.title} className="glass-panel rounded-3xl p-6">
              <h3 className="font-bold text-white text-lg">{item.title}</h3>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

const ProcessSection = memo(function ProcessSection() {
  return (
    <section id="process" className="relative z-10 px-4 py-24 sm:px-6 lg:px-8 border-y border-white/10 bg-slate-950/70 backdrop-blur-2xl">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-amber-400">
            Engineering Process
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            A disciplined workflow for turning requirements into reliable products.
          </h2>
          <p className="mt-4 text-base text-slate-400 leading-relaxed">
            Each project moves through the same sequence: clarify the problem, shape the system, build the product, and refine the result until it is easier to use and maintain.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step) => (
            <div key={step.step} className="glass-panel rounded-3xl p-6 flex flex-col justify-between">
              <div>
                <span className="font-mono text-2xl font-black text-amber-400">{step.step}</span>
                <h3 className="mt-3 text-xl font-bold text-white">{step.title}</h3>
                <p className="mt-3 text-xs leading-relaxed text-slate-400">{step.body}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 space-y-1.5">
                {step.tags.map((tag) => (
                  <div key={tag} className="flex items-center gap-1.5 text-[11px] font-mono text-slate-300">
                    <CheckCircle2 className="size-3 text-amber-400" />
                    <span>{tag}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

/* =========================================================================
   CONTACT SECTION (LUXURY SPLIT LAYOUT + REACT HOOK FORM & ZOD)
   ========================================================================= */

const ContactSection = memo(function ContactSection() {
  return (
    <section id="contact" className="relative z-10 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">
            Direct Contact & Inquiries
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Open to roles, web engineering, and collaborative projects.
          </h2>
          <p className="mt-4 text-base text-slate-400 leading-relaxed">
            Reach out for full-stack web developer roles, contract opportunities, remote positions, or interview scheduling.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Left Cards */}
          <div className="space-y-4">
            {[
              {
                icon: Mail,
                label: "Email",
                value: personal.email,
                href: `mailto:${personal.email}`,
              },
              {
                icon: Phone,
                label: "Phone / WhatsApp",
                value: personal.phone,
                href: `tel:${personal.phone}`,
              },
              {
                icon: GithubIcon,
                label: "GitHub Profile",
                value: "github.com/asifrayhanjoy",
                href: personal.github,
                external: true,
              },
              {
                icon: LinkedinIcon,
                label: "LinkedIn Profile",
                value: "linkedin.com/in/md-asif-rayhan-joy-4177372a4",
                href: personal.linkedin,
                external: true,
              },
            ].map((method) => {
              const Icon = method.icon;
              return (
                <a
                  key={method.label}
                  href={method.href}
                  target={method.external ? "_blank" : undefined}
                  rel={method.external ? "noreferrer" : undefined}
                  className="glass-panel-interactive rounded-2xl p-4 flex items-center gap-4 group"
                >
                  <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:bg-cyan-500/20 transition">
                    <Icon className="size-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {method.label}
                    </p>
                    <p className="mt-0.5 text-sm font-bold text-white truncate group-hover:text-cyan-300 transition">
                      {method.value}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Right: Modern Form */}
          <ContactForm />
        </div>
      </div>
    </section>
  );
});

function ContactForm() {
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [isSending, setIsSending] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit: SubmitHandler<ContactFormValues> = async (values) => {
    setIsSending(true);
    setStatusMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatusMessage({
          type: "success",
          text: data.message || "Thank you! Your message has been sent successfully.",
        });
        reset();
      } else {
        setStatusMessage({
          type: "error",
          text: data.message || "Failed to send message. Please try again.",
        });
      }
    } catch (err) {
      console.error("Submission error:", err);
      setStatusMessage({
        type: "error",
        text: "An error occurred while sending your message. Please try again.",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="glass-panel rounded-3xl p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-xs font-mono font-bold uppercase text-slate-300 mb-2">
            Your Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="John Doe"
            autoComplete="name"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-cyan-400 focus:bg-white/10 focus:ring-2 focus:ring-cyan-400/20"
            {...register("name")}
          />
          {errors.name && (
            <p className="mt-1.5 text-xs text-rose-400 font-mono">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-xs font-mono font-bold uppercase text-slate-300 mb-2">
            Your Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="john@example.com"
            autoComplete="email"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-cyan-400 focus:bg-white/10 focus:ring-2 focus:ring-cyan-400/20"
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1.5 text-xs text-rose-400 font-mono">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="subject" className="block text-xs font-mono font-bold uppercase text-slate-300 mb-2">
          Subject / Opportunity
        </label>
        <input
          id="subject"
          type="text"
          placeholder="Full-Stack Web Developer Opportunity / Project Inquiry"
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-cyan-400 focus:bg-white/10 focus:ring-2 focus:ring-cyan-400/20"
          {...register("subject")}
        />
        {errors.subject && (
          <p className="mt-1.5 text-xs text-rose-400 font-mono">{errors.subject.message}</p>
        )}
      </div>

      <div className="mt-5">
        <label htmlFor="message" className="block text-xs font-mono font-bold uppercase text-slate-300 mb-2">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="Tell me about your team, role scope, or project specifications..."
          className="w-full resize-y rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-cyan-400 focus:bg-white/10 focus:ring-2 focus:ring-cyan-400/20"
          {...register("message")}
        />
        {errors.message && (
          <p className="mt-1.5 text-xs text-rose-400 font-mono">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSending}
        className="mt-6 inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-teal-400 to-indigo-500 px-7 py-3 text-sm font-bold text-slate-950 shadow-[0_0_24px_rgba(34,211,238,0.4)] hover:brightness-110 transition active:scale-95 disabled:opacity-60"
      >
        <Send className={cn("size-4", isSending && "animate-spin")} />
        {isSending ? "Transmitting..." : "Send Message"}
      </button>

      {statusMessage && (
        <div
          role="status"
          className={cn(
            "mt-4 rounded-2xl p-4 text-xs font-mono border",
            statusMessage.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
              : "bg-rose-500/10 border-rose-500/30 text-rose-300",
          )}
        >
          {statusMessage.text}
        </div>
      )}
    </form>
  );
}

/* =========================================================================
   FOOTER (MINIMALIST LINEAR STYLE)
   ========================================================================= */

const Footer = memo(function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-slate-950/80 backdrop-blur-2xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid size-8 place-items-center rounded-full bg-gradient-to-br from-cyan-400 to-indigo-500 font-mono text-xs font-black text-slate-950 shadow-md">
              AR
            </span>
            <span className="font-mono text-sm font-bold text-white tracking-tight">
              {personal.name}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {personal.title} · Dhaka, Bangladesh
          </p>
          <p className="text-[11px] font-mono text-slate-500 mt-2">
            © {copyrightYear} {personal.name}. All rights reserved.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href={personal.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub Profile"
            className="grid size-9 place-items-center rounded-full border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:border-cyan-400/40 hover:bg-white/10 transition"
          >
            <GithubIcon className="size-4" />
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn Profile"
            className="grid size-9 place-items-center rounded-full border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:border-cyan-400/40 hover:bg-white/10 transition"
          >
            <LinkedinIcon className="size-4" />
          </a>
          <a
            href={`mailto:${personal.email}`}
            aria-label="Email Me"
            className="grid size-9 place-items-center rounded-full border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:border-cyan-400/40 hover:bg-white/10 transition"
          >
            <Mail className="size-4" />
          </a>
          <a
            href="#home"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-mono font-bold text-slate-200 hover:bg-white/10 hover:border-white/20 transition"
          >
            <ArrowUp className="size-3.5" />
            Top
          </a>
        </div>
      </div>
    </footer>
  );
});

/* =========================================================================
   ROOT PAGE COMPONENT
   ========================================================================= */

export default function Home() {
  const activeSection = useActiveSection();

  const structuredData = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Person",
      name: personal.name,
      jobTitle: personal.title,
      email: `mailto:${personal.email}`,
      telephone: personal.phone,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Dhaka",
        addressRegion: "Dhaka",
        addressCountry: "BD",
      },
      sameAs: [personal.github, personal.linkedin].filter(Boolean),
      knowsAbout: [
        "React",
        "Next.js",
        "Node.js",
        "TypeScript",
        "Go (Golang)",
        "MongoDB",
        "PostgreSQL",
        "Prisma",
        "Plasmo",
        "Chrome WebExtensions",
      ],
    }),
    [],
  );

  return (
    <div className="relative min-h-screen text-slate-100 selection:bg-cyan-500/30 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Dynamic Background Slideshow with Tuned Opacity & Ken Burns Effect */}
      <BackgroundSlideshow />

      {/* Micro-spark trail on fine pointer */}
      <CursorTrailLayer />

      {/* Modern Floating Glassmorphism Navigation */}
      <FloatingNavbar activeSection={activeSection} />

      {/* Main Portfolio Sections */}
      <main className="relative z-10">
        <HeroSection />
        <StackRibbon />
        <ProjectsSection />
        <SkillsSection />
        <ExperienceSection />
        <AboutSection />
        <AiCapabilitiesSection />
        <ProcessSection />
        <ContactSection />
      </main>

      {/* Minimalist Linear Footer */}
      <Footer />
    </div>
  );
}
