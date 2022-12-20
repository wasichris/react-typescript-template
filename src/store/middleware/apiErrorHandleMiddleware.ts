
import { Action, MiddlewareAPI, isRejectedWithValue } from '@reduxjs/toolkit'
import router from '../../router'

/**
 * 攔截 api 回應異常的狀況來進行統一的邏輯處置
 */
const apiErrorHandleMiddleware =
  (api: MiddlewareAPI) =>
    (next: (action: Action) => void) =>
      (action: any) => {
        // only fetch when http code !== 200
        if (isRejectedWithValue(action)) {
          const httpCode = action.payload?.originalStatus || action.payload?.status
          if (httpCode) {
            switch (httpCode) {
              case 'FETCH_ERROR':
                // 用戶端網路異常，連不到伺服器
                alert('網路連線不穩定，請稍候再試')
                break

              case 401:
                // 無權限訪問站台
                alert('無權限訪問站台，請重新登入')
                router.navigate('/public/login')
                break

              default:
                // 伺服器回應非200的狀態碼
                alert(`目前系統忙碌中，請稍後再試！(${httpCode})`)
                break
            }
          }
        }
        return next(action)
      }

export default apiErrorHandleMiddleware
