"use client";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { authAPI, saveAuth, isLoggedIn } from "@/lib/api";
import SnowOverlay from "@/components/SnowOverlay";
import ScanlineOverlay from "@/components/ScanlineOverlay";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [form, setForm] = useState({ EMAIL: "", PASSWORD: "" });
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    if (isLoggedIn()) router.replace("/");
  }, [router]);

  useEffect(() => {
    if (searchParams.get("verified") === "true") {
      setNotice("Email berhasil diverifikasi! Silakan login.");
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async () => {
    if (!form.EMAIL.trim() || !form.PASSWORD.trim()) {
      setError("Email dan password wajib diisi");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const { data } = await authAPI.login(form.EMAIL.trim(), form.PASSWORD);
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

  const inputBase: React.CSSProperties = {
    width: "100%",
    background: "rgba(7,0,15,0.8)",
    border: "1px solid rgba(157,78,221,0.3)",
    borderRadius: "2px",
    padding: "12px 16px",
    color: "#e8d5ff",
    fontFamily: "var(--font-mono)",
    fontSize: "0.85rem",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
  };

  const focusOn = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = "rgba(157,78,221,0.7)";
    e.target.style.boxShadow = "0 0 15px rgba(157,78,221,0.15)";
  };
  const focusOff = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = "rgba(157,78,221,0.3)";
    e.target.style.boxShadow = "none";
  };

  const EyeOpen = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
  const EyeOff = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#07000f", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", position: "relative", overflow: "hidden" }}>
      <ScanlineOverlay />
      <SnowOverlay />

      <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(157,78,221,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(157,78,221,0.04) 1px,transparent 1px)", backgroundSize: "40px 40px", zIndex: 2 }} />
      <div aria-hidden style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%,-50%)", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle,rgba(157,78,221,0.12) 0%,transparent 70%)", zIndex: 2 }} />
      <div aria-hidden style={{ position: "absolute", bottom: "10%", right: "5%", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle,rgba(255,110,247,0.06) 0%,transparent 70%)", zIndex: 2 }} />

      <div style={{ width: "100%", maxWidth: "420px", position: "relative", zIndex: 10, animation: "fadeInUp 0.6s ease both" }}>
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <Link href="/" style={{ fontFamily: "var(--font-pixel)", fontSize: "1.4rem", color: "#c77dff", textDecoration: "none", textShadow: "0 0 15px #9d4edd,0 0 40px rgba(157,78,221,0.4),3px 3px 0 #3c096c" }}>
            JESS<span style={{ color: "#ff6ef7" }}>.</span>
          </Link>
          <div style={{ fontFamily: "var(--font-pixel)", fontSize: "0.4rem", color: "#9b7fbf", letterSpacing: "0.2em", marginTop: "10px" }}>
            WELCOME BACK, PLAYER
          </div>
        </div>

        <div style={{ background: "rgba(13,0,24,0.9)", border: "1px solid rgba(157,78,221,0.3)", borderRadius: "2px", overflow: "hidden", boxShadow: "0 0 40px rgba(157,78,221,0.15), 0 0 80px rgba(157,78,221,0.05)" }}>
          <div style={{ background: "rgba(60,9,108,0.4)", padding: "10px 20px", borderBottom: "1px solid rgba(157,78,221,0.2)", display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ width: "8px", height: "8px", background: "#ff6ef7", borderRadius: "50%", boxShadow: "0 0 6px #ff6ef7" }} />
            <span style={{ width: "8px", height: "8px", background: "#ffd166", borderRadius: "50%", boxShadow: "0 0 6px #ffd166" }} />
            <span style={{ width: "8px", height: "8px", background: "#7efff5", borderRadius: "50%", boxShadow: "0 0 6px #7efff5" }} />
            <span style={{ fontFamily: "var(--font-pixel)", fontSize: "0.4rem", color: "#c77dff", letterSpacing: "0.1em", marginLeft: "8px" }}>AUTH.EXE</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "#9b7fbf", marginLeft: "auto" }}>login_module v1.0</span>
          </div>

          <div style={{ padding: "32px 28px" }}>
            <h1 style={{ fontFamily: "var(--font-pixel)", fontSize: "0.8rem", color: "#fff", letterSpacing: "0.1em", textShadow: "0 0 10px rgba(199,125,255,0.5)", marginBottom: "28px" }}>
              LOGIN
            </h1>

            {notice && (
              <div style={{ marginBottom: "20px", padding: "12px 16px", background: "rgba(126,255,245,0.08)", border: "1px solid rgba(126,255,245,0.3)", fontFamily: "var(--font-pixel)", fontSize: "0.4rem", color: "#7efff5", letterSpacing: "0.1em", textShadow: "0 0 8px #7efff5" }}>
                ✓ {notice}
              </div>
            )}

            {error && (
              <div style={{ marginBottom: "20px", padding: "12px 16px", background: "rgba(255,50,50,0.1)", border: "1px solid rgba(255,110,247,0.3)", fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "#ff6ef7", display: "flex", gap: "8px", alignItems: "flex-start" }}>
                <span>⚠</span><span>{error}</span>
              </div>
            )}

            <div style={{ marginBottom: "18px" }}>
              <div style={{ fontFamily: "var(--font-pixel)", fontSize: "0.38rem", color: "#9b7fbf", letterSpacing: "0.15em", marginBottom: "8px" }}>EMAIL</div>
              <input
                type="email" name="EMAIL" value={form.EMAIL}
                onChange={handleChange} placeholder="// enter email"
                autoComplete="email"
                style={inputBase} onFocus={focusOn} onBlur={focusOff}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
            </div>

            <div style={{ marginBottom: "28px" }}>
              <div style={{ fontFamily: "var(--font-pixel)", fontSize: "0.38rem", color: "#9b7fbf", letterSpacing: "0.15em", marginBottom: "8px" }}>PASSWORD</div>
              <div style={{ position: "relative" }}>
                <input
                  type={showPass ? "text" : "password"}
                  name="PASSWORD" value={form.PASSWORD}
                  onChange={handleChange} placeholder="// enter password"
                  autoComplete="current-password"
                  style={{ ...inputBase, paddingRight: "44px" }}
                  onFocus={focusOn} onBlur={focusOff}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: showPass ? "#c77dff" : "#9b7fbf", padding: "2px", display: "flex", alignItems: "center", transition: "color 0.2s" }}
                  aria-label={showPass ? "Sembunyikan password" : "Tampilkan password"}
                >
                  {showPass ? <EyeOff /> : <EyeOpen />}
                </button>
              </div>
            </div>

            <button
              onClick={handleSubmit} disabled={loading} className="btn-pixel"
              style={{
                width: "100%", padding: "13px",
                background: loading ? "rgba(60,9,108,0.4)" : "rgba(157,78,221,0.35)",
                border: "1px solid rgba(157,78,221,0.6)", borderRadius: "2px",
                color: "#fff", cursor: loading ? "not-allowed" : "pointer",
                fontFamily: "var(--font-pixel)", fontSize: "0.5rem", letterSpacing: "0.15em",
                boxShadow: loading ? "none" : "0 0 20px rgba(157,78,221,0.3)",
                transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
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

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: "100vh", background: "#07000f", display: "flex", alignItems: "center", justifyContent: "center", color: "#c77dff", fontFamily: "var(--font-pixel)", fontSize: "0.5rem" }}>
        INITIALIZING AUTH SYSTEM...
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}