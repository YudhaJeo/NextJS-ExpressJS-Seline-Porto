// app/register/page.tsx
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authAPI, getToken } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const [form,     setForm]     = useState({ USERNAME: "", EMAIL: "", PASSWORD: "", CONFIRM: "" });
  const [error,    setError]    = useState("");
  const [success,  setSuccess]  = useState("");
  const [loading,  setLoading]  = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConf, setShowConf] = useState(false);

  useEffect(() => { if (getToken()) router.replace("/"); }, [router]);

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async () => {
    const { USERNAME, EMAIL, PASSWORD, CONFIRM } = form;
    if (!USERNAME.trim() || !EMAIL.trim() || !PASSWORD || !CONFIRM) {
      setError("Semua field wajib diisi"); return;
    }
    if (USERNAME.trim().length < 3) { setError("Username minimal 3 karakter"); return; }
    if (!isValidEmail(EMAIL.trim())) { setError("Format email tidak valid"); return; }
    if (PASSWORD.length < 6) { setError("Password minimal 6 karakter"); return; }
    if (PASSWORD !== CONFIRM) { setError("Password tidak cocok"); return; }

    setLoading(true);
    setError("");
    try {
      await authAPI.register(USERNAME.trim(), EMAIL.trim(), PASSWORD);
      setSuccess("REGISTRATION SUCCESS! Cek email kamu untuk verifikasi akun.");
      setTimeout(() => router.push("/login"), 3500);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Registrasi gagal");
    } finally {
      setLoading(false);
    }
  };

  const getStrength = (pw: string) => {
    if (!pw) return 0;
    let s = 0;
    if (pw.length >= 6)           s++;
    if (pw.length >= 10)          s++;
    if (/[A-Z]/.test(pw))        s++;
    if (/[0-9]/.test(pw))        s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;
    return s;
  };
  const strength = getStrength(form.PASSWORD);
  const strengthColors = ["", "#ff6ef7", "#ffa94d", "#ffd166", "#7efff5", "#7efff5"];
  const strengthLabels = ["", "WEAK", "WEAK", "MEDIUM", "STRONG", "VERY STRONG"];

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

  const focusOn  = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = "rgba(157,78,221,0.7)";
    e.target.style.boxShadow   = "0 0 15px rgba(157,78,221,0.15)";
  };
  const focusOff = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = "rgba(157,78,221,0.3)";
    e.target.style.boxShadow   = "none";
  };

  // ── Eye icon SVGs ──────────────────────────────────────────
  const EyeOpen = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );
  const EyeOff = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  );

  // Reusable password wrapper
  const PasswordField = ({
    name, value, show, onToggle, placeholder, onKeyDown,
    borderColor,
  }: {
    name: string; value: string; show: boolean;
    onToggle: () => void; placeholder: string;
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
    borderColor?: string;
  }) => (
    <div style={{ position: "relative" }}>
      <input
        type={show ? "text" : "password"}
        name={name} value={value}
        onChange={handleChange}
        placeholder={placeholder}
        autoComplete={name === "PASSWORD" ? "new-password" : "new-password"}
        style={{ ...inputBase, paddingRight: "44px", borderColor: borderColor ?? "rgba(157,78,221,0.3)" }}
        onFocus={focusOn} onBlur={focusOff}
        onKeyDown={onKeyDown}
      />
      <button
        type="button"
        onClick={onToggle}
        style={{
          position: "absolute", right: "12px", top: "50%",
          transform: "translateY(-50%)",
          background: "none", border: "none", cursor: "pointer",
          color: show ? "#c77dff" : "#9b7fbf",
          padding: "2px", display: "flex", alignItems: "center",
          transition: "color 0.2s",
        }}
        aria-label={show ? "Sembunyikan password" : "Tampilkan password"}
      >
        {show ? <EyeOff /> : <EyeOpen />}
      </button>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", position: "relative", overflow: "hidden" }}>
      <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(157,78,221,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(157,78,221,0.04) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
      <div aria-hidden style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%,-50%)", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle,rgba(157,78,221,0.08) 0%,transparent 70%)" }} />

      <div style={{ width: "100%", maxWidth: "420px", position: "relative", zIndex: 3 }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <Link href="/" style={{ fontFamily: "var(--font-pixel)", fontSize: "1.4rem", color: "#c77dff", textDecoration: "none", textShadow: "0 0 15px #9d4edd,0 0 40px rgba(157,78,221,0.4),3px 3px 0 #3c096c" }}>
            JESS<span style={{ color: "#ff6ef7" }}>.</span>
          </Link>
          <div style={{ fontFamily: "var(--font-pixel)", fontSize: "0.4rem", color: "#9b7fbf", letterSpacing: "0.2em", marginTop: "10px" }}>
            CREATE NEW ACCOUNT
          </div>
        </div>

        {/* Card */}
        <div style={{ background: "rgba(13,0,24,0.9)", border: "1px solid rgba(157,78,221,0.3)", borderRadius: "2px", overflow: "hidden", boxShadow: "0 0 40px rgba(157,78,221,0.1)" }}>

          {/* Top bar */}
          <div style={{ background: "rgba(60,9,108,0.4)", padding: "10px 20px", borderBottom: "1px solid rgba(157,78,221,0.2)", display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontFamily: "var(--font-pixel)", fontSize: "0.4rem", color: "#c77dff", letterSpacing: "0.1em" }}>AUTH.EXE</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "#9b7fbf", marginLeft: "auto" }}>register_module v1.0</span>
          </div>

          <div style={{ padding: "32px 28px" }}>
            <h1 style={{ fontFamily: "var(--font-pixel)", fontSize: "0.8rem", color: "#fff", letterSpacing: "0.1em", textShadow: "0 0 10px rgba(199,125,255,0.5)", marginBottom: "28px" }}>
              REGISTER
            </h1>

            {error && (
              <div style={{ marginBottom: "18px", padding: "12px 16px", background: "rgba(255,50,50,0.1)", border: "1px solid rgba(255,110,247,0.3)", fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "#ff6ef7", display: "flex", gap: "8px", alignItems: "flex-start" }}>
                <span>⚠</span><span>{error}</span>
              </div>
            )}

            {success && (
              <div style={{ marginBottom: "18px", padding: "12px 16px", background: "rgba(126,255,245,0.08)", border: "1px solid rgba(126,255,245,0.3)", fontFamily: "var(--font-pixel)", fontSize: "0.4rem", color: "#7efff5", letterSpacing: "0.1em", textShadow: "0 0 8px #7efff5", lineHeight: 1.8 }}>
                ✓ {success}
              </div>
            )}

            {/* USERNAME */}
            <div style={{ marginBottom: "16px" }}>
              <div style={{ fontFamily: "var(--font-pixel)", fontSize: "0.38rem", color: "#9b7fbf", letterSpacing: "0.15em", marginBottom: "8px" }}>USERNAME</div>
              <input
                type="text" name="USERNAME" value={form.USERNAME}
                onChange={handleChange} placeholder="// min. 3 chars"
                style={inputBase} onFocus={focusOn} onBlur={focusOff}
              />
            </div>

            {/* EMAIL */}
            <div style={{ marginBottom: "16px" }}>
              <div style={{ fontFamily: "var(--font-pixel)", fontSize: "0.38rem", color: "#9b7fbf", letterSpacing: "0.15em", marginBottom: "8px" }}>EMAIL</div>
              <input
                type="email" name="EMAIL" value={form.EMAIL}
                onChange={handleChange} placeholder="// your@email.com"
                autoComplete="email"
                style={{
                  ...inputBase,
                  borderColor: form.EMAIL
                    ? isValidEmail(form.EMAIL) ? "rgba(126,255,245,0.4)" : "rgba(255,110,247,0.5)"
                    : "rgba(157,78,221,0.3)",
                }}
                onFocus={focusOn}
                onBlur={(e) => {
                  e.target.style.borderColor = form.EMAIL
                    ? isValidEmail(form.EMAIL) ? "rgba(126,255,245,0.4)" : "rgba(255,110,247,0.5)"
                    : "rgba(157,78,221,0.3)";
                  e.target.style.boxShadow = "none";
                }}
              />
              {form.EMAIL && !isValidEmail(form.EMAIL) && (
                <div style={{ fontFamily: "var(--font-pixel)", fontSize: "0.35rem", color: "#ff6ef7", marginTop: "6px", letterSpacing: "0.1em" }}>
                  ✕ FORMAT EMAIL TIDAK VALID
                </div>
              )}
            </div>

            {/* PASSWORD + toggle */}
            <div style={{ marginBottom: "16px" }}>
              <div style={{ fontFamily: "var(--font-pixel)", fontSize: "0.38rem", color: "#9b7fbf", letterSpacing: "0.15em", marginBottom: "8px" }}>PASSWORD</div>
              <div style={{ position: "relative" }}>
                <input
                  type={showPass ? "text" : "password"}
                  name="PASSWORD" value={form.PASSWORD}
                  onChange={handleChange} placeholder="// min. 6 chars"
                  autoComplete="new-password"
                  style={{ ...inputBase, paddingRight: "44px" }}
                  onFocus={focusOn} onBlur={focusOff}
                />
                <button type="button" onClick={() => setShowPass((v) => !v)}
                  style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: showPass ? "#c77dff" : "#9b7fbf", padding: "2px", display: "flex", alignItems: "center", transition: "color 0.2s" }}
                  aria-label={showPass ? "Sembunyikan password" : "Tampilkan password"}>
                  {showPass ? <EyeOff /> : <EyeOpen />}
                </button>
              </div>
              {form.PASSWORD && (
                <div style={{ marginTop: "8px" }}>
                  <div style={{ display: "flex", gap: "3px", marginBottom: "5px" }}>
                    {[1,2,3,4,5].map((i) => (
                      <div key={i} style={{ flex: 1, height: "3px", background: i <= strength ? strengthColors[strength] : "rgba(60,9,108,0.5)", boxShadow: i <= strength ? `0 0 6px ${strengthColors[strength]}60` : "none", transition: "all 0.3s" }} />
                    ))}
                  </div>
                  <span style={{ fontFamily: "var(--font-pixel)", fontSize: "0.35rem", color: strengthColors[strength], letterSpacing: "0.1em", textShadow: `0 0 6px ${strengthColors[strength]}60` }}>
                    {strengthLabels[strength]}
                  </span>
                </div>
              )}
            </div>

            {/* CONFIRM + toggle */}
            <div style={{ marginBottom: "28px" }}>
              <div style={{ fontFamily: "var(--font-pixel)", fontSize: "0.38rem", color: "#9b7fbf", letterSpacing: "0.15em", marginBottom: "8px" }}>CONFIRM PASSWORD</div>
              <div style={{ position: "relative" }}>
                <input
                  type={showConf ? "text" : "password"}
                  name="CONFIRM" value={form.CONFIRM}
                  onChange={handleChange} placeholder="// repeat password"
                  autoComplete="new-password"
                  style={{
                    ...inputBase,
                    paddingRight: "44px",
                    borderColor: form.CONFIRM
                      ? form.PASSWORD !== form.CONFIRM ? "rgba(255,110,247,0.5)" : "rgba(126,255,245,0.4)"
                      : "rgba(157,78,221,0.3)",
                  }}
                  onFocus={focusOn} onBlur={focusOff}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                />
                <button type="button" onClick={() => setShowConf((v) => !v)}
                  style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: showConf ? "#c77dff" : "#9b7fbf", padding: "2px", display: "flex", alignItems: "center", transition: "color 0.2s" }}
                  aria-label={showConf ? "Sembunyikan password" : "Tampilkan password"}>
                  {showConf ? <EyeOff /> : <EyeOpen />}
                </button>
              </div>
              {form.CONFIRM && form.PASSWORD !== form.CONFIRM && (
                <div style={{ fontFamily: "var(--font-pixel)", fontSize: "0.35rem", color: "#ff6ef7", marginTop: "6px", letterSpacing: "0.1em" }}>✕ PASSWORD MISMATCH</div>
              )}
              {form.CONFIRM && form.PASSWORD === form.CONFIRM && (
                <div style={{ fontFamily: "var(--font-pixel)", fontSize: "0.35rem", color: "#7efff5", marginTop: "6px", letterSpacing: "0.1em", textShadow: "0 0 6px #7efff580" }}>✓ PASSWORDS MATCH</div>
              )}
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit} disabled={loading || !!success} className="btn-pixel"
              style={{
                width: "100%", padding: "13px",
                background: (loading || !!success) ? "rgba(60,9,108,0.4)" : "rgba(157,78,221,0.35)",
                border: "1px solid rgba(157,78,221,0.6)", borderRadius: "2px",
                color: "#fff", cursor: (loading || !!success) ? "not-allowed" : "pointer",
                fontFamily: "var(--font-pixel)", fontSize: "0.5rem", letterSpacing: "0.15em",
                boxShadow: (loading || !!success) ? "none" : "0 0 20px rgba(157,78,221,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
              }}
            >
              {loading ? (
                <>
                  <svg className="animate-spin" width="14" height="14" fill="none" viewBox="0 0 24 24">
                    <circle opacity="0.25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path opacity="0.75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  REGISTERING...
                </>
              ) : "+ CREATE ACCOUNT"}
            </button>

            <div style={{ textAlign: "center", marginTop: "24px", fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "#9b7fbf" }}>
              Have an account?{" "}
              <Link href="/login" style={{ color: "#c77dff", textDecoration: "none", textShadow: "0 0 6px rgba(199,125,255,0.5)" }}>
                Login here →
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