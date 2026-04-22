// app/register/page.tsx
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authAPI, getToken } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const [form,    setForm]    = useState({ USERNAME: "", PASSWORD: "", CONFIRM: "" });
  const [error,   setError]   = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => { if (getToken()) router.replace("/"); }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async () => {
    const { USERNAME, PASSWORD, CONFIRM } = form;
    if (!USERNAME.trim() || !PASSWORD || !CONFIRM) { setError("Semua field wajib diisi"); return; }
    if (USERNAME.trim().length < 3) { setError("Username minimal 3 karakter"); return; }
    if (PASSWORD.length < 6) { setError("Password minimal 6 karakter"); return; }
    if (PASSWORD !== CONFIRM) { setError("Password tidak cocok"); return; }

    setLoading(true);
    setError("");
    try {
      await authAPI.register(USERNAME.trim(), PASSWORD);
      setSuccess("REGISTRATION SUCCESS! Redirecting to login...");
      setTimeout(() => router.push("/login"), 2000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Registrasi gagal");
    } finally {
      setLoading(false);
    }
  };

  const getStrength = (pw: string) => {
    if (!pw) return 0;
    let s = 0;
    if (pw.length >= 6)          s++;
    if (pw.length >= 10)         s++;
    if (/[A-Z]/.test(pw))       s++;
    if (/[0-9]/.test(pw))       s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;
    return s;
  };
  const strength = getStrength(form.PASSWORD);
  const strengthColors = ["", "#ff6ef7", "#ffa94d", "#ffd166", "#7efff5", "#7efff5"];
  const strengthLabels = ["", "WEAK", "WEAK", "MEDIUM", "STRONG", "VERY STRONG"];

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
      <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(157,78,221,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(157,78,221,0.04) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
      <div aria-hidden style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%,-50%)", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(157,78,221,0.08) 0%, transparent 70%)" }} />

      <div style={{ width: "100%", maxWidth: "420px", position: "relative", zIndex: 3 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <Link href="/" style={{ fontFamily: "var(--font-pixel)", fontSize: "1.4rem", color: "#c77dff", textDecoration: "none", textShadow: "0 0 15px #9d4edd, 0 0 40px rgba(157,78,221,0.4), 3px 3px 0 #3c096c" }}>
            JESS<span style={{ color: "#ff6ef7" }}>.</span>
          </Link>
          <div style={{ fontFamily: "var(--font-pixel)", fontSize: "0.4rem", color: "#9b7fbf", letterSpacing: "0.2em", marginTop: "10px" }}>
            CREATE NEW ACCOUNT
          </div>
        </div>

        <div style={{ background: "rgba(13,0,24,0.9)", border: "1px solid rgba(157,78,221,0.3)", borderRadius: "2px", overflow: "hidden", boxShadow: "0 0 40px rgba(157,78,221,0.1)" }}>
          <div style={{ background: "rgba(60,9,108,0.4)", padding: "10px 20px", borderBottom: "1px solid rgba(157,78,221,0.2)", display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontFamily: "var(--font-pixel)", fontSize: "0.4rem", color: "#c77dff", letterSpacing: "0.1em" }}>AUTH.EXE</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "#9b7fbf", marginLeft: "auto" }}>register_module v1.0</span>
          </div>

          <div style={{ padding: "32px 28px" }}>
            <h1 style={{ fontFamily: "var(--font-pixel)", fontSize: "0.8rem", color: "#fff", letterSpacing: "0.1em", textShadow: "0 0 10px rgba(199,125,255,0.5)", marginBottom: "28px" }}>
              REGISTER
            </h1>

            {error && (
              <div style={{ marginBottom: "18px", padding: "12px 16px", background: "rgba(255,50,50,0.1)", border: "1px solid rgba(255,110,247,0.3)", fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "#ff6ef7" }}>
                ⚠ {error}
              </div>
            )}

            {success && (
              <div style={{ marginBottom: "18px", padding: "12px 16px", background: "rgba(126,255,245,0.08)", border: "1px solid rgba(126,255,245,0.3)", fontFamily: "var(--font-pixel)", fontSize: "0.4rem", color: "#7efff5", letterSpacing: "0.1em", textShadow: "0 0 8px #7efff5" }}>
                ✓ {success}
              </div>
            )}

            {/* Username */}
            <div style={{ marginBottom: "16px" }}>
              <div style={{ fontFamily: "var(--font-pixel)", fontSize: "0.38rem", color: "#9b7fbf", letterSpacing: "0.15em", marginBottom: "8px" }}>USERNAME</div>
              <input
                type="text"
                name="USERNAME"
                value={form.USERNAME}
                onChange={handleChange}
                placeholder="// min. 3 chars"
                style={inputStyle}
                onFocus={(e) => { e.target.style.borderColor = "rgba(157,78,221,0.7)"; e.target.style.boxShadow = "0 0 15px rgba(157,78,221,0.15)"; }}
                onBlur={(e) => { e.target.style.borderColor = "rgba(157,78,221,0.3)"; e.target.style.boxShadow = "none"; }}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: "16px" }}>
              <div style={{ fontFamily: "var(--font-pixel)", fontSize: "0.38rem", color: "#9b7fbf", letterSpacing: "0.15em", marginBottom: "8px" }}>PASSWORD</div>
              <input
                type="password"
                name="PASSWORD"
                value={form.PASSWORD}
                onChange={handleChange}
                placeholder="// min. 6 chars"
                style={inputStyle}
                onFocus={(e) => { e.target.style.borderColor = "rgba(157,78,221,0.7)"; e.target.style.boxShadow = "0 0 15px rgba(157,78,221,0.15)"; }}
                onBlur={(e) => { e.target.style.borderColor = "rgba(157,78,221,0.3)"; e.target.style.boxShadow = "none"; }}
              />
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

            {/* Confirm */}
            <div style={{ marginBottom: "28px" }}>
              <div style={{ fontFamily: "var(--font-pixel)", fontSize: "0.38rem", color: "#9b7fbf", letterSpacing: "0.15em", marginBottom: "8px" }}>CONFIRM PASSWORD</div>
              <input
                type="password"
                name="CONFIRM"
                value={form.CONFIRM}
                onChange={handleChange}
                placeholder="// repeat password"
                style={{
                  ...inputStyle,
                  borderColor: form.CONFIRM
                    ? form.PASSWORD !== form.CONFIRM
                      ? "rgba(255,110,247,0.5)"
                      : "rgba(126,255,245,0.4)"
                    : "rgba(157,78,221,0.3)",
                }}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
              {form.CONFIRM && form.PASSWORD !== form.CONFIRM && (
                <div style={{ fontFamily: "var(--font-pixel)", fontSize: "0.35rem", color: "#ff6ef7", marginTop: "6px", letterSpacing: "0.1em" }}>
                  ✕ PASSWORD MISMATCH
                </div>
              )}
              {form.CONFIRM && form.PASSWORD === form.CONFIRM && (
                <div style={{ fontFamily: "var(--font-pixel)", fontSize: "0.35rem", color: "#7efff5", marginTop: "6px", letterSpacing: "0.1em", textShadow: "0 0 6px #7efff580" }}>
                  ✓ PASSWORDS MATCH
                </div>
              )}
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading || !!success}
              className="btn-pixel"
              style={{
                width:        "100%",
                padding:      "13px",
                background:   (loading || !!success) ? "rgba(60,9,108,0.4)" : "rgba(157,78,221,0.35)",
                border:       "1px solid rgba(157,78,221,0.6)",
                borderRadius: "2px",
                color:        "#fff",
                cursor:       (loading || !!success) ? "not-allowed" : "pointer",
                fontFamily:   "var(--font-pixel)",
                fontSize:     "0.5rem",
                letterSpacing: "0.15em",
                boxShadow:    (loading || !!success) ? "none" : "0 0 20px rgba(157,78,221,0.3)",
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