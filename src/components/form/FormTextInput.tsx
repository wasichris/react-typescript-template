import clsx from 'clsx'
import { FieldHookConfig, useField } from 'formik'
import { ChangeEvent, ClassAttributes, FocusEvent, InputHTMLAttributes } from 'react'

interface IProps {
  caption?: string | null
}

const FormTextInput = ({ caption, className, ...props }: IProps & InputHTMLAttributes<HTMLInputElement> &
  ClassAttributes<HTMLInputElement> & FieldHookConfig<string | number | null>) => {
  const [field, meta, helpers] = useField(props)

  const hasError = (meta.touched || field.value) && meta.error

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    helpers.setValue(value)
    if (props.onChange) props.onChange(e)
  }

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const value = e.target.value
    helpers.setTouched(true)
    helpers.setValue(value)
    if (props.onBlur) props.onBlur(e)
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
        className="cp-form-text-input__input"
        onChange={handleChange}
        onBlur={handleBlur}
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
