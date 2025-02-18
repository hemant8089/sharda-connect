// src/app/superadmin-dashboard/manageGroups/groupInfo/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import SuperAdminNavbar from "@/components/Navbar";
import {
  FaUsers,
  FaUserCog,
  FaTags,
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import axios from "axios";

export default function GroupInfo() {
  const searchParams = useSearchParams();
  const groupId = searchParams.get("id");
  interface Group {
    id: number;
    name: string;
    totalMembers: number;
    admins: { id: number; name: string; position: string; department: string; joiningDate: string; }[];
    tags: string[];
    description: string;
    members: { id: number; name: string; course: string; semester: string; joiningDate: string }[];
    posts: { id: number; title: string; description: string; author: string; createdAt: string; likes: number }[];
  }

  const [group, setGroup] = useState<Group | null>(null);
  const [activeTab, setActiveTab] = useState("posts");


  

  const [userId,setUserId]=useState();
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YThiZmVhNGNlNjdkYzM4MGY1YzY1ZSIsInJvbGUiOiJTVVBFUl9BRE1JTiIsImlhdCI6MTczOTg5MDMwNCwiZXhwIjoxNzM5ODkzOTA0fQ.3PyxKqBbmQ7zSfu22xpXJdGGiUzX85OyAulhaCjlFW4"
  const addMember = async() => {
    const params ={
      userId,
      groupId:"67a649e8895b044306f3939e"
    }
    //   const response = axios.post("https://s-connect-backend-2.onrender.com/api/group/addMember",params)
    //   console.log("response add member",response);

    const response = await axios.post(
      "https://s-connect-backend-2.onrender.com/api/group/addMember",
      params,
      {
          headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
          }
      }
  );
  console.log("Response add member:", response.data);
  }


  useEffect(() => {
    const dummyGroup = {
      id: 1,
      name: "React Developers",
      totalMembers: 156,
      admins: [
        { id: 1, name: "John Doe", position: "Lead Developer", department: "Engineering", joiningDate: "2022-08-15" },
        { id: 2, name: "Sarah Wilson", position: "Project Manager", department: "Management", joiningDate: "2021-05-10" }
      ],
      tags: ["frontend", "javascript", "react"],
      description: "A group for React enthusiasts to share knowledge and projects.",
      members: Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        name: `Member ${i + 1}`,
        course: "B.Tech CSE",
        semester: `Sem ${Math.ceil(Math.random() * 8)}`,
        joiningDate: "2023-05-12",
      })),
      posts: Array.from({ length: 5 }, (_, i) => ({
        id: i + 1,
        title: `Post ${i + 1}`,
        description: "This is a sample post description.",
        author: "John Doe",
        createdAt: "2024-06-01",
        likes: Math.floor(Math.random() * 100),
      })),
    };
    setGroup(dummyGroup);
  }, []);

  if (!group) return <div>Loading...</div>; // Prevent hydration mismatch

  return (
    <div className="min-h-screen bg-white text-blue-900">
      <SuperAdminNavbar />
      <div className="max-w-7xl mx-auto p-6 pt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Side - Group Details */}
        <div className="min-h-screen bg-white text-blue-900">
      <SuperAdminNavbar />
      <div className="max-w-7xl mx-auto p-6 pt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Side - Group Details */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md col-span-1 flex flex-col justify-start items-start text-left w-full md:w-80">
          <h2 className="text-3xl font-bold text-blue-700">{group.name}</h2>
          <p className="text-gray-700 mt-2">{group.description}</p>
          <div className="mt-4 space-y-4 w-full">
            <div className="flex items-center gap-2 text-gray-800">
              <FaUsers className="text-blue-600" />
              <span className="flex-1">{group.totalMembers} Members</span>
            </div>
            <div className="flex items-center gap-2 text-gray-800">
              <FaUserCog className="text-green-600" />
              <span className="flex-1">Admins:</span>
            </div>
            <ul className="list-disc list-inside pl-6">
              {group.admins.map((admin) => (
                <li key={admin.name}>{admin.name}</li>
              ))}
            </ul>
            <div className="flex items-center gap-2 text-gray-800">
              <FaTags className="text-purple-600" />
              <span className="flex-1">Tags:</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-1">
              {group.tags.map((tag) => (
                <span key={tag} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-lg text-sm">
                  #{tag}
                </span>
              ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Editable Sections */}
        <div className="col-span-2 bg-white p-6 rounded-lg shadow-md w-full overflow-x-auto">
          <h2 className="text-2xl font-semibold text-blue-700">Manage Group</h2>
          <div className="flex gap-4 mt-4 border-b pb-3 flex-wrap">
            {["posts", "members", "admins", "tags", "description"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-md ${activeTab === tab ? "bg-blue-600 text-white" : "bg-gray-200"}`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          <div className="mt-4">
            {activeTab === "posts" && (
              <div>
                <div className="flex justify-between mb-4 flex-wrap gap-2">
                  <input type="text" placeholder="Search posts..." className="border p-2 rounded flex-1" />
                  <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg">Add Post</button>
                </div>
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border p-2">ID</th>
                      <th className="border p-2">Title</th>
                      <th className="border p-2">Author</th>
                      <th className="border p-2">Created</th>
                      <th className="border p-2">Likes</th>
                      <th className="border p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.posts.map((post) => (
                      <tr key={post.id} className="text-center">
                        <td className="border p-2">{post.id}</td>
                        <td className="border p-2">{post.title}</td>
                        <td className="border p-2">{post.author}</td>
                        <td className="border p-2">{post.createdAt}</td>
                        <td className="border p-2">{post.likes}</td>
                        <td className="border p-2 flex justify-center gap-2">
                          <FaEdit className="text-yellow-500 cursor-pointer" />
                          <FaTrash className="text-red-500 cursor-pointer" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {activeTab === "members" && (
              <div>
                <div className="flex justify-between mb-4 flex-wrap gap-2">
                  <input type="text" placeholder="Search members..." className="border p-2 rounded flex-1" />
                  <button className="bg-green-500 text-white px-4 py-2 rounded-lg">Add Member</button>
                </div>
                <div>
                    <input className="border border-black rounded p-3" type="text" onChange={(e:any)=>setUserId(e.target.value)} />
                  </div>
                  <button className="bg-green-500 rounded p-3" onClick={addMember}>confirm</button>
              
                <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border p-2">ID</th>
                    <th className="border p-2">Name</th>
                    <th className="border p-2">Course & Semester</th>
                    <th className="border p-2">Joining Date</th>
                  </tr>
                </thead>
                <tbody>
                  {group.members.map((member) => (
                    <tr key={member.id} className="text-center">
                      <td className="border p-2">{member.id}</td>
                      <td className="border p-2">{member.name}</td>
                      <td className="border p-2">{member.course}, {member.semester}</td>
                      <td className="border p-2">{member.joiningDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            )}
            {activeTab === "admins" && (
              <div>
                <div className="flex justify-between mb-4 flex-wrap gap-2">
                  <input type="text" placeholder="Search admins..." className="border p-2 rounded flex-1" />
                  <button className="bg-red-500 text-white px-4 py-2 rounded-lg">Add Admin</button>
                </div>
                <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border p-2">ID</th>
                    <th className="border p-2">Name</th>
                    <th className="border p-2">Position</th>
                    <th className="border p-2">Department</th>
                    <th className="border p-2">Joining Date</th>
                    <th className="border p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {group.admins.map((admin) => (
                    <tr key={admin.id} className="text-center">
                      <td className="border p-2">{admin.id}</td>
                      <td className="border p-2">{admin.name}</td>
                      <td className="border p-2">{admin.position}</td>
                      <td className="border p-2">{admin.department}</td>
                      <td className="border p-2">{admin.joiningDate}</td>
                      <td className="border p-2 flex justify-center gap-2">
                        <FaTrash className="text-red-500 cursor-pointer" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            )}
            {activeTab === "tags" && (
              <div>
                <div className="flex justify-between mb-4 flex-wrap gap-2">
                  <input type="text" placeholder="Enter new tag..." className="border p-2 rounded flex-1" />
                  <button className="bg-purple-500 text-white px-4 py-2 rounded-lg">Add Tag</button>
                </div>
                <div className="flex flex-wrap gap-2 mt-1">
                {group.tags.map((tag) => (
                  <span key={tag} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-lg text-sm">
                    #{tag}
                  </span>
                ))}
              </div>
              </div>
            )}
            {activeTab === "description" && (
              <div>
                <div className="mb-4">
                  <input type="text" placeholder="Change Group Name..." className="border p-2 rounded w-full" />
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2">Confirm</button>
                </div>
                <div>
                  <textarea placeholder="Edit group description..." className="border p-2 rounded w-full h-32"></textarea>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2">Edit Description</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}