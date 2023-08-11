
import { createListenerMiddleware, isAnyOf, TaskAbortError } from '@reduxjs/toolkit'
import { RootState } from '..'
import { startApp, loginSuccess, logout, updateLoginInfo } from '../slices/appSlice'
import { appNavigate } from '@/router'
import { getQueryStrValue } from '@/utils/helpers/urlHelper'

const authListenerMiddleware = createListenerMiddleware()

authListenerMiddleware.startListening({
  actionCreator: startApp,
  // matcher: isAnyOf(increment, decrement),
  effect: async (action, listenerApi) => {
    // Cancels all other running instances of this same listener
    // except for the one that made this call.
    listenerApi.cancelActiveListeners()

    // State Machines for auth
    const { take, dispatch, getState /* getOriginalState */ } = listenerApi
    try {
      while (true) {
        // 檢查目前是否為已登入狀態
        const getRootState = getState as () => RootState
        const isLogin = getRootState().app.isLogin
        if (isLogin === false) {
          // #############
          // ### 未登入 ###
          // #############

          // [阻塞] 等待登入成功訊號
          const [{ payload: { authToken } }] = await take(loginSuccess.match)

          // 處理登入事宜
          dispatch(updateLoginInfo({ authToken, isLogin: true }))

          // 回到原本欲訪問的頁面
          const redirectUrl = getQueryStrValue('redirect_url')
          redirectUrl ? appNavigate(redirectUrl) : appNavigate('/home/main')
        } else {
          // #############
          // ### 已登入 ###
          // #############

          // [阻塞] 等待登出要求訊號
          await take(isAnyOf(logout))

          // 處理登出事宜
          dispatch(updateLoginInfo({ authToken: '', isLogin: false }))
          appNavigate('/public/login')
        }
      }
    } catch (error) {
      if (error instanceof TaskAbortError && action.type === startApp.type) {
        console.warn('authListenerMiddleware abort due to re-startApp')
      } else {
        console.error('authListenerMiddleware error:', error)
      }
    }

    // 如果 take 多個 action 時，可以這樣識別是哪個 action 符合
    // increment.match(action)

    // 複雜狀態，如 state 變化，可以用 condition 做條件
    // const isLogoutDone = listenerApi.condition((action, currentState, previousState) => {
    //   const preState = previousState as RootState
    //   const curState = currentState as RootState
    //   return preState.app.isLogin === true && curState.app.isLogin === false
    // })

    // Spawn "child tasks" that can do more work and return results
    // const task = listenerApi.fork(async (forkApi) => {
    //   // Can pause execution
    //   await forkApi.delay(5)
    //   // Complete the child by returning a value
    //   return 42
    // })
  }
})

export default authListenerMiddleware.middleware
