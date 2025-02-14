export type UserRole = "admin" | "user" | "manager";
export type UserStatus = "active" | "inactive" | "suspended" | "deleted";

export interface User {
  uid: string; // UUID string
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: UserRole;
  status: UserStatus;
  lastLogin: string; // ISO date string
  loginCount: number;
  profileImage?: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface AuthState {
  auth: AuthResponse | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterUserData {
  username: string;
  password: string;
  email: string;
  firstName?: string;
  lastName?: string;
  profileImage?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
}
