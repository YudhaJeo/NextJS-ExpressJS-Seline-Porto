"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authAPI, saveAuth, isLoggedIn } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm]     = useState({ USERNAME: "", PASSWORD: "" });
  const [error, setError]   = useState("");
  const [loading, setLoading] = useState(false);

  // Sudah login → ke home
  useEffect(() => {
    if (isLoggedIn()) router.replace("/");
  }, [router]);

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
      // axios login — token + user tersimpan di cookie via saveAuth()
      const { data } = await authAPI.login(form.USERNAME.trim(), form.PASSWORD);
      saveAuth(data.token, data.user);

      // Trigger komponen lain (Navbar, CommentSection) untuk re-read cookie
      window.dispatchEvent(new Event("authChange"));
      router.push("/");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0010] flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-purple-900/20 blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="text-4xl font-bold text-purple-300 hover:text-purple-100 transition-colors" style={{ fontFamily: "serif" }}>
            Jess.
          </Link>
          <p className="text-purple-400/70 text-sm mt-2 tracking-widest uppercase">Welcome back</p>
        </div>

        {/* Card */}
        <div className="bg-purple-950/40 border border-purple-700/30 rounded-2xl p-8 backdrop-blur-sm shadow-[0_0_40px_rgba(168,85,247,0.1)]">
          <h1 className="text-2xl font-bold text-white mb-6">Login</h1>

          {error && (
            <div className="mb-4 px-4 py-3 bg-red-900/30 border border-red-500/40 rounded-xl text-red-300 text-sm flex items-start gap-2">
              <span className="mt-0.5">⚠</span>
              <span>{error}</span>
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
              placeholder="Masukkan username"
              autoComplete="username"
              className="w-full bg-purple-950/60 border border-purple-700/40 rounded-xl px-4 py-3 text-white placeholder-purple-600 focus:outline-none focus:border-purple-400 transition-colors text-sm"
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-purple-300 text-xs uppercase tracking-wider mb-2 font-semibold">
              Password
            </label>
            <input
              type="password"
              name="PASSWORD"
              value={form.PASSWORD}
              onChange={handleChange}
              placeholder="Masukkan password"
              autoComplete="current-password"
              className="w-full bg-purple-950/60 border border-purple-700/40 rounded-xl px-4 py-3 text-white placeholder-purple-600 focus:outline-none focus:border-purple-400 transition-colors text-sm"
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3 bg-purple-700 hover:bg-purple-600 active:scale-[0.98] disabled:bg-purple-900 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all text-sm"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Memverifikasi...
              </span>
            ) : "Masuk"}
          </button>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-purple-800/50" />
            <span className="text-purple-600 text-xs">atau</span>
            <div className="flex-1 h-px bg-purple-800/50" />
          </div>

          <p className="text-center text-purple-400 text-sm">
            Belum punya akun?{" "}
            <Link href="/register" className="text-purple-300 hover:text-white font-semibold transition-colors underline underline-offset-4">
              Daftar sekarang
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