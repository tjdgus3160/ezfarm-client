import axios from 'axios'
import TokenService from './TokenService'
import { IFarm, IFarmFormData } from '../interfaces/farm'

const USER_API_URL = 'https://api.hanium-ezfarm.com/api/farm'

export default class FarmService {
  public static async addFarm(farm: IFarmFormData): Promise<void> {
    await axios.post(`${USER_API_URL}/me`, farm, {
      headers: { Authorization: `Bearer  ${TokenService.get()}` },
    })
  }
  public static async editFarm(
    farmId: number,
    farm: IFarmFormData
  ): Promise<void> {
    await axios.patch(`${USER_API_URL}/me/${farmId}`, farm, {
      headers: { Authorization: `Bearer  ${TokenService.get()}` },
    })
  }
  public static async deleteFarm(farmId: number): Promise<void> {
    await axios.delete(`${USER_API_URL}/me/${farmId}`, {
      headers: { Authorization: `Bearer  ${TokenService.get()}` },
    })
  }
  public static async getFarms(): Promise<IFarm[]> {
    const response = await axios.get<IFarm[]>(`${USER_API_URL}/me`, {
      headers: { Authorization: `Bearer  ${TokenService.get()}` },
    })
    return response.data
  }
}
