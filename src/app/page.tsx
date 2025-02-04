//src/app/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          'url("https://images.shiksha.com/mediadata/images/1677138915phpHkDwek.jpeg")',
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent"></div>

      {/* Content Section */}
      <div className="relative z-10 text-center text-white px-6 sm:px-12">
        <h1 className="text-4xl sm:text-5xl mb-8 drop-shadow-xl leading-tight">
          Welcome to{" "}
          <span className="text-yellow-300 font-bold">ShardaConnect</span>
        </h1>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-6">
          <Button
            text="Login"
            onClick={() => router.push("/login")}
            variant="landing"
          />
          <Button
            text="Signup"
            onClick={() => router.push("/signup")}
            variant="landing"
          />
        </div>

        {/* Admin Login Link */}
        <p
          className="text-sm sm:text-base text-blue-200 cursor-pointer hover:text-yellow-300 transition-colors duration-300"
          onClick={() => router.push("/admin-login")}
        >
          Admin Login
        </p>
      </div>
    </div>
  );
}
