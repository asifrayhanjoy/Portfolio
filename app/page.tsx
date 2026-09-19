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
  Phone,
  Rocket,
  Send,
  Server,
  ShieldCheck,
  Sparkles,
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
} from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

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
  name: "MD ASIF RAYHAN JOY",
  shortName: "Asif Rayhan",
  title: "Full-Stack Developer & Team Lead",
  headline: "Full-Stack Developer & Team Lead | Next.js · React.js · TypeScript · Node.js | AI-Assisted Workflows",
  subtitle: "Next.js · React.js · TypeScript · Python · Node.js · PostgreSQL",
  bio: "Building scalable, responsive, and high-performance web applications with modern frontend architectures, robust backend systems, and AI-accelerated workflows.",
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
  { value: "1Y", label: "Team leadership" },
  { value: "2Y", label: "Dev experience" },
  { value: "AI", label: "Accelerated workflows" },
  { value: "BD", label: "Dhaka, Bangladesh" },
];

const coreStack = [
  { name: "Next.js", color: "#20d6b5" },
  { name: "React.js", color: "#7dd3fc" },
  { name: "TypeScript", color: "#8ea5ff" },
  { name: "Node.js", color: "#8bff9c" },
  { name: "Express.js", color: "#a7f3d0" },
  { name: "PostgreSQL", color: "#8fb7ff" },
  { name: "MongoDB", color: "#70e08f" },
  { name: "Prisma ORM", color: "#c4a7ff" },
  { name: "Tailwind CSS", color: "#67e8f9" },
  { name: "Zustand", color: "#ffcf70" },
  { name: "Redux", color: "#ff8fc7" },
  { name: "JWT / RBAC", color: "#b5a7ff" },
  { name: "Stripe", color: "#b5a7ff" },
  { name: "Docker", color: "#75b7ff" },
];

const cursorSparkColors = ["#20d6b5", "#7dd3fc", "#ffb86b", "#ff8fc7"];

const capabilityHighlights = [
  {
    title: "Team Leadership & Delivery",
    body: "Led and coordinated a development team for ~1 year—aligning sprint milestones, conducting code reviews, resolving technical blockers, and keeping releases on schedule.",
  },
  {
    title: "Frontend Architecture",
    body: "Deep expertise in Next.js (App & Pages Router), React.js, TypeScript, and Tailwind CSS with modern state management (Zustand, Redux, Context API).",
  },
  {
    title: "Backend & Data",
    body: "Hands-on experience developing RESTful APIs with Node.js and Express.js, implementing secure authentication (JWT/RBAC), and schema modeling with PostgreSQL, MongoDB, and Prisma ORM.",
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
    type: "Full-time / Contract (Collaborative Web Projects)",
    duration: "Approximately 1 Year (Oct 2025 – Sep 2026)",
    location: "Dhaka, Bangladesh (Remote)",
    bullets: [
      "Led and coordinated a development team for ~1 year, maintaining development milestones, task distribution, and cross-functional feature delivery.",
      "Architected and developed client and administrative dashboards using Next.js, React.js, and TypeScript.",
      "Developed backend REST APIs with Node.js, Express.js, and PostgreSQL using Prisma ORM.",
      "Implemented secure JWT authentication, role-based access control (RBAC), and Stripe payment workflows.",
      "Supported team members through regular debugging sessions, code refactoring, and Git version control workflows.",
    ],
  },
  {
    role: "Frontend & Web Developer",
    type: "Part-time / Contract (Independent Development)",
    duration: "Hands-on Development (~2 years practical experience)",
    location: "Dhaka, Bangladesh (Remote)",
    bullets: [
      "Developed responsive, mobile-first web applications using Next.js, React.js, TypeScript, and Tailwind CSS.",
      "Integrated REST APIs and real-time communication features using WebSockets.",
      "Built dynamic form workflows, state management logic, and reusable UI components.",
    ],
  },
];

