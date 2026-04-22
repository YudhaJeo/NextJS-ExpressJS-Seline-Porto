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




# System Resume

### 1. Arsitektur Sistem: Decoupled Full-Stack
Proyek ini menggunakan pemisahan yang jelas antara Frontend dan Backend (Decoupled).  
Frontend fokus pada antarmuka pengguna, sementara Backend fokus pada keamanan dan pengolahan data.

### 2. Teknologi yang Digunakan (Tech Stack)

**Frontend**
- Next.js (React Framework)

**Backend**
- Express.js (Node.js) sebagai RESTful API  
- Knex.js untuk query builder, migrasi database, dan manajemen skema SQL

**Database**
- MySQL sebagai database relasional untuk menyimpan data pengguna dan komentar

**Keamanan**
- JWT (JSON Web Token) untuk autentikasi  
- Token disimpan di client dan dikirim melalui header setiap request  
- Password hashing untuk mengamankan kredensial user

### 3. Alur Kerja Login

1. User input username dan password  
2. Data dikirim via POST ke API Backend  
3. Backend mencocokkan username dan melakukan hash-comparison password  
4. Jika valid, backend membuat JWT berisi identitas user  
5. Frontend menerima JWT dan menyimpannya di LocalStorage  
6. Status UI berubah menjadi logged in  

Saat user melakukan aksi (Create/Edit/Delete):
- JWT dikirim di header request  
- Middleware backend memvalidasi token  
- Jika valid → request diproses  
- Jika tidak → 401 Unauthorized  

### 4. Alur Kerja CRUD Komentar

**Create**
- User login → token diverifikasi → data disimpan ke MySQL  

**Read**
- Frontend fetch data dari API → ditampilkan dengan format tanggal lokal  

**Update/Delete**
- Backend memvalidasi apakah ID user sesuai dengan pemilik komentar  
- Jika sesuai → aksi diizinkan  

---
