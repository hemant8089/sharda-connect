// src/components/MiddleSection.tsx
"use client";
import { useState, useEffect } from "react";
import PostModal from "@/components/PostModal";
import { Post, Comment } from "@/types/post";


interface MiddleSectionProps {
  groupId?: string; // Define the groupId prop
}


export default function MiddleSection({ groupId }: MiddleSectionProps) {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState<
    Record<string, boolean>
  >({});
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // Add loading state
  const [posts, setPosts] = useState<Post[]>([]); // Add posts state


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        
        const authData = localStorage.getItem("auth-storage");
        if (!authData) {
          console.error("No auth data found");
          return;
        }
  
        const parsedAuth = JSON.parse(authData);
    const token = parsedAuth?.token;
  
        if (!token) {
          console.error("No token found in auth data");
          return;
        }
  
        const response = await fetch("https://s-connect-backend-2.onrender.com/api/group/posts/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const data = await response.json();
        console.log("API Response:", data);
        
        if (data.success) {
          setPosts(data.data);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchPosts();
  }, [groupId]);

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

  if (loading) {
    return <div className="p-4 text-center">Loading posts...</div>;
  }

  return (
    <main className="flex-1 overflow-y-auto px-4 md:px-6 py-4 mt-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {groupId ? "🚀 Latest Posts" : "📢 Latest Announcements"}
        </h2>

        {posts && posts.length === 0 ? (
          <div className="text-center text-gray-500 py-4">
            No posts found
          </div>
        ) : (
          posts.map((post) => (
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
                  Posted by {post.authorId || "Unknown author"} •{" "}
                  {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : "Unknown date"}
                </p>
              </div>

              <section className="mb-6">
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
                  <span>{post.comments?.length}</span>
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
          ))
        )}
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