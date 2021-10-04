import axios from 'axios'
import { IScreen } from '../interfaces/screen'
import TokenService from './TokenService'

const SCREEN_API_URL = 'https://api.hanium-ezfarm.com/api/screen'

export default class ScreenService {
  public static async getScreenLive(farmId: number): Promise<IScreen> {
    const response = await axios.get<IScreen>(
      `${SCREEN_API_URL}/live/${farmId}`,
      {
        headers: { Authorization: `Bearer  ${TokenService.get()}` },
      }
    )
    return response.data
  }
}
