// src/app/search/page.tsx
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import SuperAdminNavbar from "@/components/Navbar";
import { FaUsers, FaUserCog, FaTags, FaFolder } from "react-icons/fa";

interface Group {
  id: string;
  name: string;
  description: string;
  members: any[];
  category: string;
  tags: string[];
  createdById: string;
}

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch(
          "https://s-connect-backend-2.onrender.com/api/group/groups"
        );
        if (!response.ok) throw new Error("Failed to fetch groups");

        const data = await response.json();
        if (data.success) {
          setGroups(data.data);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGroups();
  }, []);

  const filteredGroups = groups.filter((group) => {
    const lowerQuery = searchQuery.toLowerCase();
    return (
      group.name.toLowerCase().includes(lowerQuery) ||
      group.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
      group.category.toLowerCase().includes(lowerQuery) ||
      group.description.toLowerCase().includes(lowerQuery)
    );
  });

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

  return (
    <div className="min-h-screen bg-gray-50">
      <SuperAdminNavbar />
      <div className="max-w-7xl mx-auto p-6 pt-20">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Search Results for "{searchQuery}"
        </h1>

        {error && (
          <div className="bg-red-50 p-4 rounded-lg border border-red-100 text-red-600 mb-6">
            Error: {error}
          </div>
        )}

        {filteredGroups.length === 0 ? (
          <div className="text-center text-gray-500 text-lg py-12">
            No groups found matching your search
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGroups.map((group) => (
              <div
                key={group.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md p-6 border border-gray-100 transition-all"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {group.name}
                </h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {group.description}
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-700">
                    <FaFolder className="text-blue-500" />
                    <span className="font-medium">
                      Category:{" "}
                      <span className="text-gray-900">{group.category}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-gray-700">
                    <FaUsers className="text-blue-500" />
                    <span className="font-medium">
                      {group.members.length}{" "}
                      <span className="text-gray-900">members</span>
                    </span>
                  </div>

                  {group.tags.length > 0 && (
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
                  )}
                </div>
                <button
                  onClick={() => router.push(`/group/${group.id}`)}
                  className="mt-6 w-full bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-all font-medium shadow-sm hover:shadow-md"
                >
                  View Group
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
