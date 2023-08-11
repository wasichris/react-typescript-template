
import { Action, MiddlewareAPI, isRejectedWithValue, Middleware } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from '..'
import { showMsgBox } from '@/utils/helpers/msgHelper'
import { logout } from '../slices/appSlice'

/**
 * 攔截 api 回應異常的狀況來進行統一的邏輯處置
 */
const apiErrorHandleMiddleware =
  ({ dispatch, getState }: MiddlewareAPI<AppDispatch, RootState>) =>
    (next: (action: Action) => void) =>
      (action: any) => {
        // only fetch when http code !== 200
        if (isRejectedWithValue(action)) {
          const httpCode = action.payload?.originalStatus || action.payload?.status
          if (httpCode) {
            switch (httpCode) {
              case 'FETCH_ERROR':
                // 用戶端網路異常，連不到伺服器
                showMsgBox({
                  title: '錯誤',
                  content: '網路連線不穩定，請稍候再試',
                  hasCloseBtn: true
                })

                break

              case 401:
                // 無權限訪問站台
                showMsgBox({
                  title: '錯誤',
                  content: '無權限訪問站台，請重新登入',
                  mainBtn: {
                    label: 'Ok',
                    onClick: () => {
                      if (getState().app.isLogin) {
                        dispatch(logout())
                      }
                    }
                  }
                })

                break

              default:
                // 伺服器回應非200的狀態碼
                showMsgBox({
                  title: '錯誤',
                  content: `目前系統忙碌中，請稍後再試！(${httpCode})`,
                  hasCloseBtn: true
                })

                break
            }
          }
        }
        return next(action)
      }

const middleware = apiErrorHandleMiddleware as Middleware
export default middleware
