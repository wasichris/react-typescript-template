import Button from './Button'
import Modal, { IBaseModalProps } from './common/Modal'

export declare interface IMsgBoxProps extends IBaseModalProps {
  title: string,
  content: string,
  hasCloseBtn?: boolean,
  mainBtn?: {
    label: string,
    onClick?: () => void
  },
  minorBtn?: {
    label: string,
    onClick?: () => void
  }
}

const MsgBox = (props: IMsgBoxProps) => {
  const handleMinorBtnClick = () => {
    props.minorBtn?.onClick && props.minorBtn.onClick()
    props.onRequestClose()
  }

  const handleMainBtnClick = () => {
    props.mainBtn?.onClick && props.mainBtn.onClick()
    props.onRequestClose()
  }

  const isNoWayToClose =
    !props.mainBtn && !props.minorBtn && !props.hasCloseBtn

  return (
    <Modal
      {...props}
      className='cp-msg-box'
      isCloseByEsc={isNoWayToClose || props.hasCloseBtn}
      isCloseByBackdrop={isNoWayToClose || props.hasCloseBtn}
    >
      {/* Close Button */}
      {props.hasCloseBtn && <div className='cp-msg-box__close-btn' onClick={props.onRequestClose} />}

      {/* Header */}
      <div className='cp-msg-box__header'>
        <div className='cp-msg-box__title'> {props.title} </div>
      </div>

      {/* Body */}
      <div className='cp-msg-box__body'>
        <div className="cp-msg-box__content"> {props.content}</div>
      </div>

      {/* Footer */}
      <div className="cp-msg-box__footer">
        {props.mainBtn && <Button onClick={handleMainBtnClick} outfit='primary'>{props.mainBtn.label}</Button>}
        {props.minorBtn && <Button onClick={handleMinorBtnClick}>{props.minorBtn.label}</Button>}
      </div>

    </Modal >
  )
}

export default MsgBox
