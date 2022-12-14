import { SignOut2 } from '../services/authService'
import { useState, useEffect } from 'react'
import { fetchFavorites } from '../services/dbService'

export function Favorite({ user, setViewingFavorites }) {
  const [favorites, setFavorites] = useState(null)

  useEffect(() => {
    fetchFavorites({ UserID: user.uid }).then(setFavorites)
  }, [])

  return (
    <div className="Favorites">
      <header>
        Favorites
        <SignOut2 setViewingFavorites={setViewingFavorites} />
      </header>
      <div className="Stars"></div>
      {favorites ? (
        favorites.map(media => (
          <figure>
            <img src={media.links[0].href} className="thumbnail" />
          </figure>
        ))
      ) : (
        <p className="text">You have no favorites!</p>
      )}
    </div>
  )
}
