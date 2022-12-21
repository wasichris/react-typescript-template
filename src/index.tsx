import React from 'react'
import ReactDOM from 'react-dom/client'

import './utils/extensions/stringExtensions'
import './i18n'
import './assets/scss/app.scss'

import { persistor, store } from './store'
import { Provider } from 'react-redux'
import reportWebVitals from './reportWebVitals'
import { RouterProvider } from 'react-router-dom'
import environment from './environment'
import { AppEnvEnum } from './constants/enums'
import router from './router'
import { PersistGate } from 'redux-persist/integration/react'

if (environment.appEnv === AppEnvEnum.DEVELOPMENT) {
  const { worker } = require('./mocks/browser')
  worker.start({
    onUnhandledRequest: 'bypass',
    serviceWorker: {
      url: `${process.env.PUBLIC_URL}/mockServiceWorker.js`
    }
  })
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
