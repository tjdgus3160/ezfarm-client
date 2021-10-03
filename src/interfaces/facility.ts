export type termType = 'month' | 'quarter' | 'year'

export type chartTypes =
  | 'avgCo2'
  | 'avgHumidity'
  | 'avgIlluminance'
  | 'avgMos'
  | 'avgPh'
  | 'avgTmp'
export interface IFacility {
  co2: 'string'
  humidity: 'string'
  illuminance: 'string'
  measureDate: 'string'
  mos: 'string'
  ph: 'string'
  tmp: 'string'
}

export interface IVaildDate {
  startDate: string
  endDate: string
}

export interface IFacilityAvg {
  avgCo2: number
  avgHumidity: number
  avgIlluminance: number
  avgMos: number
  avgPh: number
  avgTmp: number
  measureDate: string
}
export interface IChartData {
  avgTmp: number[]
  avgIlluminance: number[]
  avgHumidity: number[]
  avgCo2: number[]
  avgPh: number[]
  avgMos: number[]
  measureDate: string[]
}

export interface IFacilityTable extends IFacilityAvg {
  key: string
}
