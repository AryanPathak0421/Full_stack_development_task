import React, { useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const subscribe = async () => {
    await axios.post(`${API}/api/subscribers`, { email });
    alert("Subscribed!");
    setEmail("");
  };

  return (
    <div className="mt-10 max-w-md">
      <h2 className="text-xl font-bold mb-2">Subscribe to our Newsletter</h2>
      <input
        className="border p-2 w-full mb-2"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={subscribe}>
        Subscribe
      </button>
    </div>
  );
}
