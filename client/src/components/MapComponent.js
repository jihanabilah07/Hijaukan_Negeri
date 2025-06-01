import React from 'react';
import { Link } from 'react-router-dom';

import heroImage from '../assets/penanaman-pohon.jpg';
import relawanImage from '../assets/relawan-tanam.jpg';
import anakTanamImage from '../assets/anak-tanam.jpg';
import MapComponent from './MapComponent';  // Import peta tempat konservasi

const LandingPage = () => {
  return (
    <div className="font-sans">
      {/* Navbar */}
      <nav className="bg-[#103f2b] text-white px-6 md:px-24 py-4 flex items-center justify-between shadow-md fixed w-full z-50">
        <h1 className="text-2xl font-bold">Hijaukan Negeri</h1>
        <div className="space-x-4 text-sm md:text-base">
          <Link to="/login" className="hover:text-[#90ee90] transition">
            Login
          </Link>
          <Link
            to="/register"
            className="bg-[#1d593f] hover:bg-[#2e7d57] text-white px-4 py-2 rounded transition"
          >
            Daftar
          </Link>
          <Link to="/articles" className="hover:text-[#90ee90] transition">
            Artikel
          </Link>
          <Link to="/community" className="hover:text-[#90ee90] transition">
            Komunitas
          </Link>
          <Link to="/conservation" className="hover:text-[#90ee90] transition">
            Tempat Konservasi
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div
        className="relative h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />

        {/* Hero Content */}
        <div className="relative z-20 flex flex-col justify-start pt-40 px-8 md:px-24 text-white h-full">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-snug max-w-3xl drop-shadow-lg">
            Bersama Menanam, Bersama Menghijaukan Dunia – Jadi Relawan Penanaman Pohon Sekarang!
          </h1>
          <Link
            to="/register"
            className="bg-[#1d593f] hover:bg-[#2e7d57] text-white font-semibold py-3 px-6 rounded w-fit shadow-md mt-4"
          >
            Daftar Jadi Relawan!
          </Link>
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-[#f7f4e9] text-black px-8 md:px-24 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              🌱 Mengapa Menanam Pohon Itu Penting?
            </h2>
            <p className="text-lg">
              Menanam pohon adalah aksi nyata untuk melawan perubahan iklim dan menjaga bumi tetap hijau.
              Dengan ikut serta sebagai relawan, kamu berkontribusi langsung dalam penghijauan, konservasi alam,
              dan memberikan dampak positif bagi generasi mendatang.
            </p>
          </div>
          <div>
            <img
              src={relawanImage}
              alt="Relawan menanam pohon"
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>

      {/* What We Do Section */}
      <div className="bg-white px-8 md:px-24 py-16 text-[#103f2b]">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
          Apa yang Kami Lakukan?
        </h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 border rounded shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">Penanaman Pohon</h3>
            <p>
              Program rutin untuk menghijaukan area gersang dengan partisipasi masyarakat.
            </p>
          </div>
          <div className="p-6 border rounded shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">Edukasi Lingkungan</h3>
            <p>
              Memberikan edukasi pentingnya menjaga lingkungan bagi anak-anak dan masyarakat umum.
            </p>
          </div>
          <div className="p-6 border rounded shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">Pelatihan Relawan</h3>
            <p>
              Melatih relawan untuk memimpin aksi tanam pohon dan menjaga lingkungan secara berkelanjutan.
            </p>
          </div>
        </div>
      </div>

      {/* Quote Section */}
      <div className="bg-[#f7f4e9] text-black px-8 md:px-24 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <img
              src={anakTanamImage}
              alt="Anak menanam pohon"
              className="rounded-lg shadow-md"
            />
          </div>
          <div>
            <p className="text-xl italic">
              "Satu pohon yang kita tanam hari ini akan menjadi naungan, udara bersih, dan harapan bagi masa depan bumi."
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#103f2b] text-center py-10">
        <p className="text-white text-lg">Gabung dan tanamkan perubahan hari ini di</p>
        <a
          href="https://hijaukannegeriku.com"
          className="inline-block mt-2 bg-white text-[#103f2b] font-semibold px-6 py-3 rounded"
        >
          HijaukanNegeriku.com
        </a>
      </div>

      {/* Kontak Kami */}
      <footer className="bg-[#0e2d21] text-white px-8 md:px-24 py-10">
        <h2 className="text-xl font-semibold mb-4">📞 Kontak Kami</h2>
        <p>Email: support@hijaukannegeriku.com</p>
        <p>Telepon: +62 812-3456-7890</p>
        <div className="mt-4 space-x-4">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-green-300"
          >
            Instagram
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-green-300"
          >
            Facebook
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-green-300"
          >
            Twitter
          </a>
        </div>
        <p className="mt-6 text-sm text-gray-300">&copy; 2025 HijaukanNegeriku. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
