import { useState, useEffect } from 'react'
import { getAlbums } from '../core/lastfm-api.jsx'
import '/src/styles/GameScreen.scss'

let clickedAlbums = []

function updateClickedAlbums(album) {
  clickedAlbums.push(album)
}

function resetGame() {
  clickedAlbums = []
}

function isGameOver(key) {
  return clickedAlbums.includes(key)
}

export default function GameScreen({ tagName }) {
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(score)
  const [cards, setCards] = useState([])
  const [gameStatus, setGameStatus] = useState('active')

  if (gameStatus === 'over') {
    alert('game over')
    resetGame()
    setGameStatus('active')
  }

  useEffect(() => {
    async function updateCards() {
      const { albums } = await getAlbums(tagName)
      setCards(albums.album)
    }
    updateCards()
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
        {cards.map((card) => {
          return (
            <div
              key={card.name}
              className="main_screen--game__cards__card"
              onMouseDown={() => {
                if (isGameOver(card.name, clickedAlbums)) {
                  setGameStatus('over')
                  setScore(0)
                  return
                }
                const activeScore = score + 1
                if (bestScore < activeScore) setBestScore(activeScore)
                setScore(activeScore)
                updateClickedAlbums(card.name)
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
