import { useState } from "react";
import { useEffect } from "react";


function Profile(){
    const [userid, setUserId] = useState('a');
    const [username, setUsername] = useState('b');
    const [email, setEmail] = useState('c');
    const [userPresent, setUserPresent] = useState(false);
    async function getUserInfo(){

        try{
            const response = await fetch("http://localhost:3003/users/:userid",{
                credentials: 'include', // IMPORTANT
                headers: { 'Content-Type': 'application/json' },

            })
            const data = await response.json();
            if (response.ok){
                return data.user;
            }
            else{
                return null;
            }
            
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{

        const user =  getUserInfo();
        if (user){
            setUserPresent(true);
            setUserId(user.id);
            setUsername(user.username);
            setEmail(user.email);
        }
    }, [])

    return(
    <>

    <div>
        <h2>Welcome to  your profile</h2>
        <p>{userid} {username} {email}</p>
    </div>
    
    </>

)
}

export default Profile;