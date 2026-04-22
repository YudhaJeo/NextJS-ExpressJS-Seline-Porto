# Seline Project - NextJS dan ExpressJS

## Prasyarat
- Node.js (versi 16 atau lebih baru)
- npm (Node Package Manager)
- MySQL

## Persiapan Database
1. Buka MySQL dan buat database baru:
```sql
CREATE DATABASE a_seline_db;
```

## Instalasi Backend
1. Masuk ke direktori backend:
```bash
cd backend_project
```

2. Install dependencies:
```bash
npm install
```

3. Jalankan Migrasi Database:
```bash
npx knex migrate:latest
```

4. Jalankan Server Development:
```bash
npm run dev
```

## Instalasi Frontend
1. Masuk ke direktori frontend:
```bash
cd frontend_project
```

2. Install dependencies:
```bash
npm install
```

3. Jalankan Build Frontend:
```bash
npm run build
```

3. Jalankan Server Frontend:
```bash
npm run start
```

## Akses Aplikasi
- Backend: `http://localhost:4002`
- Frontend: `http://localhost:3002`

## Catatan Tambahan
- Pastikan MySQL sudah berjalan sebelum menjalankan migrasi
- Sesuaikan konfigurasi database di `.env` sesuai pengaturan MySQL Anda
