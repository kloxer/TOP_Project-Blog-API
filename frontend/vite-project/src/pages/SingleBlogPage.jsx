import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
const API_URL = import.meta.env.VITE_API_URL;

function SingleBlogPage(){
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState(null);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [allComments, setallComments] = useState(null);

  const [submitting, setSubmitting] = useState(false);

  async function getBlog(){
    setLoading(true);
    try{
      const token = localStorage.getItem('jwtToken');
      const response = await fetch(`${API_URL}/blogs/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `bearer ${token}` : undefined
        },
        credentials: 'include'
      });
      const data = await response.json();
      if (response.ok){
        setBlog(data.blog);
        setallComments(data.blog.comment)
        setMessage("");
        console.log(data.blog.comment)
      } else {
        setMessage(data.message || "Failed to load blog.");
      }
    } catch (err){
      console.error(err);
      setMessage("Network error while loading blog.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getBlog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function submitComment(e){
    e.preventDefault();
    if (!name.trim() || !comment.trim()) {
      setMessage("Name and comment are required.");
      return;
    }
    setSubmitting(true);
    try{
      const response = await fetch(`${API_URL}/blogs/${id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), comment: comment.trim() })
      });
      const data = await response.json();
      if (response.ok){
        setName("");
        setComment("");
        setMessage(data.message || "Comment submitted.");
        // await getBlog();
        setallComments([ data.newComment, ...allComments]);
      } else {
        setMessage(data.message || "Failed to submit comment.");
      }
    } catch (err){
      console.error(err);
      setMessage("Network error while submitting comment.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white px-4 py-12">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white px-4 py-12">
        <div className="text-center">
          <p className="text-gray-700 mb-4">Blog not found.</p>
          <button onClick={() => navigate(-1)} className="px-4 py-2 bg-indigo-600 text-white rounded-md">Go back</button>
        </div>
      </div>
    );
  }

   const formattedDate = new Date(blog.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-6">

        <article className="bg-white shadow rounded-lg p-6">
          <header className="mb-4">
            <h1 className="text-2xl font-semibold text-gray-900">{blog.title}</h1>
            <div className="text-sm text-gray-500 mt-1">created by {blog.author?.username ?? "Unknown"} on {formattedDate}</div>
          </header>

          <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap">
            {blog.content}
          </div>
        </article>


        <section className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Leave a comment</h3>

          {message && (
            <div className="mb-4 text-sm px-4 py-2 rounded-md text-gray-800 bg-yellow-50 border border-yellow-100">
              {message}
            </div>
          )}

          <form onSubmit={submitComment} className="space-y-4">
            <div>
              <label htmlFor="comment-name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                id="comment-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="comment-text" className="block text-sm font-medium text-gray-700 mb-1">Comment</label>
              <textarea
                id="comment-text"
                rows={5}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-y"
                placeholder="Write your comment..."
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 disabled:opacity-60"
              >
                {submitting ? "Submitting..." : "Submit comment"}
              </button>

              <button
                type="button"
                onClick={() => { setName(''); setComment(''); }}
                className="px-3 py-2 bg-gray-50 text-gray-700 rounded-md border border-gray-100 hover:bg-gray-100"
              >
                Reset
              </button>
            </div>
          </form>
        </section>

        <ShowComments allComments={allComments}/>


      </div>
    </div>
  );
}

function ShowComments({allComments}){
  return(
        <section className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-3">Comments</h2>

          {allComments && allComments.length > 0 ? (
            <ul className="space-y-4">
              {allComments.map((c, idx) => (
                <li key={idx} className="border border-gray-100 rounded-md p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-gray-800">{c.name}</div>
                  </div>
                  <p className="mt-2 text-gray-700 text-sm">{c.content}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No comments yet. Be the first to comment.</p>
          )}
        </section>
  )

}
export default SingleBlogPage;