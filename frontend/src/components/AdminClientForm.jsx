import React, { useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export default function AdminClientForm({ onAdded }) {
  const [data, setData] = useState({
    name: "",
    designation: "",
    description: "",
    image: null
  });

  const submit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("name", data.name);
    fd.append("designation", data.designation);
    fd.append("description", data.description);
    if (data.image) fd.append("image", data.image);

    await axios.post(`${API}/api/clients`, fd);
    alert("Client Added!");
    onAdded();
  };

  return (
    <form className="max-w-lg" onSubmit={submit}>
      <input
        className="border p-2 w-full mb-2"
        placeholder="Client Name"
        onChange={(e) => setData({ ...data, name: e.target.value })}
      />

      <input
        className="border p-2 w-full mb-2"
        placeholder="Designation"
        onChange={(e) => setData({ ...data, designation: e.target.value })}
      />

      <textarea
        className="border p-2 w-full mb-2"
        placeholder="Description"
        onChange={(e) => setData({ ...data, description: e.target.value })}
      />

      <input
        type="file"
        onChange={(e) => setData({ ...data, image: e.target.files[0] })}
      />

      <button className="bg-green-600 text-white px-4 py-2 rounded mt-2">
        Add Client
      </button>
    </form>
  );
}
