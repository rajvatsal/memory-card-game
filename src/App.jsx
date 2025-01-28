import { useState } from 'react'
import GameScreen from './components/GameScreen.jsx'
import LevelSelector from './components/LevelSelector.jsx'
import './styles/App.scss'

const tags = ['Disco', 'Rock', 'HipHop', 'Electronic']

function Screen() {
  const [selectedTag, setSelectedTag] = useState(null)

  let screen
  if (selectedTag === null) {
    function getOnClickChoice(tag) {
      return () => {
        setSelectedTag(tag)
      }
    }
    screen = <LevelSelector tags={tags} onClick={getOnClickChoice} />
  } else {
    screen = <GameScreen tagName={selectedTag} />
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
