import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Landing from "./pages/Landing";
import Admin from "./pages/Admin";

export default function App() {
  return (
    <Router>
      {/* NAVBAR */}
      <nav className="w-full bg-white shadow py-4 px-6 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-700">
          RealTrust
        </Link>

        {/* Menu Items */}
        <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <Link to="/" className="hover:text-blue-600 transition">HOME</Link>

          <a href="#services" className="hover:text-blue-600 transition">
            SERVICES
          </a>

          <a href="#about" className="hover:text-blue-600 transition">
            ABOUT PRODUCTS
          </a>

          <a href="#testimonials" className="hover:text-blue-600 transition">
            TESTIMONIALS
          </a>

          {/* Contact Button */}
          <a
            href="#contact"
            className="px-4 py-2 bg-orange-500 text-white rounded-md shadow hover:bg-orange-600 transition"
          >
            CONTACT
          </a>

          {/* Admin Panel Link */}
          <Link
            to="/admin"
            className="ml-4 text-sm text-gray-600 hover:text-blue-600"
          >
            ADMIN PANEL
          </Link>
        </div>
      </nav>

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}
