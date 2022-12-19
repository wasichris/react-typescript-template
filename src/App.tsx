import React from 'react'
import { AppModeEnum } from './constants/enums'
import environment from './environment'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <div className="app">

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
