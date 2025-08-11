"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

type Mode = "login" | "register" | "reset";

export default function EmailAuthForm() {
  const { signInWithEmail, signUpWithEmail, resetPassword } = useAuth();
  const router = useRouter();

  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const clearState = () => {
    setError(null);
    setMessage(null);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      if (mode === "login") {
        if (!email || !password)
          throw new Error("Email and password are required");
        await signInWithEmail(email, password);
        router.push("/dashboard");
      } else if (mode === "register") {
        if (!email || !password)
          throw new Error("Email and password are required");
        await signUpWithEmail(email, password, displayName || undefined);
        setMessage(
          "Registration successful — verification email sent (check your inbox)."
        );
        // Optionally redirect after registration: router.push("/dashboard");
      } else if (mode === "reset") {
        if (!email) throw new Error("Please provide your email");
        await resetPassword(email);
        setMessage("Password reset email sent (check your inbox).");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">
        {mode === "login"
          ? "Sign in"
          : mode === "register"
          ? "Create account"
          : "Reset password"}
      </h2>

      {error && <div className="mb-4 text-red-600">{error}</div>}
      {message && <div className="mb-4 text-green-700">{message}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "register" && (
          <div>
            <label className="block text-sm">Display name (optional)</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full mt-1 p-2 border rounded"
              placeholder="Your name"
            />
          </div>
        )}

        <div>
          <label className="block text-sm">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 p-2 border rounded"
            placeholder="you@example.com"
            required
          />
        </div>

        {mode !== "reset" && (
          <div>
            <label className="block text-sm">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-2 border rounded"
              placeholder="••••••••"
              required={mode === "login" || mode === "register"}
              minLength={6}
            />
          </div>
        )}

        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60"
          >
            {loading
              ? "Please wait..."
              : mode === "login"
              ? "Sign in"
              : mode === "register"
              ? "Register"
              : "Send reset email"}
          </button>

          <div className="text-sm">
            {mode === "login" && (
              <>
                <button
                  type="button"
                  onClick={() => {
                    clearState();
                    setMode("reset");
                  }}
                  className="underline"
                >
                  Forgot?
                </button>
                <span className="mx-2">|</span>
                <button
                  type="button"
                  onClick={() => {
                    clearState();
                    setMode("register");
                  }}
                  className="underline"
                >
                  Create account
                </button>
              </>
            )}

            {mode === "register" && (
              <button
                type="button"
                onClick={() => {
                  clearState();
                  setMode("login");
                }}
                className="underline"
              >
                Back to login
              </button>
            )}

            {mode === "reset" && (
              <button
                type="button"
                onClick={() => {
                  clearState();
                  setMode("login");
                }}
                className="underline"
              >
                Back to login
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
