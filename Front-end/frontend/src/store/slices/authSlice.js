// src/store/slices/authSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setWithExpiry } from "../../utils/withExpiry"; // Pour gérer le token avec expiration
import API_BASE_URL from "../../config";

// Action asynchrone pour authentifier l'utilisateur
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/user/login`, {
        email,
        password,
      });
      const token = response.data.body.token;

      // Stocker le token dans le localStorage avec expiration (par exemple, 1 heure)
      setWithExpiry("userToken", token, 1000 * 60 * 60);

      return token;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data.message : "Erreur de réseau"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    status: "idle",
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("userToken");
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    // Gestion de loginUser
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload; // Mettre à jour l'état avec le token reçu
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
