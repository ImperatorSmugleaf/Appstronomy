import { useState, useEffect } from 'react'
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth'
import { auth } from '../firebaseConfig'

export function SignIn() {
  return (
    <button style={{ marginRight: '15px' }} onClick={() => signInWithPopup(auth, new GoogleAuthProvider())}>
      Sign In
    </button>
  )
}

export function SignOut() {
  return (
    <div style={{ paddingTop: '15px' }}>
      Hello, {auth.currentUser.displayName} &nbsp;
      <button style={{ marginRight: '100px' }} onClick={() => signOut(auth)}>
        Favorites
      </button>
      <button style={{ marginRight: '15px' }} onClick={() => signOut(auth)}>
        Sign Out
      </button>
    </div>
  )
}

export function useAuthentication() {
  const [user, setUser] = useState(null)
  useEffect(() => {
    return auth.onAuthStateChanged(user => {
      user ? setUser(user) : setUser(null)
    })
  }, [])
  return user
}
