// D:\Personal App\Seline Porto NextJS ExpressJS\frontend_project\components\Navbar.tsx
"use client";
import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About Me", href: "#about" },
  { label: "Core Skills", href: "#core-skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#0a0010]/80 backdrop-blur-md border-b border-purple-900/30">
      {/* Logo */}
      <Link
        href="#home"
        className="text-2xl font-bold tracking-tight text-purple-300 hover:text-purple-100 transition-colors"
        style={{ fontFamily: "serif" }}
      >
        Jess.
      </Link>

      {/* Desktop Links */}
      <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-purple-200">
        {navLinks.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="hover:text-white hover:underline underline-offset-4 transition-colors"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* User Profile Button (placeholder) */}
      <div className="hidden md:flex items-center gap-3">
        <button className="w-9 h-9 rounded-full bg-purple-700/50 border border-purple-500 flex items-center justify-center hover:bg-purple-600/70 transition-colors text-purple-200 text-sm font-bold">
          U
        </button>
      </div>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden text-purple-300 hover:text-white"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {menuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#0a0010]/95 border-b border-purple-900/30 md:hidden">
          <ul className="flex flex-col py-4 px-6 gap-4 text-sm font-medium text-purple-200">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="hover:text-white transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
