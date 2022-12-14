import './App.css'
import ApodDisplay from './ApodDisplay'
import Search from './Search'
import Results from './Results'
import Modal from './Modal'
import { useState, useEffect } from 'react'
import { SignIn, SignOut, useAuthentication } from '../services/authService'

const apodURL = `https://classproxy.rtoal.repl.co/apod`

function App() {
  const user = useAuthentication()

  const [apod, setApod] = useState(null)
  const [searchResults, setSearchResults] = useState('')
  const [pick, setPick] = useState(null)
  const [resultsPerPage, setResultsPerPage] = useState(20)
  const [currentPageNumber, setCurrentPageNumber] = useState(0)
  const [nextPage, setNextPage] = useState(null)
  const [resultsInputContent, setResultsInputContent] = useState(resultsPerPage)

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

  useEffect(() => {
    if (searchResults.length <= (currentPageNumber + 1) * resultsPerPage && nextPage) {
      fetch(nextPage).then(response => {
        if (response.status >= 200 && response.status < 400) {
          response.json().then(fulfilledRequest => {
            searchResults.concat(fulfilledRequest.collection.items)
            setNextPage(fulfilledRequest.collection.links[fulfilledRequest.collection.links.length - 1]?.href)
          })
        }
      })
    }
  }, [currentPageNumber, resultsPerPage])

  const clampResultsPerPage = results => {
    let clampedResult
    if (results > 100) {
      clampedResult = 100
    } else if (results < 1) {
      clampedResult = 1
    } else {
      clampedResult = results
    }
    setResultsInputContent(clampedResult)
    return clampedResult
  }

  return (
    <div className="App">
      {pick && <Modal pick={pick} setPick={setPick} />}
      <header>
        Astronomy Picture of the day
        <button id="Login" className="bigButton">
          {' '}
          Placeholder{' '}
        </button>
      </header>
      <div className="Stars"></div>
      <ApodDisplay apod={apod} />
      <Search setNasaData={setSearchResults} setNextPage={setNextPage} />
      <label>
        <span className="text">Results per Page:</span>{' '}
        <input
          value={resultsInputContent}
          onChange={e => setResultsInputContent(e.target.value.replace(/\D/, ''))}
          onBlur={() => {
            setResultsPerPage(clampResultsPerPage(resultsInputContent))
          }}
        ></input>
      </label>
      <br />
      <button
        disabled={currentPageNumber === 0}
        onClick={() => {
          setCurrentPageNumber(currentPageNumber - 1)
        }}
      >
        Previous Page
      </button>
      <button
        disabled={!nextPage}
        onClick={() => {
          setCurrentPageNumber(currentPageNumber + 1)
        }}
      >
        Next Page
      </button>
      <Results
        searchResults={searchResults}
        setModal={setPick}
        resultsPerPage={resultsPerPage}
        currentPageNumber={currentPageNumber}
      />
    </div>
  )
}

export default App
