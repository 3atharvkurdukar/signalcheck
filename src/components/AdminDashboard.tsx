"use client";

import { useState } from "react";
import { type Status, services as initialServices } from "../lib/mockData";

export default function AdminDashboard() {
  const [services, setServices] = useState(initialServices);
  const [newService, setNewService] = useState({
    name: "",
    status: "Operational" as Status,
  });
  const [newMaintenance, setNewMaintenance] = useState({
    title: "",
    date: "",
    description: "",
  });

  const handleServiceStatusChange = (index: number, newStatus: Status) => {
    const updatedServices = [...services];
    if (!!updatedServices[index]) {
      updatedServices[index].status = newStatus;
    }
    setServices(updatedServices);
  };

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    setServices([...services, newService]);
    setNewService({ name: "", status: "Operational" });
  };

  const handleAddMaintenance = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this data to your backend
    console.log("New maintenance added:", newMaintenance);
    setNewMaintenance({ title: "", date: "", description: "" });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="mb-4 text-2xl font-bold">Manage Services</h2>
        {services.map((service, index) => (
          <div key={index} className="mb-2 flex items-center space-x-4">
            <span className="font-medium">{service.name}</span>
            <select
              value={service.status}
              onChange={(e) =>
                handleServiceStatusChange(index, e.target.value as Status)
              }
              className="rounded border p-1"
            >
              <option value="Operational">Operational</option>
              <option value="Degraded Performance">Degraded Performance</option>
              <option value="Partial Outage">Partial Outage</option>
              <option value="Major Outage">Major Outage</option>
            </select>
          </div>
        ))}
      </div>

      <div>
        <h3 className="mb-2 text-xl font-bold">Add New Service</h3>
        <form onSubmit={handleAddService} className="space-y-2">
          <input
            type="text"
            value={newService.name}
            onChange={(e) =>
              setNewService({ ...newService, name: e.target.value })
            }
            placeholder="Service Name"
            className="w-full rounded border p-2"
            required
          />
          <select
            value={newService.status}
            onChange={(e) =>
              setNewService({ ...newService, status: e.target.value as Status })
            }
            className="w-full rounded border p-2"
          >
            <option value="Operational">Operational</option>
            <option value="Degraded Performance">Degraded Performance</option>
            <option value="Partial Outage">Partial Outage</option>
            <option value="Major Outage">Major Outage</option>
          </select>
          <button
            type="submit"
            className="rounded bg-blue-500 px-4 py-2 text-white"
          >
            Add Service
          </button>
        </form>
      </div>

      <div>
        <h3 className="mb-2 text-xl font-bold">Schedule Maintenance</h3>
        <form onSubmit={handleAddMaintenance} className="space-y-2">
          <input
            type="text"
            value={newMaintenance.title}
            onChange={(e) =>
              setNewMaintenance({ ...newMaintenance, title: e.target.value })
            }
            placeholder="Maintenance Title"
            className="w-full rounded border p-2"
            required
          />
          <input
            type="datetime-local"
            value={newMaintenance.date}
            onChange={(e) =>
              setNewMaintenance({ ...newMaintenance, date: e.target.value })
            }
            className="w-full rounded border p-2"
            required
          />
          <textarea
            value={newMaintenance.description}
            onChange={(e) =>
              setNewMaintenance({
                ...newMaintenance,
                description: e.target.value,
              })
            }
            placeholder="Maintenance Description"
            className="h-24 w-full rounded border p-2"
            required
          ></textarea>
          <button
            type="submit"
            className="rounded bg-green-500 px-4 py-2 text-white"
          >
            Schedule Maintenance
          </button>
        </form>
      </div>
    </div>
  );
}
