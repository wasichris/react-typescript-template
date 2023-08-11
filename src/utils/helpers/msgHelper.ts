import { store } from '@/store'
import { addGlobalMsg, GlobalMsg } from '@/store/slices/msgSlice'

/**
 * 顯示文字訊息彈跳視窗(加入訊息佇列)
 * @param globalMsg 文字訊息參數
 */
export const showMsgBox = (globalMsg: GlobalMsg) => {
  store.dispatch(addGlobalMsg(globalMsg))
}
