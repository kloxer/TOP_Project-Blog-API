import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function LoginPage(){
     const { token , login} = useAuth();

     if (token){
      return <Navigate to="/" replace />
     }

      const [username, setUsername] = useState('');
      const [password, setPassword] = useState('');

      const [message, setMessage] = useState(''); 
     async function handleSubmit(e){
        e.preventDefault();
        try{
        const response = await fetch('http://localhost:3003/users/login', {
          method:'POST',
          credentials: 'include',
          headers:{
            'Content-Type':'application/json'
          },
          body: JSON.stringify({username, password}),
        });
        
        const data = await response.json();
        if (response.ok){
          const token = data.token;
          setMessage(data.message);
          
        setTimeout(() => {
          login(token);             // Set token AFTER delay
        }, 3000)
      

        }else{
          console.log(data.message)
          setMessage(data.message);

        }
      }
    catch(err){
      console.log('Error during login:', err);
        setMessage(err);

    }
  };

return (
  <div className="min-h-screen flex items-start justify-center bg-gradient-to-b from-gray-50 to-white pt-16 pb-12 px-4">
    <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Welcome back</h1>
      <p className="text-sm text-gray-500 mb-6 text-center">Sign in to your account</p>

    {message && (
      <div
        role="alert"
        className={`mb-4 px-4 py-3 rounded-md text-sm border ${
          message === 'Success'
            ? 'bg-green-50 text-green-800 border-green-100'
            : 'bg-red-50 text-red-800 border-red-100'
        }`}
      >
        {message} 
      </div>
    )}      
    <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            value={username}
            onChange={(e)=> setUsername(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-md transition"
        >
          Log in
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-600">
        Don't have an account? <Link to="/register" className="text-indigo-600 hover:underline">Register</Link>
      </div>
    </div>
  </div>
)
}

export default LoginPage