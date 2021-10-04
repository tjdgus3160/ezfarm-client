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

export interface IFarmTable {
  key: string
  main: boolean
  farmType: string
  name: string
  cropType: string
  address: string
  startDate: string
}

export interface IfarmSearchCond {
  cropType?: string
  farmGroup?: string
  farmType?: string
  page: number
  size: number
}
