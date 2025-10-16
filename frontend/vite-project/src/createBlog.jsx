import { useEffect } from "react";
import { useState } from "react";
import { Link } from 'react-router';

function CreateBlogPage(){
    const [title, setTitle] = useState("")
    const [content,setContent] = useState("")
    const [draft, setDraft] = useState(false)
    
    const [loginStatus,setLoginStatus] = useState(false)

    const [blogResponse, setBlogResponse] = useState("");

    const [user,setUser]= useState(null)
    async function getUserInfo(){

        try{
            const token = localStorage.getItem('jwtToken')
            const response = await fetch("http://localhost:3003/api/me3",{
                credentials: 'include', // IMPORTANT
                headers: { 'Content-Type': 'application/json' ,
                'Authorization': `bearer ${token}`

                },
            })
            const data = await response.json();
            console.log(data)
            if (response.ok){
                    setLoginStatus(true)
                     console.log(data)
                     setUser(data.user)
               }
                else{
                    setLoginStatus(false)

                }
            
        }
        catch(err){
            console.log(err);
        }
    }


    useEffect(()=>{
        getUserInfo();
    }, [])


    async function submitBlogInfo(e){
        e.preventDefault();

        console.log("preented", title, content, draft)
        try{
                const token = localStorage.getItem('jwtToken')
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
    if (!loginStatus) return (<> <p>Not logged in or loading...</p></>);
    
    return (
    <>
       <p>Logged in as: { user.username} id: { user.id} </p> 
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

export default CreateBlogPage;