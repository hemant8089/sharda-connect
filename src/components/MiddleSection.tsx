// src/components/MiddleSection.tsx
"use client";

import { useState, useEffect } from "react";

export default function MiddleSection() {
  // Dummy Posts (Replace with backend data later)
  const [posts, setPosts] = useState([
    {
      id: "1",
      title: "New AI Course at Sharda!",
      content:
        "We are excited to introduce a new Artificial Intelligence course starting this semester.",
      author: "Superadmin",
      likes: 12,
      comments: 5,
      shares: 3,
    },
    {
      id: "2",
      title: "Tech Fest 2024",
      content:
        "Join us for Sharda's biggest tech event of the year! Registrations are open.",
      author: "Superadmin",
      likes: 25,
      comments: 10,
      shares: 8,
    },
    {
      id: "3",
      title: "AI Hackathon",
      content: "Registrations open!",
      author: "Superadmin",
      likes: 50,
      comments: 20,
      shares: 15,
    },
  ]);

  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setRole(localStorage.getItem("user-role"));
    }
  }, []);

  const handleLike = (postId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  return (
    <main className="flex-1 overflow-y-auto px-6 py-4">
      <h2 className="text-lg font-semibold text-blue-600 mb-4">
        📢 Latest Posts
      </h2>

      {posts.map((post) => (
        <div key={post.id} className="bg-white p-4 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-bold">{post.title}</h3>
          <p className="text-gray-700 mt-2">{post.content}</p>
          <p className="text-sm text-gray-500 mt-2">Posted by {post.author}</p>

          {/* Interaction Buttons */}
          <div className="flex items-center mt-4 space-x-4">
            <button
              onClick={() => handleLike(post.id)}
              className="text-blue-600 hover:text-blue-800 flex items-center"
            >
              👍 {post.likes}
            </button>
            <button className="text-green-600 hover:text-green-800 flex items-center">
              💬 {post.comments}
            </button>
            <button className="text-yellow-600 hover:text-yellow-800 flex items-center">
              🔄 {post.shares}
            </button>
            <button className="text-red-600 hover:text-red-800 flex items-center">
              🔖 Save
            </button>
            {role === "super_admin" && (
              <button className="text-purple-600">✏️ Edit</button>
            )}
          </div>
        </div>
      ))}
    </main>
  );
}
