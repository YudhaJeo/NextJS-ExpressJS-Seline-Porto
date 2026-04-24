// components/CommentSection.tsx
"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { commentAPI, getUser, isLoggedIn, type Comment } from "@/lib/api";

const toStars   = (r: string | number) => Math.round(Number(r) / 2);
const fromStars = (s: number) => s * 2;

function PixelStars({ value, onChange }: { value: number; onChange?: (v: number) => void }) {
  const [hover, setHover] = useState(0);
  const display = hover || value;

  return (
    <div style={{ display: "flex", gap: "4px" }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onChange?.(s)}
          onMouseEnter={() => onChange && setHover(s)}
          onMouseLeave={() => setHover(0)}
          style={{
            background:  "none",
            border:      "none",
            cursor:      onChange ? "pointer" : "default",
            fontSize:    "1.1rem",
            color:       s <= display ? "#ffd166" : "rgba(60,9,108,0.8)",
            textShadow:  s <= display ? "0 0 8px #ffd16680" : "none",
            transition:  "all 0.15s",
            transform:   (onChange && s <= display) ? "scale(1.1)" : "scale(1)",
            padding:     "0 1px",
          }}
        >
          ★
        </button>
      ))}
    </div>
  );
}

const fmtDate = (iso: string) => {
  try {
    return new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
  } catch { return ""; }
};

