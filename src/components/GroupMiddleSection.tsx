// src/components/GroupMiddleSection.tsx

"use client";
import { useState, useEffect } from "react";
import PostModal from "@/components/PostModal";
import { Post, Comment } from "@/types/post";

interface GroupData {
  id: string;
  name: string;
  description: string;
  posts: Post[];
}

const mockComments: Comment[] = [
  {
    id: "1",
    content: "Great post! Thanks for sharing.",
    author: { name: "Demo User", email: "demo@example.com" },
    createdAt: new Date().toISOString(),
    replies: [
      {
        id: "1-1",
        content: "You're welcome!",
        author: { name: "Post Author", email: "author@example.com" },
        createdAt: new Date().toISOString(),
        replies: [],
      },
    ],
  },
  {
    id: "2",
    content: "This is really helpful information!",
    author: { name: "Another User", email: "user2@example.com" },
    createdAt: new Date().toISOString(),
    replies: [],
  },
];

export default function GroupMiddleSection({ groupId }: { groupId: string }) {
  const [group, setGroup] = useState<GroupData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState<
    Record<string, boolean>
  >({});
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://s-connect-backend-2.onrender.com/api/group/${groupId}`
        );
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        if (!data.success || !data.data)
          throw new Error("Failed to fetch group data");

        // Map posts and add fallback for createdAt if missing
        const postsWithComments = data.data.posts.map((post: any) => ({
          ...post,
          author: post.authorName || "Unknown",
          createdAt: post.createdAt || new Date().toISOString(),
          likes: post.likes || 0,
          comments: mockComments, // Uses mock comments for now
        }));

        setGroup({ ...data.data, posts: postsWithComments });
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load group data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchGroupData();

    if (typeof window !== "undefined") {
      setRole(localStorage.getItem("user-role"));
    }
  }, [groupId]);

  const toggleDescription = (postId: string) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleLike = (postId: string) => {
    setGroup((prev) => ({
      ...prev!,
      posts: prev!.posts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      ),
    }));
  };

  const handleCommentSubmit = (postId: string, content: string) => {
    const newComment = {
      id: Date.now().toString(),
      content,
      author: { name: "Current User", email: "user@example.com" },
      createdAt: new Date().toISOString(),
      replies: [],
    };
    setGroup((prev) => ({
      ...prev!,
      posts: prev!.posts.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      ),
    }));
  };

  if (loading) return <div className="p-4 text-center">Loading posts...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!group) return <div className="p-4 text-center">Group not found</div>;

  return (
    <main className="flex-1 overflow-y-auto px-6 py-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          🚀 Latest Posts
        </h2>
        {group.posts.length === 0 ? (
          <div className="text-center text-gray-500 py-4">
            No posts found in this group
          </div>
        ) : (
          group.posts.map((post: Post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl shadow-md mb-6 p-6 hover:shadow-lg transition-shadow"
            >
              {/* Post Header */}
              <div
                className="cursor-pointer"
                onClick={() => setSelectedPost(post)}
              >
                <h3 className="text-2xl font-bold text-blue-800 mb-2">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600">
                  Posted by {post.authorId}{" "}
                  {post.createdAt &&
                    `• ${new Date(post.createdAt).toLocaleDateString()}`}
                </p>
              </div>

              {/* Post Content */}
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

              {/* Interaction Buttons */}
              <div className="flex items-center mt-6 pt-4 border-t border-gray-100 gap-4">
                <button
                  onClick={() => handleLike(post.id)}
                  className="flex items-center gap-2 text-blue-800 hover:text-blue-600"
                >
                  <span className="text-xl">👍</span>
                  <span className="font-semibold">{post.likes}</span>
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
          ))
        )}
      </div>

      <PostModal
        isOpen={!!selectedPost}
        onClose={() => setSelectedPost(null)}
        post={selectedPost}
        onCommentSubmit={handleCommentSubmit}
      />
    </main>
  );
}
