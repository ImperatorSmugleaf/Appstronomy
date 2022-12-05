import './App.css'
import ApodDisplay from './ApodDisplay'
import { useState, useEffect } from 'react'
import Search from './Search'

const apodURL = `https://classproxy.rtoal.repl.co/apod`

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
      <div className="Stars"></div>
      <ApodDisplay apod={apod} />
      <Search setData={setData} />
      {data ? <img src={data.collection.items[0].links[0].href} /> : ''}
    </div>
  )
}

export default App
