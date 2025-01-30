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

function Settings({ restartGame, resetGenre }) {
  return (
    <div className="screen--game__settings">
      <button type="button" onClick={restartGame}>
        Restart
      </button>
      <button type="button" onClick={resetGenre}>
        Change Genre
      </button>
    </div>
  )
}

function Scoreboard({ bestScore, score, tagName }) {
  return (
    <div className="screen--game__header">
      <h1 className="screen--game__header__heading">{tagName.toUpperCase()}</h1>
      <div className="screen--game__header__scores">
        <p className="screen--game__header__scores__best">
          BEST SCORE: {bestScore}
        </p>
        <p className="screen--game__header__scores__current">SCORE: {score}</p>
      </div>
    </div>
  )
}

function Game({ tagName, incrementImageLoadedCount, resetGenre, cards }) {
  const [clickedCards, setClickedCards] = useState([])
  const [bestScore, setBestScore] = useState(0)
  const [gameState, setGameState] = useState('running')

  const score = clickedCards.length

  function restartGame() {
    setGameState('restarted')
  }

  switch (gameState) {
    case 'over':
      console.log('game over')
      setClickedCards([])
      setGameState('running')
      break
    case 'restarted':
      console.log('restarted')
      setClickedCards([])
      setGameState('running')
      break
  }

  return (
    <div className="screen--game">
      <Scoreboard {...{ bestScore, score, tagName }} />
      <Settings {...{ restartGame, resetGenre }} />

      <div className="screen--game__cards">
        {shuffle(cards).map((card) => {
          return (
            <div
              key={card.name}
              className="main_screen--game__cards__card"
              onMouseDown={() => {
                if (checkIsGameOver(card.name, clickedCards)) {
                  setGameState('over')
                  return
                }
                const activeScore = score + 1
                if (bestScore < activeScore) setBestScore(activeScore)
                setClickedCards([...clickedCards, card.name])
              }}
            >
              <img
                src={card.image[3]['#text']}
                onLoad={incrementImageLoadedCount}
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

export default function GameScreen({ tagName, resetGenre, cachedCards }) {
  const activeCards = cachedCards[tagName.toLowerCase()]
  const [cards, setCards] = useState(activeCards || [])
  const [isLoading, setIsLoading] = useState(true)

  const loadedImageCount = useRef(0)

  function incrementImageLoadedCount() {
    loadedImageCount.current = loadedImageCount.current + 1
    if (loadedImageCount.current === cards.length) setIsLoading(false)
  }

  useEffect(() => {
    if (activeCards === null) {
      async function fetchCards() {
        const { albums } = await getAlbums(tagName)
        setCards(albums.album)
      }
      fetchCards()
    }

    return () => {
      cachedCards[tagName.toLowerCase()] = cards
    }
  }, [tagName, activeCards])

  return isLoading ? (
    <>
      <LoadingScreen />
      <Game {...{ cards, tagName, incrementImageLoadedCount }} />
    </>
  ) : (
    <Game {...{ cards, tagName, incrementImageLoadedCount, resetGenre }} />
  )
}
