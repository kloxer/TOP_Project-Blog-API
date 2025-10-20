import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import useAuth from "../hooks/useAuth";
import { useLocation } from 'react-router-dom';

function UpdateBlog(){

        const [title, setTitle] = useState("")
        const [content,setContent] = useState("")
        const [draft, setDraft] = useState(false)
        
        const {id} = useParams();
        const {token} = useAuth();

        const location = useLocation(); // Get the state passed via Link
          const blog = location.state; // Use passed state as initial form data
                  console.log(blog)

        async function updateBlog(e){
            e.preventDefault()
            try{
                const response = await fetch(`http://localhost:3003/blogs/${id}`, {
                    method:'PUT',
                    headers:{
                        'Content-Type':'application/json',
                            'Authorization': `bearer ${token}`
                    },
                    credentials:'include',
                    body: JSON.stringify({title, content, draft})
                });
                if (response.ok){
                    console.log("updated!")
                }
                else{
                    console.log("not updated")
                }

            }
            catch(err){
                console.log(err)
            }
        }

    return(<>
    
    <form onSubmit={updateBlog}>
        {blog ? blog.title : <p>hi</p> }
        <label htmlFor="title">Title : <input type="text" onChange={e=> setTitle(e.target.value)}/></label>

        <label htmlFor="Content">Content:  <input type="text"  onChange={e=> setContent(e.target.value)}/></label>
        <label htmlFor="draft">Draft: <input type="checkbox" onChange={e=> setDraft(e.target.value)} /></label>
        <button>Submit</button>
    </form>



    </>)
}

export default UpdateBlog