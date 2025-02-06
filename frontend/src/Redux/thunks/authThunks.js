import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  AuthStrategyType,
  configureAuthService,
} from "@/services/auth/authConfig";

const authService = configureAuthService(
  AuthStrategyType[import.meta.env.VITE_APP_AUTH_STRATEGY?.toUpperCase()] ||
    AuthStrategyType.MOCK,
  {
    apiUrl: import.meta.env.VITE_PLATFORM_API_URL,
    mockUsers: import.meta.env.VITE_APP_MOCK_USERS
      ? JSON.parse(import.meta.env.VITE_APP_MOCK_USERS)
      : undefined,
  },
);
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      var user = await authService.login(credentials);
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      var user = await authService.logout();
      localStorage.removeItem("user");
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      var user = await authService.register(userData);
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
