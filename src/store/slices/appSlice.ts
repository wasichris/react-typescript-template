import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk, RootState } from '..'
import sampleApi from '../../services/api/sampleApi'

// Define the initial state
const initialState = {
  isLogin: false,
  authToken: '',
  loadingApiList: [] as string[]
}

// Slice
// - Model Actions as Events, Not Setters
// - Write Meaningful Action Names
const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    addLoadingApi: (state, action: PayloadAction<string>) => {
      const { payload: apiRequestId } = action
      state.loadingApiList.push(apiRequestId)
    },
    removeLoadingApi: (state, action: PayloadAction<string>) => {
      const { payload: apiRequestId } = action
      state.loadingApiList = state.loadingApiList.filter(api => api !== apiRequestId)
    },
    updateLoginInfo: (state, action: PayloadAction<{ isLogin: boolean, authToken: string }>) => {
      state.isLogin = action.payload.isLogin
      state.authToken = action.payload.authToken
    }
  }
})

// Thunk
export const initApp =
  (): AppThunk<Promise<boolean>> =>
    async (dispatch, getState) => {
      let isInitAppSuccess = true

      // get essential info (e.g. config, request token...)
      const response = await dispatch(sampleApi.endpoints.SampleGetConfig.initiate(null)).unwrap()
      const { header: { returnCode, returnMsg }/*, body */ } = response
      if (returnCode.isSuccessCode()) {
        // success

        // keep response body for further use
        // ...

        // start listening auth flow (authListenerMiddleware)
        dispatch(startApp())
        isInitAppSuccess = true
      } else {
        // fail
        console.error(`init app fail, ${returnCode}:${returnMsg}`)
        isInitAppSuccess = false
      }

      return isInitAppSuccess
    }

// Extra actions
export const startApp = createAction(`${appSlice.name}/startApp`)
export const loginSuccess = createAction<{ authToken: string }>(`${appSlice.name}/loginSuccess`)
export const logout = createAction(`${appSlice.name}/logout`)

// Selection
// plz prefixing selector function names with 'select'
export const selectLoadingApiCounter = (state: RootState) => state.app.loadingApiList.length

// Action creators are generated for each case reducer function
export const { updateLoginInfo, addLoadingApi, removeLoadingApi } = appSlice.actions
export default appSlice
