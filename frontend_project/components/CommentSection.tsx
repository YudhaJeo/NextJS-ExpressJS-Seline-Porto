// D:\Personal App\Seline Porto NextJS ExpressJS\frontend_project\components\CommentSection.tsx
"use client";
import { useState } from "react";

// --- Types ---
type Comment = {
  id: number;
  author: string;
  avatar: string;
  rating: number;
  text: string;
  isOwn: boolean; // will be replaced with real auth check
};

// --- Mock data (replace with API calls later) ---
const MOCK_COMMENTS: Comment[] = [
  {
    id: 1,
    author: "Andi",
    avatar: "A",
    rating: 5,
    text: "Portfolio yang keren banget! Desainnya clean dan profesional.",
    isOwn: false,
  },
  {
    id: 2,
    author: "You",
    avatar: "Y",
    rating: 4,
    text: "This is my own comment. I can edit or delete it!",
    isOwn: true,
  },
];

function StarRating({
  value,
  onChange,
}: {
  value: number;
  onChange?: (v: number) => void;
}) {
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

export default function CommentSection() {
  const [comments, setComments] = useState<Comment[]>(MOCK_COMMENTS);
  const [newText, setNewText] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const [editRating, setEditRating] = useState(5);

  // --- Submit new comment ---
  const handleSubmit = () => {
    if (!newText.trim()) return;
    const comment: Comment = {
      id: Date.now(),
      author: "You",
      avatar: "Y",
      rating: newRating,
      text: newText.trim(),
      isOwn: true,
    };
    setComments((prev) => [comment, ...prev]);
    setNewText("");
    setNewRating(5);
    // TODO: POST /api/comments
  };

  // --- Delete ---
  const handleDelete = (id: number) => {
    setComments((prev) => prev.filter((c) => c.id !== id));
    // TODO: DELETE /api/comments/:id
  };

  // --- Edit ---
  const startEdit = (c: Comment) => {
    setEditingId(c.id);
    setEditText(c.text);
    setEditRating(c.rating);
  };
  const saveEdit = () => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === editingId ? { ...c, text: editText, rating: editRating } : c
      )
    );
    setEditingId(null);
    // TODO: PUT /api/comments/:id
  };

  return (
    <section className="relative z-10 py-20 px-6 pb-32">
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <p className="text-purple-400 text-sm tracking-widest uppercase font-semibold mb-2">Guest Book</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Comments</h2>
          <div className="mt-4 h-1 w-16 bg-gradient-to-r from-purple-500 to-violet-400 mx-auto rounded-full" />
        </div>

        {/* New comment form */}
        <div className="bg-purple-900/20 border border-purple-700/30 rounded-2xl p-6 mb-8">
          <p className="text-purple-300 text-sm font-semibold mb-4">Leave a Comment</p>
          <StarRating value={newRating} onChange={setNewRating} />
          <textarea
            className="mt-3 w-full bg-purple-950/50 border border-purple-700/40 rounded-xl px-4 py-3 text-white text-sm placeholder-purple-500 focus:outline-none focus:border-purple-500 resize-none"
            rows={3}
            placeholder="Write your comment here..."
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
          <button
            onClick={handleSubmit}
            className="mt-3 px-5 py-2 bg-purple-700 hover:bg-purple-600 text-white text-sm font-semibold rounded-full transition-colors"
          >
            Submit
          </button>
        </div>

        {/* Comment list */}
        <div className="flex flex-col gap-4">
          {comments.map((c) => (
            <div
              key={c.id}
              className="bg-purple-900/20 border border-purple-700/30 rounded-2xl p-5 relative"
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-purple-700/60 border border-purple-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {c.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-white text-sm font-semibold">{c.author}</p>
                    <StarRating value={editingId === c.id ? editRating : c.rating} onChange={editingId === c.id ? setEditRating : undefined} />
                  </div>

                  {editingId === c.id ? (
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
                          className="px-4 py-1.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold rounded-full transition-colors"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="px-4 py-1.5 border border-purple-700 hover:border-purple-500 text-purple-300 text-xs font-semibold rounded-full transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-purple-100/80 text-sm mt-1">{c.text}</p>
                  )}
                </div>
              </div>

              {/* Edit/Delete (own comments only) */}
              {c.isOwn && editingId !== c.id && (
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => startEdit(c)}
                    className="text-xs text-purple-400 hover:text-purple-200 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="text-xs text-red-400 hover:text-red-300 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
