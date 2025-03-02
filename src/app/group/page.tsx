// src/group/page.tsx
// src/app/groups/[groupId]/page.tsx
"use client";

import Navbar from "@/components/Navbar";
import LeftSection from "@/components/LeftSection";
import GroupRightSection from "@/components/GroupRightSection";
import GroupMiddleSection from "@/components/GroupMiddleSection";

export default function GroupPage({ params }: { params: { groupId: string } }) {
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
          <GroupMiddleSection groupId={params.groupId} />
        </div>

        {/* Group Right Section (Fixed) */}
        <div className="hidden lg:block w-1/5 xl:w-1/4 bg-white shadow-lg m-1">
          <GroupRightSection groupId={params.groupId} />
        </div>
      </div>

      {/* Mobile View - Same as dashboard */}
    </div>
  );
}
