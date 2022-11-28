import './App.css'
import ApodDisplay from './ApodDisplay'
import { useState, useEffect } from 'react'
import { KEY } from '../services/apiService'

const apodURL = `https://api.nasa.gov/planetary/apod?api_key=${KEY}`

function App() {
  // const user = useAuthentication();

  const [apod, setApod] = useState(null)

  useEffect(() => {
    fetch(apodURL).then(response => {
      if (response.status >= 200 && response.status < 400) {
        response.json().then(fulfilledRequest => setApod(fulfilledRequest))
      } else {
        setApod({ error: `Error ${response.status}` })
      }
    })
  }, [apod])

  return (
    <div className="App">
      <ApodDisplay apod={apod} />
    </div>
  )
}

export default App
