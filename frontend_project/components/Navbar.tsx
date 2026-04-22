// components/Navbar.tsx
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getUser, clearAuth, type AuthUser } from "@/lib/api";

interface NavbarProps {
  activePage?: "home" | "skills";
}

export default function Navbar({ activePage = "home" }: NavbarProps) {
  const router = useRouter();
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user,        setUser]        = useState<AuthUser | null>(null);
  const [scrolled,    setScrolled]    = useState(false);
  const [isMobile,    setIsMobile]    = useState(false);

  const syncUser = () => setUser(getUser());

  useEffect(() => {
    syncUser();
    window.addEventListener("authChange", syncUser);
    window.addEventListener("storage",    syncUser);
    return () => {
      window.removeEventListener("authChange", syncUser);
      window.removeEventListener("storage",    syncUser);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    if (!isMobile) setMenuOpen(false);
  }, [isMobile]);

  const handleLogout = () => {
    clearAuth();
    setUser(null);
    setProfileOpen(false);
    setMenuOpen(false);
    window.dispatchEvent(new Event("authChange"));
    router.push("/");
    router.refresh();
  };

  const initials = user?.USERNAME?.slice(0, 2).toUpperCase() ?? "??";

  const navLinks = [
    { label: "Home",        href: activePage === "home"   ? "#home"           : "/#home",           active: activePage === "home" },
    { label: "About Me",    href: activePage === "home"   ? "#about"          : "/#about",          active: activePage === "home" },
    { label: "Core Skills", href: activePage === "skills" ? "#skills"         : "/skills#skills",   active: activePage === "skills" },
    { label: "Contact",     href: activePage === "skills" ? "#contact"        : "/skills#contact",  active: activePage === "skills" },
  ];

  return (
    <>
      <style>{`
        .nav-desktop-links { display: flex; }
        .nav-desktop-auth  { display: flex; }
        .nav-hamburger     { display: none; }

        @media (max-width: 767px) {
          .nav-desktop-links { display: none !important; }
          .nav-desktop-auth  { display: none !important; }
          .nav-hamburger     { display: flex !important; }
        }
      `}</style>

      <nav
        style={{
          position:       "fixed",
          top:            0,
          left:           0,
          right:          0,
          zIndex:         50,
          display:        "flex",
          alignItems:     "center",
          justifyContent: "space-between",
          padding:        "0 1.5rem",
          height:         "64px",
          background:     scrolled ? "rgba(7,0,15,0.95)" : "rgba(7,0,15,0.7)",
          backdropFilter: "blur(16px)",
          borderBottom:   `1px solid rgba(157,78,221,${scrolled ? 0.4 : 0.2})`,
          boxShadow:      scrolled ? "0 0 30px rgba(157,78,221,0.1)" : "none",
          transition:     "all 0.3s ease",
        }}
      >
        {/* ── Logo ── */}
        <Link
          href="/"
          style={{
            fontFamily:     "var(--font-pixel)",
            fontSize:       "1rem",
            color:          "#c77dff",
            textDecoration: "none",
            textShadow:     "0 0 10px #9d4edd, 0 0 30px rgba(157,78,221,0.5)",
            letterSpacing:  "0.05em",
            flexShrink:     0,
          }}
        >
          Jess<span style={{ color: "#ff6ef7", textShadow: "0 0 10px #ff6ef7" }}>.</span>
        </Link>

        {/* ── Desktop nav links (hidden on mobile) ── */}
        <div className="nav-desktop-links" style={{ gap: "8px", alignItems: "center" }}>
          {navLinks.map(({ label, href, active }) => (
            <a
              key={label}
              href={href}
              style={{
                fontFamily:     "var(--font-pixel)",
                fontSize:       "0.45rem",
                padding:        "7px 10px",
                borderRadius:   "2px",
                border:         active ? "1px solid rgba(157,78,221,0.65)" : "1px solid rgba(157,78,221,0.28)",
                background:     active ? "rgba(157,78,221,0.22)" : "transparent",
                color:          active ? "#ffffff" : "#b89fd4",
                textDecoration: "none",
                letterSpacing:  "0.08em",
                transition:     "all 0.2s",
                whiteSpace:     "nowrap",
              }}
            >
              {label}
            </a>
          ))}
        </div>

        {/* ── Desktop Auth (hidden on mobile) ── */}
        <div className="nav-desktop-auth" style={{ alignItems: "center", gap: "8px" }}>
          {user ? (
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setProfileOpen((v) => !v)}
                style={{
                  display:      "flex",
                  alignItems:   "center",
                  gap:          "8px",
                  padding:      "6px 12px",
                  background:   "rgba(60,9,108,0.5)",
                  border:       "1px solid rgba(157,78,221,0.5)",
                  borderRadius: "2px",
                  color:        "#c77dff",
                  cursor:       "pointer",
                  fontFamily:   "var(--font-mono)",
                  fontSize:     "0.75rem",
                  transition:   "all 0.2s",
                }}
              >
                <div
                  style={{
                    width:          "26px",
                    height:         "26px",
                    background:     "rgba(157,78,221,0.4)",
                    border:         "1px solid #9d4edd",
                    display:        "flex",
                    alignItems:     "center",
                    justifyContent: "center",
                    fontFamily:     "var(--font-pixel)",
                    fontSize:       "0.4rem",
                    color:          "#fff",
                    textShadow:     "0 0 8px #c77dff",
                    borderRadius:   "1px",
                  }}
                >
                  {initials}
                </div>
                <span style={{ maxWidth: "80px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {user.USERNAME}
                </span>
                <span style={{ fontSize: "0.6rem", transition: "transform 0.2s", transform: profileOpen ? "rotate(180deg)" : "none" }}>▼</span>
              </button>

              {profileOpen && (
                <>
                  <div style={{ position: "fixed", inset: 0, zIndex: 40 }} onClick={() => setProfileOpen(false)} />
                  <div
                    style={{
                      position:     "absolute",
                      right:        0,
                      top:          "calc(100% + 8px)",
                      width:        "200px",
                      background:   "#0d0018",
                      border:       "1px solid rgba(157,78,221,0.5)",
                      boxShadow:    "0 0 30px rgba(157,78,221,0.3)",
                      zIndex:       50,
                      borderRadius: "2px",
                      overflow:     "hidden",
                    }}
                  >
                    <div
                      style={{
                        padding:      "12px 16px",
                        borderBottom: "1px solid rgba(157,78,221,0.2)",
                        background:   "rgba(60,9,108,0.2)",
                      }}
                    >
                      <div style={{ fontFamily: "var(--font-pixel)", fontSize: "0.4rem", color: "#9b7fbf", marginBottom: "4px", letterSpacing: "0.1em" }}>
                        LOGGED IN AS
                      </div>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "#c77dff", textShadow: "0 0 8px rgba(157,78,221,0.6)" }}>
                        {user.USERNAME}
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      style={{
                        width:      "100%",
                        textAlign:  "left",
                        padding:    "12px 16px",
                        background: "transparent",
                        border:     "none",
                        color:      "#ff6ef7",
                        cursor:     "pointer",
                        fontFamily: "var(--font-mono)",
                        fontSize:   "0.8rem",
                        display:    "flex",
                        alignItems: "center",
                        gap:        "8px",
                        transition: "background 0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,110,247,0.1)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      ↩ LOGOUT
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div style={{ display: "flex", gap: "6px" }}>
              <Link
                href="/login"
                style={{
                  fontFamily:     "var(--font-pixel)",
                  fontSize:       "0.45rem",
                  padding:        "7px 12px",
                  border:         "1px solid rgba(157,78,221,0.5)",
                  borderRadius:   "2px",
                  color:          "#c77dff",
                  textDecoration: "none",
                  letterSpacing:  "0.08em",
                  transition:     "all 0.2s",
                }}
              >
                LOGIN
              </Link>
              <Link
                href="/register"
                style={{
                  fontFamily:     "var(--font-pixel)",
                  fontSize:       "0.45rem",
                  padding:        "7px 12px",
                  background:     "rgba(157,78,221,0.3)",
                  border:         "1px solid #9d4edd",
                  borderRadius:   "2px",
                  color:          "#fff",
                  textDecoration: "none",
                  letterSpacing:  "0.08em",
                  boxShadow:      "0 0 12px rgba(157,78,221,0.3)",
                  transition:     "all 0.2s",
                }}
              >
                REGISTER
              </Link>
            </div>
          )}
        </div>

        {/* ── Mobile hamburger (hidden on desktop) ── */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            alignItems:  "center",
            background:  "transparent",
            border:      "none",
            color:       "#c77dff",
            cursor:      "pointer",
            padding:     "4px",
          }}
          aria-label="Toggle menu"
        >
          <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </nav>

      {/* ── Mobile dropdown menu ── */}
      {menuOpen && isMobile && (
        <div
          style={{
            position:       "fixed",
            top:            "64px",
            left:           0,
            right:          0,
            zIndex:         49,
            background:     "rgba(7,0,15,0.98)",
            borderBottom:   "1px solid rgba(157,78,221,0.3)",
            padding:        "16px 24px 24px",
            display:        "flex",
            flexDirection:  "column",
            gap:            "16px",
            backdropFilter: "blur(16px)",
          }}
        >
          {navLinks.map(({ label, href, active }) => (
            <a
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily:     "var(--font-pixel)",
                fontSize:       "0.5rem",
                color:          active ? "#c77dff" : "#9b7fbf",
                textDecoration: "none",
                letterSpacing:  "0.08em",
                padding:        "8px 0",
                borderBottom:   "1px solid rgba(157,78,221,0.1)",
              }}
            >
              {active ? "▶ " : "  "}{label}
            </a>
          ))}

          <div style={{ borderTop: "1px solid rgba(157,78,221,0.2)", paddingTop: "12px" }}>
            {user ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div
                    style={{
                      width:          "32px",
                      height:         "32px",
                      background:     "rgba(157,78,221,0.4)",
                      border:         "1px solid #9d4edd",
                      display:        "flex",
                      alignItems:     "center",
                      justifyContent: "center",
                      fontFamily:     "var(--font-pixel)",
                      fontSize:       "0.4rem",
                      color:          "#fff",
                      borderRadius:   "1px",
                    }}
                  >
                    {initials}
                  </div>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "#c77dff" }}>
                    {user.USERNAME}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  style={{
                    background:  "none",
                    border:      "1px solid rgba(255,110,247,0.3)",
                    borderRadius: "2px",
                    color:       "#ff6ef7",
                    fontFamily:  "var(--font-pixel)",
                    fontSize:    "0.45rem",
                    cursor:      "pointer",
                    padding:     "8px 12px",
                    textAlign:   "left",
                    letterSpacing: "0.08em",
                  }}
                >
                  ↩ LOGOUT
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", gap: "12px" }}>
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontFamily:     "var(--font-pixel)",
                    fontSize:       "0.45rem",
                    padding:        "8px 16px",
                    border:         "1px solid rgba(157,78,221,0.5)",
                    borderRadius:   "2px",
                    color:          "#c77dff",
                    textDecoration: "none",
                    letterSpacing:  "0.08em",
                  }}
                >
                  LOGIN
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontFamily:     "var(--font-pixel)",
                    fontSize:       "0.45rem",
                    padding:        "8px 16px",
                    background:     "rgba(157,78,221,0.3)",
                    border:         "1px solid #9d4edd",
                    borderRadius:   "2px",
                    color:          "#fff",
                    textDecoration: "none",
                    letterSpacing:  "0.08em",
                  }}
                >
                  REGISTER
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}