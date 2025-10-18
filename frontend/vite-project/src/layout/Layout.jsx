import { Outlet } from "react-router";
import NavBar from "../components/NavBar";

function Layout(){
    


    return(<>
    <div className="layout">
    <NavBar />
        <Outlet />
    </div>
    </>)
}

export default Layout