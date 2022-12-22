import { useEffect } from 'react'

const LoadingMask = () => {
  useEffect(() => {
    document && document.body.classList.add('blocked')
    return () => {
      document && document.body.classList.remove('blocked')
    }
  }, [])

  return <div className="loading-mask">
    <div className="loading-mask__loader">
      <div className="loading-mask__loader-item"></div>
      <div className="loading-mask__loader-item"></div>
      <div className="loading-mask__loader-item"></div>
      <div className="loading-mask__loader-item"></div>
    </div>
  </div>
}

export default LoadingMask
