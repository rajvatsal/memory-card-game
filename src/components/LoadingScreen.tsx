import React, { useState } from 'react'
import bg from '/src/assets/app-bg.jpg'
import LoadingIcon from './LoadingIcon.jsx'
import '/src/styles/LoadingScreen.scss'

function LoadingScreen({ info, isLoading }) {
  const [isGameStarted, setIsGameStarted] = useState(false)

  if (isGameStarted === true) {
    return null
  }

  return (
    <div className="screen--loading">
      <div className={`screen--loading__text ${info || 'hidden'}`}>
        <h1 className="screen--loading__text__heading">Info</h1>
        <p
          className="screen--loading__text__info"
          dangerouslySetInnerHTML={{ __html: info }}
        />
        <div className="screen--loading__container">
          <button
            type="button"
            onClick={() => {
              setIsGameStarted(true)
            }}
            className={`screen--loading__container__start-button${isLoading === true ? ' hidden' : ''}`}
          >
            Start
          </button>
          <LoadingIcon
            parent="screen--loading__container"
            className={`${isLoading === true ? '' : ' hidden'}`}
          />
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen
