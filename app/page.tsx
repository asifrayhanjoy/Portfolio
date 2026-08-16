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
  Download,
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
  name: "MD. ASIF RAYHAN JOY",
  shortName: "Asif Rayhan",
  title: "Full Stack Web Developer",
  location: "Satkhira, Khulna, Bangladesh",
  email: "amsiimf06@gmail.com",
  phone: "+8801302-271472",
  github: "https://github.com/asifrayhanjoy",
  linkedin: "https://www.linkedin.com/in/md-asif-rayhan-joy-81444042a/",
  resume: "https://my-resume-s17p.vercel.app/",
};

const navItems: NavItem[] = [
  { label: "Home", href: "#home", id: "home", icon: HomeIcon },
  { label: "Projects", href: "#projects", id: "projects", icon: Briefcase },
  { label: "Skills", href: "#skills", id: "skills", icon: Code2 },
  { label: "Process", href: "#process", id: "process", icon: Rocket },
  { label: "Resume", href: "#resume", id: "resume", icon: FileText },
  { label: "Contact", href: "#contact", id: "contact", icon: Mail },
];

const heroStats = [
  { value: "2", label: "Selected full-stack builds" },
  { value: "7+", label: "Core technologies" },
  { value: "API", label: "Backend-first thinking" },
  { value: "BD", label: "Remote-ready from Bangladesh" },
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
    title: "Frontend systems",
    body: "Responsive React and Next.js interfaces with component boundaries, predictable states, and clean visual hierarchy.",
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
    name: "E-Commerce",
    slug: "e-commerce",
    category: "Commerce Platform",
    accent: "#20d6b5",
    visual: "commerce",
    description:
      "A full-stack commerce build with a separate Next.js frontend, Node.js REST API backend, MongoDB, Prisma, TypeScript, JavaScript, and Tailwind CSS.",
    technologies: [
      "React.js",
      "Next.js",
      "Node.js",
      "TypeScript",
      "JavaScript",
      "MongoDB",
      "Prisma",
      "Tailwind CSS",
      "REST API",
    ],
    highlights: [
      "Frontend and backend kept in separate repositories",
      "REST API boundary between UI and server behavior",
      "MongoDB and Prisma included in the project stack",
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
        body: "A commerce system with dedicated frontend and backend repositories, keeping the public story tied to the available source and verified stack.",
      },
      {
        title: "System shape",
        body: "React and Next.js handle the client experience while Node.js exposes REST endpoints. MongoDB and Prisma are represented in the persistence layer.",
      },
      {
        title: "Engineering focus",
        body: "The interview angle is the separation of UI, API, and data responsibilities, plus explaining how each layer communicates.",
      },
    ],
  },
  {
    name: "My-App",
    slug: "my-app",
    category: "Full-Stack Next.js App",
    accent: "#ff8fc7",
    visual: "product",
    description:
      "A Next.js application using React, TypeScript, PostgreSQL, Prisma, Stripe, authentication, and API Routes for full-stack product behavior.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Stripe",
      "Authentication",
      "API Routes",
    ],
    highlights: [
      "Next.js app structure with API Routes",
      "PostgreSQL and Prisma represented in the data layer",
      "Stripe and authentication included in the product scope",
    ],
    repositoryLinks: [
      {
        label: "GitHub",
        href: "https://github.com/asifrayhanjoy/my-app.git",
      },
    ],
    liveDemo: "https://my-app-tl6i.vercel.app/",
    caseStudy: [
      {
        title: "Scope",
        body: "A full-stack Next.js build where backend behavior belongs inside API Routes rather than a separate Express or Nest service.",
      },
      {
        title: "System shape",
        body: "Typed React UI, API route handlers, Prisma-backed PostgreSQL persistence, authentication, and Stripe integration work inside one product surface.",
      },
      {
        title: "Engineering focus",
        body: "The value comes from connecting product UI, server routes, persistence, authentication, and payment workflows in one coherent app.",
      },
    ],
  },
];

