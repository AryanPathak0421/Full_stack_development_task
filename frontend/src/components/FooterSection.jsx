import React from "react";
import { FaTwitter, FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";

export default function FooterSection() {
  return (
    <footer className="w-full">

    
      <div
        className="w-full h-[320px] bg-cover bg-center flex flex-col items-center justify-center px-6 text-center"
        style={{
          backgroundImage: "url('/bgImage.png')", // PLACE YOUR IMAGE AS footer-bg.jpg in /public
        }}
      >
        <h2 className="text-white text-2xl md:text-3xl font-semibold max-w-3xl leading-relaxed">
          Learn more about our listing process, as well as our additional staging and design work.
        </h2>

        <button className="mt-6 px-8 py-2 bg-white text-gray-800 rounded shadow hover:bg-gray-100 transition font-medium">
          LEARN MORE
        </button>
      </div>

      {/* ========================= */}
      {/* BLUE NAVIGATION + SUBSCRIBE */}
      {/* ========================= */}
      <div className="w-full bg-blue-600 text-white py-6">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">

          {/* NAVIGATION ITEMS */}
          <div className="flex flex-wrap gap-6 text-sm font-medium">
            <a href="#" className="hover:opacity-80">Home</a>
            <a href="#" className="hover:opacity-80">Services</a>
            <a href="#" className="hover:opacity-80">Projects</a>
            <a href="#" className="hover:opacity-80">Testimonials</a>
            <a href="#" className="hover:opacity-80">Contact</a>
          </div>
            <p className="ml-52">Subscribe Us</p>
          {/* SUBSCRIBE FIELD */}
          <div className="flex bg-white rounded overflow-hidden shadow">
            <input
              type="email"
              placeholder="Enter Email Address"
              className="px-4 py-2  text-white bg-blue-700 outline-none w-48 md:w-64"
            />
            <button className="px-5 text-blue-700 ">
              Subscribe
            </button>
          </div>

        </div>
      </div>

      {/* ========================= */}
      {/* BOTTOM DARK FOOTER AREA */}
      {/* ========================= */}
      <div className="bg-[#1b1b1f] text-gray-300 py-6">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">

          {/* COPYRIGHT */}
          <p className="text-sm">© Real Trust 2023 — All Rights Reserved</p>

          {/* LOGO + SOCIALS */}
          <div className="flex items-center gap-6 mt-4 md:mt-0">

            {/* Logo */}
            <div className="flex items-center gap-2 mr-72">
              <div className="w-5 h-5 bg-white rounded-sm" />
              <span className="font-semibold text-white">Real Trust</span>
            </div>

            {/* Social icons */}
            <div className="flex gap-4 text-white text-2xl">
  <a href="#" className="hover:opacity-75">
    <FaTwitter />
  </a>
  <a href="#" className="hover:opacity-75">
    <FaInstagram />
  </a>
  <a href="#" className="hover:opacity-75">
    <FaYoutube />
  </a>
  <a href="#" className="hover:opacity-75">
    <FaLinkedin />
  </a>
</div>

          </div>

        </div>
      </div>

    </footer>
  );
}
