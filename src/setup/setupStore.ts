import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { baseApiService } from '../services/baseApiService'
import counterSlice from '../store/slices/counterSlice'
import systemSlice from '../store/slices/systemSlice'

// Reducer
const rootReducer = combineReducers({
  counter: counterSlice,
  system: systemSlice,
  // Add the generated reducer as a specific top-level slice
  [baseApiService.reducerPath]: baseApiService.reducer
})

// Middleware
const middleware = [
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
  }).concat(middleware)
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {counter: counterState}
export type AppDispatch = typeof store.dispatch
