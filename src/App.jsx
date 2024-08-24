import { useState } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import Body from './components/body'
import Signup from './components/signup/Signup'
import Signin from './components/signin/Signin'
import Forgot from './components/forgot/forgot'
import PrivateRoute from './components/PrivateRoute'
import PublicRoute from './components/PublicRoute'
import NotFound from './components/partials/NotFound'
import Settings from './components/settings/Settings'

const router = createBrowserRouter([
  {
    path: "/typing",
    element: (
      <PrivateRoute>
        <Body />
      </PrivateRoute>
    )
  },
  {
    path: "/settings",
    element: (
      <PrivateRoute>
        <Settings />
      </PrivateRoute>
    )
  },
  {
    path: "/signup",
    element: (
      <PublicRoute>
        <Signup />
      </PublicRoute>
    )
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Signin />
      </PublicRoute>
    )
  },
  {
    path: "/forgot-password",
    element: (
      <PublicRoute>
        <Forgot />
      </PublicRoute>
    )
  },
  {
    path: "*",
    element: <NotFound />
  }
])

function App() {

  return (
   <RouterProvider router={router} />
  )
}

export default App
