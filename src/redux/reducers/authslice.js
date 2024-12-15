import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../connection"; // Sesuaikan dengan path API Anda

// Async Thunk: Login
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/users/login`, {
        email,
        password,
      });
      return response.data; // Mengembalikan token dan data user
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  }
);

// Async Thunk: Signup (opsional, jika dibutuhkan)
export const signup = createAsyncThunk(
  "auth/signup",
  async ({ username, email, password, phone }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/users/register`, {
        username,
        email,
        password,
        phone,
      });
      return response.data; // Mengembalikan pesan sukses
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Signup failed. Please try again."
      );
    }
  }
);

// Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    error: null,
    isLoggedIn: false,
    userToken: null, // Token pengguna
    userInfo: null, // Detail pengguna
  },
  reducers: {
    logout(state) {
      state.isLoggedIn = false;
      state.userToken = null;
      state.userInfo = null;
      localStorage.removeItem("userToken"); // Hapus token dari localStorage
    },
    loadUserFromStorage(state) {
      const userToken = localStorage.getItem("userToken");
      const userInfo = localStorage.getItem("userInfo");

      if (userToken && userInfo) {
        state.isLoggedIn = true;
        state.userToken = userToken;
        state.userInfo = JSON.parse(userInfo);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Login reducers
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.userToken = action.payload.token; // Token dari API
        state.userInfo = action.payload.user; // Detail pengguna dari API

        // Simpan token dan detail user ke localStorage
        localStorage.setItem("userToken", action.payload.token);
        localStorage.setItem("userInfo", JSON.stringify(action.payload.user));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Signup reducers (opsional)
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export reducers
export const { logout, loadUserFromStorage } = authSlice.actions;

export default authSlice.reducer;
