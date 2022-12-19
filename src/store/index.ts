import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { AppEnvEnum } from '../constants/enums'
import environment from '../environment'
import { baseApiService } from '../services/baseApiService'
import apiErrorHandleMiddleware from './middleware/apiErrorHandleMiddleware'
import apiLoadingMiddleware from './middleware/apiLoadingMiddleware'
import authListenerMiddleware from './middleware/authListenerMiddleware'
import counterSlice from './slices/counterSlice'
import systemSlice, { initApp } from './slices/systemSlice'

// Reducer
const rootReducer = combineReducers({
  counter: counterSlice,
  system: systemSlice,
  // Add the generated reducer as a specific top-level slice
  [baseApiService.reducerPath]: baseApiService.reducer
})

// Middleware
const middleware = [
  apiErrorHandleMiddleware,
  apiLoadingMiddleware,
  baseApiService.middleware
]

// Store
export const store = configureStore({
  reducer: rootReducer,

  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    // default middleware setting here
    // ...
  }).prepend(authListenerMiddleware).concat(middleware),

  // dev tools only for development
  devTools: environment.appEnv === AppEnvEnum.DEVELOPMENT
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)

// init app
store.dispatch(initApp())

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {counter: counterState}
export type AppDispatch = typeof store.dispatch
// Type for Redux-thunk
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
