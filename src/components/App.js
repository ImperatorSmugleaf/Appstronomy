import './App.css'
import ApodDisplay from './ApodDisplay'
import Search from './Search'
import Results from './Results'
import Modal from './Modal'
import { useState, useEffect } from 'react'
import { checkUser, SignIn, SignOut, useAuthentication } from '../services/authService'

const apodURL = `https://classproxy.rtoal.repl.co/apod`

function App() {
  const user = useAuthentication()

  const [apod, setApod] = useState(null)
  const [data, setData] = useState(null)
  const [pick, setPick] = useState(null)

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
      {pick && <Modal pick={pick} setPick={setPick} />}
      <header>
        Astronomy Picture of the Day
        {!user ? <SignIn /> : <SignOut />}
      </header>
      <div className="Stars"></div>
      <ApodDisplay apod={apod} />
      <Search setData={setData} />
      <Results data={data} setModal={setPick} />
    </div>
  )
}

export default App
