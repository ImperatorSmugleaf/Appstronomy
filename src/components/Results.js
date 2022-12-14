/**
 * Author: Kieran Ahn
 *
 * This is the Results component. It handles displaying all
 * search results to the user and activates the modal if a
 * user clicks on an image.
 */

function Results({ searchResults, setModal, currentResult, resultsPerPage }) {
  return searchResults ? (
    searchResults?.length > 0 ? (
      searchResults.slice(currentResult, currentResult + resultsPerPage).map(searchResult => (
        <figure>
          <figcaption>{searchResult.data[0].title}</figcaption>
          <img src={searchResult.links[0].href} onClick={() => setModal(searchResult)} className="thumbnail" />
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
