import { useState } from "react";
import { Link, Navigate } from "react-router";
import useAuth from "../hooks/useAuth";


function LoginPage(){
     const { token , login} = useAuth();
     if (token){
      return <Navigate to="/" replace />
     }

      const [username, setUsername] = useState('');
      const [password, setPassword] = useState('');

      
     async function handleSubmit(e){
        e.preventDefault();  // Prevents form from reloading the page
        try{
        const response = await fetch('http://localhost:3003/users/login', {
          method:'POST',
          credentials: 'include', // IMPORTANT

          headers:{
            'Content-Type':'application/json'
          },
          body: JSON.stringify({username, password}),

        });
        
        const data = await response.json();
        console.log(data)
        if (response.ok){
          const token = data.token;
        //   localStorage.setItem('jwtToken', token);
          console.log(token)

        login(token); //setting the token to authcontext

         //   navigate('/profile');
        }else{
        //   setLoginMsg(data.message);
          console.log(data.message)
        }
      }
    catch(err){
      console.log('Error during login:', err);
      // setError('An error occured while logging in');
    }
  };


return (


        <div className="loginPage">

            <h1>Log in page</h1>
      <form onSubmit={handleSubmit}>
      <h2>Log in</h2>

      <label htmlFor="user">Username 
      <input type="text" name="username"
      onChange={(e)=> setUsername(e.target.value)}/></label>

        <label htmlFor="password">Password 
        <input type="password" name="password" 
        onChange={(e) => setPassword(e.target.value)}
                            /></label>

      <button type="submit" >Log in</button>

      </form>
    <h2> 
      <Link to="/register">Register today</Link>
      </h2>
</div>
)
}

export default LoginPage