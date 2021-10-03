import axios from 'axios'
import { IFacility, IFacilityAvg, IVaildDate } from '../interfaces/facility'
import { urlName } from '../utils/utils'
import TokenService from './TokenService'

const FACILITY_API_URL = 'https://api.hanium-ezfarm.com/api/facility'

export default class FacilityService {
  public static async getFacility(farmId: number): Promise<IFacility> {
    const response = await axios.get<IFacility>(
      `${FACILITY_API_URL}/${farmId}`,
      {
        headers: { Authorization: `Bearer  ${TokenService.get()}` },
      }
    )
    return response.data
  }
  public static async getVaildDate(farmId: number): Promise<IVaildDate> {
    const response = await axios.get<IVaildDate>(
      `${FACILITY_API_URL}/search-condition/${farmId}`,
      {
        headers: { Authorization: `Bearer  ${TokenService.get()}` },
      }
    )
    return response.data
  }
  public static async getFacilityAvg(
    farmId: number,
    term: string,
    params: any
  ): Promise<IFacilityAvg[]> {
    const response = await axios.post<IFacilityAvg[]>(
      `${FACILITY_API_URL}/${urlName(term)}-avg/${farmId}`,
      params,
      {
        headers: { Authorization: `Bearer  ${TokenService.get()}` },
      }
    )
    return response.data
  }
}
