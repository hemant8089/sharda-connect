//src/app/login/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";

export default function StudentLogin() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Student Login
        </h2>
        <input
          type="email"
          placeholder="Enter Email"
          className="w-full px-4 py-2 border rounded-md mb-4"
        />
        <input
          type="password"
          placeholder="Enter Password"
          className="w-full px-4 py-2 border rounded-md mb-4"
        />
        <Button text="Login" onClick={() => {}} />
        <p className="text-center text-sm text-gray-600 mt-4">
          New to ShardaConnect?{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => router.push("/signup")}
          >
            Signup
          </span>
        </p>
      </div>
    </div>
  );
}
