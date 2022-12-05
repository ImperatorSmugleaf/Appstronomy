import { useState } from 'react'

function Results({ data }) {
  const [resultsPerPage, setResultsPerPage] = useState(20)
  const [currentResults, setCurrentResults] = useState(0)

  /*  TODO: Make a component called 'modal'; it has height and width a little less than the vh and vw. Put 
            it into its own components. Only one prop: the image data. (Pick). Whenever you click on the 
            thumbnail, open up the modal. Google how to do a modal. Make the background a transparent dark black.
            The modal has an onClick or an x button to whenever you click on the black or the x to close the 
            modal. */

  return data?.collection ? (
    data?.collection?.items.length > 0 ? (
      data.collection.items
        .slice(currentResults, currentResults + resultsPerPage)
        .map(searchResult => <p>Not implemented yet!</p>)
    ) : (
      <p>No results found!</p>
    )
  ) : (
    <p>{data}</p>
  )
}

export default Results
