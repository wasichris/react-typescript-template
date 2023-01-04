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
    <div className="c-loading-mask">
      <div className="c-loading-mask__loader">
        <div className="c-loading-mask__loader-item"></div>
        <div className="c-loading-mask__loader-item"></div>
        <div className="c-loading-mask__loader-item"></div>
        <div className="c-loading-mask__loader-item"></div>
      </div>
    </div>
  )
}

export default LoadingMask
