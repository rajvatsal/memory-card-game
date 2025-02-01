import { useState, useEffect, useRef, useCallback } from 'react'
import { createCache } from './core/cache.jsx'
import { getUrl } from './core/lastfm-api.jsx'
import bg from '/src/assets/app-bg.jpg'
import GameScreen from './components/GameScreen.jsx'
import GenreSelector from './components/GenreSelector.jsx'
import LoadingScreen from './components/LoadingScreen-App.jsx'
import './styles/App.scss'

const tags = ['Disco', 'Rock', 'HipHop', 'Electronic']
const tagInfo_c = createCache()

function Screen() {
  const [selectedTag, setSelectedTag] = useState(null)

  function resetGenre() {
    setSelectedTag(null)
  }

  let screen
  if (selectedTag === null) {
    function getOnClickChoice(tag) {
      return () => {
        setSelectedTag(tag)
      }
    }
    screen = <GenreSelector tags={tags} onClick={getOnClickChoice} />
  } else {
    screen = (
      <GameScreen
        info={tagInfo_c.fetch(selectedTag, { type: 'cors', method: 'GET' })}
        tagName={selectedTag}
        resetGenre={resetGenre}
      />
    )
  }

  return screen
}

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const loadCount = useRef(0)

  const incrementLoadCount = useCallback(() => {
    if (loadCount.current === tags.length + 1) {
      setIsLoading(false)
      loadCount.current = 0
    }

    loadCount.current += 1
  }, [])

  useEffect(() => {
    for (const tag of tags) {
      const url = getUrl({ method: 'tag.getInfo', tag: tag })
      fetch(url, { type: 'cors', method: 'GET' }).then((response) => {
        response.json().then(({ tag }) => {
          tagInfo_c.set(tag.name, tag.wiki.summary)
          incrementLoadCount()
        })
      })
    }
  }, [incrementLoadCount])

  return (
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
      {isLoading ? <LoadingScreen /> : null}
    </main>
  )
}

export default App
