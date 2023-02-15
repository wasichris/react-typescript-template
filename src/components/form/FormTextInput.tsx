import clsx from 'clsx'
import { FieldHookConfig, useField } from 'formik'
import { ChangeEvent, ClassAttributes, FocusEvent, InputHTMLAttributes, KeyboardEvent, WheelEvent } from 'react'

interface IProps {
  caption?: string | null
}

const FormTextInput = ({ caption, className, ...props }: IProps & InputHTMLAttributes<HTMLInputElement> &
  ClassAttributes<HTMLInputElement> & FieldHookConfig<string | number | null>) => {
  const [field, meta, helpers] = useField(props)
  const hasError = (meta.touched || field.value) && meta.error
  const isNumberType = props.type === 'number'

  const updateValue = (value: string) => {
    if (isNumberType) {
      helpers.setValue(value ? Number(value) : null)
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

  const handleWheel = (e: WheelEvent<HTMLInputElement>) => {
    // avoid scrolling wheel to change the number value
    isNumberType && e.currentTarget.blur()
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
        className="cp-form-text-input__input"
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onWheel={handleWheel}
        autoComplete="off"
      />

      {/* 提示文字 */}
      {caption ? <div className="cp-form-text-input__caption"> {caption} </div> : null}

      {/* 檢核錯誤提示 */}
      {hasError ? <div className="cp-form-text-input__error" > {meta.error} </div> : null}
    </div>
  )
}

export default FormTextInput
