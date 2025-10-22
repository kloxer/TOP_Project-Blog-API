import { Outlet } from "react-router";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function Layout(){
    

  return (
    // make app fill viewport and use column flex so footer stays at bottom
    <div className="min-h-screen flex flex-col">
      <NavBar />

      {/* main grows to fill available space */}
      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout