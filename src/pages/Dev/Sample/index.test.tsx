import { DeepPartial } from '@reduxjs/toolkit'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Sample from '.'
import { mockedUseNavigate, mswServer } from '../../../setupTests'
import { initStore, RootState } from '../../../store'
import { renderWithProviders } from '../../../utils/helpers/unitTestHelper'
import { addLoadingApi } from '../../../store/slices/appSlice'
import { rest } from 'msw'
import { createRes, getApiUrl } from '../../../mocks/mockHelper'
import { ISampleGetUserRes } from '../../../services/models/sample'

describe('測試 Sample 範例頁面', () => {
  // =========================
  // Lifecycle for testing
  // =========================
  beforeEach(() => {
    // 因 Sample 頁面載入時就會馬上呼叫以下 api，所以統一在這邊定義 api mock
    mswServer.use(
      rest.post(getApiUrl('/sample/get-img'), (req, res, ctx) => {
        const imageBuffer = new ArrayBuffer(20)
        return res(
          ctx.set('Content-Length', imageBuffer.byteLength.toString()),
          ctx.set('Content-Type', 'image/jpeg'),
          ctx.status(200),
          ctx.delay(),
          ctx.body(imageBuffer)
        )
      })
    )
  })

  // =========================
  // Testing DOM
  // =========================

  test('傳入 props 顯示在對應 DOM 位置', async () => {
    // Arrange
    const title = '這個是標題'
    renderWithProviders(<Sample title={title} />)

    // Assert
    expect(screen.getByTestId('title')).toHaveTextContent(title)
  })

  test('傳入 props 顯示在對應 DOM 位置(更新 props 值)', () => {
    // Arrange1
    const title1 = '這個是標題1'
    const { rerender } = renderWithProviders(
      <Sample title={title1} />
    )
    // Assert1
    expect(screen.getByTestId('title')).toHaveTextContent(title1)

    // Arrange2 (更改傳入值)
    const title2 = '這個是標題2'
    rerender(
      <Sample title={title2} />
    )
    // Assert2
    expect(screen.getByTestId('title')).toHaveTextContent(title2)
  })

  // =========================
  // Testing Function
  // =========================

  test('測試 callback function 是否被執行', async () => {
    // Arrange
    const onSomethingDoneFn = jest.fn()
    renderWithProviders(<Sample onSomethingDone={onSomethingDoneFn} />)

    // Act
    const doSomethingBtn = screen.getByTestId('doSomethingBtn')
    userEvent.click(doSomethingBtn) // 模擬使用者點擊

    // Assert
    expect(onSomethingDoneFn).toBeCalledTimes(1)
  })

  // =========================
  // Testing Navigate
  // =========================

  test('測試 useNavigate 導頁', async () => {
    // Arrange
    renderWithProviders(<Sample />)

    // Act
    const goUser01Btn = screen.getByTestId('goUser01Btn')
    userEvent.click(goUser01Btn) // 模擬使用者點擊

    // Assert
    expect(mockedUseNavigate).toHaveBeenCalledWith('/dev/sample/user01')
  })

  test('測試 link 導頁', async () => {
    // Arrange
    renderWithProviders(<Sample />, { route: '/' })

    // Act
    const goUser03Link = screen.getByTestId('goUser03Link')
    userEvent.click(goUser03Link) // 模擬使用者點擊

    // Assert
    const url = new URL(window.location.href)
    expect(url.pathname).toBe('/dev/sample/user03')
    expect(url.searchParams.has('id')).toBe(true)
    expect(url.searchParams.get('id')).toEqual('1234')
  })

  // =========================
  // Testing Redux Only
  // =========================

  test('操作 store 執行 dispatch 變更 redux 狀態', () => {
    // Arrange
    // 測案需指定初始 state 時才需要設定 preloadedState
    // 注意：如果指定 app slice 中某個屬性而已，則 app 其他狀態會視為 undefined
    //      而其他 slice 並不會有影響，會使用預設的 initial state
    const preloadedState: DeepPartial<RootState> = { app: { loadingApiList: ['api-01'] } }
    const store = initStore(preloadedState)

    // Act
    store.dispatch(addLoadingApi('api-01'))

    // Assert
    const appState = store.getState().app
    expect(appState.loadingApiList.length).toBe(2)
  })

  // =========================
  // Testing Redux with Component
  // =========================

  test('操作 component 執行 dispatch 變更 redux 狀態', async () => {
    // Arrange
    // 測案需指定初始 state 時才需要設定 preloadedState
    // 注意：如果指定 counter slice 中某個屬性而已，則 counter 其他狀態會視為 undefined
    //      而其他 slice 並不會有影響，會使用預設的 initial state
    const { store } = renderWithProviders(<Sample />, {
      preloadedState: { counter: { value: 99 } }
    })

    // Act
    const addCounterBtn = screen.getByTestId('addCounterBtn')
    userEvent.click(addCounterBtn) // 模擬使用者點擊

    // Assert
    const counterState = store.getState().counter
    expect(counterState.value).toBe(100)
  })

  // =========================
  // Testing API(整合測試)
  // =========================

  test('測試呼叫 API 並把結果顯示在畫面', async () => {
    // Arrange
    mswServer.use(
      rest.post(getApiUrl('/sample/get-user'), (req, res, ctx) => {
        const response = createRes<ISampleGetUserRes>({ username: 'chris', firstName: 'chen' })
        return res(ctx.status(200), ctx.delay(), ctx.json(response))
      })
    )
    renderWithProviders(<Sample />)

    // Act
    const callSampleGetUserApiBtn = screen.getByTestId('callSampleGetUserApiBtn')
    userEvent.click(callSampleGetUserApiBtn) // 模擬使用者點擊

    // Assert
    // 找 element 中的文字要全正確 (找不到就失敗，不用 expect)
    await screen.findByText('username : chris chen')
    // 找 element 中的部分文字要正確 (找不到就失敗，不用 expect)
    await screen.findByText('chris chen', { exact: false })
    // 非同步要用 waitFor 等待，並透過 testid 找到 element 來比較 expect 文字
    await waitFor(() => expect(screen.getByTestId('username')).toHaveTextContent('chris chen'))
  })
})

export default {}
