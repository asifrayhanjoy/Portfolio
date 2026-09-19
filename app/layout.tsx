import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-neon-omega-77.vercel.app"),
  title: "MD ASIF RAYHAN JOY | Full-Stack Developer & Team Lead",
  description:
    "Full-Stack Developer & Team Lead specializing in Next.js, React.js, TypeScript, Node.js, PostgreSQL, and AI-assisted workflows. Based in Dhaka, Bangladesh.",
  keywords: [
    "Full-Stack Developer",
    "Team Lead",
    "Next.js Developer",
    "React.js Developer",
    "TypeScript Developer",
    "Node.js Developer",
    "AI-Assisted Workflows",
    "Web Developer in Bangladesh",
  ],
  openGraph: {
    title: "Md. Asif Rayhan Joy | Full-Stack Developer & Team Lead",
    description:
      "Full-Stack Developer & Team Lead specializing in Next.js, React.js, TypeScript, Node.js, PostgreSQL, and AI-assisted workflows.",
    url: "https://portfolio-neon-omega-77.vercel.app/",
    siteName: "Md. Asif Rayhan Joy Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Md. Asif Rayhan Joy | Full-Stack Developer & Team Lead",
    description:
      "Full-Stack Developer & Team Lead specializing in Next.js, React.js, TypeScript, Node.js, PostgreSQL, and AI-assisted workflows.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
