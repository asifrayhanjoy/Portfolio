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
  Code2,
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
  Monitor,
  Moon,
  Phone,
  Rocket,
  Send,
  Server,
  ShieldCheck,
  Sparkles,
  Sun,
  Wrench,
  X,
} from "lucide-react";
import {
  type ComponentType,
  type CSSProperties,
  type PointerEvent,
  type ReactNode,
  type SVGProps,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;
type ThemePreference = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";
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
  category: string;
  description: string;
  accent: string;
  visual: "commerce" | "product";
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

const personal = {
  name: "Md. Asif Rayhan Joy",
  shortName: "Asif Rayhan",
  title: "Full-Stack Web Developer | AI-Assisted Software Developer",
  location: "Dhaka, Bangladesh",
  email: "mdasifrayhanjoy2@gmail.com",
  phone: "01302271472",
  github: "https://github.com/asifrayhanjoy",
  linkedin: "https://www.linkedin.com/in/md-asif-rayhan-joy-4177372a4/",
  portfolio: "https://portfolio-neon-omega-77.vercel.app/",
};

const navItems: NavItem[] = [
  { label: "Home", href: "#home", id: "home", icon: HomeIcon },
  { label: "About", href: "#about", id: "about", icon: BookOpen },
  { label: "Experience", href: "#experience", id: "experience", icon: Briefcase },
  { label: "Projects", href: "#projects", id: "projects", icon: Briefcase },
  { label: "Skills", href: "#skills", id: "skills", icon: Code2 },
  { label: "Process", href: "#process", id: "process", icon: Rocket },
  { label: "Contact", href: "#contact", id: "contact", icon: Mail },
];

const heroStats = [
  { value: "1Y", label: "Team coordination" },
  { value: "8+", label: "Core technologies" },
  { value: "AI", label: "Workflow support" },
  { value: "BD", label: "Based in Bangladesh" },
];

const coreStack = [
  { name: "Next.js", color: "#20d6b5" },
  { name: "React", color: "#7dd3fc" },
  { name: "TypeScript", color: "#8ea5ff" },
  { name: "JavaScript", color: "#ffcf70" },
  { name: "Node.js", color: "#8bff9c" },
  { name: "Express.js", color: "#a7f3d0" },
  { name: "MongoDB", color: "#70e08f" },
  { name: "PostgreSQL", color: "#8fb7ff" },
  { name: "Prisma", color: "#c4a7ff" },
  { name: "Tailwind CSS", color: "#67e8f9" },
  { name: "JWT", color: "#ff8fc7" },
  { name: "Stripe", color: "#b5a7ff" },
  { name: "Docker", color: "#75b7ff" },
  { name: "Redis", color: "#ff8a7a" },
];

const cursorSparkColors = ["#20d6b5", "#7dd3fc", "#ffb86b", "#ff8fc7"];

const capabilityHighlights = [
  {
    title: "Frontend + backend systems",
    body: "Responsive React and Next.js interfaces connected to backend APIs, authentication, databases, and reliable application states.",
  },
  {
    title: "Backend foundations",
    body: "Node.js APIs, authentication flows, validation, and data access shaped for readable application behavior.",
  },
  {
    title: "Product delivery",
    body: "Practical execution across UI, API, database, integrations, deployment, and review-ready project presentation.",
  },
];

const projects: Project[] = [
  {
    name: "E-Commerce Platform",
    slug: "e-commerce",
    category: "Full-Stack Project",
    accent: "#20d6b5",
    visual: "commerce",
    description:
      "A full-stack commerce build with a separate Next.js frontend, Node.js REST API backend, PostgreSQL or MongoDB integration, Prisma, authentication, and modern product workflows.",
    technologies: [
      "React.js",
      "Next.js",
      "Node.js",
      "TypeScript",
      "JavaScript",
      "MongoDB",
      "PostgreSQL",
      "Prisma",
      "Tailwind CSS",
      "REST API",
      "Authentication",
    ],
    highlights: [
      "Built product, seller, admin, and order-management workflows",
      "Connected frontend interfaces with backend REST APIs",
      "Worked across frontend, API, authentication, and database layers",
      "Applied full-stack architecture with clean service boundaries",
    ],
    repositoryLinks: [
      {
        label: "Frontend",
        href: "https://github.com/asifrayhanjoy/E-Commerce-Frontend.git",
      },
      {
        label: "Backend",
        href: "https://github.com/asifrayhanjoy/E-Commerce-Backend.git",
      },
    ],
    caseStudy: [
      {
        title: "Scope",
        body: "A commerce system built to demonstrate end-to-end product delivery, from UI flows to backend APIs and data handling.",
      },
      {
        title: "System shape",
        body: "The frontend, backend, and persistence layers are separated so the project shows practical API-driven communication and product architecture.",
      },
      {
        title: "Engineering focus",
        body: "The strongest value here is the combination of frontend UX work, backend integration, authentication, and database-backed application logic.",
      },
    ],
  },
  {
    name: "Rentiful",
    slug: "rentful",
    category: "Frontend Project",
    accent: "#7dd3fc",
    visual: "product",
    description:
      "A responsive rental-focused web application built in Next.js with a strong emphasis on reusable components, routed screens, and maintainable frontend architecture.",
    technologies: [
      "Next.js",
      "React.js",
      "TypeScript",
      "Tailwind CSS",
      "Responsive UI",
      "Frontend Architecture",
      "Component Design",
      "Routing",
    ],
    highlights: [
      "Designed a clean rental-focused product experience",
      "Built maintainable frontend structures with reusable components",
      "Focused on responsive layout, usability, and structured UI flows",
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
        body: "A personal project shaped to highlight frontend architecture, product polish, and responsive React/Next.js implementation.",
      },
      {
        title: "System shape",
        body: "The app is structured around reusable UI components, page-level flows, and a clear product-first frontend layout.",
      },
      {
        title: "Engineering focus",
        body: "This project demonstrates strong frontend thinking, clean component boundaries, and attention to real user-facing usability.",
      },
    ],
  },
  {
    name: "Next Thekana",
    slug: "next-thekana",
    category: "Team Project",
    accent: "#7dd3fc",
    visual: "product",
    description:
      "A team-developed rental and service platform focused on property and hostel-related listings, with frontend work, API integration, reusable components, and real-time functionality.",
    technologies: [
      "Next.js",
      "React.js",
      "TypeScript",
      "REST API",
      "WebSocket",
      "Team Collaboration",
    ],
    highlights: [
      "Built responsive interfaces for listing and service workflows",
      "Integrated frontend functionality with backend APIs",
      "Worked with real-time functionality using WebSocket",
      "Collaborated with team members during feature development and debugging",
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
        body: "A collaborative project for a rental and service platform with property- and hostel-related experiences.",
      },
      {
        title: "System shape",
        body: "Responsive UI work and backend integration were handled together to support practical product interactions and shared team delivery.",
      },
      {
        title: "Engineering focus",
        body: "The project strengthened my skills in teamwork, debugging, API integration, and building user-facing functionality in a collaborative environment.",
      },
    ],
  },
  {
    name: "Invoice Generator",
    slug: "invoice-generator",
    category: "Productivity Tool",
    accent: "#ff8fc7",
    visual: "product",
    description:
      "Built a responsive invoice-generation application with reusable components, form-driven workflow handling, and a focused user experience for managing invoice data.",
    technologies: [
      "Next.js",
      "React.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Responsive UI",
      "Reusable Components",
      "Form Handling",
    ],
    highlights: [
      "Developed a smooth invoice workflow with reusable UI patterns",
      "Focused on clean data handling and responsive design",
      "Built a practical productivity tool with maintainable structure",
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
        body: "A focused tool for invoice creation and workflow simplification with an emphasis on usability and structure.",
      },
      {
        title: "System shape",
        body: "The project revolves around reusable components, practical form logic, and a responsive interface built for everyday use.",
      },
      {
        title: "Engineering focus",
        body: "The main value is strong frontend UX design, maintainable component structure, and efficient product presentation.",
      },
    ],
  },
  {
    name: "PH Healthcare",
    slug: "ph-healthcare",
    category: "Healthcare Project",
    accent: "#7dd3fc",
    visual: "product",
    description:
      "A healthcare-focused web application focused on clean user interfaces, data-driven workflows, and practical integration between frontend interactions and backend services.",
    technologies: [
      "Next.js",
      "React.js",
      "TypeScript",
      "Tailwind CSS",
      "REST API",
      "Frontend Integration",
      "Responsive UI",
    ],
    highlights: [
      "Created responsive healthcare-focused interfaces",
      "Connected user-facing functionality with backend services",
      "Improved application workflow behavior through debugging and iteration",
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
        body: "A product-focused healthcare app where the frontend experience and application behavior needed to stay clear and reliable.",
      },
      {
        title: "System shape",
        body: "The work centered on responsive interfaces, data-driven product behavior, and practical frontend-service integration.",
      },
      {
        title: "Engineering focus",
        body: "This project reinforced my ability to build practical application flows with clean UI and dependable integration work.",
      },
    ],
  },
  {
    name: "Blood Donation Platform",
    slug: "blood-donation-platform",
    category: "Team Project",
    accent: "#ff8fc7",
    visual: "product",
    description:
      "A collaborative blood donation platform focused on donor workflows, request handling, and team-driven feature development across frontend and backend integration points.",
    technologies: [
      "Next.js",
      "React.js",
      "TypeScript",
      "MongoDB",
      "Prisma",
      "API Routes",
      "Authentication",
      "Team Collaboration",
    ],
    highlights: [
      "Collaborated on core application features with team members",
      "Supported frontend and backend integration work",
      "Participated in debugging, troubleshooting, and feature refinement",
    ],
    repositoryLinks: [
      {
        label: "GitHub",
        href: "https://github.com/tareqhassan2014/blood-donation.git",
      },
    ],
    caseStudy: [
      {
        title: "Scope",
        body: "A team-based product built around blood donor coordination and request workflows that required reliable application behavior and collaboration.",
      },
      {
        title: "System shape",
        body: "The app blends responsive UI work with API and data-driven functionality to support practical end-user actions.",
      },
      {
        title: "Engineering focus",
        body: "This project is a good example of collaboration, debugging, and applying frontend/backend integration work in a shared project environment.",
      },
    ],
  },
];

