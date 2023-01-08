import clsx from 'clsx'
import { PropsWithChildren, useCallback, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import { freezeBody, unfreezeBody } from '../../utils/helpers/domHelper'
import useClickOutside from '../../utils/hooks/useClickOutside'

export declare interface IBaseModalProps {
  isVisible: boolean,
  onRequestClose: () => void
}

interface IProps extends IBaseModalProps {
  isCloseByBackdrop?: boolean,
  isCloseByEsc?: boolean,
  maxWidth?: string,
  target?: HTMLElement,
  className?: string
}

const Modal = ({ className, isVisible, isCloseByBackdrop, isCloseByEsc, children, maxWidth, target, onRequestClose }: PropsWithChildren<IProps>) => {
  // 將彈跳視窗移出到特定的元素上
  const portalTarget = target || document.body

  const requestCloseModal = useCallback(() => {
    isVisible && onRequestClose && onRequestClose()
  }, [isVisible, onRequestClose])

  // 點選 Backdrop 來關閉彈跳視窗
  const modalRef = useRef<HTMLDivElement>(null)
  useClickOutside(modalRef, () => isCloseByBackdrop && requestCloseModal(), true)

  // 收到按下 Esc 鍵的事件時關閉彈跳視窗
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') isCloseByEsc && requestCloseModal()
    },
    [isCloseByEsc, requestCloseModal]
  )

  // 監看 window 下的所有 keydown 事件
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  // 讓畫面被鎖定來避免畫面滾動的混亂
  useEffect(() => {
    isVisible ? freezeBody() : unfreezeBody()

    return () => {
      unfreezeBody()
    }
  }, [isVisible])

  return isVisible
    ? ReactDOM.createPortal(
      <div className={clsx('c-modal c-modal__backdrop', className)}>
        <div className='c-modal__box' ref={modalRef} style={{ maxWidth }} >

          {children}

        </div>
      </div>,
      portalTarget
    )
    : null
}

export default Modal
