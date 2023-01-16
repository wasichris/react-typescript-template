import React, { PropsWithChildren, ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { AppStore, initStore, RootState } from '../../store'
import { PreloadedState } from '@reduxjs/toolkit'

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>
  store?: AppStore
  route?: string
}

export const renderWithProviders = (
  ui: ReactElement,
  {
    // 傳入特定 slice's state 來取代 init state
    preloadedState = {},
    // 當呼叫端不將 store 傳入時，可以自動建立預設 store 來使用
    // 且依照傳入特定 slice 的 state 來取代 init state 進行測試
    store = initStore(preloadedState),
    // 傳入特定 route path 作為初始位置
    route = '/',
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  window.history.pushState({}, 'testing page', route)
  const Wrapper = ({ children }: PropsWithChildren<{}>): JSX.Element => {
    return (
      <Provider store={store} >
        <BrowserRouter>{children} </BrowserRouter>
      </Provider>
    )
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
