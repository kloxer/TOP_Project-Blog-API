import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function CreateBlog() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [publish, setPublish] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const res = await fetch("http://localhost:3003/blogs", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : undefined,
        },
        body: JSON.stringify({ title, content , publish:publish }),
      });
      const data = await res.json();
      if (res.ok) {
        navigate("/myBlogs");
      } else {
        setError(data.message || "Failed to create blog");
      }
    } catch (err) {
      setError(String(err));
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-lg rounded-xl p-8">
          <header className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Create a new blog</h1>
            <p className="text-sm text-gray-500 mt-1">Write something interesting and share it with others.</p>
          </header>

          {error && (
            <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-100 rounded-md p-3">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="A catchy title..."
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                Content
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={10}
                className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-y"
                placeholder="Write your post here..."
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center px-5 py-2.5 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-500 disabled:opacity-60 transition"
              >
                {saving ? "Saving..." : "Publish"}
              </button>

                <button
                type="submit"
                disabled={saving}
                onClick={()=> setPublish(false)}
                className="inline-flex items-center px-5 py-2.5 bg-green-400 text-white font-medium rounded-md hover:bg-green-300 disabled:opacity-60 transition"
              >
                {saving ? "Saving..." : "Save as Draft"}
              </button>

              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-4 py-2 bg-gray-50 text-gray-700 rounded-md border border-gray-100 hover:bg-gray-100"
              >
                Cancel
              </button>

              <div className="ml-auto text-sm text-gray-500">
                {token ? "Posting as authenticated user" : "You may be posting anonymously"}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateBlog;