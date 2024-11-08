// src/store/slices/userSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_BASE_URL from "../../config";
import { getWithExpiry } from "../../utils/withExpiry";

export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const token = getWithExpiry("userToken");
      if (!token) {
        console.error("Token absent ou expiré.");
        return rejectWithValue("Token expired. Please log in again.");
      }

      const response = await axios.get(`${API_BASE_URL}/user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data.body;
    } catch (error) {
      console.error("Erreur lors de la récupération du profil :", error);
      return rejectWithValue(
        error.response ? error.response.data.message : "Erreur lors de la récupération du profil"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    userProfile: null, // Initialiser à null pour éviter l'accès à undefined
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userProfile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
