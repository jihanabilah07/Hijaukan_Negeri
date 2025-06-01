import React, { useState } from "react";
import { FaSignInAlt, FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import registrasiImage from "../assets/Register.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Reset error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validasi input
    if (!formData.email || !formData.password) {
      setError("Email dan password harus diisi");
      setLoading(false);
      return;
    }

    try {
      // Kirim request ke API login
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      // Simpan token dan data user ke localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Redirect ke halaman home
      navigate("/home");
    } catch (err) {
      // Tangani error dari API
      setError(err.response?.data?.message || "Terjadi kesalahan saat login");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 relative">
      {/* Tombol kembali */}
      <Link
        to="/"
        className="absolute top-4 left-4 flex items-center text-green-900 hover:underline z-10 bg-white px-3 py-1 rounded-full shadow-md"
      >
        <FaArrowLeft className="mr-2" />
        Kembali
      </Link>

      {/* Gambar di sisi kiri */}
      <div className="hidden md:block">
        <img
          src={registrasiImage}
          alt="Ilustrasi Masuk"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Form login */}
      <div className="bg-yellow-50 flex items-center justify-center px-6">
        <form onSubmit={handleSubmit} className="w-full max-w-md p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Selamat datang! Silahkan masuk ke akun kamu
          </h2>

          {error && (
            <div className="mb-4 text-red-600 text-sm bg-red-50 p-3 rounded-md border border-red-200">
              {error}
            </div>
          )}

          <label className="block mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            required
            disabled={loading}
          />

          <label className="block mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-6 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            required
            disabled={loading}
          />

          <button
            type="submit"
            className={`w-full bg-green-900 text-white py-2 rounded-md flex items-center justify-center gap-2 hover:bg-green-800 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                <FaSignInAlt />
                Masuk
              </>
            )}
          </button>

          <p className="text-center mt-4 text-sm text-gray-700">
            Belum punya akun?{" "}
            <Link
              to="/register"
              className="text-green-900 hover:underline font-semibold"
            >
              Daftar
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;