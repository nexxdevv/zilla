"use client"

import React, { useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import Link from "next/link"
import { User } from "@/lib/types"
import Image from "next/image"

const Dashboard = () => {
  const [username, setUsername] = useState("")
  const [loading, setLoading] = useState(false)
  const { user, setUser } = useAuth() // Assuming setUser is available in AuthContext

  const handleSaveUsername = async () => {
    if (!user || !user.uid) return alert("User not authenticated")

    setUser({ ...user, username } as User)
    try {
      const userRef = doc(db, "users", user.uid)
      await updateDoc(userRef, { username })

      // Update user object in AuthContext
      setUser({ ...user, username } as User)

      alert("Username updated successfully!")
    } catch (error) {
      console.error("Error updating username:", error)
      alert("Failed to update username.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-screen p-4">
      <div>
        <div>
          <h1 className="text-2xl font-bold mb-8">{user?.username}</h1>
          <div className="flex gap-5">
            <Image
              src={user?.photoURL || "/default-image.jpg"}
              alt={user?.username || "User profile picture"}
              width={100}
              height={100}
              className="rounded-full"
            />
            <div>
              <h3>{user?.displayName}</h3>
              <div className="flex gap-12 mt-3">
                <div>
                  <p className="leading-none">0</p>
                  <p className="leading-5">posts</p>
                </div>
                <div>
                  <p className="leading-none">6</p>
                  <p className="leading-5">followers</p>
                </div>
                <div>
                  <p className="leading-none">28</p>
                  <p className="leading-5">following</p>
                </div>
              </div>
            </div>
          </div>
          <p className="mt-4">Los Angeles</p>
        </div>
        <div></div>
      </div>
    </div>
  )
}

export default Dashboard
