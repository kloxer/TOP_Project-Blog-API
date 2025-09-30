import './App.css'
import { useState , useEffect } from 'react'

import { Link } from 'react-router';
import { useNavigate } from 'react-router-dom';


function Register(){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

    async function handleSubmit(e){
        e.preventDefault();
        try{
            const response = await fetch('http://localhost:3003/users/signup', {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({username, password, email}),
            });
        
        const data = await response.json();
        if (response.ok){
            setMessage("Sucessfully registered");
            setMessageType("success")
        }
        else{
            setMessage(data.error  || 'Username or email already in use.')
            setMessageType("error")
        }

        }
        catch(err){
            console.log('Error during login:', err);
            setMessage('Something went wrong... please try again')
            setMessageType("error");
        }
    }

    return<>

    <h1>Register today!</h1>


    {message &&
    <p>{message}</p>
    }
    <form onSubmit={handleSubmit}>
        <label htmlFor="">Username:
        <input type="text" name="username" onChange={(e)=> setUsername(e.target.value)} /> </label>

        <label htmlFor="">Email:
        <input type="email" name="email" onChange={(e)=> setEmail(e.target.value)} /></label>

        <label htmlFor="">Password:
        <input type="password" name="password" onChange={(e)=> setPassword(e.target.value)} /></label>

        <button>Submit</button>

    </form>
        <Link to="/">Home</Link>

    </>
}


export default Register