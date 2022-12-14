import { useState } from 'react'

function Search({ setSearchResults, setNextPage, setCurrentPageNumber }) {
  const [advancedSearch, setAdvancedSearch] = useState(false)
  const [query, setQuery] = useState('')
  const [center, setCenter] = useState('')
  const [description, setDescription] = useState('')
  const [keywords, setKeywords] = useState('')
  const [location, setLocation] = useState('')
  const [nasaId, setNasaId] = useState('')
  const [photographer, setPhotographer] = useState('')
  const [secondaryCreator, setSecondaryCreator] = useState('')
  const [title, setTitle] = useState('')
  const [startYear, setStartYear] = useState('')
  const [endYear, setEndYear] = useState('')
  const searchTerms = [
    ['q', query],
    ['center', center],
    ['description', description],
    ['keywords', keywords],
    ['location', location],
    ['nasa_id', nasaId],
    ['photographer', photographer],
    ['secondary_creator', secondaryCreator],
    ['title', title],
    ['year_start', startYear],
    ['year_end', endYear]
  ]

  function submit(e) {
    e.preventDefault()
    let request
    if (!advancedSearch) {
      if (query) {
        request = `https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}&media_type=image`
      }
    } else {
      if (searchTerms.some(term => term[1])) {
        const queryComponents = searchTerms
          .map(term => (term = term[1] ? `${term[0]}=${encodeURIComponent(term[1])}` : null))
          .filter(term => term)
          .join('&')
        request = `https://images-api.nasa.gov/search?${queryComponents}&media_type=image`
      }
    }
    fetch(request).then(response => {
      if (response.status >= 200 && response.status < 400) {
        if (response?.reason) {
          setSearchResults(`Search failed! ${response.reason}`)
          setNextPage(null)
        } else {
          response.json().then(fulfilledRequest => {
            setSearchResults(fulfilledRequest?.collection?.items)
            setNextPage(fulfilledRequest?.collection?.links[fulfilledRequest?.collection?.links?.length - 1]?.href)
            setCurrentPageNumber(0)
          })
        }
      } else {
        setSearchResults(`Something went wrong! Error ${response.status}`)
        setNextPage(null)
      }
    })
  }

  return advancedSearch ? (
    <form id="advanceSearch" onSubmit={submit}>
      <button id="advanceSearchButton" className="bigButton" type="submit">
        Search{' '}
      </button>
      <label>
        All Text <input value={query} onChange={e => setQuery(e.target.value)} />
      </label>
      <label>
        NASA Center <input value={center} onChange={e => setCenter(e.target.value)} />
      </label>
      <label>
        Description <input value={description} onChange={e => setDescription(e.target.value)} />
      </label>
      <label>
        Keywords <input value={keywords} onChange={e => setKeywords(e.target.value)} />
      </label>
      <label>
        Location <input value={location} onChange={e => setLocation(e.target.value)} />
      </label>
      <label>
        Title <input value={title} onChange={e => setTitle(e.target.value)} />
      </label>
      <label>
        NASA ID <input value={nasaId} onChange={e => setNasaId(e.target.value)} />
      </label>
      <label>
        Photographer <input value={photographer} onChange={e => setPhotographer(e.target.value)} />
      </label>
      <label>
        Secondary Creator <input value={secondaryCreator} onChange={e => setSecondaryCreator(e.target.value)} />
      </label>
      <label>
        Start Year <input value={startYear} onChange={e => setStartYear(e.target.value)} />
      </label>
      <label>
        End Year <input value={endYear} onChange={e => setEndYear(e.target.value)} />
      </label>
    </form>
  ) : (
    <form id="search" onSubmit={submit}>
      <button type="submit" className="bigButton">
        Search
      </button>
      <label>
        <span className="text">Search: </span>
        <input value={query} onChange={e => setQuery(e.target.value)} />
      </label>
      <button type="button" className="bigButton" onClick={() => setAdvancedSearch(true)}>
        Advanced Search
      </button>
    </form>
  )
}

export default Search
