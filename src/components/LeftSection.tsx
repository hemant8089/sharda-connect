//src/components/LeftSection.tsx
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LeftSection() {
  const [groupsOpen, setGroupsOpen] = useState(true);
  const [linksOpen, setLinksOpen] = useState(true);
  const [attendanceOpen, setAttendanceOpen] = useState(true);
  const [groups, setGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();


  

  // Dummy Data (Replace with real data from backend)
  // const groups = ["AI Club", "IoT Society", "Music Club"];
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

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const authData = localStorage.getItem("auth-storage");
        if (!authData) return;
        
        const parsedAuth = JSON.parse(authData);
        const token = parsedAuth?.token;

        const response = await fetch("https://s-connect-backend-2.onrender.com/api/group/me", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        const data = await response.json();
        if (data.success) setGroups(data.data);
      } catch (error) {
        console.error("Error fetching groups:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

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
            <li>
              <Link
                href="/dashboard"
                className={`block cursor-pointer text-gray-700 hover:text-blue-600 ${
                  pathname === "/dashboard" ? "text-blue-600 font-semibold" : ""
                }`}
              >
                🏠 Home
              </Link>
            </li>
            {loading ? (
              <li>Loading groups...</li>
            ) : groups.length > 0 ? (
              groups.map((group) => (
                <li key={group.id}>
                  <Link
                    href={`/group/${group.id}`}
                    className={`block cursor-pointer text-gray-700 hover:text-blue-600 ${
                      pathname === `/group/${group.id}` ? "text-blue-600 font-semibold" : ""
                    }`}
                  >
                    {group.name}
                  </Link>
                </li>
              ))
            ) : (
              <li className="text-gray-500 text-sm">No groups joined yet</li>
            )}
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
