// // src/app/superadmin-dashboard/manageGroups/groupInfo/page.tsx
// "use client";

// import { useState, useEffect } from "react";
// import { useSearchParams } from "next/navigation";
// import SuperAdminNavbar from "@/components/Navbar";
// import {
//   FaUsers,
//   FaUserCog,
//   FaTags,
//   FaSearch,
//   FaPlus,
//   FaEdit,
//   FaTrash,
// } from "react-icons/fa";
// import axios from "axios";

// export default function GroupInfo() {
//   const searchParams = useSearchParams();
//   const groupId = searchParams.get("id");
//   interface Group {
//     id: number;
//     name: string;
//     totalMembers: number;
//     admins: { id: number; name: string; position: string; department: string; joiningDate: string; }[];
//     tags: string[];
//     description: string;
//     members: { id: number; name: string; course: string; semester: string; joiningDate: string }[];
//     posts: { id: number; title: string; description: string; author: string; createdAt: string; likes: number }[];
//   }

//   const [group, setGroup] = useState<Group | null>(null);
//   const [activeTab, setActiveTab] = useState("posts");
//   const [userId,setUserId]=useState();
// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YThiZmVhNGNlNjdkYzM4MGY1YzY1ZSIsInJvbGUiOiJTVVBFUl9BRE1JTiIsImlhdCI6MTczOTg5MDMwNCwiZXhwIjoxNzM5ODkzOTA0fQ.3PyxKqBbmQ7zSfu22xpXJdGGiUzX85OyAulhaCjlFW4"
//   const addMember = async() => {
//     const params ={
//       userId,
//       groupId:"67a649e8895b044306f3939e"
//     }
//     //   const response = axios.post("https://s-connect-backend-2.onrender.com/api/group/addMember",params)
//     //   console.log("response add member",response);

// <<<<<<< Updated upstream

//   const [userId,setUserId]=useState();
// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YThiZmVhNGNlNjdkYzM4MGY1YzY1ZSIsInJvbGUiOiJTVVBFUl9BRE1JTiIsImlhdCI6MTczOTg5MDMwNCwiZXhwIjoxNzM5ODkzOTA0fQ.3PyxKqBbmQ7zSfu22xpXJdGGiUzX85OyAulhaCjlFW4"
//   const addMember = async() => {
//     const params ={
//       userId,
//       groupId:"67a649e8895b044306f3939e"
//     }
//     //   const response = axios.post("https://s-connect-backend-2.onrender.com/api/group/addMember",params)
//     //   console.log("response add member",response);

// =======
// >>>>>>> Stashed changes
//     const response = await axios.post(
//       "https://s-connect-backend-2.onrender.com/api/group/addMember",
//       params,
//       {
//           headers: {
// <<<<<<< Updated upstream
//               Authorization: `Bearer ${token}`,
// =======
//               Authorization: Bearer ${token},
// >>>>>>> Stashed changes
//               "Content-Type": "application/json"
//           }
//       }
//   );
//   console.log("Response add member:", response.data);
//   }
// <<<<<<< Updated upstream

// =======

//       if (response.ok) {
//         alert("Member added successfully!");
//         setIsOpen(false);
//         // setUserId("");
//       } else {
//         alert("Failed to add member.");
//         console.log("Payload:", payload);
//       }
//     } catch (error) {
//       console.error("Error adding member:", error);
//       alert("An error occurred.");
//     }
//   };

//   // console.log("iserId",userId);
// >>>>>>> Stashed changes
//   useEffect(() => {
//     const dummyGroup = {
//       id: 1,
//       name: "React Developers",
//       totalMembers: 156,
//       admins: [
//         { id: 1, name: "John Doe", position: "Lead Developer", department: "Engineering", joiningDate: "2022-08-15" },
//         { id: 2, name: "Sarah Wilson", position: "Project Manager", department: "Management", joiningDate: "2021-05-10" }
//       ],
//       tags: ["frontend", "javascript", "react"],
//       description: "A group for React enthusiasts to share knowledge and projects.",
//       members: Array.from({ length: 20 }, (_, i) => ({
//         id: i + 1,
//         name: `Member ${i + 1}`,
//         course: "B.Tech CSE",
//         semester: `Sem ${Math.ceil(Math.random() * 8)}`,
//         joiningDate: "2023-05-12",
//       })),
//       posts: Array.from({ length: 5 }, (_, i) => ({
//         id: i + 1,
//         title: `Post ${i + 1}`,
//         description: "This is a sample post description.",
//         author: "John Doe",
//         createdAt: "2024-06-01",
//         likes: Math.floor(Math.random() * 100),
//       })),
//     };
//     setGroup(dummyGroup);
//   }, []);

