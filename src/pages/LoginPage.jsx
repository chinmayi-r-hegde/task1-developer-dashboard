import { useState } from "react";
import { loginUser, registerUser, getCurrentUser } from "../api/auth";
import { useAuth } from "../context/AuthContext";

export function LoginPage() {
  const { login } = useAuth();
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      if (mode === "register") {
        await registerUser({ name, email, password });
      }
      const tokens = await loginUser({ email, password });
      localStorage.setItem("access_token",tokens.access_token);
      const userData = await getCurrentUser();
      login(userData, tokens.access_token, tokens.refresh_token);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-4">
      <div className="w-full max-w-sm bg-surface border border-border rounded-xl p-6">
        <div className="flex items-center gap-2 mb-6 justify-center">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-white font-display font-bold">P</div>
          <span className="font-display font-semibold text-lg text-primary">Pulse</span>
        </div>

        <div className="flex mb-5 border border-border rounded-lg overflow-hidden">
          <button
            onClick={() => setMode("login")}
            className={`flex-1 py-2 text-sm font-medium transition-colors ${mode === "login" ? "bg-accent text-white" : "text-secondary hover:text-primary"}`}
          >
            Log In
          </button>
          <button
            onClick={() => setMode("register")}
            className={`flex-1 py-2 text-sm font-medium transition-colors ${mode === "register" ? "bg-accent text-white" : "text-secondary hover:text-primary"}`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {mode === "register" && (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              required
              className="border border-border bg-bg rounded-lg px-3 py-2 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-accent/40"
            />
          )}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="border border-border bg-bg rounded-lg px-3 py-2 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            minLength={6}
            className="border border-border bg-bg rounded-lg px-3 py-2 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-accent/40"
          />

          {error && <p className="text-xs text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="bg-accent text-white rounded-lg py-2 text-sm font-medium hover:opacity-90 disabled:opacity-50 mt-1"
          >
            {submitting ? "Please wait..." : mode === "login" ? "Log In" : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}