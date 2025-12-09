// frontend/src/pages/Landing.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

import ProjectCard from "../components/ProjectCard";
import ClientCard from "../components/ClientCard";
import ContactForm from "../components/ContactForm";
import Newsletter from "../components/Newsletter";
import AboutSection from "../components/AboutSection";
import HappyClients from "../components/HappyClients";
import OurProjects from "../components/OurProjects";
import FooterSection from "../components/FooterSection";


const API = import.meta.env.VITE_API_URL || "";

export default function Landing() {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);


  useEffect(() => {
    // defensive: only call if API is set
    if (!API) {
      console.warn("VITE_API_URL not set — API calls will fail.");
      return;
    }

    axios
      .get(`${API}/api/projects`)
      .then((res) => setProjects(res.data || []))
      .catch((err) => {
        console.error("Failed to load projects:", err.message || err);
        setProjects([]);
      });

    axios
      .get(`${API}/api/clients`)
      .then((res) => setClients(res.data || []))
      .catch((err) => {
        console.error("Failed to load clients:", err.message || err);
        setClients([]);
      });
  }, []);

  return (
    <div className="landing-page">

      {/* HERO */}
      <section
        className="w-full h-[600px] bg-cover bg-center relative flex items-center"
        style={{
          backgroundImage: "url('/2.jpg')", // put 1.png in frontend/public/
        }}
      >
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative container mx-auto px-6 flex justify-between items-center">
          {/* Left */}
          <div className="text-white max-w-xl">
            <h1 className="text-5xl font-bold leading-tight mb-7 ml-4">

              Consultation, <br /> Design & Marketing
            </h1>
            <p className="text-lg opacity-90">
              Helping you plan, design and market your property professionally.
            </p>
          </div>

         {/* Right form */}
<div className="bg-[#4B5A87] p-8 w-[340px] rounded-lg shadow-xl text-center">

  {/* Heading */}
  <h3 className="text-2xl font-bold text-white mb-6">
    Get a Free Consultation
  </h3>

  <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>

    <input
      className="w-full px-4 py-3 rounded-lg bg-transparent border border-white text-white placeholder-white focus:outline-none focus:border-orange-400"
      placeholder="Full Name"
    />

    <input
      className="w-full px-4 py-3 rounded-lg bg-transparent border border-white text-white placeholder-white focus:outline-none focus:border-orange-400"
      placeholder="Enter Email Address"
    />

    <input
      className="w-full px-4 py-3 rounded-lg bg-transparent border border-white text-white placeholder-white focus:outline-none focus:border-orange-400"
      placeholder="Mobile Number"
    />

    <input
      className="w-full px-4 py-3 rounded-lg bg-transparent border border-white text-white placeholder-white focus:outline-none focus:border-orange-400"
      placeholder="Area, City"
    />

    {/* Button */}
    <button
      type="submit"
      className="w-full py-3 mt-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition"
    >
      Get Quick Quote
    </button>
  </form>
</div>

        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="container mx-auto px-6">

        {/* Not Your Average Realtor (intro) */}
        <section className="mt-12 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold text-blue-700 mb-3">Not Your Average Realtor</h2>
            <p className="text-gray-600">
              We blend design, marketing and deep property knowledge to create listings that
              attract the right buyers. Our team helps clients stage, price and present homes
              for faster sales and better returns.
            </p>
          </div>

         <div className="flex flex-col items-center gap-6 md:gap-8">

  {/* Big center circle */}
 <div className="w-28 h-28 md:w-36 md:h-36 lg:w-46   lg:h-42 rounded-full overflow-hidden shadow-md">
      <img src="/6.png" alt="small1" className="w-full h-full object-cover" />
    </div>

  {/* Two small circles row */}
  <div className="flex items-center gap-6 md:gap-8">

    {/* Small circle 1 */}
    

     <div className="w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden shadow-lg">
    <img src="/5.png" alt="main" className="w-full h-full object-cover" />
  </div>


    {/* Small circle 2 */}
    <div className="w-28 h-28 md:w-40 md:h-40 lg:w-56 lg:h-56 rounded-full overflow-hidden shadow-md">
      <img src="/7.png" alt="small2" className="w-full h-full object-cover" />
    </div>

  </div>

</div>

        </section>

        {/* Why Choose Us */}
        <section className="mt-20 text-center">
  {/* Section Heading */}
  <h3 className="text-3xl font-bold text-sky-700">Why Choose Us?</h3>

  {/* Cards */}
  <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">

    {/* CARD 1 */}
    <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
      {/* Icon circle */}
      <div className="w-16 h-16 mx-auto rounded-full bg-sky-50 border border-sky-200 flex items-center justify-center mb-5">
        <img 
  src="/8x.png" 
  alt="icon" 
  className="w-8 h-8 object-contain"
/>

      </div>

      <h4 className="text-xl font-semibold text-sky-700">Potential ROI</h4>
      <p className="text-gray-600 text-sm mt-3">
        Staging and marketing strategies crafted to maximize your selling price.
      </p>
    </div>

    {/* CARD 2 */}
    <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
      <div className="w-16 h-16 mx-auto rounded-full bg-sky-50 border border-sky-200 flex items-center justify-center mb-5">
        <img 
  src="/9.png" 
  alt="icon" 
  className="w-8 h-8 object-contain"
/>

      </div>

      <h4 className="text-xl font-semibold text-sky-700">Design</h4>
      <p className="text-gray-600 text-sm mt-3">
        High-quality staging and visuals to highlight your property’s best features.
      </p>
    </div>

    {/* CARD 3 */}
    <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
      <div className="w-16 h-16 mx-auto rounded-full bg-sky-50 border border-sky-200 flex items-center justify-center mb-5">
       <img 
  src="/10.png" 
  alt="icon" 
  className="w-8 h-8 object-contain"
/>

      </div>

      <h4 className="text-xl font-semibold text-sky-700">Marketing</h4>
      <p className="text-gray-600 text-sm mt-3">
        Strategic digital campaigns designed to reach motivated, qualified buyers.
      </p>
    </div>

  </div>
  <section className="relative w-full py-20 flex justify-center items-center overflow-hidden">
  
  {/* Background decorative shapes */}
  <div className="absolute top-10 left-20 w-60 h-60 bg-blue-100 rounded-full opacity-40 -z-10"></div>
  <div className="absolute bottom-10 right-32 w-48 h-48 bg-orange-100 rounded-full opacity-40 -z-10"></div>

  {/* THE IMAGE YOU PROVIDED */}
  <img
    src="/13.jpg"
    alt="Real estate collage"
    className="max-w-5xl w-full px-6"
  />
  

</section>
<AboutSection />


</section>









        {/* Projects */}
        <section className="mt-12">
          
          <OurProjects />
        </section>

        {/* Clients / Testimonials */}
        <section id="testimonials" className="mt-12">
          
           <HappyClients />
        </section>
       

       

        {/* Newsletter */}
        <section className="mt-12 mb-24">
         <FooterSection />
        </section>
      </main>
    </div>
  );
}

