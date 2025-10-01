import { useState , useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Link } from "react-router";
import { useNavigate } from 'react-router-dom';


function App() {
  const [count, setCount] = useState(0)
  const [hi, setHi] = useState(null);
  const [username, setUsername] = useState('d');
  const [password, setPassword] = useState('d');

  const [loginMsg, setLoginMsg] = useState('');

  const [user, setUser] = useState('');
  const [logInState, setLogInState] = useState(false);

  async function getData(){
    const response = await fetch("http://localhost:3003/api/");
    const data = await response.json();
    return data;
  }

useEffect(() => {
  async function fetchData() {
    const result = await getData();
    if (result) {
      setHi(result);
    }
  }

  fetchData();
}, []);


  const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();  // Prevents form from reloading the page
        try{
        const response = await fetch('http://localhost:3003/users/login', {
          method:'POST',
          headers:{
            'Content-Type':'application/json',
          },
          body: JSON.stringify({username, password}),
        });
        
        const data = await response.json();
        console.log(data)
        if (response.ok){
          // setLogInState(true);
          // setUser(data.user.username);
          // console.log(data);
          navigate('/profile');
          // setLoginMsg(data.message);
        }else{
          setLoginMsg(data.message);
          // setError(data.message);
        }
      }
    catch(err){
      console.log('Error during login:', err);
      // setError('An error occured while logging in');
    }
  };

  async function logOut(e) {
    e.preventDefault();
    try{
      const response = await fetch('http://localhost:3003/users/logout', {
        method:'POST',
          headers:{
            'Content-Type':'application/json',
          },
          body: JSON.stringify({username}),
      });

      const data = response.json();

      if (response.ok){
        setLogInState(false);
      }
    }
    catch(err){
      console.log(err);
    }

    
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>

      </div>
  <p>{hi}</p>

    {logInState ? 
    <div>
    <p>Logged in as: {user}</p>
    <form onSubmit={logOut}>
      <button>Logout</button>
    </form>
    </div>
    
    :
<div>
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
      <Link to="register">Register today</Link>
      </h2>
</div>

    }

    </>
  )
}

export default App
