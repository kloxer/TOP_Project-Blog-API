import { useEffect } from "react";
import { useState } from "react";
import { Link, Outlet } from "react-router";

function MyBlogs(){

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
            const data = response.json()
            if (response.ok){
              setMessage(data.message)
              console.log("sucess")

         setBlogs((prevBlogs) => prevBlogs.filter(blog => blog.id !== id));

            }
            else{
              console.log("delete");
            }

      }
      catch(err){
        console.log(err)
      }
    }


    return (
    <> 
   <h1>blogs!</h1>
        {message}

{!blogs ? (
  <p>No blogs found.</p>
) : (
  blogs.map(blog => (

    <div>
      <div key={blog.id} className="blog">
        <h2><Link to={blog.id} > {blog.title} </Link></h2>
        <p>content: {blog.content}</p>

               <Link to={`/myBlogs/${blog.id}/update`} state={blog}>Update</Link>  
              <button  onClick={() => deleteBlog(blog.id)}>delete</button>

      </div>
    </div>
  ))
)}
    

    <Link to="/profile">Back to profile</Link>

    
    
    </>)
    
}


export default MyBlogs;