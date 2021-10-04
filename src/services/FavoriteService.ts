import axios from 'axios'
import { IFavorite } from '../interfaces/favorite'
import TokenService from './TokenService'

const FAVORITE_API_URL = 'https://api.hanium-ezfarm.com/api/favorite'

export default class FavoriteService {
  public static async getFavorite(): Promise<IFavorite[]> {
    const response = await axios.get<IFavorite[]>(`${FAVORITE_API_URL}`, {
      headers: { Authorization: `Bearer  ${TokenService.get()}` },
    })
    return response.data
  }
  public static async addFavorite(farmId: number): Promise<void> {
    await axios.post(`${FAVORITE_API_URL}/${farmId}`, {
      headers: { Authorization: `Bearer  ${TokenService.get()}` },
    })
  }
  public static async deleteFavorite(favoriteId: number): Promise<void> {
    await axios.delete(`${FAVORITE_API_URL}`, {
      headers: { Authorization: `Bearer  ${TokenService.get()}` },
      params: {
        favoriteId,
      },
    })
  }
}
