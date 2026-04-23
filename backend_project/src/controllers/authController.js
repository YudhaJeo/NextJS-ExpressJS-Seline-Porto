// src/controllers/authController.js
import * as User from '../models/authModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function register(req, res) {
  try {
    const { USERNAME, EMAIL, PASSWORD } = req.body;

    if (!USERNAME || !EMAIL || !PASSWORD) {
      return res.status(400).json({ error: 'USERNAME, EMAIL, dan PASSWORD wajib diisi' });
    }

    const existingUsername = await User.getByUsername(USERNAME.trim());
    if (existingUsername) {
      return res.status(409).json({ error: 'Username sudah digunakan' });
    }

    const existingEmail = await User.getByEmail(EMAIL.trim().toLowerCase());
    if (existingEmail) {
      return res.status(409).json({ error: 'Email sudah terdaftar' });
    }

    const token = crypto.randomBytes(32).toString('hex');
    const hashedPassword = await bcrypt.hash(PASSWORD, 10);

    await User.create({
      USERNAME: USERNAME.trim(),
      EMAIL: EMAIL.trim().toLowerCase(),
      PASSWORD: hashedPassword,
      VERIFY_TOKEN: token
    });

    const verifyUrl = `${process.env.EXPRESS_PUBLIC_URL}/api/auth/verify?token=${token}`;

    await transporter.sendMail({
      from: `"Seline Project" <${process.env.EMAIL_USER}>`,
      to: EMAIL,
      subject: 'Verifikasi Akun Portofolio Seline',
      html: `
        <h3>Halo ${USERNAME}!</h3>
        <p>Klik link di bawah untuk verifikasi akun kamu:</p>
        <a href="${verifyUrl}">${verifyUrl}</a>
        <p>Link berlaku selama 24 jam.</p>
      `
    });

    res.status(201).json({ message: 'Registrasi berhasil! Cek email untuk verifikasi.' });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Terjadi kesalahan server' });
  }
}

export async function verifyEmail(req, res) {
  try {
    const { token } = req.query;
    if (!token) return res.status(400).send('<h1>Token tidak ditemukan!</h1>');

    const user = await User.getByToken(token);
    if (!user) return res.status(400).send('<h1>Token tidak valid atau sudah digunakan!</h1>');

    await User.updateStatus(user.IDUSER, {
      IS_VERIFIED: true,
      VERIFY_TOKEN: null
    });

    res.redirect(`${process.env.NEXT_PUBLIC_URL}/login?verified=true`);
  } catch (err) {
    console.error('Verify error:', err);
    res.status(500).send('Terjadi kesalahan server');
  }
}

export async function login(req, res) {
  try {
    const { EMAIL, PASSWORD } = req.body;

    if (!EMAIL || !PASSWORD) {
      return res.status(400).json({ error: 'Email dan password wajib diisi' });
    }

    const user = await User.getByEmail(EMAIL.trim().toLowerCase());
    if (!user) {
      return res.status(401).json({ error: 'Email tidak terdaftar' });
    }

    if (!user.IS_VERIFIED) {
      return res.status(403).json({ error: 'Email belum diverifikasi. Silakan cek inbox kamu!' });
    }

    const isMatch = await bcrypt.compare(PASSWORD, user.PASSWORD);
    if (!isMatch) {
      return res.status(401).json({ error: 'Password salah' });
    }

    const token = jwt.sign(
      { IDUSER: user.IDUSER, USERNAME: user.USERNAME, EMAIL: user.EMAIL },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    const { PASSWORD: _, VERIFY_TOKEN: __, ...userPublic } = user;

    res.json({
      message: 'Login berhasil',
      token,
      user: userPublic
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Terjadi kesalahan server' });
  }
}