const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    icon: Layers3,
    description: "Responsive interfaces and component-driven frontend experiences.",
    skills: [
      { name: "React.js", level: "Core" },
      { name: "Next.js", level: "Core" },
      { name: "JavaScript", level: "Core" },
      { name: "TypeScript", level: "Working" },
      { name: "React Context API", level: "Working" },
      { name: "Redux", level: "Working" },
      { name: "Zustand", level: "Working" },
      { name: "HTML5", level: "Core" },
      { name: "CSS3", level: "Core" },
      { name: "Tailwind CSS", level: "Core" },
    ],
  },
  {
    title: "Backend",
    icon: Server,
    description: "API design, authentication, and service-side application logic.",
    skills: [
      { name: "Node.js", level: "Working" },
      { name: "Express.js", level: "Working" },
      { name: "Python", level: "Working" },
      { name: "NestJS", level: "Working" },
      { name: "Go", level: "Working" },
      { name: "REST API", level: "Core" },
      { name: "WebSocket", level: "Working" },
      { name: "JWT", level: "Working" },
      { name: "Authentication", level: "Working" },
    ],
  },
  {
    title: "AI & RAG",
    icon: Sparkles,
    description: "Practical AI implementation, retrieval workflows, and AI-assisted delivery.",
    skills: [
      { name: "RAG (Retrieval-Augmented Generation)", level: "Working" },
      { name: "LLM Integration", level: "Working" },
      { name: "Embeddings", level: "Working" },
      { name: "Vector Search", level: "Working" },
      { name: "Retrieval Pipelines", level: "Working" },
      { name: "AI-powered Applications", level: "Working" },
      { name: "AI-Assisted Software Development", level: "Working" },
      { name: "Claude Code", level: "Working" },
      { name: "OpenAI Codex", level: "Working" },
      { name: "ChatGPT", level: "Working" },
      { name: "Cursor", level: "Working" },
    ],
  },
  {
    title: "Database",
    icon: Database,
    description: "Relational and document-based persistence with modern ORM patterns.",
    skills: [
      { name: "PostgreSQL", level: "Working" },
      { name: "MongoDB", level: "Working" },
      { name: "Prisma", level: "Working" },
      { name: "Supabase", level: "Working" },
      { name: "Firebase", level: "Working" },
      { name: "Redis", level: "Working" },
    ],
  },
  {
    title: "Architecture",
    icon: BookOpen,
    description: "Service-oriented and scalable system design for growing products.",
    skills: [
      { name: "Microservices", level: "Working" },
      { name: "API Gateway", level: "Working" },
      { name: "Service-based Architecture", level: "Working" },
      { name: "gRPC", level: "Working" },
      { name: "Scalable Web Apps", level: "Working" },
    ],
  },
  {
    title: "Authentication",
    icon: ShieldCheck,
    description: "Secure flows, role-aware access, and identity handling in products.",
    skills: [
      { name: "JWT", level: "Working" },
      { name: "Refresh Token", level: "Working" },
      { name: "RBAC", level: "Working" },
      { name: "OTP Authentication", level: "Working" },
    ],
  },
  {
    title: "Tools & DevOps",
    icon: Wrench,
    description: "Project workflow, source control, deployment, and delivery support.",
    skills: [
      { name: "Git", level: "Working" },
      { name: "GitHub", level: "Working" },
      { name: "Docker", level: "Working" },
      { name: "AWS", level: "Working" },
      { name: "Kubernetes", level: "Working" },
      { name: "Nx Monorepo", level: "Working" },
      { name: "Kafka", level: "Working" },
      { name: "RabbitMQ", level: "Working" },
      { name: "Nginx", level: "Basic" },
      { name: "Vercel", level: "Working" },
      { name: "VS Code", level: "Core" },
    ],
  },
];

