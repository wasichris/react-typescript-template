import { FormikHelpers } from 'formik'
import { useState } from 'react'
import * as yup from 'yup'
import sampleApi from '../../../../services/api/sampleApi'
import { loginSuccess } from '../../../../store/slices/appSlice'
import useAppDispatch from '../../../../utils/hooks/useAppDispatch'

interface IFormValues {
  userId: string,
  pcode: string
}

const useLoginForm = (initValues: IFormValues) => {
  const dispatch = useAppDispatch()
  const [initFormValues, setInitFormValues] = useState(initValues)
  const [apiSampleLogin] = sampleApi.useSampleLoginMutation()

  const validationSchema = () =>
    yup.object({
      userId: yup.string().required(),
      pcode: yup.string().required()
    })

  const onFormSubmit = async (values: IFormValues, actions: FormikHelpers<IFormValues>) => {
    const request = { pcode: values.pcode, userId: values.userId }
    const response = await apiSampleLogin(request).unwrap()
    const { header: { returnCode, returnMsg }, body } = response
    if (returnCode.isSuccessCode()) {
      dispatch(loginSuccess({ authToken: body.authCode }))
    } else {
      alert(`登入失敗(${returnCode}:${returnMsg})`)
    }
    actions.setSubmitting(false)
  }

  return { initFormValues, setInitFormValues, validationSchema, onFormSubmit }
}

export default useLoginForm
