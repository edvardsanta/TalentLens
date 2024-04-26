import { createAsyncThunk } from "@reduxjs/toolkit";
import authenticate from "@/Mock/mockUsers";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      return await new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            const user = authenticate(
              credentials.username,
              credentials.password
            );
            localStorage.setItem("user", JSON.stringify(user));
            resolve(user);
          } catch (error) {
            reject(error);
          }
        }, 1000);
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      localStorage.removeItem("user");
      return null;
    } catch (error) {
      return rejectWithValue("Failed to logout");
    }
  }
);
