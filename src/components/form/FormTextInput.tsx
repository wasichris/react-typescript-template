import clsx from 'clsx'
import { FieldHookConfig, useField } from 'formik'
import { ChangeEvent, ClassAttributes, FocusEvent, InputHTMLAttributes, KeyboardEvent, useEffect, useRef } from 'react'

interface IProps {
  caption?: string | null
}

const FormTextInput = ({ caption, className, ...props }: IProps & InputHTMLAttributes<HTMLInputElement> &
  ClassAttributes<HTMLInputElement> & FieldHookConfig<string | number | null>) => {
  const [field, meta, helpers] = useField(props)
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

    return () => {
      input?.removeEventListener('wheel', handleWheel)
    }
  }, [isNumberType])

  useEffect(() => {
    // Convert null field values to empty strings.
    // Otherwise, Formik will treat null as an invalid number or string and generate an error.
    if (!hasValue(field.value)) {
      helpers.setValue('')
    }
  }, [field.value, helpers])

  const updateValue = (value: string) => {
    if (isNumberType) {
      helpers.setValue(value ? Number(value) : value)
    } else {
      helpers.setValue(value)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateValue(e.target.value)
    if (props.onChange) props.onChange(e)
  }

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    helpers.setTouched(true)
    updateValue(e.target.value)
    if (props.onBlur) props.onBlur(e)
  }

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

  const hasValue = (value: string | number | null) => {
    return value !== null && value !== undefined
  }

  return (
    <div className={clsx('cp-form-text-input', className)}>
      <input
        {...field}
        {...props}
        // ReactDOM considers an input as a controlled component only when its value != null.
        // As undefined is equal to null in js, an input value cannot be undefined either.
        // So change the null/undefined value to '' to make the input a controlled component.
        value={hasValue(field.value) ? field.value! : ''}
        inputMode={getInputMode()}
        className='cp-form-text-input__input'
        onChange={handleChange}
        onBlur={handleBlur}
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
