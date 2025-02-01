import { useState, useEffect, useRef } from 'react'
import { getAlbums } from '../core/lastfm-api.jsx'
import { createCache } from '../core/cache.jsx'
import { shuffle } from '../core/shuffle.jsx'
import LoadingScreen from './LoadingScreen.jsx'
import Settings from './Settings.jsx'
import '/src/styles/GameScreen.scss'

const cache = createCache()

function checkIsGameOver(key, clickedAlbums) {
  return clickedAlbums.includes(key)
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

function Game({
  isLoading,
  tagName,
  incrementImageLoadedCount,
  resetGenre,
  cards,
}) {
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
  console.log('Is loading?', isLoading)
  return (
    <div className={`screen--game ${!isLoading || 'hidden'}`}>
      <Scoreboard {...{ bestScore, score, tagName }} />
      <Settings {...{ restartGame, resetGenre }} />

      <div className="screen--game__cards">
        {shuffle(cards).map((card) => {
          return (
            <button
              type="button"
              key={card.name}
              className="screen--game__cards__card"
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
                className="screen--game__cards__card__image"
              />
              <p className="screen--game__cards__card__title">{card.name}</p>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function GameScreen({ info, tagName, resetGenre }) {
  const caches = cache.fetch(tagName)
  const [cards, setCards] = useState(caches || [])
  const [isLoading, setIsLoading] = useState(!caches)

  const loadedImageCount = useRef(0)

  function incrementImageLoadedCount() {
    loadedImageCount.current = loadedImageCount.current + 1
    if (loadedImageCount.current === cards.length) setIsLoading(false)
  }

  useEffect(() => {
    if (cache.fetch(tagName) === null) {
      async function fetchCards() {
        const { albums } = await getAlbums(tagName)
        setCards(albums.album)
      }
      fetchCards()
    }

    return () => {
      cache.set(tagName, cards)
    }
  }, [tagName, cards])

  return isLoading ? (
    <>
      <LoadingScreen info={info} />
      <Game {...{ cards, isLoading, tagName, incrementImageLoadedCount }} />
    </>
  ) : (
    <Game
      {...{ cards, tagName, isLoading, incrementImageLoadedCount, resetGenre }}
    />
  )
}
