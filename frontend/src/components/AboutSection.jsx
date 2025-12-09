// frontend/src/components/AboutSection.jsx
import React from "react";

export default function AboutSection() {
  return (
    <section className="py-16 bg-white relative">
      {/* subtle background decorations (circles, squares) */}
      <div className="absolute -left-10 top-10 w-40 h-40 bg-sky-50 rounded-full opacity-40 -z-10"></div>
      <div className="absolute right-8 top-6 w-24 h-24 bg-sky-50 rounded opacity-30 -z-10"></div>
      <div className="absolute left-1/2 -translate-x-1/2 bottom-6 w-32 h-32 bg-sky-50 rounded-full opacity-20 -z-10"></div>

      <div className="max-w-4xl mx-auto px-6">
        {/* small thumbnail row (decorative) */}
        <div className="flex items-center justify-center gap-6 mb-8">
          {/* Decorative square 1 */}
          {/* <div className="w-20 h-20 md:w-24 md:h-24 bg-white border rounded-sm shadow-sm flex items-center justify-center">
            <div className="w-12 h-12 bg-sky-100 rounded-sm" />
          </div> */}

          {/* Decorative tall rectangle
          <div className="w-28 h-28 md:w-32 md:h-32 bg-white border rounded shadow-sm flex items-center justify-center">
            <div className="w-16 h-16 bg-sky-100 rounded-sm" />
          </div> */}

          {/* Decorative square 2 */}
          {/* <div className="w-20 h-20 md:w-24 md:h-24 bg-white border rounded-sm shadow-sm flex items-center justify-center">
            <div className="w-12 h-12 bg-sky-100 rounded-sm" />
          </div> */}
        </div>

        {/* About heading */}
        <div className="text-center">
          <h3 className="text-sky-700 font-semibold text-base uppercase tracking-widest mb-2">
            About Us
          </h3>

          <p className="mx-auto max-w-2xl text-gray-600 text-sm md:text-base leading-relaxed mb-6">
            We bring years of experience in real estate, staging and marketing to help
            clients present properties that sell faster and for higher value. Our
            team combines beautiful design, strategic pricing and targeted promotion
            to deliver measurable results while keeping the process simple and
            professional.
          </p>

          <button
            className="inline-flex items-center gap-2 px-6 py-2 border border-sky-600 text-sky-600 rounded hover:bg-sky-50 transition"
            onClick={() => {
              const el = document.querySelector("#projects");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}
