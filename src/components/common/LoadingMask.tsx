import { useEffect } from 'react'
import { freezeBody, unfreezeBody } from '../../utils/helpers/domHelper'

interface IProps { }

const LoadingMask = (props: IProps) => {
  useEffect(() => {
    freezeBody()
    return () => {
      unfreezeBody()
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
