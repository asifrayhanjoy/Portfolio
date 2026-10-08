import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-neon-omega-77.vercel.app"),
  title:
    "MD ASIF RAYHAN JOY | Full-Stack Software Engineer & Technical Team Lead",
  description:
    "Full-Stack Engineer & Team Lead specializing in Next.js, React, TypeScript, Node.js, and Chrome WebExtensions (Plasmo) with PostgreSQL and MongoDB. 3 years of professional experience.",
  keywords: [
    "Full-Stack Developer",
    "Full-Stack Software Engineer",
    "Technical Team Lead",
    "Extension Engineer",
    "Browser Extension Developer",
    "Plasmo Developer",
    "Team Lead",
    "Next.js Developer",
    "React.js Developer",
    "TypeScript Developer",
    "Node.js Developer",
    "PostgreSQL",
    "MongoDB",
    "Web Developer in Bangladesh",
  ],
  openGraph: {
    title:
      "Md. Asif Rayhan Joy | Full-Stack Software Engineer & Technical Team Lead",
    description:
      "Full-Stack Engineer & Team Lead specializing in Next.js, React, TypeScript, Node.js, and Chrome WebExtensions (Plasmo) with PostgreSQL and MongoDB.",
    url: "https://portfolio-neon-omega-77.vercel.app/",
    siteName: "Md. Asif Rayhan Joy Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Md. Asif Rayhan Joy | Full-Stack Software Engineer & Technical Team Lead",
    description:
      "Full-Stack Engineer & Team Lead specializing in Next.js, React, TypeScript, Node.js, and Chrome WebExtensions (Plasmo) with PostgreSQL and MongoDB.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
