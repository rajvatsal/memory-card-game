import loadingSvgPath from '/src/assets/Loading.svg'
import LoadingIcon from './LoadingIcon.jsx'
import LoadingText from './Icons/LoadingText.jsx'
import '/src/styles/LoadingScreen-App.scss'

export default function LoadingScreen({ isLoading }) {
  if (isLoading === false) {
    return null
  }

  return (
    <div className="loading-screen--app">
      <div className="loading-screen--app__container">
        <LoadingText />
        <LoadingIcon parent="loading-screen--app" />
      </div>
    </div>
  )
}
