import './App.css'
import { useState , useEffect } from 'react'

import { Link } from 'react-router';
function Register(){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
    async function handleSubmit(e){
        e.preventDefault();

        try{
            const response = await fetch('http://localhost:3000/users', {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({username, password, email}),
            });
        
        const data = await response.json();
        if (response.ok){
            console.log("registered")
        }



        }
        catch(err){
        console.log('Error during login:', err);

        }
    }

    return<>

    <h1>Register today!</h1>

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