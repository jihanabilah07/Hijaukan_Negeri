import React, { useState } from "react";
import { FaSignInAlt, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import registrasiImage from "../assets/Register.jpg";

const Register = () => {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Menambahkan validasi email (format email)
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      alert("Email tidak valid.");
      return;
    }

    console.log("Form data:", formData); // Cek data yang dikirim
    
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nama: formData.nama,
          email: formData.email,
          password: formData.password,
        }),
      });
  
      const data = await response.json();
      console.log("Response from server:", data); // Cek respons dari server
  
      if (response.ok) {
        alert("Registrasi berhasil! Silakan login.");
        window.location.href = "/login";
      } else {
        alert(data.message || "Terjadi kesalahan saat registrasi");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Gagal menghubungi server.");
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

      {/* Gambar sisi kiri */}
      <div className="hidden md:block">
        <img
          src={registrasiImage}
          alt="Ilustrasi Registrasi"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Form sisi kanan */}
      <div className="bg-yellow-50 flex items-center justify-center">
        <form onSubmit={handleSubmit} className="w-full max-w-md p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Silahkan Daftar!
          </h2>

          <label className="block mb-2">Nama*</label>
          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            className="w-full p-2 mb-4 border border-gray-400 rounded"
            required
          />

          <label className="block mb-2">Email*</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 mb-4 border border-gray-400 rounded"
            required
          />

          <label className="block mb-2">Password*</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 mb-6 border border-gray-400 rounded"
            required
          />

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-green-900 hover:bg-green-800 text-white py-2 rounded"
          >
            <FaSignInAlt />
            Daftar
          </button>

          <p className="mt-4 text-center text-sm text-gray-700">
            Sudah punya akun?{" "}
            <Link
              to="/login"
              className="text-green-900 hover:underline font-semibold"
            >
              Masuk
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
