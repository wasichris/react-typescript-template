import { FieldHookConfig, useField } from 'formik'
import { ChangeEvent, ClassAttributes, FocusEvent, InputHTMLAttributes } from 'react'

interface IProps {
  caption?: string
}

const FormTextInput = ({ caption, ...props }: IProps & InputHTMLAttributes<HTMLInputElement> &
  ClassAttributes<HTMLInputElement> & FieldHookConfig<string>) => {
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

  return (
    <>
      <input
        {...field}
        {...props}
        className="form-text-input"
        onChange={handleChange}
        onBlur={handleBlur}
        autoComplete="off"
      />

      {caption ? <div className="form-text-input__caption"> {caption} </div> : null}

      {hasError ? <div className="form-text-input__error" > {meta.error} </div> : null}
    </>
  )
}

export default FormTextInput
