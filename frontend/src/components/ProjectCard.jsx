import React from "react";

export default function ProjectCard({ project }) {
  return (
    <div className="border rounded p-4 shadow">
      {project.imageUrl && (
        <img
          src={`${import.meta.env.VITE_API_URL}${project.imageUrl}`}
          className="w-full h-40 object-cover rounded"
        />
      )}
      <h3 className="text-lg font-bold mt-2">{project.name}</h3>
      <p>{project.description}</p>
    </div>
  );
}
