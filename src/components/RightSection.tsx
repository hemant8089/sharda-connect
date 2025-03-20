//src/components/RightSection.tsx
"use client";

import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Modal from "@/components/eventModal";
import { EventClickArg } from "@fullcalendar/core";
import Link from "next/link";

interface EventData {
  id: string;
  title: string;
  start: string;  
  end?: string;   
  description: string;
  mediaUrl?: string;
  targetType: string;
  targetValue: string;
}


export default function RightSection() {
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [aspectRatio, setAspectRatio] = useState(1.5);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAspectRatio(window.innerWidth < 768 ? 1 : 1.5);
    }
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          "https://s-connect-backend-2.onrender.com/api/event/events",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')?.replace(/"/g, '')}`
            }
          }
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // Transform events for FullCalendar
        const calendarEvents = data.map((event: any) => ({
          id: event.id,
          title: event.title,
          start: event.dateTime, // Use ISO 8601 format directly
          end: event.end || new Date(new Date(event.dateTime).getTime() + 60 * 60 * 1000).toISOString(),
          description: event.description,
          mediaUrl: event.mediaUrl,
          targetType: event.targetType,
          targetValue: event.targetValue
        }));

        setEvents(calendarEvents);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false); // Ensure loading state is updated
      }
    };
    
    fetchEvents();
  }, []);

  // Update role state
  useEffect(() => {
    setRole(localStorage.getItem("user-role"));
  }, []);

  // Update event content rendering
  const eventContent = (arg: any) => {
    const isPast = new Date(arg.event.start) < new Date();
    return (
      <div className={`fc-custom-event ${isPast ? 'bg-gray-100 text-gray-600' : 'bg-blue-100 text-blue-800'}`}>
        <div className="fc-event-main-frame">
          <div className="fc-event-title-container">
            <div className="fc-event-title">{arg.event.title}</div>
          </div>
        </div>
      </div>
    );
  };


  const handleEventClick = (info: EventClickArg) => {
    const event = events.find((e) => e.id === info.event.id) || null;
    setSelectedEvent(event);
  };

  const getEventClass = (dateStr: string) => {
    const eventDate = new Date(dateStr);
    const now = new Date();
    return eventDate >= now ? "bg-blue-100 border-blue-200" : "bg-gray-100 border-gray-200";
  };

  const calendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: "dayGridMonth",
    events: events,
    eventClick: handleEventClick,
    eventContent: eventContent,
    headerToolbar: {
      left: "",
      center: "title",
      right: "prev,next"
    },
    fixedWeekCount: false,
    dayMaxEvents: 3,
    dayMaxEventRows: false,
    height: "auto",
    // Mobile optimization
    aspectRatio: aspectRatio,
    views: {
      dayGridMonth: {
        titleFormat: { year: "numeric" as const, month: "long" as const },
        dayHeaderFormat: { weekday: "short" as "long" | "short" | "narrow" | undefined }
      }
    },
    eventClassNames: "fc-custom-event",
    dayCellClassNames: "fc-custom-day"
  };

  return (
    <aside className="right-0 top-16 w-full h-full bg-white shadow-md p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold text-blue-600 mb-4">📅 Upcoming Events</h2>
      
      {loading ? (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-500 mt-2">Loading events...</p>
        </div>
      ) : (
        <div className="fc-custom-theme">
          <FullCalendar {...calendarOptions} />
        </div>
      )}

      {role === "SUPER_ADMIN" && (
        <Link href="/superadmin-dashboard/manageEvents" 
              className="block bg-blue-600 text-white px-4 py-2 rounded-md mt-4 w-full text-center hover:bg-blue-700 transition-colors">
          Manage Events
        </Link>
      )}

      {selectedEvent && (
        <Modal onClose={() => setSelectedEvent(null)}>
          <div className="max-w-md">
            <h2 className="text-xl font-bold mb-2 text-blue-900">
              {selectedEvent.title}
            </h2>
            {selectedEvent.mediaUrl && (
              <img 
                src={selectedEvent.mediaUrl} 
                alt={selectedEvent.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
            )}
            <p className="text-gray-700 mb-2">{selectedEvent.description}</p>
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>
                {new Date(selectedEvent.start).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {selectedEvent.targetType}: {selectedEvent.targetValue}
              </span>
            </div>
          </div>
        </Modal>
      )}
    </aside>
  );
}