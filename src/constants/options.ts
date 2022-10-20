import { IOption } from '../models/common'
import { GENDER } from './enums'

// ==============================
// 定義前端固定的選單內容
// ==============================

/**
 * 性別選單
 */
export const GENDER_OPTIONS: IOption[] = [
  { Value: GENDER.MALE, Label: '男性' },
  { Value: GENDER.FEMALE, Label: '女性' }
]
