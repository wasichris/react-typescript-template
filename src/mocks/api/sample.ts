import { rest } from 'msw'
import { GenderEnum } from '../../constants/enums'
import { getApiUrl, getGuid, getRandomArrayItem, getRandomInt, getRandomIntRange } from '../mockHelper'

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
  })

]

export default sample
