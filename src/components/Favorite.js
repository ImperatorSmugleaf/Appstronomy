import './App.css'
import ApodDisplay from './ApodDisplay'
import Search from './Search'
import Results from './Results'
import Modal from './Modal'
import { useState, useEffect } from 'react'
import { SignIn, SignOut2, useAuthentication } from '../services/authService'
import App from './App'
import { auth, db } from '../firebaseConfig'
import { getDoc, doc } from 'firebase/firestore'

const apodURL = `https://classproxy.rtoal.repl.co/apod`

export function Favorite() {
  const user = useAuthentication()

  const [apod, setApod] = useState(null)
  const [data, setData] = useState(null)
  const [pick, setPick] = useState(null)
  const [viewingFavorites, setViewingFavorites] = useState(true)

  useEffect(() => {
    fetch(apodURL).then(response => {
      if (response.status >= 200 && response.status < 400) {
        response.json().then(fulfilledRequest => setApod(fulfilledRequest))
      } else {
        setApod({ error: `Error ${response.status}` })
      }
    })
  }, [])

  useEffect(() => {
    if (pick) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'scroll'
    }
  }, [pick])

  return (
    <div className="Favorites">
      {!viewingFavorites ? (
        <App setViewingFavorites={setViewingFavorites} />
      ) : (
        <div>
          {/* {pick && <Modal pick={pick} setPick={setPick} />} */}
          <header>
            Favorites
            {!user ? <SignIn /> : <SignOut2 setViewingFavorites={setViewingFavorites} />}
          </header>
          <div className="Stars"></div>
          <FetchFavorites UserID={auth.currentUser.uid} />
          {/* <Results data={data} setModal={setPick} /> */}
        </div>
      )}
    </div>
  )
}

export async function FetchFavorites({ UserID }) {
  const snapshot = await getDoc(doc(db, 'users', UserID)).map(doc => doc.data())
  let arr = []
  for (var i = 0; i < snapshot.data().favorites.length; i++) {
    let request
    request = `https://images-api.nasa.gov/search?nasa_id=` + snapshot.data().favorites[i]
    await fetch(request).then(response => {
      response
        .json()
        .then(response2 => response2.collection.items[0].href)
        .then(searchResult => arr.push(searchResult))
    })
  }
  return arr.map(doc => (
    <figure>
      <img src={doc} className="thumbnail" />
    </figure>
  ))
}
