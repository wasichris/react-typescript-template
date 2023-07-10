import { GenderEnum } from '../../constants/enums'

export interface ISampleGetProductsReq {
  category: string
}
export interface ISampleGetProductsRes {
  products: {
    id: string
    category: string | null
    price: number
    stock: number
    gender: GenderEnum
  }[]
}

// ===

export interface ISampleGetImgReq {
  width: number
  height: number
}

// ===

export interface ISampleGetUserReq {
  userId: string
}
export interface ISampleGetUserRes {
  username: string
  firstName: string
}

// ===

export interface ISampleGetConfigRes {
  clientId: string
  config: Record<string, string>
}

// ===

export interface ISampleLoginReq {
  userId: string
  pcode: string
}
export interface ISampleLoginRes {
  userName: string
  authCode: string
}
