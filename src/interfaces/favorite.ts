export interface IOtherFarm {
  address: string
  area: string
  cropType: string
  farmId: number
  farmType: string
  name: string
}

export interface IOtherFarmTable extends IOtherFarm {
  key: string
  favorite: boolean
}

export interface IFavorite {
  favoriteId: number
  farmSearchResponse: IOtherFarm
}
