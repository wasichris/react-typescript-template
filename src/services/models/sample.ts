import { GenderEnum } from '../../constants/enums'

export interface ISample01Req {
  category: string,
}
export interface ISample01Res {
  category: string | null,
  id: string,
  age: number,
  balance: number,
  gender: GenderEnum
}

export interface ISample02Req {
  width: number,
  height: number
}

export interface ISample03Req {
  username: string
}
export interface ISample03Res {
  username: string
  firstName: string
}

// ===

export interface ISampleLoginReq {
  userId: string,
  pcode: string
}
export interface ISampleLoginRes {
  userName: string,
  authCode: string,
}
