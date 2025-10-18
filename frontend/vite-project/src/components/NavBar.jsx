import { Link } from "react-router";
import './Nav.css'
import { useState } from "react";
import { useEffect } from "react";

function NavBar(){
    const [user,setUser] = useState(null);
   async function checkIfLoggedIn(){
        try{
            const token = localStorage.getItem('jwtToken')
            console.log("trying to get data....")
            const response = await fetch("http://localhost:3003/api/me2",{
                credentials: 'include', // IMPORTANT
                headers: { 
                  'Content-Type': 'application/json',
                  'Authorization': `bearer ${token}`
                },
            })
            const data = await response.json();
            console.log("data:", data)
            if (response.ok){
                setUser(data.user)
            }
            else{
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


    return(<>
    <nav className="navbar">
        <ul>
            <li><Link to="/">Home</Link></li>

            <li><Link to="/blogs">My blogs</Link></li>
            <li><Link to=" ">Create Blog</Link></li>

            {user ? (

                <div className="rightSide">
                <li><Link to="/">Profile</Link></li>
                </div>
            ) :
            (
                <div className="rightSide">
                <li><Link to="/">Login</Link></li>
                <li><Link to="/">Register</Link></li>
                </div>
            )
            }

        </ul>
        
        
        
    </nav></>)
}


export default NavBar;