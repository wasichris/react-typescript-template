import { FormikHelpers } from 'formik'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'
import sampleApi from '../../../../services/api/sampleApi'
import { loginSuccess } from '../../../../store/slices/appSlice'
import { getRequiredMsg } from '../../../../utils/helpers/commonHelper'
import { showMsgBox } from '../../../../utils/helpers/msgHelper'
import useAppDispatch from '../../../../utils/hooks/useAppDispatch'

interface IFormValues {
  userId: string,
  pcode: string
}

const useLoginForm = (initValues: IFormValues) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const [initFormValues, setInitFormValues] = useState(initValues)
  const [apiSampleLogin] = sampleApi.useSampleLoginMutation()

  const validationSchema = () =>
    yup.object({
      // 如果必填錯誤訊息需要欄位名稱，就這樣覆寫訊息，只需傳入欄位名稱
      userId: yup.string().required(getRequiredMsg(t('__account'))),
      // 如果必填錯誤訊息不需要欄位名稱，就回應預設通用訊息"請輸入資訊"
      pcode: yup.string().required()
    })

  const onFormSubmit = async (values: IFormValues, actions: FormikHelpers<IFormValues>) => {
    const request = { pcode: values.pcode, userId: values.userId }
    const response = await apiSampleLogin(request).unwrap()
    const { header: { returnCode, returnMsg }, body } = response
    if (returnCode.isSuccessCode()) {
      dispatch(loginSuccess({ authToken: body.authCode }))
    } else {
      showMsgBox({ title: '登入', content: `登入失敗(${returnCode}:${returnMsg})` })
    }
    actions.setSubmitting(false)
  }

  return { initFormValues, setInitFormValues, validationSchema, onFormSubmit }
}

export default useLoginForm
