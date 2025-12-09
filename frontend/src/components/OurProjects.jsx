// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const API = import.meta.env.VITE_API_URL || "";

// /**
//  * OurProjects
//  * - Props: optional `projects` array to pass pre-fetched projects.
//  * - If no props provided, component fetches from `${API}/api/projects`.
//  */
// export default function OurProjects({ projects: projectsProp }) {
//   const [projects, setProjects] = useState(projectsProp || []);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (projectsProp && projectsProp.length) return; // use provided
//     if (!API) return; // nothing to fetch in dev if no API
//     setLoading(true);
//     axios
//       .get(`${API}/api/projects`)
//       .then((res) => setProjects(res.data || []))
//       .catch((err) => {
//         console.error("Failed to load projects:", err);
//         setProjects([]);
//       })
//       .finally(() => setLoading(false));
//   }, [projectsProp]);

//   // fallback demo projects (so section is visible without backend)
//   const fallback = [
//     {
//       _id: "p1",
//       name: "Consultation",
//       description: "Project name / location",
//       imageUrl: "" // replace with real image if desired
//     },
//     {
//       _id: "p2",
//       name: "Design",
//       description: "Project name / location",
//       imageUrl: ""
//     },
//     {
//       _id: "p3",
//       name: "Marketing & Design",
//       description: "Project name / location",
//       imageUrl: ""
//     },
//     {
//       _id: "p4",
//       name: "Consultation & Marketing",
//       description: "Project name / location",
//       imageUrl: ""
//     },
//     {
//       _id: "p5",
//       name: "Consultation",
//       description: "Project name / location",
//       imageUrl: ""
//     }
//   ];

//   const list = projects && projects.length ? projects : fallback;

//   return (
//     <section id="projects" className="py-16 bg-white">
//       <div className="max-w-6xl mx-auto px-6">
//         {/* Heading */}
//         <div className="text-center mb-8">
//           <h2 className="text-3xl font-bold text-sky-700">Our Projects</h2>
//           <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
//             We know what buyers are looking for and suggest projects that will
//             bring clients top dollar for the sale of their homes.
//           </p>
//         </div>

//         {loading ? (
//           <p className="text-center text-gray-500">Loading projects...</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
//             {list.map((p) => (
//               <div
//                 key={p._id}
//                 className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition flex flex-col"
//               >
//                 {/* Image area */}
//                 <div className="w-full h-40 bg-gray-100">
//                   {p.imageUrl ? (
//                     // expects imageUrl like "/uploads/xxx.jpg" (served by backend)
//                     <img
//                       src={API ? `${API}${p.imageUrl}` : p.imageUrl}
//                       alt={p.name}
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     // placeholder area
//                     <div className="w-full h-full flex items-center justify-center text-gray-400">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="w-12 h-12"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M8 3h8l1 4H7l1-4z" />
//                       </svg>
//                     </div>
//                   )}
//                 </div>

//                 {/* Content */}
//                 <div className="p-4 flex-1 flex flex-col justify-between">
//                   <div>
//                     <h3 className="text-lg font-semibold text-sky-700">{p.name}</h3>
//                     <p className="text-sm text-gray-500 mt-2">{p.description}</p>
//                   </div>

//                   <div className="mt-4">
//                     <button
//                       type="button"
//                       className="inline-block px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition text-sm"
//                     >
//                       Read More
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* decorative dot / small connector like reference */}
//         <div className="mt-8 flex items-center justify-start">
//           <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
//         </div>
//       </div>
//     </section>
//   );
// }


import React, { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || ""; // e.g. "http://localhost:5000" or ""

export default function OurProjects({ projects: projectsProp }) {
  const [projects, setProjects] = useState(projectsProp || []);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (projectsProp && projectsProp.length) return; // use provided
    if (!API) return; // nothing to fetch in dev if no API

    const source = axios.CancelToken.source();
    setLoading(true);

    axios
      .get(`${API}/api/projects`, { cancelToken: source.token })
      .then((res) => setProjects(Array.isArray(res.data) ? res.data : []))
      .catch((err) => {
        if (!axios.isCancel(err)) {
          console.error("Failed to load projects:", err);
          setProjects([]);
        }
      })
      .finally(() => setLoading(false));

    return () => source.cancel("OurProjects unmounted");
  }, [projectsProp]);

  // fallback demo projects (so section is visible without backend)
  const fallback = [
    {
      _id: "p1",
      name: "Consultation",
      description: "Project name / location",
      imageUrl: "/project5.png" // example public image
    },
    {
      _id: "p2",
      name: "Design",
      description: "Project name / location",
      imageUrl: "/project1.png"
    },
    {
      _id: "p3",
      name: "Marketing & Design",
      description: "Project name / location",
      imageUrl: "/project4.png"
    },
    {
      _id: "p4",
      name: "Consultation & Marketing",
      description: "Project name / location",
      imageUrl: "/project3.png"
    },
    {
      _id: "p5",
      name: "Consultation",
      description: "Project name / location",
      imageUrl: "/project2.png"
    }
  ];

  const list = projects && projects.length ? projects : fallback;

  // decide final src for an image entry
  const resolveImageSrc = (imageUrl) => {
    if (!imageUrl) return null;
    if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://") || imageUrl.startsWith("/")) {
      return imageUrl;
    }
    if (!API) return imageUrl;
    return `${API.replace(/\/$/, "")}/${imageUrl.replace(/^\//, "")}`;
  };

  return (
    <section id="projects" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-sky-700">Our Projects</h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            We know what buyers are looking for and suggest projects that will
            bring clients top dollar for the sale of their homes.
          </p>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading projects...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {list.map((p) => {
              const imgSrc = resolveImageSrc(p.imageUrl || "");
              return (
                <div
                  key={p._id}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition flex flex-col"
                >
                  {/* Image area */}
                  <div className="w-full h-40 bg-gray-100 relative">
                    {imgSrc ? (
                      <img
                        src={imgSrc}
                        alt={p.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // hide broken image and leave placeholder
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : null}

                    {/* placeholder (visible when no img or error hides it) */}
                    <div className={`absolute inset-0 flex items-center justify-center text-gray-400 ${imgSrc ? "" : ""}`}>
                      {/* This SVG acts as placeholder if image missing or fails */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-12 h-12"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M8 3h8l1 4H7l1-4z" />
                      </svg>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-sky-700">{p.name}</h3>
                      <p className="text-sm text-gray-500 mt-2">{p.description}</p>
                    </div>

                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-block px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition text-sm"
                      >
                        Read More
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* decorative dot / small connector like reference */}
        <div className="mt-8 flex items-center justify-start">
          <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
