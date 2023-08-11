import { useEffect } from 'react'
import { freezeBody, unfreezeBody } from '@/utils/helpers/domHelper'

interface IProps { }

const LoadingMask = (props: IProps) => {
  useEffect(() => {
    freezeBody()
    return () => {
      unfreezeBody()
    }
  }, [])

  return (
    <div className='cp-loading-mask'>
      <div className='cp-loading-mask__loader'>
        <div className='cp-loading-mask__loader-item'></div>
        <div className='cp-loading-mask__loader-item'></div>
        <div className='cp-loading-mask__loader-item'></div>
        <div className='cp-loading-mask__loader-item'></div>
      </div>
    </div>
  )
}

export default LoadingMask
