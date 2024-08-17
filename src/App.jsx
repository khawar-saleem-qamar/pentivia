import { useState } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import Body from './components/body'
import Signup from './components/signup/Signup'
import Signin from './components/signin/Signin'
import Forgot from './components/forgot/forgot'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Body />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/login",
    element: <Signin />
  }
  ,
  {
    path: "/forgot-password",
    element: <Forgot />
  }
])

function App() {

  return (
   <RouterProvider router={router} />
  )
}

export default App
