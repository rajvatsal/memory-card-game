import '/src/styles/Settings.scss'
import { useState, useEffect } from 'react'
import Music from './Icons/Music.jsx'

function useSettings(initValue) {
  const [isOpen, setIsOpen] = useState(initValue)

  function toggle() {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    if (isOpen === true) {
      let count = 1
      function updateState() {
        if (count === 1) {
          count++
          return
        }
        setIsOpen(!isOpen)
      }
      window.addEventListener('click', updateState)
      return () => {
        window.removeEventListener('click', updateState)
      }
    }
  }, [isOpen])

  return [isOpen, toggle]
}

export default function Settings({ restartGame, resetGenre }) {
  const [isOpen, toggleSettings] = useSettings(false)

  if (isOpen === false) {
    return (
      <div className="settings">
        <button
          type="button"
          className="settings__toggle icons-container no-decoration"
          onClick={toggleSettings}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-5 icon"
          >
            <title>Settings</title>
            <path
              fillRule="evenodd"
              d="M7.84 1.804A1 1 0 0 1 8.82 1h2.36a1 1 0 0 1 .98.804l.331 1.652a6.993 6.993 0 0 1 1.929 1.115l1.598-.54a1 1 0 0 1 1.186.447l1.18 2.044a1 1 0 0 1-.205 1.251l-1.267 1.113a7.047 7.047 0 0 1 0 2.228l1.267 1.113a1 1 0 0 1 .206 1.25l-1.18 2.045a1 1 0 0 1-1.187.447l-1.598-.54a6.993 6.993 0 0 1-1.929 1.115l-.33 1.652a1 1 0 0 1-.98.804H8.82a1 1 0 0 1-.98-.804l-.331-1.652a6.993 6.993 0 0 1-1.929-1.115l-1.598.54a1 1 0 0 1-1.186-.447l-1.18-2.044a1 1 0 0 1 .205-1.251l1.267-1.114a7.05 7.05 0 0 1 0-2.227L1.821 7.773a1 1 0 0 1-.206-1.25l1.18-2.045a1 1 0 0 1 1.187-.447l1.598.54A6.992 6.992 0 0 1 7.51 3.456l.33-1.652ZM10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    )
  }

  return (
    <div className="settings">
      <div className="settings__container">
        <button
          type="button"
          onMouseDown={restartGame}
          className="settings__container__option icons-container"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 icon settings__container__option__icon"
          >
            <title>Restart</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
          Restart
        </button>
        <button
          type="button"
          onMouseDown={resetGenre}
          className=" settings__container__option icons-container"
        >
          <Music className="icon settings__container__option__icon" />
          Change Genre
        </button>
      </div>
    </div>
  )
}
