import { IOption } from '../models/common'
import { GenderEnum } from './enums'

// ==============================
// 定義前端固定的選單內容
// ==============================

/**
 * 性別選單
 */
export const genderOptions: IOption[] = [
  { value: GenderEnum.Male, label: '男性' },
  { value: GenderEnum.Female, label: '女性' }
]
