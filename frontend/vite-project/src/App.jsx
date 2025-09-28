import { useState , useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Link } from "react-router";


function App() {
  const [count, setCount] = useState(0)
  const [hi, setHi] = useState(null);
  const [username, setUsername] = useState('d');
  const [password, setPassword] = useState('d');

  async function getData(){
    const response = await fetch("http://localhost:3000/api/");
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

    async function handleSubmit(e){
        e.preventDefault();  // Prevents form from reloading the page
      console.log(username);
      console.log(password);
        try{
        const response = await fetch('http://localhost:3000/users/', {
          method:'GET',
          headers:{
            'Content-Type':'application/json',
          },
          body: JSON.stringify({username, password}),
        });
        
        const data = await response.json();
        if (response.ok){
          console.log(data.message);
          navigate('/d');
        }else{
          // setError(data.message);
        }
      }
    catch(err){
      console.log('Error during login:', error);
      // setError('An error occured while logging in');
    }
  };

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

<h2> <Link to="register">Register today</Link></h2>

    </>
  )
}

export default App
