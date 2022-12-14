import { db } from '../firebaseConfig'
import {
  collection,
  query,
  getDocs,
  addDoc,
  orderBy,
  limit,
  Timestamp,
  updateDoc,
  increment,
  arrayUnion,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore'

export async function addFavorite({ UserID, NasaID }) {
  const snapshot_user = await getDoc(doc(db, 'users', UserID))
  const snapshot_pop = await getDoc(doc(db, 'popularMedia', NasaID))
  if (snapshot_user.exists()) {
    const snapshot_fav = await getDoc(doc(db, 'users', UserID, 'favorites', NasaID))
    if (snapshot_fav.exists()) {
      return {}
    } else {
      await updateDoc(doc(db, 'users', UserID), { favorites: arrayUnion(NasaID) })
      if (snapshot_pop.exists()) {
        await updateDoc(doc(db, 'popularMedia', NasaID), { Count: increment(1) })
        return {}
      } else {
        await setDoc(doc(db, 'popularMedia', NasaID), { Count: 1 })
        return {}
      }
    }
  } else {
    console.log('Need to be logged in to add photos to favorites.')
    return {}
  }
}

// NOT FINISHED: This only gets the first 20 articles. In a real app,
// you implement pagination.
// export async function fetchFavorites({ UserID }) {
//   const snapshot = await getDocs(doc(db, 'users', UserID, 'favorites'))
//   for (var i = 0; i < snapshot.length; i++) {
//     snapshot[i]
//   }

//   return snapshot.docs.map(doc => ({
//     id: doc.id,
//     ...doc.data()
//   }))
// }
