import './App.css'
import ApodDisplay from './ApodDisplay'
import Search from './Search'
import Results from './Results'
import Modal from './Modal'
import { useState, useEffect } from 'react'
import { SignIn, SignOut2, useAuthentication } from '../services/authService'
import App from './App'

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
    <div className="App">
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
          <ApodDisplay apod={apod} />
          {/* <Search setData={setData} /> */}
          <Results data={data} setModal={setPick} />
        </div>
      )}
    </div>
  )
}
