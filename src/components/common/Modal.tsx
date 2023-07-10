import clsx from 'clsx'
import { PropsWithChildren, useCallback, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import { freezeBody, unfreezeBody } from '../../utils/helpers/domHelper'
import useClickOutsideHandler from '../../utils/hooks/useClickOutsideHandler'
import useKeyDownHandler from '../../utils/hooks/useKeyDownHandler'

export interface IBaseModalProps {
  isVisible: boolean
  onRequestClose: () => void
}

interface IProps extends IBaseModalProps {
  isCloseByBackdrop?: boolean
  isCloseByEsc?: boolean
  maxWidth?: string
  target?: HTMLElement
  className?: string
}

const Modal = ({ className, isVisible, isCloseByBackdrop, isCloseByEsc, children, maxWidth, target, onRequestClose }: PropsWithChildren<IProps>) => {
  // 將彈跳視窗移出到特定的元素上
  const portalTarget = target || document.body

  // 通知父層來請求關閉
  const requestCloseModal = useCallback(() => {
    isVisible && onRequestClose && onRequestClose()
  }, [isVisible, onRequestClose])

  // 點選 Backdrop (非modal區塊) 來關閉彈跳視窗
  const modalRef = useRef<HTMLDivElement>(null)
  const isEnableClickMonitor = isVisible && isCloseByBackdrop === true
  useClickOutsideHandler(modalRef, () => requestCloseModal(), isEnableClickMonitor)

  // 收到按下 Esc 鍵的事件時關閉彈跳視窗
  const isEnableKeyMonitor = isVisible && isCloseByEsc === true
  useKeyDownHandler(e => e.key === 'Escape' && requestCloseModal(), isEnableKeyMonitor)

  // 讓畫面被鎖定來避免畫面滾動的混亂
  useEffect(() => {
    isVisible ? freezeBody() : unfreezeBody()

    return () => {
      unfreezeBody()
    }
  }, [isVisible])

  return isVisible
    ? ReactDOM.createPortal(
      <div className='cp-modal cp-modal__backdrop'>
        <div className={clsx('cp-modal__box', className)} ref={modalRef} style={{ maxWidth }} >

          {children}

        </div>
      </div>,
      portalTarget
    )
    : null
}

export default Modal
