// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jess. | Portfolio",
  description: "Jesseline Roniar – Game Developer & Web Programmer",
  icons: {
    // ✅ Taruh file icon.png / favicon.ico di folder /public/
    icon: [
      { url: "/favicon.ico",             sizes: "any" },
      { url: "/icon.png",  type: "image/png", sizes: "32x32" },
      { url: "/icon192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: "/apple-icon.png",
    shortcut: "/favicon.ico",
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