const projects: Project[] = [
  {
    name: "Full-Stack E-Commerce Platform",
    slug: "e-commerce",
    role: "Team Lead & Full-Stack Developer",
    category: "",
    accent: "#20d6b5",
    visual: "commerce",
    description:
      "Led the end-to-end development of a scalable full-stack e-commerce platform. Coordinated sprint tasks, built customer/seller/admin dashboards with RBAC, integrated Stripe checkout workflows, and optimized database queries with Prisma.",
    technologies: [
      "Next.js",
      "React.js",
      "TypeScript",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Prisma ORM",
      "Stripe",
      "Tailwind CSS",
    ],
    highlights: [
      "Led end-to-end development and sprint coordination (~1 Year)",
      "Built customer, seller, and admin dashboards with RBAC",
      "Integrated Stripe checkout workflows and payment handling",
      "Optimized database queries with PostgreSQL and Prisma ORM",
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
        body: "Led the end-to-end development of a scalable full-stack e-commerce platform.",
      },
      {
        title: "System shape",
        body: "Separate Next.js frontend and Node.js REST API backend with PostgreSQL, Prisma ORM, Stripe, and RBAC security.",
      },
      {
        title: "Engineering focus",
        body: "Sprint coordination, dashboard architecture, secure auth, payment workflows, and optimized database querying.",
      },
    ],
  },
  {
    name: "Next Thekana — Rental & Service Platform",
    slug: "next-thekana",
    role: "Team Member & Full-Stack Developer",
    category: "",
    accent: "#7dd3fc",
    visual: "product",
    description:
      "Collaborated on a rental and service platform. Built modular responsive UI components, integrated REST APIs, and implemented real-time listing updates using WebSockets.",
    technologies: [
      "Next.js",
      "React.js",
      "TypeScript",
      "REST APIs",
      "WebSockets",
      "Tailwind CSS",
    ],
    highlights: [
      "Collaborated on a rental and service platform with team members",
      "Built modular responsive UI components with Next.js & Tailwind CSS",
      "Integrated REST APIs for listing and service workflows",
      "Implemented real-time listing updates using WebSockets",
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
        body: "Collaborated with team members to deliver user interfaces and real-time features for a rental platform.",
      },
      {
        title: "System shape",
        body: "Modular frontend architecture connected to RESTful backend endpoints and WebSocket feeds.",
      },
      {
        title: "Engineering focus",
        body: "Component reusability, responsive UI, real-time data sync, and team collaboration.",
      },
    ],
  },
  {
    name: "Rentiful — Rental Web Application",
    slug: "rentful",
    role: "Frontend Developer",
    category: "Frontend Project",
    accent: "#7dd3fc",
    visual: "product",
    description:
      "Developed a modern rental web application focusing on component-based architecture, clean state management, and optimized responsive layouts.",
    technologies: [
      "Next.js",
      "React.js",
      "TypeScript",
      "Tailwind CSS",
    ],
    highlights: [
      "Developed a modern rental web application",
      "Applied component-based architecture for scalability",
      "Implemented clean state management and routing",
      "Optimized responsive layouts across all device viewports",
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
        title: "System shape",
        body: "React/Next.js page routing and component system styled with Tailwind CSS.",
      },
      {
        title: "Engineering focus",
        body: "Clean component boundaries, intuitive UI flows, and state management.",
      },
    ],
  },
  {
    name: "Invoice Generator Web Application",
    slug: "invoice-generator",
    role: "Frontend Developer",
    category: "Productivity Tool",
    accent: "#ff8fc7",
    visual: "product",
    description:
      "Built a responsive invoice-generation tool featuring dynamic calculation workflows, line-item management, and structured printable output.",
    technologies: [
      "React.js",
      "TypeScript",
      "Tailwind CSS",
    ],
    highlights: [
      "Built a responsive invoice-generation tool",
      "Implemented dynamic calculation workflows for totals and taxes",
      "Developed interactive line-item management and form state",
      "Created structured printable output and export formatting",
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
        body: "Created a focused productivity tool for managing and generating client invoices.",
      },
      {
        title: "System shape",
        body: "Interactive React form components with dynamic calculation logic.",
      },
      {
        title: "Engineering focus",
        body: "Form handling, calculation precision, and printable layout optimization.",
      },
    ],
  },
  {
    name: "PH Healthcare Platform",
    slug: "ph-healthcare",
    role: "Frontend Developer",
    category: "Healthcare Project",
    accent: "#7dd3fc",
    visual: "product",
    description:
      "Developed responsive user interfaces for doctor profiling, appointment scheduling, and patient record management workflows.",
    technologies: [
      "React.js",
      "Next.js",
      "TypeScript",
      "REST APIs",
    ],
    highlights: [
      "Developed doctor profiling and search user interfaces",
      "Built interactive appointment scheduling workflows",
      "Created patient record management interfaces",
      "Integrated frontend components with backend REST APIs",
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
        body: "Healthcare platform interfaces built for patient-doctor scheduling and record workflows.",
      },
      {
        title: "System shape",
        body: "Data-driven React/Next.js pages connected to healthcare REST APIs.",
      },
      {
        title: "Engineering focus",
        body: "Usability in multi-step workflows, API integration, and clean state handling.",
      },
    ],
  },
];

