import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaSearch } from 'react-icons/fa';
import Navbar from '../components/OutNavbar';

const AllCommunities = () => {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/communities');
        if (!response.ok) {
          throw new Error('Gagal mengambil komunitas');
        }
        const data = await response.json();
        setCommunities(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCommunities();
  }, []);

  // Filter communities based on search term
  const filteredCommunities = communities.filter(community =>
    community.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    community.deskripsi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f7f4e9] font-sans">
      <Navbar />
      <div className="relative px-8 md:px-24 py-16 text-[#103f2b]">
        <Link
          to="/"
          className="absolute top-4 left-4 flex items-center text-green-900 hover:underline z-10 bg-white px-3 py-1 rounded-full shadow-md"
        >
          <FaArrowLeft className="mr-2" />
          Kembali
        </Link>

        <h2 className="text-2xl md:text-3xl font-bold mt-8">
          Semua Komunitas Konservasi
        </h2>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto my-8">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari komunitas berdasarkan nama atau deskripsi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
            />
          </div>
        </div>

        {loading ? (
          <p className="text-center">Memuat komunitas...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : filteredCommunities.length === 0 ? (
          <p className="text-center">
            {searchTerm ? 'Tidak ada komunitas yang sesuai dengan pencarian.' : 'Belum ada komunitas tersedia.'}
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {filteredCommunities.map((community) => (
              <Link
                to={`/community/${community._id}`}
                key={community._id}
                className="border p-6 rounded-lg shadow hover:shadow-lg transition bg-white"
              >
                {community.foto && (
                  <img
                    src={`http://localhost:5000${community.foto}`}
                    alt={community.nama}
                    className="w-full aspect-[16/9] object-contain rounded mb-4"
                  />
                )}
                <h3 className="text-xl font-semibold mb-2">{community.nama}</h3>
                <p className="text-sm">
                  {community.deskripsi.length > 100
                    ? `${community.deskripsi.substring(0, 100)}...`
                    : community.deskripsi}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCommunities;