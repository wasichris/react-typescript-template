import { base64Encode } from '../../utils/encodeHelper'
import { baseApiService } from '../baseApiService'
import baseReq from '../baseReq'
import { IBaseRes } from '../models/common'
import { ISample01Req, ISample01Res, ISample02Req, ISample03Req, ISample03Res } from '../models/sample'

const sampleApi = baseApiService.injectEndpoints({
  endpoints: (builder) => ({

    // [mutation]
    // 無使用快取需求時
    Sample01: builder.mutation<IBaseRes<ISample01Res>, ISample01Req>({
      query: (req) => ({
        url: `/sample/01?category=${req.category}`,
        method: 'GET'
      })
    }),

    // [query]
    // 有使用快取需求時
    Sample02: builder.query<string, ISample02Req>({
      query: (req) => ({
        url: '/sample/02',
        method: 'POST',
        body: baseReq(req),
        responseHandler: async (response: Response) => {
          const arrayBuffer = await response.arrayBuffer()
          return 'data:image/png;base64,' + base64Encode(arrayBuffer)
        }
      })
    }),

    // [mutation]
    // 無使用快取需求時
    Sample03: builder.mutation<IBaseRes<ISample03Res>, ISample03Req>({
      query: (req) => ({
        url: '/sample/03',
        method: 'POST',
        body: baseReq(req),
        responseHandler: (response: Response & IBaseRes<ISample03Res>) => {
          // if you want to do something right after response, do it here.
          // e.g. get request header info sample
          // const authToken = response.headers.get('x-auth-token')
          return response.json()
        }
      })
    })

  }),
  overrideExisting: true
})

export default sampleApi
