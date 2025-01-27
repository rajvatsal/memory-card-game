import { useState, useEffect } from 'react'
import { getAlbums } from '../core/lastfm-api.jsx'
import '/src/styles/GameScreen.scss'

export default function GameScreen({ tagName }) {
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(score)
  const [cards, setCards] = useState([])

  useEffect(() => {
    async function updateCards() {
      const { albums } = await getAlbums(tagName)
      setCards(albums.album)
    }
    updateCards()
  }, [tagName])

  return (
    <div className="main__screen--game">
      <div className="main__screen--game__cards">
        {cards.map((card) => {
          return (
            <div key={card.name} className="main_screen--game__cards__card">
              <img src={card.image[3]['#text']} alt="album cover" />
              <p>{card.name}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
