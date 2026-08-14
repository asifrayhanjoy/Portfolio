"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUp,
  BookOpen,
  Briefcase,
  CheckCircle2,
  Code2,
  Database,
  Download,
  ExternalLink,
  FileText,
  GraduationCap,
  Layers3,
  Mail,
  MapPin,
  Menu,
  Monitor,
  Moon,
  Phone,
  Send,
  Server,
  ShieldCheck,
  Sun,
  X,
} from "lucide-react";
import {
  type ComponentType,
  useEffect,
  useState,
  type ReactNode,
  type SVGProps,
} from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

type NavItem = {
  label: string;
  href: `#${string}`;
  id: string;
};

type SkillLevel = "Core" | "Working" | "Learning" | "Basic";

type Skill = {
  name: string;
  level: SkillLevel;
};

type SkillGroup = {
  title: string;
  icon: IconComponent;
  skills: Skill[];
};

type ProjectLink = {
  label: string;
  href: string;
};

type CaseStudyBlock = {
  title: string;
  body: string;
};

type Project = {
  name: string;
  slug: string;
  description: string;
  technologies: string[];
  repositoryLinks: ProjectLink[];
  liveDemo?: string;
  caseStudy: CaseStudyBlock[];
};

type ContactFormValues = z.infer<typeof contactSchema>;
type ThemePreference = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";

const personal = {
  name: "MD. ASIF RAYHAN JOY",
  title: "Full Stack Web Developer",
  location: "Satkhira, Khulna, Bangladesh",
  email: "amsiimf06@gmail.com",
  phone: "+8801302-271472",
  github: "https://github.com/asifrayhanjoy",
  linkedin: "",
  resume: "https://my-resume-s17p.vercel.app/",
};

const navItems: NavItem[] = [
  { label: "Home", href: "#home", id: "home" },
  { label: "About", href: "#about", id: "about" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Education", href: "#education", id: "education" },
  { label: "Resume", href: "#resume", id: "resume" },
  { label: "Contact", href: "#contact", id: "contact" },
];

const quickStats = [
  { value: "2+", label: "Personal Projects" },
  { value: "Full Stack", label: "Development" },
  { value: "Modern", label: "Web Technologies" },
  { value: "Continuous", label: "Learning" },
];

const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    icon: Code2,
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
    skills: [
      { name: "React.js", level: "Core" },
      { name: "Next.js", level: "Working" },
      { name: "Tailwind CSS", level: "Core" },
    ],
  },
  {
    title: "Backend",
    icon: Server,
    skills: [
      { name: "Node.js", level: "Working" },
      { name: "Express.js", level: "Working" },
      { name: "NestJS", level: "Learning" },
    ],
  },
  {
    title: "Database",
    icon: Database,
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
    skills: [
      { name: "JWT", level: "Working" },
      { name: "Refresh Token", level: "Working" },
      { name: "OTP Authentication", level: "Working" },
      { name: "RBAC", level: "Working" },
    ],
  },
  {
    title: "Tools",
    icon: Briefcase,
    skills: [
      { name: "Git", level: "Working" },
      { name: "GitHub", level: "Working" },
      { name: "Docker", level: "Basic" },
      { name: "Postman", level: "Working" },
      { name: "VS Code", level: "Core" },
    ],
  },
  {
    title: "Additional Technologies",
    icon: BookOpen,
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

const projects: Project[] = [
  {
    name: "E-Commerce",
    slug: "e-commerce",
    description:
      "A modern full-stack e-commerce platform built with React, Next.js, Node.js, MongoDB, Prisma, TypeScript, JavaScript, Tailwind CSS, and REST APIs.",
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
        title: "Project Overview",
        body: "A full-stack e-commerce project organized with separate frontend and backend repositories. The public portfolio description should stay focused on the provided stack until repository-level feature details are reviewed.",
      },
      {
        title: "Architecture",
        body: "Known structure: React/Next.js frontend, Node.js backend, REST API communication, MongoDB, Prisma, TypeScript, JavaScript, and Tailwind CSS.",
      },
      {
        title: "Main Features",
        body: "Feature-level claims are intentionally marked for replacement after repository inspection. Add verified notes for catalog, cart, checkout, admin, order, and user flows only when confirmed in the code.",
      },
      {
        title: "Authentication",
        body: "Authentication details are a placeholder for verified implementation notes. Keep the final version tied to the actual backend code rather than generic e-commerce assumptions.",
      },
      {
        title: "Backend/API",
        body: "The backend is represented as a Node.js REST API project. Add endpoint groups, request validation, middleware, and error-handling details after reviewing the repository.",
      },
      {
        title: "Database",
        body: "MongoDB and Prisma are listed in the supplied project stack. Replace this note with exact schema/model details after the repository is audited.",
      },
      {
        title: "Challenges",
        body: "Use this space for real implementation challenges found in the codebase, such as data modeling, API design, authentication flow, state management, or deployment constraints.",
      },
      {
        title: "What I Learned",
        body: "This project demonstrates practical full-stack learning across frontend UI, backend API structure, database work, and connecting real application layers together.",
      },
    ],
  },
  {
    name: "My-App",
    slug: "my-app",
    description:
      "A modern full-stack application built using Next.js, React, TypeScript, PostgreSQL, Prisma, Stripe, Authentication, and Next.js API Routes.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Stripe",
      "Authentication",
      "Next.js API Routes",
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
        title: "Project Overview",
        body: "A full-stack Next.js application using React, TypeScript, PostgreSQL, Prisma, Stripe, authentication, and Next.js API Routes.",
      },
      {
        title: "Architecture",
        body: "This project should be represented as a Next.js full-stack app, not an Express.js or NestJS backend. Server-side work belongs to Next.js API Routes.",
      },
      {
        title: "Main Features",
        body: "Specific product features should be added after repository review. Current verified positioning: authentication, database-backed behavior, Stripe integration, and API Routes are part of the project scope.",
      },
      {
        title: "Authentication",
        body: "Authentication is listed in the project stack. Replace this placeholder with exact provider, session, middleware, and authorization details after code review.",
      },
      {
        title: "Database",
        body: "PostgreSQL and Prisma are listed in the supplied stack. Add model, relation, migration, and query details only when confirmed from the repository.",
      },
      {
        title: "Payment Integration",
        body: "Stripe is listed in the supplied stack. Add verified checkout, webhook, subscription, or payment flow details after inspecting the implementation.",
      },
      {
        title: "API Routes",
        body: "The backend behavior is implemented through Next.js API Routes. Keep this distinction clear during interviews because the project is not Express.js or NestJS based.",
      },
      {
        title: "What I Learned",
        body: "This project strengthens full-stack Next.js practice across typed UI work, API route design, database integration, authentication, and third-party payment workflows.",
      },
    ],
  },
];

