"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Cookies from "js-cookie"; // Import js-cookie
// import axios from "axios";

export default function Navbar() {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("auth-storage");
      const cookieToken = Cookies.get("auth-token");
      const userRole = localStorage.getItem("user-role") || ""; // Ensure it's not null

      if (storedToken) {
        // console.log("Token from LocalStorage:", storedToken);
        setToken(storedToken);
      } else if (cookieToken) {
        // console.log("Token from Cookies:", cookieToken);
        setToken(cookieToken);
      } else {
        // console.log("No token found.");
        setToken(null);
      }
      setRole(userRole); // Avoid setting null role
    }
  }, []); // Run only once on component mount

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      // Remove all authentication-related data
      localStorage.removeItem("auth-storage");
      localStorage.removeItem("user-role");
      Cookies.remove("auth-token");
      Cookies.remove("isAuthenticated");
      Cookies.remove("userData");

      setToken(null);

      // console.log(
      //   "Tokens after logout:",
      //   localStorage.getItem("auth-storage"),
      //   Cookies.get("auth-token"),
      //   Cookies.get("isAuthenticated"),
      //   Cookies.get("userData")
      // ); // Debugging

      // Force redirect to login page
      router.push("/login");
    }
  };

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
        onClick={() =>
          router.push(
            role === "super_admin"
              ? "/superadmin-dashboard"
              : role === "admin"
              ? "/admin-dashboard"
              : "/dashboard"
          )
        }
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
      {token ? (
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
              className="rounded-full border"
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
                {role === "user" && (
                  <p className="text-gray-500 text-sm">{user.semester}</p>
                )}
                {role && (
                  <p className="text-blue-600 font-semibold">
                    {role.toUpperCase()}
                  </p>
                )}
              </div>
              {/* Links */}
              <ul className="border-t">
                {/* Always Visible Links for Everyone */}
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => router.push("/dashboard/profile")}
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
                  onClick={() =>
                    router.push(
                      role === "super_admin"
                        ? "/superadmin-dashboard"
                        : role === "admin"
                        ? "/admin-dashboard"
                        : "/dashboard"
                    )
                  }
                >
                  Home
                </li>

                {/* Super Admin Exclusive Options */}
                {role === "super_admin" && (
                  <>
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() =>
                        router.push("/superadmin-dashboard/manageGroups")
                      }
                    >
                      Manage Groups
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() =>
                        router.push("/superadmin-dashboard/managePosts")
                      }
                    >
                      Manage Posts
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() =>
                        router.push("/superadmin-dashboard/manageEvents")
                      }
                    >
                      Manage Events
                    </li>
                  </>
                )}

                {/* Logout (For Everyone) */}
                <li
                  className="px-4 py-2 text-red-500 hover:bg-gray-100 cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => router.push("/login")}
          className="text-blue-600 font-semibold"
        >
          Login
        </button>
      )}
    </nav>
  );
}
