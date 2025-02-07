"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Dummy user data (Replace with real user data in future)
  const user = {
    name: "John Doe",
    email: "john.doe@sharda.ac.in",
    semester: "Semester 5",
    profilePic: "/user-placeholder.png", // Placeholder image
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md py-3 px-6 flex justify-between items-center z-50">
      {/* Left: Logo */}
      <h1
        className="text-xl font-bold text-blue-600 cursor-pointer"
        onClick={() => router.push("/dashboard")}
      >
        ShardaConnect
      </h1>

      {/* Center: Search Bar */}
      <div className="relative w-1/2">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Right: User Profile Dropdown */}
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center space-x-2"
        >
          <Image
            src={user.profilePic}
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="hidden md:inline text-gray-700">{user.name}</span>
        </button>

        {/* Dropdown */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-60 bg-white shadow-lg rounded-lg overflow-hidden">
            {/* User Info */}
            <div className="p-4 text-center">
              <Image
                src={user.profilePic}
                alt="User Photo"
                width={60}
                height={60}
                className="rounded-full mx-auto"
              />
              <h3 className="mt-2 font-semibold">{user.name}</h3>
              <p className="text-gray-500 text-sm">{user.email}</p>
              <p className="text-gray-500 text-sm">{user.semester}</p>
            </div>
            {/* Links */}
            <ul className="border-t">
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => router.push("/profile")}
              >
                View Profile
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => router.push("/saved-posts")}
              >
                Saved Posts
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => router.push("/dashboard")}
              >
                Home
              </li>
              <li
                className="px-4 py-2 text-red-500 hover:bg-gray-100 cursor-pointer"
                onClick={() => console.log("Logout function")}
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
