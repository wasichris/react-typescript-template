
import { isPending, isFulfilled, isRejected, Action, MiddlewareAPI, Middleware } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from '..'
import { addLoadingApi, removeLoadingApi } from '../slices/appSlice'

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
  ({ dispatch }: MiddlewareAPI<AppDispatch, RootState>) =>
    (next: (action: Action) => void) =>
      (action: any) => {
        const endpointName = action?.meta?.arg?.endpointName
        if (endpointName) {
          if (ignoreLoadingList.includes(endpointName)) {
            return next(action)
          } else if (isPending(action)) {
            dispatch(addLoadingApi(action.meta.requestId))
          } else if (isFulfilled(action)) {
            dispatch(removeLoadingApi(action.meta.requestId))
          } else if (isRejected(action)) {
            dispatch(removeLoadingApi(action.meta.requestId))
          }
        }
        return next(action)
      }

const middleware = apiLoadingMiddleware as Middleware
export default middleware
