import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { AppStore, initStore, RootState } from '../../store'
import { DeepPartial } from '@reduxjs/toolkit'

type CustomRenderOption = Omit<RenderOptions, 'wrapper'> & {
  preloadedState?: DeepPartial<RootState>,
  store?: AppStore,
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
  }: CustomRenderOption = {}
) => {
  window.history.pushState({}, 'testing page', route)
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <Provider store={store} >
        <BrowserRouter>{children} </BrowserRouter>
      </Provider>
    )
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
