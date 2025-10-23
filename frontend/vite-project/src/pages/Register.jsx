import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;
function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' | 'error'
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setMessageType("");
    setSaving(true);
    try {
      const response = await fetch(`${API_URL}/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, email }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Successfully registered. Redirecting to login...");
        setMessageType("success");
        setTimeout(() => navigate("/login"), 4000);
      } else {
        setMessage(data.error || "Username or email already in use.");
        setMessageType("error");
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong. Please try again.");
      setMessageType("error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-start justify-center py-16 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2 text-center">Create an account</h1>
        <p className="text-sm text-gray-500 mb-6 text-center">Join and start publishing your thoughts.</p>

        {message && (
          <div
            role="alert"
            className={
              "mb-4 px-4 py-3 rounded-md text-sm border " +
              (messageType === "success"
                ? "bg-green-50 text-green-800 border-green-100"
                : "bg-red-50 text-red-800 border-red-100")
            }
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-900 placeholder-gray-400"
              placeholder="your username"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-900 placeholder-gray-400"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-900 placeholder-gray-400"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 inline-flex justify-center items-center px-4 py-2.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 disabled:opacity-60 transition"
            >
              {saving ? "Creating..." : "Create account"}
            </button>

            <Link to="/" className="px-4 py-2 bg-gray-50 text-gray-700 rounded-md border border-gray-100 hover:bg-gray-100 text-sm">
              Cancel
            </Link>
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account? <Link to="/login" className="text-indigo-600 hover:underline">Log in</Link>
        </div>
      </div>
    </div>
  );
}

export default Register