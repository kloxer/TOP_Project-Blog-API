import { Link } from "react-router";

function NavBar(){


    return(<>
    
    <nav>
        <ul>
            <li><Link to="profile">Home</Link></li>

            <li><Link to="profile">Profile</Link></li>

        </ul>
        
        
        
    </nav></>)
}


export default NavBar;