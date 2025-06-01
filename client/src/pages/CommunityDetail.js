import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const CommunityDetail = () => {
  const { id } = useParams();
  const [community, setCommunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCommunity = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/communities/${id}`);
        if (!response.ok) throw new Error('Gagal mengambil detail komunitas');
        const data = await response.json();
        setCommunity(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchCommunity();
  }, [id]);

  return (
    <div className="min-h-screen bg-[#f7f4e9] font-sans">
      <div className="relative container mx-auto px-8 md:px-24 py-16">
        <Link
          to="/communities"
          className="absolute top-4 left-4 flex items-center text-green-900 hover:underline z-10 bg-white px-3 py-1 rounded-full shadow-md"
        >
          <FaArrowLeft className="mr-2" />
          Kembali
        </Link>

        <h2 className="text-2xl md:text-3xl font-bold mt-8">Detail Komunitas</h2>
        {loading ? (
          <p className="text-center">Memuat detail komunitas...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : !community ? (
          <p className="text-center">Komunitas tidak ditemukan.</p>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6 mt-4">
            <h3 className="text-2xl font-semibold mb-4">{community.nama}</h3>
            {community.foto && (
              <img
                src={`http://localhost:5000${community.foto}`}
                alt={community.nama}
                className="w-full object-contain max-h-[80vh] rounded mb-4"
              />
            )}
            <p className="text-gray-700">{community.deskripsi}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityDetail;