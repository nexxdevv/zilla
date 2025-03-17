"use client"

import React from "react"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import PostCard from "@/components/post-card"

const Home = () => {
  const { user, signInWithGoogle, logOut } = useAuth()
  const router = useRouter()
  const googleSignIn = async () => {
    try {
      await signInWithGoogle()
      router.push("/dashboard")
    } catch (error: any) {
      alert(error.message || "An unknown error occurred")
    }
  }
  return (
    <div className="flex flex-col h-screen">
      {!user ? (
        <button
          onClick={() => googleSignIn()}
          className="bg-blue-500 text-white p-2 rounded px-4"
        >
          Login
        </button>
      ) : (
        <div>
          <PostCard />
        </div>
      )}
    </div>
  )
}

export default Home
