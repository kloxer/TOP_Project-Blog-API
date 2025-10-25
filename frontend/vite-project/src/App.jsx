import { useState , useEffect } from 'react'
import reactLogo from './assets/react.svg'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


function App() {
  const [count, setCount] = useState(0)
  const [hi, setHi] = useState('null');
  const [username, setUsername] = useState('d');
  const [password, setPassword] = useState('d');

  const [loginMsg, setLoginMsg] = useState('');

  const [user, setUser] = useState('');
  
  const [logInState, setloginState] = useState(false);

//   async function getData(){
//   const response = await fetch("http://localhost:3003/api/", {
//     credentials: 'include'
//   });
//   const data = await response.json();
//   return data;
// }

// useEffect(() => {
//   async function fetchData() {
//     const result = await getData();
//     if (result) {
//       setHi(result);
//     }
//   }
//   fetchData();
// }, []);


  
   async function checkIfLoggedIn(){

        try{
                const token = localStorage.getItem('jwtToken')

            console.log("trying to get datass....")
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
                setloginState(false);
                console.log("failed to get from server")
            }
            
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        checkIfLoggedIn();
    }, [])


  async function logOut(e) {
    e.preventDefault();
    try{
      const response = await fetch('http://localhost:3003/users/logout', {
        method:'POST',
          headers:{
            'Content-Type':'application/json',
          },
          credentials:'include',
          body: JSON.stringify({username}),
      });

      const data = response.json();

      if (response.ok){
        setloginState(false);
        console.log(data)
        localStorage.removeItem('jwtToken');
      }
    }
    catch(err){
      console.log(err);
    }

    
  }

  return (
    <>
      <div>

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
    <Link to="/profile">Check out profile</Link>
    
    <form onSubmit={logOut}>
      <button>Logout</button>
    </form>
    </div>
    
    :
    <div>
          <Link to="/login">Login here</Link>
    </div>

    }

    </>
  )
}

export default App
