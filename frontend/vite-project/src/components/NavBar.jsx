import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import useAuth from "../hooks/useAuth";

function NavBar(){
    const [user,setUser] = useState(null);
    const [isLoggedIn, setisLoggedIn] = useState(false);
    const navigate = useNavigate();
    const { logout , loading, token } = useAuth();

   function logOut() {
    logout();
    setUser(null);
    setisLoggedIn(false);
    navigate('/login');
  }

    return (
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex h-14 items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="text-xl font-semibold text-gray-900 hover:text-indigo-600">
                MyBlog
              </Link>

              <ul className="hidden md:flex gap-6 ml-6">
                <li><Link to="/" className="text-sm text-gray-600 hover:text-gray-900">Home</Link></li>
                <li><Link to="/myBlogs" className="text-sm text-gray-600 hover:text-gray-900">My Blogs</Link></li>
                <li><Link to="/create" className="text-sm text-gray-600 hover:text-gray-900">Create</Link></li>
              </ul>
            </div>

            <div className="flex items-center gap-3">
              {token ? (
                <>
                  <Link to="/" className="hidden sm:inline text-sm text-gray-600 hover:text-gray-900">Profile</Link>
                  <button
                    onClick={logOut}
                    className="inline-flex items-center px-3 py-1.5 bg-red-50 text-red-600 text-sm rounded-md border border-red-100 hover:bg-red-100"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className="px-3 py-1.5 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-500">
                  Login
                </Link>
              )}

              <div className="md:hidden">
                <details className="relative">
                  <summary className="list-none cursor-pointer px-2 py-1 rounded-md hover:bg-gray-100">Menu</summary>
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 shadow-md rounded-md py-2 z-10">
                    <Link to="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Home</Link>
                    <Link to="/myBlogs" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">My Blogs</Link>
                    <Link to="/create" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Create</Link>
                    {token ? (
                      <button onClick={logOut} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50">Logout</button>
                    ) : (
                      <Link to="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Login</Link>
                    )}
                  </div>
                </details>
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
}

export default NavBar;