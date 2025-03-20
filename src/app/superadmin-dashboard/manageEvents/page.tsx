//src/app/superadmin-dashboard/manageEvents/page.tsx

"use client";

import { useState, useEffect } from "react";
import { Search, Edit2, Trash2, Upload, CalendarDays } from "lucide-react";
import SuperAdminNavbar from "@/components/Navbar";
import UploadModal from "@/components/Editor/UploadModal";
import Image from "next/image";

interface Event {
  id: string;
  title: string;
  description: string;
  dateTime: string;
  mediaUrl?: string;
  target: {
    type: "everyone" | "group" | "course" | "semester";
    value: string;
  };
  createdAt: string;
}

const targetOptions = [
  { type: "everyone", value: "everyone", label: "Everyone" },
  { type: "group", value: "Math Group", label: "Math Group" },
  { type: "group", value: "CS Group", label: "CS Group" },
  { type: "course", value: "CS101", label: "CS101 - Intro to Programming" },
  { type: "course", value: "CS102", label: "CS102 - Data Structures" },
  { type: "semester", value: "Spring2024", label: "Spring 2024" },
  { type: "semester", value: "Fall2024", label: "Fall 2024" },
];

const initialEvents: Event[] = [];

export default function ManageEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [editEvent, setEditEvent] = useState<Event | null>(null);
  // const [formLoading, setFormLoading] = useState(false);                 //have to implement loading on create and edit buttons in future
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: "",
    description: "",
    dateTime: "",
    target: { type: "everyone", value: "everyone" },
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          "https://s-connect-backend-2.onrender.com/api/event/events",
          {
            headers: {
              Authorization: `Bearer ${localStorage
                .getItem("token")
                ?.replace(/"/g, "")}`,
            },
          }
        );

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleFileUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setNewEvent((prev) => ({ ...prev, mediaUrl: data.url }));
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const requestBody = {
        title: newEvent.title,
        description: newEvent.description,
        dateTime: new Date(newEvent.dateTime!).toISOString(),
        mediaUrl: newEvent.mediaUrl,
        targetType: newEvent.target?.type.toUpperCase(),
        targetValue: newEvent.target?.value,
      };

      let response;
      if (editEvent) {
        // Update existing event
        response = await fetch(
          `https://s-connect-backend-2.onrender.com/api/event/events/${editEvent.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage
                .getItem("token")
                ?.replace(/"/g, "")}`,
            },
            body: JSON.stringify(requestBody),
          }
        );
      } else {
        // Create new event
        response = await fetch(
          "https://s-connect-backend-2.onrender.com/api/event/events",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage
                .getItem("token")
                ?.replace(/"/g, "")}`,
            },
            body: JSON.stringify(requestBody),
          }
        );
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save event");
      }

      const savedEvent = await response.json();

      if (editEvent) {
        setEvents(
          events.map((event) =>
            event.id === editEvent.id ? savedEvent : event
          )
        );
        setEditEvent(null);
      } else {
        setEvents([savedEvent, ...events]);
      }

      setNewEvent({
        title: "",
        description: "",
        dateTime: "",
        target: { type: "everyone", value: "everyone" },
      });
    } catch (error) {
      console.error("Save Event Error:", error);
      if (error instanceof Error) {
        alert(error.message || "Failed to save event");
      } else {
        alert("Failed to save event");
      }
    }
  };

  const handleEditClick = (event: Event) => {
    setEditEvent(event);
    setNewEvent({
      title: event.title,
      description: event.description,
      dateTime: event.dateTime.slice(0, 16), // Truncate to datetime-local format
      mediaUrl: event.mediaUrl,
      target: event.target,
    });
  };

  const handleCancelEdit = () => {
    setEditEvent(null);
    setNewEvent({
      title: "",
      description: "",
      dateTime: "",
      target: { type: "everyone", value: "everyone" },
    });
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(
        `https://s-connect-backend-2.onrender.com/api/event/events/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage
              .getItem("token")
              ?.replace(/"/g, "")}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Delete failed");
      }

      setEvents(events.filter((event) => event.id !== id));
    } catch (error) {
      console.error("Delete error:", error);
      if (error instanceof Error) {
        alert(error.message || "Failed to delete event");
      } else {
        alert("Failed to delete event");
      }
    }
  };

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white text-blue-900">
      <SuperAdminNavbar />

      {showUploadModal && (
        <UploadModal
          onClose={() => setShowUploadModal(false)}
          onUploadUrl={(url) =>
            setNewEvent((prev) => ({ ...prev, mediaUrl: url }))
          }
          onSelectFile={handleFileUpload}
        />
      )}

      {/* Page Content */}
      <div className="max-w-7xl mx-auto p-6 pt-20">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold flex items-center">
            <CalendarDays className="h-8 w-8 mr-2 text-blue-600" />
            Manage Events
          </h1>
        </div>

        {/* Create Event Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100 mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {editEvent ? "Edit Event" : "Create New Event"}
          </h2>
          <form onSubmit={handleCreateEvent} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Event Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Event Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter event title..."
                  value={newEvent.title}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, title: e.target.value })
                  }
                  className="mt-1 w-full border p-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                />
              </div>

              {/* Event Date & Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date & Time
                </label>
                <input
                  type="datetime-local"
                  required
                  value={newEvent.dateTime}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, dateTime: e.target.value })
                  }
                  className="mt-1 w-full border p-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                />
              </div>

              {/* Target Audience Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Target Audience
                </label>
                <select
                  value={newEvent.target?.value}
                  onChange={(e) => {
                    const option = targetOptions.find(
                      (opt) => opt.value === e.target.value
                    );
                    if (option) {
                      setNewEvent({
                        ...newEvent,
                        target: {
                          type: option.type as
                            | "group"
                            | "everyone"
                            | "course"
                            | "semester",
                          value: option.value,
                        },
                      });
                    }
                  }}
                  className="mt-1 w-full border p-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                >
                  {targetOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Media (Image/Video URL) Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Media (Image/Video URL)
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="url"
                    value={newEvent.mediaUrl || ""}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, mediaUrl: e.target.value })
                    }
                    className="flex-1 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-gray-50 p-2"
                    placeholder="https://"
                  />
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(true)}
                    className="ml-2 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Upload className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Event Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  required
                  placeholder="Write event description here..."
                  value={newEvent.description}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, description: e.target.value })
                  }
                  rows={3}
                  className="mt-1 w-full border p-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              {editEvent && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Cancel Edit
                </button>
              )}
              <button
                type="submit"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                {editEvent ? "Update Event" : "Create Event"}
              </button>
            </div>
          </form>
        </div>

        {/* Space Between Sections */}
        <div className="h-8"></div>

        {/* Your Events Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Your Events</h2>
            <div className="relative">
              <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50"
              />
            </div>
          </div>

          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2">Title</th>
                <th className="p-2">Description</th>
                <th className="p-2">Date & Time</th>
                <th className="p-2">Target</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map((event: Event) => (
                <tr key={event.id} className="border-t">
                  <td className="p-2">
                    <div className="flex items-center space-x-3">
                      {event.mediaUrl ? (
                        <Image
                          src={event.mediaUrl}
                          alt={event.title}
                          width={50} // Adjust as needed
                          height={50} // Adjust as needed
                          className="rounded-md object-cover"
                        />
                      ) : (
                        <div className="w-[50px] h-[50px] bg-gray-300 flex items-center justify-center rounded-md">
                          🖼️
                        </div> // Placeholder if no image
                      )}
                      <span>{event.title}</span>
                    </div>
                  </td>
                  <td className="p-2">{event.description}</td>
                  <td className="p-2">
                    {new Date(event.dateTime).toLocaleString()}
                  </td>
                  <td className="p-2">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {
                        targetOptions.find(
                          (opt) => opt.value === event.target?.value
                        )?.label
                      }
                    </span>
                  </td>
                  <td className="p-2 flex space-x-4">
                    <button
                      onClick={() => handleEditClick(event)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
