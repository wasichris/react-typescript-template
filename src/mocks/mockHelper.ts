import environment from '../environment'
import { IBaseRes } from '../services/models/common'

/**
 * 依據傳入的 api 相對路徑，取得完整 api 路徑
 * @param relatedApiPath  api 相對路徑
 * @returns 完整 api 路徑
 */
export const getApiUrl = (relatedApiPath: string) => {
  const isFullUrl = environment.apiUrl.indexOf('http') > -1
  const fixedPath = relatedApiPath.indexOf('/') === 0 ? relatedApiPath : `/${relatedApiPath}`
  const { protocol, host } = window.location

  return isFullUrl
    ? `${environment.apiUrl}${fixedPath}`
    : `${protocol}//${host}${environment.apiUrl}${fixedPath}`
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

/**
 * 隨機產生陣列
 * @param arraySize 陣列大小
 * @param createItem 產生陣列項目的方法
 * @returns
 */
export const getRandomArray = (arraySize: number, createItem: () => any) => {
  const array: any[] = []
  for (let index = 0; index < arraySize; index++) {
    array.push(createItem())
  }
  return array
}

/**
 * 快速建立 response 結構
 * @param body response body
 * @param returnCode response returnCode
 * @param returnMsg response returnMsg
 * @returns response 結構
 */
export const createRes = <T>(body: T, returnCode: string = '0000', returnMsg: string = ''): IBaseRes<T> => {
  return {
    header: {
      returnCode,
      returnMsg
    },
    body
  }
}
