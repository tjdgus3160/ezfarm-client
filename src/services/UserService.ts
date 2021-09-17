import axios from 'axios'

import { LoginReqType, LoginResType, Me } from '../types'

const USER_API_URL = 'https://api.hanium-ezfarm.com'
const SESSION_STORAGE_USER_KEY_NAME = 'user'

export default class UserService {
  public static async login({
    email,
    password,
  }: LoginReqType): Promise<string> {
    const response = await axios.post<LoginResType>(
      `${USER_API_URL}/api/user/login`,
      {
        email,
        password,
      }
    )
    return response.data.accessToken
  }
  public static async getUser(token: string): Promise<Me> {
    const response = await axios.get<Me>(`${USER_API_URL}/api/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  }
  public static get(): Me | null {
    const value = sessionStorage.getItem(SESSION_STORAGE_USER_KEY_NAME)
    if (value) {
      return JSON.parse(value)
    }
    return null
  }

  public static set(me: Me): void {
    const value = JSON.stringify(me)
    sessionStorage.setItem(SESSION_STORAGE_USER_KEY_NAME, value)
  }

  public static remove(): void {
    sessionStorage.removeItem(SESSION_STORAGE_USER_KEY_NAME)
  }
}
