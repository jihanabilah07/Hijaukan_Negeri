import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getConservationPlace } from '../api';
import Navbar from "../components/InNavbar";

const ConservationDetail = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const response = await getConservationPlace(id);
        setPlace(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Gagal memuat detail tempat konservasi');
        setLoading(false);
      }
    };

    fetchPlace();
  }, [id]);

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

  if (loading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "#f7f4e9" }}>
        <Navbar />
        <div className="container mx-auto p-6">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Memuat detail tempat konservasi...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "#f7f4e9" }}>
        <Navbar />
        <div className="container mx-auto p-6">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      </div>
    );
  }

  if (!place) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "#f7f4e9" }}>
        <Navbar />
        <div className="container mx-auto p-6">
          <div className="text-center py-12">
            <p className="text-gray-600">Tempat konservasi tidak ditemukan</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f7f4e9" }}>
      <Navbar />
      
      <div className="container mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Image Section */}
          <div className="relative h-96">
            {place.image ? (
              <img
                src={`http://localhost:5000${place.image}`}
                alt={place.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">Tidak ada gambar</span>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-bold text-green-900">{place.name}</h1>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(place.status)}`}>
                {place.status}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-semibold text-green-800 mb-2">Informasi Umum</h2>
                <div className="space-y-2">
                  <p className="text-gray-600">
                    <span className="font-medium">Lokasi:</span> {place.location}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Luas Area:</span> {place.area} hektar
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Koordinat:</span>{' '}
                    {place.coordinates.latitude}, {place.coordinates.longitude}
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-green-800 mb-2">Jenis Tanaman</h2>
                <div className="flex flex-wrap gap-2">
                  {place.plantTypes.map((plant, index) => (
                    <span
                      key={index}
                      className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                    >
                      {plant}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold text-green-800 mb-2">Deskripsi</h2>
              <p className="text-gray-600 whitespace-pre-line">{place.description}</p>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold text-green-800 mb-2">Informasi Tambahan</h2>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                <p>
                  <span className="font-medium">Dibuat pada:</span>{' '}
                  {new Date(place.createdAt).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <p>
                  <span className="font-medium">Terakhir diperbarui:</span>{' '}
                  {new Date(place.updatedAt).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConservationDetail; 