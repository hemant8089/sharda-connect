//src/app/superadmin-dashboard/manageGroups/page.tsx
"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaUsers, FaUserCog, FaPlus, FaSearch, FaTags } from "react-icons/fa";
import debounce from "lodash.debounce";
import SuperAdminNavbar from "@/components/Navbar";

interface Group {
  id: number;
  name: string;
  totalMembers: number;
  admins: string[];
  tags: string[];
  description: string;
}

const groups: Group[] = [
  {
    id: 1,
    name: "React Developers",
    totalMembers: 156,
    admins: ["John Doe", "Sarah Wilson"],
    tags: ["frontend", "javascript", "react"],
    description:
      "A group for React enthusiasts to share knowledge and projects.",
  },
  {
    id: 2,
    name: "UI/UX Design",
    totalMembers: 89,
    admins: ["Jane Smith", "Mike Brown"],
    tags: ["design", "user experience", "figma"],
    description: "Discuss and explore UI/UX best practices.",
  },
  {
    id: 3,
    name: "Web Development",
    totalMembers: 234,
    admins: ["Mike Johnson", "Emily Chen", "David Kim"],
    tags: ["frontend", "backend", "fullstack"],
    description: "For developers working on full-stack web applications.",
  },
  {
    id: 4,
    name: "Mobile Development",
    totalMembers: 167,
    admins: ["Sarah Wilson", "Alex Thompson"],
    tags: ["mobile", "react native", "ios", "android"],
    description: "Everything about mobile app development across platforms.",
  },
  {
    id: 5,
    name: "Cybersecurity Experts",
    totalMembers: 120,
    admins: ["Alice Carter", "Robert Miles"],
    tags: ["security", "hacking", "pentesting"],
    description:
      "Discuss the latest trends and best practices in cybersecurity.",
  },
  {
    id: 6,
    name: "Machine Learning",
    totalMembers: 95,
    admins: ["Kevin White", "Samantha Green"],
    tags: ["ai", "ml", "data science"],
    description: "A group dedicated to ML enthusiasts and professionals.",
  },
];

export default function ManageGroups() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredGroups, setFilteredGroups] = useState(groups);
  const [isSearching, setIsSearching] = useState(false);

  const debouncedSearch = useCallback(
    debounce((searchValue: string) => {
      setIsSearching(true);
      const filtered = groups.filter(
        (group) =>
          group.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          group.tags.some((tag) =>
            tag.toLowerCase().includes(searchValue.toLowerCase())
          ) ||
          group.admins.some((admin) =>
            admin.toLowerCase().includes(searchValue.toLowerCase())
          )
      );
      setFilteredGroups(filtered);
      setIsSearching(false);
    }, 300),
    []
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
    return () => debouncedSearch.cancel();
  }, [searchTerm, debouncedSearch]);

  // const handleViewGroup = (group: Group) => {
  //   localStorage.setItem("selectedGroup", JSON.stringify(group));
  //   router.push("/superadmin-dashboard/manageGroups/groupInfo");
  // };

  const handleViewGroup = (group: Group) => {
    router.push(`/superadmin-dashboard/groupInfo?id=${group.id}`);
  };

  const handleCreateGroup = () => {
    alert("Create Group Clicked! (Functionality to be added)");
  };

  return (
    <div className="min-h-screen bg-white text-blue-900">
      <SuperAdminNavbar />

      <div className="max-w-7xl mx-auto p-6 pt-20">
        {/* Header & Search */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold text-blue-700">Manage Groups</h1>
          <div className="flex gap-4 w-full sm:w-auto">
            <div className="relative flex-grow sm:flex-grow-0 sm:min-w-[300px]">
              <input
                type="text"
                placeholder="Search groups, tags, or admins..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white shadow-sm"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <button
              onClick={handleCreateGroup}
              className="flex items-center gap-2 bg-yellow-500 text-white px-6 py-2.5 rounded-lg hover:bg-yellow-600 transition shadow-md"
            >
              <FaPlus /> Create Group
            </button>
          </div>
        </div>

        {/* Group List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map((group) => (
            <div
              key={group.id}
              className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
            >
              <h2 className="text-xl font-semibold text-blue-800 mb-4">
                {group.name}
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-700">
                  <FaUsers className="text-blue-600" />
                  <span className="font-medium">
                    {group.totalMembers} members
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <FaUserCog className="text-green-600" />
                  <div>
                    <span className="font-medium">Admins:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {group.admins.map((admin, index) => (
                        <span
                          key={index}
                          className="bg-green-100 text-green-700 px-2 py-1 rounded-lg text-sm"
                        >
                          {admin}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <FaTags className="text-purple-600" />
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
                className="mt-6 w-full bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition font-medium"
              >
                View Group
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