const approachSteps = [
  {
    step: "01",
    title: "Understand",
    subtitle: "Define the real problem",
    body: "Clarify the user goal, business context, core workflows, data requirements, and success criteria before touching the UI or backend.",
    focus: ["User flow", "Requirements", "Success criteria"],
  },
  {
    step: "02",
    title: "Plan",
    subtitle: "Design the system shape",
    body: "Map the application structure, database model, API boundaries, authentication flow, and page architecture so the build has direction.",
    focus: ["Architecture", "Database", "API contracts"],
  },
  {
    step: "03",
    title: "Build",
    subtitle: "Ship the working product",
    body: "Develop the interface, server logic, validations, integrations, reusable components, and data flows with clean TypeScript boundaries.",
    focus: ["UI", "Backend logic", "Integrations"],
  },
  {
    step: "04",
    title: "Improve",
    subtitle: "Refine until reliable",
    body: "Review behavior, fix edge cases, improve accessibility, optimize performance, and make the experience clearer for real users.",
    focus: ["Debugging", "Accessibility", "Performance"],
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

const levelStyles: Record<SkillLevel, string> = {
  Core: "border-[var(--badge-core-border)] bg-[var(--badge-core-bg)] text-[var(--badge-core-text)]",
  Working:
    "border-[var(--badge-working-border)] bg-[var(--badge-working-bg)] text-[var(--badge-working-text)]",
  Learning:
    "border-[var(--badge-learning-border)] bg-[var(--badge-learning-bg)] text-[var(--badge-learning-text)]",
  Basic:
    "border-[var(--badge-basic-border)] bg-[var(--badge-basic-bg)] text-[var(--badge-basic-text)]",
};

const themeStorageKey = "asif-portfolio-theme";
const copyrightYear = 2026;

const portfolioStyles = `
  html {
    scroll-behavior: smooth;
  }

  body {
    min-width: 320px;
  }

  .portfolio-page {
    --portfolio-bg: #f6f8fb;
    --portfolio-surface: #ffffff;
    --portfolio-surface-raised: rgba(255, 255, 255, 0.86);
    --portfolio-surface-muted: #edf2f7;
    --portfolio-text: #111827;
    --portfolio-muted: #526071;
    --portfolio-subtle: #778195;
    --portfolio-border: rgba(15, 23, 42, 0.12);
    --portfolio-border-strong: rgba(15, 23, 42, 0.2);
    --portfolio-accent: #2563eb;
    --portfolio-accent-strong: #1d4ed8;
    --portfolio-accent-contrast: #ffffff;
    --portfolio-accent-soft: rgba(37, 99, 235, 0.1);
    --portfolio-secondary: #0f766e;
    --portfolio-secondary-soft: rgba(15, 118, 110, 0.11);
    --portfolio-warm: #b45309;
    --portfolio-warm-soft: rgba(180, 83, 9, 0.1);
    --portfolio-ring: rgba(37, 99, 235, 0.35);
    --portfolio-code: #0f172a;
    --portfolio-code-text: #dbeafe;
    --portfolio-nav: rgba(255, 255, 255, 0.78);
    --portfolio-shadow: 0 24px 80px rgba(15, 23, 42, 0.1);
    --portfolio-hero: radial-gradient(circle at 12% 18%, rgba(37, 99, 235, 0.14), transparent 32%), radial-gradient(circle at 88% 8%, rgba(15, 118, 110, 0.12), transparent 28%), linear-gradient(180deg, #f7f9fc 0%, #edf2f7 100%);
    --badge-core-bg: rgba(37, 99, 235, 0.1);
    --badge-core-border: rgba(37, 99, 235, 0.22);
    --badge-core-text: #1d4ed8;
    --badge-working-bg: rgba(15, 118, 110, 0.1);
    --badge-working-border: rgba(15, 118, 110, 0.22);
    --badge-working-text: #0f766e;
    --badge-learning-bg: rgba(180, 83, 9, 0.1);
    --badge-learning-border: rgba(180, 83, 9, 0.22);
    --badge-learning-text: #b45309;
    --badge-basic-bg: rgba(109, 40, 217, 0.1);
    --badge-basic-border: rgba(109, 40, 217, 0.2);
    --badge-basic-text: #6d28d9;
    background: var(--portfolio-bg);
    color: var(--portfolio-text);
    overflow-x: hidden;
  }

  .portfolio-page[data-theme="dark"] {
    --portfolio-bg: #050609;
    --portfolio-surface: #0e1117;
    --portfolio-surface-raised: rgba(14, 17, 23, 0.88);
    --portfolio-surface-muted: #151a23;
    --portfolio-text: #f5f7fb;
    --portfolio-muted: #a8b0c0;
    --portfolio-subtle: #7f899c;
    --portfolio-border: rgba(255, 255, 255, 0.12);
    --portfolio-border-strong: rgba(255, 255, 255, 0.2);
    --portfolio-accent: #60a5fa;
    --portfolio-accent-strong: #93c5fd;
    --portfolio-accent-contrast: #06111f;
    --portfolio-accent-soft: rgba(96, 165, 250, 0.14);
    --portfolio-secondary: #2dd4bf;
    --portfolio-secondary-soft: rgba(45, 212, 191, 0.12);
    --portfolio-warm: #fbbf24;
    --portfolio-warm-soft: rgba(251, 191, 36, 0.12);
    --portfolio-ring: rgba(96, 165, 250, 0.38);
    --portfolio-code: #070a10;
    --portfolio-code-text: #dbeafe;
    --portfolio-nav: rgba(5, 6, 9, 0.78);
    --portfolio-shadow: 0 24px 80px rgba(0, 0, 0, 0.4);
    --portfolio-hero: radial-gradient(circle at 12% 18%, rgba(96, 165, 250, 0.13), transparent 32%), radial-gradient(circle at 88% 8%, rgba(45, 212, 191, 0.11), transparent 28%), linear-gradient(180deg, #050609 0%, #0d1118 100%);
    --badge-core-bg: rgba(96, 165, 250, 0.13);
    --badge-core-border: rgba(96, 165, 250, 0.26);
    --badge-core-text: #93c5fd;
    --badge-working-bg: rgba(45, 212, 191, 0.12);
    --badge-working-border: rgba(45, 212, 191, 0.24);
    --badge-working-text: #5eead4;
    --badge-learning-bg: rgba(251, 191, 36, 0.12);
    --badge-learning-border: rgba(251, 191, 36, 0.24);
    --badge-learning-text: #fcd34d;
    --badge-basic-bg: rgba(196, 181, 253, 0.12);
    --badge-basic-border: rgba(196, 181, 253, 0.22);
    --badge-basic-text: #c4b5fd;
  }

  .portfolio-page[data-theme="light"] {
    color-scheme: light;
  }

  .portfolio-page[data-theme="dark"] {
    color-scheme: dark;
  }

  .portfolio-page::before {
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    content: "";
    background-image: linear-gradient(rgba(120, 130, 150, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(120, 130, 150, 0.08) 1px, transparent 1px);
    background-size: 54px 54px;
    mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.75), transparent 72%);
  }

  .portfolio-gradient-text {
    background: linear-gradient(135deg, var(--portfolio-text), var(--portfolio-accent), var(--portfolio-secondary));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .portfolio-section {
    scroll-margin-top: 96px;
  }

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }

    .portfolio-page *,
    .portfolio-page *::before,
    .portfolio-page *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function isThemePreference(value: string | null): value is ThemePreference {
  return value === "light" || value === "dark" || value === "system";
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

export default function Home() {
  return <PortfolioPage />;
}

function PortfolioPage() {
  const [themePreference, setThemePreference] =
    useState<ThemePreference>("system");
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>("light");
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(themeStorageKey);

    if (isThemePreference(storedTheme)) {
      setThemePreference(storedTheme);
    }

    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) {
      return;
    }

    const resolveTheme = () => {
      if (themePreference !== "system") {
        setResolvedTheme(themePreference);
        return;
      }

      setResolvedTheme(
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light",
      );
    };

    window.localStorage.setItem(themeStorageKey, themePreference);
    resolveTheme();

    if (themePreference !== "system") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", resolveTheme);

    return () => mediaQuery.removeEventListener("change", resolveTheme);
  }, [hasMounted, themePreference]);

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
    sameAs: [personal.github],
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
      className="portfolio-page min-h-screen bg-[var(--portfolio-bg)] text-[var(--portfolio-text)]"
      data-theme={resolvedTheme}
    >
      <style>{portfolioStyles}</style>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header
        themePreference={themePreference}
        onThemeChange={setThemePreference}
      />
      <main className="relative z-10">
        <HeroSection />
        <QuickStatsSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ApproachSection />
        <EducationSection />
        <ResumeSection />
        <LanguagesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

function Header({
  themePreference,
  onThemeChange,
}: {
  themePreference: ThemePreference;
  onThemeChange: (theme: ThemePreference) => void;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const updateScrolled = () => setIsScrolled(window.scrollY > 18);

    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });

    return () => window.removeEventListener("scroll", updateScrolled);
  }, []);

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
        rootMargin: "-35% 0px -50% 0px",
        threshold: [0.08, 0.2, 0.5],
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
          ? "border-[var(--portfolio-border)] bg-[var(--portfolio-nav)] shadow-[0_12px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl"
          : "border-transparent bg-transparent",
      )}
    >
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <a
          href="#home"
          onClick={closeMenu}
          className="group inline-flex min-w-0 items-center gap-3 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--portfolio-ring)]"
        >
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[var(--portfolio-text)] text-sm font-bold text-[var(--portfolio-bg)]">
            AR
          </span>
          <span className="hidden min-w-0 leading-none sm:block">
            <span className="block truncate text-sm font-semibold tracking-wide">
              ASIF RAYHAN
            </span>
            <span className="mt-1 block truncate text-xs text-[var(--portfolio-muted)]">
              Full Stack Web Developer
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--portfolio-ring)]",
                activeSection === item.id
                  ? "bg-[var(--portfolio-accent-soft)] text-[var(--portfolio-accent)]"
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
            className="hidden size-10 place-items-center rounded-full border border-[var(--portfolio-border)] text-[var(--portfolio-muted)] transition hover:border-[var(--portfolio-border-strong)] hover:text-[var(--portfolio-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--portfolio-ring)] sm:grid"
          >
            <Github className="size-4" aria-hidden="true" />
          </a>
          <span
            aria-label="LinkedIn profile placeholder"
            className="hidden size-10 place-items-center rounded-full border border-[var(--portfolio-border)] text-[var(--portfolio-subtle)] opacity-70 sm:grid"
            title="LinkedIn to be added"
          >
            <Linkedin className="size-4" aria-hidden="true" />
          </span>
          <a
            href="#contact"
            className="hidden min-h-10 items-center gap-2 rounded-full bg-[var(--portfolio-text)] px-4 text-sm font-semibold text-[var(--portfolio-bg)] transition hover:bg-[var(--portfolio-accent)] hover:text-[var(--portfolio-accent-contrast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--portfolio-ring)] lg:inline-flex"
          >
            Let&apos;s Talk
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
          <button
            type="button"
            aria-label="Open navigation menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((value) => !value)}
            className="grid size-10 place-items-center rounded-full border border-[var(--portfolio-border)] text-[var(--portfolio-text)] transition hover:border-[var(--portfolio-border-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--portfolio-ring)] md:hidden"
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
            className="fixed inset-x-4 top-20 z-50 rounded-lg border border-[var(--portfolio-border)] bg-[var(--portfolio-surface-raised)] p-3 shadow-[var(--portfolio-shadow)] backdrop-blur-xl md:hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18 }}
          >
            <div className="grid gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className={cn(
                    "rounded-lg px-4 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--portfolio-ring)]",
                    activeSection === item.id
                      ? "bg-[var(--portfolio-accent-soft)] text-[var(--portfolio-accent)]"
                      : "text-[var(--portfolio-muted)] hover:bg-[var(--portfolio-surface-muted)] hover:text-[var(--portfolio-text)]",
                  )}
                >
                  {item.label}
                </a>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 border-t border-[var(--portfolio-border)] pt-3">
              <a
                href={personal.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[var(--portfolio-border)] text-sm font-semibold text-[var(--portfolio-text)]"
              >
                <Github className="size-4" aria-hidden="true" />
                GitHub
              </a>
              <a
                href="#contact"
                onClick={closeMenu}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--portfolio-text)] text-sm font-semibold text-[var(--portfolio-bg)]"
              >
                <Mail className="size-4" aria-hidden="true" />
                Let&apos;s Talk
              </a>
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
    { value: "light" as const, label: "Light", icon: Sun },
    { value: "dark" as const, label: "Dark", icon: Moon },
    { value: "system" as const, label: "System", icon: Monitor },
  ];

  return (
    <div
      role="group"
      aria-label="Theme preference"
      className="hidden rounded-full border border-[var(--portfolio-border)] bg-[var(--portfolio-surface-raised)] p-1 backdrop-blur sm:flex"
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
              "grid size-8 place-items-center rounded-full text-[var(--portfolio-muted)] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--portfolio-ring)]",
              isActive &&
                "bg-[var(--portfolio-text)] text-[var(--portfolio-bg)] shadow-sm",
            )}
          >
            <Icon className="size-4" aria-hidden="true" />
          </button>
        );
      })}
    </div>
  );
}

function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="portfolio-section relative overflow-hidden px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:px-8"
      style={{ background: "var(--portfolio-hero)" }}
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--portfolio-border)] bg-[var(--portfolio-surface-raised)] px-3 py-2 text-sm font-medium text-[var(--portfolio-muted)] shadow-sm backdrop-blur">
            <span className="relative flex size-2.5" aria-hidden="true">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--portfolio-secondary)] opacity-50" />
              <span className="relative inline-flex size-2.5 rounded-full bg-[var(--portfolio-secondary)]" />
            </span>
            Open to Opportunities
          </div>

          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--portfolio-accent)]">
            {personal.title}
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight text-[var(--portfolio-text)] sm:text-6xl lg:text-7xl">
            {personal.name}
          </h1>
          <h2 className="mt-5 max-w-3xl text-3xl font-semibold leading-tight sm:text-5xl">
            <span className="portfolio-gradient-text">
              Building Modern, Scalable &amp; User-Focused Web Applications.
            </span>
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--portfolio-muted)] sm:text-lg">
            I build full-stack web applications with React, Next.js, Node.js,
            TypeScript, MongoDB, PostgreSQL, Prisma, and modern API patterns.
            My focus is clean interfaces, reliable backend structure, and
            practical problem solving.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <PrimaryLink href="#projects" icon={ArrowRight}>
              View My Work
            </PrimaryLink>
            <SecondaryLink href={personal.resume} icon={Download}>
              Download Resume
            </SecondaryLink>
            <SecondaryLink href="#contact" icon={Mail}>
              Contact Me
            </SecondaryLink>
            <SecondaryLink href={personal.github} icon={Github} external>
              GitHub
            </SecondaryLink>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {[
              "React",
              "Next.js",
              "Node.js",
              "TypeScript",
              "MongoDB",
              "PostgreSQL",
              "Prisma",
            ].map((technology) => (
              <span
                key={technology}
                className="rounded-full border border-[var(--portfolio-border)] bg-[var(--portfolio-surface-raised)] px-3 py-1.5 text-xs font-semibold text-[var(--portfolio-muted)] backdrop-blur"
              >
                {technology}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.55, ease: "easeOut" }}
          className="mx-auto w-full max-w-xl lg:ml-auto"
        >
          <div className="rounded-lg border border-[var(--portfolio-border)] bg-[var(--portfolio-surface-raised)] p-4 shadow-[var(--portfolio-shadow)] backdrop-blur">
            <div className="flex items-center justify-between border-b border-[var(--portfolio-border)] pb-4">
              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full bg-[#ef4444]" />
                <span className="size-3 rounded-full bg-[#f59e0b]" />
                <span className="size-3 rounded-full bg-[#10b981]" />
              </div>
              <span className="text-xs font-medium text-[var(--portfolio-subtle)]">
                portfolio.ts
              </span>
            </div>
            <pre className="mt-5 max-w-full overflow-x-auto rounded-lg bg-[var(--portfolio-code)] p-5 text-sm leading-7 text-[var(--portfolio-code-text)]">
              <code>{`const developer = {
  name: "MD. ASIF RAYHAN JOY",
  role: "Full Stack Web Developer",
  location: "Bangladesh",
  focus: ["Frontend", "Backend", "APIs"],
  stack: ["Next.js", "Node.js", "Prisma"]
};`}</code>
            </pre>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                { label: "Frontend", value: "React UI" },
                { label: "Backend", value: "REST APIs" },
                { label: "Database", value: "SQL + NoSQL" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="border-t border-[var(--portfolio-border)] pt-4"
                >
                  <p className="text-xs font-medium text-[var(--portfolio-subtle)]">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-[var(--portfolio-text)]">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function QuickStatsSection() {
  return (
    <section className="relative z-10 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {quickStats.map((stat) => (
          <motion.div
            key={stat.label}
            className="rounded-lg border border-[var(--portfolio-border)] bg-[var(--portfolio-surface-raised)] p-5 shadow-sm backdrop-blur"
            whileHover={{ y: -3 }}
            transition={{ duration: 0.18 }}
          >
            <p className="text-2xl font-semibold text-[var(--portfolio-text)]">
              {stat.value}
            </p>
            <p className="mt-2 text-sm text-[var(--portfolio-muted)]">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="A practical developer focused on building useful web applications."
      description="I enjoy turning ideas into clean, maintainable software with thoughtful UI, clear backend boundaries, and reliable data handling."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.72fr]">
        <div className="space-y-5 text-base leading-8 text-[var(--portfolio-muted)]">
          <p>
            I am a passionate Full Stack Web Developer from Satkhira, Khulna,
            Bangladesh. I enjoy building modern web applications and solving
            real-world problems through frontend development, backend
            development, API design, authentication, database design, and
            scalable application structure.
          </p>
          <p>
            My work is centered around React, Next.js, Node.js, TypeScript,
            MongoDB, PostgreSQL, Prisma, and modern tooling. I am continuously
            learning and improving my software engineering skills through
            practical full-stack projects.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "Frontend development",
              "Backend development",
              "API development",
              "Database design",
              "Authentication",
              "Scalable architecture",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-lg border border-[var(--portfolio-border)] bg-[var(--portfolio-surface)] p-4 text-sm font-semibold text-[var(--portfolio-text)]"
              >
                <CheckCircle2
                  className="size-4 shrink-0 text-[var(--portfolio-secondary)]"
                  aria-hidden="true"
                />
                {item}
              </div>
            ))}
          </div>
        </div>

        <aside className="rounded-lg border border-[var(--portfolio-border)] bg-[var(--portfolio-surface-raised)] p-6 shadow-[var(--portfolio-shadow)] backdrop-blur">
          <div className="flex items-center gap-4">
            <div className="grid size-14 shrink-0 place-items-center rounded-lg bg-[var(--portfolio-text)] text-lg font-bold text-[var(--portfolio-bg)]">
              AR
            </div>
            <div className="min-w-0">
              <p className="truncate text-lg font-semibold">{personal.name}</p>
              <p className="mt-1 text-sm text-[var(--portfolio-muted)]">
                {personal.title}
              </p>
            </div>
          </div>
          <div className="mt-6 space-y-4 text-sm">
            <InfoRow icon={MapPin} label="Location" value={personal.location} />
            <InfoRow icon={Mail} label="Email" value={personal.email} />
            <InfoRow icon={Phone} label="Phone" value={personal.phone} />
            <InfoRow icon={Github} label="GitHub" value="asifrayhanjoy" />
          </div>
        </aside>
      </div>
    </Section>
  );
}

function SkillsSection() {
  return (
    <Section
      id="skills"
      eyebrow="Technical Skills"
      title="A focused full-stack toolkit with honest skill levels."
      description="Skills are grouped by where they are used in real applications. Learning and basic technologies are intentionally separated from core strengths."
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {skillGroups.map((group) => {
          const Icon = group.icon;

          return (
            <motion.article
              key={group.title}
              className="rounded-lg border border-[var(--portfolio-border)] bg-[var(--portfolio-surface)] p-5 shadow-sm"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.18 }}
            >
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-lg bg-[var(--portfolio-accent-soft)] text-[var(--portfolio-accent)]">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="text-lg font-semibold">{group.title}</h3>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold",
                      levelStyles[skill.level],
                    )}
                  >
                    {skill.name}
                    <span className="text-[10px] uppercase tracking-wide opacity-80">
                      {skill.level}
                    </span>
                  </span>
                ))}
              </div>
            </motion.article>
          );
        })}
      </div>
    </Section>
  );
}

function ProjectsSection() {
  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Interview-ready project stories without unsupported claims."
      description="These cards are structured so screenshots, live demos, and repository-backed implementation details can be replaced cleanly as the projects evolve."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      <div className="mt-12 space-y-8">
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
      className="flex h-full flex-col rounded-lg border border-[var(--portfolio-border)] bg-[var(--portfolio-surface)] p-5 shadow-sm"
      whileHover={shouldReduceMotion ? undefined : { y: -5 }}
      transition={{ duration: 0.18 }}
    >
      <ProjectVisual project={project} />
      <div className="mt-5 flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-semibold">{project.name}</h3>
            <p className="mt-3 text-sm leading-7 text-[var(--portfolio-muted)]">
              {project.description}
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <span
              key={technology}
              className="rounded-full border border-[var(--portfolio-border)] bg-[var(--portfolio-surface-muted)] px-3 py-1 text-xs font-semibold text-[var(--portfolio-muted)]"
            >
              {technology}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {project.repositoryLinks.map((link) => (
            <SecondaryLink key={link.href} href={link.href} icon={Github} external>
              {link.label}
            </SecondaryLink>
          ))}
          {project.liveDemo ? (
            <SecondaryLink href={project.liveDemo} icon={ExternalLink} external>
              Live Demo
            </SecondaryLink>
          ) : (
            <span className="inline-flex min-h-11 cursor-not-allowed items-center justify-center gap-2 rounded-full border border-[var(--portfolio-border)] px-4 text-sm font-semibold text-[var(--portfolio-subtle)] opacity-75">
              <ExternalLink className="size-4" aria-hidden="true" />
              Live Demo TBD
            </span>
          )}
          <PrimaryLink href={`#project-${project.slug}`} icon={ArrowRight}>
            View Details
          </PrimaryLink>
        </div>
      </div>
    </motion.article>
  );
}

