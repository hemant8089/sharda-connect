//src/components/LeftSection.tsx
"use client";

import { useState } from "react";

export default function LeftSection() {
  const [groupsOpen, setGroupsOpen] = useState(true);
  const [linksOpen, setLinksOpen] = useState(true);
  const [attendanceOpen, setAttendanceOpen] = useState(true);

  // Dummy Data (Replace with real data from backend)
  const groups = ["AI Club", "IoT Society", "Music Club"];
  const quickLinks = [
    { name: "ShardaGPT", link: "/sharda-gpt" },
    { name: "Sharda Library", link: "/library" },
    { name: "Sharda Map", link: "/map" },
    { name: "Sharda Quiz", link: "/quiz" },
  ];
  const attendance = [
    { subject: "Artificial Intelligence", percentage: 80 },
    { subject: "IoT", percentage: 78 },
    { subject: "Mobile Computing", percentage: 74 }, // Less than 75% (Red)
  ];

  return (
    <aside className="left-0 top-16 w-full h-full bg-white shadow-md p-4 space-y-6 overflow-y-auto">
      {/* My Groups */}
      <div>
        <div
          className="flex justify-between items-center cursor-pointer font-semibold text-blue-600"
          onClick={() => setGroupsOpen(!groupsOpen)}
        >
          <span>My Groups</span>
          <span>{groupsOpen ? "▼" : "▶"}</span>
        </div>
        {groupsOpen && (
          <ul className="mt-2 space-y-2">
            <li
              className="cursor-pointer text-gray-700 hover:text-blue-600"
              onClick={() => console.log("Go to Home")}
            >
              🏠 Home
            </li>
            {groups.map((group) => (
              <li
                key={group}
                className="cursor-pointer text-gray-700 hover:text-blue-600"
              >
                {group}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Quick Links */}
      <div>
        <div
          className="flex justify-between items-center cursor-pointer font-semibold text-blue-600"
          onClick={() => setLinksOpen(!linksOpen)}
        >
          <span>Quick Links</span>
          <span>{linksOpen ? "▼" : "▶"}</span>
        </div>
        {linksOpen && (
          <ul className="mt-2 space-y-2">
            {quickLinks.map((link) => (
              <li
                key={link.name}
                className="cursor-pointer text-gray-700 hover:text-blue-600"
              >
                {link.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Attendance Section */}
      <div>
        <div
          className="flex justify-between items-center cursor-pointer font-semibold text-blue-600"
          onClick={() => setAttendanceOpen(!attendanceOpen)}
        >
          <span>
            My Attendance - <span className="font-bold">77.3%</span>
          </span>
          <span>{attendanceOpen ? "▼" : "▶"}</span>
        </div>
        {attendanceOpen && (
          <ul className="mt-2 space-y-2">
            {attendance.map((subject) => (
              <li
                key={subject.subject}
                className={`p-2 rounded ${
                  subject.percentage < 75 ? "bg-red-200" : "bg-green-200"
                }`}
              >
                {subject.subject} - {subject.percentage}%
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}
