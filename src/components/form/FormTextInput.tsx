import clsx from 'clsx'
import { FieldHookConfig, useField } from 'formik'
import { ClassAttributes, InputHTMLAttributes, KeyboardEvent, useEffect, useRef } from 'react'

interface IProps {
  caption?: string | null
}

const FormTextInput = ({ caption, className, ...props }: IProps & InputHTMLAttributes<HTMLInputElement> &
  ClassAttributes<HTMLInputElement> & FieldHookConfig<string | number | null>) => {
  const [field, meta] = useField(props)
  const hasError = (meta.touched || field.value) && meta.error
  const isNumberType = props.type === 'number'
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // avoid scrolling wheel to change the number value
    const input = inputRef.current
    const handleWheel = (e: WheelEvent) => {
      if (isNumberType && input === document.activeElement) {
        e.preventDefault()
      }
    }
    input?.addEventListener('wheel', handleWheel, { passive: false })

    return () => { input?.removeEventListener('wheel', handleWheel) }
  }, [isNumberType])

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const invalidChars = ['-', '+', 'e']
    if (isNumberType && invalidChars.includes(e.key)) {
      e.preventDefault()
    }
  }

  const getInputMode = () => {
    switch (props.type) {
      case 'number': return 'decimal'
      case 'tel': return 'tel'
      case 'email': return 'email'
      default: return undefined
    }
  }

  return (
    <div className={clsx('cp-form-text-input', className)}>
      <input
        {...field}
        {...props}
        // ReactDOM considers an input as a controlled component only when its value != null.
        // As undefined is equal to null in js, an input value cannot be undefined either.
        // So change the null/undefined value to '' to make the input a controlled component.
        value={field.value ?? ''}
        inputMode={getInputMode()}
        className='cp-form-text-input__input'
        onKeyDown={handleKeyDown}
        ref={inputRef}
        autoComplete='off'
      />

      {/* 提示文字 */}
      {caption ? <div className='cp-form-text-input__caption'> {caption} </div> : null}

      {/* 檢核錯誤提示 */}
      {hasError ? <div className='cp-form-text-input__error' > {meta.error} </div> : null}
    </div>
  )
}

export default FormTextInput
