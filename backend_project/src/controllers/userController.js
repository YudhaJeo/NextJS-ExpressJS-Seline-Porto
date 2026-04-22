import * as User from '../models/userModel.js';

export async function getAllUser(req, res) {
  try {
    const data = await User.getAll();
    res.json({ data });
  } catch (err) {
    console.error('Gagal get user:', err);
    res.status(500).json({ error: err.message });
  }
}

export async function createUser(req, res) {
  try {
    const { USERNAME, EMAIL, PASSWORD } = req.body;

    if (!USERNAME) {
      return res.status(400).json({ error: 'Nama user wajib diisi' });
    } 
    
    if (!EMAIL) {
      return res.status(400).json({ error: 'Email user wajib diisi' });
    } 
    
    if (!PASSWORD) {
      return res.status(400).json({ error: 'Password user wajib diisi' });
    }

    await User.create({ USERNAME, EMAIL, PASSWORD });

    res.json({ message: 'User berhasil ditambahkan' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function updateUser(req, res) {
  try {
    const id = req.params.id;
    const { USERNAME, EMAIL, PASSWORD } = req.body;

    const existing = await User.getById(id);
    if (!existing) {
      return res.status(404).json({ error: 'Data user tidak ditemukan' });
    }

    await User.update(id, { USERNAME, EMAIL, PASSWORD });
    res.json({ message: 'User berhasil diperbarui' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function deleteUser(req, res) {
  try {
    const id = req.params.id;

    const existing = await User.getById(id);
    if (!existing) {
      return res.status(404).json({ error: 'Data user tidak ditemukan' });
    }

    await User.remove(id);
    res.json({ message: 'User berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