//   if (!group) return <div>Loading...</div>; // Prevent hydration mismatch

//   return (
//     <div className="min-h-screen bg-white text-blue-900">
//       <SuperAdminNavbar />
//       <div className="max-w-7xl mx-auto p-6 pt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* Left Side - Group Details */}
//         <div className="min-h-screen bg-white text-blue-900">
//       <SuperAdminNavbar />
//       <div className="max-w-7xl mx-auto p-6 pt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* Left Side - Group Details */}
//         <div className="bg-gray-100 p-6 rounded-lg shadow-md col-span-1 flex flex-col justify-start items-start text-left w-full md:w-80">
//           <h2 className="text-3xl font-bold text-blue-700">{group.name}</h2>
//           <p className="text-gray-700 mt-2">{group.description}</p>
//           <div className="mt-4 space-y-4 w-full">
//             <div className="flex items-center gap-2 text-gray-800">
//               <FaUsers className="text-blue-600" />
//               <span className="flex-1">{group.totalMembers} Members</span>
//             </div>
//             <div className="flex items-center gap-2 text-gray-800">
//               <FaUserCog className="text-green-600" />
//               <span className="flex-1">Admins:</span>
//             </div>
//             <ul className="list-disc list-inside pl-6">
//               {group.admins.map((admin) => (
//                 <li key={admin.name}>{admin.name}</li>
//               ))}
//             </ul>
//             <div className="flex items-center gap-2 text-gray-800">
//               <FaTags className="text-purple-600" />
//               <span className="flex-1">Tags:</span>
//             </div>
//             <div className="flex flex-wrap gap-2 mt-1">
//               {group.tags.map((tag) => (
//                 <span key={tag} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-lg text-sm">
//                   #{tag}
//                 </span>
//               ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Side - Editable Sections */}
//         <div className="col-span-2 bg-white p-6 rounded-lg shadow-md w-full overflow-x-auto">
//           <h2 className="text-2xl font-semibold text-blue-700">Manage Group</h2>
//           <div className="flex gap-4 mt-4 border-b pb-3 flex-wrap">
//             {["posts", "members", "admins", "tags", "description"].map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`px-4 py-2 rounded-md ${activeTab === tab ? "bg-blue-600 text-white" : "bg-gray-200"}`}
//               >
//                 {tab.charAt(0).toUpperCase() + tab.slice(1)}
//               </button>
//             ))}
//           </div>
//           <div className="mt-4">
//             {activeTab === "posts" && (
//               <div>
//                 <div className="flex justify-between mb-4 flex-wrap gap-2">
//                   <input type="text" placeholder="Search posts..." className="border p-2 rounded flex-1" />
//                   <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg">Add Post</button>
//                 </div>
//                 <table className="w-full border-collapse border border-gray-300">
//                   <thead>
//                     <tr className="bg-gray-200">
//                       <th className="border p-2">ID</th>
//                       <th className="border p-2">Title</th>
//                       <th className="border p-2">Author</th>
//                       <th className="border p-2">Created</th>
//                       <th className="border p-2">Likes</th>
//                       <th className="border p-2">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {group.posts.map((post) => (
//                       <tr key={post.id} className="text-center">
//                         <td className="border p-2">{post.id}</td>
//                         <td className="border p-2">{post.title}</td>
//                         <td className="border p-2">{post.author}</td>
//                         <td className="border p-2">{post.createdAt}</td>
//                         <td className="border p-2">{post.likes}</td>
//                         <td className="border p-2 flex justify-center gap-2">
//                           <FaEdit className="text-yellow-500 cursor-pointer" />
//                           <FaTrash className="text-red-500 cursor-pointer" />
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//             {activeTab === "members" && (
//               <div>
//                 <div className="flex justify-between mb-4 flex-wrap gap-2">
//                   <input type="text" placeholder="Search members..." className="border p-2 rounded flex-1" />
//                   {/* <button className="bg-green-500 text-white px-4 py-2 rounded-lg">Add Member</button> */}
//                    <button
//             // onClick={() => setIsOpen(!isOpen)}
//             className="bg-green-500 text-white px-4 py-2 rounded-lg"
//           >
//             Add Member
//           </button>

//           {true && (
//             <div className="absolute mt-2 p-4 bg-white shadow-lg rounded-lg border w-64">
//               <input
//                 type="text"
//                 placeholder="Enter User ID"
//                 value={userId}
//                 onChange={(e) => setUserId(e.target.value)}
//                 className="mb-2 border p-2 rounded w-full"
//               />
//               <button
//                 onClick={handleAddMember}
//                 className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full"
//               >
//                 Confirm
//               </button>
//             </div>
//           )}