const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    icon: Code2,
    description: "Implementation languages for typed, browser-ready work.",
    skills: [
      { name: "JavaScript", level: "Core" },
      { name: "TypeScript", level: "Working" },
      { name: "HTML5", level: "Core" },
      { name: "CSS3", level: "Core" },
    ],
  },
  {
    title: "Frontend",
    icon: Layers3,
    description: "Interfaces, routing, layouts, and component-driven UI.",
    skills: [
      { name: "React.js", level: "Core" },
      { name: "Next.js", level: "Working" },
      { name: "Tailwind CSS", level: "Core" },
    ],
  },
  {
    title: "Backend",
    icon: Server,
    description: "Application logic, API structure, and service-side development.",
    skills: [
      { name: "Node.js", level: "Working" },
      { name: "Express.js", level: "Working" },
      { name: "NestJS", level: "Learning" },
    ],
  },
  {
    title: "Database",
    icon: Database,
    description: "Relational and document data work with ORM-backed workflows.",
    skills: [
      { name: "MongoDB", level: "Working" },
      { name: "PostgreSQL", level: "Working" },
      { name: "Prisma ORM", level: "Working" },
      { name: "Mongoose", level: "Working" },
    ],
  },
  {
    title: "Authentication",
    icon: ShieldCheck,
    description: "Identity, authorization, sessions, and secure product flows.",
    skills: [
      { name: "JWT", level: "Working" },
      { name: "Refresh Token", level: "Working" },
      { name: "OTP Authentication", level: "Working" },
      { name: "RBAC", level: "Working" },
    ],
  },
  {
    title: "Tools",
    icon: Wrench,
    description: "Versioning, API testing, local development, and deployment support.",
    skills: [
      { name: "Git", level: "Working" },
      { name: "GitHub", level: "Working" },
      { name: "Docker", level: "Basic" },
      { name: "Postman", level: "Working" },
      { name: "VS Code", level: "Core" },
    ],
  },
  {
    title: "Expanding Stack",
    icon: BookOpen,
    description: "Technologies being added through practical learning and experiments.",
    skills: [
      { name: "Redis", level: "Basic" },
      { name: "Kafka", level: "Learning" },
      { name: "RabbitMQ", level: "Learning" },
      { name: "gRPC", level: "Learning" },
      { name: "Stripe", level: "Working" },
      { name: "Cloudinary", level: "Working" },
      { name: "AWS", level: "Basic" },
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
  Core: "border-[var(--level-core-border)] bg-[var(--level-core-bg)] text-[var(--level-core-text)]",
  Working:
    "border-[var(--level-working-border)] bg-[var(--level-working-bg)] text-[var(--level-working-text)]",
  Learning:
    "border-[var(--level-learning-border)] bg-[var(--level-learning-bg)] text-[var(--level-learning-text)]",
  Basic:
    "border-[var(--level-basic-border)] bg-[var(--level-basic-bg)] text-[var(--level-basic-text)]",
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
      addressLocality: "Satkhira",
      addressRegion: "Khulna",
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
      className="portfolio-page min-h-screen overflow-x-hidden bg-[var(--portfolio-bg)] pb-24 text-[var(--portfolio-text)] lg:pb-0"
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
        <ProjectsSection />
        <SkillsSection />
        <ProcessSection />
        <ResumeSection />
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
          ? "border-[var(--portfolio-line)] bg-[var(--portfolio-nav)] shadow-[0_18px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl"
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
          className="group inline-flex min-w-0 items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--portfolio-ring)]"
        >
          <span className="grid size-11 shrink-0 place-items-center rounded-lg border border-[var(--portfolio-line-strong)] bg-[var(--portfolio-text)] font-mono text-sm font-black text-[var(--portfolio-bg)] shadow-[0_0_28px_var(--portfolio-glow)]">
            AR
          </span>
          <span className="hidden min-w-0 leading-none sm:block">
            <span className="block truncate font-mono text-base font-black tracking-wide">
              asif.dev
            </span>
            <span className="mt-1 block truncate text-xs font-semibold uppercase tracking-[0.18em] text-[var(--portfolio-muted)]">
              Full-stack portfolio
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-1 rounded-lg border border-[var(--portfolio-line)] bg-[var(--portfolio-surface-raised)] p-1 shadow-sm backdrop-blur md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--portfolio-ring)]",
                activeSection === item.id
                  ? "bg-[var(--portfolio-accent)] text-[var(--portfolio-accent-contrast)]"
                  : "text-[var(--portfolio-muted)] hover:text-[var(--portfolio-text)]",
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
            className="hidden size-10 place-items-center rounded-lg border border-[var(--portfolio-line)] bg-[var(--portfolio-surface-raised)] text-[var(--portfolio-muted)] transition hover:border-[var(--portfolio-line-strong)] hover:text-[var(--portfolio-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--portfolio-ring)] sm:grid"
          >
            <Github className="size-4" aria-hidden="true" />
          </a>
          <a
            href="#contact"
            className="hidden min-h-10 items-center gap-2 rounded-lg bg-[var(--portfolio-text)] px-4 text-sm font-black text-[var(--portfolio-bg)] shadow-sm transition hover:bg-[var(--portfolio-accent)] hover:text-[var(--portfolio-accent-contrast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--portfolio-ring)] lg:inline-flex"
          >
            Hire Me
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
          <button
            type="button"
            aria-label="Open navigation menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((value) => !value)}
            className="grid size-10 place-items-center rounded-lg border border-[var(--portfolio-line)] bg-[var(--portfolio-surface-raised)] text-[var(--portfolio-text)] transition hover:border-[var(--portfolio-line-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--portfolio-ring)] md:hidden"
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
            className="fixed inset-x-4 top-24 z-50 rounded-lg border border-[var(--portfolio-line)] bg-[var(--portfolio-surface-raised)] p-3 shadow-[var(--portfolio-shadow)] backdrop-blur-xl md:hidden"
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
                      "flex min-h-12 items-center gap-3 rounded-md px-4 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--portfolio-ring)]",
                      activeSection === item.id
                        ? "bg-[var(--portfolio-accent)] text-[var(--portfolio-accent-contrast)]"
                        : "text-[var(--portfolio-muted)] hover:bg-[var(--portfolio-surface-muted)] hover:text-[var(--portfolio-text)]",
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
      className="hidden rounded-lg border border-[var(--portfolio-line)] bg-[var(--portfolio-surface-raised)] p-1 shadow-sm backdrop-blur sm:flex"
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
              "grid size-8 place-items-center rounded-md text-[var(--portfolio-muted)] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--portfolio-ring)]",
              isActive &&
                "bg-[var(--portfolio-accent)] text-[var(--portfolio-accent-contrast)] shadow-sm",
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
      className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 rounded-lg border border-[var(--portfolio-line)] bg-[var(--portfolio-surface-raised)] p-2 shadow-[var(--portfolio-shadow)] backdrop-blur-xl lg:flex lg:flex-col lg:gap-2"
    >
      {navItems.map((item) => {
        const Icon = item.icon;

        return (
          <a
            key={item.href}
            href={item.href}
            aria-label={item.label}
            className={cn(
              "group relative grid size-11 place-items-center rounded-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--portfolio-ring)]",
              activeSection === item.id
                ? "bg-[var(--portfolio-accent)] text-[var(--portfolio-accent-contrast)]"
                : "bg-[var(--portfolio-surface-muted)] text-[var(--portfolio-muted)] hover:text-[var(--portfolio-text)]",
            )}
          >
            <Icon className="size-5" aria-hidden="true" />
            <span className="pointer-events-none absolute left-14 top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-md border border-[var(--portfolio-line)] bg-[var(--portfolio-surface)] px-3 py-2 text-xs font-bold text-[var(--portfolio-text)] shadow-sm group-hover:block">
              {item.label}
            </span>
          </a>
        );
      })}
    </aside>
  );
}

