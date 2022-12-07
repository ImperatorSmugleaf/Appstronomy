function Modal({ source, setModal }) {
  return (
    <div id="modalBg" onClick={() => setModal(null)}>
      <main>
        <figure>
          <figcaption>{source.data[0].title}</figcaption>
          <img src={source.links[0].href} />
        </figure>
      </main>
    </div>
  )
}

export default Modal
