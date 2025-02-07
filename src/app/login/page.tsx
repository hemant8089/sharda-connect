
"use client";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/store/authSlice";
import { RootState, AppDispatch } from "@/store/index";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface LoginFormInputs {
  email: string;
  password: string;
}

export default function StudentLogin() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { status, error } = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit = async (data: LoginFormInputs) => {
    const response = await dispatch(loginUser({ email: data.email, password: data.password }));

    if (response.meta.requestStatus === "fulfilled") {
      router.push("/dashboard"); // Redirect to dashboard or another page
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Student Login
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email Input */}
          <input
            {...register("email", { required: "Email is required", pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ })}
            type="email"
            placeholder="Enter Email"
            className="w-full px-4 py-2 border rounded-md mb-2"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

          {/* Password Input */}
          <input
            {...register("password", { required: "Password is required", minLength: 6 })}
            type="password"
            placeholder="Enter Password"
            className="w-full px-4 py-2 border rounded-md mb-2"
          />
          {errors.password && <p className="text-red-500 text-sm">Password must be at least 6 characters</p>}

          {/* Login Button */}
          <Button disabled={status === "loading"} >{status === "loading" ? "Logging in..." : "Login"}</Button>

          {/* Error Message */}
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          New to ShardaConnect?{" "}
          <span className="text-blue-600 cursor-pointer hover:underline" onClick={() => router.push("/signup")}>
            Signup
          </span>
        </p>
      </div>
    </div>
  );
}










