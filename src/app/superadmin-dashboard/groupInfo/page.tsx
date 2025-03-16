// src/app/superadmin-dashboard/manageGroups/groupInfo/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import SuperAdminNavbar from "@/components/Navbar";
import {
  FaUsers,
  FaUserCog,
  FaEdit,
  FaTrash,
  FaTags,
  FaSpinner,
  FaCog,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
interface Group {
  id: string;
  name: string;
  totalMembers: number;
  admins: {
    userId: string;
    id: string;
    _userId?: string;
    name: string;
    email?: string;
    position: string;
    department: string;
    joiningDate: string;
  }[];
  tags: string[];
  description: string;
  members: {
    id: string;
    userId: string;
    name: string;
    course: string;
    semester: string;
    joiningDate: string;
  }[];
  posts: {
    id: string;
    title: string;
    description: string;
    author: any;
    createdAt: string;
    likes: number;
  }[];
  category: string;
  isPublic: boolean;
}
import { useParams } from 'next/navigation';
import PostDialog from "@/components/postDialog";
import { Button } from "@headlessui/react";


export default function GroupInfo() {
  const searchParams = useSearchParams();
  const groupId = searchParams.get("id");
  const [group, setGroup] = useState<Group | null>(null);
  const [activeTab, setActiveTab] = useState("posts");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isAdminPopupOpen, setIsAdminPopupOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [adminId, setAdminId] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(true);
  const [searchTerms, setSearchTerms] = useState({
    posts: "",
    admins: "",
    members: "",
    description: "",
  });
  const [openPostDialog, setOpenPostDialog] = useState<boolean>(false);
  const [seletedPostId,setSeletedPostId] = useState("");

  const [groupSettings, setGroupSettings] = useState({
    name: "",
    description: "",
    category: "CLUB",
    isPublic: true,
  });
const router = useRouter();
  const useToken = () => {
    const storedToken = localStorage.getItem("auth-storage");
    return JSON.parse(storedToken || "{}").token;
  };

  const handleApiRequest = async (
    url: string,
    method: "post" | "delete",
    data: any
  ) => {
    const token = useToken();
    try {
      const response = await axios[method](url, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { success: true, data: response.data };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || error.message,
      };
    }
  };

  // Add Member
  const addMember = async () => {
    if (!group) return;

    // Clear previous status
    setStatus({ type: "", message: "" });

    // Validate user ID format
    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
      setStatus({
        type: "error",
        message: "Invalid user ID format",
      });
      return;
    }

    // Check if the user is already a member
    const isAlreadyMember = group.members.some(
      (member) => member.userId === userId
    );

    if (isAlreadyMember) {
      setStatus({
        type: "error",
        message: "User is already a member of the group",
      });
      return;
    }

    try {
      const token = useToken();
      const response = await axios.post(
        "https://s-connect-backend-2.onrender.com/api/group/addMember",
        { userId, groupId: group.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setStatus({ type: "success", message: "Member added successfully" });
        setUserId("");
        // Force refresh group data
        await fetchGroupData();
        setTimeout(() => {
          setIsPopupOpen(false);
          setStatus({ type: "", message: "" });
        }, 1500);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message;
      if (errorMessage.includes("already in group")) {
        setStatus({
          type: "error",
          message: "User is already a group member",
        });
      } else {
        setStatus({
          type: "error",
          message: errorMessage || "Failed to add member",
        });
      }
    }
  };

  // Add Admin
  const addAdmin = async () => {
    if (!group) return;

    // Clear previous status
    setStatus({ type: "", message: "" });

    // Validate admin ID format
    if (!adminId.match(/^[0-9a-fA-F]{24}$/)) {
      setStatus({ type: "error", message: "Invalid user ID format" });
      return;
    }

    try {
      const token = useToken();
      // First check membership
      // const membershipCheck = await axios.get(
      //   `https://s-connect-backend-2.onrender.com/api/group/is-member/${groupId}/${adminId}`,
      //   {
      //     headers: { Authorization: `Bearer ${token}` },
      //   }
      // );

      // if (!membershipCheck.data.isMember) {
      //   setStatus({
      //     type: "error",
      //     message: "User must be a member before becoming an admin",
      //   });
      //   return;
      // }

      // Proceed with admin addition
      const result = await handleApiRequest(
        "https://s-connect-backend-2.onrender.com/api/group/addAdmin",
        "post",
        {
          userId: adminId,
          groupId: group.id,
        }
      );

      if (result.success) {
        setStatus({ type: "success", message: "Admin added successfully" });
        setAdminId(""); // Clear input field
        await fetchGroupData();
        setTimeout(() => {
          setIsAdminPopupOpen(false);
          setStatus({ type: "", message: "" });
        }, 1500);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message;
      setStatus({
        type: "error",
        message: error.response?.data?.message || "Failed to add admin",
      });
    }
  };

  // Remove Admin
  const removeAdmin = async (userId: string) => {
    if (!group) return;

    // Prevent removing last admin
    if (group.admins.length === 1) {
      setStatus({
        type: "error",
        message: "Cannot remove the only admin. Add another admin first.",
      });
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to remove this admin?"
    );
    if (!confirmDelete) return;

    try {
      const token = useToken();
      const response = await axios.post(
        "https://s-connect-backend-2.onrender.com/api/group/removeAdmin",
        {
          userId: userId,
          groupId: group.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setStatus({ type: "success", message: "Admin removed successfully" });
        // Force refresh admin list
        setGroup((prev) =>
          prev
            ? {
                ...prev,
                admins: prev.admins.filter((admin) => admin.userId !== userId),
              }
            : null
        );
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message;
      if (errorMessage.includes("not admin")) {
        setStatus({
          type: "error",
          message: "This user is not an admin of the group",
        });
      } else {
        setStatus({
          type: "error",
          message: errorMessage || "Failed to remove admin",
        });
      }
    }
  };

  // Fetch group data
  const fetchGroupData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://s-connect-backend-2.onrender.com/api/group/groups?id=${groupId}`,
        {
          headers: { Authorization: `Bearer ${useToken()}` },
        }
      );

      if (response.data.success && response.data.data.length > 0) {
        const apiGroup = response.data.data.find((g: any) => g.id === groupId);

        if (!apiGroup) {
          setStatus({ type: "error", message: "Group not found" });
          setGroup(null);
          return;
        }

        const transformedGroup: Group = {
          ...apiGroup,
          totalMembers: apiGroup.members.length,
          admins: apiGroup.admins.map((admin: any) => ({
            userId: admin._userId || admin.userId,
            name: admin.name || admin.email?.split("@")[0] || "Admin",
            position: admin.position || "Position",
            department: admin.department || "Department",
            joiningDate: new Date(admin.createdAt).toLocaleDateString(),
          })),
          tags: apiGroup.tags || ["community", "collaboration"],
          members: apiGroup.members.map((member: any) => ({
            ...member,
            userId: member.userId,
            name: member.name || `Member ${member.id.slice(-4)}`,
            course: member.course || "Course",
            semester: member.semester || "Semester",
            joiningDate: new Date(member.joinedAt).toLocaleDateString(),
          })),
          posts:
            apiGroup.posts?.map((post: any) => ({
              ...post,
              author: post.author || "Author",
              likes: post.likes || 0,
              createdAt: new Date(post.createdAt).toLocaleDateString(),
            })) || [],
        };
        setGroup(transformedGroup);
        setGroupSettings({
          name: transformedGroup.name,
          description: transformedGroup.description,
          category: transformedGroup.category,
          isPublic: transformedGroup.isPublic,
        });
      } else {
        setStatus({ type: "error", message: "Group not found" });
        setGroup(null);
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "Failed to load group data. Please check the group ID.",
      });
      setGroup(null);
    } finally {
      setLoading(false);
    }
  };

  // Handle group update
  const handleGroupUpdate = async () => {
    try {
      const token = useToken();
      const response = await axios.put(
        "https://s-connect-backend-2.onrender.com/api/group/update",
        {
          groupId: group?.id,
          ...groupSettings,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data) {
        setStatus({ type: "success", message: "Group updated successfully" });
        await fetchGroupData();
      }
    } catch (error: any) {
      setStatus({
        type: "error",
        message: error.response?.data?.message || "Failed to update group",
      });
    }
  };
  const [posts, setPosts] = useState<any[]>([]);
 const { id } = useParams()
  const getPosts = async() => {
    try{
   const posts= await axios.post(`https://s-connect-backend-2.onrender.com/api/group/getPosts`, id)
   console.log("Postsjjj", posts.data);
   setPosts(posts.data);
    }
    catch(err){
      console.error(err);
    }
  };
console.log("posts",posts)
  useEffect(() => {
    getPosts()
    fetchGroupData();
  }, [groupId]);



  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <SuperAdminNavbar />
        <div className="max-w-7xl mx-auto p-6 pt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Loading Skeleton */}
          <div className="animate-pulse space-y-4 col-span-1">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-6 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="animate-pulse space-y-4 col-span-2">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-6 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!group) return <div className="text-center p-8">Group not found</div>;

  // Filter functions
  const filteredPosts = group.posts.filter(
    (post) =>
      post.id.toLowerCase().includes(searchTerms.posts.toLowerCase()) ||
      post.title.toLowerCase().includes(searchTerms.posts.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerms.posts.toLowerCase()) ||
      post.createdAt.toLowerCase().includes(searchTerms.posts.toLowerCase())
  );

  const filteredAdmins = group.admins.filter(
    (admin) =>
      admin.userId.toLowerCase().includes(searchTerms.admins.toLowerCase()) ||
      admin.name.toLowerCase().includes(searchTerms.admins.toLowerCase()) ||
      admin.position.toLowerCase().includes(searchTerms.admins.toLowerCase()) ||
      admin.department.toLowerCase().includes(searchTerms.admins.toLowerCase())
  );
  console.log(filteredAdmins);

  const filteredMembers = group.members.filter(
    (member) =>
      member.userId.toLowerCase().includes(searchTerms.members.toLowerCase()) ||
      member.name.toLowerCase().includes(searchTerms.members.toLowerCase()) ||
      (member.course + " " + member.semester)
        .toLowerCase()
        .includes(searchTerms.members.toLowerCase())
  );
  

  return (
    <div className="min-h-screen bg-gray-50">
      <SuperAdminNavbar />
      <div className="max-w-7xl mx-auto p-6 pt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Side - Group Details */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {group.name}
          </h2>
          <p className="text-gray-600 mb-6">{group.description}</p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <FaUsers className="text-blue-500" />
              <span className="text-gray-700">
                {group.totalMembers} Members
              </span>
            </div>
            <div className="flex items-start gap-3">
              <FaUserCog className="text-blue-500 mt-1" />
              <div>
                <p className="text-gray-700 font-medium mb-2">Admins</p>
                <div className="flex flex-wrap gap-2">
                  {group.admins.slice(0, 4).map((admin) => (
                    <span
                      key={admin.userId}
                      className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-sm"
                    >
                      {admin.userId}
                    </span>
                  ))}
                  {group.admins.length > 4 && (
                    <button
                      onClick={() => setActiveTab("admins")}
                      className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-sm hover:bg-blue-100"
                    >
                      +{group.admins.length - 4} more
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FaTags className="text-blue-500 mt-1" />
              <div>
                <p className="text-gray-700 font-medium mb-2">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {group.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Management Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 col-span-2">
          <div className="flex gap-4 mb-6 overflow-x-auto">
            {["posts", "members", "admins", "tags", "settings"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === tab
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {activeTab === "posts" && (
            <div className="space-y-4">
              <PostDialog postId={seletedPostId} openPostDialog={openPostDialog} setOpenPostDialog={setOpenPostDialog}/>
              {/* <Button className="bg-red-400" onClick={()=>setOpenPostDialog(true)}>open</Button> */}
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Search posts..."
                  className="flex-1 p-2 border rounded-lg"
                  value={searchTerms.posts}
                  onChange={(e) =>
                    setSearchTerms({ ...searchTerms, posts: e.target.value })
                  }
                />
                <button 
                
                //  onClick={()=>router.push(`/superadmin-dashboard/manage-post/${groupId}`)} 
                 className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  <Link
                  href={`/superadmin-dashboard/manage-post/${groupId}`}>
                  Add Post
                  </Link>
                  
                </button>
              </div>
              <div className="overflow-x-auto rounded-lg border">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      {[
                        "ID",
                        "Title",
                        "Author",
                        "Created",
                        "Likes",
                        "Actions",
                      ].map((header) => (
                        <th
                          key={header}
                          className="p-3 text-left text-sm font-semibold text-gray-700"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPosts.map((post) => (
                      <tr key={post.id} className="border-t hover:bg-gray-50">
                        <td  onClick={()=>{
                          setSeletedPostId(post.id)
                          setOpenPostDialog(true);
                        }} className="p-3 cursor-pointer">{post.id}</td>
                        <td className="p-3">{post.title}</td>
                        <td className="p-3">{post.author.name || post.author.email }</td>
                        <td className="p-3">{post.createdAt}</td>
                        <td className="p-3">{post.likes}</td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            <button className="text-yellow-600 hover:text-yellow-700">
                              <FaEdit />
                            </button>
                            <button className="text-red-600 hover:text-red-700">
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "members" && (
            <div className="space-y-4">
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Search members..."
                  className="flex-1 p-2 border rounded-lg"
                  value={searchTerms.members}
                  onChange={(e) =>
                    setSearchTerms({ ...searchTerms, members: e.target.value })
                  }
                />
                <button
                  onClick={() => {
                    setIsPopupOpen(true);
                    setStatus({ type: "", message: "" });
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Member
                </button>
              </div>
              <div className="overflow-x-auto rounded-lg border">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      {[
                        "User ID",
                        "Name",
                        "Course & Semester",
                        "Joining Date",
                      ].map((header) => (
                        <th
                          key={header}
                          className="p-3 text-left text-sm font-semibold text-gray-700"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMembers.map((member) => (
                      <tr
                        key={member.userId}
                        className="border-t hover:bg-gray-50"
                      >
                        <td className="p-3">{member.userId}</td>
                        <td className="p-3">{member.name}</td>
                        <td className="p-3">
                          {member.course}, {member.semester}
                        </td>
                        <td className="p-3">{member.joiningDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {isPopupOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-xl p-6 w-full max-w-md">
                <h3 className="text-xl font-bold mb-4">Add New Member</h3>
                <input
                  type="text"
                  placeholder="Enter User ID"
                  className="w-full p-2 mb-4 border rounded-lg"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                />
                {status.message && (
                  <div
                    className={`mb-4 p-2 rounded-lg ${
                      status.type === "success"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {status.message}
                  </div>
                )}
                <div className="flex gap-4 justify-end">
                  <button
                    onClick={() => {
                      setIsPopupOpen(false);
                      setStatus({ type: "", message: "" });
                    }}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={addMember}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                  >
                    {status.type === "success" ? (
                      <FaSpinner className="animate-spin" />
                    ) : (
                      "Add Member"
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "admins" && (
            <div className="space-y-4">
              {/* Add status message display here */}
              {status.message && (
                <div
                  className={`p-2 rounded-lg ${
                    status.type === "success"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {status.message}
                </div>
              )}
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Search admins..."
                  className="flex-1 p-2 border rounded-lg"
                  value={searchTerms.admins}
                  onChange={(e) =>
                    setSearchTerms({ ...searchTerms, admins: e.target.value })
                  }
                />
                <button
                  onClick={() => {
                    setIsAdminPopupOpen(true);
                    setStatus({ type: "", message: "" });
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Admin
                </button>
              </div>
              <div className="overflow-x-auto rounded-lg border">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      {["Id", "Name", "Position", "Department", "Actions"].map(
                        (header) => (
                          <th
                            key={header}
                            className="p-3 text-left text-sm font-semibold text-gray-700"
                          >
                            {header}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAdmins.map((admin) => (
                      <tr
                        key={admin.userId}
                        className="border-t hover:bg-gray-50"
                      >
                        <td className="p-3">{admin.userId}</td>
                        <td className="p-3">{admin.name}</td>
                        <td className="p-3">{admin.position}</td>
                        <td className="p-3">{admin.department}</td>
                        <td className="p-3">
                          <button
                            onClick={() => removeAdmin(admin.userId)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {isAdminPopupOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-xl p-6 w-full max-w-md">
                <h3 className="text-xl font-bold mb-4">Add New Admin</h3>
                <input
                  type="text"
                  placeholder="Enter User ID"
                  className="w-full p-2 mb-4 border rounded-lg"
                  value={adminId}
                  onChange={(e) => setAdminId(e.target.value)}
                />
                {status.message && (
                  <div
                    className={`mb-4 p-2 rounded-lg ${
                      status.type === "success"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {status.message}
                  </div>
                )}
                <div className="flex gap-4 justify-end">
                  <button
                    onClick={() => {
                      setIsAdminPopupOpen(false);
                      setStatus({ type: "", message: "" });
                    }}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={addAdmin}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                  >
                    {status.type === "success" ? (
                      <FaSpinner className="animate-spin" />
                    ) : (
                      "Add Admin"
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "tags" && (
            <div className="space-y-4">
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Enter new tag..."
                  className="flex-1 p-2 border rounded-lg"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Add Tag
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Group Name
                </label>
                <input
                  type="text"
                  value={groupSettings.name}
                  onChange={(e) =>
                    setGroupSettings({ ...groupSettings, name: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg mb-4"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Group Description
                </label>
                <textarea
                  value={groupSettings.description}
                  onChange={(e) =>
                    setGroupSettings({
                      ...groupSettings,
                      description: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded-lg h-32 mb-4"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Group Visibility
                </label>
                <select
                  value={groupSettings.isPublic ? "PUBLIC" : "PRIVATE"}
                  onChange={(e) =>
                    setGroupSettings({
                      ...groupSettings,
                      isPublic: e.target.value === "PUBLIC",
                    })
                  }
                  className="w-full p-2.5 border rounded-lg"
                >
                  <option value="PUBLIC">Public</option>
                  <option value="PRIVATE">Private</option>
                </select>
              </div>
              <button
                onClick={handleGroupUpdate}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Save Changes
              </button>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Danger Zone
                </h3>
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-sm text-red-700 mb-4">
                    Deleting a group is irreversible. All data, including posts,
                    members, and settings, will be permanently removed.
                  </p>
                  <button
                    onClick={ () => {}} // Add delete group function here
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center gap-2"
                  >
                    <FaTrash />
                    Delete Group
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
