import './App.css'
import ApodDisplay from './ApodDisplay'
import Search from './Search'
import Results from './Results'
import Modal from './Modal'
import { useState, useEffect } from 'react'

const apodURL = `https://classproxy.rtoal.repl.co/apod`

function App() {
  // const user = useAuthentication();

  const [apod, setApod] = useState(null)
  const [data, setData] = useState(null)
  const [modal, setModal] = useState(null)

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
    if (modal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'scroll'
    }
  }, [modal])

  return (
    <div className="App">
      {modal && <Modal source={modal} setModal={setModal} />}
      <header>
        Astronomy Picture of the day
        <button id="Login"> Placeholder </button>
      </header>
      <div className="Stars"></div>
      <ApodDisplay apod={apod} />
      <Search setData={setData} />
      <Results data={data} setModal={setModal} />
    </div>
  )
}

export default App
