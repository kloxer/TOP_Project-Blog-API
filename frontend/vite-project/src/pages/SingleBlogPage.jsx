import { useParams, useNavigate, data } from 'react-router-dom';
import { useEffect, useState } from 'react';

function SingleBlogPage(){
    const {id} = useParams();
    console.log(id);
    const [message, setMessage] = useState("");
    const [blog, setBlog] = useState(null);



    const [name, setName] = useState("");
    const [comment, setComment] = useState("");

    const [allComments, setallComments] = useState([]);



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

    const [CommentSubmissionResponse,   setCommentSubmissionResponse] = useState("")

    async function submitComment(e){

        e.preventDefault()
        try{
   
      const response = await fetch(`http://localhost:3003/blogs/${id}/comments`, {
        method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
        body: JSON.stringify({name, comment})
      });


      const data = await response.json();
      if (response.ok){
        setCommentSubmissionResponse(data.message)
        getBlog();
      }
      else{
         setCommentSubmissionResponse(data.message)

      }

    }
    catch(err){
        console.log(err)
    }
    }




    if (!blog){
        return(<>Loading...</>)
    }
    return(<>
    
    <h1>Title: {blog.title} </h1>
    <p></p>
    <p>{blog.content} </p>


        {blog.comment && blog.comment.length > 0 ? (
            <div>
                <h3>Comments</h3>
                {blog.comment.map((c) => (

                    <div>
                        <p>{c.name} says: {c.content}</p>
                    </div>
                ))}
            </div>
        ) : (
            <p>No comments yet. </p>
        )
        
        }
<h3>Submit a comment</h3>
    <form onSubmit={submitComment}>

        <input type="text" name="name" onChange={e=>setName(e.target.value)}/>Name

        <input type="text" name="comment"  onChange={e=>setComment(e.target.value)} />Comment

        <button>Submit</button>

    </form>
    {CommentSubmissionResponse}
    </>)
}

export default SingleBlogPage