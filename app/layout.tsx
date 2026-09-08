import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-neon-omega-77.vercel.app"),
  title: "Md. Asif Rayhan Joy | Frontend / Full-Stack Web Developer",
  description:
    "Frontend and full-stack web developer based in Dhaka, Bangladesh, specializing in React.js, Next.js, TypeScript, full-stack development, and AI-assisted software workflows.",
  keywords: [
    "React.js Developer",
    "Next.js Developer",
    "Frontend Developer",
    "Full-Stack Developer",
    "TypeScript Developer",
    "AI-Assisted Software Developer",
    "Web Developer in Bangladesh",
  ],
  openGraph: {
    title: "Md. Asif Rayhan Joy | Frontend / Full-Stack Web Developer",
    description:
      "building responsive web applications with React.js, Next.js, TypeScript, full-stack technologies, and AI-assisted development workflows.",
    url: "https://portfolio-neon-omega-77.vercel.app/",
    siteName: "Asif Rayhan Joy Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Md. Asif Rayhan Joy | Frontend / Full-Stack Web Developer",
    description:
      "Frontend and full-stack web developer specializing in React.js, Next.js, TypeScript, and AI-assisted software development.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
