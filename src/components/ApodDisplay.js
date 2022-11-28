function ApodDisplay({ apod }) {
  return apod ? (
    apod?.error ? (
      <p>Something went wrong! {apod.error}</p>
    ) : (
      <figure>
        <p id="apodHeader">Astronomy Picture of the Day:</p>
        <div class="imgbox">
          <img id="apodImg" src={apod.url} alt={apod.title}></img>
        </div>
        <figcaption id="apodExplanation">{apod.explanation}</figcaption>
      </figure>
    )
  ) : (
    <p>Loading...</p>
  )
}

export default ApodDisplay
