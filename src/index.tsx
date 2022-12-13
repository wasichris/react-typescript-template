import React from 'react'
import ReactDOM from 'react-dom/client'

import './setup/setupI18n'
import './setup/setupYup'
import './assets/scss/app.scss'

import App from './App'
import { store } from './setup/setupStore'
import { Provider } from 'react-redux'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import environment from './environment'
import { AppEnvEnum } from './constants/enums'

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
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
