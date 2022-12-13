import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../setup/setupStore'

// Define the initial state
const initialState = {
  loadingCounter: 0
}

// Slice
const counterSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loadingCounter += 1
    },
    stopLoading: (state) => {
      if (state.loadingCounter > 0) {
        state.loadingCounter -= 1
      }
    },
    resetLoading: (state) => {
      state.loadingCounter = 0
    }
  }
})

// =========

// 可以自己封裝 select 讓外部直接使用來取得特定值
// e.g. const loadingCounter = useAppSelector(state => state.system.loadingCounter)
//      const loadingCounter = useAppSelector(selectLoadingCounter)
export const selectLoadingCounter = (state: RootState) => state.system.loadingCounter

// =========

// Action creators are generated for each case reducer function
export const { startLoading, stopLoading, resetLoading } = counterSlice.actions
export default counterSlice.reducer
