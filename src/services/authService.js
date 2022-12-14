import { useState, useEffect } from 'react'
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth'
import { auth } from '../firebaseConfig'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../firebaseConfig'
import { Favorite } from '../components/Favorite'
import App from '../components/App'

export function SignIn() {
  return (
    <button
      id="loginButton"
      className="bigButton"
      onClick={() =>
        signInWithPopup(auth, new GoogleAuthProvider()).then(result => {
          // The signed-in user info.
          checkUser(result.user.auth.currentUser.uid)
        })
      }
    >
      Sign In
    </button>
  )
}

export function SignOut({ setViewingFavorites }) {
  return (
    <div style={{ paddingTop: '15px' }}>
      Hello, {auth.currentUser.displayName} &nbsp;
      <button style={{ marginRight: '150px', marginBottom: '30px' }} onClick={() => setViewingFavorites(true)}>
        Favorites
      </button>
      <button style={{ marginRight: '15px', marginBottom: '30px' }} onClick={() => signOut(auth)}>
        Sign Out
      </button>
    </div>
  )
}

export function SignOut2() {
  return (
    <div style={{ paddingTop: '15px' }}>
      Hello, {auth.currentUser.displayName} &nbsp;
      <button style={{ marginRight: '150px', marginBottom: '30px' }} onClick={() => '../components/App'}>
        Home
      </button>
      <button style={{ marginRight: '15px', marginBottom: '30px' }} onClick={() => signOut(auth)}>
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

export async function checkUser(userID) {
  const snapshot_user = await getDoc(doc(db, 'users', userID))
  if (snapshot_user.exists()) {
    console.log('user already exists')
  } else {
    await setDoc(doc(db, 'users', userID), { favorites: {} })
    console.log('User created in database')
    return {}
  }
}
