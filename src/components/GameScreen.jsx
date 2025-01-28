import { useState, useEffect, useRef } from 'react'
import { getAlbums } from '../core/lastfm-api.jsx'
import LoadingScreen from './LoadingScreen.jsx'
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

function Game({ cards, tagName, imageLoaded }) {
  const [clickedCards, setClickedCards] = useState([])
  const [bestScore, setBestScore] = useState(0)
  const [isGameOver, setIsGameOver] = useState(false)

  const score = clickedCards.length

  if (isGameOver) {
    alert('game over')
    setClickedCards([])
    setIsGameOver(false)
  }

  return (
    <div className="screen--game">
      <div className="screen--game__header">
        <h1 className="screen--game__header__heading">
          {tagName.toUpperCase()}
        </h1>
        <div className="screen--game__header__scores">
          <p className="screen--game__header__scores__best">
            BEST SCORE: {bestScore}
          </p>
          <p className="screen--game__header__scores__current">
            SCORE: {score}
          </p>
        </div>
      </div>

      <div className="screen--game__cards">
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
              <img
                src={card.image[3]['#text']}
                onLoad={imageLoaded}
                alt="album cover"
              />
              <p>{card.name}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function GameScreen({ tagName }) {
  const [cards, setCards] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const loadedImageCount = useRef(0)

  function imageLoaded() {
    loadedImageCount.current = loadedImageCount.current + 1
    if (loadedImageCount.current === cards.length) setIsLoading(false)
  }

  useEffect(() => {
    async function fetchCards() {
      const { albums } = await getAlbums(tagName)
      setCards(albums.album)
    }
    fetchCards()
  }, [tagName])

  return isLoading ? (
    <>
      <LoadingScreen />
      <Game {...{ cards, tagName, imageLoaded }} />
    </>
  ) : (
    <Game {...{ cards, tagName, imageLoaded }} />
  )
}
