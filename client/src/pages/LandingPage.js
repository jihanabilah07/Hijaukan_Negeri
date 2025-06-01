import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../api';
import { FaTree, FaUsers, FaMapMarkerAlt, FaArrowRight, FaLeaf, FaHandsHelping, FaGlobe, FaChartLine, FaCalendarAlt, FaSeedling } from 'react-icons/fa';

import heroImage from '../assets/penanaman-pohon.jpg';
import relawanImage from '../assets/relawan-tanam.jpg';
import anakTanamImage from '../assets/anak-tanam.jpg';

const LandingPage = () => {
  const [posts, setPosts] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [loadingCommunities, setLoadingCommunities] = useState(true);
  const [errorPosts, setErrorPosts] = useState(null);
  const [errorCommunities, setErrorCommunities] = useState(null);

  // Fetch posts when component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts();
        if (response && response.data) {
          setPosts(response.data.slice(0, 3)); // Get only 3 most recent posts
        }
        setLoadingPosts(false);
      } catch (err) {
        setErrorPosts(err.message);
        setLoadingPosts(false);
      }
    };

    fetchPosts();
  }, []);

  // Fetch communities when component mounts
  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/communities');
        if (!response.ok) {
          throw new Error('Gagal mengambil data komunitas');
        }
        const data = await response.json();
        
        if (!Array.isArray(data)) {
          console.error('Invalid data format:', data);
          throw new Error('Format data tidak valid');
        }
        
        // Sort by creation date if needed
        const sortedCommunities = data.sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        );
        
        setCommunities(sortedCommunities.slice(0, 3)); // Get only 3 most recent communities
        setLoadingCommunities(false);
      } catch (err) {
        console.error('Error fetching communities:', err);
        setErrorCommunities(err.message || 'Gagal memuat komunitas');
        setLoadingCommunities(false);
      }
    };

    fetchCommunities();
  }, []);

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
          <Link to="/posts" className="hover:text-[#90ee90] transition">
            Artikel
          </Link>
          <Link to="/communities" className="hover:text-[#90ee90] transition">
            Komunitas
          </Link>
          <Link to="/TempatKonservasi" className="hover:text-[#90ee90] transition">
            Tempat Konservasi
          </Link>
        </div>
      </nav>

      {/* Hero Section with Parallax Effect */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${heroImage})`,
            transform: 'scale(1.1)',
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div className="relative text-center text-white px-4 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Bersama Melestarikan Bumi</h1>
          <p className="text-lg md:text-xl mb-8">
            Bergabunglah dalam gerakan penanaman pohon untuk masa depan yang lebih hijau.
            Setiap pohon yang kita tanam adalah investasi untuk generasi mendatang.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/register"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all transform hover:scale-105"
            >
              Mulai Berkontribusi
            </Link>
            <Link
              to="/posts"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-green-800 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all transform hover:scale-105"
            >
              Lihat Kegiatan
            </Link>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6 md:px-24">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-green-50 rounded-lg transform hover:scale-105 transition-all">
              <FaTree className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-green-800 mb-2">1,000+</h3>
              <p className="text-gray-600">Pohon Tertanam</p>
            </div>
            <div className="p-6 bg-green-50 rounded-lg transform hover:scale-105 transition-all">
              <FaUsers className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-green-800 mb-2">500+</h3>
              <p className="text-gray-600">Relawan Aktif</p>
            </div>
            <div className="p-6 bg-green-50 rounded-lg transform hover:scale-105 transition-all">
              <FaMapMarkerAlt className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-green-800 mb-2">10+</h3>
              <p className="text-gray-600">Lokasi Konservasi</p>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Section */}
      <div className="py-20 bg-[#f7f4e9]">
        <div className="container mx-auto px-6 md:px-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-800 mb-4">Dampak Positif yang Kita Ciptakan</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Setiap aksi penanaman pohon memberikan manfaat jangka panjang bagi lingkungan dan masyarakat.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition-all">
              <FaLeaf className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-green-800 mb-2">Udara Lebih Bersih</h3>
              <p className="text-gray-600">Pohon menyerap polutan dan menghasilkan oksigen untuk udara yang lebih sehat</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition-all">
              <FaGlobe className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-green-800 mb-2">Kurangi Emisi</h3>
              <p className="text-gray-600">Membantu mengurangi efek gas rumah kaca dan perubahan iklim</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition-all">
              <FaHandsHelping className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-green-800 mb-2">Pemberdayaan</h3>
              <p className="text-gray-600">Melibatkan masyarakat dalam aksi nyata pelestarian lingkungan</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition-all">
              <FaChartLine className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-green-800 mb-2">Ekonomi Hijau</h3>
              <p className="text-gray-600">Mendukung pengembangan ekonomi berbasis lingkungan</p>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-6 md:px-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-800 mb-4">Perjalanan Menghijaukan Negeri</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Lihat bagaimana kita telah berkembang dan memberikan dampak positif dari waktu ke waktu.
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-green-200"></div>
            <div className="space-y-12">
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-8 h-8 bg-green-600 rounded-full"></div>
                </div>
                <div className="ml-auto mr-8 md:mr-auto md:ml-[55%] p-6 bg-white rounded-lg shadow-lg w-full md:w-[45%]">
                  <FaCalendarAlt className="text-green-600 mb-2" />
                  <h3 className="text-xl font-semibold text-green-800 mb-2">2020 - Awal Mula</h3>
                  <p className="text-gray-600">Dimulai dari sekelompok kecil relawan yang peduli akan lingkungan</p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-8 h-8 bg-green-600 rounded-full"></div>
                </div>
                <div className="mr-auto ml-8 md:ml-auto md:mr-[55%] p-6 bg-white rounded-lg shadow-lg w-full md:w-[45%]">
                  <FaUsers className="text-green-600 mb-2" />
                  <h3 className="text-xl font-semibold text-green-800 mb-2">2021 - Pertumbuhan Komunitas</h3>
                  <p className="text-gray-600">Berkembang menjadi gerakan dengan ratusan relawan aktif</p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-8 h-8 bg-green-600 rounded-full"></div>
                </div>
                <div className="ml-auto mr-8 md:mr-auto md:ml-[55%] p-6 bg-white rounded-lg shadow-lg w-full md:w-[45%]">
                  <FaTree className="text-green-600 mb-2" />
                  <h3 className="text-xl font-semibold text-green-800 mb-2">2022 - Ekspansi Program</h3>
                  <p className="text-gray-600">Memperluas area konservasi dan program penanaman pohon</p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-8 h-8 bg-green-600 rounded-full"></div>
                </div>
                <div className="mr-auto ml-8 md:ml-auto md:mr-[55%] p-6 bg-white rounded-lg shadow-lg w-full md:w-[45%]">
                  <FaSeedling className="text-green-600 mb-2" />
                  <h3 className="text-xl font-semibold text-green-800 mb-2">2023 - Inovasi Berkelanjutan</h3>
                  <p className="text-gray-600">Mengembangkan program edukasi dan pemberdayaan masyarakat</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20 bg-[#f7f4e9]">
        <div className="container mx-auto px-6 md:px-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-800 mb-4">Apa Kata Mereka?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Dengarkan pengalaman para relawan yang telah bergabung dalam misi penghijauan.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-green-600">A</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Andi Pratama</h4>
                  <p className="text-sm text-gray-600">Relawan Aktif</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Bergabung dengan Hijaukan Negeri membuka mata saya tentang pentingnya menjaga lingkungan. Setiap aksi penanaman pohon memberikan kepuasan tersendiri."
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-green-600">S</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Sarah Wijaya</h4>
                  <p className="text-sm text-gray-600">Koordinator Komunitas</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Platform ini memudahkan kami dalam mengorganisir kegiatan dan menghubungkan sesama pecinta lingkungan. Dampaknya sungguh luar biasa!"
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-green-600">R</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Rudi Hartono</h4>
                  <p className="text-sm text-gray-600">Penggiat Lingkungan</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Saya bangga menjadi bagian dari gerakan ini. Bersama-sama kita bisa menciptakan perubahan nyata untuk lingkungan."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Posts Section */}
      <div className="bg-[#f7f4e9] py-16">
        <div className="container mx-auto px-6 md:px-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-800 mb-4">Kegiatan Terbaru</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ikuti perkembangan kegiatan penanaman dan konservasi yang telah kami lakukan
              bersama para relawan dan komunitas.
            </p>
          </div>

          {loadingPosts ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-900 mx-auto"></div>
              <p className="mt-4 text-gray-600">Memuat artikel...</p>
            </div>
          ) : errorPosts ? (
            <div className="text-center text-red-500 py-8">{errorPosts}</div>
          ) : posts.length === 0 ? (
            <div className="text-center text-gray-600 py-8">Belum ada artikel tersedia.</div>
          ) : (
            <>
              <div className="grid md:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <Link
                    to={`/post/${post._id}`}
                    key={post._id}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:scale-105"
                  >
                    {post.image && (
                      <div className="relative h-48">
                        <img
                          src={`http://localhost:5000${post.image}`}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="font-semibold text-xl text-green-800 mb-3">{post.title}</h3>
                      <p className="text-gray-600 mb-4">
                        {post.description && post.description.length > 100
                          ? `${post.description.substring(0, 100)}...`
                          : post.description}
                      </p>
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>{new Date(post.date).toLocaleDateString('id-ID')}</span>
                        <span>{post.location}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="text-center mt-8">
                <Link
                  to="/posts"
                  className="inline-flex items-center text-green-700 hover:text-green-800 font-semibold"
                >
                  Lihat Semua Kegiatan
                  <FaArrowRight className="ml-2" />
                </Link>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="relative py-20 bg-green-800">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative container mx-auto px-6 md:px-24 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Bergabung Sekarang dan Jadilah Bagian dari Perubahan
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Setiap aksi kecil memiliki dampak besar. Mari bergabung dalam misi kami
            untuk menjaga kelestarian lingkungan dan menciptakan masa depan yang lebih hijau.
          </p>
          <Link
            to="/register"
            className="inline-block bg-white text-green-800 px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-100 transition-all transform hover:scale-105"
          >
            Daftar Sebagai Relawan
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#103f2b] text-white py-12">
        <div className="container mx-auto px-6 md:px-24">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Hijaukan Negeri</h3>
              <p className="text-gray-300">
                Bersama-sama melestarikan lingkungan untuk masa depan yang lebih baik.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Tautan</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/posts" className="text-gray-300 hover:text-white">
                    Artikel
                  </Link>
                </li>
                <li>
                  <Link to="/communities" className="text-gray-300 hover:text-white">
                    Komunitas
                  </Link>
                </li>
                <li>
                  <Link to="/TempatKonservasi" className="text-gray-300 hover:text-white">
                    Tempat Konservasi
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Kontak</h3>
              <p className="text-gray-300">
                Email: info@hijaukannegeri.id<br />
                Telepon: (021) 1234-5678
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 Hijaukan Negeri. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;