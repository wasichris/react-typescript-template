import React, { useEffect } from 'react'
import { AppModeEnum } from './constants/enums'
import environment from './environment'
import { Outlet } from 'react-router-dom'
import useAppSelector from './utils/hooks/useAppSelector'
import { selectLoadingCounter } from './store/slices/appSlice'
import Loader from './components/common/Loader'

function App() {
  const loadingCounter = useAppSelector(selectLoadingCounter)
  useEffect(() => {
    loadingCounter > 0
      ? document && document.body.classList.add('blocked')
      : document && document.body.classList.remove('blocked')
  }, [loadingCounter])

  return (
    <div className="app">

      {/* api loader */}
      {loadingCounter > 0 &&
        <div className="app-mask"> <Loader /> </div>}

      {/* 識別環境 */}
      {environment.appMode !== AppModeEnum.PROD && (
        <div className="env-info">Mode: {process.env.REACT_APP_MODE}</div>
      )}

      {/* 子路由插入點 */}
      <Outlet />

    </div>
  )
}

export default App
