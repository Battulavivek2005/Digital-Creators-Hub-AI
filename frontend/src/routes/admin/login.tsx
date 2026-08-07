import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { loginAdmin } from "@/services/authAPI";
import { saveToken } from "@/lib/auth";

export const Route = createFileRoute("/admin/login")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const data = await loginAdmin(email, password);

      if (data.success) {
        saveToken(data.access_token);

        navigate({
          to: "/admin/dashboard",
        });

        return;
      }

      setError(data.message);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Unable to login. Please try again."
      );
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl">

        <h1 className="text-3xl font-bold text-center text-white">
          Admin Login
        </h1>

        <p className="mt-2 text-center text-white/60">
          Digital Creators Hub
        </p>

        <form
          onSubmit={handleLogin}
          className="mt-8 space-y-5"
        >
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-xl border border-white/20 bg-transparent px-4 py-3 text-white outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-xl border border-white/20 bg-transparent px-4 py-3 text-white outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <div className="text-red-400 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}