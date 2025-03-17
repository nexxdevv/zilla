export interface User {
    uid: string
    username: string
    email: string
    fullName?: string
    photoURL?: string
    bio?: string
    followers?: string[]
    following?: string[]
    displayName: string
  }