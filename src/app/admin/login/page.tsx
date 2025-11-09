"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Loader2 } from "lucide-react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (data.success) {
        localStorage.setItem("admin-logged-in", "true");
        router.push("/admin/messages");
      } else {
        setError("Incorrect password");
      }
    } catch {
      setError("Server error, please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <form
        onSubmit={handleLogin}
        className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 w-full max-w-sm"
      >
        <div className="flex justify-center mb-6">
          <Lock className="w-8 h-8 text-[#2CA8E2]" />
        </div>
        <h2 className="text-xl font-semibold text-center mb-4 text-gray-900 dark:text-white">
          Admin Login
        </h2>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter admin password"
          className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2 bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-[#2CA8E2] outline-none"
          required
        />

        {error && (
          <p className="text-red-500 text-sm text-center mt-2">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full bg-[#2CA8E2] text-white rounded-lg py-2 font-medium flex items-center justify-center hover:bg-[#1f91c7] transition"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" /> Logging in...
            </>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
}
