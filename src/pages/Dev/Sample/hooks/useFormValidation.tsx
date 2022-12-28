import { FormikHelpers } from 'formik'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'
import { requiredStrSchema, strLengthRangeSchema } from '../../../../utils/validations/schema'
import schemaChain from '../../../../utils/validations/schemaChain'

// 說明 Hook 使用時機：
// - 不是只有因為需要共用才需要拆 Hook 出來
// - 當頁面邏輯太複雜，也可以拆出 Hook 降低頁面複雜度

type FormValues = {
  account: string,
  password: string,
  salary: number
}

const useFormValidation = (initValues: FormValues) => {
  const { t } = useTranslation()
  const [initFormValues, setInitFormValues] = useState(initValues)

  const validationSchema = () =>
    yup.object().shape({
      account:
        yup.string()
          .concat(requiredStrSchema(t('__account' /* 帳號 */))) // 自定邏輯
          .max(5), // 內建邏輯
      password:
        yup.string()
          .concat(requiredStrSchema(t('__pwd' /* 密碼 */)))
          .concat(strLengthRangeSchema(2, 10)),
      salary:
        schemaChain
          .twMoneyAmt(true, t('__salary' /* 月薪 */)) // 自定邏輯串(針對通用且有意義性的資料類型)
    })

  const onFormSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {
    alert(JSON.stringify(values, null, 2))
    actions.setSubmitting(false)
  }

  return { initFormValues, setInitFormValues, validationSchema, onFormSubmit }
}

export default useFormValidation