function MobileDock({ activeSection }: { activeSection: string }) {
  const mobileItems = [navItems[0], navItems[1], navItems[2], navItems[5]];

  return (
    <nav
      aria-label="Mobile shortcuts"
      className="fixed inset-x-3 bottom-3 z-50 grid grid-cols-4 gap-1 rounded-lg border border-[var(--portfolio-line)] bg-[var(--portfolio-surface-raised)] p-1 shadow-[var(--portfolio-shadow)] backdrop-blur-xl lg:hidden"
    >
      {mobileItems.map((item) => {
        const Icon = item.icon;

        return (
          <a
            key={item.href}
            href={item.href}
            className={cn(
              "grid min-h-14 place-items-center rounded-md px-1 text-[11px] font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--portfolio-ring)]",
              activeSection === item.id
                ? "bg-[var(--portfolio-accent)] text-[var(--portfolio-accent-contrast)]"
                : "text-[var(--portfolio-muted)]",
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
      className="portfolio-section relative isolate overflow-hidden border-b border-[var(--portfolio-line)] px-4 pt-28 sm:px-6 lg:px-8"
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
      <div className="absolute inset-0 -z-20 bg-[var(--portfolio-hero-overlay)]" />
      <div className="absolute inset-0 -z-10 bg-[var(--portfolio-grid)] opacity-45" />

      <div className="mx-auto grid min-h-[78svh] w-full max-w-7xl items-center gap-10 pb-14 pt-10 lg:grid-cols-[1fr_0.78fr]">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-3 rounded-lg border border-[var(--portfolio-line)] bg-[var(--portfolio-surface-raised)] px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-[var(--portfolio-muted)] shadow-sm backdrop-blur">
            <span className="grid size-2.5 place-items-center rounded-full bg-[var(--portfolio-success)] shadow-[0_0_18px_var(--portfolio-success)]" />
            Open to full-stack web roles
          </div>

          <p className="mt-8 text-sm font-bold uppercase tracking-[0.2em] text-[var(--portfolio-accent)]">
            {personal.title}
          </p>
          <h1 className="mt-4 max-w-5xl break-words text-5xl font-semibold leading-[1.04] text-[var(--portfolio-text)] sm:text-6xl lg:text-7xl">
            {personal.name}
          </h1>
          <p className="mt-6 max-w-2xl text-xl font-semibold leading-8 text-[var(--portfolio-text)] sm:text-2xl sm:leading-9">
            I build clean web products from polished interfaces to API routes,
            authentication, data models, integrations, and deployment-ready
            presentation.
          </p>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--portfolio-muted)]">
            Focused on React, Next.js, Node.js, TypeScript, MongoDB,
            PostgreSQL, Prisma, Tailwind CSS, and practical full-stack delivery.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <PrimaryLink href="#projects" icon={ArrowRight}>
              View Projects
            </PrimaryLink>
            <SecondaryLink href={personal.resume} icon={Download} external>
              Resume
            </SecondaryLink>
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

          <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold text-[var(--portfolio-muted)]">
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-4 text-[var(--portfolio-accent)]" />
              {personal.location}
            </span>
            <a
              href={`mailto:${personal.email}`}
              className="inline-flex items-center gap-2 transition hover:text-[var(--portfolio-text)]"
            >
              <Mail className="size-4 text-[var(--portfolio-warm)]" />
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
    <div className="rounded-lg border border-[var(--portfolio-line)] bg-[var(--portfolio-panel)] p-4 shadow-[var(--portfolio-shadow)] backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-[var(--portfolio-line)] pb-4">
        <div className="flex items-center gap-2">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#ffbd2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="font-mono text-xs font-black uppercase tracking-[0.18em] text-[var(--portfolio-muted)]">
          portfolio.tsx
        </span>
      </div>

      <div className="mt-5 grid gap-4">
        <div className="rounded-lg border border-[var(--portfolio-line)] bg-[var(--portfolio-surface)] p-4">
          <p className="font-mono text-xs font-black uppercase tracking-[0.18em] text-[var(--portfolio-accent)]">
            Current focus
          </p>
          <p className="mt-3 text-2xl font-black">{personal.title}</p>
          <p className="mt-3 text-sm leading-7 text-[var(--portfolio-muted)]">
            Building full-stack products with practical architecture, clean UI,
            authentication, data models, and API boundaries.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {heroStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-[var(--portfolio-line)] bg-[var(--portfolio-surface)] p-4"
            >
              <p className="font-mono text-3xl font-black text-[var(--portfolio-text)]">
                {stat.value}
              </p>
              <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-[var(--portfolio-muted)]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-lg border border-[var(--portfolio-line)] bg-[var(--portfolio-surface)] p-4">
          <div className="flex items-center justify-between">
            <p className="font-mono text-xs font-black uppercase tracking-[0.18em] text-[var(--portfolio-warm)]">
              Stack map
            </p>
            <Sparkles
              className="size-4 text-[var(--portfolio-warm)]"
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
                <span className="w-16 font-mono text-xs font-black uppercase tracking-[0.14em] text-[var(--portfolio-muted)]">
                  {label}
                </span>
                <span className="h-px flex-1 bg-[var(--portfolio-line)]" />
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
    <section className="border-b border-[var(--portfolio-line)] bg-[var(--portfolio-bg)] px-4 py-9 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center gap-4">
          <p className="shrink-0 text-xs font-black uppercase tracking-[0.16em] text-[var(--portfolio-muted)]">
            Core technologies
          </p>
          <span className="h-px flex-1 bg-[var(--portfolio-line)]" />
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
      title="Practical full-stack development with a polished product finish."
      description="A portfolio built around real project work, honest skill levels, and a clear path from frontend experience to backend behavior."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.76fr] lg:items-start">
        <div className="space-y-6 text-base leading-8 text-[var(--portfolio-muted)]">
          <p>
            I am a Full Stack Web Developer from Satkhira, Khulna, Bangladesh.
            I work across frontend development, backend development, API design,
            authentication, database modeling, and application structure.
          </p>
          <p>
            My strongest work is built around React, Next.js, Node.js,
            TypeScript, MongoDB, PostgreSQL, Prisma, and modern tooling. I keep
            improving through practical projects that connect UI polish with
            reliable application behavior.
          </p>

          <div className="grid gap-3 pt-2 sm:grid-cols-2">
            {[
              "Responsive frontend development",
              "API and backend implementation",
              "Authentication and access control",
              "Database modeling and queries",
              "Typed application structure",
              "Deployment-ready presentation",
            ].map((item) => (
              <div
                key={item}
                className="flex min-h-14 items-center gap-3 border-t border-[var(--portfolio-line)] py-3 text-sm font-bold text-[var(--portfolio-text)]"
              >
                <CheckCircle2
                  className="size-4 shrink-0 text-[var(--portfolio-success)]"
                  aria-hidden="true"
                />
                {item}
              </div>
            ))}
          </div>
        </div>

        <aside className="rounded-lg border border-[var(--portfolio-line)] bg-[var(--portfolio-surface)] p-5 shadow-[var(--portfolio-shadow)]">
          <div className="flex items-center gap-4 border-b border-[var(--portfolio-line)] pb-5">
            <div className="grid size-14 shrink-0 place-items-center rounded-lg bg-[var(--portfolio-accent)] font-mono text-lg font-black text-[var(--portfolio-accent-contrast)]">
              AR
            </div>
            <div className="min-w-0">
              <p className="truncate text-lg font-black">{personal.name}</p>
              <p className="mt-1 text-sm font-semibold text-[var(--portfolio-muted)]">
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
            className="rounded-lg border border-[var(--portfolio-line)] bg-[var(--portfolio-surface)] p-5 shadow-sm"
          >
            <h3 className="text-xl font-black">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-[var(--portfolio-muted)]">
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
      className="flex h-full flex-col overflow-hidden rounded-lg border border-[var(--portfolio-line)] bg-[var(--portfolio-surface)] shadow-[var(--portfolio-shadow)]"
      style={{ "--project-accent": project.accent } as CSSProperties}
      whileHover={shouldReduceMotion ? undefined : { y: -5 }}
      transition={{ duration: 0.18 }}
    >
      <ProjectVisual project={project} />
      <div className="flex flex-1 flex-col p-6">
        <p className="font-mono text-xs font-black uppercase tracking-[0.18em] text-[var(--project-accent)]">
          {project.category}
        </p>
        <h3 className="mt-3 font-mono text-3xl font-black">{project.name}</h3>
        <p className="mt-4 text-sm leading-7 text-[var(--portfolio-muted)]">
          {project.description}
        </p>

        <div className="mt-6 space-y-3">
          {project.highlights.map((highlight) => (
            <div
              key={highlight}
              className="flex gap-3 text-sm font-semibold leading-6 text-[var(--portfolio-text)]"
            >
              <CheckCircle2
                className="mt-0.5 size-4 shrink-0 text-[var(--project-accent)]"
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
              className="rounded-md border border-[var(--portfolio-line)] bg-[var(--portfolio-surface-muted)] px-2.5 py-1.5 text-xs font-bold text-[var(--portfolio-muted)]"
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
            <span className="inline-flex min-h-11 cursor-not-allowed items-center justify-center gap-2 rounded-lg border border-[var(--portfolio-line)] px-4 text-sm font-bold text-[var(--portfolio-subtle)] opacity-75">
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
      className="relative aspect-[16/10] overflow-hidden border-b border-[var(--portfolio-line)] bg-[var(--project-visual-bg)]"
      role="img"
      aria-label={`${project.name} interface concept`}
    >
      <div className="absolute inset-0 bg-[var(--project-visual-grid)]" />
      <div className="relative z-10 flex h-full flex-col p-4">
        <div className="flex items-center justify-between border-b border-[var(--project-visual-line)] pb-3">
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
          </div>
          <span className="font-mono text-[10px] font-black uppercase tracking-[0.16em] text-[var(--project-visual-muted)]">
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
      <div className="space-y-2 border-r border-[var(--project-visual-line)] pr-3">
        {["Catalog", "Orders", "Users", "API"].map((item, index) => (
          <div
            key={item}
            className={cn(
              "h-7 rounded-md border border-[var(--project-visual-line)] px-2 py-1 font-mono text-[10px] font-black text-[var(--project-visual-muted)]",
              index === 0 && "bg-[var(--project-visual-accent-soft)]",
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
            className="rounded-lg border border-[var(--project-visual-line)] bg-[var(--project-visual-panel)] p-3"
          >
            <div className="h-10 rounded-md bg-[var(--project-visual-accent-soft)]" />
            <div className="mt-3 h-2 rounded-full bg-[var(--project-visual-line)]" />
            <div className="mt-2 h-2 w-2/3 rounded-full bg-[var(--project-visual-line)]" />
          </div>
        ))}
      </div>
      <div className="rounded-lg border border-[var(--project-visual-line)] bg-[var(--project-visual-panel)] p-3">
        <p className="font-mono text-[10px] font-black uppercase tracking-[0.14em] text-[var(--project-visual-muted)]">
          API Flow
        </p>
        <div className="mt-4 space-y-3">
          {["Client", "REST", "Prisma", "MongoDB"].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-[var(--project-accent)]" />
              <span className="h-2 flex-1 rounded-full bg-[var(--project-visual-line)]" />
              <span className="w-14 font-mono text-[10px] font-black text-[var(--project-visual-muted)]">
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
      <div className="rounded-lg border border-[var(--project-visual-line)] bg-[var(--project-visual-panel)] p-3">
        <div className="flex h-24 items-end gap-2">
          {[44, 70, 52, 86, 64, 92].map((height, index) => (
            <span
              key={height + index}
              className="w-full rounded-t bg-[var(--project-accent)] opacity-80"
              style={{ height }}
            />
          ))}
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {["Auth", "Stripe", "API"].map((item) => (
            <div
              key={item}
              className="rounded-md border border-[var(--project-visual-line)] bg-[var(--project-visual-accent-soft)] px-2 py-2 text-center font-mono text-[10px] font-black text-[var(--project-visual-muted)]"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-3">
        <div className="rounded-lg border border-[var(--project-visual-line)] bg-[var(--project-visual-panel)] p-3">
          <p className="font-mono text-[10px] font-black uppercase tracking-[0.14em] text-[var(--project-visual-muted)]">
            Data Layer
          </p>
          <div className="mt-4 h-20 rounded-md bg-[var(--project-visual-accent-soft)]" />
        </div>
        <div className="rounded-lg border border-[var(--project-visual-line)] bg-[var(--project-visual-panel)] p-3">
          <div className="h-2 w-3/4 rounded-full bg-[var(--project-visual-line)]" />
          <div className="mt-2 h-2 w-1/2 rounded-full bg-[var(--project-visual-line)]" />
          <div className="mt-4 h-8 rounded-md bg-[var(--portfolio-warm)] opacity-85" />
        </div>
      </div>
    </div>
  );
}

function ProjectCaseStudy({ project }: { project: Project }) {
  return (
    <article
      id={`project-${project.slug}`}
      className="portfolio-section rounded-lg border border-[var(--portfolio-line)] bg-[var(--portfolio-surface)] p-6 shadow-sm"
      style={{ "--project-accent": project.accent } as CSSProperties}
    >
      <div className="grid gap-6 lg:grid-cols-[0.72fr_1fr]">
        <div>
          <p className="font-mono text-sm font-black uppercase tracking-[0.18em] text-[var(--project-accent)]">
            Case Study
          </p>
          <h3 className="mt-3 font-mono text-3xl font-black">
            {project.name}
          </h3>
          <p className="mt-4 text-sm leading-7 text-[var(--portfolio-muted)]">
            {project.description}
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {project.caseStudy.map((block) => (
            <div
              key={block.title}
              className="border-t border-[var(--portfolio-line)] pt-4"
            >
              <h4 className="text-base font-black">{block.title}</h4>
              <p className="mt-3 text-sm leading-7 text-[var(--portfolio-muted)]">
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
              className="rounded-lg border border-[var(--portfolio-line)] bg-[var(--portfolio-surface)] p-5 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-[var(--portfolio-accent-soft)] text-[var(--portfolio-accent)]">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-mono text-lg font-black">
                    {group.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--portfolio-muted)]">
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
      className="portfolio-section relative overflow-hidden border-y border-[var(--portfolio-line)] bg-[var(--portfolio-inverse)] px-4 py-16 text-[var(--portfolio-inverse-text)] sm:px-6 sm:py-20 lg:px-8"
    >
      <div className="absolute inset-0 bg-[var(--portfolio-grid)] opacity-30" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-12 grid gap-6 lg:grid-cols-[0.78fr_1fr] lg:items-end">
          <div>
            <p className="font-mono text-sm font-black uppercase tracking-[0.18em] text-[var(--portfolio-warm)]">
              Development Process
            </p>
            <h2 className="mt-3 max-w-3xl font-mono text-3xl font-black leading-tight sm:text-4xl">
              A disciplined workflow for turning requirements into reliable
              products.
            </h2>
          </div>
          <p className="max-w-3xl text-base leading-8 text-[var(--portfolio-inverse-muted)]">
            Each project moves through the same sequence: clarify the problem,
            shape the system, build the product, and refine the result until it
            is easier to use and easier to explain.
          </p>
        </div>

        <div className="grid gap-px overflow-hidden rounded-lg border border-[var(--portfolio-inverse-line)] bg-[var(--portfolio-inverse-line)] md:grid-cols-2 xl:grid-cols-4">
          {processSteps.map((item) => (
            <article
              key={item.step}
              className="bg-[var(--portfolio-inverse)] p-6"
            >
              <p className="font-mono text-sm font-black text-[var(--portfolio-warm)]">
                {item.step}
              </p>
              <h3 className="mt-5 font-mono text-2xl font-black">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-[var(--portfolio-inverse-muted)]">
                {item.body}
              </p>
              <div className="mt-6 space-y-2 border-t border-[var(--portfolio-inverse-line)] pt-4">
                {item.tags.map((tag) => (
                  <div
                    key={tag}
                    className="flex items-center gap-2 text-sm font-bold"
                  >
                    <CheckCircle2
                      className="size-4 shrink-0 text-[var(--portfolio-warm)]"
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

function ResumeSection() {
  return (
    <Section
      id="resume"
      eyebrow="Resume & Background"
      title="Academic background, practical project experience, and communication range."
      description="The experience stays grounded in personal full-stack project work instead of unsupported employment claims."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <article className="rounded-lg border border-[var(--portfolio-line)] bg-[var(--portfolio-surface)] p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-lg bg-[var(--portfolio-accent-soft)] text-[var(--portfolio-accent)]">
              <GraduationCap className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="font-mono text-sm font-black uppercase tracking-[0.16em] text-[var(--portfolio-accent)]">
                Education
              </p>
              <h3 className="mt-1 text-xl font-black">
                Satkhira Government College
              </h3>
            </div>
          </div>
          <p className="mt-6 text-base font-bold">
            Bachelor of Arts (Honours) in English
          </p>
          <p className="mt-2 text-sm text-[var(--portfolio-muted)]">
            Currently studying
          </p>
        </article>

        <article className="rounded-lg border border-[var(--portfolio-line)] bg-[var(--portfolio-surface)] p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-lg bg-[var(--portfolio-warm-soft)] text-[var(--portfolio-warm)]">
              <FileText className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="font-mono text-sm font-black uppercase tracking-[0.16em] text-[var(--portfolio-warm)]">
                Project Experience
              </p>
              <h3 className="mt-1 text-xl font-black">
                Full-Stack Personal Projects
              </h3>
            </div>
          </div>
          <p className="mt-6 text-sm leading-7 text-[var(--portfolio-muted)]">
            Practical development experience from building projects that combine
            frontend interfaces, backend logic, authentication, APIs, database
            work, and third-party integrations.
          </p>
        </article>
      </div>

      <div className="mt-6 grid gap-6 rounded-lg border border-[var(--portfolio-line)] bg-[var(--portfolio-surface)] p-6 shadow-[var(--portfolio-shadow)] lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <h3 className="font-mono text-2xl font-black">Resume</h3>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--portfolio-muted)]">
            Review the latest resume for a compact overview of skills, project
            work, education, and contact details.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <SecondaryLink href={personal.resume} icon={FileText} external>
            View Resume
          </SecondaryLink>
          <PrimaryLink href={personal.resume} icon={Download}>
            Open Resume
          </PrimaryLink>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {languages.map((language) => (
          <article
            key={language.name}
            className="rounded-lg border border-[var(--portfolio-line)] bg-[var(--portfolio-surface)] p-5 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <Languages
                className="size-5 text-[var(--portfolio-accent)]"
                aria-hidden="true"
              />
              <h3 className="font-mono text-lg font-black">{language.name}</h3>
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--portfolio-muted)]">
              {language.level}
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
            value="linkedin.com/in/md-asif-rayhan-joy-81444042a"
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
      className="rounded-lg border border-[var(--portfolio-line)] bg-[var(--portfolio-surface)] p-5 shadow-[var(--portfolio-shadow)] sm:p-6"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold" htmlFor="name">
          Name
          <input
            id="name"
            type="text"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            className="min-h-12 rounded-lg border border-[var(--portfolio-line)] bg-[var(--portfolio-input)] px-4 text-sm font-semibold text-[var(--portfolio-text)] outline-none transition placeholder:text-[var(--portfolio-subtle)] focus:border-[var(--portfolio-accent)] focus:ring-4 focus:ring-[var(--portfolio-ring)]"
            placeholder="Your name"
            {...register("name")}
          />
          {errors.name?.message ? (
            <span className="text-xs font-semibold text-[var(--portfolio-danger)]">
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
            className="min-h-12 rounded-lg border border-[var(--portfolio-line)] bg-[var(--portfolio-input)] px-4 text-sm font-semibold text-[var(--portfolio-text)] outline-none transition placeholder:text-[var(--portfolio-subtle)] focus:border-[var(--portfolio-accent)] focus:ring-4 focus:ring-[var(--portfolio-ring)]"
            placeholder="you@example.com"
            {...register("email")}
          />
          {errors.email?.message ? (
            <span className="text-xs font-semibold text-[var(--portfolio-danger)]">
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
          className="min-h-12 rounded-lg border border-[var(--portfolio-line)] bg-[var(--portfolio-input)] px-4 text-sm font-semibold text-[var(--portfolio-text)] outline-none transition placeholder:text-[var(--portfolio-subtle)] focus:border-[var(--portfolio-accent)] focus:ring-4 focus:ring-[var(--portfolio-ring)]"
          placeholder="Project, role, or opportunity"
          {...register("subject")}
        />
        {errors.subject?.message ? (
          <span className="text-xs font-semibold text-[var(--portfolio-danger)]">
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
          className="min-h-36 resize-y rounded-lg border border-[var(--portfolio-line)] bg-[var(--portfolio-input)] px-4 py-3 text-sm font-semibold text-[var(--portfolio-text)] outline-none transition placeholder:text-[var(--portfolio-subtle)] focus:border-[var(--portfolio-accent)] focus:ring-4 focus:ring-[var(--portfolio-ring)]"
          placeholder="Tell me about the role, project, or interview context."
          {...register("message")}
        />
        {errors.message?.message ? (
          <span className="text-xs font-semibold text-[var(--portfolio-danger)]">
            {errors.message.message}
          </span>
        ) : null}
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[var(--portfolio-accent)] px-5 text-sm font-black text-[var(--portfolio-accent-contrast)] shadow-sm transition hover:bg-[var(--portfolio-text)] hover:text-[var(--portfolio-bg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--portfolio-ring)] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        <Send className="size-4" aria-hidden="true" />
        Send Message
      </button>

      {submitted ? (
        <p role="status" className="mt-4 text-sm text-[var(--portfolio-muted)]">
          Message validated locally and prepared through email.
        </p>
      ) : null}
    </form>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 border-t border-[var(--portfolio-line)] bg-[var(--portfolio-surface)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-mono text-base font-black">{personal.name}</p>
          <p className="mt-1 text-sm font-semibold text-[var(--portfolio-muted)]">
            {personal.title}
          </p>
          <p className="mt-2 text-xs text-[var(--portfolio-subtle)]">
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
            className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-[var(--portfolio-text)] px-4 text-sm font-black text-[var(--portfolio-bg)] transition hover:bg-[var(--portfolio-accent)] hover:text-[var(--portfolio-accent-contrast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--portfolio-ring)]"
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
              <p className="font-mono text-sm font-black uppercase tracking-[0.18em] text-[var(--portfolio-accent)]">
                {eyebrow}
              </p>
            ) : null}
            <h2 className="mt-3 max-w-3xl font-mono text-3xl font-black leading-tight sm:text-4xl">
              {title}
            </h2>
          </div>
          {description ? (
            <p className="max-w-3xl text-base leading-8 text-[var(--portfolio-muted)]">
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
      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[var(--portfolio-accent)] px-5 text-sm font-black text-[var(--portfolio-accent-contrast)] shadow-sm transition hover:bg-[var(--portfolio-text)] hover:text-[var(--portfolio-bg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--portfolio-ring)]"
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
      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[var(--portfolio-line)] bg-[var(--portfolio-surface-raised)] px-5 text-sm font-black text-[var(--portfolio-text)] shadow-sm transition hover:border-[var(--portfolio-line-strong)] hover:bg-[var(--portfolio-surface-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--portfolio-ring)]"
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
      <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-[var(--portfolio-surface-muted)] text-[var(--portfolio-accent)]">
        <Icon className="size-4" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="font-mono text-xs font-black uppercase tracking-wide text-[var(--portfolio-subtle)]">
          {label}
        </p>
        <p className="mt-1 break-words font-bold text-[var(--portfolio-text)]">
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
      <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-[var(--portfolio-accent-soft)] text-[var(--portfolio-accent)]">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="block font-mono text-xs font-black uppercase tracking-wide text-[var(--portfolio-subtle)]">
          {label}
        </span>
        <span className="mt-1 block break-words text-sm font-bold text-[var(--portfolio-text)]">
          {value}
        </span>
      </span>
    </>
  );

  if (!href) {
    return (
      <div className="flex items-center gap-4 rounded-lg border border-[var(--portfolio-line)] bg-[var(--portfolio-surface)] p-4 shadow-sm">
        {content}
      </div>
    );
  }

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="flex items-center gap-4 rounded-lg border border-[var(--portfolio-line)] bg-[var(--portfolio-surface)] p-4 shadow-sm transition hover:border-[var(--portfolio-line-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--portfolio-ring)]"
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
      className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-[var(--portfolio-line)] px-4 text-sm font-bold text-[var(--portfolio-text)] transition hover:border-[var(--portfolio-line-strong)] hover:bg-[var(--portfolio-surface-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--portfolio-ring)]"
    >
      <Icon className="size-4" aria-hidden="true" />
      {label}
    </a>
  );
}
