import './App.css'
import ApodDisplay from './ApodDisplay'
import { useState, useEffect } from 'react'
import { KEY } from '../services/apiService'
import Search from './Search'

const apodURL = `https://api.nasa.gov/planetary/apod?api_key=${KEY}`

function App() {
  // const user = useAuthentication();

  const [apod, setApod] = useState(null)
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch(apodURL).then(response => {
      if (response.status >= 200 && response.status < 400) {
        response.json().then(fulfilledRequest => setApod(fulfilledRequest))
      } else {
        setApod({ error: `Error ${response.status}` })
      }
    })
  }, [])

  return (
    <div className="App">
      <ApodDisplay apod={apod} />
      <Search setData={setData} />
      {data ? <img src={data.collection.items[0].links[0].href} /> : ''}
    </div>
  )
}

export default App
