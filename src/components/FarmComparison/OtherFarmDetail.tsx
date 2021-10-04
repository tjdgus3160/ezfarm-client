import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import useMainFarm from '../../hooks/useMainFarm'
import {
  IChartData,
  IFacilityAvg,
  IVaildDate,
  termType,
} from '../../interfaces/facility'
import FacilityService from '../../services/FacilityService'
import { makeChartData, makeParams } from '../../utils/utils'
import Chart from './ComparisonChart'
import { Result } from 'antd'
import { SmileOutlined } from '@ant-design/icons'
import SelectBar from '../MyFarm/SelectBar'
import { IOtherFarm } from '../../interfaces/favorite'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/modules/rootReducer'
import { IFarm } from '../../interfaces/farm'

interface Props {
  farm: IOtherFarm | null
}

const OtherFarmDetail = ({ farm }: Props) => {
  const mainFarm = useSelector(
    (state: RootState) => state.farm.mainFarm as IFarm
  )
  const [term, setTerm] = useState<termType>('month')
  const [selectDate, setSelectDate] = useState('')
  const [vaildDate, setVaildData] = useState<IVaildDate | null>(null)

  const [chartData, setChartData] =
    useState<{
      me: IChartData
      other: IChartData
    } | null>(null)

  const onChangeTerm = useCallback(e => {
    setTerm(e.target.value)
  }, [])

  const onChangeDate = useCallback((_, dateString) => {
    setSelectDate(dateString)
  }, [])

  const dataFetch = useCallback(async () => {
    if (!selectDate) return
    const params = makeParams(term, selectDate)
    let data = await FacilityService.getFacilityAvg(mainFarm.id, term, params)
    const me = makeChartData(data)
    data = await FacilityService.getFacilityAvg(
      (farm as IOtherFarm).farmId,
      term,
      params
    )
    const other = makeChartData(data)
    setChartData({ me, other })
  }, [farm, term, selectDate, mainFarm])

  useEffect(() => {
    const init = async () => {
      const date = await FacilityService.getVaildDate(
        (farm as IOtherFarm).farmId
      )

      setVaildData(date)
    }
    if (farm) {
      init()
    }
  }, [farm])
  return (
    <Wrapper>
      <SelectBar
        term={term}
        vaildDate={vaildDate}
        onChangeTerm={onChangeTerm}
        onChangeDate={onChangeDate}
        dataFetch={dataFetch}
      />
      {!chartData ? (
        <Result icon={<SmileOutlined />} title="검색 날짜를 선택해 주세요" />
      ) : (
        <Chart charData={chartData} />
      )}
    </Wrapper>
  )
}

const Wrapper = styled.section`
  width: 1100px;
  /* height: 600px; */
  padding: 30px;
  background: white;
  border-radius: 30px;
  position: relative;
`

const Tab = styled.div`
  position: absolute;
  top: -20px;
  right: 0;
  display: flex;
  font-size: 14px;
  color: #ffffff;
  text-align: center;
  button {
    width: 96px;
    height: 43px;
    border-radius: 30px;
    line-height: 43px;
    font-weight: 500;
    background-color: #d5d6df;
  }
  .selected {
    background-color: #f16b6f;
  }
`

export default OtherFarmDetail
