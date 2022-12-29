import { useEffect } from 'react'

interface IProps { }

const LoadingMask = (props: IProps) => {
  useEffect(() => {
    document && document.body.classList.add('blocked')
    return () => {
      document && document.body.classList.remove('blocked')
    }
  }, [])

  return (
    <div className="loading-mask">
      <div className="loading-mask__loader">
        <div className="loading-mask__loader-item"></div>
        <div className="loading-mask__loader-item"></div>
        <div className="loading-mask__loader-item"></div>
        <div className="loading-mask__loader-item"></div>
      </div>
    </div>
  )
}

export default LoadingMask
