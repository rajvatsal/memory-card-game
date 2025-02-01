import LoadingIcon from './LoadingIcon.jsx'
import '/src/styles/LoadingScreen-App.scss'

export default function LoadingScreen({ isLoading }) {
  if (isLoading === false) {
    return null
  }

  return (
    <div className="loading-screen--app">
      <div className="loading-screen--app__container">
        <span>Loading </span>
        <LoadingIcon className="loading-screen--app" />
      </div>
    </div>
  )
}