//                 </div>
//                 <div>
//                     <input className="border border-black rounded p-3" type="text" onChange={(e:any)=>setUserId(e.target.value)} />
//                   </div>
//                   <button className="bg-green-500 rounded p-3" onClick={addMember}>confirm</button>

//                 <table className="w-full border-collapse border border-gray-300">
//                 <thead>
//                   <tr className="bg-gray-200">
//                     <th className="border p-2">ID</th>
//                     <th className="border p-2">Name</th>
//                     <th className="border p-2">Course & Semester</th>
//                     <th className="border p-2">Joining Date</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {group.members.map((member) => (
//                     <tr key={member.id} className="text-center">
//                       <td className="border p-2">{member.id}</td>
//                       <td className="border p-2">{member.name}</td>
//                       <td className="border p-2">{member.course}, {member.semester}</td>
//                       <td className="border p-2">{member.joiningDate}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//               </div>
//             )}
//             {activeTab === "admins" && (
//               <div>
//                 <div className="flex justify-between mb-4 flex-wrap gap-2">
//                   <input type="text" placeholder="Search admins..." className="border p-2 rounded flex-1" />
//                   <button className="bg-red-500 text-white px-4 py-2 rounded-lg">Add Admin</button>
//                 </div>
//                 <table className="w-full border-collapse border border-gray-300">
//                 <thead>
//                   <tr className="bg-gray-200">
//                     <th className="border p-2">ID</th>
//                     <th className="border p-2">Name</th>
//                     <th className="border p-2">Position</th>
//                     <th className="border p-2">Department</th>
//                     <th className="border p-2">Joining Date</th>
//                     <th className="border p-2">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {group.admins.map((admin) => (
//                     <tr key={admin.id} className="text-center">
//                       <td className="border p-2">{admin.id}</td>
//                       <td className="border p-2">{admin.name}</td>
//                       <td className="border p-2">{admin.position}</td>
//                       <td className="border p-2">{admin.department}</td>
//                       <td className="border p-2">{admin.joiningDate}</td>
//                       <td className="border p-2 flex justify-center gap-2">
//                         <FaTrash className="text-red-500 cursor-pointer" />
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//               </div>
//             )}
//             {activeTab === "tags" && (
//               <div>
//                 <div className="flex justify-between mb-4 flex-wrap gap-2">
//                   <input type="text" placeholder="Enter new tag..." className="border p-2 rounded flex-1" />
//                   <button className="bg-purple-500 text-white px-4 py-2 rounded-lg">Add Tag</button>
//                 </div>
//                 <div className="flex flex-wrap gap-2 mt-1">
//                 {group.tags.map((tag) => (
//                   <span key={tag} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-lg text-sm">
//                     #{tag}
//                   </span>
//                 ))}
//               </div>
//               </div>
//             )}
//             {activeTab === "description" && (
//               <div>
//                 <div className="mb-4">
//                   <input type="text" placeholder="Change Group Name..." className="border p-2 rounded w-full" />
//                   <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2">Confirm</button>
//                 </div>
//                 <div>
//                   <textarea placeholder="Edit group description..." className="border p-2 rounded w-full h-32"></textarea>
//                   <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2">Edit Description</button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

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
} from "react-icons/fa";
import axios from "axios";

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
    author: string;
    createdAt: string;
    likes: number;
  }[];
}

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
        message: "Invalid user ID format"
      });
      return;
    }
  
    try {
      const token = useToken();
      const response = await axios.post(
        "https://s-connect-backend-2.onrender.com/api/group/addMember",
        {
          userId,
          groupId: group.id
        },
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );
  
      if (response.data.success) {
        setStatus({ type: "success", message: "Member added successfully" });
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
          message: "User is already a group member"
        });
      } else {
        setStatus({
          type: "error",
          message: errorMessage || "Failed to add member"
        });
      }
    }
  };

  // Add Admin
  const addAdmin = async () => {
    if (!group) return;
  
    // Clear previous status
    setStatus({ type: "", message: "" });
  
    try {
    //   const token = useToken();
    //   // First check membership
    //   const membershipCheck = await axios.get(
    //     `https://s-connect-backend-2.onrender.com/api/group/is-member/${groupId}/${adminId}`,
    //     {
    //       headers: { Authorization: `Bearer ${token}` }
    //     }
    //   );
  
    //   if (!membershipCheck.data.isMember) {
    //     setStatus({
    //       type: "error",
    //       message: "User must be a member before becoming an admin"
    //     });
    //     return;
    //   }
  
      // Proceed with admin addition
      const result = await handleApiRequest(
        "https://s-connect-backend-2.onrender.com/api/group/addAdmin",
        "post",
        { 
          userId: adminId, 
          groupId: group.id
        }
      );
  
      if (result.success) {
        setStatus({ type: "success", message: "Admin added successfully" });
        await fetchGroupData();
        setTimeout(() => {
          setIsAdminPopupOpen(false);
          setStatus({ type: "", message: "" });
        }, 1500);
      }
    } catch (error: any) {
      setStatus({
        type: "error",
        message: error.response?.data?.message || "Failed to add admin"
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
        message: "Cannot remove the only admin. Add another admin first."
      });
      return;
    }
  
    const confirmDelete = window.confirm("Are you sure you want to remove this admin?");
    if (!confirmDelete) return;
  
    try {
      const token = useToken();
      const response = await axios.post(
        "https://s-connect-backend-2.onrender.com/api/group/removeAdmin",
        {
          userId: userId,
          groupId: group.id
        },
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );
  
      if (response.data.success) {
        setStatus({ type: "success", message: "Admin removed successfully" });
        // Force refresh admin list
      setGroup(prev => prev ? {
        ...prev,
        admins: prev.admins.filter(admin => admin.id !== userId)
      } : null);
    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message;
    if (errorMessage.includes("not admin")) {
      setStatus({
        type: "error",
        message: "This user is not an admin of the group"
      });
    } else {
      setStatus({
        type: "error",
        message: errorMessage || "Failed to remove admin"
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
        headers: { Authorization: `Bearer ${useToken()}` }
      }
    );

    if (response.data.success && response.data.data.length > 0) {
      const apiGroup = response.data.data[0];
      const transformedGroup: Group = {
        ...apiGroup,
        totalMembers: apiGroup.members.length,
        admins: apiGroup.admins.map((admin: any) => ({
          userId: admin._userId || admin.userId,
          name: admin.name || admin.email?.split('@')[0] || "Admin",
          position: admin.position || "Position",
          department: admin.department || "Department",
          joiningDate: new Date(admin.createdAt).toLocaleDateString()
        })),
        tags: apiGroup.tags || ["community", "collaboration"],
        members: apiGroup.members.map((member: any) => ({
          ...member,
          name: member.name || `Member ${member.id.slice(-4)}`,
          course: member.course || "Course",
          semester: member.semester || "Semester",
          joiningDate: new Date(member.joinedAt).toLocaleDateString()
        })),
        posts: apiGroup.posts?.map((post: any) => ({
          ...post,
          author: post.author || "Author",
          likes: post.likes || 0,
          createdAt: new Date(post.createdAt).toLocaleDateString()
        })) || []
      };
      setGroup(transformedGroup);
    } else {
      setStatus({ type: "error", message: "Group not found" });
      setGroup(null);
    }
  } catch (error) {
    setStatus({ 
      type: "error", 
      message: "Failed to load group data. Please check the group ID." 
    });
    setGroup(null);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
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
      member.id.toLowerCase().includes(searchTerms.members.toLowerCase()) ||
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
                  {group.admins.map((admin) => (
                    <span
                      key={admin.userId}
                      className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-sm"
                    >
                      {admin.name}
                    </span>
                  ))}
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
            {["posts", "members", "admins", "tags", "description"].map(
              (tab) => (
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
              )
            )}
          </div>

          {activeTab === "posts" && (
            <div className="space-y-4">
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
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Add Post
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
                        <td className="p-3">{post.id}</td>
                        <td className="p-3">{post.title}</td>
                        <td className="p-3">{post.author}</td>
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
                      {["ID", "Name", "Course & Semester", "Joining Date"].map(
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
                    {filteredMembers.map((member) => (
                      <tr key={member.id} className="border-t hover:bg-gray-50">
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
                      <tr key={admin.userId} className="border-t hover:bg-gray-50">
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

          {activeTab === "description" && (
            <div className="space-y-4">
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Change Group Name..."
                  className="border p-2 rounded w-full"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-2">
                  Update Name
                </button>
              </div>
              <div>
                <textarea
                  placeholder="Edit group description..."
                  className="border p-2 rounded w-full h-32"
                  defaultValue={group.description}
                ></textarea>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-2">
                  Update Description
                </button>
              </div>
            </div>
          )}

          {/* Popups remain same as your original code */}
        </div>
      </div>
    </div>
  );
}
