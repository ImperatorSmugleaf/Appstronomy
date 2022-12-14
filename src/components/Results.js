import { useState } from 'react'

function Results({ searchResults, setModal, currentResult, resultsPerPage }) {
  return searchResults ? (
    searchResults?.length > 0 ? (
      searchResults.slice(currentResult, currentResult + resultsPerPage).map(searchResult => (
        <figure onClick={() => setModal(searchResult)}>
          <figcaption>{searchResult.data[0].title}</figcaption>
          <img src={searchResult.links[0].href} className="thumbnail" />
        </figure>
      ))
    ) : (
      <p className="text">No results found!</p>
    )
  ) : (
    <p className="text">{searchResults}</p>
  )
}

export default Results
