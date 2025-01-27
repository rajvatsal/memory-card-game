import { useState, useEffect } from 'react'
import { getAlbums } from '../core/lastfm-api.jsx'
import '/src/styles/GameScreen.scss'

function shuffle(array) {
  let currentIndex = array.length

  while (currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ]
  }
  return array
}

function checkIsGameOver(key, clickedAlbums) {
  return clickedAlbums.includes(key)
}

export default function GameScreen({ tagName }) {
  const [clickedCards, setClickedCards] = useState([])
  const [bestScore, setBestScore] = useState(0)
  const [cards, setCards] = useState([])
  const [isGameOver, setIsGameOver] = useState(false)

  const score = clickedCards.length

  if (isGameOver) {
    alert('game over')
    setClickedCards([])
    setIsGameOver(false)
  }

  useEffect(() => {
    async function fetchCards() {
      const { albums } = await getAlbums(tagName)
      setCards(albums.album)
    }
    fetchCards()
  }, [tagName])

  return (
    <div className="main__screen--game">
      <div className="main__screen--game__header">
        <h1 className="main__screen--game__header__heading">
          {tagName.toUpperCase()}
        </h1>
        <div className="main__screen--game__header__scores">
          <p className="main__screen--game__header__scores__best">
            BEST SCORE: {bestScore}
          </p>
          <p className="main__screen--game__header__scores__current">
            SCORE: {score}
          </p>
        </div>
      </div>

      <div className="main__screen--game__cards">
        {shuffle(cards).map((card) => {
          return (
            <div
              key={card.name}
              className="main_screen--game__cards__card"
              onMouseDown={() => {
                if (checkIsGameOver(card.name, clickedCards)) {
                  setIsGameOver(true)
                  return
                }
                const activeScore = score + 1
                if (bestScore < activeScore) setBestScore(activeScore)
                setClickedCards([...clickedCards, card.name])
              }}
            >
              <img src={card.image[3]['#text']} alt="album cover" />
              <p>{card.name}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
