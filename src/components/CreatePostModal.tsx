// src/components/CreatePostModal.tsx

"use client";

import { useState, useEffect } from "react";
import Editor from "@/components/Editor";
import axios from "axios";


interface CreatePostModalProps {
    isOpen: boolean;
    onClose: () => void;
    groupId?: string | null;
    post?: any;
    onSave: () => void | Promise<void>;
  }

const postTargetOptions = [
  { type: "everyone", value: "everyone", label: "Everyone" },
];

export default function CreatePostModal({
    isOpen,
    onClose,
    groupId,
    post,
    onSave,
  }: CreatePostModalProps) {
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        target: { type: "everyone", value: "everyone" },
        mediaUrl: "",
      });
      const [loading, setLoading] = useState(false);

      useEffect(() => {
        if (post) {
            console.log("Post prop:", post);
          setFormData({
            title: post.title,
            content: post.content,
            target: post.target || { type: "everyone", value: "everyone" },
            mediaUrl: post.mediaUrl || "",
          });
        }else{
            setFormData({
                title: "",
                content: "",
                target: { type: "everyone", value: "everyone" },
                mediaUrl: "",
              });
        }
      }, [post])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        title: formData.title,
        content: formData.content, 
        mediaUrl: formData.mediaUrl,
        groupId,
      };

      const url = post?.id
        ? `https://s-connect-backend-2.onrender.com/api/group/groups/posts/${post.id}`
        : "https://s-connect-backend-2.onrender.com/api/group/post";

      const method = post?.id ? "put" : "post";

      await axios[method](url, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")?.replace(/"/g, "")}`,
        },
      });

      onSave();
      onClose();
    } catch (error) {
      console.error("Error saving post:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-2xl p-6">
        <h2 className="text-xl font-bold mb-4">
          {post ? "Edit Post" : "Create Post"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Post Title"
            className="w-full p-2 border rounded"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />


          {/* Hidden Dropdown */}
          <select
            className="hidden"
            value={formData.target.value || "everyone"}
            onChange={(e) =>
              setFormData({
                ...formData,
                target: {
                  type: e.target.value === "everyone" ? "everyone" : "group",
                  value: e.target.value,
                },
              })
            }
          >
            {postTargetOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <div className="border rounded">
            <Editor
              content={formData.content}
              onChange={(content) => setFormData({ ...formData, content })}
            />
          </div>

          <input
            type="url"
            placeholder="Media URL (optional)"
            className="w-full p-2 border rounded"
            value={formData.mediaUrl}
            onChange={(e) => setFormData({ ...formData, mediaUrl: e.target.value })}
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}