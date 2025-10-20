import { Link } from "react-router";
import './Nav.css'
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import useAuth from "../hooks/useAuth";
function NavBar(){
    const [user,setUser] = useState(null);
    const [isLoggedIn, setisLoggedIn] = useState(false);
  const navigate = useNavigate();

     const { logout , loading, token} = useAuth();

//    async function checkIfLoggedIn(token){
//         try{
//             console.log("trying to get data....")
//             const response = await fetch("http://localhost:3003/api/me2",{
//                 credentials: 'include', // IMPORTANT
//                 headers: { 
//                   'Content-Type': 'application/json',
//                   'Authorization': `bearer ${token}`
//                 },
//             })
//             const data = await response.json();
//             console.log("data:", data)
//             if (response.ok){
//                 setUser(data.user)
//                 setisLoggedIn(true)
//             }
//             else{
//                 console.log("failed to get from server")
//                 setisLoggedIn(false)
//             }

//         }
//         catch(err){

//             console.log(err);
//         }

//     }

//     useEffect(()=>{
//             const token = localStorage.getItem('jwtToken')
//             if (token){
//                 setisLoggedIn(true);

//                 checkIfLoggedIn(token);
//             }
//             else{
//                 setisLoggedIn(false)
//             }
//         checkIfLoggedIn();
//     }, [])


   function logOut() {
    // localStorage.removeItem('jwtToken');
    logout(); //from AuthContext
    setUser(null);
    setisLoggedIn(false);
    navigate('/login');

  }

    return(<>
    <nav className="navbar">
        <ul>
            <li><Link to="/">Home</Link></li>

            <li><Link to="/myBlogs">My blogs</Link></li>
            <li><Link to="/create">Create Blog</Link></li>

            {token ? (

                <div className="rightSide">
                <li><Link to="/">Profile</Link></li>
                <li><button onClick={logOut}>Logout</button></li>
                </div>
            ) :
            (
                <div className="rightSide">
                <li><Link to="/login">Login</Link></li>
                </div>
            )
            }

        </ul>
        
        
        
    </nav></>)
}


export default NavBar;