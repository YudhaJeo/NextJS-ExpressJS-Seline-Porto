// D:\Personal App\Seline Porto NextJS ExpressJS\frontend_project\app\layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jess. | Portfolio",
  description: "Jesseline Roniar – Game Developer & Web Programmer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-[#0a0010] text-white antialiased">{children}</body>
    </html>
  );
}