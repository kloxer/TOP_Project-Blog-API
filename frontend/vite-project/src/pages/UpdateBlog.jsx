import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAuth from "../hooks/useAuth";
import { useLocation } from 'react-router-dom';
const API_URL = import.meta.env.VITE_API_URL;
function UpdateBlog(){

        const [title, setTitle] = useState("f")
        const [content,setContent] = useState("")
        const [publish, setPublish] = useState(false)
        
        const {id} = useParams();

        const [error, setError] = useState();
          const [saving, setSaving] = useState(false);
        const location = useLocation(); // Get the state passed via Link



        const [blog, setBlog] = useState(null);
        const {token} = useAuth();

        async function getBlogDetails(){


            try{

                    const response = await fetch(`${API_URL}/blogs/${id}`, {
                    method:'get',
                    headers:{
                        'Content-Type':'application/json',
                            'Authorization': `bearer ${token}`
                    },
                    credentials:'include',
                });   
                const data = await response.json()
                if (response.ok){
                    setBlog(data.blog)
                    console.log(data.blog)
                    setTitle(data.blog.title)
                    setPublish(data.blog.published)
                    setContent(data.blog.content)
                }
            
            }
            catch(err){
                console.log(err)
            }
 
        }

        useEffect(()=>{
            getBlogDetails()
        }, [])

        const navigate = useNavigate();

        async function handleSubmit(e){
            e.preventDefault()
                setSaving(true);

            try{
                const response = await fetch(`${API_URL}/blogs/${id}`, {
                    method:'PUT',
                    headers:{
                        'Content-Type':'application/json',
                            'Authorization': `bearer ${token}`
                    },
                    credentials:'include',
                    body: JSON.stringify({title, content, publish})
                });
                if (response.ok){
                    console.log("updated!")
                    navigate("/myBlogs");

                }
                else{

                    console.log("not updated")
                }



            }
            catch(err){
                console.log(err)
            }
            finally {
                setSaving(false);
                }
        }

     return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-lg rounded-xl p-8">
          <header className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Update your blog</h1>
            <p className="text-sm text-gray-500 mt-1">Change your blog in any way you want.</p>
          </header>

          {error && (
            <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-100 rounded-md p-3">
              {error}
            </div>
          )}

        {blog ? 

         (

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
                placeholder="Enter the title"
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
                onClick={()=> setPublish(true)}

                className="inline-flex items-center px-5 py-2.5 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-500 disabled:opacity-60 transition"
              >
                {saving ? "Saving..." : (publish? "Publish Changes": "Publish")}
              </button>

                <button
                type="submit"
                disabled={saving}
                onClick={()=> setPublish(false)}
                className="inline-flex items-center px-5 py-2.5 bg-green-400 text-white font-medium rounded-md hover:bg-green-300 disabled:opacity-60 transition"
              >
                {saving ? "Saving..." : (publish? "Change to draft": "Keep as Draft")}
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
     ) : (
            <div className="flex justify-center items-center space-x-2">
                <span>Loading blog info...</span>
                <div className="w-6 h-6 border-4 border-t-transparent border-indigo-600 border-solid rounded-full animate-spin"></div>
            </div>
            ) }
        </div>
      </div>
    </div>
  );
}

export default UpdateBlog