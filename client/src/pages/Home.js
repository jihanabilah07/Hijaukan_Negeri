// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/InNavbar";
import { FaTree, FaUsers, FaNewspaper, FaHandsHelping, FaArrowRight } from 'react-icons/fa';

import heroImg from "../assets/hero.jpg";
import seulawahImg from "../assets/seulawah.jpg";
import treeImg from "../assets/tree.jpg";
import cleanUpImg from "../assets/clean-up.jpg";
import gardenImg from "../assets/garden.jpg";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#f7f4e9]">
      <Navbar />

      {/* Hero Section with Parallax Effect */}
      <section
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${heroImg})`,
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative max-w-4xl mx-auto text-center text-white px-6">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Bersama Hijaukan Negeri</h2>
          <p className="text-lg md:text-xl mb-8">
            Bergabunglah dalam gerakan lingkungan melalui artikel, komunitas, dan aksi nyata untuk masa depan yang lebih hijau.
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              to="/create" 
              className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-full text-lg font-semibold transition-all transform hover:scale-105"
            >
              Buat Postingan
            </Link>
            <Link
              to="/manage-community"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-green-800 px-8 py-3 rounded-full text-lg font-semibold transition-all transform hover:scale-105"
            >
              Komunitas
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section with Icons */}
      <section className="py-20">
        <div className="container mx-auto px-6 md:px-24">
          <h3 className="text-3xl font-bold text-green-800 text-center mb-12">Layanan Kami</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: FaNewspaper, title: "Artikel", desc: "Tulis dan baca artikel edukatif tentang lingkungan." },
              { icon: FaUsers, title: "Komunitas", desc: "Gabung komunitas dan lakukan aksi nyata." },
              { icon: FaTree, title: "Kegiatan", desc: "Ikuti berbagai event penanaman dan bersih lingkungan." },
              { icon: FaHandsHelping, title: "Kolaborasi", desc: "Bangun jejaring peduli lingkungan bersama." },
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                <item.icon className="w-12 h-12 text-green-600 mb-4" />
                <h4 className="text-xl font-semibold text-green-800 mb-3">{item.title}</h4>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section with Gradient */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-white">
        <div className="container mx-auto px-6 md:px-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold text-green-800 mb-6">Lingkungan adalah tanggung jawab kita bersama</h3>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Di Hijaukan Negeri, kami percaya bahwa setiap individu dapat membawa perubahan.
              Melalui edukasi dan aksi nyata, kita bisa menciptakan bumi yang lebih hijau dan bersih untuk generasi mendatang.
            </p>
            <Link 
              to="/about" 
              className="inline-flex items-center text-green-700 hover:text-green-800 font-semibold"
            >
              Pelajari Lebih Lanjut <FaArrowRight className="ml-2" />
            </Link>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-green-100 rounded-lg transform rotate-3"></div>
            <img 
              src={seulawahImg} 
              alt="Volunteer action" 
              className="relative rounded-lg shadow-xl w-full h-[400px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Stats Section with Cards */}
      <section className="py-20 bg-green-800 text-white">
        <div className="container mx-auto px-6 md:px-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-green-700 rounded-xl p-8 text-center transform hover:scale-105 transition-all">
              <h4 className="text-5xl font-bold mb-2">120+</h4>
              <p className="text-xl">Artikel Diposting</p>
            </div>
            <div className="bg-green-700 rounded-xl p-8 text-center transform hover:scale-105 transition-all">
              <h4 className="text-5xl font-bold mb-2">30+</h4>
              <p className="text-xl">Komunitas Terlibat</p>
            </div>
            <div className="bg-green-700 rounded-xl p-8 text-center transform hover:scale-105 transition-all">
              <h4 className="text-5xl font-bold mb-2">500+</h4>
              <p className="text-xl">Relawan Aktif</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section with Masonry-like Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6 md:px-24">
          <h3 className="text-3xl font-bold text-green-800 text-center mb-12">Galeri Kegiatan</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { img: treeImg, title: "Penanaman Pohon" },
              { img: cleanUpImg, title: "Bersih Lingkungan" },
              { img: gardenImg, title: "Taman Komunitas" }
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="group relative overflow-hidden rounded-xl shadow-lg transform hover:scale-105 transition-all"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-[300px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                  <h4 className="text-white text-xl font-semibold p-6">{item.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
