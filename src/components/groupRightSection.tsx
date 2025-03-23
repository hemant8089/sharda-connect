// src/components/GroupRightSection.tsx
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

// Define the Group interface directly in this file
interface Group {
  id: string;
  name: string;
  totalMembers: number;
  totalPosts: number;
  createdAt: string;
  description: string;
  createdBy: { name: string };
  imageUrl?: string;
  admins: { user: { name: string } }[];
  members: { userId: string }[];
}

interface GroupData extends Group {
  name: string;
  totalMembers: number;
  totalPosts: number;
  createdAt: string;
  description: string;
  createdBy: { name: string };
  imageUrl?: string;
  admins: { user: { name: string } }[];
}

export default function GroupRightSection({ groupId }: { groupId: string }) {
  const [group, setGroup] = useState<Group | null>(null);
  const [isMember, setIsMember] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const response = await fetch(
          `https://s-connect-backend-2.onrender.com/api/group/${groupId}`
        );
        if (!response.ok) throw new Error("Failed to fetch group");
        const data = await response.json();
        setGroup(data.data);

        // Check membership
        const authData = localStorage.getItem("auth");
        if (authData) {
          const parsedAuth = JSON.parse(authData);
          const memberCheck = data.data.members.some(
            (m: { userId: string }) => m.userId === parsedAuth.user.id
          );
          setIsMember(memberCheck);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load group");
      } finally {
        setLoading(false);
      }
    };

    fetchGroup();
  }, [groupId]);

  const handleJoinGroup = async () => {
    setJoining(true);
    try {
      // Retrieve the token and user data from localStorage
      const authData = localStorage.getItem("auth-storage");

      if (!authData) {
        throw new Error("User data not found. Please log in again.");
      }

      const parsedAuth = JSON.parse(authData);
      const token = parsedAuth.token;


      console.log("token",token)

      const user = JSON.parse(authData); // Parse the user data
      const userId = parsedAuth.user.id; // Extract the user ID

      // Send the request with both groupId and userId
      const response = await fetch(
        "https://s-connect-backend-2.onrender.com/api/group/selfAddMember",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ groupId, userId }), // Include both groupId and userId
        }
      );

      // Log the raw response for debugging
      const rawResponse = await response.text();
      console.log("Raw response:", rawResponse);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to join group");
      }

      // Re-fetch group data to update the UI
      const groupResponse = await fetch(
        `https://s-connect-backend-2.onrender.com/api/group/${groupId}`
      );
      if (!groupResponse.ok) throw new Error("Failed to fetch updated group data");
      const groupData = await groupResponse.json();

      // Update state with the latest group data
      setGroup(groupData.data);
      setIsMember(true); // User is now a member
    } catch (err) {
      console.error("Join error:", err);
      alert(err instanceof Error ? err.message : "Failed to join group");
    } finally {
      setJoining(false);
    }
  };

  
  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!group) return <div className="p-4">Group not found</div>;

  return (
    <div className="p-4 space-y-6">
      <div className="text-center">
        {group.imageUrl && (
          <Image
            src={group.imageUrl}
            alt="Group Icon"
            width={308}
            height={180}
            className="w-32 h-32 rounded-full mx-auto border-4 border-blue-500 object-cover"
          />
        )}
        <h2 className="text-2xl font-bold mt-4">{group.name}</h2>

        {!isMember && (
          <button
            onClick={handleJoinGroup}
            disabled={joining}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
          >
            {joining ? "Joining..." : "Join Group"}
          </button>
        )}
      </div>

      <div className="space-y-4">
        <p className="text-gray-700">{group.description}</p>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="font-semibold">Admin</p>
            <p>{group.createdBy.name}</p>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <p className="font-semibold">Members</p>
            <p>{group.totalMembers}</p>
          </div>
          <div className="bg-yellow-50 p-3 rounded-lg">
            <p className="font-semibold">Created On</p>
            <p>{new Date(group.createdAt).toLocaleDateString()}</p>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg">
            <p className="font-semibold">Total Posts</p>
            <p>{group.totalPosts}</p>
          </div>
        </div>

        <div className="bg-red-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Group Admins</h3>
          <ul className="space-y-1">
            {group.admins.map((admin, index) => (
              <li key={index} className="text-sm text-gray-700">
                {admin.user?.name || "Unknown Admin"}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
