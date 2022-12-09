
import * as yup from 'yup'
import {
  maxDigitNumberSchema,
  requiredNumSchema
} from './schema'

/**
 * 建立複合性 schema 邏輯串(複合邏輯)
 * 針對通用且有意義性的資料檢核邏輯設立
 */

export default {

  /**
   * 台幣金額檢核邏輯[需大於0且上限10位數] (e.g. 月收入、貸款金額)
   * @param isRequired 是否必填
   * @param name 欄位名稱
   * @returns
   */
  twMoneyAmt: (isRequired: boolean, name: string) => {
    return yup
      .number()
      .concat(isRequired ? requiredNumSchema(name) : yup.number())
      .integer()
      .moreThan(0)
      .concat(maxDigitNumberSchema(10))
  }

}
