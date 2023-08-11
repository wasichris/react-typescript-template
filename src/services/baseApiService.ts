import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
import environment from '@/environment'

const staggeredBaseQueryWithBailOut = retry(

  async (args, api, extraOptions) => {
    // ======================
    // [REQUEST INTERCEPTOR]
    // ======================

    // [Call API]
    const result = await fetchBaseQuery({
      baseUrl: environment.apiUrl,
      timeout: environment.apiTimeout,
      prepareHeaders(headers, { getState }) {
        headers.set('Content-Type', 'application/json; charset=utf-8')
        headers.set('language', 'zh_TW')

        // add request header sample:
        // headers.set('my-auth-token', 'authToken')

        return headers
      }
    })(
      args,
      api,
      extraOptions
    )

    // ======================
    // [RESPONSE INTERCEPTOR]
    // ======================

    // get state sample:
    // (api.getState() as RootState).app.loadingCounter

    // dispatch sample:
    // api.dispatch()

    // get url info:
    // const { endpoint } = api

    // get response sample:
    // (result as CommonResponse).header.returnCode

    return {
      ...result,
      // add other meta info here if needed
      meta: result.meta && { ...result.meta, timestamp: Date.now() }
    }
  },
  {
    // retry times while api fail
    maxRetries: 0
  }
)

/**
 * @description 呼叫 api 的服務，透過 injectEndpoints 加入功能端點
 */
export const baseApiService = createApi({
  reducerPath: 'api', // action type namespace
  baseQuery: staggeredBaseQueryWithBailOut,
  endpoints: () => ({}),
  keepUnusedDataFor: 10 // seconds, unmount<->mount 時間內保留快取
})
