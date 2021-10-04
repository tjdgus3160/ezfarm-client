import axios from 'axios'
import TokenService from './TokenService'
import { IFarm, IFarmFormData, IfarmSearchCond } from '../interfaces/farm'
import { IOtherFarm } from '../interfaces/favorite'

const SESSION_STORAGE_COND_KEY_NAME = 'cond'
const FARM_API_URL = 'https://api.hanium-ezfarm.com/api/farm'

export default class FarmService {
  public static async addFarm(farm: IFarmFormData): Promise<void> {
    await axios.post(`${FARM_API_URL}/me`, farm, {
      headers: { Authorization: `Bearer  ${TokenService.get()}` },
    })
  }
  public static async editFarm(
    farmId: number,
    farm: IFarmFormData
  ): Promise<void> {
    await axios.patch(`${FARM_API_URL}/me/${farmId}`, farm, {
      headers: { Authorization: `Bearer  ${TokenService.get()}` },
    })
  }
  public static async deleteFarm(farmId: number): Promise<void> {
    await axios.delete(`${FARM_API_URL}/me/${farmId}`, {
      headers: { Authorization: `Bearer  ${TokenService.get()}` },
    })
  }
  public static async getFarms(): Promise<IFarm[]> {
    const response = await axios.get<IFarm[]>(`${FARM_API_URL}/me`, {
      headers: { Authorization: `Bearer  ${TokenService.get()}` },
    })
    return response.data
  }
  public static async getOtherFarms(): Promise<IOtherFarm[]> {
    let params: IfarmSearchCond | null = FarmService.getCond()
    if (params === null) {
      params = { page: 0, size: 100 }
    }
    const response = await axios.get<IOtherFarm[]>(`${FARM_API_URL}/other`, {
      headers: { Authorization: `Bearer  ${TokenService.get()}` },
      params,
    })

    return response.data
  }
  public static getCond(): IfarmSearchCond | null {
    const value = sessionStorage.getItem(SESSION_STORAGE_COND_KEY_NAME)
    if (value) {
      return JSON.parse(value)
    }
    return null
  }
  public static setCond(value: IfarmSearchCond): void {
    sessionStorage.setItem(SESSION_STORAGE_COND_KEY_NAME, JSON.stringify(value))
  }
}
