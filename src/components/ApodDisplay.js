function ApodDisplay({ apod }) {
  return apod ? (
    apod?.error ? (
      <p>Something went wrong! {apod.error}</p>
    ) : (
      <img src={apod.url} alt={apod.title}></img>
    )
  ) : (
    <p>Loading...</p>
  )
}

export default ApodDisplay