const processSteps = [
  {
    step: "01",
    title: "Understand",
    body: "Clarify the workflow, users, data needs, constraints, and success criteria before choosing the implementation path.",
    tags: ["User flow", "Requirements", "Success criteria"],
  },
  {
    step: "02",
    title: "Shape",
    body: "Map the pages, API contracts, database models, authentication flow, and reusable UI structure.",
    tags: ["Architecture", "Data model", "API contracts"],
  },
  {
    step: "03",
    title: "Build",
    body: "Implement the interface, backend logic, validations, integrations, and state flows with practical TypeScript discipline.",
    tags: ["UI systems", "Server logic", "Integrations"],
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

const levelStyles: Record<SkillLevel, string> = {
  Core: "border-(--level-core-border)] bg-(--level-core-bg)] text-(--level-core-text)]",
  Working:
    "border-(--level-working-border)] bg-(--level-working-bg)] text-(--level-working-text)]",
  Learning:
    "border-(--level-learning-border)] bg-(--level-learning-bg)] text-(--level-learning-text)]",
  Basic:
    "border-(--level-basic-border)] bg-(--level-basic-bg)] text-(--level-basic-text)]",
};

const themeStorageKey = "asif-portfolio-theme";
const copyrightYear = 2026;

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function isThemePreference(value: string | null): value is ThemePreference {
  return value === "light" || value === "dark" || value === "system";
}

function getStoredThemePreference(): ThemePreference {
  if (typeof window === "undefined") {
    return "dark";
  }

  try {
    const storedTheme = window.localStorage.getItem(themeStorageKey);
    return isThemePreference(storedTheme) ? storedTheme : "dark";
  } catch {
    return "dark";
  }
}

function getSystemThemeSnapshot(): ResolvedTheme {
  if (typeof window === "undefined" || !window.matchMedia) {
    return "dark";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function subscribeToSystemTheme(onStoreChange: () => void) {
  if (typeof window === "undefined" || !window.matchMedia) {
    return () => {};
  }

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  mediaQuery.addEventListener("change", onStoreChange);

  return () => mediaQuery.removeEventListener("change", onStoreChange);
}

function Github(props: SVGProps<SVGSVGElement>) {
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

function Linkedin(props: SVGProps<SVGSVGElement>) {
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

function useActiveSection() {
  const [activeSection, setActiveSection] = useState(navItems[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-32% 0px -52% 0px",
        threshold: [0.08, 0.24, 0.45],
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

export default function Home() {
  return <PortfolioPage />;
}

function PortfolioPage() {
  const [themePreference, setThemePreference] =
    useState<ThemePreference>(getStoredThemePreference);
  const [cursorSparks, setCursorSparks] = useState<CursorSpark[]>([]);
  const nextSparkId = useRef(0);
  const lastSparkAt = useRef(0);
  const sparkTimeouts = useRef<number[]>([]);
  const systemTheme = useSyncExternalStore(
    subscribeToSystemTheme,
    getSystemThemeSnapshot,
    () => "dark",
  );
  const resolvedTheme =
    themePreference === "system" ? systemTheme : themePreference;
  const activeSection = useActiveSection();

  useEffect(() => {
    try {
      window.localStorage.setItem(themeStorageKey, themePreference);
    } catch {
      // Ignore storage errors in privacy-restricted contexts.
    }
  }, [themePreference]);

  useEffect(() => {
    const timeoutIds = sparkTimeouts.current;

    return () => {
      timeoutIds.forEach((timeoutId) => {
        window.clearTimeout(timeoutId);
      });
    };
  }, []);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") {
      return;
    }

    const now = window.performance.now();

    if (now - lastSparkAt.current < 46) {
      return;
    }

    lastSparkAt.current = now;

    const sparkId = nextSparkId.current;
    nextSparkId.current += 1;

    const spark: CursorSpark = {
      id: sparkId,
      x: event.clientX,
      y: event.clientY,
      color: cursorSparkColors[sparkId % cursorSparkColors.length],
      size: 5 + (sparkId % 3) * 2,
      driftX: Math.round((Math.random() - 0.5) * 34),
      driftY: Math.round((Math.random() - 0.5) * 34),
    };

    setCursorSparks((currentSparks) => [...currentSparks.slice(-13), spark]);

    const timeoutId = window.setTimeout(() => {
      setCursorSparks((currentSparks) =>
        currentSparks.filter((item) => item.id !== spark.id),
      );
    }, 760);

    sparkTimeouts.current.push(timeoutId);
  };

  const handlePointerLeave = () => {
    setCursorSparks([]);
  };

  const structuredData = {
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
      "MongoDB",
      "PostgreSQL",
      "Prisma",
    ],
  };

  return (
    <div
      className="portfolio-page min-h-screen overflow-x-hidden bg-(--portfolio-bg)] pb-24 text-(--portfolio-text)] lg:pb-0"
      data-theme={resolvedTheme}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
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
      <Header
        activeSection={activeSection}
        themePreference={themePreference}
        onThemeChange={setThemePreference}
      />
      <SideRail activeSection={activeSection} />
      <MobileDock activeSection={activeSection} />

      <main className="relative z-10">
        <HeroSection />
        <StackRibbon />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <AiCapabilitiesSection />
        <ProcessSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}

function Header({
  activeSection,
  themePreference,
  onThemeChange,
}: {
  activeSection: string;
  themePreference: ThemePreference;
  onThemeChange: (theme: ThemePreference) => void;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const updateScrolled = () => setIsScrolled(window.scrollY > 18);

    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });

    return () => window.removeEventListener("scroll", updateScrolled);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-all duration-300",
        isScrolled
          ? "border-(--portfolio-line)] bg-(--portfolio-nav)] shadow-[0_18px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl"
          : "border-transparent bg-transparent",
      )}
    >
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <a
          href="#home"
          onClick={closeMenu}
          className="group inline-flex min-w-0 items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--portfolio-ring)]"
        >
          <span className="grid size-11 shrink-0 place-items-center rounded-lg border border-(--portfolio-line-strong)] bg-(--portfolio-text)] font-mono text-sm font-black text-(--portfolio-bg)] shadow-[0_0_28px_var(--portfolio-glow)]">
            AR
          </span>
          <span className="hidden min-w-0 leading-none sm:block">
            <span className="block truncate font-mono text-base font-black tracking-wide">
              ASIF.dev
            </span>
            <span className="mt-1 block truncate text-xs font-semibold uppercase tracking-[0.18em] text-(--portfolio-muted)]">
              Full-stack portfolio
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-1 rounded-lg border border-(--portfolio-line)] bg-(--portfolio-surface-raised)] p-1 shadow-sm backdrop-blur md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--portfolio-ring)]",
                activeSection === item.id
                  ? "bg-(--portfolio-accent)] text-(--portfolio-accent-contrast)]"
                  : "text-(--portfolio-muted)] hover:text-(--portfolio-text)]",
              )}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeSwitcher
            themePreference={themePreference}
            onThemeChange={onThemeChange}
          />
          <a
            href={personal.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
            className="hidden size-10 place-items-center rounded-lg border border-(--portfolio-line)] bg-(--portfolio-surface-raised)] text-(--portfolio-muted)] transition hover:border-(--portfolio-line-strong)] hover:text-(--portfolio-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--portfolio-ring)] sm:grid"
          >
            <Github className="size-4" aria-hidden="true" />
          </a>
          <a
            href="#contact"
            className="hidden min-h-10 items-center gap-2 rounded-lg bg-(--portfolio-text)] px-4 text-sm font-black text-(--portfolio-bg)] shadow-sm transition hover:bg-(--portfolio-accent)] hover:text-(--portfolio-accent-contrast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--portfolio-ring)] lg:inline-flex"
          >
            Hire Me
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
          <button
            type="button"
            aria-label="Open navigation menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((value) => !value)}
            className="grid size-10 place-items-center rounded-lg border border-(--portfolio-line)] bg-(--portfolio-surface-raised)] text-(--portfolio-text)] transition hover:border-(--portfolio-line-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--portfolio-ring)] md:hidden"
          >
            {isMenuOpen ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            className="fixed inset-x-4 top-24 z-50 rounded-lg border border-(--portfolio-line)] bg-(--portfolio-surface-raised)] p-3 shadow-(--portfolio-shadow)] backdrop-blur-xl md:hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18 }}
          >
            <div className="grid gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className={cn(
                      "flex min-h-12 items-center gap-3 rounded-md px-4 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--portfolio-ring)]",
                      activeSection === item.id
                        ? "bg-(--portfolio-accent)] text-(--portfolio-accent-contrast)]"
                        : "text-(--portfolio-muted)] hover:bg-(--portfolio-surface-muted)] hover:text-(--portfolio-text)]",
                    )}
                  >
                    <Icon className="size-4" aria-hidden="true" />
                    {item.label}
                  </a>
                );
              })}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

