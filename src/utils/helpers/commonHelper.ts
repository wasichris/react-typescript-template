import { t } from 'i18next'
import { store } from '../../store'
import { addGlobalMsg, GlobalMsg } from '../../store/slices/msgSlice'

/**
 * 產生 guid
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
 * 產生包含欄位名稱的必填欄位錯誤訊息文字
 * @param fieldName 欄位名稱
 * @returns 包含欄位名稱的必填欄位錯誤訊息
 */
export const getRequiredMsg = (fieldName: string) => {
  return t('__validation_required_with_name', { name: fieldName })
}

/**
 * 顯示文字訊息彈跳視窗(加入訊息佇列)
 * @param globalMsg 文字訊息參數
 */
export const showMsgBox = (globalMsg: GlobalMsg) => store.dispatch(addGlobalMsg(globalMsg))
