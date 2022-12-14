import { useState } from 'react'

function Results({ searchResults, setModal, currentResults, resultsPerPage }) {
  return searchResults?.collection ? (
    searchResults?.collection?.items.length > 0 ? (
      searchResults.collection.items.slice(currentResults, currentResults + resultsPerPage).map(searchResult => (
        <figure onClick={() => setModal(searchResult)}>
          <figcaption>{searchResult.data[0].title}</figcaption>
          <img src={searchResult.links[0].href} className="thumbnail" />
        </figure>
      ))
    ) : (
      <p>No results found!</p>
    )
  ) : (
    <p>{searchResults}</p>
  )
}

export default Results
