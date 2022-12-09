function Modal({ pick, setPick }) {
  return (
    <>
      <div id="modalBg" onClick={() => setPick(null)} />
      <main id="modalContent">
        <figure>
          <figcaption>{pick.data[0].title}</figcaption>
          <img src={pick.links[0].href} id="modalImg" />
        </figure>
        <section>
          <p>
            <mark>Description:</mark> {pick.data[0].description}
          </p>
          <p>
            <mark>Nasa ID:</mark> {pick.data[0].nasa_id}
          </p>
          {pick.data[0].photographer && (
            <p>
              <mark>Photographer:</mark> {pick.data[0].photographer}
            </p>
          )}
          {pick.data[0].secondary_creator && (
            <p>
              <mark>Secondary Creator:</mark> {pick.data[0].secondary_creator}
            </p>
          )}
          {pick.data[0].center && (
            <p>
              <mark>Published by:</mark> {pick.data[0].center}
            </p>
          )}
        </section>
        <button onClick={() => setPick(null)}>Close</button>
      </main>
    </>
  )
}

export default Modal
