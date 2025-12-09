// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const API = import.meta.env.VITE_API_URL || "";

// /**
//  * HappyClients
//  * Props:
//  *  - clients: optional array of client objects [{ _id, name, designation, description, imageUrl }]
//  *
//  * If clients prop is not provided it will try to fetch from `${API}/api/clients`.
//  */
// export default function HappyClients({ clients: clientsProp }) {
//   const [clients, setClients] = useState(clientsProp || []);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (clientsProp && clientsProp.length) {
//       setClients(clientsProp);
//       return;
//     }
//     // fetch only if API is configured
//     if (!API) return;
//     setLoading(true);
//     axios
//       .get(`${API}/api/clients`)
//       .then((res) => setClients(res.data || []))
//       .catch((err) => {
//         console.error("Failed to load clients:", err);
//         setClients([]);
//       })
//       .finally(() => setLoading(false));
//   }, [clientsProp]);

//   // small fallback data so the section is visible during development
//   const fallback = [
//     {
//       _id: "1",
//       name: "Rowhan Smith",
//       designation: "CEO, Foreclosure",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//       imageUrl: "/image3.jpg"
//     },
//     {
//       _id: "2",
//       name: "Shipra Kayak",
//       designation: "Brand Designer",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//       imageUrl: "/image4.jpg"
//     },
//     {
//       _id: "3",
//       name: "John Lepore",
//       designation: "CEO, Foreclosure",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//       imageUrl: "/image5.jpg"
//     },
//     {
//       _id: "4",
//       name: "Marry Freeman",
//       designation: "Marketing Manager at Mixit",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//       imageUrl: "/image6.jpg"
//     },
//     {
//       _id: "5",
//       name: "Lucy",
//       designation: "Sales Rep at Alibaba",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//       imageUrl: "/image3.jpg"
//     }
//   ];

//   const list = clients && clients.length ? clients : fallback;

//   return (
//     <section className="py-12 bg-white">
//       <div className="max-w-6xl mx-auto px-6">
//         <h2 className="text-2xl font-semibold text-center text-sky-700 mb-8">
//           Happy Clients
//         </h2>

//         {loading ? (
//           <p className="text-center text-gray-500">Loading clients...</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
//             {list.map((c) => (
//               <div key={c._id} className="relative bg-white rounded-lg shadow-sm p-6 pt-12">
//                 {/* avatar overlapping top */}
//                 <div className="absolute -top-8 left-6">
//                   {c.imageUrl ? (
//                     <img
//                       src={`${API}${c.imageUrl}`}
//                       alt={c.name}
//                       className="w-16 h-16 rounded-full border-4 border-white object-cover shadow-md"
//                     />
//                   ) : (
//                     <div className="w-16 h-16 rounded-full border-4 border-white bg-gray-100 flex items-center justify-center text-sm text-gray-500 shadow-md">
//                       {c.name ? c.name.split(" ").map(n=>n[0]).slice(0,2).join("") : "NA"}
//                     </div>
//                   )}
//                 </div>

//                 {/* card content */}
//                 <p className="text-sm text-gray-600 min-h-[80px]">{c.description}</p>

//                 <div className="mt-4">
//                   <div className="text-sky-700 font-semibold">{c.name}</div>
//                   <div className="text-sm text-gray-500">{c.designation}</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }



import React, { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || ""; // e.g. "http://localhost:5000" or ""

export default function HappyClients({ clients: clientsProp }) {
  const [clients, setClients] = useState(clientsProp || []);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // if parent provided clients prop, use that
    if (clientsProp && clientsProp.length) {
      setClients(clientsProp);
      return;
    }

    // no API configured -> use fallback only
    if (!API) return;

    const source = axios.CancelToken.source();
    setLoading(true);

    axios
      .get(`${API}/api/clients`, { cancelToken: source.token })
      .then((res) => setClients(Array.isArray(res.data) ? res.data : []))
      .catch((err) => {
        if (axios.isCancel(err)) {
          // request cancelled
        } else {
          console.error("Failed to load clients:", err);
          setClients([]);
        }
      })
      .finally(() => setLoading(false));

    return () => {
      source.cancel("Component unmounted");
    };
  }, [clientsProp]);

  // local fallback so the UI isn't empty during dev
  const fallback = [
    {
      _id: "1",
      name: "Rowhan Smith",
      designation: "CEO, Foreclosure",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      imageUrl: "/image3.jpg"
    },
    {
      _id: "2",
      name: "Shipra Kayak",
      designation: "Brand Designer",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      imageUrl: "/image4.jpg"
    },
    {
      _id: "3",
      name: "John Lepore",
      designation: "CEO, Foreclosure",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      imageUrl: "/image5.webp"
    },
    {
      _id: "4",
      name: "Marry Freeman",
      designation: "Marketing Manager at Mixit",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      imageUrl: "/image6.png"
    },
    {
      _id: "5",
      name: "Lucy",
      designation: "Sales Rep at Alibaba",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      imageUrl: "/image3.jpg"
    }
  ];

  const list = clients && clients.length ? clients : fallback;

  // helper: build final src for an image entry
  const resolveImageSrc = (imageUrl) => {
    if (!imageUrl) return null;
    // already absolute http(s) or root-based (public/)
    if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://") || imageUrl.startsWith("/")) {
      return imageUrl;
    }
    // otherwise treat as a relative path served by your backend API
    // ensure API doesn't end with slash duplication
    if (!API) return imageUrl;
    return `${API.replace(/\/$/, "")}/${imageUrl.replace(/^\//, "")}`;
  };

  const initialsFromName = (name = "") =>
    name
      .split(" ")
      .map((n) => n[0] || "")
      .slice(0, 2)
      .join("")
      .toUpperCase();

  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-semibold text-center text-sky-700 mb-8">
          Happy Clients
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading clients...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {list.map((c) => {
              const imgSrc = resolveImageSrc(c.imageUrl || "");
              return (
                <div key={c._id} className="relative bg-white rounded-lg shadow-sm p-6 pt-12">
                  {/* avatar overlapping top */}
                  <div className="absolute -top-8 left-6">
                    {imgSrc ? (
                      <img
                        src={imgSrc}
                        alt={c.name}
                        className="w-16 h-16 rounded-full border-4 border-white object-cover shadow-md"
                        onError={(e) => {
                          // fallback to initials if image fails to load
                          e.currentTarget.style.display = "none";
                          const parent = e.currentTarget.parentNode;
                          if (parent) parent.querySelector(".initials-fallback")?.classList.remove("hidden");
                        }}
                      />
                    ) : null}

                    {/* initials fallback (hidden when image loads) */}
                    <div
                      className={`initials-fallback ${imgSrc ? "hidden" : ""} w-16 h-16 rounded-full border-4 border-white bg-gray-100 flex items-center justify-center text-sm text-gray-500 shadow-md`}
                      aria-hidden={!!imgSrc}
                    >
                      {c.name ? initialsFromName(c.name) : "NA"}
                    </div>
                  </div>

                  {/* card content */}
                  <p className="text-sm text-gray-600 min-h-[80px]">{c.description}</p>

                  <div className="mt-4">
                    <div className="text-sky-700 font-semibold">{c.name}</div>
                    <div className="text-sm text-gray-500">{c.designation}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
