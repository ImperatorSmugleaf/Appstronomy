import { useState } from 'react'

function Search({ setData }) {
  const [error, setError] = useState(null)
  const [advancedSearch, setAdvancedSearch] = useState(false)
  const [query, setQuery] = useState('')

  function submit(e) {
    setError(null)
    e.preventDefault()
    if (query) {
      const request = `https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}`
      fetch(request).then(response => {
        if (response.status >= 200 && response.status < 400) {
          if (response?.reason) {
            setData(`Search failed! ${response.reason}`)
          } else {
            response.json().then(setData)
          }
        } else {
          setError(`Error ${response.status}`)
          setData(`Something went wrong! ${error}`)
        }
      })
    }
  }

  return advancedSearch ? (
    <p>Not implemented yet!</p>
  ) : (
    <form onSubmit={submit}>
      <button type="submit">Search</button>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <button type="button" onClick={() => setAdvancedSearch(true)}>
        Advanced Search
      </button>
    </form>
  )
}

export default Search
