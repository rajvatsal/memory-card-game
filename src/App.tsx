import { useState, useEffect, useRef, useCallback, SetStateAction } from 'react'
import { createCache } from './core/cache.ts'
import { getUrl } from './core/lastfm-api.ts'
import GameScreen from './components/GameScreen.tsx'
import GenreSelector from './components/GenreSelector.tsx'
import LoadingScreen from './components/LoadingScreen-App.tsx'
import bg from './assets/app-bg.jpg'
import './styles/App.scss'

const tags = ['Disco', 'Rock', 'HipHop', 'Electronic']
// Rename to tagSummary_cache
const tagInfo_c = createCache()

function Screen() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  function resetGenre() {
    setSelectedTag(null)
  }

  let screen: React.JSX.Element
  if (selectedTag === null) {
    const getOnClickChoice = (tag: SetStateAction<string | null>) => {
      return () => {
        setSelectedTag(tag)
      }
    }
    screen = <GenreSelector tags={tags} onClick={getOnClickChoice} />
  } else {
    screen = (
      <GameScreen
        info={tagInfo_c.fetch(selectedTag)}
        tagName={selectedTag}
        resetGenre={resetGenre}
      />
    )
  }

  return screen
}

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const loadCount = useRef(1)

  const incrementLoadCount = useCallback(() => {
    if (loadCount.current >= tags.length + 1) {
      setTimeout(() => {
        setIsLoading(false)
      }, 1500)
    }

    loadCount.current += 1
  }, [])

  useEffect(() => {
    for (const tag of tags) {
      const url = getUrl({ method: 'tag.getInfo', tag: tag })
      fetch(url, { method: 'GET' }).then((response) => {
        response.json().then(({ tag }) => {
          tagInfo_c.set(tag.name, tag.wiki.summary)
          incrementLoadCount()
        })
      })
    }
  }, [incrementLoadCount])

  return (
    <>
      <p
        id="preload-fonts"
        style={{
          position: 'absolute',
          left: '-100vw',
          opacity: '0',
          fontFamily: 'barlowsemibold',
        }}
      >
        foo bard
      </p>
      <main className="app">
        <img
          src={bg}
          alt=""
          className="img-bg"
          onLoad={() => {
            incrementLoadCount()
          }}
        />
        <Screen />
        <LoadingScreen {...{ isLoading }} />
      </main>
    </>
  )
}

export default App
