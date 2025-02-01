import { useState, useEffect } from 'react'
import { createCache } from '../core/cache.jsx'
import { getUrl } from '../core/lastfm-api.jsx'
import '/src/styles/LoadingScreen.scss'

const cacheInfo = createCache()

export default function LoadingScreen({ tag }) {
  const [info, setInfo] = useState('')

  useEffect(() => {
    if (cacheInfo.fetch(tag) === null) {
      const url = getUrl({ method: 'tag.getInfo', tag: tag })

      fetch(url).then((response) => {
        response.json().then(({ tag }) => {
          setInfo(tag.wiki.summary)
        })
      })
    }

    return () => cacheInfo.set(tag, info)
  }, [tag, info])

  return (
    <div className="screen--loading">
      <div className={`screen--loading__text ${info || 'hidden'}`}>
        <h1 className="screen--loading__text__heading">Info</h1>
        <p
          className="screen--loading__text__info"
          dangerouslySetInnerHTML={{ __html: info }}
        />
      </div>

      <div className="screen--loading__loader">
        <svg
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill="#ffffff"
        >
          <title>Loader</title>
          <g id="SVGRepo_bgCarrier" strokeWidth="0" />
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g id="SVGRepo_iconCarrier">
            {' '}
            <g>
              {' '}
              <path fill="none" d="M0 0h24v24H0z" />{' '}
              <path d="M12 3a9 9 0 0 1 9 9h-2a7 7 0 0 0-7-7V3z" />{' '}
            </g>{' '}
          </g>
        </svg>
      </div>
    </div>
  )
}
