import React from "react";

export default function ClientCard({ client }) {
  return (
    <div className="border rounded p-4 shadow flex gap-4">
      <img
        src={`${import.meta.env.VITE_API_URL}${client.imageUrl}`}
        className="w-20 h-20 rounded-full object-cover"
      />
      <div>
        <h3 className="text-lg font-bold">{client.name}</h3>
        <p className="text-sm text-gray-500">{client.designation}</p>
        <p>{client.description}</p>
      </div>
    </div>
  );
}