function ProjectVisual({ project }: { project: Project }) {
  return (
    <div
      className="relative aspect-[16/10] overflow-hidden rounded-lg border border-[var(--portfolio-border)] bg-[var(--portfolio-surface-muted)]"
      aria-label={`${project.name} screenshot placeholder`}
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,var(--portfolio-accent-soft),transparent_48%,var(--portfolio-secondary-soft))]" />
      <div className="relative z-10 flex h-full flex-col p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-[var(--portfolio-accent)]" />
            <span className="size-2.5 rounded-full bg-[var(--portfolio-secondary)]" />
            <span className="size-2.5 rounded-full bg-[var(--portfolio-warm)]" />
          </div>
          <span className="rounded-full bg-[var(--portfolio-surface-raised)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[var(--portfolio-muted)]">
            Replaceable
          </span>
        </div>
        <div className="mt-6 h-3 w-36 rounded-full bg-[var(--portfolio-text)] opacity-80" />
        <div className="mt-3 h-2 w-48 max-w-full rounded-full bg-[var(--portfolio-muted)] opacity-35" />
        <div className="mt-6 grid flex-1 grid-cols-3 gap-3">
          {[0, 1, 2].map((item) => (
            <div
              key={item}
              className="rounded-lg border border-[var(--portfolio-border)] bg-[var(--portfolio-surface-raised)] p-3 backdrop-blur"
            >
              <div className="h-12 rounded bg-[var(--portfolio-surface-muted)]" />
              <div className="mt-3 h-2 rounded-full bg-[var(--portfolio-muted)] opacity-30" />
              <div className="mt-2 h-2 w-2/3 rounded-full bg-[var(--portfolio-muted)] opacity-20" />
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs font-medium text-[var(--portfolio-subtle)]">
          Project screenshot placeholder
        </p>
      </div>
    </div>
  );
}

function ProjectCaseStudy({ project }: { project: Project }) {
  return (
    <article
      id={`project-${project.slug}`}
      className="portfolio-section rounded-lg border border-[var(--portfolio-border)] bg-[var(--portfolio-surface)] p-5 shadow-sm sm:p-6"
    >
      <div className="flex flex-col gap-4 border-b border-[var(--portfolio-border)] pb-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--portfolio-accent)]">
            Case Study
          </p>
          <h3 className="mt-3 text-3xl font-semibold">{project.name}</h3>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--portfolio-muted)]">
            {project.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {project.repositoryLinks.map((link) => (
            <SecondaryLink key={link.href} href={link.href} icon={Github} external>
              {link.label}
            </SecondaryLink>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {project.caseStudy.map((block) => (
          <div key={block.title} className="border-t border-[var(--portfolio-border)] pt-5">
            <h4 className="text-base font-semibold">{block.title}</h4>
            <p className="mt-3 text-sm leading-7 text-[var(--portfolio-muted)]">
              {block.body}
            </p>
          </div>
        ))}
      </div>
    </article>
  );
}

function ApproachSection() {
  return (
    <Section
      id="approach"
      eyebrow="Development Approach"
      title="A disciplined workflow for turning requirements into reliable products."
      description="This process is designed to make project discussions easier in interviews: clear decisions, visible tradeoffs, and practical execution."
    >
      <div className="relative">
        <div className="mb-6 grid gap-4 rounded-lg border border-[var(--portfolio-border)] bg-[var(--portfolio-surface-raised)] p-5 shadow-sm backdrop-blur md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-sm font-semibold text-[var(--portfolio-accent)]">
              Practical engineering loop
            </p>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-[var(--portfolio-muted)]">
              I keep each project grounded in the same sequence: define the
              problem, design the system, build the product, and improve the
              result with real feedback.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Product thinking", "Clean architecture", "Iterative polish"].map(
              (item) => (
                <span
                  key={item}
                  className="rounded-full border border-[var(--portfolio-border)] bg-[var(--portfolio-surface)] px-3 py-1.5 text-xs font-semibold text-[var(--portfolio-muted)]"
                >
                  {item}
                </span>
              ),
            )}
          </div>
        </div>

        <div className="pointer-events-none absolute left-6 top-40 hidden h-[calc(100%-11rem)] w-px bg-[linear-gradient(to_bottom,var(--portfolio-accent),var(--portfolio-secondary),transparent)] lg:block" />

        <div className="grid gap-5 lg:grid-cols-4">
          {approachSteps.map((item, index) => (
            <motion.article
            key={item.step}
              className="group relative overflow-hidden rounded-lg border border-[var(--portfolio-border)] bg-[var(--portfolio-surface)] p-5 shadow-sm transition hover:border-[var(--portfolio-border-strong)]"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.18 }}
            >
              <div
                className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,var(--portfolio-accent),var(--portfolio-secondary))] opacity-80"
                aria-hidden="true"
              />
              <div className="absolute right-4 top-4 text-6xl font-semibold leading-none text-[var(--portfolio-surface-muted)] transition group-hover:text-[var(--portfolio-accent-soft)]">
                {item.step}
              </div>
              <div className="relative">
                <span className="inline-flex size-12 items-center justify-center rounded-full border border-[var(--portfolio-border)] bg-[var(--portfolio-surface-raised)] text-sm font-bold text-[var(--portfolio-accent)] shadow-sm">
                  {item.step}
                </span>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--portfolio-subtle)]">
                  Stage {index + 1}
                </p>
                <h3 className="mt-2 text-2xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm font-semibold text-[var(--portfolio-accent)]">
                  {item.subtitle}
                </p>
                <p className="mt-4 text-sm leading-7 text-[var(--portfolio-muted)]">
                  {item.body}
                </p>
                <div className="mt-5 space-y-2 border-t border-[var(--portfolio-border)] pt-4">
                  {item.focus.map((focusItem) => (
                    <div
                      key={focusItem}
                      className="flex items-center gap-2 text-sm font-medium text-[var(--portfolio-text)]"
                    >
                      <CheckCircle2
                        className="size-4 shrink-0 text-[var(--portfolio-secondary)]"
                        aria-hidden="true"
                      />
                      {focusItem}
                    </div>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            {
              label: "Before build",
              value: "Clear scope, data model, and user journey",
            },
            {
              label: "During build",
              value: "Reusable UI, typed logic, and API boundaries",
            },
            {
              label: "After build",
              value: "Debugging, accessibility, performance, and polish",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="border-l-2 border-[var(--portfolio-accent)] bg-[var(--portfolio-surface-raised)] px-4 py-3 shadow-sm backdrop-blur"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--portfolio-subtle)]">
                {item.label}
              </p>
              <p className="mt-2 text-sm font-semibold leading-6 text-[var(--portfolio-text)]">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function EducationSection() {
  return (
    <Section
      id="education"
      eyebrow="Education & Experience"
      title="Academic background and practical project experience."
      description="No fake employment claims. The current experience section is based on personal full-stack project work."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-lg border border-[var(--portfolio-border)] bg-[var(--portfolio-surface)] p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-lg bg-[var(--portfolio-accent-soft)] text-[var(--portfolio-accent)]">
              <GraduationCap className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--portfolio-accent)]">
                Education
              </p>
              <h3 className="mt-1 text-xl font-semibold">
                Satkhira Government College
              </h3>
            </div>
          </div>
          <p className="mt-5 text-base font-medium">
            Bachelor of Arts (Honours) in English
          </p>
          <p className="mt-2 text-sm text-[var(--portfolio-muted)]">
            Currently Studying
          </p>
        </article>

        <article className="rounded-lg border border-[var(--portfolio-border)] bg-[var(--portfolio-surface)] p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-lg bg-[var(--portfolio-secondary-soft)] text-[var(--portfolio-secondary)]">
              <FileText className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--portfolio-secondary)]">
                Project Experience
              </p>
              <h3 className="mt-1 text-xl font-semibold">
                Full-Stack Personal Projects
              </h3>
            </div>
          </div>
          <p className="mt-5 text-sm leading-7 text-[var(--portfolio-muted)]">
            My practical development experience comes from building personal
            full-stack projects that combine frontend interfaces, backend
            logic, authentication, APIs, database work, and integrations.
          </p>
        </article>
      </div>
    </Section>
  );
}

