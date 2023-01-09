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

  return (
    <Modal
      {...props}
      className='c-msg-box'
      isCloseByEsc={props.hasCloseBtn}
      isCloseByBackdrop={props.hasCloseBtn}
    >

      {/* Header */}
      <div className='c-msg-box__header'>
        <div className='c-msg-box__title'> {props.title} </div>
        {props.hasCloseBtn && <div className='c-msg-box__close-btn' onClick={props.onRequestClose} />}
      </div>

      {/* Body */}
      <div className='c-msg-box__body'>
        <div className="c-msg-box__content"> {props.content}</div>

      </div>

      {/* Footer */}
      <div className="c-msg-box__footer">
        {props.mainBtn && <Button onClick={handleMainBtnClick} outfit='primary'>{props.mainBtn.label}</Button>}
        {props.minorBtn && <Button onClick={handleMinorBtnClick}>{props.minorBtn.label}</Button>}
      </div>

    </Modal >
  )
}

export default MsgBox
