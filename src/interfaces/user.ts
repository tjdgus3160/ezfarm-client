export interface LoginReqType {
  email: string
  password: string
}

export interface LoginResType {
  accessToken: string
}

export interface SignupReqType {
  name: string
  email: string
  password: string
}

export interface Me {
  id: number
  email: string
  name: string
  address: string
  imageUrl: string
  phoneNumber: string
}
