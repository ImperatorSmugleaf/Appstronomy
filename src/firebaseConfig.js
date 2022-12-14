// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAyl_A1kJkQ_AP-VxpAuZFFToSiIltNrt4',
  authDomain: 'appstronomy-4ca3c.firebaseapp.com',
  projectId: 'appstronomy-4ca3c',
  storageBucket: 'appstronomy-4ca3c.appspot.com',
  messagingSenderId: '803532673368',
  appId: '1:803532673368:web:b16b2b2865284cc3a0152d'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

//Google Auth
export const auth = getAuth(app)

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app)
