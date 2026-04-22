import * as Comment from '../models/commentModel.js';

export async function getAllComment(req, res) {
  try {
    const data = await Comment.getAll();
    res.json({ data });
  } catch (err) {
    console.error('Gagal get comment:', err);
    res.status(500).json({ error: 'Gagal mengambil data komentar' });
  }
}

export async function createComment(req, res) {
  try {
    const IDUSER = req.user.IDUSER; 
    const { COMMENT, RATING } = req.body;

    if (!COMMENT || COMMENT.trim() === "") {
      return res.status(400).json({ error: 'Isi komentar tidak boleh kosong' });
    }
    if (!RATING || RATING < 1 || RATING > 10) {
      return res.status(400).json({ error: 'Rating harus antara 1 sampai 10' });
    }

    await Comment.create({ 
      IDUSER, 
      COMMENT, 
      RATING: String(RATING) 
    });

    res.json({ message: 'Comment berhasil ditambahkan' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function updateComment(req, res) {
  try {
    const id = req.params.id;
    const currentUserID = req.user.IDUSER; 
    const { COMMENT, RATING } = req.body;

    const existing = await Comment.getById(id);
    if (!existing) {
      return res.status(404).json({ error: 'Data comment tidak ditemukan' });
    }

    if (existing.IDUSER !== currentUserID) {
      return res.status(403).json({ error: 'Anda tidak diizinkan mengedit komentar ini' });
    }

    if (!COMMENT || COMMENT.trim() === "") {
      return res.status(400).json({ error: 'Isi komentar tidak boleh kosong' });
    }

    await Comment.update(id, {
      COMMENT,
      RATING: String(RATING),
    });

    res.json({ message: 'Comment berhasil diperbarui' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function deleteComment(req, res) {
  try {
    const id = req.params.id;
    const currentUserID = req.user.IDUSER;

    const existing = await Comment.getById(id);
    if (!existing) {
      return res.status(404).json({ error: 'Data comment tidak ditemukan' });
    }

    if (existing.IDUSER !== currentUserID) {
      return res.status(403).json({ error: 'Anda tidak diizinkan menghapus komentar ini' });
    }

    await Comment.remove(id);
    res.json({ message: 'Comment berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}