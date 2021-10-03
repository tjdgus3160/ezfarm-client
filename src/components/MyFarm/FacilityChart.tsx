import React, { useCallback, useState } from 'react'
import { chartTypes, IChartData } from '../../interfaces/facility'
import { Line } from 'react-chartjs-2'
import { Radio } from 'antd'
import styled from 'styled-components'

interface Props {
  charData: IChartData | null
}

const FacilityChart = ({ charData }: Props) => {
  const [value, setValue] = useState<chartTypes>('avgCo2')
  const onChange = useCallback(e => {
    setValue(e.target.value)
  }, [])

  const data = {
    labels: charData?.measureDate,
    datasets: [
      {
        label: value,
        backgroundColor: 'salmon',
        fill: false,
        data: charData?.[value as chartTypes]!,
      },
    ],
  }
  if (charData === null) {
    return null
  }
  return (
    <Wrapper>
      <Line data={data} />
      <Radio.Group buttonStyle="solid" onChange={onChange} value={value}>
        <Radio.Button value="avgCo2">Co2</Radio.Button>
        <Radio.Button value="avgHumidity">습도</Radio.Button>
        <Radio.Button value="avgIlluminance">조도</Radio.Button>
        <Radio.Button value="avgMos">토양수분</Radio.Button>
        <Radio.Button value="avgPh">Ph</Radio.Button>
        <Radio.Button value="avgTmp">온도</Radio.Button>
      </Radio.Group>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default FacilityChart
