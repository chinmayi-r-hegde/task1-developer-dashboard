import { createContext, useContext, useState } from "react";
import { mockUser } from "../data/mockData";

const AuthContext = createContext(null);

const USE_MOCK = import.meta.env.VITE_USE_MOCK_DATA === "true";

export function AuthProvider({ children }) {
  // While mock mode is on, we're always "logged in" as the mock user
  // so the dashboard is browsable without a real backend yet.
  const [user, setUser] = useState(USE_MOCK ? mockUser : null);
  const [token, setToken] = useState(USE_MOCK ? "mock-token" : localStorage.getItem("access_token"));

  const login = (userData, accessToken) => {
    setUser(userData);
    setToken(accessToken);
    localStorage.setItem("access_token", accessToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("access_token");
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}