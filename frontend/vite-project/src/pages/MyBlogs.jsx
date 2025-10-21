import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MyBlogs(){

    const [blogs, setBlogs] = useState(null)
    const [message, setMessage]= useState("")

    async function getBlogs(){
        try{
             const token = localStorage.getItem('jwtToken')
            const response = await fetch("http://localhost:3003/blogs",{
                credentials: 'include',
                headers: { 
                  'Content-Type': 'application/json',
                  'Authorization': `bearer ${token}`
                },
            })
            const data=  await response.json();
            if (response.ok){
                setBlogs(data.blogs)
                setMessage(data.message || "")
            }   
            else{
                setMessage(data.message || "Failed to fetch")
            }
        }
        catch(err){
            console.log(err)
            setMessage(String(err))
        }
    }

    useEffect(()=>{
        getBlogs();
    }, [])



    async function deleteBlog(id){
      try{
            const token = localStorage.getItem('jwtToken')
            const response = await fetch(`http://localhost:3003/blogs/${id}`, {
                method:'DELETE',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization': `bearer ${token}`
                },
                credentials:'include'
            });
            const data = await response.json()
            if (response.ok){
              setMessage(data.message || "Deleted")
              setBlogs((prevBlogs) => prevBlogs.filter(b => b.id !== id));
            }
            else{
              setMessage(data.message || "Delete failed");
            }

      }
      catch(err){
        console.log(err)
        setMessage(String(err))
      }
    }


    return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">My Blogs</h1>
          <Link to="/create" className="inline-flex items-center px-3 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-500">
            New Blog
          </Link>
        </div>

   

        {!blogs ? (
          <div className="text-center py-12 text-gray-500">No blogs found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map(blog => (
              <article key={blog.id} className="bg-white rounded-lg shadow p-6 flex flex-col h-full">
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">
                    <Link to={`${blog.id}`} className="hover:text-indigo-600">
                      {blog.title}
                    </Link>
                  </h2>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-4 overflow-hidden max-h-28">
                    {blog.content}
                  </p>

                  <div className="text-xs text-gray-500 italic">by {blog.author?.username ?? "Unknown"}</div>
                </div>

                <div className="mt-4 flex gap-2">
                  <Link
                    to={`/myBlogs/${blog.id}/update`}
                    state={blog}
                    className="flex-1 text-center px-3 py-2 bg-yellow-50 text-yellow-700 rounded-md text-sm hover:bg-yellow-100"
                  >
                    Update
                  </Link>

                  <button
                    onClick={() => deleteBlog(blog.id)}
                    className="flex-1 px-3 py-2 bg-red-50 text-red-600 rounded-md text-sm hover:bg-red-100"
                    aria-label={`Delete ${blog.title}`}
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-8">
          <Link to="/" className="text-sm text-indigo-600 hover:underline">Back to home</Link>
        </div>
      </div>
    </>
    )

}

export default MyBlogs;