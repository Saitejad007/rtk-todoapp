import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  token: "",
  error: false,
  errorMsg: "",
};

export const handleLogin = createAsyncThunk(
  "auth/login",
  async (payload: { email: string; password: string }) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        payload
      );
      localStorage.setItem("token", res.data.token);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

export const handleRegister = createAsyncThunk(
  "auth/register", // Action type
  async (payload: {
    // Payload type
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/register",
        payload
      );
      localStorage.setItem("token", res.data.token);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Additional reducers can be added here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleLogin.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.error = false; // Reset error state on success
        state.errorMsg = "";
      })
      .addCase(handleLogin.rejected, (state, action) => {
        state.token = "";
        state.error = true;
        state.errorMsg = action.error.message || "Login failed"; // Handle cases where action.error is undefined
      })
      .addCase(handleRegister.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.error = false; // Reset error state on success
        state.errorMsg = "";
      })
      .addCase(handleRegister.rejected, (state, action) => {
        state.token = "";
        state.error = true;
        state.errorMsg = action.error.message || "Registration failed"; // Handle cases where action.error is undefined
      });
  },
});

export default authSlice.reducer;
