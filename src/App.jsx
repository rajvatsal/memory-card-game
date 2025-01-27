import { useState } from 'react'
import GameScreen from './components/GameScreen.jsx'
import './styles/App.scss'

function App() {
  return (
    <main className="main">
      <GameScreen tagName="rock" />
    </main>
  )
}

export default App
