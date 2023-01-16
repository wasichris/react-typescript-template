import { Action, combineReducers, configureStore, PreloadedState, ThunkAction } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { AppEnvEnum } from '../constants/enums'
import environment from '../environment'
import { baseApiService } from '../services/baseApiService'
import apiErrorHandleMiddleware from './middleware/apiErrorHandleMiddleware'
import apiLoadingMiddleware from './middleware/apiLoadingMiddleware'
import authListenerMiddleware from './middleware/authListenerMiddleware'
import counterSlice from './slices/counterSlice'
import appSlice from './slices/appSlice'
import msgSlice, { addGlobalMsg } from './slices/msgSlice'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // default to localStorage

// Persist state for app reducer
const appPersistConfig = {
  key: appSlice.name,
  storage,
  whitelist: ['isLogin', 'authToken']
}

// Reducer
const rootReducer = combineReducers({
  app: persistReducer(appPersistConfig, appSlice.reducer),
  msg: msgSlice.reducer,
  counter: counterSlice.reducer,
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
export type RootState = ReturnType<typeof rootReducer>
export const initStore =
  (preloadedState?: PreloadedState<RootState>) => configureStore({
    reducer: rootReducer,

    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      // default middleware setting here
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, addGlobalMsg.type],
        ignoredPaths: [msgSlice.name]
      }
    }).prepend(authListenerMiddleware).concat(middleware),

    // dev tools only for development
    devTools: environment.appEnv === AppEnvEnum.DEVELOPMENT,

    // preloaded state for unit test use
    preloadedState
  })
export const store = initStore()

// Persist Store
export const persistor = persistStore(store)

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)

// Type for Store
export type AppStore = ReturnType<typeof initStore>
// Type for Store Dispatch
export type AppDispatch = AppStore['dispatch']
// Type for Redux-thunk
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
