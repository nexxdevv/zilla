import { doc, setDoc, getDoc } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"
import { User } from "@/lib/types"
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from "firebase/auth"
import { redirect } from "next/navigation"

// Get current user
export const getCurrentUser = async (): Promise<User | null> => {
  const user = auth.currentUser
  if (user) {
    const userDoc = await getDoc(doc(db, "users", user.uid))
    const userData = userDoc.exists() ? userDoc.data() : {}
    return {
      uid: user.uid,
      email: user.email || "",
      username: userData.username,
      displayName: userData.displayName,
      photoURL: user.photoURL || ""
    }
  } else {
    return null
  }
}

// Google Sign-In
export const signInWithGoogle = async (): Promise<void> => {
  const provider = new GoogleAuthProvider()
  const result = await signInWithPopup(auth, provider)
  const { uid, email, displayName, photoURL } = result.user

  // Check if the user already exists in Firestore
  const userRef = doc(db, "users", uid)
  const userSnap = await getDoc(userRef)

  if (!userSnap.exists()) {
    // Store new user data in Firestore
    await setDoc(userRef, {
      uid,
      email,
      displayName,
      photoURL,
      createdAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric"
      })
    })
  }
}

// Email/Password Sign-In
export const signInWithEmail = async (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password)
}

// Register with Email/Password
export const registerWithEmail = async (
  email: string,
  password: string,
  username: string
) => {
  if (!username.trim()) {
    throw new Error("Please enter a username.")
  }

  const usernameRef = doc(db, "usernames", username)
  const usernameSnap = await getDoc(usernameRef)

  if (usernameSnap.exists()) {
    throw new Error("Username is already taken.")
  }

  const result = await createUserWithEmailAndPassword(auth, email, password)
  const { uid } = result.user

  await setDoc(doc(db, "users", uid), { uid, email, username }, { merge: true })
  await setDoc(doc(db, "usernames", username), { uid })

  return result
}

// Log out
export const logOut = async () => {
  return signOut(auth)
}
