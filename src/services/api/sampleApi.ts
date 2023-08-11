import { base64Encode } from '@/utils/helpers/encodeHelper'
import { baseApiService } from '../baseApiService'
import baseReqCreator from '../baseReqCreator'
import { IBaseRes } from '../models/common'
import {
  ISampleLoginReq,
  ISampleLoginRes,
  ISampleGetProductsReq,
  ISampleGetProductsRes,
  ISampleGetImgReq,
  ISampleGetUserReq,
  ISampleGetUserRes,
  ISampleGetConfigRes
} from '../models/sample'

const sampleApi = baseApiService.injectEndpoints({
  endpoints: (builder) => ({

    // 範例：發出 POST API 並取得 Image (快取:builder.query)
    SampleGetImg: builder.query<string, ISampleGetImgReq>({
      query: (req) => ({
        url: '/sample/get-img',
        method: 'POST',
        body: baseReqCreator(req),
        responseHandler: async (response: Response) => {
          const arrayBuffer = await response.arrayBuffer()
          return 'data:image/png;base64,' + base64Encode(arrayBuffer)
        }
      })
    }),

    // 範例：發出 GET API 並取得 JSON (無快取:builder.mutation)
    SampleGetProducts: builder.mutation<IBaseRes<ISampleGetProductsRes>, ISampleGetProductsReq>({
      query: (req) => ({
        url: `/sample/get-products?category=${req.category}`,
        method: 'GET'
      })
    }),

    // 範例：發出 POST API 並取得 JSON (無快取:builder.mutation)
    SampleGetUser: builder.mutation<IBaseRes<ISampleGetUserRes>, ISampleGetUserReq>({
      query: (req) => ({
        url: '/sample/get-user',
        method: 'POST',
        body: baseReqCreator(req),
        responseHandler: (response: Response & IBaseRes<ISampleGetUserRes>) => {
          // if you want to do something right after response, do it here.
          // e.g. get request header info sample
          // const authToken = response.headers.get('x-auth-token')
          return response.json()
        }
      })
    }),

    // ===

    SampleGetConfig: builder.mutation<IBaseRes<ISampleGetConfigRes>, null>({
      query: (req) => ({
        url: '/sample/get-config',
        method: 'POST',
        body: baseReqCreator(req)
      })
    }),

    SampleLogin: builder.mutation<IBaseRes<ISampleLoginRes>, ISampleLoginReq>({
      query: (req) => ({
        url: '/sample/login',
        method: 'POST',
        body: baseReqCreator(req)
      })
    })

  }),
  overrideExisting: true
})

export default sampleApi
