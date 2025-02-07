"use client";

import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Modal from "@/components/Modal";
import { EventClickArg } from "@fullcalendar/core";

export default function RightSection() {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  // Dummy Event Data (Replace with real data from backend)
  const events = [
    {
      id: "1",
      title: "Tech Fest 2024",
      date: "2024-03-10",
      description: "Join the biggest tech fest at Sharda!",
    },
    {
      id: "2",
      title: "AI Workshop",
      date: "2024-03-15",
      description: "Hands-on AI & ML training session.",
    },
    {
      id: "3",
      title: "Cultural Fest",
      date: "2024-03-20",
      description: "Experience a vibrant cultural night.",
    },
  ];

  const handleEventClick = (info: EventClickArg) => {
    const event = events.find((e) => e.id === info.event.id);
    setSelectedEvent(event);
  };

  return (
    <aside className="right-0 top-16 w-full h-full bg-white shadow-md p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold text-blue-600 mb-4">
        📅 Upcoming Events
      </h2>

      {/* FullCalendar */}
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={handleEventClick}
        height="auto"
        headerToolbar={{ left: "", center: "title", right: "prev,next" }}
      />

      {/* Event Modal */}
      {selectedEvent && (
        <Modal onClose={() => setSelectedEvent(null)}>
          <h2 className="text-xl font-bold mb-2">{selectedEvent.title}</h2>
          <p>{selectedEvent.description}</p>
        </Modal>
      )}
    </aside>
  );
}
