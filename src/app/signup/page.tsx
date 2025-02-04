//src/app/signup/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";

export default function SignupPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Create an Account
        </h2>
        <input
          type="email"
          placeholder="Enter University Email"
          className="w-full px-4 py-2 border rounded-md mb-4"
        />
        <input
          type="tel"
          placeholder="Enter Phone Number"
          className="w-full px-4 py-2 border rounded-md mb-4"
        />
        <input
          type="password"
          placeholder="Enter Password"
          className="w-full px-4 py-2 border rounded-md mb-4"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full px-4 py-2 border rounded-md mb-4"
        />
        <Button text="Signup" onClick={() => {}} />
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => router.push("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
