import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router";


function Profile(){
    const [userid, setUserId] = useState('a');
    const [username, setUsername] = useState('b');
    const [email, setEmail] = useState('c');
    const [userPresent, setUserPresent] = useState(false);


    const [user, setUser] = useState(null)
    const [msgTest, setMsgTest] = useState('d');

    async function getUserInfo(){
        try{
            const token = localStorage.getItem('jwtToken')
            const response = await fetch("http://localhost:3003/api/me3",{
                credentials: 'include', // IMPORTANT
                headers: { 'Content-Type': 'application/json' ,
                'Authorization': `bearer ${token}`

                },
            })
            const data = await response.json();
            console.log(data)
            if (response.ok){
                if (data.loggedIn){
               setMsgTest(data.message)
                    setUser(data.user)
                    console.log(data)
                }

                else{
                    setMsgTest(data.message)
                }
            }
            else{
                setMsgTest("error retreieving form server")
            }
            
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{

        getUserInfo();
        // if (user){
        //     setUserPresent(true);
        //     setUserId(user.id);
        //     setUsername(user.username);
        //     setEmail(user.email);
        //}
    }, [])

    return(
    <>

    <div>
        <h2>Welcome to  your profile</h2>
        {msgTest}
        <p>{userid} {username} {email}</p>
        <p>{user}</p>
        <Link to="/">Return home</Link>
        <p>Blawgs</p>
        <Link to="/create">Create a blog</Link>
    </div>
    
    </>

)
}

export default Profile;