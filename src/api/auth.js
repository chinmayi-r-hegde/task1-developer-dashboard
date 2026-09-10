import { apiRequest } from "./client";

export const registerUser = (data) =>
  apiRequest("/auth/register", { method: "POST", body: data });

export const loginUser = (data) =>
  apiRequest("/auth/login", { method: "POST", body: data });

export const logoutUser = () =>
  apiRequest("/auth/logout", { method: "POST" });

export const getCurrentUser = () => apiRequest("/users/me");