function ThemeSwitcher({
  themePreference,
  onThemeChange,
}: {
  themePreference: ThemePreference;
  onThemeChange: (theme: ThemePreference) => void;
}) {
  const options = [
    { value: "dark" as const, label: "Dark", icon: Moon },
    { value: "light" as const, label: "Light", icon: Sun },
    { value: "system" as const, label: "System", icon: Monitor },
  ];

  return (
    <div
      role="group"
      aria-label="Theme preference"
      className="hidden rounded-lg border border-(--portfolio-line)] bg-(--portfolio-surface-raised)] p-1 shadow-sm backdrop-blur sm:flex"
    >
      {options.map((option) => {
        const Icon = option.icon;
        const isActive = themePreference === option.value;

        return (
          <button
            key={option.value}
            type="button"
            aria-label={`${option.label} theme`}
            aria-pressed={isActive}
            onClick={() => onThemeChange(option.value)}
            className={cn(
              "grid size-8 place-items-center rounded-md text-(--portfolio-muted)] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--portfolio-ring)]",
              isActive &&
                "bg-(--portfolio-accent)] text-(--portfolio-accent-contrast)] shadow-sm",
            )}
          >
            <Icon className="size-4" aria-hidden="true" />
          </button>
        );
      })}
    </div>
  );
}

function SideRail({ activeSection }: { activeSection: string }) {
  return (
    <aside
      aria-label="Section shortcuts"
      className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 rounded-lg border border-(--portfolio-line)] bg-(--portfolio-surface-raised)] p-2 shadow-(--portfolio-shadow)] backdrop-blur-xl lg:flex lg:flex-col lg:gap-2"
    >
      {navItems.map((item) => {
        const Icon = item.icon;

        return (
          <a
            key={item.href}
            href={item.href}
            aria-label={item.label}
            className={cn(
              "group relative grid size-11 place-items-center rounded-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--portfolio-ring)]",
              activeSection === item.id
                ? "bg-(--portfolio-accent)] text-(--portfolio-accent-contrast)]"
                : "bg-(--portfolio-surface-muted)] text-(--portfolio-muted)] hover:text-(--portfolio-text)]",
            )}
          >
            <Icon className="size-5" aria-hidden="true" />
            <span className="pointer-events-none absolute left-14 top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-md border border-(--portfolio-line)] bg-(--portfolio-surface)] px-3 py-2 text-xs font-bold text-(--portfolio-text)] shadow-sm group-hover:block">
              {item.label}
            </span>
          </a>
        );
      })}
    </aside>
  );
}

function MobileDock({ activeSection }: { activeSection: string }) {
  const mobileItems = [navItems[0], navItems[1], navItems[2], navItems[4]];

  return (
    <nav
      aria-label="Mobile shortcuts"
      className="fixed inset-x-3 bottom-3 z-50 grid grid-cols-4 gap-1 rounded-lg border border-(--portfolio-line)] bg-(--portfolio-surface-raised)] p-1 shadow-(--portfolio-shadow)] backdrop-blur-xl lg:hidden"
    >
      {mobileItems.map((item) => {
        const Icon = item.icon;

        return (
          <a
            key={item.href}
            href={item.href}
            className={cn(
              "grid min-h-14 place-items-center rounded-md px-1 text-[11px] font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--portfolio-ring)]",
              activeSection === item.id
                ? "bg-(--portfolio-accent)] text-(--portfolio-accent-contrast)]"
                : "text-(--portfolio-muted)]",
            )}
          >
            <Icon className="mb-1 size-4" aria-hidden="true" />
            <span className="max-w-full truncate">{item.label}</span>
          </a>
        );
      })}
    </nav>
  );
}

function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="portfolio-section relative isolate overflow-hidden border-b border-(--portfolio-line)] px-4 pt-28 sm:px-6 lg:px-8"
    >
      <div className="absolute inset-0 -z-30" aria-hidden="true">
        <Image
          src="/portfolio-hero-abstract.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[64%_50%]"
        />
      </div>
      <div className="absolute inset-0 -z-20 bg-(--portfolio-hero-overlay)]" />
      <div className="absolute inset-0 -z-10 bg-(--portfolio-grid)] opacity-45" />

      <div className="mx-auto grid min-h-[78svh] w-full max-w-7xl items-center gap-10 pb-14 pt-10 lg:grid-cols-[1fr_0.78fr]">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-3 rounded-lg border border-(--portfolio-line)] bg-(--portfolio-surface-raised)] px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-(--portfolio-muted)] shadow-sm backdrop-blur">
            <span className="grid size-2.5 place-items-center rounded-full bg-(--portfolio-success)] shadow-[0_0_18px_var(--portfolio-success)]" />
            Open to full-stack web roles
          </div>

          <p className="mt-8 text-sm font-bold uppercase tracking-[0.2em] text-(--portfolio-accent)]">
            {personal.title}
          </p>
          <h1 className="mt-4 max-w-5xl break-words text-5xl font-semibold leading-[1.04] text-(--portfolio-text)] sm:text-6xl lg:text-7xl">
            {personal.name}
          </h1>
          <p className="mt-6 max-w-2xl text-xl font-semibold leading-8 text-(--portfolio-text)] sm:text-2xl sm:leading-9">
            Building modern web applications across the frontend and backend with
            React.js, Next.js, TypeScript, Node.js APIs, databases, and
            AI-assisted development tools.
          </p>
          <p className="mt-5 max-w-2xl text-base leading-8 text-(--portfolio-muted)]">
            I design responsive interfaces and develop the server-side systems
            behind them, including REST APIs, authentication, database workflows,
            and practical product delivery while staying adaptable when learning
            unfamiliar codebases and tools.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <PrimaryLink href="#projects" icon={ArrowRight}>
              View Projects
            </PrimaryLink>
            <SecondaryLink href={personal.github} icon={Github} external>
              GitHub
            </SecondaryLink>
            <SecondaryLink href={personal.linkedin} icon={Linkedin} external>
              LinkedIn
            </SecondaryLink>
            <SecondaryLink href="#contact" icon={Mail}>
              Contact
            </SecondaryLink>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold text-(--portfolio-muted)]">
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-4 text-(--portfolio-accent)]" />
              {personal.location}
            </span>
            <a
              href={`mailto:${personal.email}`}
              className="inline-flex items-center gap-2 transition hover:text-(--portfolio-text)]"
            >
              <Mail className="size-4 text-(--portfolio-warm)]" />
              {personal.email}
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.08, ease: "easeOut" }}
          className="hidden lg:block"
        >
          <DeveloperPanel />
        </motion.div>
      </div>
    </section>
  );
}

