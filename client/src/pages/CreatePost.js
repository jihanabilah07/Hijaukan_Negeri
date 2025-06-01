import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/InNavbar";
import { FaImage, FaMapMarkerAlt, FaCalendarAlt, FaHeading, FaParagraph } from 'react-icons/fa';

const CreatePost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("date", date);
    formData.append("location", location);
    formData.append("description", description);
    if (image) formData.append("image", image);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Gagal membuat postingan");
      }

      alert("Postingan berhasil dibuat!");
      navigate('/profile');
    } catch (err) {
      console.error("Error submitting post:", err);
      setError(err.message);
      if (err.message.includes('Token')) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f4e9]">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-green-800 px-8 py-6">
            <h1 className="text-3xl font-bold text-white">
              Buat Postingan Baru
            </h1>
            <p className="text-green-100 mt-2">
              Bagikan pengalaman dan kegiatan penanaman pohon Anda
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 px-8 py-4 border-l-4 border-red-500">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <FaHeading className="mr-2 text-green-600" />
                    Judul Kegiatan
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                    placeholder="Masukkan judul kegiatan"
                    required
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <FaCalendarAlt className="mr-2 text-green-600" />
                    Tanggal Kegiatan
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                    required
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <FaMapMarkerAlt className="mr-2 text-green-600" />
                    Tempat Kegiatan
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                    placeholder="Masukkan lokasi kegiatan"
                    required
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <FaImage className="mr-2 text-green-600" />
                    Foto Kegiatan
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block w-full text-sm text-gray-500 
                      file:mr-4 file:py-3 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-green-50 file:text-green-700
                      hover:file:bg-green-100
                      cursor-pointer"
                    disabled={loading}
                  />
                  {imagePreview && (
                    <div className="mt-4">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <FaParagraph className="mr-2 text-green-600" />
                  Isi Kegiatan
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={12}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  placeholder="Jelaskan detail kegiatan atau artikel Anda..."
                  required
                  disabled={loading}
                ></textarea>
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
                    <span>Memposting...</span>
                  </>
                ) : (
                  <span>Posting Kegiatan</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;