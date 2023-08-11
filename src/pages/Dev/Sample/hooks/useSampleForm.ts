import { FormikHelpers } from 'formik'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'
import { getRequiredMsg } from '@/utils/helpers/commonHelper'
import { strLengthRangeSchema } from '@/utils/validations/schema'
import schemaChain from '@/utils/validations/schemaChain'

// 說明 Hook 使用時機：
// - 不是只有因為需要共用才需要拆 Hook 出來
// - 當頁面邏輯太複雜，也可以拆出 Hook 降低頁面複雜度

// 定義表單資料
interface IFormValues {
  account: string
  password: string
  age: number | null
  salary: number | null
}

const useSampleForm = (initValues: IFormValues) => {
  const { t } = useTranslation()
  const [initFormValues, setInitFormValues] = useState(initValues)

  // 檢核邏輯
  const validationSchema = () =>
    yup.object({
      account:
        // 如果必填錯誤訊息需要欄位名稱，就這樣覆寫訊息，只需傳入欄位名稱
        yup.string().required(getRequiredMsg(t('__account' /* 帳號 */)))
          .max(5), // 內建邏輯
      password:
        // 如果必填錯誤訊息不需要欄位名稱，就回應預設通用訊息"請輸入資訊"
        yup.string().required()
          .concat(strLengthRangeSchema(2, 10)), // 自定邏輯
      age:
        // 數字在非必填時，必須加上 nullable 來允許 null 值
        yup.number().nullable(), // 內建邏輯
      salary:
        schemaChain
          .twMoneyAmt(false, t('__salary' /* 月薪 */)!) // 自定邏輯串(針對通用且有意義性的資料類型)
    })

  // 送出表單
  const onFormSubmit = (values: IFormValues, actions: FormikHelpers<IFormValues>) => {
    alert(JSON.stringify(values, null, 2))
    actions.setSubmitting(false)
  }

  // 回傳表單資訊給使用組件
  return { initFormValues, setInitFormValues, validationSchema, onFormSubmit }
}

export default useSampleForm
