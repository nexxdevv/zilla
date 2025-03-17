"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { auth, db } from "@/lib/firebase"
import { User } from "@/lib/types"
import {
  signInWithGoogle,
  signInWithEmail,
  registerWithEmail,
  logOut
} from "@/actions/authActions"
import { doc, getDoc } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth"
import { ReactNode } from "react"

interface AuthContextType {
  user: User | null
  loading: boolean
  signInWithGoogle: () => Promise<void>
  signInWithEmail: (email: string, password: string) => Promise<void>
  registerWithEmail: (
    email: string,
    password: string,
    username: string
  ) => Promise<void>
  logOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid))
        const userData = userDoc.exists() ? userDoc.data() : {}

        setUser({
          uid: currentUser.uid,
          email: currentUser.email || "",
          username: userData.username || "",
          createdAt: userData.createdAt || null,
          displayName: userData.displayName || "",
          photoURL: currentUser.photoURL || "",
          ...userData
        })
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signInWithGoogleHandler = async () => {
    try {
      await signInWithGoogle()
    } catch (error: any) {
      alert(error.message || "An unknown error occurred")
    }
  }

  const signInWithEmailHandler = async (email: string, password: string) => {
    try {
      await signInWithEmail(email, password)
    } catch (error: any) {
      alert(error.message)
    }
  }

  const registerWithEmailHandler = async (
    email: string,
    password: string,
    username: string
  ) => {
    try {
      await registerWithEmail(email, password, username)
    } catch (error: any) {
      alert(error.message)
    }
  }

  const logOutHandler = async () => {
    await logOut()
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signInWithGoogle: signInWithGoogleHandler,
        signInWithEmail: signInWithEmailHandler,
        registerWithEmail: registerWithEmailHandler,
        logOut: logOutHandler
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
