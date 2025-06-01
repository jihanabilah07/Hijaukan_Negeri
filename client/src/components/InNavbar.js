// src/components/Navbar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { label: "Beranda", path: "/home" },
    { label: "Buat Postingan", path: "/create" },
    { label: "Kelola Komunitas", path: "/manage-community" },
    { label: "Profil", path: "/profile" },
  ];

  return (
    <nav className="bg-green-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Hijaukan Negeri</h1>
        <div className="flex items-center space-x-4">
          <ul className="flex space-x-4">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`px-4 py-2 rounded-full transition-all duration-300 ${
                      isActive
                        ? "bg-white text-green-900 font-semibold shadow"
                        : "hover:bg-white hover:text-green-900"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            to="/"
            title="Logout"
            className="p-2 rounded-full bg-white text-green-900 hover:bg-gray-100 transition"
          >
            <FiLogOut size={20} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
