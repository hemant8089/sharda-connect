// src/components/MiddleSection.tsx
"use client";
import { useState, useEffect } from "react";
import PostModal from "@/components/PostModal";
import CommentSection from "@/components/CommentSection";
import { Post, Comment } from "@/types/post";


export default function MiddleSection() {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState<
    Record<string, boolean>
  >({});
  const [role, setRole] = useState<string | null>(null);

  // Dummy posts with enhanced structure
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      title: "New AI Course at Sharda!",
      content:
        "<p>We're excited to introduce a comprehensive <strong>Artificial Intelligence</strong> course starting this semester. The course will cover:</p><ul><li>Machine Learning fundamentals</li><li>Neural networks</li><li>Natural Language Processing</li></ul>",
      authorId: "Superadmin",
      likes: 12,
      comments: [],
      shares: 3,
      mainImg: "/images/ai-course.jpg",
      description: "New AI course announcement with curriculum details",
    },
    {
      id: "2",
      title: "Tech Fest 2024",
      content:
        "Join us for Sharda's biggest tech event of the year! Registrations are open for various competitions including coding challenges and robotics exhibitions.",
      author: "Superadmin",
      likes: 25,
      comments: [],
      shares: 8,
      mainImg: "/images/tech-fest.jpg",
    },
  ]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setRole(localStorage.getItem("user-role"));
    }
  }, []);

  const toggleDescription = (postId: string) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  return (
    <main className="flex-1 overflow-y-auto px-4 md:px-6 py-4 mt-10">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          📢 Latest Announcements
        </h2>

        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-xl shadow-md mb-6 p-6 hover:shadow-lg transition-shadow"
          >
            <div
              className="cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              <h3 className="text-xl font-semibold text-gray-800">
                {post.title}
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                Posted by {post.authorId} • {new Date().toLocaleDateString()}
              </p>
            </div>

            <section className="mb-6">
                {/* {post.description && (
                  <p className="text-lg text-blue-700 mb-4">
                    {post.description}
                  </p>
                )} */}
                {post.mainImg && (
                  <img
                    src={post.mainImg}
                    alt={`${post.title} image`}
                    className="w-full h-auto object-cover rounded-lg border-4 border-yellow-500 mb-4"
                    onError={(e) => {
                      console.error(
                        "Image failed to load in GroupMiddleSection:",
                        post.mainImg
                      );
                    }}
                  />
                )}
                {post.content && (
                  <div className="prose prose-blue">
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                  </div>
                )}
              </section>

            <div className="flex items-center mt-6 pt-4 border-t border-gray-100 gap-4">
              <button
                onClick={() => handleLike(post.id)}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
              >
                <span className="text-xl">👍</span>
                <span>{post.likes}</span>
              </button>
              <button
                onClick={() => setSelectedPost(post)}
                className="flex items-center gap-2 text-gray-600 hover:text-green-600"
              >
                <span className="text-xl">💬</span>
                <span>{post.comments.length}</span>
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-yellow-600">
                <span className="text-xl">🔄</span>
                <span>{post.shares}</span>
              </button>
              {role === "super_admin" && (
                <button className="ml-auto text-purple-600 hover:text-purple-800">
                  ✏️ Edit
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <PostModal
        isOpen={!!selectedPost}
        onClose={() => setSelectedPost(null)}
        post={selectedPost}
        onCommentSubmit={(postId, comment) => {
          // Add comment handling logic here
        }}
      />
    </main>
  );
}
