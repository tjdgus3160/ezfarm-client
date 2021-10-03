import moment from 'moment'
import { IChartData, IFacilityAvg } from '../interfaces/facility'

export const onoffConvert = (value: boolean) => {
  return value ? 'ON' : 'OFF'
}

export const disabledDate = (current: moment.Moment) =>
  current < moment().subtract(1, 'days').endOf('day')

export const koreanization = (value: string): string => {
  switch (value) {
    case 'GLASS':
      return '유리'
    case 'VINYL':
      return '비닐'
    case 'PAPRIKA':
      return '파프리카'
    case 'STRAWBERRY':
      return '딸기'
    case 'TOMATO':
      return '토마토'
    default:
      return ''
  }
}
export const fromDateToNow = (startDate: string) => {
  let sdt = new Date(startDate)
  let edt = new Date()
  let dateDiff = Math.ceil((edt.getTime() - sdt.getTime()) / (1000 * 3600 * 24))
  return dateDiff
}

export const urlName = (term: string) => {
  if (term === 'month') return 'daily'
  if (term === 'quarter') return 'week'
  if (term === 'year') return 'monthly'
}

const z2 = (v: number) => {
  const s = `00${String(v)}`
  return s.substr(s.length - 2, 2)
}

export const makeParams = (term: string, selectDate: string) => {
  if (term === 'month') {
    const [year, month] = selectDate.split('-')
    console.log(year, month)
    return {
      year,
      month,
    }
  }
  if (term === 'quarter') {
    const [year, quarter] = selectDate.split('-')
    const q = Number(quarter[1])
    return {
      dateOne: `${year}-${z2(1 + 3 * (q - 1))}`,
      dateTwo: `${year}-${z2(2 + 3 * (q - 1))}`,
      dateThr: `${year}-${z2(3 + 3 * (q - 1))}`,
    }
  }
  if (term === 'year') {
    return {
      year: selectDate,
    }
  }
}

export const makeChartData = (data: IFacilityAvg[]): IChartData => {
  const chartData: IChartData = {
    avgCo2: [],
    avgHumidity: [],
    avgIlluminance: [],
    avgMos: [],
    avgPh: [],
    avgTmp: [],
    measureDate: [],
  }
  data.forEach((ele: IFacilityAvg) => {
    chartData.avgCo2.push(ele.avgCo2)
    chartData.avgHumidity.push(ele.avgHumidity)
    chartData.avgIlluminance.push(ele.avgIlluminance)
    chartData.avgMos.push(ele.avgMos)
    chartData.avgPh.push(ele.avgPh)
    chartData.avgTmp.push(ele.avgTmp)
    chartData.measureDate.push(ele.measureDate)
  })
  return chartData
}
