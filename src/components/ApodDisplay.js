function ApodDisplay({ apod }) {
  return apod ? (
    apod?.error ? (
      <p>Something went wrong! {apod.error}</p>
    ) : (
      <figure>
        <p>Astronomy Picture of the Day:</p>
        <img src={apod.url} alt={apod.title}></img>
        <figcaption>{apod.explanation}</figcaption>
      </figure>
    )
  ) : (
    <p>Loading...</p>
  )
}

export default ApodDisplay
