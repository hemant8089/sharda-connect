// src/app/superadmin-dashboard/manageGroups/page.tsx
"use client"; // Mark this as a Client Component

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FaUsers,
  FaUserCog,
  FaPlus,
  FaSearch,
  FaTags,
  FaFolder,
} from "react-icons/fa";
import debounce from "lodash.debounce";
import SuperAdminNavbar from "@/components/Navbar";
import CreateGroupModal from "@/components/CreateGroupModal";

interface Group {
  id: string;
  name: string;
  totalMembers: number;
  admins: string[];
  tags: string[];
  description: string;
  category: string;
}

export default function ManageGroups() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [allGroups, setAllGroups] = useState<Group[]>([]);
  const [filteredGroups, setFilteredGroups] = useState<Group[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Fetch groups from API
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch(
          "https://s-connect-backend-2.onrender.com/api/group/groups"
        );
        if (!response.ok) throw new Error("Failed to fetch groups");

        const data = await response.json();
        if (data.success) {
          // Transform API data to match our Group interface
          const transformedGroups = data.data.map((apiGroup: any) => ({
            id: apiGroup.id,
            name: apiGroup.name,
            description: apiGroup.description,
            totalMembers: apiGroup.members.length,
            admins: [apiGroup.createdById], // Using admin ID
            tags: ["community", "collaboration"], // Dummy tags
            category: apiGroup.category,
          }));
          setAllGroups(transformedGroups);
          setFilteredGroups(transformedGroups);
        } else {
          throw new Error("API returned unsuccessful response");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGroups();
  }, []);

  const debouncedSearch = useCallback(
    debounce((searchValue: string) => {
      setIsSearching(true);
      if (searchValue.trim() === "") {
        setFilteredGroups(allGroups);
        setIsSearching(false);
        return;
      }
      const filtered = allGroups.filter(
        (group) =>
          group.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          group.tags.some((tag) =>
            tag.toLowerCase().includes(searchValue.toLowerCase())
          ) ||
          group.admins.some((admin) =>
            admin.toLowerCase().includes(searchValue.toLowerCase())
          ) ||
          group.category.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredGroups(filtered);
      setIsSearching(false);
    }, 300),
    [allGroups]
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
    return () => debouncedSearch.cancel();
  }, [searchTerm, debouncedSearch]);

  const handleViewGroup = (group: Group) => {
    router.push(`/superadmin-dashboard/groupInfo?id=${group.id}`);
  };

  const handleCreateGroup = async (groupData: {
    name: string;
    description: string;
    category: string;
    isPublic: boolean;
  }) => {
    try {
      const response = await fetch(
        "https://s-connect-backend-2.onrender.com/api/group/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...groupData,
            creatorId: "67a8bfea4ce67dc380f5c65e",
          }),
        }
      );
      if (!response.ok) throw new Error("Failed to create group");

      // Assuming API returns the new group object
      const newGroup = await response.json();
      setAllGroups([...allGroups, newGroup]);
    } catch (error) {
      console.error("Create group error:", error);
      alert("Failed to create group");
    }
  };

  const truncateDescription = (
    description: string | undefined,
    maxLines: number
  ) => {
    if (!description) return ""; // Handle undefined/null cases
    const lines = description.split("\n");
    if (lines.length > maxLines) {
      return lines.slice(0, maxLines).join("\n") + "...";
    }
    return description;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <SuperAdminNavbar />
        <div className="max-w-7xl mx-auto p-6 pt-20">
          <div className="animate-pulse space-y-6">
            <div className="h-12 bg-gray-200 rounded-lg w-1/3"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
                >
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6 mb-6"></div>
                  <div className="h-10 bg-gray-200 rounded-lg"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <SuperAdminNavbar />
        <div className="max-w-7xl mx-auto p-6 pt-20">
          <div className="bg-red-50 p-6 rounded-lg border border-red-100 text-red-600">
            <p className="font-semibold">Error:</p>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SuperAdminNavbar />
      <CreateGroupModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateGroup}
      />
      <div className="max-w-7xl mx-auto p-6 pt-20">
        {/* Header & Search */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage Groups</h1>
          <div className="flex gap-4 w-full sm:w-auto">
            <div className="relative flex-grow sm:flex-grow-0 sm:min-w-[300px]">
              <input
                type="text"
                placeholder="Search groups, tags, or admins..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm transition-all"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-md"
            >
              <FaPlus /> Create Group
            </button>
          </div>
        </div>

        {/* Group List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.length === 0 ? (
            <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center text-gray-500">
              No group with that name
            </div>
          ) : (
            filteredGroups.map((group) => (
              <div
                key={group.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md p-6 border border-gray-100 transition-all"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {group.name}
                </h2>
                <p className="text-gray-600 text-sm mb-4 h-[3em] overflow-hidden">
                  {truncateDescription(group.description || "", 2)}
                </p>

                <div className="space-y-4">
                  {/* Category */}
                  <div className="flex items-center gap-3 text-gray-700">
                    <FaFolder className="text-blue-500" />
                    <span className="font-medium">
                      Category:{" "}
                      <span className="text-gray-900">{group.category}</span>
                    </span>
                  </div>

                  {/* Members */}
                  <div className="flex items-center gap-3 text-gray-700">
                    <FaUsers className="text-blue-500" />
                    <span className="font-medium">
                      {group.totalMembers}{" "}
                      <span className="text-gray-900">members</span>
                    </span>
                  </div>

                  {/* Admins */}
                  <div className="flex items-start gap-3 text-gray-700">
                    <FaUserCog className="text-blue-500" />
                    <div>
                      <span className="font-medium">Admins:</span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {group.admins.map((adminId, index) => (
                          <span
                            key={index}
                            className="bg-blue-50 text-blue-700 px-2 py-1 rounded-lg text-sm"
                          >
                            {adminId}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex items-start gap-3 text-gray-700">
                    <FaTags className="text-blue-500" />
                    <div className="flex flex-wrap gap-2">
                      {group.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-800 px-3 py-1 rounded-lg text-sm"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleViewGroup(group)}
                  className="mt-6 w-full bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-all font-medium shadow-sm hover:shadow-md"
                >
                  View Group
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
