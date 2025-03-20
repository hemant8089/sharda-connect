// src/components/PostModal.tsx

"use client";
import { useState } from "react";
import CommentSection from "@/components/CommentSection";
import { Post } from "@/types/post";

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: Post | null;
  onCommentSubmit: (postId: string, comment: string) => void;
}

export default function PostModal({
  isOpen,
  onClose,
  post,
  onCommentSubmit,
}: PostModalProps) {
  const [commentContent, setCommentContent] = useState("");

  if (!isOpen || !post) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (commentContent.trim()) {
      onCommentSubmit(post.id, commentContent);
      setCommentContent("");
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-95 bg-gray-500 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-8 w-full max-w-6xl mx-4 max-h-[95vh] overflow-y-auto shadow-2xl relative">
        {/* Header Section */}
        <header className="mb-6">
          <h2 className="text-3xl font-bold text-blue-800 mb-2">{post.title}</h2>
          <div className="text-sm text-gray-600">
            Posted by <span className="font-semibold">{post.authorId}</span>
            {post.createdAt && (
              <span> • {new Date(post.createdAt).toLocaleDateString()}</span>
            )}
          </div>
        </header>

        {/* Content Section: description, image, and content */}
        <section className="mb-6">
          {post.description && (
            <p className="text-lg text-blue-700 mb-4">{post.description}</p>
          )}
          {post.mainImg && (
            <img
              src={post.mainImg}
              alt={`${post.title} image`}
              className="w-full h-auto object-cover rounded-lg border-4 border-yellow-500 mb-4"
            />
          )}
          {post.content && (
            <div className="prose prose-blue">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
          )}
        </section>

        {/* Interaction Section: Like and Share */}
        <section className="flex items-center space-x-6 mb-6">
          <button className="flex items-center gap-2 text-blue-800 hover:text-blue-600">
            <span className="text-2xl">👍</span>
            <span className="font-semibold">{post.likes}</span>
          </button>
          <button className="flex items-center gap-2 text-blue-800 hover:text-blue-600">
            <span className="text-2xl">🔄</span>
            <span className="font-semibold">{post.shares}</span>
          </button>
        </section>

        {/* Comments Section */}
        <section className="mb-6">
          <CommentSection comments={post.comments} />
        </section>

        {/* Comment Form */}
        <form onSubmit={handleSubmit}>
          <textarea
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            placeholder="Write a comment..."
            className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:border-blue-500 mb-4"
            rows={3}
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
            >
              Post Comment
            </button>
          </div>
        </form>

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 text-red-950 text-3xl hover:text-yellow-300"
        >
          &times;
        </button>
      </div>
    </div>
  );
}