function DeveloperPanel() {
  return (
    <div className="rounded-lg border border-(--portfolio-line)] bg-(--portfolio-panel)] p-4 shadow-(--portfolio-shadow)] backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-(--portfolio-line)] pb-4">
        <div className="flex items-center gap-2">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#ffbd2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="font-mono text-xs font-black uppercase tracking-[0.18em] text-(--portfolio-muted)]">
          portfolio.tsx
        </span>
      </div>

      <div className="mt-5 grid gap-4">
        <div className="rounded-lg border border-(--portfolio-line)] bg-(--portfolio-surface)] p-4">
          <p className="font-mono text-xs font-black uppercase tracking-[0.18em] text-(--portfolio-accent)]">
            Current focus
          </p>
          <p className="mt-3 text-2xl font-black">{personal.title}</p>
          <p className="mt-3 text-sm leading-7 text-(--portfolio-muted)]">
            Building full-stack products with practical architecture, clean UI,
            authentication, data models, and API boundaries.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {heroStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-(--portfolio-line)] bg-(--portfolio-surface)] p-4"
            >
              <p className="font-mono text-3xl font-black text-(--portfolio-text)]">
                {stat.value}
              </p>
              <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-(--portfolio-muted)]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-lg border border-(--portfolio-line)] bg-(--portfolio-surface)] p-4">
          <div className="flex items-center justify-between">
            <p className="font-mono text-xs font-black uppercase tracking-[0.18em] text-(--portfolio-warm)]">
              Stack map
            </p>
            <Sparkles
              className="size-4 text-(--portfolio-warm)]"
              aria-hidden="true"
            />
          </div>
          <div className="mt-4 space-y-3">
            {[
              ["Client", "React / Next.js / Tailwind"],
              ["Server", "Node.js / API Routes / Auth"],
              ["Data", "Prisma / PostgreSQL / MongoDB"],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center gap-3">
                <span className="w-16 font-mono text-xs font-black uppercase tracking-[0.14em] text-(--portfolio-muted)]">
                  {label}
                </span>
                <span className="h-px flex-1 bg-(--portfolio-line)]" />
                <span className="text-right text-sm font-bold">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StackRibbon() {
  const marqueeStack = [...coreStack, ...coreStack];

  return (
    <section className="border-b border-(--portfolio-line)] bg-(--portfolio-bg)] px-4 py-9 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center gap-4">
          <p className="shrink-0 text-xs font-black uppercase tracking-[0.16em] text-(--portfolio-muted)]">
            Core technologies
          </p>
          <span className="h-px flex-1 bg-(--portfolio-line)]" />
        </div>
        <div className="portfolio-marquee-shell mt-6 py-3">
          <div className="portfolio-marquee-track flex gap-4 pr-4">
            {marqueeStack.map((item, index) => (
              <div
                key={`${item.name}-${index}`}
                className="tech-pill flex min-h-16 min-w-[12rem] items-center justify-center rounded-lg border px-5 text-center text-sm font-black uppercase tracking-[0.04em] sm:min-w-[13.5rem]"
                style={{ "--tech-color": item.color } as CSSProperties}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="Frontend and backend development with a polished product finish."
      description="A portfolio built around real project work, honest skill levels, and complete application development from interface to server and data layer."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.76fr] lg:items-start">
        <div className="space-y-6 text-base leading-8 text-(--portfolio-muted)]">
          <p>
            Full-stack web developer focused on building responsive, modern
            applications with React.js, Next.js, TypeScript, JavaScript, Node.js,
            REST APIs, databases, authentication flows, and clean product UX.
          </p>
          <p>
            I develop both the user-facing frontend and the backend systems that
            power it, including API integration, database-driven workflows,
            authentication, and AI-assisted development. I am also comfortable
            learning unfamiliar codebases and tools quickly, which helps me adapt
            to new technical environments and solve real product problems.
          </p>
          <p>
            I bring approximately 1 year of team leadership and coordination
            experience, collaborating with team members, coordinating development
            tasks, supporting problem solving, and helping maintain momentum on
            project work.
          </p>

          <div className="grid gap-3 pt-2 sm:grid-cols-2">
            {[
              "Responsive frontend architecture",
              "Full-stack API and database integration",
              "Authentication and authorization flows",
              "Fast learning in new codebases and tools",
              "AI-assisted development workflows",
              "Team coordination and collaborative delivery",
            ].map((item) => (
              <div
                key={item}
                className="flex min-h-14 items-center gap-3 border-t border-(--portfolio-line)] py-3 text-sm font-bold text-(--portfolio-text)]"
              >
                <CheckCircle2
                  className="size-4 shrink-0 text-(--portfolio-success)]"
                  aria-hidden="true"
                />
                {item}
              </div>
            ))}
          </div>
        </div>

        <aside className="rounded-lg border border-(--portfolio-line)] bg-(--portfolio-surface)] p-5 shadow-(--portfolio-shadow)]">
          <div className="flex items-center gap-4 border-b border-(--portfolio-line)] pb-5">
            <div className="grid size-14 shrink-0 place-items-center rounded-lg bg-(--portfolio-accent)] font-mono text-lg font-black text-(--portfolio-accent-contrast)]">
              AR
            </div>
            <div className="min-w-0">
              <p className="truncate text-lg font-black">{personal.name}</p>
              <p className="mt-1 text-sm font-semibold text-(--portfolio-muted)]">
                {personal.title}
              </p>
            </div>
          </div>
          <div className="mt-5 space-y-4 text-sm">
            <InfoRow icon={MapPin} label="Location" value={personal.location} />
            <InfoRow icon={Mail} label="Email" value={personal.email} />
            <InfoRow icon={Phone} label="Phone" value={personal.phone} />
            <InfoRow icon={Github} label="GitHub" value="asifrayhanjoy" />
          </div>
        </aside>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {capabilityHighlights.map((item) => (
          <article
            key={item.title}
            className="rounded-lg border border-(--portfolio-line)] bg-(--portfolio-surface)] p-5 shadow-sm"
          >
            <h3 className="text-xl font-black">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-(--portfolio-muted)]">
              {item.body}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}

function ProjectsSection() {
  return (
    <Section
      id="projects"
      eyebrow="Selected Work"
      title="Full-stack projects with clear architecture and review-ready detail."
      description="Each case study is grounded in your actual repositories, stack, and project boundaries."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      <div className="mt-12 grid gap-5">
        {projects.map((project) => (
          <ProjectCaseStudy key={project.slug} project={project} />
        ))}
      </div>
    </Section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      className="flex h-full flex-col overflow-hidden rounded-lg border border-(--portfolio-line)] bg-(--portfolio-surface)] shadow-(--portfolio-shadow)]"
      style={{ "--project-accent": project.accent } as CSSProperties}
      whileHover={shouldReduceMotion ? undefined : { y: -5 }}
      transition={{ duration: 0.18 }}
    >
      <ProjectVisual project={project} />
      <div className="flex flex-1 flex-col p-6">
        <p className="font-mono text-xs font-black uppercase tracking-[0.18em] text-(--project-accent)]">
          {project.category}
        </p>
        <h3 className="mt-3 font-mono text-3xl font-black">{project.name}</h3>
        <p className="mt-4 text-sm leading-7 text-(--portfolio-muted)]">
          {project.description}
        </p>

        <div className="mt-6 space-y-3">
          {project.highlights.map((highlight) => (
            <div
              key={highlight}
              className="flex gap-3 text-sm font-semibold leading-6 text-(--portfolio-text)]"
            >
              <CheckCircle2
                className="mt-0.5 size-4 shrink-0 text-(--project-accent)]"
                aria-hidden="true"
              />
              <span>{highlight}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <span
              key={technology}
              className="rounded-md border border-(--portfolio-line)] bg-(--portfolio-surface-muted)] px-2.5 py-1.5 text-xs font-bold text-(--portfolio-muted)]"
            >
              {technology}
            </span>
          ))}
        </div>

        <div className="mt-7 flex flex-wrap gap-3">
          {project.repositoryLinks.map((link) => (
            <SecondaryLink
              key={link.href}
              href={link.href}
              icon={Github}
              external
            >
              {link.label}
            </SecondaryLink>
          ))}
          {project.liveDemo ? (
            <SecondaryLink href={project.liveDemo} icon={ExternalLink} external>
              Live Demo
            </SecondaryLink>
          ) : (
            <span className="inline-flex min-h-11 cursor-not-allowed items-center justify-center gap-2 rounded-lg border border-(--portfolio-line)] px-4 text-sm font-bold text-(--portfolio-subtle)] opacity-75">
              <ExternalLink className="size-4" aria-hidden="true" />
              Demo Pending
            </span>
          )}
          <PrimaryLink href={`#project-${project.slug}`} icon={ArrowRight}>
            Details
          </PrimaryLink>
        </div>
      </div>
    </motion.article>
  );
}

function ProjectVisual({ project }: { project: Project }) {
  return (
    <div
      className="relative aspect-[16/10] overflow-hidden border-b border-(--portfolio-line)] bg-(--project-visual-bg)]"
      role="img"
      aria-label={`${project.name} interface concept`}
    >
      <div className="absolute inset-0 bg-(--project-visual-grid)]" />
      <div className="relative z-10 flex h-full flex-col p-4">
        <div className="flex items-center justify-between border-b border-(--project-visual-line)] pb-3">
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
          </div>
          <span className="font-mono text-[10px] font-black uppercase tracking-[0.16em] text-(--project-visual-muted)]">
            {project.visual === "commerce" ? "Commerce System" : "Product App"}
          </span>
        </div>

        {project.visual === "commerce" ? <CommerceMockup /> : <AppMockup />}
      </div>
    </div>
  );
}

function CommerceMockup() {
  return (
    <div className="mt-4 grid min-h-0 flex-1 grid-cols-[0.8fr_1.2fr_0.9fr] gap-3">
      <div className="space-y-2 border-r border-(--project-visual-line)] pr-3">
        {["Catalog", "Orders", "Users", "API"].map((item, index) => (
          <div
            key={item}
            className={cn(
              "h-7 rounded-md border border-(--project-visual-line)] px-2 py-1 font-mono text-[10px] font-black text-(--project-visual-muted)]",
              index === 0 && "bg-(--project-visual-accent-soft)]",
            )}
          >
            {item}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[0, 1, 2, 3].map((item) => (
          <div
            key={item}
            className="rounded-lg border border-(--project-visual-line)] bg-(--project-visual-panel)] p-3"
          >
            <div className="h-10 rounded-md bg-(--project-visual-accent-soft)]" />
            <div className="mt-3 h-2 rounded-full bg-(--project-visual-line)]" />
            <div className="mt-2 h-2 w-2/3 rounded-full bg-(--project-visual-line)]" />
          </div>
        ))}
      </div>
      <div className="rounded-lg border border-(--project-visual-line)] bg-(--project-visual-panel)] p-3">
        <p className="font-mono text-[10px] font-black uppercase tracking-[0.14em] text-(--project-visual-muted)]">
          API Flow
        </p>
        <div className="mt-4 space-y-3">
          {["Client", "REST", "Prisma", "MongoDB"].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-(--project-accent)]" />
              <span className="h-2 flex-1 rounded-full bg-(--project-visual-line)]" />
              <span className="w-14 font-mono text-[10px] font-black text-(--project-visual-muted)]">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AppMockup() {
  return (
    <div className="mt-4 grid min-h-0 flex-1 grid-cols-[1fr_0.9fr] gap-3">
      <div className="rounded-lg border border-(--project-visual-line)] bg-(--project-visual-panel)] p-3">
        <div className="flex h-24 items-end gap-2">
          {[44, 70, 52, 86, 64, 92].map((height, index) => (
            <span
              key={height + index}
              className="w-full rounded-t bg-(--project-accent)] opacity-80"
              style={{ height }}
            />
          ))}
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {["Auth", "Stripe", "API"].map((item) => (
            <div
              key={item}
              className="rounded-md border border-(--project-visual-line)] bg-(--project-visual-accent-soft)] px-2 py-2 text-center font-mono text-[10px] font-black text-(--project-visual-muted)]"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-3">
        <div className="rounded-lg border border-(--project-visual-line)] bg-(--project-visual-panel)] p-3">
          <p className="font-mono text-[10px] font-black uppercase tracking-[0.14em] text-(--project-visual-muted)]">
            Data Layer
          </p>
          <div className="mt-4 h-20 rounded-md bg-(--project-visual-accent-soft)]" />
        </div>
        <div className="rounded-lg border border-(--project-visual-line)] bg-(--project-visual-panel)] p-3">
          <div className="h-2 w-3/4 rounded-full bg-(--project-visual-line)]" />
          <div className="mt-2 h-2 w-1/2 rounded-full bg-(--project-visual-line)]" />
          <div className="mt-4 h-8 rounded-md bg-(--portfolio-warm)] opacity-85" />
        </div>
      </div>
    </div>
  );
}

function ProjectCaseStudy({ project }: { project: Project }) {
  return (
    <article
      id={`project-${project.slug}`}
      className="portfolio-section rounded-lg border border-(--portfolio-line)] bg-(--portfolio-surface)] p-6 shadow-sm"
      style={{ "--project-accent": project.accent } as CSSProperties}
    >
      <div className="grid gap-6 lg:grid-cols-[0.72fr_1fr]">
        <div>
          <p className="font-mono text-sm font-black uppercase tracking-[0.18em] text-(--project-accent)]">
            Case Study
          </p>
          <h3 className="mt-3 font-mono text-3xl font-black">
            {project.name}
          </h3>
          <p className="mt-4 text-sm leading-7 text-(--portfolio-muted)]">
            {project.description}
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {project.caseStudy.map((block) => (
            <div
              key={block.title}
              className="border-t border-(--portfolio-line)] pt-4"
            >
              <h4 className="text-base font-black">{block.title}</h4>
              <p className="mt-3 text-sm leading-7 text-(--portfolio-muted)]">
                {block.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

function SkillsSection() {
  return (
    <Section
      id="skills"
      eyebrow="Technical Stack"
      title="A focused toolkit with honest skill levels."
      description="Core strengths are separated from working, learning, and basic technologies so the portfolio reads clearly in technical review."
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {skillGroups.map((group) => {
          const Icon = group.icon;

          return (
            <article
              key={group.title}
              className="rounded-lg border border-(--portfolio-line)] bg-(--portfolio-surface)] p-5 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-(--portfolio-accent-soft)] text-(--portfolio-accent)]">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-mono text-lg font-black">
                    {group.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-(--portfolio-muted)]">
                    {group.description}
                  </p>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-md border px-2.5 py-1.5 text-xs font-bold",
                      levelStyles[skill.level],
                    )}
                  >
                    {skill.name}
                    <span className="font-mono text-[10px] uppercase tracking-wide opacity-75">
                      {skill.level}
                    </span>
                  </span>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}

function ProcessSection() {
  return (
    <section
      id="process"
      className="portfolio-section relative overflow-hidden border-y border-(--portfolio-line)] bg-(--portfolio-inverse)] px-4 py-16 text-(--portfolio-inverse-text)] sm:px-6 sm:py-20 lg:px-8"
    >
      <div className="absolute inset-0 bg-(--portfolio-grid)] opacity-30" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-12 grid gap-6 lg:grid-cols-[0.78fr_1fr] lg:items-end">
          <div>
            <p className="font-mono text-sm font-black uppercase tracking-[0.18em] text-(--portfolio-warm)]">
              Development Process
            </p>
            <h2 className="mt-3 max-w-3xl font-mono text-3xl font-black leading-tight sm:text-4xl">
              A disciplined workflow for turning requirements into reliable
              products.
            </h2>
          </div>
          <p className="max-w-3xl text-base leading-8 text-(--portfolio-inverse-muted)]">
            Each project moves through the same sequence: clarify the problem,
            shape the system, build the product, and refine the result until it
            is easier to use and easier to explain.
          </p>
        </div>

        <div className="grid gap-px overflow-hidden rounded-lg border border-(--portfolio-inverse-line)] bg-(--portfolio-inverse-line)] md:grid-cols-2 xl:grid-cols-4">
          {processSteps.map((item) => (
            <article
              key={item.step}
              className="bg-(--portfolio-inverse)] p-6"
            >
              <p className="font-mono text-sm font-black text-(--portfolio-warm)]">
                {item.step}
              </p>
              <h3 className="mt-5 font-mono text-2xl font-black">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-(--portfolio-inverse-muted)]">
                {item.body}
              </p>
              <div className="mt-6 space-y-2 border-t border-(--portfolio-inverse-line)] pt-4">
                {item.tags.map((tag) => (
                  <div
                    key={tag}
                    className="flex items-center gap-2 text-sm font-bold"
                  >
                    <CheckCircle2
                      className="size-4 shrink-0 text-(--portfolio-warm)]"
                      aria-hidden="true"
                    />
                    {tag}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <Section
      id="experience"
      eyebrow="Experience & Background"
      title="A practical developer profile shaped by projects, collaboration, and adaptability."
      description="My experience is grounded in frontend delivery, full-stack problem solving, and team coordination rather than unsupported claims."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <article className="rounded-lg border border-(--portfolio-line)] bg-(--portfolio-surface)] p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-lg bg-(--portfolio-accent-soft)] text-(--portfolio-accent)]">
              <Briefcase className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="font-mono text-sm font-black uppercase tracking-[0.16em] text-(--portfolio-accent)]">
                Team Leadership / Coordination
              </p>
              <h3 className="mt-1 text-xl font-black">
                Approximately 1 year of coordination experience
              </h3>
            </div>
          </div>
          <p className="mt-6 text-sm leading-7 text-(--portfolio-muted)]">
            Collaborated with team members, coordinated development activities,
            supported problem solving, and helped maintain project progress in a
            shared workflow. This experience strengthened my ability to work
            effectively with others, communicate clearly, and keep work moving
            forward.
          </p>
        </article>

        <article className="rounded-lg border border-(--portfolio-line)] bg-(--portfolio-surface)] p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-lg bg-(--portfolio-warm-soft)] text-(--portfolio-warm)]">
              <Rocket className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="font-mono text-sm font-black uppercase tracking-[0.16em] text-(--portfolio-warm)]">
                Learning & Adaptability
              </p>
              <h3 className="mt-1 text-xl font-black">
                Fast learner in unfamiliar environments
              </h3>
            </div>
          </div>
          <p className="mt-6 text-sm leading-7 text-(--portfolio-muted)]">
            I learn new frameworks, APIs, and codebases quickly and can adapt to
            unfamiliar technical environments. I also use AI-assisted tools to
            explore, debug, refactor, and understand complex systems while
            keeping engineering judgment and product context in focus.
          </p>
        </article>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <article className="rounded-lg border border-(--portfolio-line)] bg-(--portfolio-surface)] p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-lg bg-(--portfolio-accent-soft)] text-(--portfolio-accent)]">
              <GraduationCap className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="font-mono text-sm font-black uppercase tracking-[0.16em] text-(--portfolio-accent)]">
                Education
              </p>
              <h3 className="mt-1 text-xl font-black">
                Satkhira Government College
              </h3>
            </div>
          </div>
          <p className="mt-6 text-base font-bold">
            Honours in English
          </p>
          <p className="mt-2 text-sm text-(--portfolio-muted)]">
            Satkhira, Bangladesh
          </p>
          <p className="mt-3 text-sm text-(--portfolio-muted)]">
            Currently studying.
          </p>
        </article>

        <article className="rounded-lg border border-(--portfolio-line)] bg-(--portfolio-surface)] p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-lg bg-(--portfolio-warm-soft)] text-(--portfolio-warm)]">
              <FileText className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="font-mono text-sm font-black uppercase tracking-[0.16em] text-(--portfolio-warm)]">
                Project Experience
              </p>
              <h3 className="mt-1 text-xl font-black">
                Frontend, full-stack, and team projects
              </h3>
            </div>
          </div>
          <p className="mt-6 text-sm leading-7 text-(--portfolio-muted)]">
            Practical experience across e-commerce, rental, healthcare, and team
            collaboration projects, with work spanning UI implementation,
            backend integration, auth flows, databases, and debugging.
          </p>
        </article>
      </div>

      <div className="mt-6 rounded-lg border border-(--portfolio-line)] bg-(--portfolio-surface)] p-6 shadow-sm">
        <p className="font-mono text-sm font-black uppercase tracking-[0.16em] text-(--portfolio-accent)]">
          Core Strengths
        </p>
        <ul className="mt-5 grid gap-3 text-sm leading-7 text-(--portfolio-muted)] md:grid-cols-2">
          {[
            "React.js and Next.js frontend development",
            "Full-stack API and database integration",
            "Authentication, JWT, and application workflows",
            "Database-backed product development",
            "Collaborative project delivery",
            "AI-assisted debugging and implementation",
            "Clean, maintainable architecture",
            "Problem solving across frontend and backend boundaries",
          ].map((item) => (
            <li key={item} className="flex gap-3">
              <CheckCircle2
                className="mt-1 size-4 shrink-0 text-(--portfolio-success)]"
                aria-hidden="true"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {languages.map((language) => (
          <article
            key={language.name}
            className="rounded-lg border border-(--portfolio-line)] bg-(--portfolio-surface)] p-5 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <Languages
                className="size-5 text-(--portfolio-accent)]"
                aria-hidden="true"
              />
              <h3 className="font-mono text-lg font-black">{language.name}</h3>
            </div>
            <p className="mt-3 text-sm leading-6 text-(--portfolio-muted)]">
              {language.level}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}

function AiCapabilitiesSection() {
  return (
    <Section
      id="ai-capabilities"
      eyebrow="AI & RAG"
      title="AI-assisted software development with practical application focus."
      description="I work with AI development workflows to accelerate code exploration, debugging, refactoring, prototyping, and feature delivery without replacing engineering judgment."
    >
      <div className="grid gap-5 md:grid-cols-3">
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
          <article
            key={item.title}
            className="rounded-lg border border-(--portfolio-line)] bg-(--portfolio-surface)] p-5 shadow-sm"
          >
            <h3 className="font-mono text-xl font-black">{item.title}</h3>
            <p className="mt-4 text-sm leading-7 text-(--portfolio-muted)]">
              {item.body}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}

function ContactSection() {
  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Open to roles, projects, and technical conversations."
      description="Reach out for job opportunities, collaboration, interview follow-ups, or project discussions."
    >
      <div className="grid gap-8 lg:grid-cols-[0.72fr_1fr]">
        <div className="space-y-4">
          <ContactMethod
            icon={Mail}
            label="Email"
            value={personal.email}
            href={`mailto:${personal.email}`}
          />
          <ContactMethod
            icon={Phone}
            label="Phone"
            value={personal.phone}
            href={`tel:${personal.phone}`}
          />
          <ContactMethod
            icon={Github}
            label="GitHub"
            value="github.com/asifrayhanjoy"
            href={personal.github}
            external
          />
          <ContactMethod
            icon={Linkedin}
            label="LinkedIn"
            value="linkedin.com/in/md-asif-rayhan-joy-4177372a4"
            href={personal.linkedin}
            external
          />
        </div>
        <ContactForm />
      </div>
    </Section>
  );
}

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
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

  const onSubmit: SubmitHandler<ContactFormValues> = (values) => {
    const subject = encodeURIComponent(values.subject);
    const body = encodeURIComponent(
      `Name: ${values.name}\nEmail: ${values.email}\n\n${values.message}`,
    );

    setSubmitted(true);
    window.location.assign(
      `mailto:${personal.email}?subject=${subject}&body=${body}`,
    );
    reset();
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-lg border border-(--portfolio-line)] bg-(--portfolio-surface)] p-5 shadow-(--portfolio-shadow)] sm:p-6"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold" htmlFor="name">
          Name
          <input
            id="name"
            type="text"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            className="min-h-12 rounded-lg border border-(--portfolio-line)] bg-(--portfolio-input)] px-4 text-sm font-semibold text-(--portfolio-text)] outline-none transition placeholder:text-(--portfolio-subtle)] focus:border-(--portfolio-accent)] focus:ring-4 focus:ring-(--portfolio-ring)]"
            placeholder="Your name"
            {...register("name")}
          />
          {errors.name?.message ? (
            <span className="text-xs font-semibold text-(--portfolio-danger)]">
              {errors.name.message}
            </span>
          ) : null}
        </label>

        <label className="grid gap-2 text-sm font-bold" htmlFor="email">
          Email
          <input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            className="min-h-12 rounded-lg border border-(--portfolio-line)] bg-(--portfolio-input)] px-4 text-sm font-semibold text-(--portfolio-text)] outline-none transition placeholder:text-(--portfolio-subtle)] focus:border-(--portfolio-accent)] focus:ring-4 focus:ring-(--portfolio-ring)]"
            placeholder="you@example.com"
            {...register("email")}
          />
          {errors.email?.message ? (
            <span className="text-xs font-semibold text-(--portfolio-danger)]">
              {errors.email.message}
            </span>
          ) : null}
        </label>
      </div>

      <label className="mt-4 grid gap-2 text-sm font-bold" htmlFor="subject">
        Subject
        <input
          id="subject"
          type="text"
          aria-invalid={Boolean(errors.subject)}
          className="min-h-12 rounded-lg border border-(--portfolio-line)] bg-(--portfolio-input)] px-4 text-sm font-semibold text-(--portfolio-text)] outline-none transition placeholder:text-(--portfolio-subtle)] focus:border-(--portfolio-accent)] focus:ring-4 focus:ring-(--portfolio-ring)]"
          placeholder="Project, role, or opportunity"
          {...register("subject")}
        />
        {errors.subject?.message ? (
          <span className="text-xs font-semibold text-(--portfolio-danger)]">
            {errors.subject.message}
          </span>
        ) : null}
      </label>

      <label className="mt-4 grid gap-2 text-sm font-bold" htmlFor="message">
        Message
        <textarea
          id="message"
          rows={6}
          aria-invalid={Boolean(errors.message)}
          className="min-h-36 resize-y rounded-lg border border-(--portfolio-line)] bg-(--portfolio-input)] px-4 py-3 text-sm font-semibold text-(--portfolio-text)] outline-none transition placeholder:text-(--portfolio-subtle)] focus:border-(--portfolio-accent)] focus:ring-4 focus:ring-(--portfolio-ring)]"
          placeholder="Tell me about the role, project, or interview context."
          {...register("message")}
        />
        {errors.message?.message ? (
          <span className="text-xs font-semibold text-(--portfolio-danger)]">
            {errors.message.message}
          </span>
        ) : null}
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-(--portfolio-accent)] px-5 text-sm font-black text-(--portfolio-accent-contrast)] shadow-sm transition hover:bg-(--portfolio-text)] hover:text-(--portfolio-bg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--portfolio-ring)] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        <Send className="size-4" aria-hidden="true" />
        Send Message
      </button>

      {submitted ? (
        <p role="status" className="mt-4 text-sm text-(--portfolio-muted)]">
          Message validated locally and prepared through email.
        </p>
      ) : null}
    </form>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 border-t border-(--portfolio-line)] bg-(--portfolio-surface)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-mono text-base font-black">{personal.name}</p>
          <p className="mt-1 text-sm font-semibold text-(--portfolio-muted)]">
            {personal.title}
          </p>
          <p className="mt-2 text-xs text-(--portfolio-subtle)]">
            Copyright © {copyrightYear} {personal.name}. All rights reserved.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <FooterLink
            href={personal.github}
            icon={Github}
            label="GitHub"
            external
          />
          <FooterLink
            href={personal.linkedin}
            icon={Linkedin}
            label="LinkedIn"
            external
          />
          <FooterLink
            href={`mailto:${personal.email}`}
            icon={Mail}
            label="Email"
          />
          <a
            href="#home"
            className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-(--portfolio-text)] px-4 text-sm font-black text-(--portfolio-bg)] transition hover:bg-(--portfolio-accent)] hover:text-(--portfolio-accent-contrast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--portfolio-ring)]"
          >
            <ArrowUp className="size-4" aria-hidden="true" />
            Back to Top
          </a>
        </div>
      </div>
    </footer>
  );
}

function Section({
  id,
  eyebrow,
  title,
  description,
  children,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      id={id}
      className="portfolio-section px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 grid gap-5 lg:grid-cols-[0.72fr_1fr] lg:items-end">
          <div>
            {eyebrow ? (
              <p className="font-mono text-sm font-black uppercase tracking-[0.18em] text-(--portfolio-accent)]">
                {eyebrow}
              </p>
            ) : null}
            <h2 className="mt-3 max-w-3xl font-mono text-3xl font-black leading-tight sm:text-4xl">
              {title}
            </h2>
          </div>
          {description ? (
            <p className="max-w-3xl text-base leading-8 text-(--portfolio-muted)]">
              {description}
            </p>
          ) : null}
        </div>
        {children}
      </div>
    </motion.section>
  );
}

function PrimaryLink({
  href,
  icon: Icon,
  children,
}: {
  href: string;
  icon: IconComponent;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-(--portfolio-accent)] px-5 text-sm font-black text-(--portfolio-accent-contrast)] shadow-sm transition hover:bg-(--portfolio-text)] hover:text-(--portfolio-bg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--portfolio-ring)]"
    >
      {children}
      <Icon className="size-4" aria-hidden="true" />
    </a>
  );
}

function SecondaryLink({
  href,
  icon: Icon,
  children,
  external = false,
}: {
  href: string;
  icon: IconComponent;
  children: ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-(--portfolio-line)] bg-(--portfolio-surface-raised)] px-5 text-sm font-black text-(--portfolio-text)] shadow-sm transition hover:border-(--portfolio-line-strong)] hover:bg-(--portfolio-surface-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--portfolio-ring)]"
    >
      <Icon className="size-4" aria-hidden="true" />
      {children}
      {external ? <ArrowUpRight className="size-3.5" aria-hidden="true" /> : null}
    </a>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: IconComponent;
  label: string;
  value: string;
}) {
  return (
    <div className="flex min-w-0 items-start gap-3">
      <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-(--portfolio-surface-muted)] text-(--portfolio-accent)]">
        <Icon className="size-4" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="font-mono text-xs font-black uppercase tracking-wide text-(--portfolio-subtle)]">
          {label}
        </p>
        <p className="mt-1 break-words font-bold text-(--portfolio-text)]">
          {value}
        </p>
      </div>
    </div>
  );
}

function ContactMethod({
  icon: Icon,
  label,
  value,
  href,
  external = false,
}: {
  icon: IconComponent;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  const content = (
    <>
      <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-(--portfolio-accent-soft)] text-(--portfolio-accent)]">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="block font-mono text-xs font-black uppercase tracking-wide text-(--portfolio-subtle)]">
          {label}
        </span>
        <span className="mt-1 block break-words text-sm font-bold text-(--portfolio-text)]">
          {value}
        </span>
      </span>
    </>
  );

  if (!href) {
    return (
      <div className="flex items-center gap-4 rounded-lg border border-(--portfolio-line)] bg-(--portfolio-surface)] p-4 shadow-sm">
        {content}
      </div>
    );
  }

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="flex items-center gap-4 rounded-lg border border-(--portfolio-line)] bg-(--portfolio-surface)] p-4 shadow-sm transition hover:border-(--portfolio-line-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--portfolio-ring)]"
    >
      {content}
    </a>
  );
}

function FooterLink({
  href,
  icon: Icon,
  label,
  external = false,
}: {
  href: string;
  icon: IconComponent;
  label: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-(--portfolio-line)] px-4 text-sm font-bold text-(--portfolio-text)] transition hover:border-(--portfolio-line-strong)] hover:bg-(--portfolio-surface-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--portfolio-ring)]"
    >
      <Icon className="size-4" aria-hidden="true" />
      {label}
    </a>
  );
}
