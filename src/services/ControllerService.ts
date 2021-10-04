import axios from 'axios'
import { IControllerReq, IControllerRes } from '../interfaces/controller'
import { IFacility } from '../interfaces/facility'
import TokenService from './TokenService'

const CONTROLLER_API_URL = 'https://api.hanium-ezfarm.com/api/remote'

export default class ControllerService {
  public static async getValue(farmId: number): Promise<IControllerRes> {
    const response = await axios.get<IControllerRes>(
      `${CONTROLLER_API_URL}/${farmId}`,
      {
        headers: { Authorization: `Bearer  ${TokenService.get()}` },
      }
    )
    return response.data
  }
  public static async setValue(value: IControllerReq): Promise<void> {
    await axios.patch<IFacility>(`${CONTROLLER_API_URL}`, value, {
      headers: { Authorization: `Bearer  ${TokenService.get()}` },
    })
  }
}
