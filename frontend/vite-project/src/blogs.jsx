import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router";
function ShowBlogs(){

    const [blogs, setBlogs] = useState(null)
    const [message, setMessage]= useState("")
    async function getBlogs(){
        try{
             const token = localStorage.getItem('jwtToken')

            console.log("trying to get data....")
            const response = await fetch("http://localhost:3003/blogs",{
                credentials: 'include', // IMPORTANT
                headers: { 
                  'Content-Type': 'application/json',
                  'Authorization': `bearer ${token}`
                },
            })
            const data=  await response.json();
            if (response.ok){
                setBlogs(data.blogs)
                setMessage(data.message)
            }   
            else{
                setMessage(data.message)

            }
        }
        catch(err){
            console.log(err)
            setMessage(err)
        }
    }

    useEffect(()=>{
        getBlogs();
    }, [])
    return (
    <> 
   <h1>blogs!</h1>
        {message}

{!blogs ? (
  <p>No blogs found.</p>
) : (
  blogs.map(blog => (
    <div key={blog.id} className="blog">

      <h2><Link to={blog.id} > {blog.title} </Link></h2>
      <p>content: {blog.content}</p>
    </div>
  ))
)}
    

    <Link to="/profile">Back to profile</Link>

    
    
    </>)
    
}

export default ShowBlogs;