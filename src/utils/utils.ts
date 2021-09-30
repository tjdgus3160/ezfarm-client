import moment from 'moment'
export const onoffConvert = (value: boolean) => {
  return value ? 'ON' : 'OFF'
}

export const disabledDate = (current: moment.Moment) =>
  current < moment().subtract(1, 'days').endOf('day')
