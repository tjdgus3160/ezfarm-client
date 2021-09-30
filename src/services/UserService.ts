import axios from 'axios'

import {
  LoginReqType,
  LoginResType,
  Me,
  SignupReqType,
} from '../interfaces/user'

const USER_API_URL = 'https://api.hanium-ezfarm.com/api/user'
const SESSION_STORAGE_USER_KEY_NAME = 'user'

export default class UserService {
  public static async login({
    email,
    password,
  }: LoginReqType): Promise<string> {
    const response = await axios.post<LoginResType>(`${USER_API_URL}/login`, {
      email,
      password,
    })
    return response.data.accessToken
  }
  public static async signup({
    name,
    email,
    password,
  }: SignupReqType): Promise<void> {
    await axios.post(`${USER_API_URL}/signup`, {
      name,
      email,
      password,
    })
  }
  public static async getUser(token: string): Promise<Me> {
    const response = await axios.get<Me>(`${USER_API_URL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  }

  public static async patchUser(token: string): Promise<void> {
    await axios.patch(`${USER_API_URL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }

  public static get(): Me | null {
    const value = sessionStorage.getItem(SESSION_STORAGE_USER_KEY_NAME)
    if (value) {
      return JSON.parse(value)
    }
    return null
  }

  public static set(me: Me): void {
    sessionStorage.setItem(SESSION_STORAGE_USER_KEY_NAME, JSON.stringify(me))
  }

  public static remove(): void {
    sessionStorage.removeItem(SESSION_STORAGE_USER_KEY_NAME)
  }
}