export default function CommentSection() {
  const router = useRouter();

  const [comments,      setComments]      = useState<Comment[]>([]);
  const [fetchLoading,  setFetchLoading]  = useState(true);
  const [fetchError,    setFetchError]    = useState("");
  const [newText,       setNewText]       = useState("");
  const [newStars,      setNewStars]      = useState(5);
  const [submitting,    setSubmitting]    = useState(false);
  const [submitError,   setSubmitError]   = useState("");
  const [editId,        setEditId]        = useState<number | null>(null);
  const [editText,      setEditText]      = useState("");
  const [editStars,     setEditStars]     = useState(5);
  const [editSubmit,    setEditSubmit]    = useState(false);
  const [isClient,      setIsClient]      = useState(false);

  // ✅ FIX: Only read auth state on client to prevent hydration mismatch
  const user     = isClient ? getUser()    : null;
  const loggedIn = isClient ? isLoggedIn() : false;

  const fetchComments = useCallback(async () => {
    setFetchLoading(true);
    setFetchError("");
    try {
      const { data } = await commentAPI.getAll();
      setComments(data.data ?? []);
    } catch {
      setFetchError("Gagal memuat komentar. Pastikan backend berjalan.");
    } finally {
      setFetchLoading(false);
    }
  }, []);

  useEffect(() => {
    setIsClient(true);
    fetchComments();
    window.addEventListener("authChange", fetchComments);
    return () => window.removeEventListener("authChange", fetchComments);
  }, [fetchComments]);

  const handleSubmit = async () => {
    if (!loggedIn) { router.push("/login"); return; }
    if (!newText.trim()) { setSubmitError("Komentar tidak boleh kosong"); return; }
    setSubmitting(true);
    setSubmitError("");
    try {
      await commentAPI.create(newText.trim(), fromStars(newStars));
      setNewText(""); setNewStars(5);
      await fetchComments();
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : "Gagal mengirim");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus komentar ini?")) return;
    try { await commentAPI.remove(id); await fetchComments(); }
    catch (err: unknown) { alert(err instanceof Error ? err.message : "Gagal"); }
  };

  const startEdit = (c: Comment) => {
    setEditId(c.IDCOMMENT);
    setEditText(c.COMMENT);
    setEditStars(toStars(c.RATING));
  };

  const saveEdit = async () => {
    if (!editText.trim() || editId === null) return;
    setEditSubmit(true);
    try {
      await commentAPI.update(editId, editText.trim(), fromStars(editStars));
      setEditId(null);
      await fetchComments();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Gagal");
    } finally {
      setEditSubmit(false);
    }
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditText("");
    setEditStars(5);
  };

  const inputStyle: React.CSSProperties = {
    width:        "100%",
    background:   "rgba(7,0,15,0.7)",
    border:       "1px solid rgba(157,78,221,0.3)",
    borderRadius: "2px",
    padding:      "10px 14px",
    color:        "#e8d5ff",
    fontFamily:   "var(--font-mono)",
    fontSize:     "0.85rem",
    outline:      "none",
    resize:       "none" as const,
    transition:   "border-color 0.2s",
  };

  return (
    <section
      id="comments"
      style={{ padding: "100px 24px 120px", position: "relative" }}
    >
      <div className="neon-divider" style={{ marginBottom: "80px" }} />

      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "50px" }}>
          <div style={{ fontFamily: "var(--font-pixel)", fontSize: "0.5rem", color: "#7efff5", letterSpacing: "0.2em", textShadow: "0 0 8px #7efff5", marginBottom: "12px" }}>
            // GUESTBOOK.DB
          </div>
          <h2 style={{ fontFamily: "var(--font-pixel)", fontSize: "clamp(1rem, 3vw, 1.6rem)", color: "#fff", textShadow: "0 0 20px #c77dff, 0 0 40px rgba(157,78,221,0.4), 3px 3px 0 #3c096c", letterSpacing: "0.05em", lineHeight: 1.6 }}>
            KOMENTAR
          </h2>
          <div style={{ marginTop: "12px", width: "60px", height: "3px", background: "linear-gradient(90deg, #7efff5, #9d4edd)", boxShadow: "0 0 10px rgba(126,255,245,0.4)" }} />
        </div>

        {/* ── Form ── */}
        <div
          style={{
            background:   "rgba(13,0,24,0.8)",
            border:       "1px solid rgba(157,78,221,0.3)",
            borderRadius: "2px",
            overflow:     "hidden",
            marginBottom: "32px",
          }}
        >
          {/* Terminal bar */}
          <div style={{ background: "rgba(60,9,108,0.4)", padding: "8px 16px", borderBottom: "1px solid rgba(157,78,221,0.2)", display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ width: "8px", height: "8px", background: "#ff6ef7", borderRadius: "50%", boxShadow: "0 0 6px #ff6ef7" }} />
            <span style={{ width: "8px", height: "8px", background: "#ffd166", borderRadius: "50%", boxShadow: "0 0 6px #ffd166" }} />
            <span style={{ width: "8px", height: "8px", background: "#7efff5", borderRadius: "50%", boxShadow: "0 0 6px #7efff5" }} />
            {/* ✅ FIX: Render placeholder on server, real value only on client */}
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "#9b7fbf", marginLeft: "8px" }}>
              {isClient
                ? loggedIn
                  ? `user@jess:~$ write_comment`
                  : `guest@jess:~$ login_required`
                : `guest@jess:~$ loading...`}
            </span>
          </div>

          <div style={{ padding: "24px" }}>
            {/* ✅ FIX: Show form only after client hydration to avoid mismatch */}
            {!isClient ? (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div style={{ fontFamily: "var(--font-pixel)", fontSize: "0.45rem", color: "#9b7fbf", letterSpacing: "0.1em", animation: "pulse 1.5s ease-in-out infinite" }}>
                  LOADING...
                </div>
              </div>
            ) : loggedIn ? (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "8px" }}>
                  <span style={{ fontFamily: "var(--font-pixel)", fontSize: "0.4rem", color: "#9b7fbf", letterSpacing: "0.1em" }}>
                    POSTING AS: <span style={{ color: "#c77dff", textShadow: "0 0 6px rgba(199,125,255,0.5)" }}>{user?.USERNAME}</span>
                  </span>
                  <PixelStars value={newStars} onChange={setNewStars} />
                </div>

                <textarea
                  style={inputStyle}
                  rows={3}
                  placeholder="// Tulis komentar kamu di sini..."
                  value={newText}
                  onChange={(e) => { setNewText(e.target.value); setSubmitError(""); }}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(157,78,221,0.6)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(157,78,221,0.3)")}
                />

                {submitError && (
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "#ff6ef7", marginTop: "8px" }}>
                    ⚠ {submitError}
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="btn-pixel"
                  style={{
                    marginTop:    "14px",
                    padding:      "10px 20px",
                    background:   submitting ? "rgba(60,9,108,0.3)" : "rgba(157,78,221,0.3)",
                    border:       "1px solid rgba(157,78,221,0.6)",
                    borderRadius: "2px",
                    color:        "#fff",
                    cursor:       submitting ? "not-allowed" : "pointer",
                    fontFamily:   "var(--font-pixel)",
                    fontSize:     "0.45rem",
                    letterSpacing:"0.1em",
                    boxShadow:    "0 0 15px rgba(157,78,221,0.25)",
                    transition:   "all 0.2s",
                  }}
                >
                  {submitting ? "SENDING..." : "► SEND COMMENT"}
                </button>
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div style={{ fontFamily: "var(--font-pixel)", fontSize: "0.5rem", color: "#9b7fbf", letterSpacing: "0.1em", marginBottom: "20px" }}>
                  LOGIN REQUIRED TO COMMENT
                </div>
                <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
                  <button
                    onClick={() => router.push("/login")}
                    className="btn-pixel"
                    style={{ padding: "10px 20px", background: "rgba(157,78,221,0.3)", border: "1px solid #9d4edd", borderRadius: "2px", color: "#fff", cursor: "pointer", fontFamily: "var(--font-pixel)", fontSize: "0.45rem", letterSpacing: "0.08em", boxShadow: "0 0 12px rgba(157,78,221,0.3)", transition: "all 0.2s" }}
                  >
                    ▶ LOGIN
                  </button>
                  <button
                    onClick={() => router.push("/register")}
                    style={{ padding: "10px 20px", background: "transparent", border: "1px solid rgba(157,78,221,0.4)", borderRadius: "2px", color: "#c77dff", cursor: "pointer", fontFamily: "var(--font-pixel)", fontSize: "0.45rem", letterSpacing: "0.08em", transition: "all 0.2s" }}
                  >
                    + REGISTER
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Comment List ── */}
        {fetchLoading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "60px 0", flexDirection: "column", alignItems: "center", gap: "16px" }}>
            <div style={{ fontFamily: "var(--font-pixel)", fontSize: "0.45rem", color: "#9b7fbf", letterSpacing: "0.15em", animation: "pulse 1.5s ease-in-out infinite" }}>
              LOADING...
            </div>
            <div style={{ display: "flex", gap: "6px" }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{ width: "8px", height: "8px", background: "#9d4edd", animation: `pulse 1s ease-in-out ${i * 0.2}s infinite` }} />
              ))}
            </div>
          </div>
        ) : fetchError ? (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "#ff6ef7", marginBottom: "16px" }}>⚠ {fetchError}</div>
            <button onClick={fetchComments} style={{ padding: "8px 20px", background: "transparent", border: "1px solid rgba(157,78,221,0.4)", borderRadius: "2px", color: "#c77dff", cursor: "pointer", fontFamily: "var(--font-pixel)", fontSize: "0.4rem", letterSpacing: "0.1em" }}>
              RETRY
            </button>
          </div>
        ) : comments.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <div style={{ fontFamily: "var(--font-pixel)", fontSize: "0.5rem", color: "#9b7fbf", letterSpacing: "0.12em", lineHeight: 2 }}>
              NO COMMENTS YET<br />
              <span style={{ color: "#7efff5" }}>BE THE FIRST! 💬</span>
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {comments.map((c) => {
              // ✅ FIX: isOwn only computed client-side, so no mismatch
              const isOwn = isClient && user?.IDUSER === c.IDUSER;
              const stars = toStars(c.RATING);

              return (
                <div
                  key={c.IDCOMMENT}
                  style={{
                    background:   "rgba(13,0,24,0.7)",
                    border:       `1px solid ${isOwn ? "rgba(157,78,221,0.5)" : "rgba(157,78,221,0.15)"}`,
                    borderRadius: "2px",
                    padding:      "18px 20px",
                    position:     "relative",
                    boxShadow:    isOwn ? "0 0 15px rgba(157,78,221,0.1)" : "none",
                    transition:   "border-color 0.2s",
                  }}
                >
                  {/* Own marker */}
                  {isOwn && (
                    <div style={{ position: "absolute", top: 0, left: 0, width: "3px", height: "100%", background: "linear-gradient(to bottom, #9d4edd, #ff6ef7)", borderRadius: "2px 0 0 2px" }} />
                  )}

                  <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                    {/* Avatar */}
                    <div
                      style={{
                        width:          "36px",
                        height:         "36px",
                        flexShrink:     0,
                        background:     "rgba(60,9,108,0.6)",
                        border:         "1px solid rgba(157,78,221,0.4)",
                        display:        "flex",
                        alignItems:     "center",
                        justifyContent: "center",
                        fontFamily:     "var(--font-pixel)",
                        fontSize:       "0.4rem",
                        color:          "#c77dff",
                        textShadow:     "0 0 6px rgba(199,125,255,0.5)",
                        borderRadius:   "1px",
                        userSelect:     "none",
                      }}
                    >
                      {c.USERNAME?.slice(0, 2).toUpperCase() ?? "??"}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      {/* Header row */}
                      <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "8px", marginBottom: "8px" }}>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "#e8d5ff", fontWeight: 600 }}>
                          {c.USERNAME}
                        </span>
                        {isOwn && (
                          <span style={{ fontFamily: "var(--font-pixel)", fontSize: "0.35rem", color: "#c77dff", background: "rgba(157,78,221,0.15)", border: "1px solid rgba(157,78,221,0.3)", padding: "2px 8px", letterSpacing: "0.1em" }}>
                            YOU
                          </span>
                        )}
                        <PixelStars
                          value={editId === c.IDCOMMENT ? editStars : stars}
                          onChange={editId === c.IDCOMMENT ? setEditStars : undefined}
                        />
                        {/* Date + Edit/Delete in one flex row pushed to the right */}
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginLeft: "auto" }}>
                          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "#9b7fbf" }}>
                            {fmtDate(c.CREATED_AT)}
                          </span>
                          {isOwn && editId !== c.IDCOMMENT && (
                            <>
                              <button
                                onClick={() => startEdit(c)}
                                style={{ padding: "3px 8px", background: "transparent", border: "1px solid rgba(157,78,221,0.3)", borderRadius: "1px", color: "#9b7fbf", cursor: "pointer", fontFamily: "var(--font-pixel)", fontSize: "0.35rem", letterSpacing: "0.08em", transition: "all 0.2s" }}
                                onMouseEnter={(e) => { e.currentTarget.style.color = "#c77dff"; e.currentTarget.style.borderColor = "rgba(157,78,221,0.6)"; }}
                                onMouseLeave={(e) => { e.currentTarget.style.color = "#9b7fbf"; e.currentTarget.style.borderColor = "rgba(157,78,221,0.3)"; }}
                              >
                                EDIT
                              </button>
                              <button
                                onClick={() => handleDelete(c.IDCOMMENT)}
                                style={{ padding: "3px 8px", background: "transparent", border: "1px solid rgba(255,110,247,0.3)", borderRadius: "1px", color: "#9b7fbf", cursor: "pointer", fontFamily: "var(--font-pixel)", fontSize: "0.35rem", letterSpacing: "0.08em", transition: "all 0.2s" }}
                                onMouseEnter={(e) => { e.currentTarget.style.color = "#ff6ef7"; e.currentTarget.style.borderColor = "rgba(255,110,247,0.6)"; }}
                                onMouseLeave={(e) => { e.currentTarget.style.color = "#9b7fbf"; e.currentTarget.style.borderColor = "rgba(255,110,247,0.3)"; }}
                              >
                                DEL
                              </button>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Comment text / edit mode */}
                      {editId === c.IDCOMMENT ? (
                        <div>
                          <textarea
                            style={{ ...inputStyle, marginTop: "6px", border: "1px solid rgba(157,78,221,0.5)" }}
                            rows={2}
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                          />
                          <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
                            <button
                              onClick={saveEdit}
                              disabled={editSubmit}
                              style={{ padding: "7px 16px", background: "rgba(157,78,221,0.3)", border: "1px solid #9d4edd", borderRadius: "2px", color: "#fff", cursor: editSubmit ? "not-allowed" : "pointer", fontFamily: "var(--font-pixel)", fontSize: "0.4rem", letterSpacing: "0.08em" }}
                            >
                              {editSubmit ? "SAVING..." : "✓ SAVE"}
                            </button>
                            <button
                              onClick={cancelEdit}
                              style={{ padding: "7px 16px", background: "transparent", border: "1px solid rgba(157,78,221,0.3)", borderRadius: "2px", color: "#9b7fbf", cursor: "pointer", fontFamily: "var(--font-pixel)", fontSize: "0.4rem", letterSpacing: "0.08em" }}
                            >
                              ✕ CANCEL
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "#b89fd4", lineHeight: 1.7, margin: 0 }}>
                          {c.COMMENT}
                        </p>
                      )}
                    </div>
                  </div>


                </div>
              );
            })}
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse {
          0%,100% { opacity: 0.4; }
          50%      { opacity: 1; }
        }
      `}</style>
    </section>
  );
}