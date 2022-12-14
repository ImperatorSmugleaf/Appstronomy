import { db } from '../firebaseConfig'
import { updateDoc, increment, doc, getDoc, setDoc } from 'firebase/firestore'

export async function addFavorite({ UserID, media }) {
  const snapshot_user = await getDoc(doc(db, 'users', UserID))
  if (snapshot_user.exists()) {
    const snap_fav = await getDoc(doc(db, 'users', UserID))
    const favorites = snap_fav.data().favorites

    const NasaID = media.data[0].nasa_id

    if (favorites[NasaID]) {
      console.log('Already in user favorites')
      return {}
    } else {
      console.log('Added to user favorites')
      favorites[NasaID] = media
      await updateDoc(doc(db, 'users', UserID), { favorites: favorites })

      const snapshot_pop = await getDoc(doc(db, 'popularMedia', NasaID))
      if (snapshot_pop.exists()) {
        console.log('Added to count')
        await updateDoc(doc(db, 'popularMedia', NasaID), { Count: increment(1) })
        return {}
      } else {
        console.log('Added to popular media')
        await setDoc(doc(db, 'popularMedia', NasaID), { Count: 1, media: media })
        return {}
      }
    }
  } else {
    console.log('Need to be logged in to add photos to favorites.')
    return {}
  }
}

export async function fetchFavorites({ UserID }) {
  const snapshot = await getDoc(doc(db, 'users', UserID))
  return Object.values(snapshot.data()?.favorites)
}
