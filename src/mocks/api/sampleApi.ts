import { rest } from 'msw'
import { GenderEnum } from '../../constants/enums'
import { IBaseReq, IBaseRes } from '../../services/models/common'
import { ISample01Res, ISample02Req, ISample03Req, ISample03Res } from '../../services/models/sample'
import { getGuid } from '../../utils/helpers/commonHelper'
import { getApiUrl, getRandomArrayItem, getRandomInt, getRandomIntRange } from '../mockHelper'

const sampleApi = [

  // [GET] sample
  rest.get(getApiUrl('/sample/01'), (req, res, ctx) => {
    // get req header
    const urHeader = req.headers.get('ur-header') ?? ''
    // get single parameter from url
    const category = req.url.searchParams.get('category')
    // response data
    const response: IBaseRes<ISample01Res> = {
      header: {
        returnCode: '0000',
        returnMsg: ''
      },
      body: {
        category,
        id: getGuid(),
        age: getRandomIntRange(10, 100),
        balance: getRandomInt(5),
        gender: getRandomArrayItem([GenderEnum.MALE, GenderEnum.FEMALE])
      }
    }

    return res(
      ctx.set('my-header', urHeader),
      ctx.status(200),
      ctx.delay(),
      ctx.json(response)
    )
  }),

  // [POST] image
  rest.post(getApiUrl('/sample/02'), async (req, res, ctx) => {
    // get req body
    const { body: { width, height } } = await req.json<IBaseReq<ISample02Req>>()

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

  // [POST] json
  rest.post(getApiUrl('/sample/03'), async (req, res, ctx) => {
    // get req body
    const { body: { username } } = await req.json<IBaseReq<ISample03Req>>()

    // set response
    const response: IBaseRes<ISample03Res> = {
      header: {
        returnCode: '0000',
        returnMsg: ''
      },
      body: {
        username,
        firstName: 'chen'
      }
    }

    return res(
      ctx.status(200),
      ctx.delay(),
      ctx.json(response)
    )
  })

]

export default sampleApi
