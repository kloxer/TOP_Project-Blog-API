import { useState, useEffect } from "react"
import { data, Link } from "react-router"

function Home(){

    const [blogs, setBlogs] = useState(null)
    const [message, setMessage]= useState("")
    const [loading, setLoading] = useState(true)

    const [error, setError] = useState(false)



    async function getBlogs(){
        try{
            const response = await fetch("http://localhost:3003/allblogs",{
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
            })
            const data = await response.json();
            if (response.ok){
                setBlogs(data.blogs)
                setMessage(data.message)
                setLoading(false)

            } else {
                setMessage(data.message)
                setError(true)

            }
        }
        catch(err){
            console.log(err)
            setMessage(String(err))
            setError(true)
        }
    }

    useEffect(()=>{ getBlogs(); }, [])

    if (error){
      return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center py-12 px-4">
          <div className="max-w-xl w-full bg-white border border-red-100 rounded-lg shadow p-6 text-center">
            <div className="text-red-700 text-lg font-semibold mb-2">Something went wrong</div>
            <p className="text-sm text-red-600 mb-4 break-words">{message}</p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => { setError(false); setLoading(true); getBlogs(); }}
                className="px-4 py-2 bg-red-50 text-red-700 border border-red-100 rounded-md hover:bg-red-100"
              >
                Retry
              </button>
              <a
                href="/"
                className="px-4 py-2 bg-gray-50 text-gray-700 border border-gray-100 rounded-md hover:bg-gray-100"
              >
                Home
              </a>
            </div>
          </div>
        </div>
      )
    }
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-8">
            Welcome to the blog page
          </h1>
          {loading ? ( <div className="flex justify-center items-center space-x-2">
                <span>Loading all blogs...</span>
                <div className="w-6 h-6 border-4 border-t-transparent border-indigo-600 border-solid rounded-full animate-spin"></div>
            </div>)
            : 

           (  blogs.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {blogs.map((blog) => (
                    <MyBlog blog={blog} message={message} key={blog.id} />
                  ))}
                  </div>
                  )
                 : ( <div className="col-span-full text-gray-500">No blogs found</div>) 
          
          
          ) }
        </div>
      </div>
    )
}

  const MyBlog = ({ blog , message }) => {
                    
  const formattedDate = new Date(blog.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedTime = new Date(blog.publishedAt).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
  return (
    <div >

          <article
            key={blog.id || blog._id}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col h-full hover:translate-y-[-6px] transition-transform"
          >
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                <Link to={`/${blog.id}`}>{blog.title}</Link>
              </h2>

            <div className="mt-4 text-center text-sm text-gray-500 italic">
              by {blog.author?.username ?? "Unknown"} on {formattedDate} 
            </div>
            
              <p className="text-gray-700 text-sm leading-relaxed mb-4 max-h-40 overflow-hidden">
                {blog.content}
              </p>



            </div>
                <Link
                  to={`/${blog.id}`}
                  className="mt-4 inline-block w-full text-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-500 transition focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  aria-label={`Open article ${blog.title}`}
                >
                  Read article
                </Link>

          </article>
      
    </div>
  );
};
export default Home;