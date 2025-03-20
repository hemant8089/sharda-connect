// src/app/group/[groupId]/page.tsx
"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import LeftSection from "@/components/LeftSection";
import GroupRightSection from "@/components/GroupRightSection";
import GroupMiddleSection from "@/components/GroupMiddleSection";
import { useParams } from "next/navigation";
import LoadingSkeleton from "@/components/LoadingSkeleton"; // Create a loading skeleton component

export default function GroupPage() {
  const params = useParams();
  const groupId = params.groupId as string;
  // const [loading, setLoading] = useState(true);

  return (
    <div className="flex flex-col h-screen bg-gray-200">
      <Navbar />

      <div className="flex flex-1 overflow-hidden pt-16 lg:flex-row flex-col">
        {/* Left Sidebar */}
        <div className="hidden lg:block w-1/6 xl:w-1/5 bg-white shadow-lg m-1">
          <LeftSection />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          {/* {loading ? (
            <LoadingSkeleton />
          ) : (
            <GroupMiddleSection groupId={groupId} />
          )} */}
          <GroupMiddleSection groupId={groupId} />
        </div>

        {/* Right Section */}
        <div className="hidden lg:block w-1/5 xl:w-1/4 bg-white shadow-lg m-1">
          <GroupRightSection groupId={groupId} />
        </div>
      </div>
    </div>
  );
}