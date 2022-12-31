import { t } from 'i18next'
import * as yup from 'yup'

/**
 * 建立自定義的 schema 邏輯
 */

/**
 * 檢核字串長度是否在指定範圍內
 * @param min 最小字串長度值
 * @param max 最大字串長度值
 * @returns schema
 */
export const strLengthRangeSchema = (min = 0, max = 10) =>
  yup.string().test({
    name: 'strLengthRangeSchema',
    exclusive: true,
    params: { min, max }, // 這裡的值會可以被帶到 message 中使用
    message: t('__validation_strLengthRange', { min, max })!,
    test: (value) => {
      const valueStr = String(value)
      return valueStr.length >= min && valueStr.length <= max
    }
  })

/**
* 檢核數字的位數是否在範圍內
 * @param max 金額位數上限
 * @returns schema
*/
export const maxDigitNumberSchema = (max = 1) =>
  yup.number().test({
    name: 'maxDigitNumberSchema',
    exclusive: true,
    params: { max },
    message: t('__validation_maxDigitNumber', { max })!,
    test: (value) => {
      if (!value) return true
      return value < Math.pow(10, max)
    }
  })
