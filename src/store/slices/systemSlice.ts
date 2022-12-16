import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '..'

// Define the initial state
const initialState = {
  loadingCounter: 0,
  isLogin: false
}

// Slice
const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    increaseLoadingCounter: (state) => {
      state.loadingCounter += 1
    },
    decreaseLoadingCounter: (state) => {
      if (state.loadingCounter > 0) {
        state.loadingCounter -= 1
      }
    },
    updateLoginStatus: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload
    }
  }
})

// Extra actions
export const appStart = createAction(`${systemSlice.name}/appStart`)
export const login = createAction<string>(`${systemSlice.name}/login`)
export const logout = createAction(`${systemSlice.name}/logout`)

// =========

// 可以自己封裝 select 讓外部直接使用來取得特定值
// e.g. const loadingCounter = useAppSelector(state => state.system.loadingCounter)
//      const loadingCounter = useAppSelector(selectLoadingCounter)
export const selectLoadingCounter = (state: RootState) => state.system.loadingCounter

// =========

// Action creators are generated for each case reducer function
export const { increaseLoadingCounter, decreaseLoadingCounter, updateLoginStatus } = systemSlice.actions
export default systemSlice.reducer
