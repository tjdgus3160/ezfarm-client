import axios from 'axios'
import { IFacility } from '../interfaces/facility'
import TokenService from './TokenService'

const USER_API_URL = 'https://api.hanium-ezfarm.com/api/facility'

export default class FacilityService {
  public static async getFacility(farmId: number): Promise<IFacility> {
    const response = await axios.get<IFacility>(`${USER_API_URL}/${farmId}`, {
      headers: { Authorization: `Bearer  ${TokenService.get()}` },
    })
    return response.data
  }
}
