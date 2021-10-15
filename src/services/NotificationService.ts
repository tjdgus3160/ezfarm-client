import axios from 'axios'
import { INoti } from '../interfaces/notification'
import TokenService from './TokenService'

const NOTIFICATION_API_URL = 'https://api.hanium-ezfarm.com/api/notification'

export default class NotificationService {
  public static async getNotification(userId: number): Promise<INoti[]> {
    const response = await axios.get<INoti[]>(`${NOTIFICATION_API_URL}`, {
      headers: { Authorization: `Bearer  ${TokenService.get()}` },
      params: { userId },
    })
    return response.data
  }
}
