import { useState } from 'react'

const RESULTS_LENGTH = 100

function Results({ data }) {
  const [resultsPerPage, setResultsPerPage] = useState(20)
  const [currentResults, setCurrentResults] = useState(0)

  return data?.collection ? (
    data?.collection?.items.length > 0 ? (
      [...data.collection.items.slice(currentResults, currentResults + resultsPerPage)]
    ) : (
      <p>No results found!</p>
    )
  ) : (
    <p>{data}</p>
  )
}

export default Results
