import { rest } from 'msw'
import { GenderEnum } from '../../constants/enums'
import { getApiUrl, getGuid, getRandomArrayItem, getRandomInt, getRandomIntRange } from '../mockHelper'

// 會定義在 api 定義區塊，所以這邊只是暫時放置而已
// Mock 都會使用 api 定義區塊中的 interface 來使用
interface ISample03Req {
  username: string
}
interface ISample03Resp {
  username: string
  firstName: string
}

const sample = [

  // [GET]
  rest.get(getApiUrl('/sample/01'), (req, res, ctx) => {
    // get req header
    const urHeader = req.headers.get('ur-header') ?? ''
    // get single parameter from url
    const category = req.url.searchParams.get('category')
    // response data
    const response = {
      data: req,
      category,
      id: getGuid(),
      age: getRandomIntRange(10, 100),
      balance: getRandomInt(5),
      gender: getRandomArrayItem([GenderEnum.MALE, GenderEnum.FEMALE])
    }

    return res(
      ctx.set('my-header', urHeader),
      ctx.status(200),
      ctx.delay(),
      ctx.json(response)
    )
  }),

  // [POST]
  rest.post(getApiUrl('/sample/02'), async (req, res, ctx) => {
    const imageBuffer = await fetch(
      `https://picsum.photos/1125/468?random=${getRandomInt(6)}`
    ).then(res => res.arrayBuffer())

    return res(
      ctx.set('Content-Length', imageBuffer.byteLength.toString()),
      ctx.set('Content-Type', 'image/jpeg'),
      ctx.status(200),
      ctx.delay(),
      ctx.body(imageBuffer)
    )
  }),

  // [POST]
  rest.post(getApiUrl('/sample/03'), async (req, res, ctx) => {
    // get req body
    const { username } = await req.json<ISample03Req>()

    // set response
    const response: ISample03Resp = {
      username,
      firstName: 'chen'
    }

    return res(
      ctx.status(200),
      ctx.delay(),
      ctx.json(response)
    )
  })

]

export default sample
