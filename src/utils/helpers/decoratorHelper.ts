import 'reflect-metadata'
import { IOption } from '@/models/common'
import i18n from '@/i18n'

const ENUM_DESCRIPTION_METADATA_KEY = Symbol('EnumDescription')

/**
 * 裝飾列舉屬性說明之方法
 * @param description 說明文字
 * @returns 列舉屬性裝飾函式
 */
export function EnumDescription(description: string): any {
  return Reflect.metadata(ENUM_DESCRIPTION_METADATA_KEY, description)
}

/**
 * 取得列舉(Enum)類別的 EnumDescription 設定
 * @param target Enum class
 * @param value 值
 * @returns EnumDescription 設定值
 */
export function getEnumDescription(target: any, value: any): string {
  // check property naming for enum snake upper case(example: HELLO_WORLD)
  const regex = /^[A-Z]+(?:_[A-Z]+)*$/gm
  const prop = Object.getOwnPropertyNames(target).find(
    (x) => target[x] === value && regex.test(x)
  )
  if (prop) {
    const description = Reflect.getMetadata(ENUM_DESCRIPTION_METADATA_KEY, target, prop) as string
    return getI18nText(description)
  } else {
    return value.toString()
  }
}

/**
 * 取得列舉(Enum)類別的選單陣列
 * @param target Enum class
 * @returns 依照 EnumDescription 設定值產生的選單陣列
 */
export function getEnumOptions(target: any): IOption[] {
  const regex = /^[A-Z]+(?:_[A-Z]+)*$/gm
  const options: IOption[] = Object.getOwnPropertyNames(target)
    .filter(prop => {
      regex.lastIndex = 0
      return regex.test(prop)
    })
    .map(prop => {
      const description = Reflect.getMetadata(ENUM_DESCRIPTION_METADATA_KEY, target, prop) as string
      const label = description ? getI18nText(description) : prop
      return {
        value: target[prop],
        label
      }
    })
  return options
}

/**
 * 當 description 放置語系key值時，轉換成語系文字
 * @param description EnumDescription 設定值
 * @returns 語系文字
 */
const getI18nText = (description: string) => {
  if (description) {
    return description.indexOf('__') > -1 ? i18n.t(description) : description
  }
  return ''
}
