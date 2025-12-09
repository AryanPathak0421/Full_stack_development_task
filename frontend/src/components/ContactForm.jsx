import React, { useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export default function ContactForm() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    city: ""
  });

  const submit = async (e) => {
    e.preventDefault();
    await axios.post(`${API}/api/contacts`, form);
    alert("Message Sent!");
    setForm({ fullName: "", email: "", mobile: "", city: "" });
  };

  return (
    <form onSubmit={submit} className="mt-10 border p-4 rounded shadow max-w-md">
      <h2 className="text-xl font-bold mb-4">Contact Form</h2>
      <input
        className="border p-2 w-full mb-2"
        placeholder="Full Name"
        value={form.fullName}
        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
      />
      <input
        className="border p-2 w-full mb-2"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        className="border p-2 w-full mb-2"
        placeholder="Mobile"
        value={form.mobile}
        onChange={(e) => setForm({ ...form, mobile: e.target.value })}
      />
      <input
        className="border p-2 w-full mb-2"
        placeholder="City"
        value={form.city}
        onChange={(e) => setForm({ ...form, city: e.target.value })}
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
    </form>
  );
}
