
import { useState , useEffect } from 'react'

import { Link } from 'react-router';
import { useNavigate } from 'react-router-dom';
// import { C } from 'vitest/dist/chunks/reporters.QZ837uWx.js';

function LogIn(){


      const [username, setUsername] = useState('');
      const [password, setPassword] = useState('');

  const [loginMsg, setLoginMsg] = useState('');

  const [loginState, setloginState] = useState(false);

  const [loading, setLoading] = useState(true);

   async function checkIfLoggedIn(){

        try{
                const token = localStorage.getItem('jwtToken')

            console.log("trying to get data....")
            const response = await fetch("http://localhost:3003/api/me3",{
                credentials: 'include', // IMPORTANT
                headers: { 
                  'Content-Type': 'application/json',
                  'Authorization': `bearer ${token}`
                },
            })
            const data = await response.json();
            console.log("data:", data)
            if (response.ok){
                setloginState(true)
            }
            else{
                console.log("failed to get from server")
            }
            console.log("not OK")
            setLoading(false);
            
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        checkIfLoggedIn();
    }, [])


  const navigate = useNavigate();


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
          localStorage.setItem('jwtToken', token);
          console.log(token)

          navigate('/profile');
        }else{
          setLoginMsg(data.message);
        }
      }
    catch(err){
      console.log('Error during login:', err);
      // setError('An error occured while logging in');
    }
  };

  
if (loading) return(<><p>Loading</p></>)
if (loginState) return (<>
<h2>Already logged in</h2>
<Link to="/"> return back</Link>
</>);

    return(
        <>

        <div>
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
              {loginMsg && 
        <p> {loginMsg}</p>
        }

      </form>
    <h2> 
      <Link to="/register">Register today</Link>
      </h2>
</div>
        
        
        </>
    )
}

export default LogIn;