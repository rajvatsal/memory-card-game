import { useState } from 'react'
import GameScreen from './components/GameScreen.jsx'
import GenreSelector from './components/GenreSelector.jsx'
import './styles/App.scss'

const tags = ['Disco', 'Rock', 'HipHop', 'Electronic']

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
    screen = <GameScreen tagName={selectedTag} resetGenre={resetGenre} />
  }

  return screen
}

function App() {
  return (
    <main className="main">
      <Screen />
    </main>
  )
}

export default App
