import { useState, useEffect } from "react"

function Home(){

    const [blogs, setBlogs] = useState(null)
    const [message, setMessage]= useState("")

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
            } else {
                setMessage(data.message)
            }
        }
        catch(err){
            console.log(err)
            setMessage(String(err))
        }
    }

    useEffect(()=>{ getBlogs(); }, [])


    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-8">
            Welcome to the blog page
          </h1>

          <MyBlogs blogs={blogs} />
        </div>
      </div>
    )
}

const MyBlogs = ({ blogs }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.isArray(blogs) && blogs.length > 0 ? (
        blogs.map((blog) => (
          <article
            key={blog.id || blog._id}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col h-full hover:translate-y-[-6px] transition-transform"
          >
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                {blog.title}
              </h2>
            <div className="mt-4 text-center text-sm text-gray-500 italic">
              by {blog.author?.username ?? "Unknown"}
            </div>
            
              <p className="text-gray-700 text-sm leading-relaxed mb-4 max-h-40 overflow-hidden">
                {blog.content}
              </p>
            </div>


          </article>
        ))
      ) : (
        <div className="col-span-full text-gray-500">No blogs found</div>
      )}
    </div>
  );
};
export default Home;