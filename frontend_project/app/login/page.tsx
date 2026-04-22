// app/login/page.tsx
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authAPI, saveAuth, isLoggedIn } from "@/lib/api";

export default function LoginPage() {
  const router  = useRouter();
  const [form,    setForm]    = useState({ USERNAME: "", PASSWORD: "" });
  const [error,   setError]   = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => { if (isLoggedIn()) router.replace("/"); }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async () => {
    if (!form.USERNAME.trim() || !form.PASSWORD.trim()) {
      setError("Username dan password wajib diisi");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const { data } = await authAPI.login(form.USERNAME.trim(), form.PASSWORD);
      saveAuth(data.token, data.user);
      window.dispatchEvent(new Event("authChange"));
      router.push("/");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width:        "100%",
    background:   "rgba(7,0,15,0.8)",
    border:       "1px solid rgba(157,78,221,0.3)",
    borderRadius: "2px",
    padding:      "12px 16px",
    color:        "#e8d5ff",
    fontFamily:   "var(--font-mono)",
    fontSize:     "0.85rem",
    outline:      "none",
    transition:   "border-color 0.2s, box-shadow 0.2s",
  };

  return (
    <div
      style={{
        minHeight:  "100vh",
        background: "var(--bg)",
        display:    "flex",
        alignItems: "center",
        justifyContent: "center",
        padding:    "24px",
        position:   "relative",
        overflow:   "hidden",
      }}
    >
      {/* Grid BG */}
      <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(157,78,221,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(157,78,221,0.04) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
      <div aria-hidden style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%,-50%)", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(157,78,221,0.1) 0%, transparent 70%)" }} />

      <div style={{ width: "100%", maxWidth: "420px", position: "relative", zIndex: 3 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <Link
            href="/"
            style={{
              fontFamily:  "var(--font-pixel)",
              fontSize:    "1.4rem",
              color:       "#c77dff",
              textDecoration: "none",
              textShadow:  "0 0 15px #9d4edd, 0 0 40px rgba(157,78,221,0.4), 3px 3px 0 #3c096c",
            }}
          >
            JESS<span style={{ color: "#ff6ef7" }}>.</span>
          </Link>
          <div style={{ fontFamily: "var(--font-pixel)", fontSize: "0.4rem", color: "#9b7fbf", letterSpacing: "0.2em", marginTop: "10px" }}>
            WELCOME BACK, PLAYER
          </div>
        </div>

        {/* Card */}
        <div
          style={{
            background:   "rgba(13,0,24,0.9)",
            border:       "1px solid rgba(157,78,221,0.3)",
            borderRadius: "2px",
            overflow:     "hidden",
            boxShadow:    "0 0 40px rgba(157,78,221,0.1)",
          }}
        >
          {/* Top bar */}
          <div style={{ background: "rgba(60,9,108,0.4)", padding: "10px 20px", borderBottom: "1px solid rgba(157,78,221,0.2)", display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontFamily: "var(--font-pixel)", fontSize: "0.4rem", color: "#c77dff", letterSpacing: "0.1em" }}>AUTH.EXE</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "#9b7fbf", marginLeft: "auto" }}>login_module v1.0</span>
          </div>

          <div style={{ padding: "32px 28px" }}>
            <h1 style={{ fontFamily: "var(--font-pixel)", fontSize: "0.8rem", color: "#fff", letterSpacing: "0.1em", textShadow: "0 0 10px rgba(199,125,255,0.5)", marginBottom: "28px" }}>
              LOGIN
            </h1>

            {error && (
              <div style={{ marginBottom: "20px", padding: "12px 16px", background: "rgba(255,50,50,0.1)", border: "1px solid rgba(255,110,247,0.3)", fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "#ff6ef7", display: "flex", gap: "8px", alignItems: "flex-start" }}>
                <span>⚠</span> <span>{error}</span>
              </div>
            )}

            <div style={{ marginBottom: "18px" }}>
              <div style={{ fontFamily: "var(--font-pixel)", fontSize: "0.38rem", color: "#9b7fbf", letterSpacing: "0.15em", marginBottom: "8px" }}>USERNAME</div>
              <input
                type="text"
                name="USERNAME"
                value={form.USERNAME}
                onChange={handleChange}
                placeholder="// enter username"
                autoComplete="username"
                style={inputStyle}
                onFocus={(e) => { e.target.style.borderColor = "rgba(157,78,221,0.7)"; e.target.style.boxShadow = "0 0 15px rgba(157,78,221,0.15)"; }}
                onBlur={(e) => { e.target.style.borderColor = "rgba(157,78,221,0.3)"; e.target.style.boxShadow = "none"; }}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
            </div>

            <div style={{ marginBottom: "28px" }}>
              <div style={{ fontFamily: "var(--font-pixel)", fontSize: "0.38rem", color: "#9b7fbf", letterSpacing: "0.15em", marginBottom: "8px" }}>PASSWORD</div>
              <input
                type="password"
                name="PASSWORD"
                value={form.PASSWORD}
                onChange={handleChange}
                placeholder="// enter password"
                autoComplete="current-password"
                style={inputStyle}
                onFocus={(e) => { e.target.style.borderColor = "rgba(157,78,221,0.7)"; e.target.style.boxShadow = "0 0 15px rgba(157,78,221,0.15)"; }}
                onBlur={(e) => { e.target.style.borderColor = "rgba(157,78,221,0.3)"; e.target.style.boxShadow = "none"; }}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="btn-pixel"
              style={{
                width:        "100%",
                padding:      "13px",
                background:   loading ? "rgba(60,9,108,0.4)" : "rgba(157,78,221,0.35)",
                border:       "1px solid rgba(157,78,221,0.6)",
                borderRadius: "2px",
                color:        "#fff",
                cursor:       loading ? "not-allowed" : "pointer",
                fontFamily:   "var(--font-pixel)",
                fontSize:     "0.5rem",
                letterSpacing: "0.15em",
                boxShadow:    loading ? "none" : "0 0 20px rgba(157,78,221,0.3)",
                transition:   "all 0.2s",
                display:      "flex",
                alignItems:   "center",
                justifyContent: "center",
                gap:          "8px",
              }}
            >
              {loading ? (
                <>
                  <svg className="animate-spin" width="14" height="14" fill="none" viewBox="0 0 24 24">
                    <circle opacity="0.25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path opacity="0.75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  VERIFYING...
                </>
              ) : "► LOGIN"}
            </button>

            <div style={{ textAlign: "center", marginTop: "24px", fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "#9b7fbf" }}>
              No account?{" "}
              <Link href="/register" style={{ color: "#c77dff", textDecoration: "none", textShadow: "0 0 6px rgba(199,125,255,0.5)" }}>
                Register here →
              </Link>
            </div>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: "16px" }}>
          <Link href="/" style={{ fontFamily: "var(--font-pixel)", fontSize: "0.38rem", color: "#9b7fbf", textDecoration: "none", letterSpacing: "0.1em" }}>
            ← BACK TO MAIN
          </Link>
        </div>
      </div>
    </div>
  );
}