function ResumeSection() {
  return (
    <Section
      id="resume"
      eyebrow="Resume"
      title="Want to know more about my experience and technical background?"
      description="The resume buttons point to a replaceable PDF path so the latest document can be added without changing the UI."
    >
      <div className="flex flex-col gap-3 rounded-lg border border-[var(--portfolio-border)] bg-[var(--portfolio-surface)] p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-xl font-semibold">Resume PDF</h3>
          <p className="mt-2 break-all text-sm text-[var(--portfolio-muted)]">
            {personal.resume}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <SecondaryLink href={personal.resume} icon={FileText} external>
            View Resume
          </SecondaryLink>
          <a
            href={personal.resume}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--portfolio-text)] px-5 text-sm font-semibold text-[var(--portfolio-bg)] transition hover:bg-[var(--portfolio-accent)] hover:text-[var(--portfolio-accent-contrast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--portfolio-ring)]"
          >
            <Download className="size-4" aria-hidden="true" />
            Download Resume
          </a>
        </div>
      </div>
    </Section>
  );
}

function LanguagesSection() {
  return (
    <Section
      id="languages"
      eyebrow="Languages"
      title="Communication strengths for local and international work."
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {languages.map((language) => (
          <article
            key={language.name}
            className="rounded-lg border border-[var(--portfolio-border)] bg-[var(--portfolio-surface)] p-5 shadow-sm"
          >
            <h3 className="text-lg font-semibold">{language.name}</h3>
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
      title="Let's Build Something Great Together."
      description="Reach out for job opportunities, technical discussions, collaboration, or interview follow-ups."
    >
      <div className="grid gap-8 lg:grid-cols-[0.78fr_1fr]">
        <div className="space-y-4">
          <ContactMethod icon={Mail} label="Email" value={personal.email} href={`mailto:${personal.email}`} />
          <ContactMethod icon={Phone} label="Phone" value={personal.phone} href={`tel:${personal.phone}`} />
          <ContactMethod icon={Github} label="GitHub" value="github.com/asifrayhanjoy" href={personal.github} external />
          <ContactMethod icon={Linkedin} label="LinkedIn" value="TO BE ADDED" />
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
    window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;
    reset();
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-lg border border-[var(--portfolio-border)] bg-[var(--portfolio-surface)] p-5 shadow-sm sm:p-6"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold" htmlFor="name">
          Name
          <input
            id="name"
            type="text"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            className="min-h-12 rounded-lg border border-[var(--portfolio-border)] bg-[var(--portfolio-bg)] px-4 text-sm font-medium text-[var(--portfolio-text)] outline-none transition placeholder:text-[var(--portfolio-subtle)] focus:border-[var(--portfolio-accent)] focus:ring-4 focus:ring-[var(--portfolio-ring)]"
            placeholder="Your name"
            {...register("name")}
          />
          {errors.name?.message ? (
            <span className="text-xs font-medium text-[var(--portfolio-warm)]">
              {errors.name.message}
            </span>
          ) : null}
        </label>

        <label className="grid gap-2 text-sm font-semibold" htmlFor="email">
          Email
          <input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            className="min-h-12 rounded-lg border border-[var(--portfolio-border)] bg-[var(--portfolio-bg)] px-4 text-sm font-medium text-[var(--portfolio-text)] outline-none transition placeholder:text-[var(--portfolio-subtle)] focus:border-[var(--portfolio-accent)] focus:ring-4 focus:ring-[var(--portfolio-ring)]"
            placeholder="you@example.com"
            {...register("email")}
          />
          {errors.email?.message ? (
            <span className="text-xs font-medium text-[var(--portfolio-warm)]">
              {errors.email.message}
            </span>
          ) : null}
        </label>
      </div>

      <label className="mt-4 grid gap-2 text-sm font-semibold" htmlFor="subject">
        Subject
        <input
          id="subject"
          type="text"
          aria-invalid={Boolean(errors.subject)}
          className="min-h-12 rounded-lg border border-[var(--portfolio-border)] bg-[var(--portfolio-bg)] px-4 text-sm font-medium text-[var(--portfolio-text)] outline-none transition placeholder:text-[var(--portfolio-subtle)] focus:border-[var(--portfolio-accent)] focus:ring-4 focus:ring-[var(--portfolio-ring)]"
          placeholder="Project, role, or opportunity"
          {...register("subject")}
        />
        {errors.subject?.message ? (
          <span className="text-xs font-medium text-[var(--portfolio-warm)]">
            {errors.subject.message}
          </span>
        ) : null}
      </label>

      <label className="mt-4 grid gap-2 text-sm font-semibold" htmlFor="message">
        Message
        <textarea
          id="message"
          rows={6}
          aria-invalid={Boolean(errors.message)}
          className="min-h-36 resize-y rounded-lg border border-[var(--portfolio-border)] bg-[var(--portfolio-bg)] px-4 py-3 text-sm font-medium text-[var(--portfolio-text)] outline-none transition placeholder:text-[var(--portfolio-subtle)] focus:border-[var(--portfolio-accent)] focus:ring-4 focus:ring-[var(--portfolio-ring)]"
          placeholder="Tell me about the role, project, or interview context."
          {...register("message")}
        />
        {errors.message?.message ? (
          <span className="text-xs font-medium text-[var(--portfolio-warm)]">
            {errors.message.message}
          </span>
        ) : null}
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--portfolio-text)] px-5 text-sm font-semibold text-[var(--portfolio-bg)] transition hover:bg-[var(--portfolio-accent)] hover:text-[var(--portfolio-accent-contrast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--portfolio-ring)] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        <Send className="size-4" aria-hidden="true" />
        Send Message
      </button>

      {submitted ? (
        <p role="status" className="mt-4 text-sm text-[var(--portfolio-muted)]">
          Message validated locally and prepared through email. A secure
          server-side email provider can be connected later.
        </p>
      ) : null}
    </form>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 border-t border-[var(--portfolio-border)] bg-[var(--portfolio-surface)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-base font-semibold">{personal.name}</p>
          <p className="mt-1 text-sm text-[var(--portfolio-muted)]">
            {personal.title}
          </p>
          <p className="mt-2 text-xs text-[var(--portfolio-subtle)]">
            Copyright © {copyrightYear} {personal.name}. All rights
            reserved.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <FooterLink href={personal.github} icon={Github} label="GitHub" external />
          <span className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[var(--portfolio-border)] px-4 text-sm font-semibold text-[var(--portfolio-subtle)] opacity-75">
            <Linkedin className="size-4" aria-hidden="true" />
            LinkedIn
          </span>
          <FooterLink href={`mailto:${personal.email}`} icon={Mail} label="Email" />
          <a
            href="#home"
            className="inline-flex min-h-10 items-center gap-2 rounded-full bg-[var(--portfolio-text)] px-4 text-sm font-semibold text-[var(--portfolio-bg)] transition hover:bg-[var(--portfolio-accent)] hover:text-[var(--portfolio-accent-contrast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--portfolio-ring)]"
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
      initial={shouldReduceMotion ? false : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl">
          {eyebrow ? (
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--portfolio-accent)]">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
            {title}
          </h2>
          {description ? (
            <p className="mt-4 text-base leading-8 text-[var(--portfolio-muted)]">
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
      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--portfolio-text)] px-5 text-sm font-semibold text-[var(--portfolio-bg)] transition hover:bg-[var(--portfolio-accent)] hover:text-[var(--portfolio-accent-contrast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--portfolio-ring)]"
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
      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[var(--portfolio-border)] bg-[var(--portfolio-surface-raised)] px-5 text-sm font-semibold text-[var(--portfolio-text)] transition hover:border-[var(--portfolio-border-strong)] hover:bg-[var(--portfolio-surface-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--portfolio-ring)]"
    >
      <Icon className="size-4" aria-hidden="true" />
      {children}
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
        <p className="text-xs font-medium uppercase tracking-wide text-[var(--portfolio-subtle)]">
          {label}
        </p>
        <p className="mt-1 break-words font-semibold text-[var(--portfolio-text)]">
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
        <span className="block text-xs font-medium uppercase tracking-wide text-[var(--portfolio-subtle)]">
          {label}
        </span>
        <span className="mt-1 block break-words text-sm font-semibold text-[var(--portfolio-text)]">
          {value}
        </span>
      </span>
    </>
  );

  if (!href) {
    return (
      <div className="flex items-center gap-4 rounded-lg border border-[var(--portfolio-border)] bg-[var(--portfolio-surface)] p-4 shadow-sm">
        {content}
      </div>
    );
  }

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="flex items-center gap-4 rounded-lg border border-[var(--portfolio-border)] bg-[var(--portfolio-surface)] p-4 shadow-sm transition hover:border-[var(--portfolio-border-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--portfolio-ring)]"
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
      className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[var(--portfolio-border)] px-4 text-sm font-semibold text-[var(--portfolio-text)] transition hover:border-[var(--portfolio-border-strong)] hover:bg-[var(--portfolio-surface-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--portfolio-ring)]"
    >
      <Icon className="size-4" aria-hidden="true" />
      {label}
    </a>
  );
}
