# 🌱 Hijaukan Negeri

**Platform Volunteer Penanaman Pohon dan Konservasi Lingkungan**

Sebuah platform web interaktif untuk mendukung kegiatan penanaman pohon dan konservasi lingkungan. Aplikasi ini memudahkan pengguna untuk bergabung dalam aksi lingkungan, membangun komunitas, dan mengakses informasi penting seputar lokasi konservasi.

---

## 🚀 Fitur Utama

* 🌿 **Landing Page Interaktif**
  Informasi umum, statistik kegiatan, dan timeline penanaman pohon.

* 👥 **Manajemen Pengguna**
  Sistem autentikasi lengkap (registrasi, login, logout).

* 📋 **Artikel & Kegiatan**
  Fitur untuk memposting, membagikan, dan melihat detail kegiatan penanaman pohon.

* 🌳 **Tempat Konservasi**
  Menyediakan informasi lokasi konservasi dengan fitur pencarian dan filter.

* 🧑‍🤝‍🧑 **Komunitas**
  Ruang interaksi antar pengguna untuk membentuk komunitas peduli lingkungan.

* 📊 **Profil Pengguna**
  Menampilkan riwayat kontribusi, kegiatan yang diikuti, dan informasi akun.

---

## 🧩 Tech Stack

### 🌐 Frontend

* ⚛️ **React.js** — Library untuk membangun antarmuka pengguna
* 🎨 **Tailwind CSS** — Styling responsif dan modern
* 🧭 **React Router** — Navigasi antar halaman
* 🖼️ **React Icons** — Ikon visual siap pakai
* 📡 **Axios** — Library HTTP untuk komunikasi dengan backend

### 🖥️ Backend

* 🚀 **Node.js & Express** — Backend runtime dan framework minimalis
* 🗄️ **MongoDB** — Database NoSQL fleksibel
* 🔐 **JWT (JSON Web Token)** — Autentikasi dan otorisasi pengguna
* 📁 **Multer** — Middleware untuk upload gambar
* 🔒 **Bcrypt** — Enkripsi password yang aman

---

## 📁 Struktur Proyek

```
📦 tree-planting-volunteer
 ┣ 📂 client
 ┃ ┣ 📂 src
 ┃ ┃ ┣ 📂 assets        # Gambar dan media pendukung
 ┃ ┃ ┣ 📂 components    # Komponen React reusable
 ┃ ┃ ┣ 📂 pages         # Halaman-halaman utama
 ┃ ┃ ┣ 📂 api           # Konfigurasi API dan service
 ┃ ┃ ┗ 📜 App.jsx       # Entry point aplikasi
 ┃ ┣ 📜 package.json
 ┃ ┗ 📜 tailwind.config.js
 ┣ 📂 server
 ┃ ┣ 📂 models          # Schema mongoose untuk database
 ┃ ┣ 📂 routes          # API routes (endpoints)
 ┃ ┣ 📂 controllers     # Logika aplikasi dan request handler
 ┃ ┣ 📂 middleware      # Middleware kustom (autentikasi, validasi, dll.)
 ┃ ┣ 📂 uploads         # Penyimpanan file/gambar upload
 ┃ ┗ 📜 server.js       # Entry point backend
 ┗ 📜 README.md
```

---

## 🛠️ Instalasi dan Penggunaan

### ✅ Prasyarat

* Node.js v18+
* MongoDB
* npm atau yarn

### 🔧 Langkah Instalasi

1. **Clone repositori**

   ```bash
   git clone https://github.com/jihanabilah07/tree-planting-volunteer.git
   cd tree-planting-volunteer
   ```

2. **Instal dependensi frontend**

   ```bash
   cd client
   npm install
   ```

3. **Instal dependensi backend**

   ```bash
   cd ../server
   npm install
   ```

4. **Konfigurasi environment variables**
   Buat file `.env` di folder `server` dan isi dengan:

   ```env
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

5. **Jalankan aplikasi**

   * Terminal 1 (Backend):

     ```bash
     cd server
     npm start
     ```

   * Terminal 2 (Frontend):

     ```bash
     cd client
     npm run dev
     ```

---

## Anggota Kami

* **Shofia Nurul Huda** — 2208107010015
* **Jihan Nabilah** — 2208107010035

