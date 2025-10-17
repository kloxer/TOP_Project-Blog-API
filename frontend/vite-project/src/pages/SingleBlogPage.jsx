import { useParams, useNavigate, data } from 'react-router-dom';
import { useEffect, useState } from 'react';

function SingleBlogPage(){
    const {id} = useParams();
    console.log(id);
    const [message, setMessage] = useState("");
    const [blog, setBlog] = useState(null);



    const [name, setName] = useState("");
    const [comment, setComment] = useState("");

    
    async function getBlog(){

        try{
        const token = localStorage.getItem('jwtToken')
      const response = await fetch(`http://localhost:3003/blogs/${id}`, {
        method:'GET',
          headers:{
            'Content-Type':'application/json',
                  'Authorization': `bearer ${token}`
          },
          credentials:'include',
      });
      const data = await response.json()
      if (response.ok){
        setMessage(data.message);
        setBlog(data.blog)
      }
        }
        catch(err){
            console.log(err);
            setMessage(data.message)
        }
    }

    useEffect(()=>{

        getBlog();
    },[])



    async function submitComment(e){

        e.preventDefault()
        alert("hi")
    }
    if (!blog){
        return(<>Loading...</>)
    }
    return(<>
    
    <h1>Title: {blog.title} </h1>
    <p></p>
    <p>{blog.content} </p>


<h3>Submit a comment</h3>
    <form onSubmit={submitComment}>

        <input type="text" name="name" onChange={e=>setName(e.target.value)}/>Name

        <input type="text" name="comment"  onChange={e=>setComment(e.target.value)} />Comment

        <button>Submit</button>

    </form>
    </>)
}

export default SingleBlogPage