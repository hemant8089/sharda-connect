// src/app/superadmin-dashboard/managePosts/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, Edit2, Trash2, Upload, MessageSquare } from "lucide-react";
import SuperAdminNavbar from "@/components/Navbar";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import axios from "axios";

interface Post {
  id: string;
  title: string;
  content: string;
  mediaUrl?: string;
  target: {
    type: "everyone" | "group";
    value: string;
  };
  createdAt: string;
}

const postTargetOptions = [
  { type: "everyone", value: "everyone", label: "Everyone" },
  { type: "group", value: "Math Group", label: "Math Group" },
  { type: "group", value: "CS Group", label: "CS Group" },
];

// Dummy Data
const initialPosts: Post[] = [
  {
    id: "1",
    title: "Welcome to the New Semester!",
    content:
      "We are excited to kick off another great semester. Here are some important updates...",
    mediaUrl:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80",
    target: { type: "everyone", value: "everyone" },
    createdAt: "2024-03-20T12:00:00Z",
  },
  {
    id: "2",
    title: "Math Study Group Updates",
    content:
      "Here are the key topics we will be covering in our next session...",
    target: { type: "group", value: "Math Group" },
    createdAt: "2024-03-19T15:00:00Z",
  },
  {
    id: "3",
    title: "Programming Tips & Tricks",
    content:
      "Check out these helpful programming tips that will improve your coding skills...",
    mediaUrl:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80",
    target: { type: "group", value: "CS Group" },
    createdAt: "2024-03-18T09:00:00Z",
  },
];

export default function ManagePosts() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [searchTerm, setSearchTerm] = useState("");
  const [newPost, setNewPost] = useState<Partial<Post>>({
    title: "",
    content: "",
    target: { type: "everyone", value: "everyone" },
  });

  console.log("Posts", posts);
const senttoserver =()=>{
  const response = axios.post("http://localhost:5000/api/posts", newPost);
  console.log("Response", response);
}

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.content?.trim()) {
      alert("Post content is required!");
      return;
    }
   console.log("New Post", newPost);
   senttoserver();
    setNewPost({
      title: "",
      content: "",
      target: { type: "everyone", value: "everyone" },
    });
  };

  const handleDelete = (id: string) => {
    setPosts(posts.filter((post:any) => post.id !== id));
  };

  const filteredPosts = posts.length >1 && posts?.filter(
    (post:any) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white text-blue-900">
      <SuperAdminNavbar />

      <div className="max-w-7xl mx-auto p-6 pt-20 space-y-8">
        {/* Page Title */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <MessageSquare className="h-8 w-8 mr-2 text-blue-600" />
            Manage Posts
          </h1>
        </div>

        {/* Create Post Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Create New Post
          </h2>
          <form onSubmit={handleCreatePost} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <input
                type="text"
                required
                placeholder="Post Title"
                value={newPost.title}
                onChange={(e) =>
                  setNewPost({ ...newPost, title: e.target.value })
                }
                className="w-full border p-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
              />

              {/* Target Audience */}
              <select
                value={newPost.target?.value}
                onChange={(e) => {
                  const option = postTargetOptions.find(
                    (opt) => opt.value === e.target.value
                  );
                  if (option)
                    setNewPost({
                      ...newPost,
                      target: {
                        type: option.type as "everyone" | "group",
                        value: option.value,
                      },
                    });
                }}
                className="w-full border p-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
              >
                {postTargetOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Content */}
            <SunEditor                 //use lexical in future
              setOptions={{
                buttonList: [
                  ["formatBlock", "fontSize", "bold", "italic", "underline"],
                  ["align", "list", "image", "video"],
                ],
              }}
              placeholder="Write your post content here..."
              setContents={newPost.content || ""}
              onChange={(content) => setNewPost({ ...newPost, content })}
              setDefaultStyle="width: 100%; height:10rem; border: 1px solid #d1d5db; padding: 8px; border-radius: 6px; box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);"
            />
            

            {/* Media URL */}
            <div className="mt-1 flex rounded-lg shadow-sm">
              <input
                type="url"
                placeholder="Media URL (optional)"
                value={newPost.mediaUrl}
                onChange={(e) =>
                  setNewPost({ ...newPost, mediaUrl: e.target.value })
                }
                className="w-full border p-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
              />
              <button
                type="button"
                className="ml-2 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Upload className="h-4 w-4" />
              </button>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                Create Post
              </button>
            </div>
          </form>
        </div>

        {/* Posts List */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
          {/* Search */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Your Posts</h2>
            <div className="relative">
              <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50"
              />
            </div>
          </div>

          {/* Posts List */}
          <div className="grid gap-6">
            {filteredPosts && filteredPosts.map((post:any) => (
              <div
                key={post.id}
                className="bg-gray-50 rounded-lg p-4 transition-all hover:shadow-md"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {post.title}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <button
                          className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
                          onClick={() => {
                            /* TODO: Implement edit */
                          }}
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          className="p-1 text-gray-500 hover:text-red-600 transition-colors"
                          onClick={() => handleDelete(post.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-3">{post.content}</p>

                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 inline-flex text-sm font-medium rounded-full bg-blue-100 text-blue-800">
                        {
                          postTargetOptions.find(
                            (opt) => opt.value === post.target.value
                          )?.label
                        }
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(post.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Image */}
                {post.mediaUrl && (
                  <div className="mt-4">
                    <Image
                      src={post.mediaUrl}
                      alt={post.title}
                      width={600}
                      height={300}
                      className="rounded-lg w-full h-48 object-cover"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
