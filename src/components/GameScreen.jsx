import { useState, useEffect } from 'react'
import { makeRequest } from '../core/lastfm-api.jsx'
import '/src/styles/GameScreen.scss'

export default function GameScreen() {
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(score)
  const [cards, setCards] = useState([])

  useEffect(() => {
    makeRequest({
      method: 'tag.getTopAlbums',
      tag: 'rock',
    }).then((response) => {
      response.json().then(({ albums }) => {
        setCards(albums.album)
      })
    })
  }, [])

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
