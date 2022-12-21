import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk, RootState } from '..'
import sampleApi from '../../services/api/sampleApi'

// Define the initial state
const initialState = {
  loadingCounter: 0,
  isLogin: false,
  authToken: ''
}

// Slice
// - Model Actions as Events, Not Setters
// - Write Meaningful Action Names
const appSlice = createSlice({
  name: 'app',
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
    updateLoginInfo: (state, action: PayloadAction<{ isLogin: boolean, authToken: string }>) => {
      state.isLogin = action.payload.isLogin
      state.authToken = action.payload.authToken
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

      // start listening auth flow (authListenerMiddleware)
      dispatch(startApp())
    }

// Extra actions
export const startApp = createAction(`${appSlice.name}/startApp`)
export const loginSuccess = createAction<{ authToken: string }>(`${appSlice.name}/loginSuccess`)
export const logout = createAction(`${appSlice.name}/logout`)

// Selection
// plz prefixing selector function names with 'select'
export const selectLoadingCounter = (state: RootState) => state.app.loadingCounter

// Action creators are generated for each case reducer function
export const { increaseLoadingCounter, decreaseLoadingCounter, updateLoginInfo } = appSlice.actions
export default appSlice
