import { useState, useEffect } from 'react'
import LoadingIcon from './LoadingIcon.jsx'
import '/src/styles/LoadingScreen.scss'

export default function LoadingScreen({ info }) {
  return (
    <div className="screen--loading">
      <div className={`screen--loading__text ${info || 'hidden'}`}>
        <h1 className="screen--loading__text__heading">Info</h1>
        <p
          className="screen--loading__text__info"
          dangerouslySetInnerHTML={{ __html: info }}
        />
      </div>
      <LoadingIcon className="screen--loading" />
    </div>
  )
}
