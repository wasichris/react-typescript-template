import React, { useCallback, useEffect, useRef, useState } from 'react'
import { AppModeEnum } from './constants/enums'
import environment from './environment'
import { Outlet } from 'react-router-dom'
import useAppSelector from './utils/hooks/useAppSelector'
import { initApp, selectLoadingApiCounter } from './store/slices/appSlice'
import LoadingMask from './components/common/LoadingMask'
import useAppDispatch from './utils/hooks/useAppDispatch'

function App() {
  const loadingApiCounter = useAppSelector(selectLoadingApiCounter)
  const dispatch = useAppDispatch()
  const isInitApp = useRef(false)
  const [isInitAppSuccess, setIsInitAppSuccess] = useState<boolean | null>(null)
  const initApplication = useCallback(
    async () => {
      if (isInitApp.current === false) {
        // 初始網站，執行進入網站前必備的流程
        isInitApp.current = true
        const isSuccess = await dispatch(initApp())
        setIsInitAppSuccess(isSuccess)
      }
    },
    [dispatch]
  )
  useEffect(() => { initApplication() }, [initApplication])

  return (
    <div className="app">

      {/* api loader */}
      {loadingApiCounter > 0 && <LoadingMask />}

      {/* 識別環境 */}
      {environment.appMode !== AppModeEnum.PROD && (
        <div className="env-info">Mode: {process.env.REACT_APP_MODE}</div>
      )}

      {/* 子路由插入點 */}
      {isInitAppSuccess && <Outlet />}

    </div>
  )
}

export default App
