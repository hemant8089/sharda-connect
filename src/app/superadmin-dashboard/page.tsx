//src/app/superadmin-dashboard/page.tsx
"use client";

import Navbar from "@/components/Navbar";
import LeftSection from "@/components/LeftSection";
import MiddleSection from "@/components/MiddleSection";
import RightSection from "@/components/RightSection";

export default function SuperAdminDashboard() {
  return (
    <div className="flex flex-col h-screen bg-gray-200">
      {/* Navbar */}
      <Navbar />

      <div className="flex flex-1 overflow-hidden pt-16 lg:flex-row flex-col">
        {/* Left Sidebar (Fixed) */}
        <div className="hidden lg:block w-1/6 xl:w-1/5 bg-white shadow-lg m-1">
          <LeftSection />
        </div>

        {/* Main Content (Scrollable, Takes Majority Space) */}
        <div className="flex-1 overflow-y-auto">
        <MiddleSection groupId={undefined} />
        </div>

        {/* Right Sidebar (Fixed, 1:3:1 Layout) */}
        <div className="hidden lg:block w-1/5 xl:w-1/4 bg-white shadow-lg m-1">
          <RightSection />
        </div>
      </div>

      {/* Mobile View: Show Left & Right Sections as Buttons */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white shadow-md flex justify-around p-2">
        <button
          className="p-2 text-blue-600"
          onClick={() =>
            document.getElementById("left-section")?.classList.toggle("hidden")
          }
        >
          ☰ Groups & Links
        </button>
        <button
          className="p-2 text-blue-600"
          onClick={() =>
            document.getElementById("right-section")?.classList.toggle("hidden")
          }
        >
          📅 Events
        </button>
      </div>

      {/* Hidden Sections for Mobile View */}
      <div
        id="left-section"
        className="hidden fixed inset-0 bg-white shadow-lg p-4 z-50 overflow-auto lg:hidden"
      >
        <button
          className="absolute top-2 right-4 text-red-600"
          onClick={() =>
            document.getElementById("left-section")?.classList.add("hidden")
          }
        >
          ✖ Close
        </button>
        <LeftSection />
      </div>

      <div
        id="right-section"
        className="hidden fixed inset-0 bg-white shadow-lg p-4 z-50 overflow-auto lg:hidden"
      >
        <button
          className="absolute top-2 right-4 text-red-600"
          onClick={() =>
            document.getElementById("right-section")?.classList.add("hidden")
          }
        >
          ✖ Close
        </button>
        <RightSection />
      </div>
    </div>
  );
}
