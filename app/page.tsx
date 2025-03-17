"use client"

import React from "react"
import { useAuth } from "@/context/AuthContext"

const Home = () => {
  const { user, signInWithGoogle } = useAuth()
  return (
    <div className="flex flex-col h-screen justify-center items-center">
     {!user ? (<button onClick={() => signInWithGoogle()} className="bg-blue-500 text-white p-2 rounded px-4">
        Login
      </button>) : (
        <div>
          <p>You are logged in</p>
        </div>
      )}
      {JSON.stringify(user, null, 2)}
    </div>
  )
}

export default Home
