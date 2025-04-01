import '/src/styles/LoadingIcons.scss'

const icons = {
  v1: ({ className, parent }) => (
    <div className={`loading-icon--v1 ${parent}__loading-icon ${className}`}>
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
  ),
}

function LoadingIcon({ ver, className, parent }) {
  className = className || ''
  ver = ver || 'v1'
  const icon = icons[ver]({ className, parent }) || null
  return icon
}

export default LoadingIcon
