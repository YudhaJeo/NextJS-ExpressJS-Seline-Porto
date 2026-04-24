// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jess. | Portfolio",
  description: "Jesseline Roniar – Game Developer & Web Programmer",
  icons: {
    icon: [
      { url: "/icon.png",  type: "image/png", sizes: "32x32" },
      { url: "/icon192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: "/apple-icon.png",
    shortcut: "/Seline-Edited-1.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}