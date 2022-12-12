import React from 'react'
import { AppModeEnum } from './constants/enums'
import environment from './environment'
import AppRoutes from './AppRoutes'

function App() {
  return (
    <div className="app">

      {/* 識別環境 */}
      {environment.appMode !== AppModeEnum.PROD && (
        <div className="env-info">Mode: {process.env.REACT_APP_MODE}</div>
      )}

      {/* 網站路由 */}
      <AppRoutes />

    </div>
  )
}

export default App
