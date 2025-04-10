import LoadingIcon from './LoadingIcon.tsx'
import LoadingText from './Icons/LoadingText.tsx'
import '/src/styles/LoadingScreen-App.scss'

export default function LoadingScreen({ isLoading }: { isLoading: boolean }) {
  if (isLoading === false) {
    return null
  }

  return (
    <div className="loading-screen--app">
      <div className="loading-screen--app__container">
        <LoadingText />
        <LoadingIcon parent="loading-screen--app" ver={''} className={''} />
      </div>
    </div>
  )
}
