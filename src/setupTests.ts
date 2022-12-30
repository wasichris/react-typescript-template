import '@testing-library/jest-dom'
import { setupServer } from 'msw/node'

// ===================================
// 在執行每個 Test Suites 前會被執行一次
// ===================================

// ========
// 必要載入
// ========
import './utils/extensions/stringExtensions'
import './i18n'

// ========
// MOCK
// ========

export const mockedUseNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate
}))

// ==========
// LIFE CYCLE
// ==========

export const mswServer = setupServer()

beforeAll(() => {
  // 啟動 API mocking
  mswServer.listen()
})

afterEach(() => {
  // 重設 API Handles 避免沿用到其他測案的回應設定
  mswServer.resetHandlers()
})

afterAll(() => {
  // 關閉 API mocking
  mswServer.close()
})
