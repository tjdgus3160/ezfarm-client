export interface IFarmFormData {
  name: string
  address: string
  phoneNumber?: string
  farmType: string
  cropType: string
  area: string
  startDate: string
  main: boolean
}

export interface IFarm extends IFarmFormData {
  id: number
  createdDate: string
}

export interface IChartData {
  avgTmp: Array<any>
  avgIlluminance: Array<any>
  avgHumidity: Array<any>
  avgCo2: Array<any>
  avgPh: Array<any>
  avgMos: Array<any>
}
export interface IFarmTable {
  key: string
  type: string
  name: string
  cropType: string
  startDate: string
  main: boolean
}

export interface IFarmController {
  remoteId: number
  co2: string
  illuminance: string
  temperature: number
  water: string
}

export interface IFarmView {
  cropCondition: number
  imageUrl: string
  measureTime: number
}
