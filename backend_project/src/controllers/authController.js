// src/controllers/authController.js
import * as User from '../models/authModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function register(req, res) {
  try {
    const { USERNAME, PASSWORD } = req.body;
    const cleanUsername = USERNAME?.trim();

    if (!cleanUsername || cleanUsername.length < 3) {
      return res.status(400).json({ error: 'Username minimal 3 karakter' });
    }

    // Cek apakah username sudah ada
    const existing = await User.getByUsername(USERNAME);
    if (existing) {
      return res.status(400).json({ error: 'Username sudah digunakan' });
    }

    // Hash password sebelum simpan
    const hashedPassword = await bcrypt.hash(PASSWORD, 10);

    await User.create({ 
      USERNAME, 
      PASSWORD: hashedPassword 
    });

    res.status(201).json({ message: 'Registrasi berhasil!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const SECRET_KEY = 'jess_secret_key_123'; // Sebaiknya simpan di file .env

export async function login(req, res) {
  try {
    const { USERNAME, PASSWORD } = req.body;

    const user = await User.getByUsername(USERNAME);
    if (!user) {
      return res.status(401).json({ error: 'Username tidak ditemukan' });
    }

    const isMatch = await bcrypt.compare(PASSWORD, user.PASSWORD);
    if (!isMatch) {
      return res.status(401).json({ error: 'Password salah' });
    }

    // Buat Token JWT
    const token = jwt.sign(
      { IDUSER: user.IDUSER, USERNAME: user.USERNAME },
      SECRET_KEY,
      { expiresIn: '1d' } // Expired dalam 1 hari
    );

    // Hilangkan password dari response
    const { PASSWORD: _, ...userPublic } = user;
    
    res.json({ 
      message: 'Login berhasil', 
      token, // Kirim token ke frontend
      user: userPublic 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
