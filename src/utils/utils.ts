import moment from 'moment'
import { IFarm } from '../interfaces/farm'

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
