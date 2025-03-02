// src/components/GroupMiddleSection.tsx
"use client";

import { useState } from "react";

export default function GroupMiddleSection({ groupId }: { groupId: string }) {
  // Group-specific dummy posts
  const [posts] = useState([
    {
      id: "1",
      title: "AI Club Meeting Update",
      content: "Next meeting will focus on neural networks implementation. Don't forget to bring your laptops!",
      author: "AI Club Admin",
      likes: 23,
      comments: 8,
      shares: 4,
      group: "AI Club"
    },
    {
      id: "2",
      title: "Project Submissions",
      content: "Final date for AI projects submission is 15th March. Late entries won't be accepted.",
      author: "Dr. Smith",
      likes: 45,
      comments: 12,
      shares: 6,
      group: "AI Club"
    },{
        id: "3",
        title: "AI Club Meeting Update",
        content: "Next meeting will focus on neural networks implementation. Don't forget to bring your laptops!",
        author: "AI Club Admin",
        likes: 23,
        comments: 8,
        shares: 4,
        group: "AI Club"
      },{
        id: "4",
        title: "AI Club Meeting Update",
        content: "Next meeting will focus on neural networks implementation. Don't forget to bring your laptops!",
        author: "AI Club Admin",
        likes: 23,
        comments: 8,
        shares: 4,
        group: "AI Club"
      },{
        id: "5",
        title: "AI Club Meeting Update",
        content: "Next meeting will focus on neural networks implementation. Don't forget to bring your laptops!",
        author: "AI Club Admin",
        likes: 23,
        comments: 8,
        shares: 4,
        group: "AI Club"
      },{
        id: "6",
        title: "AI Club Meeting Update",
        content: "Next meeting will focus on neural networks implementation. Don't forget to bring your laptops!",
        author: "AI Club Admin",
        likes: 23,
        comments: 8,
        shares: 4,
        group: "AI Club"
      },{
        id: "7",
        title: "AI Club Meeting Update",
        content: "Next meeting will focus on neural networks implementation. Don't forget to bring your laptops!",
        author: "AI Club Admin",
        likes: 23,
        comments: 8,
        shares: 4,
        group: "AI Club"
      }
  ]);

  return (
    <main className="flex-1 overflow-y-auto px-6 py-4">
      <h2 className="text-lg font-semibold text-blue-600 mb-4">
        🚀 Latest Posts in AI Club
      </h2>

      {posts.map((post) => (
        <div key={post.id} className="bg-white p-4 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-bold">{post.title}</h3>
          <p className="text-gray-700 mt-2">{post.content}</p>
          <p className="text-sm text-gray-500 mt-2">Posted by {post.author}</p>

          <div className="flex items-center mt-4 space-x-4">
            <button className="text-blue-600 hover:text-blue-800 flex items-center">
              👍 {post.likes}
            </button>
            <button className="text-green-600 hover:text-green-800 flex items-center">
              💬 {post.comments}
            </button>
            <button className="text-yellow-600 hover:text-yellow-800 flex items-center">
              🔄 {post.shares}
            </button>
          </div>
        </div>
      ))}
    </main>
  );
}