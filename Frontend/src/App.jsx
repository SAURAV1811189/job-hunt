import React from 'react'
import Navbar from './components/shared/Navbar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'


const App = () => {
  const appRoutes = createBrowserRouter([
  {
    path: "/",
    element:<Home/>
  },
  {
    path: "/login",
    element:<Login/>
  },
  {
    path: "/signup",
    element:<Signup/>
  },
  {
    path:"/jobs",
    element:<Jobs/>
  }

  ])
  return (
    <div>
      <RouterProvider router={appRoutes} />
    </div>
  )
}

export default App

