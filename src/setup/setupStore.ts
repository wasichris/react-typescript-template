import { combineReducers, configureStore } from '@reduxjs/toolkit'
import counterSlice from '../store/slices/counterSlice'
import systemSlice from '../store/slices/systemSlice'

// Reducer
const rootReducer = combineReducers({
  counter: counterSlice,
  system: systemSlice
})

// Store
export const store = configureStore({
  reducer: rootReducer
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {counter: counterState}
export type AppDispatch = typeof store.dispatch
