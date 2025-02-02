import loadingSvgPath from '/src/assets/Loading.svg'
import LoadingIcon from './LoadingIcon.jsx'
import '/src/styles/LoadingScreen-App.scss'

export default function LoadingScreen({ isLoading }) {
  if (isLoading === false) {
    return null
  }

  return (
    <div className="loading-screen--app">
      <div className="loading-screen--app__container">
        <img
          alt="Loading"
          src={loadingSvgPath}
          style={{
            marginRight: '2px',
            marginBottom: '2px',
          }}
        />
        <LoadingIcon parent="loading-screen--app" />
      </div>
    </div>
  )
}
