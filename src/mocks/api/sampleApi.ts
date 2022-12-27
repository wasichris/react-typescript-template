import { rest } from 'msw'
import { GenderEnum } from '../../constants/enums'
import { IBaseReq } from '../../services/models/common'
import { ISampleLoginReq, ISampleLoginRes, ISampleGetProductsRes, ISampleGetImgReq, ISampleGetUserReq, ISampleGetUserRes, ISampleGetConfigRes } from '../../services/models/sample'
import { getGuid } from '../../utils/helpers/commonHelper'
import { createRes, getApiUrl, getRandomArray, getRandomArrayItem, getRandomInt, getRandomIntRange } from '../mockHelper'

const sampleApi = [

  // 範例：處理 POST API 並回傳 Image
  rest.post(getApiUrl('/sample/get-img'), async (req, res, ctx) => {
    const { body: { width, height } } = await req.json<IBaseReq<ISampleGetImgReq>>()
    const imageBuffer = await fetch(
      `https://picsum.photos/${width}/${height}?random=${getRandomInt(6)}`
    ).then(res => res.arrayBuffer())

    return res(
      ctx.set('Content-Length', imageBuffer.byteLength.toString()),
      ctx.set('Content-Type', 'image/jpeg'),
      ctx.status(200),
      ctx.delay(),
      ctx.body(imageBuffer)
    )
  }),

  // 範例：處理 GET API 並回傳 JSON
  rest.get(getApiUrl('/sample/get-products'), (req, res, ctx) => {
    const urHeader = req.headers.get('ur-header') ?? ''
    const category = req.url.searchParams.get('category')
    const response = createRes<ISampleGetProductsRes>({
      products: getRandomArray(3, () => ({
        category,
        id: getGuid(),
        stock: getRandomIntRange(10, 100),
        price: getRandomInt(5),
        gender: getRandomArrayItem([GenderEnum.MALE, GenderEnum.FEMALE])
      }))
    })

    return res(
      ctx.set('my-header', urHeader),
      ctx.status(200),
      ctx.delay(),
      ctx.json(response)
    )
  }),

  // 範例：處理 POST API 並回傳 JSON
  rest.post(getApiUrl('/sample/get-user'), async (req, res, ctx) => {
    const { body: { userId } } = await req.json<IBaseReq<ISampleGetUserReq>>()
    const response = createRes<ISampleGetUserRes>({
      username: userId,
      firstName: 'chen'
    })

    return res(
      ctx.status(200),
      ctx.delay(),
      ctx.json(response)
    )
  }),

  // ===

  rest.post(getApiUrl('/sample/get-config'), async (req, res, ctx) => {
    const response = createRes<ISampleGetConfigRes>({
      clientId: 'my-client-id',
      config: { k1: 'k1-value', k2: 'k2-value' }
    })

    return res(
      ctx.status(200),
      ctx.delay(),
      ctx.json(response)
    )
  }),

  rest.post(getApiUrl('/sample/login'), async (req, res, ctx) => {
    const { body: { userId, pcode } } = await req.json<IBaseReq<ISampleLoginReq>>()
    // set response
    const response = createRes<ISampleLoginRes>({
      authCode: 'this-is-a-auth-code' + pcode,
      userName: 'chris-' + userId
    })

    return res(
      ctx.status(200),
      ctx.delay(500),
      ctx.json(response)
    )
  })

]

export default sampleApi
