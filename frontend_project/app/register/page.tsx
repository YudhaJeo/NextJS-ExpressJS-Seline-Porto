"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authAPI, getToken } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ USERNAME: "", PASSWORD: "", CONFIRM: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (getToken()) router.replace("/");
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async () => {
    const { USERNAME, PASSWORD, CONFIRM } = form;

    if (!USERNAME.trim() || !PASSWORD || !CONFIRM) {
      setError("Semua field wajib diisi");
      return;
    }
    if (USERNAME.trim().length < 3) {
      setError("Username minimal 3 karakter");
      return;
    }
    if (PASSWORD.length < 6) {
      setError("Password minimal 6 karakter");
      return;
    }
    if (PASSWORD !== CONFIRM) {
      setError("Konfirmasi password tidak cocok");
      return;
    }

    setLoading(true);
    setError("");
    try {
      await authAPI.register(USERNAME.trim(), PASSWORD);
      setSuccess("Registrasi berhasil! Mengarahkan ke halaman login...");
      setTimeout(() => router.push("/login"), 2000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Registrasi gagal");
    } finally {
      setLoading(false);
    }
  };

  // Password strength indicator
  const getStrength = (pw: string) => {
    if (!pw) return 0;
    let score = 0;
    if (pw.length >= 6) score++;
    if (pw.length >= 10) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score;
  };
  const strength = getStrength(form.PASSWORD);
  const strengthLabel = ["", "Lemah", "Lemah", "Sedang", "Kuat", "Sangat Kuat"][strength];
  const strengthColor = ["", "text-red-400", "text-orange-400", "text-yellow-400", "text-green-400", "text-emerald-400"][strength];

  return (
    <div className="min-h-screen bg-[#0a0010] flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-purple-900/20 blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="text-4xl font-bold text-purple-300 hover:text-purple-100 transition-colors"
            style={{ fontFamily: "serif" }}
          >
            Jess.
          </Link>
          <p className="text-purple-400/70 text-sm mt-2 tracking-widest uppercase">
            Buat akun baru
          </p>
        </div>

        <div className="bg-purple-950/40 border border-purple-700/30 rounded-2xl p-8 backdrop-blur-sm shadow-[0_0_40px_rgba(168,85,247,0.1)]">
          <h1 className="text-2xl font-bold text-white mb-6">Register</h1>

          {/* Error */}
          {error && (
            <div className="mb-4 px-4 py-3 bg-red-900/30 border border-red-500/40 rounded-xl text-red-300 text-sm">
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="mb-4 px-4 py-3 bg-green-900/30 border border-green-500/40 rounded-xl text-green-300 text-sm flex items-center gap-2">
              <span>✓</span> {success}
            </div>
          )}

          {/* Username */}
          <div className="mb-4">
            <label className="block text-purple-300 text-xs uppercase tracking-wider mb-2 font-semibold">
              Username
            </label>
            <input
              type="text"
              name="USERNAME"
              value={form.USERNAME}
              onChange={handleChange}
              placeholder="Minimal 3 karakter"
              className="w-full bg-purple-950/60 border border-purple-700/40 rounded-xl px-4 py-3 text-white placeholder-purple-600 focus:outline-none focus:border-purple-400 transition-colors text-sm"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-purple-300 text-xs uppercase tracking-wider mb-2 font-semibold">
              Password
            </label>
            <input
              type="password"
              name="PASSWORD"
              value={form.PASSWORD}
              onChange={handleChange}
              placeholder="Minimal 6 karakter"
              className="w-full bg-purple-950/60 border border-purple-700/40 rounded-xl px-4 py-3 text-white placeholder-purple-600 focus:outline-none focus:border-purple-400 transition-colors text-sm"
            />
            {form.PASSWORD && (
              <p className={`text-xs mt-1.5 ${strengthColor}`}>
                Kekuatan password: {strengthLabel}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label className="block text-purple-300 text-xs uppercase tracking-wider mb-2 font-semibold">
              Konfirmasi Password
            </label>
            <input
              type="password"
              name="CONFIRM"
              value={form.CONFIRM}
              onChange={handleChange}
              placeholder="Ulangi password"
              className={`w-full bg-purple-950/60 border rounded-xl px-4 py-3 text-white placeholder-purple-600 focus:outline-none transition-colors text-sm ${
                form.CONFIRM && form.PASSWORD !== form.CONFIRM
                  ? "border-red-500/60 focus:border-red-400"
                  : form.CONFIRM && form.PASSWORD === form.CONFIRM
                  ? "border-green-500/60 focus:border-green-400"
                  : "border-purple-700/40 focus:border-purple-400"
              }`}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
            {form.CONFIRM && form.PASSWORD !== form.CONFIRM && (
              <p className="text-xs mt-1.5 text-red-400">Password tidak cocok</p>
            )}
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading || !!success}
            className="w-full py-3 bg-purple-700 hover:bg-purple-600 disabled:bg-purple-900 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors text-sm"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Mendaftar...
              </span>
            ) : (
              "Daftar"
            )}
          </button>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-purple-800/50" />
            <span className="text-purple-600 text-xs">atau</span>
            <div className="flex-1 h-px bg-purple-800/50" />
          </div>

          <p className="text-center text-purple-400 text-sm">
            Sudah punya akun?{" "}
            <Link
              href="/login"
              className="text-purple-300 hover:text-white font-semibold transition-colors underline underline-offset-4"
            >
              Login di sini
            </Link>
          </p>
        </div>

        <p className="text-center mt-4">
          <Link href="/" className="text-purple-600 hover:text-purple-400 text-sm transition-colors">
            ← Kembali ke beranda
          </Link>
        </p>
      </div>
    </div>
  );
}