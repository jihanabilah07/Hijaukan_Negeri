import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getProfile, updateProfile, changePassword } from '../api';
import Navbar from "../components/InNavbar";
import axios from 'axios';
import { FaUser, FaEnvelope, FaLock, FaEdit, FaCamera, FaPlus, FaMapMarkerAlt } from 'react-icons/fa';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Form states
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Fetch user profile and posts
  useEffect(() => {
    let isSubscribed = true;

    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await getProfile();
        if (response.data && response.data.user && isSubscribed) {
          setUser(response.data.user);
          setFormData({
            nama: response.data.user.nama || '',
            email: response.data.user.email || '',
          });
        }

        if (isSubscribed) {
          await refreshPosts();
          setLoading(false);
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        if (isSubscribed) {
          setError(err.response?.data?.message || 'Gagal memuat profil');
          setLoading(false);
        }
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      }
    };

    fetchProfileData();

    const pollInterval = setInterval(() => {
      if (isSubscribed) {
        refreshPosts();
      }
    }, 5000);

    return () => {
      isSubscribed = false;
      clearInterval(pollInterval);
    };
  }, [navigate]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await updateProfile(formData);
      if (response.data && response.data.user) {
        setUser(response.data.user);
        setSuccessMessage('Profil berhasil diperbarui');
        setIsEditing(false);
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal memperbarui profil');
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError(null);
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('Password baru dan konfirmasi password tidak cocok');
      return;
    }

    try {
      const response = await changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      
      if (response.data) {
        setSuccessMessage('Password berhasil diubah');
        setIsChangingPassword(false);
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal mengubah password');
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    }
  };

  const refreshPosts = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      const response = await axios({
        method: 'GET',
        url: 'http://localhost:5000/api/posts/user/me',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200 && Array.isArray(response.data)) {
        setPosts(response.data);
      }
    } catch (error) {
      console.error('Error refreshing posts:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f4e9]">
        <Navbar />
        <div className="container mx-auto p-6">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-900 mx-auto"></div>
              <p className="mt-4 text-gray-600 text-lg">Memuat data profil...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f4e9]">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="bg-green-800 px-8 py-12 relative">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="relative flex items-center">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-green-800 text-4xl shadow-lg">
                <FaUser />
              </div>
              <div className="ml-6">
                <h1 className="text-3xl font-bold text-white mb-2">{user?.nama}</h1>
                <p className="text-green-100 flex items-center">
                  <FaEnvelope className="mr-2" />
                  {user?.email}
                </p>
              </div>
            </div>
          </div>

          {/* Notifications */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 m-4">
              <div className="flex items-center">
                <div className="flex-shrink-0 text-red-500">
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
                <button onClick={() => setError(null)} className="ml-auto text-red-700 hover:text-red-900">
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {successMessage && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 m-4">
              <div className="flex items-center">
                <div className="flex-shrink-0 text-green-500">
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">{successMessage}</p>
                </div>
                <button onClick={() => setSuccessMessage('')} className="ml-auto text-green-700 hover:text-green-900">
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Profile Actions */}
          <div className="p-8">
            <div className="flex flex-wrap gap-4 mb-8">
              <button
                onClick={() => {
                  setIsEditing(true);
                  setIsChangingPassword(false);
                }}
                className={`flex items-center px-6 py-3 rounded-lg transition-all ${
                  isEditing
                    ? 'bg-green-100 text-green-800 font-semibold'
                    : 'bg-white border-2 border-green-600 text-green-600 hover:bg-green-50'
                }`}
              >
                <FaEdit className="mr-2" />
                Edit Profil
              </button>
              <button
                onClick={() => {
                  setIsChangingPassword(true);
                  setIsEditing(false);
                }}
                className={`flex items-center px-6 py-3 rounded-lg transition-all ${
                  isChangingPassword
                    ? 'bg-blue-100 text-blue-800 font-semibold'
                    : 'bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50'
                }`}
              >
                <FaLock className="mr-2" />
                Ubah Password
              </button>
            </div>

            {/* Edit Profile Form */}
            {isEditing && (
              <form onSubmit={handleUpdateProfile} className="max-w-lg space-y-6">
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <FaUser className="mr-2 text-green-600" />
                    Nama
                  </label>
                  <input
                    type="text"
                    value={formData.nama}
                    onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                    required
                  />
                </div>
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <FaEnvelope className="mr-2 text-green-600" />
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                    required
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center"
                  >
                    <FaEdit className="mr-2" />
                    Simpan Perubahan
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                  >
                    Batal
                  </button>
                </div>
              </form>
            )}

            {/* Change Password Form */}
            {isChangingPassword && (
              <form onSubmit={handleChangePassword} className="max-w-lg space-y-6">
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <FaLock className="mr-2 text-blue-600" />
                    Password Saat Ini
                  </label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    required
                  />
                </div>
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <FaLock className="mr-2 text-blue-600" />
                    Password Baru
                  </label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    required
                  />
                </div>
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <FaLock className="mr-2 text-blue-600" />
                    Konfirmasi Password Baru
                  </label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    required
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center"
                  >
                    <FaLock className="mr-2" />
                    Ubah Password
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsChangingPassword(false);
                      setPasswordData({
                        currentPassword: '',
                        newPassword: '',
                        confirmPassword: '',
                      });
                    }}
                    className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                  >
                    Batal
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Posts Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-8 py-6 bg-green-800 text-white flex justify-between items-center">
            <h2 className="text-2xl font-bold">Postingan Saya</h2>
            <Link
              to="/create"
              className="flex items-center bg-white text-green-800 px-4 py-2 rounded-lg hover:bg-green-50 transition"
            >
              <FaPlus className="mr-2" />
              Buat Postingan
            </Link>
          </div>

          <div className="p-8">
            {posts.length === 0 ? (
              <div className="text-center py-12">
                <FaCamera className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600 text-lg mb-4">Belum ada postingan</p>
                <Link
                  to="/create"
                  className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  <FaPlus className="mr-2" />
                  Buat Postingan Pertama
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <Link
                    to={`/post/${post._id}`}
                    key={post._id}
                    className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all transform hover:scale-105"
                  >
                    {post.image ? (
                      <div className="relative h-48">
                        <img
                          src={`http://localhost:5000${post.image}`}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                      </div>
                    ) : (
                      <div className="h-48 bg-gray-100 flex items-center justify-center">
                        <FaCamera className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="font-semibold text-lg text-gray-800 mb-2 group-hover:text-green-600 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {post.description}
                      </p>
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="flex items-center">
                          <FaMapMarkerAlt className="mr-1" />
                          {post.location}
                        </span>
                        <span className="mx-2">•</span>
                        <span>{new Date(post.date).toLocaleDateString('id-ID')}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
