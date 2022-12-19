import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch, AppThunk, RootState } from '..'
import sampleApi from '../../services/api/sampleApi'

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

// Thunk
export const initApp =
  (): AppThunk =>
    async (dispatch, getState) => {
      // call api to get essential info (e.g. config, request token...)
      const result = await dispatch(sampleApi.endpoints.Sample01.initiate({ category: 'c1' })).unwrap()
      console.log('age result:', result.body.age)

      // everything is ready, then
      // start listener for auth flow
      dispatch(startApp)
    }

// Extra actions
export const startApp = createAction(`${systemSlice.name}/startApp`)
export const login = createAction<string>(`${systemSlice.name}/login`)
export const logout = createAction(`${systemSlice.name}/logout`)

// Selection
export const selectLoadingCounter = (state: RootState) => state.system.loadingCounter

// Action creators are generated for each case reducer function
export const { increaseLoadingCounter, decreaseLoadingCounter, updateLoginStatus } = systemSlice.actions
export default systemSlice.reducer
