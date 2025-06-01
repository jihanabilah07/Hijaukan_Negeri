// src/pages/TempatKonservasi.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { getConservationPlaces } from '../api';
import Navbar from "../components/OutNavbar";

const TempatKonservasi = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await getConservationPlaces();
        setPlaces(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Gagal memuat data tempat konservasi');
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Aktif':
        return 'bg-green-100 text-green-800';
      case 'Dalam Pemeliharaan':
        return 'bg-yellow-100 text-yellow-800';
      case 'Ditutup':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredPlaces = places.filter(place => {
    const matchesSearch = place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         place.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || place.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "#f7f4e9" }}>
        <Navbar />
        <div className="container mx-auto p-6">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Memuat data tempat konservasi...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f7f4e9" }}>
      <Navbar />
      
      <div className="container mx-auto p-6 relative">
        <Link
          to="/"
          className="absolute top-4 left-4 flex items-center text-green-900 hover:underline z-10 bg-white px-3 py-1 rounded-full shadow-md"
        >
          <FaArrowLeft className="mr-2" />
          Kembali
        </Link>

        <h1 className="text-3xl font-bold text-green-900 mb-6 mt-8">Tempat Konservasi</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Cari berdasarkan nama atau lokasi..."
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full md:w-48">
            <select
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">Semua Status</option>
              <option value="Aktif">Aktif</option>
              <option value="Dalam Pemeliharaan">Dalam Pemeliharaan</option>
              <option value="Ditutup">Ditutup</option>
            </select>
          </div>
        </div>

        {/* Conservation Places Grid */}
        {filteredPlaces.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">Tidak ada tempat konservasi yang ditemukan.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlaces.map((place) => (
              <div
                key={place._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-semibold text-green-800">{place.name}</h2>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(place.status)}`}>
                      {place.status}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{place.location}</p>
                  <div className="text-gray-600 text-sm">
                    <p>Koordinat: {place.coordinates.latitude}, {place.coordinates.longitude}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TempatKonservasi;
