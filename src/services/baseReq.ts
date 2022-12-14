import { getGuid } from '../utils/commonHelper'
import { IBaseReq } from './models/common'

export default <T>(req: T): IBaseReq<T> => {
  return {
    header: {
      ctxSn: getGuid()
    },
    body: req
  }
}
