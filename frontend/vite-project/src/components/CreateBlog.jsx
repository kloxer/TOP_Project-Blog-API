import { useEffect } from "react";
import { useState } from "react";
import { Link } from 'react-router';
import useAuth from "../hooks/useAuth";

function CreateBlog(){
    const [title, setTitle] = useState("")
    const [content,setContent] = useState("")
    const [draft, setDraft] = useState(false)
    
    const [loginStatus,setLoginStatus] = useState(false)

    const [blogResponse, setBlogResponse] = useState("");

    const [user,setUser]= useState(null)
   
    const {token} = useAuth();

    async function submitBlogInfo(e){
        e.preventDefault();

        try{
                const response = await fetch("http://localhost:3003/blogs/",{
                    method:'POST',
                credentials: 'include', // IMPORTANT
                headers: { 'Content-Type': 'application/json' ,
                'Authorization': `bearer ${token}`
                },
                body: JSON.stringify({title, content, draft}),

            })    
            const data = await response.json()
            if (response.ok){
                console.log(data)
                setBlogResponse(data.message)

            }    
            else{
                console.log(data)
            setBlogResponse(data.message)

            }
        
        
        }
        catch(err){
            console.log(err)
        }

 
        
    }
    
    return (
    <>
       {/* <p>Logged in as: { user.username} id: { user.id} </p>  */}
        <div className="blog">
            <h2>Blog Page</h2>
                <form onSubmit={submitBlogInfo}>
                    
                    <label htmlFor="blogTitle">Title
                                <input type="text" name="title" onChange={(e)=>setTitle(e.target.value)} />
                    </label>
                    <label htmlFor="Content">Content
                                <textarea name="content" id="1" onChange={(e)=>setContent(e.target.value)}  ></textarea>
                    </label>
                    <label htmlFor="draft">Publish ?  <input type="checkbox" checked={draft} onChange={()=>setDraft(!draft)}/>
                </label>
                    <button>Submit</button>
                </form>
                                {blogResponse}
                        <Link to="/profile">Back to profile</Link>

        </div>
    </>)
}

export default CreateBlog;