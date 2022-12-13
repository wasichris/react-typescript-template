import environment from '../environment'

/**
 * 取得完整 api 路徑
 * @param path  api 路徑
 * @returns 完整 api 路徑
 */
export const getApiUrl = (path: string) => {
  const { protocol, host } = window.location
  const fixedPath = path.indexOf('/') === 0 ? path : `/${path}`
  return `${protocol}//${host}${environment.apiUrl}${fixedPath}`
}

/**
 * @description 產生 guid
 * @returns guid
 */
export const getGuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/**
 * 隨機產生固定長度的整數
 * @param length 數字長度
 * @returns 整數
 */
export const getRandomInt = (length: number) => {
  return Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1))
}

/**
 * 隨機產生在範圍內的整數
 * @param min 下限
 * @param max 上限
 * @returns 整數
 */
export const getRandomIntRange = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * 隨機產生在陣列內的項目
 * @param items 待選選項
 * @returns 選項
 */
export const getRandomArrayItem = (items: number[] | string[] | boolean[]) => {
  const randomIndex = Math.floor(Math.random() * items.length)
  return items.slice(randomIndex, randomIndex + 1)[0]
}
