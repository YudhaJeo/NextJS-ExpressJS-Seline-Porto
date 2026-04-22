// D:\Personal App\Seline Porto NextJS ExpressJS\frontend_project\components\Navbar.tsx
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getUser, clearAuth, isLoggedIn, type AuthUser } from "@/lib/api";

const navLinks = [
  { label: "Home",        href: "#home"        },
  { label: "About Me",    href: "#about"       },
  { label: "Core Skills", href: "#core-skills" },
  { label: "Contact",     href: "#contact"     },
];

export default function Navbar() {
  const router = useRouter();
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user,        setUser]        = useState<AuthUser | null>(null);

  // Sinkronisasi user dari cookie
  const syncUser = () => setUser(getUser());

  useEffect(() => {
    syncUser();
    // Update saat login / logout di tab yang sama
    window.addEventListener("authChange", syncUser);
    // Update saat cookie berubah di tab lain (storage event tidak berlaku cookie,
    // tapi tetap kita daftarkan untuk konsistensi)
    window.addEventListener("storage", syncUser);
    return () => {
      window.removeEventListener("authChange", syncUser);
      window.removeEventListener("storage", syncUser);
    };
  }, []);

  const handleLogout = () => {
    clearAuth();               // hapus kedua cookie
    setUser(null);
    setProfileOpen(false);
    setMenuOpen(false);
    window.dispatchEvent(new Event("authChange"));
    router.push("/");
    router.refresh();
  };

  const initials = user?.USERNAME?.slice(0, 2).toUpperCase() ?? "?";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#0a0010]/80 backdrop-blur-md border-b border-purple-900/30">
      {/* Logo */}
      <Link
        href="/#home"
        className="text-2xl font-bold tracking-tight text-purple-300 hover:text-purple-100 transition-colors"
        style={{ fontFamily: "serif" }}
      >
        Jess.
      </Link>

      {/* Desktop nav links */}
      <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-purple-200">
        {navLinks.map(({ label, href }) => (
          <li key={label}>
            <a href={href} className="hover:text-white hover:underline underline-offset-4 transition-colors">
              {label}
            </a>
          </li>
        ))}
      </ul>

      {/* Desktop auth */}
      <div className="hidden md:flex items-center gap-3">
        {user ? (
          /* ── Profile dropdown ── */
          <div className="relative">
            <button
              onClick={() => setProfileOpen((v) => !v)}
              className="flex items-center gap-2 px-3 py-2 rounded-full bg-purple-800/40 border border-purple-600/40 hover:border-purple-400/60 transition-all text-purple-200 hover:text-white"
            >
              <div className="w-7 h-7 rounded-full bg-purple-700 flex items-center justify-center text-xs font-bold text-white select-none">
                {initials}
              </div>
              <span className="text-sm font-medium max-w-[100px] truncate">{user.USERNAME}</span>
              <svg className={`w-3 h-3 transition-transform duration-200 ${profileOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {profileOpen && (
              <>
                {/* overlay untuk close on outside click */}
                <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                <div className="absolute right-0 top-full mt-2 w-52 bg-[#120020] border border-purple-700/40 rounded-xl shadow-2xl overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-purple-800/40">
                    <p className="text-purple-400 text-xs uppercase tracking-wider mb-0.5">Login sebagai</p>
                    <p className="text-white font-semibold text-sm truncate">{user.USERNAME}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-colors text-sm flex items-center gap-2"
                  >
                    <span>↩</span> Logout
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          /* ── Login / Register buttons ── */
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-purple-300 hover:text-white border border-purple-700/40 hover:border-purple-500 rounded-full transition-all"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 text-sm font-medium text-white bg-purple-700 hover:bg-purple-600 rounded-full transition-all"
            >
              Register
            </Link>
          </div>
        )}
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden text-purple-300 hover:text-white"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {menuOpen
            ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
        </svg>
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#0a0010]/95 border-b border-purple-900/30 md:hidden">
          <ul className="flex flex-col py-4 px-6 gap-4 text-sm font-medium text-purple-200">
            {navLinks.map(({ label, href }) => (
              <li key={label}>
                <a href={href} className="hover:text-white transition-colors" onClick={() => setMenuOpen(false)}>
                  {label}
                </a>
              </li>
            ))}
            <li className="pt-2 border-t border-purple-800/40">
              {user ? (
                <div className="flex flex-col gap-2">
                  <p className="text-purple-400 text-xs">
                    Halo, <span className="text-white font-semibold">{user.USERNAME}</span>
                  </p>
                  <button onClick={handleLogout} className="text-left text-red-400 hover:text-red-300 text-sm w-fit">
                    ↩ Logout
                  </button>
                </div>
              ) : (
                <div className="flex gap-3">
                  <Link href="/login"    onClick={() => setMenuOpen(false)} className="text-purple-300 hover:text-white">Login</Link>
                  <span className="text-purple-700">|</span>
                  <Link href="/register" onClick={() => setMenuOpen(false)} className="text-purple-300 hover:text-white">Register</Link>
                </div>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}