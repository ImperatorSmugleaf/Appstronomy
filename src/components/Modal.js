/**
 * Author: Kieran Ahn
 *
 * This is the Modal component. This only appears when a user
 * clicks on an image in the search results. It contains details
 * about the selected image as well as an option for the user to
 * favorite it.
 */

import { addFavorite } from '../services/dbService'

function Modal({ pick, setPick, user }) {
  return (
    <>
      <div id="modalBg" onClick={() => setPick(null)} />
      <main id="modalContent">
        <figure>
          <figcaption>
            <span className="text">{pick.data[0].title}</span>{' '}
            {user && (
              <button
                onClick={async () => {
                  await addFavorite({ UserID: user.uid, media: pick })
                }}
              >
                Favorite
              </button>
            )}{' '}
            <button onClick={() => setPick(null)}>Close</button>
          </figcaption>
          <img src={pick.links[0].href} id="modalImg" />
        </figure>
        <section className="text">
          <p>
            <b>Description:</b> {pick.data[0].description_508}
          </p>
          <p>
            <b>Nasa ID:</b> {pick.data[0].nasa_id}
          </p>
          {pick.data[0].photographer && (
            <p>
              <b>Photographer:</b> {pick.data[0].photographer}
            </p>
          )}
          {pick.data[0].secondary_creator && (
            <p>
              <b>Secondary Creator:</b> {pick.data[0].secondary_creator}
            </p>
          )}
          {pick.data[0].center && (
            <p>
              <b>Published by:</b> {pick.data[0].center}
            </p>
          )}
        </section>
      </main>
    </>
  )
}

export default Modal
