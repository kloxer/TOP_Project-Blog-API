import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router";
import Register from './register.jsx';
import Profile from './profile.jsx';
import LogIn from './login.jsx';
import CreateBlogPage from './createBlog.jsx';
import ShowBlogs from './blogs.jsx';
import SingleBlogPage from './pages/SingleBlogPage.jsx';
import UpdateBlog from './pages/UpdateBlog.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "profile",
    element:<Profile />,
  },
  {
    path: "login",
    element:<LogIn />,
  },
  {
    path:"create",
    element:<CreateBlogPage />
  },
  {
    path:"blogs",
    element:<ShowBlogs />
  },
  {
    path:"blogs/:id",
    element:<SingleBlogPage />
  },
  {
    path:"blogs/:id/update",
    element:<UpdateBlog />
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
        <RouterProvider router={router} />
  </StrictMode>,
)
