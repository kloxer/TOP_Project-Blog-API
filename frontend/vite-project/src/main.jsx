import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from "react-router";

// import Register from './register.jsx';
// import Profile from './profile.jsx';
// import LogIn from './login.jsx';
// import CreateBlogPage from './createBlog.jsx';
// import ShowBlogs from './blogs.jsx';
// import SingleBlogPage from './pages/SingleBlogPage.jsx';
// import UpdateBlog from './pages/UpdateBlog.jsx';
import Layout from './layout/Layout.jsx';
import Home from './pages/Home.jsx';
import LoginPage from './pages/Login.jsx';
import {  AuthProvider } from "./components/AuthContext.jsx";  // Named imports
import MyBlogs from './pages/MyBlogs.jsx';

import ProtectedRoute from './components/ProtectedRoute.jsx';
import CreateBlog from './components/CreateBlog.jsx';
import UpdateBlog from './pages/UpdateBlog.jsx';
import SingleBlogPage from './pages/SingleBlogPage.jsx';

const router = createBrowserRouter([
{
  path:"/",
  element: <Layout />,
  children:[
  {
    index:true, element: <Home />,
      },
  {
      path:"login", element:<LoginPage />
  },
  {
    path:"myBlogs", element:<ProtectedRoute><MyBlogs /> </ProtectedRoute>

  },
  {
    path:"create", element:<ProtectedRoute><CreateBlog /> </ProtectedRoute>
  },
  {
      path:"myBlogs/:id", element:<ProtectedRoute><SingleBlogPage /> </ProtectedRoute>
  },
  {
      path:"myBlogs/:id/update", element:<ProtectedRoute><UpdateBlog /> </ProtectedRoute>
  },

  ]


}

])

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//   },
//   {
//     path: "register",
//     element: <Register />,
//   },
//   {
//     path: "profile",
//     element:<Profile />,
//   },
//   {
//     path: "login",
//     element:<LogIn />,
//   },
//   {
//     path:"create",
//     element:<CreateBlogPage />
//   },
//   {
//     path:"blogs",
//     element:<ShowBlogs />
//   },
//   {
//     path:"blogs/:id",
//     element:<SingleBlogPage />
//   },
//   {
//     path:"blogs/:id/update",
//     element:<UpdateBlog />
//   }
// ]);


createRoot(document.getElementById('root')).render(
  <StrictMode>

    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>

  </StrictMode>,
)
