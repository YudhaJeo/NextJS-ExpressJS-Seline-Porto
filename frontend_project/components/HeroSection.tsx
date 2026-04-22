// D:\Personal App\Seline Porto NextJS ExpressJS\frontend_project\components\HeroSection.tsx
"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { commentAPI, getUser, getToken, type Comment } from "@/lib/api";

// ---------- Star Rating ----------
function StarRating({ value, onChange }: { value: number; onChange?: (v: number) => void }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange?.(star)}
          className={`text-lg transition-colors ${
            star <= value ? "text-yellow-400" : "text-purple-800"
          } ${onChange ? "hover:text-yellow-300 cursor-pointer" : "cursor-default"}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

// Rating backend 1-10 → tampilan bintang 1-5
const toStars = (r: string | number) => Math.round(Number(r) / 2);
const fromStars = (s: number) => s * 2; // stars 1-5 → rating 2,4,6,8,10

export default function CommentSection() {
  const router = useRouter();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // New comment
  const [newText, setNewText] = useState("");
  const [newStars, setNewStars] = useState(5);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Edit
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const [editStars, setEditStars] = useState(5);
  const [editSubmitting, setEditSubmitting] = useState(false);

  const user = getUser();
  const isLoggedIn = !!getToken();

  // ---------- Fetch comments ----------
  const fetchComments = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const res = await commentAPI.getAll();
      setComments(res.data.data || []);
    } catch {
      setError("Gagal memuat komentar. Pastikan backend berjalan.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchComments();
    // Re-fetch kalau auth berubah
    window.addEventListener("authChange", fetchComments);
    return () => window.removeEventListener("authChange", fetchComments);
  }, [fetchComments]);

  // ---------- Submit new comment ----------
  const handleSubmit = async () => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
    if (!newText.trim()) {
      setSubmitError("Komentar tidak boleh kosong");
      return;
    }
    setSubmitting(true);
    setSubmitError("");
    try {
      await commentAPI.create(newText.trim(), fromStars(newStars));
      setNewText("");
      setNewStars(5);
      await fetchComments();
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : "Gagal mengirim komentar");
    } finally {
      setSubmitting(false);
    }
  };

  // ---------- Delete ----------
  const handleDelete = async (id: number) => {
    if (!confirm("Hapus komentar ini?")) return;
    try {
      await commentAPI.remove(id);
      await fetchComments();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Gagal menghapus");
    }
  };

  // ---------- Edit ----------
  const startEdit = (c: Comment) => {
    setEditingId(c.IDCOMMENT);
    setEditText(c.COMMENT);
    setEditStars(toStars(c.RATING));
  };

  const saveEdit = async () => {
    if (!editText.trim() || editingId === null) return;
    setEditSubmitting(true);
    try {
      await commentAPI.update(editingId, editText.trim(), fromStars(editStars));
      setEditingId(null);
      await fetchComments();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Gagal menyimpan");
    } finally {
      setEditSubmitting(false);
    }
  };

  // Format date
  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleDateString("id-ID", {
        day: "numeric", month: "short", year: "numeric",
      });
    } catch {
      return "";
    }
  };

  return (
    <section className="relative z-10 py-20 px-6 pb-32">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-purple-400 text-sm tracking-widest uppercase font-semibold mb-2">Guest Book</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Komentar</h2>
          <div className="mt-4 h-1 w-16 bg-gradient-to-r from-purple-500 to-violet-400 mx-auto rounded-full" />
        </div>

        {/* ---- Form komentar baru ---- */}
        <div className="bg-purple-900/20 border border-purple-700/30 rounded-2xl p-6 mb-8">
          {isLoggedIn ? (
            <>
              <p className="text-purple-300 text-sm font-semibold mb-1">
                Tinggalkan komentar
              </p>
              <p className="text-purple-500 text-xs mb-4">
                Login sebagai <span className="text-purple-300 font-medium">{user?.USERNAME}</span>
              </p>

              <StarRating value={newStars} onChange={setNewStars} />

              <textarea
                className="mt-3 w-full bg-purple-950/50 border border-purple-700/40 rounded-xl px-4 py-3 text-white text-sm placeholder-purple-500 focus:outline-none focus:border-purple-500 resize-none"
                rows={3}
                placeholder="Tulis komentar kamu di sini..."
                value={newText}
                onChange={(e) => { setNewText(e.target.value); setSubmitError(""); }}
              />

              {submitError && (
                <p className="text-red-400 text-xs mt-1">{submitError}</p>
              )}

              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="mt-3 px-5 py-2 bg-purple-700 hover:bg-purple-600 disabled:bg-purple-900 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-full transition-colors"
              >
                {submitting ? "Mengirim..." : "Kirim"}
              </button>
            </>
          ) : (
            /* Not logged in prompt */
            <div className="text-center py-4">
              <p className="text-purple-300 text-sm mb-4">
                Login untuk meninggalkan komentar
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => router.push("/login")}
                  className="px-5 py-2 bg-purple-700 hover:bg-purple-600 text-white text-sm font-semibold rounded-full transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => router.push("/register")}
                  className="px-5 py-2 border border-purple-500 hover:border-purple-300 text-purple-300 hover:text-white text-sm font-semibold rounded-full transition-colors"
                >
                  Register
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ---- Comment list ---- */}
        {loading ? (
          <div className="flex justify-center py-12">
            <svg className="animate-spin w-8 h-8 text-purple-500" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-400 text-sm mb-3">{error}</p>
            <button
              onClick={fetchComments}
              className="px-4 py-2 border border-purple-700 hover:border-purple-500 text-purple-300 text-sm rounded-full transition-colors"
            >
              Coba lagi
            </button>
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-12 text-purple-500 text-sm">
            Belum ada komentar. Jadilah yang pertama! 💬
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {comments.map((c) => {
              const isOwn = user?.IDUSER === c.IDUSER;
              const stars = toStars(c.RATING);

              return (
                <div
                  key={c.IDCOMMENT}
                  className={`bg-purple-900/20 border rounded-2xl p-5 relative transition-all ${
                    isOwn ? "border-purple-500/40" : "border-purple-700/30"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full bg-purple-700/60 border border-purple-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {c.USERNAME?.slice(0, 2).toUpperCase() ?? "?"}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <div className="flex items-center gap-2">
                          <p className="text-white text-sm font-semibold">{c.USERNAME}</p>
                          {isOwn && (
                            <span className="text-xs text-purple-400 bg-purple-900/50 px-2 py-0.5 rounded-full">
                              Kamu
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          <StarRating
                            value={editingId === c.IDCOMMENT ? editStars : stars}
                            onChange={editingId === c.IDCOMMENT ? setEditStars : undefined}
                          />
                          <span className="text-purple-600 text-xs">{formatDate(c.CREATED_AT)}</span>
                        </div>
                      </div>

                      {/* Edit mode / Display mode */}
                      {editingId === c.IDCOMMENT ? (
                        <div className="mt-2">
                          <textarea
                            className="w-full bg-purple-950/50 border border-purple-500 rounded-xl px-4 py-2 text-white text-sm resize-none focus:outline-none"
                            rows={2}
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                          />
                          <div className="flex gap-2 mt-2">
                            <button
                              onClick={saveEdit}
                              disabled={editSubmitting}
                              className="px-4 py-1.5 bg-purple-600 hover:bg-purple-500 disabled:bg-purple-900 text-white text-xs font-semibold rounded-full transition-colors"
                            >
                              {editSubmitting ? "Menyimpan..." : "Simpan"}
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="px-4 py-1.5 border border-purple-700 hover:border-purple-500 text-purple-300 text-xs font-semibold rounded-full transition-colors"
                            >
                              Batal
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-purple-100/80 text-sm mt-1">{c.COMMENT}</p>
                      )}
                    </div>
                  </div>

                  {/* Edit/Delete — only own comments, not in edit mode */}
                  {isOwn && editingId !== c.IDCOMMENT && (
                    <div className="absolute top-4 right-4 flex gap-2">
                      <button
                        onClick={() => startEdit(c)}
                        className="text-xs text-purple-400 hover:text-purple-200 transition-colors px-2 py-1 rounded hover:bg-purple-800/30"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(c.IDCOMMENT)}
                        className="text-xs text-red-400 hover:text-red-300 transition-colors px-2 py-1 rounded hover:bg-red-900/20"
                      >
                        Hapus
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}