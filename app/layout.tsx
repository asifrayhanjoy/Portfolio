import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MD. ASIF RAYHAN JOY | Full Stack Web Developer",
  description:
    "Portfolio of MD. Asif Rayhan Joy, a full stack web developer.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