const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    icon: Layers3,
    description: "Modern UI architecture, responsive layouts & state management.",
    skills: [
      { name: "React.js", level: "Core" },
      { name: "Next.js", level: "Core" },
      { name: "TypeScript", level: "Core" },
      { name: "JavaScript (ES6+)", level: "Core" },
      { name: "Tailwind CSS", level: "Core" },
      { name: "HTML5", level: "Core" },
      { name: "CSS3", level: "Core" },
      { name: "Zustand", level: "Core" },
      { name: "Redux", level: "Core" },
    ],
  },
  {
    title: "Backend & Database",
    icon: Server,
    description: "RESTful APIs, security, ORM, and data persistence.",
    skills: [
      { name: "Node.js", level: "Core" },
      { name: "Express.js", level: "Core" },
      { name: "REST APIs", level: "Core" },
      { name: "WebSockets", level: "Working" },
      { name: "PostgreSQL", level: "Core" },
      { name: "MongoDB", level: "Working" },
      { name: "Prisma ORM", level: "Core" },
      { name: "JWT / RBAC", level: "Core" },
    ],
  },
  {
    title: "Tools & Workflow",
    icon: Wrench,
    description: "Version control, containers, Postman & AI-accelerated dev tools.",
    skills: [
      { name: "Git", level: "Core" },
      { name: "GitHub", level: "Core" },
      { name: "Docker", level: "Working" },
      { name: "Postman", level: "Core" },
      { name: "Cursor", level: "Core" },
      { name: "Claude Code", level: "Core" },
    ],
  },
  {
    title: "Working Knowledge",
    icon: Sparkles,
    description: "Payment workflows, backend concepts, frameworks, and cloud.",
    skills: [
      { name: "Stripe", level: "Working" },
      { name: "Microservices concepts", level: "Working" },
      { name: "NestJS", level: "Working" },
      { name: "Go", level: "Working" },
      { name: "AWS", level: "Working" },
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

const copyrightYear = 2026;

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
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
  const [cursorSparks, setCursorSparks] = useState<CursorSpark[]>([]);
  const nextSparkId = useRef(0);
  const lastSparkAt = useRef(0);
  const sparkTimeouts = useRef<number[]>([]);
  const activeSection = useActiveSection();

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
      data-theme="dark"
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
}: {
  activeSection: string;
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
                "rounded-md px-3 py-2 text-sm font-bold transition-[transform,color,background-color] duration-200 ease-out hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--portfolio-ring)]",
                activeSection === item.id
                  ? "bg-(--portfolio-accent)] text-(--portfolio-accent-contrast)] hover:bg-(--portfolio-text)]"
                  : "text-(--portfolio-muted)] hover:bg-(--portfolio-surface-muted)] hover:text-(--portfolio-text)]",
              )}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
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
            Full-Stack Developer & Team Lead
          </p>
          <h1 className="mt-4 max-w-5xl break-words text-5xl font-semibold leading-[1.04] text-(--portfolio-text)] sm:text-6xl lg:text-7xl">
            {personal.name}
          </h1>
          <p className="mt-6 max-w-2xl text-xl font-semibold leading-8 text-(--portfolio-text)] sm:text-2xl sm:leading-9">
            {personal.subtitle}
          </p>
          <p className="mt-5 max-w-2xl text-base leading-8 text-(--portfolio-muted)]">
            {personal.bio}
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
            I am a Full-Stack Developer and Team Lead specializing in Next.js, React.js, TypeScript, and Node.js. With approximately 2 years of hands-on software development experience and roughly 1 year of team leadership and coordination experience, I combine technical execution with structured project delivery.
          </p>

          <div className="pt-2">
            <p className="font-mono text-xs font-black uppercase tracking-[0.18em] text-(--portfolio-accent)]">
              What I bring to a team
            </p>
            <div className="mt-4 space-y-3">
              {[
                {
                  label: "Team Leadership & Delivery",
                  text: "Led and coordinated a development team for ~1 year—aligning sprint milestones, conducting code reviews, resolving technical blockers, and keeping releases on schedule.",
                },
                {
                  label: "Frontend Architecture",
                  text: "Deep expertise in Next.js (App & Pages Router), React.js, TypeScript, and Tailwind CSS with modern state management (Zustand, Redux, Context API).",
                },
                {
                  label: "Backend & Data",
                  text: "Hands-on experience developing RESTful APIs with Node.js and Express.js, implementing secure authentication (JWT/RBAC), and schema modeling with PostgreSQL, MongoDB, and Prisma ORM.",
                },
                {
                  label: "AI-Assisted Engineering",
                  text: "Pragmatic use of modern developer tools (Cursor, Claude Code) to accelerate debugging, refactoring, and codebase exploration while maintaining full engineering judgment and code quality.",
                },
                {
                  label: "Problem Solving & Adaptability",
                  text: "Strong analytical mindset capable of quickly understanding unfamiliar codebases, adopting new technologies, and shipping clean, maintainable code.",
                },
              ].map((item) => (
                <div key={item.label} className="flex gap-3 text-sm leading-6">
                  <CheckCircle2
                    className="mt-0.5 size-4 shrink-0 text-(--portfolio-success)]"
                    aria-hidden="true"
                  />
                  <div>
                    <span className="font-bold text-(--portfolio-text)]">{item.label}: </span>
                    <span className="text-(--portfolio-muted)]">{item.text}</span>
                  </div>
                </div>
              ))}
            </div>
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
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="font-mono text-xs font-black uppercase tracking-[0.18em] text-(--project-accent)]">
            {project.category}
          </p>
          {project.role ? (
            <span className="text-xs font-semibold text-(--portfolio-muted)]">
              {project.role}
            </span>
          ) : null}
        </div>
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
      title="Software Development & Team Leadership"
      description="Approximately 2 years of hands-on development experience and 1 year of team leadership & project coordination."
    >
      <div className="grid gap-6">
        {experiences.map((exp) => (
          <article
            key={exp.role}
            className="rounded-lg border border-(--portfolio-line)] bg-(--portfolio-surface)] p-6 shadow-sm"
          >
            <div className="flex flex-col gap-2 border-b border-(--portfolio-line)] pb-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-mono text-xs font-black uppercase tracking-[0.16em] text-(--portfolio-accent)]">
                  {exp.type}
                </p>
                <h3 className="mt-1 text-2xl font-black">{exp.role}</h3>
              </div>
              <div className="text-sm font-semibold text-(--portfolio-muted)] sm:text-right">
                <p className="font-mono text-(--portfolio-text)]">{exp.duration}</p>
                <p className="text-xs text-(--portfolio-subtle)]">{exp.location}</p>
              </div>
            </div>

            <ul className="mt-5 space-y-3">
              {exp.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3 text-sm leading-7 text-(--portfolio-muted)]">
                  <CheckCircle2
                    className="mt-1 size-4 shrink-0 text-(--portfolio-success)]"
                    aria-hidden="true"
                  />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
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
            Satkhira, Bangladesh (Currently studying)
          </p>
        </article>

        <article className="rounded-lg border border-(--portfolio-line)] bg-(--portfolio-surface)] p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-lg bg-(--portfolio-warm-soft)] text-(--portfolio-warm)]">
              <Sparkles className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="font-mono text-sm font-black uppercase tracking-[0.16em] text-(--portfolio-warm)]">
                Engineering & Workflow
              </p>
              <h3 className="mt-1 text-xl font-black">
                AI-Assisted Development
              </h3>
            </div>
          </div>
          <p className="mt-6 text-sm leading-7 text-(--portfolio-muted)]">
            Pragmatic use of modern developer tools (Cursor, Claude Code) to accelerate debugging, refactoring, and codebase exploration while maintaining full engineering judgment and code quality.
          </p>
        </article>
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
        headers: {
          "Content-Type": "application/json",
        },
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
        disabled={isSending}
        className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-(--portfolio-accent)] px-5 text-sm font-black text-(--portfolio-accent-contrast)] shadow-sm transition hover:bg-(--portfolio-text)] hover:text-(--portfolio-bg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--portfolio-ring)] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        <Send className={cn("size-4", isSending && "animate-spin")} aria-hidden="true" />
        {isSending ? "Sending..." : "Send Message"}
      </button>

      {statusMessage ? (
        <p
          role="status"
          className={cn(
            "mt-4 text-sm font-semibold",
            statusMessage.type === "success"
              ? "text-(--portfolio-success)]"
              : "text-(--portfolio-danger)]",
          )}
        >
          {statusMessage.text}
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
