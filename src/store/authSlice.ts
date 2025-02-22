// src/store/authSlice.ts
// import { syncLocalStorageToCookies } from "@/utils/syncStorage";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

interface User {
  id: string;
  email: string;
  role: "student" | "admin" | "superadmin";
}

interface AuthState {
  user: User | null;
  role: "student" | "admin" | "superadmin" | null;
  token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  role: null,
  token: null,
  status: "idle",
  error: null,
};

// const apiUrl ="http://localhost:8000"
const apiUrl = "https://s-connect-backend-2.onrender.com";

// Async Thunks

export const sendOtp = createAsyncThunk(
  "auth/sendOtp",
  async (
    params: { email: string; password: string; role?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(`${apiUrl}/api/auth/register`, {
        method: "POST",
        body: JSON.stringify(params),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to send OTP");

      return data.message || "OTP sent successfully"; // Always return a string or expected object
    } catch (error: any) {
      return rejectWithValue(error.message || "OTP request failed");
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (
    otpData: { email: string; otp: string; phone: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(`${apiUrl}/api/auth/verifyOtp`, {
        method: "POST",
        body: JSON.stringify(otpData),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "OTP verification failed");
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    userData: { email: string; password: string; role?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/auth/register`,
        userData
      );
      console.log("after login", response);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/auth/login`,
        credentials
      );
      console.log("after login", response);
      if (response.data.success) {
        const { user, token } = response.data;

        // Store authentication data
        localStorage.setItem("auth-storage", JSON.stringify(response.data));
        localStorage.setItem("user-role", user.role);
        Cookies.set("userData", user.role);
        Cookies.set("isAuthenticated", "true");

        return response.data;
      }

      throw new Error("Invalid credentials.");
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const fetchProfile = createAsyncThunk(
  "auth/fetchProfile",
  async (_, { getState, rejectWithValue }) => {
    const state: any = getState();
    try {
      const response = await axios.get("/api/auth/profile", {
        headers: { Authorization: `Bearer ${state.auth.token}` },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Fetching profile failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.role = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.role = action.payload.user.role;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.role = action.payload.user.role;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(fetchProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
