"use client";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "@/store/authSlice";
import { RootState,AppDispatch } from "@/store/index";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface SignupFormInputs {
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export default function SignupPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { status, error } = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormInputs>();

  const onSubmit = async (data: SignupFormInputs) => {
    if (data.password !== data.confirmPassword) {
      return alert("Passwords do not match");
    }

    const response = await dispatch(registerUser({ email: data.email, password: data.password }));

    if (response.meta.requestStatus === "fulfilled") {
      router.push("/login"); // Redirect on successful signup
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email Input */}
          <input
            {...register("email", { required: "Email is required", pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ })}
            type="email"
            placeholder="Enter University Email"
            className="w-full px-4 py-2 border rounded-md mb-2"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

          {/* Phone Number Input */}
          <input
            {...register("phone", { required: "Phone number is required", minLength: 10, maxLength: 15 })}
            type="tel"
            placeholder="Enter Phone Number"
            className="w-full px-4 py-2 border rounded-md mb-2"
          />
          {errors.phone && <p className="text-red-500 text-sm">Invalid phone number</p>}

          {/* Password Input */}
          <input
            {...register("password", { required: "Password is required", minLength: 6 })}
            type="password"
            placeholder="Enter Password"
            className="w-full px-4 py-2 border rounded-md mb-2"
          />
          {errors.password && <p className="text-red-500 text-sm">Password must be at least 6 characters</p>}

          {/* Confirm Password Input */}
          <input
            {...register("confirmPassword", { required: "Confirm password is required" })}
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-2 border rounded-md mb-2"
          />
          {watch("password") !== watch("confirmPassword") && watch("confirmPassword") && (
            <p className="text-red-500 text-sm">Passwords do not match</p>
          )}

         
          <Button disabled={status === "loading"}>{status === "loading" ? "Signing Up..." : "Signup"}</Button>

          {/* Error Message */}
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <span className="text-blue-600 cursor-pointer hover:underline" onClick={() => router.push("/login")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}















// //src/app/signup/page.tsx
// "use client";

// import { useRouter } from "next/navigation";
// import { Button } from "@/components/Button";

// export default function SignupPage() {
//   const router = useRouter();

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
//           Create an Account
//         </h2>
//         <input
//           type="email"
//           placeholder="Enter University Email"
//           className="w-full px-4 py-2 border rounded-md mb-4"
//         />
//         <input
//           type="tel"
//           placeholder="Enter Phone Number"
//           className="w-full px-4 py-2 border rounded-md mb-4"
//         />
//         <input
//           type="password"
//           placeholder="Enter Password"
//           className="w-full px-4 py-2 border rounded-md mb-4"
//         />
//         <input
//           type="password"
//           placeholder="Confirm Password"
//           className="w-full px-4 py-2 border rounded-md mb-4"
//         />
//         <Button text="Signup" onClick={() => {}} />
//         <p className="text-center text-sm text-gray-600 mt-4">
//           Already have an account?{" "}
//           <span
//             className="text-blue-600 cursor-pointer hover:underline"
//             onClick={() => router.push("/login")}
//           >
//             Login
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// }
