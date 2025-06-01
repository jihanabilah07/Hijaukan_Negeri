import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaSearch } from 'react-icons/fa';
import Navbar from '../components/OutNavbar';

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/posts');
        if (!response.ok) {
          throw new Error('Gagal mengambil postingan');
        }
        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts based on search term
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f7f4e9] font-sans">
      <Navbar />
      <div className="relative px-8 md:px-24 py-16 text-black">
        <Link
          to="/"
          className="absolute top-4 left-4 flex items-center text-green-900 hover:underline z-10 bg-white px-3 py-1 rounded-full shadow-md"
        >
          <FaArrowLeft className="mr-2" />
          Kembali
        </Link>
        
        <h2 className="text-2xl md:text-3xl font-bold mt-8">
          Semua Postingan Kegiatan
        </h2>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto my-8">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari postingan berdasarkan judul, deskripsi, atau lokasi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
            />
          </div>
        </div>

        {loading ? (
          <p className="text-center">Memuat postingan...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : filteredPosts.length === 0 ? (
          <p className="text-center">
            {searchTerm ? 'Tidak ada postingan yang sesuai dengan pencarian.' : 'Belum ada postingan tersedia.'}
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Link
                to={`/post/${post._id}`}
                key={post._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:bg-gray-100 transition"
              >
                {post.image && (
                  <img
                    src={`http://localhost:5000${post.image}`}
                    alt={post.title}
                    className="w-full aspect-[16/9] object-contain"
                  />
                )}
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{post.title}</h3>
                  <p className="text-sm text-gray-600">
                    {post.description.length > 100
                      ? `${post.description.substring(0, 100)}...`
                      : post.description}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    {new Date(post.date).toLocaleDateString('id-ID')} - {post.location}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllPosts;