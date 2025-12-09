import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminProjectForm from "../components/AdminClientForm.jsx";
// import AdminClientForm from "../components/AdminClientForm";
import AdminClientForm from "../components/AdminClientForm.jsx";


const API = import.meta.env.VITE_API_URL;

export default function Admin() {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [subscribers, setSubscribers] = useState([]);

  const refresh = async () => {
    const p = await axios.get(`${API}/api/projects`);
    const c = await axios.get(`${API}/api/clients`);
    const co = await axios.get(`${API}/api/contacts`);
    const s = await axios.get(`${API}/api/subscribers`);

    setProjects(p.data);
    setClients(c.data);
    setContacts(co.data);
    setSubscribers(s.data);
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Admin Panel</h1>

      <h2 className="text-xl font-bold mt-6">Add Project</h2>
      <AdminProjectForm onAdded={refresh} />

      <h2 className="text-xl font-bold mt-6">Add Client</h2>
      <AdminClientForm onAdded={refresh} />

      <h2 className="text-xl font-bold mt-6">Contacts</h2>
      {contacts.map((c) => (
        <div key={c._id} className="border p-2 my-2">
          {c.fullName} | {c.email} | {c.mobile} | {c.city}
        </div>
      ))}

      <h2 className="text-xl font-bold mt-6">Subscribers</h2>
      {subscribers.map((s) => (
        <div key={s._id} className="border p-2 my-2">
          {s.email}
        </div>
      ))}
    </div>
  );
}
