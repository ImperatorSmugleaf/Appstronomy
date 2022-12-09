import { useState } from 'react'

function Results({ data, setModal }) {
  const [resultsPerPage, setResultsPerPage] = useState(20)
  const [currentResults, setCurrentResults] = useState(0)

  return data?.collection ? (
    data?.collection?.items.length > 0 ? (
      data.collection.items.slice(currentResults, currentResults + resultsPerPage).map(searchResult => (
        <figure onClick={() => setModal(searchResult)}>
          <figcaption>{searchResult.data[0].title}</figcaption>
          <img src={searchResult.links[0].href} className="thumbnail" />
        </figure>
      ))
    ) : (
      <p>No results found!</p>
    )
  ) : (
    <p>{data}</p>
  )
}

export default Results
