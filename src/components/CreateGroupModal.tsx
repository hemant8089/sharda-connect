// src/components/CreateGroupModal.tsx
"use client";
import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { FaSpinner, FaTimes } from "react-icons/fa";

interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (groupData: {
    name: string;
    description: string;
    category: string;
    isPublic: boolean;
  }) => Promise<void>;
}

export default function CreateGroupModal({
  isOpen,
  onClose,
  onCreate,
}: CreateGroupModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("CLUB");
  const [isPublic, setIsPublic] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await onCreate({
        name,
        description,
        category,
        isPublic,
      });
      onClose();
    } catch (err) {
      setError("Failed to create group. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
          <Dialog.Title className="text-2xl font-bold mb-6 text-gray-900">
            Create New Group
          </Dialog.Title>

          {error && (
            <div className="text-red-500 text-sm mb-4">Error: {error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Group Name */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Group Name *
              </label>
              <input
                type="text"
                required
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Description *
              </label>
              <textarea
                required
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Category *
              </label>
              <select
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="SECTION">Section</option>
                <option value="CLUB">Club</option>
                <option value="PLACEMENT">Placement</option>
                <option value="PUBLIC">Public</option>
                <option value="UNIVERSAL">Universal</option>
              </select>
            </div>

            {/* Visibility */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Visibility *
              </label>
              <select
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={isPublic ? "PUBLIC" : "PRIVATE"}
                onChange={(e) => setIsPublic(e.target.value === "PUBLIC")}
              >
                <option value="PUBLIC">Public</option>
                <option value="PRIVATE">Private</option>
              </select>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-3 mt-6 border-t pt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
              >
                {isSubmitting && <FaSpinner className="animate-spin" />}
                Create Group
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}