
import { isPending, isFulfilled, isRejected, Action, MiddlewareAPI } from '@reduxjs/toolkit'
import { AppDispatch } from '..'
import { increaseLoadingCounter, decreaseLoadingCounter } from '../slices/appSlice'

/**
 * 不列入 loading api 計算的清單
 */
const ignoreLoadingList = [
  'Sample01'
]

/**
 * 攔截 api 執行狀態去更新正在 loading api 數量
 */
const apiLoadingMiddleware =
  (api: MiddlewareAPI) =>
    (next: (action: Action) => void) =>
      (action: any) => {
        const dispatch = api.dispatch as AppDispatch
        // const state = api.getState() as RootState

        // 只有api action才控制spinner
        const endpointName = action?.meta?.arg?.endpointName
        if (endpointName) {
          if (ignoreLoadingList.includes(endpointName)) {
            return next(action)
          } else if (isPending(action)) {
            dispatch(increaseLoadingCounter())
          } else if (isFulfilled(action)) {
            dispatch(decreaseLoadingCounter())
          } else if (isRejected(action)) {
            dispatch(decreaseLoadingCounter())
          }
        }
        return next(action)
      }

export default apiLoadingMiddleware
