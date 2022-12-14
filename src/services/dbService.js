import { db } from '../firebaseConfig'
import { updateDoc, increment, arrayUnion, doc, getDoc, setDoc, getDocs } from 'firebase/firestore'

export async function addFavorite({ UserID, NasaID }) {
  const snapshot_user = await getDoc(doc(db, 'users', UserID))
  const snapshot_pop = await getDoc(doc(db, 'popularMedia', NasaID))
  if (snapshot_user.exists()) {
    var check = false
    const snap_fav = await getDoc(doc(db, 'users', UserID))
    const arr = snap_fav.data().favorites
    for (var i = 0; i < arr.length; i++) {
      console.log(arr[i])
      if (arr[i] == NasaID) {
        check = true
      }
    }
    if (check) {
      console.log('Already in user favorites')
      return {}
    } else {
      console.log('Added to user favorites')
      await updateDoc(doc(db, 'users', UserID), { favorites: arrayUnion(NasaID) })
      if (snapshot_pop.exists()) {
        console.log('Added to count')
        await updateDoc(doc(db, 'popularMedia', NasaID), { Count: increment(1) })
        return {}
      } else {
        console.log('Added to popular media')
        await setDoc(doc(db, 'popularMedia', NasaID), { Count: 1 })
        return {}
      }
    }
  } else {
    console.log('Need to be logged in to add photos to favorites.')
    return {}
  }
}
