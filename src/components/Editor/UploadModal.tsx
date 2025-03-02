// src/components/Editor/UploadModal.tsx

"use client";

import React, { useState, useRef, useEffect } from "react";

interface UploadModalProps {
  onClose: () => void;
  onUploadUrl: (url: string) => void;
  onSelectFile: (file: File) => void;
}

export default function UploadModal({
  onClose,
  onUploadUrl,
  onSelectFile,
}: UploadModalProps) {
  const [url, setUrl] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleUrlSubmit = () => {
    if (url.trim()) {
      onUploadUrl(url.trim());
      onClose();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onSelectFile(e.target.files[0]);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className="relative bg-white rounded-lg p-6 w-80 shadow-lg"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">Upload Image/Video</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Upload via URL:
          </label>
          <input
            type="text"
            placeholder="Enter URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full border rounded-md p-2"
          />
          <button
            onClick={handleUrlSubmit}
            className="mt-2 w-full bg-blue-600 text-white py-1 rounded-md"
          >
            Upload via URL
          </button>
        </div>
        <hr className="mb-4" />
        <div className="text-center">
          <label className="block text-sm font-medium mb-1">
            Select from device:
          </label>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full bg-green-600 text-white py-1 rounded-md"
          >
            Choose File
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*,video/*,application/pdf"
          />
        </div>
      </div>
    </div>
  );
}
