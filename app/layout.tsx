import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-neon-omega-77.vercel.app"),
  title:
    "MD. Asif Rayhan Joy | Full-Stack Web Developer",
  description:
    "Full-Stack Web Developer specializing in Next.js, React, TypeScript, Node.js, and Chrome WebExtensions (Plasmo) with PostgreSQL and MongoDB. 3 years of professional experience.",
  keywords: [
    "Full-Stack Web Developer",
    "Full-Stack Developer",
    "Web Developer",
    "Frontend Developer",
    "Extension Engineer",
    "Browser Extension Developer",
    "Plasmo Developer",
    "Next.js Developer",
    "React.js Developer",
    "TypeScript Developer",
    "Node.js Developer",
    "Go Developer",
    "Golang Developer",
    "PostgreSQL",
    "MongoDB",
    "Web Developer in Bangladesh",
  ],
  openGraph: {
    title:
      "MD. Asif Rayhan Joy | Full-Stack Web Developer",
    description:
      "Full-Stack Web Developer specializing in Next.js, React, TypeScript, Node.js, and Chrome WebExtensions (Plasmo) with PostgreSQL and MongoDB.",
    url: "https://portfolio-neon-omega-77.vercel.app/",
    siteName: "MD. Asif Rayhan Joy Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Md. Asif Rayhan Joy | Full-Stack Web Developer",
    description:
      "Full-Stack Web Developer specializing in Next.js, React, TypeScript, Node.js, and Chrome WebExtensions (Plasmo) with PostgreSQL and MongoDB.",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full dark scroll-smooth antialiased" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#05070c] text-slate-100 antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
