import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../connection";

// Async thunk untuk login
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/users/login`, {
        email,
        password,
      });
      // Simpan token di localStorage
      localStorage.setItem("token", response.data.token);
      return response.data; // Mengembalikan data token dan user info
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  }
);

// Async thunk untuk mengambil profil pengguna setelah login
export const getProfile = createAsyncThunk(
  "auth/getProfile",
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.userToken; // Ambil token dari state

    try {
      const response = await axios.get(`${API_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; // Mengembalikan data profil pengguna
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch profile."
      );
    }
  }
);

// Async thunk untuk signup
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

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    error: null,
    isLoggedIn: !!localStorage.getItem("token"), // Cek token di localStorage
    userToken: localStorage.getItem("token"), // Ambil token dari localStorage
    userInfo: null, // Data pengguna
    isAuthenticated: !!localStorage.getItem("token"), // Status autentikasi
  },
  reducers: {
    logout(state) {
      state.isLoggedIn = false;
      state.userToken = null;
      state.userInfo = null;
      state.isAuthenticated = false;

      // Hapus token dari localStorage
      localStorage.removeItem("token");
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
        state.userToken = action.payload.token; // Ambil token dari response
        state.userInfo = action.payload.user; // Ambil data user jika tersedia
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Profile reducers
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload; // Simpan profil pengguna yang diterima
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Signup reducers
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

export const { logout } = authSlice.actions;

export default authSlice.reducer;
