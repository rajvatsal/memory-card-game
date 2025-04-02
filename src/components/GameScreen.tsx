import { useState, useEffect, useRef } from 'react'
import { getAlbums } from '../core/lastfm-api.jsx'
import { createCache } from '../core/cache.jsx'
import { shuffle } from '../core/shuffle.tsx'
import LoadingScreen from './LoadingScreen.tsx'
import Settings from './Settings.tsx'
import '/src/styles/GameScreen.scss'

interface Card {
  name: string
  mbid: string
  url: string
  image: {
    '#text': string
    size: string
  }[]

  artist: {
    name: string
    mbid: string
    url: string
  }
  '@attr': {
    rank: string
  }
}

interface ScoreboardProps {
  tagName: string
  bestScore: number
  score: number
}

interface GameProps {
  isLoading: boolean
  tagName: string
  incrementImageLoadedCount: () => void
  resetGenre: () => void
  cards: Card[]
}

const cache = createCache()

function checkIsGameOver(key: string, clickedAlbums: string[]) {
  return clickedAlbums.includes(key)
}

function Scoreboard({ bestScore, score, tagName }: ScoreboardProps) {
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
}: GameProps) {
  const [clickedCards, setClickedCards] = useState<string[]>([])
  const [bestScore, setBestScore] = useState<number>(0)
  const [gameState, setGameState] = useState<string>('running')

  const score = clickedCards.length

  function restartGame() {
    setGameState('restarted')
  }

  switch (gameState) {
    case 'over':
      setClickedCards([])
      setGameState('running')
      break
    case 'restarted':
      setClickedCards([])
      setGameState('running')
      break
  }
  return (
    <div className={`screen--game ${!isLoading || 'hidden'}`}>
      <Scoreboard {...{ bestScore, score, tagName }} />
      <Settings {...{ restartGame, resetGenre }} />

      <div className="screen--game__cards">
        {shuffle(cards).map((card: Card) => {
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

function GameScreen({ info, tagName, resetGenre }) {
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

  return (
    <>
      <LoadingScreen isLoading={isLoading} info={info} />
      <Game
        {...{
          cards,
          isLoading,
          resetGenre,
          tagName,
          incrementImageLoadedCount,
        }}
      />
    </>
  )
}

export default GameScreen
