import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/InNavbar";
import { FaUsers, FaImage, FaParagraph, FaArrowLeft } from 'react-icons/fa';

const ManageCommunity = () => {
  const navigate = useNavigate();
  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [foto, setFoto] = useState(null);
  const [fotoPreview, setFotoPreview] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateCommunity = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');

      if (!token || !userData) {
        throw new Error('Silakan login terlebih dahulu');
      }

      const user = JSON.parse(userData);

      const formData = new FormData();
      formData.append('nama', nama);
      formData.append('deskripsi', deskripsi);
      if (foto) {
        formData.append('foto', foto);
      }
      formData.append('creator', user.id);

      const response = await fetch('http://localhost:5000/api/communities', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Gagal membuat komunitas');
      }
      
      setSuccessMessage('Komunitas berhasil dibuat!');
      setNama('');
      setDeskripsi('');
      setFoto(null);
      setFotoPreview(null);

      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) {
        fileInput.value = '';
      }

      // Redirect after success
      setTimeout(() => {
        navigate('/communities');
      }, 2000);

    } catch (err) {
      console.error('Error creating community:', err);
      setError(err.message || 'Terjadi kesalahan saat membuat komunitas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f4e9]">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-green-700 hover:text-green-800 mb-6 transition"
        >
          <FaArrowLeft className="mr-2" />
          Kembali
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-green-800 px-8 py-6">
            <h1 className="text-3xl font-bold text-white flex items-center">
              <FaUsers className="mr-3" />
              Buat Komunitas Baru
            </h1>
            <p className="text-green-100 mt-2">
              Bentuk komunitas untuk menggerakkan lebih banyak aksi peduli lingkungan
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 px-8 py-4 border-l-4 border-red-500">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="bg-green-50 text-green-600 px-8 py-4 border-l-4 border-green-500">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleCreateCommunity} className="p-8 space-y-6">
            <div className="space-y-6">
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <FaUsers className="mr-2 text-green-600" />
                  Nama Komunitas
                </label>
                <input
                  type="text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  placeholder="Contoh: Green Action USK"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <FaParagraph className="mr-2 text-green-600" />
                  Deskripsi Komunitas
                </label>
                <textarea
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  rows={6}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  placeholder="Tuliskan misi, kegiatan, atau tujuan komunitas Anda..."
                  required
                  disabled={loading}
                ></textarea>
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <FaImage className="mr-2 text-green-600" />
                  Foto Kegiatan
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFotoChange}
                  className="block w-full text-sm text-gray-500 
                    file:mr-4 file:py-3 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-green-50 file:text-green-700
                    hover:file:bg-green-100
                    cursor-pointer"
                  disabled={loading}
                />
                {fotoPreview && (
                  <div className="mt-4">
                    <img
                      src={fotoPreview}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end pt-6">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="mr-4 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                disabled={loading}
              >
                Batal
              </button>
              <button
                type="submit"
                className={`px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center justify-center space-x-2 ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Membuat Komunitas...</span>
                  </>
                ) : (
                  <span>Buat Komunitas</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ManageCommunity;