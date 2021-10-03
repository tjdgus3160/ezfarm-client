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
import Chart from './FacilityChart'
import SelectBar from './SelectBar'
import Table from './FacilityTable'
import { Result } from 'antd'
import { SmileOutlined } from '@ant-design/icons'

const FarmDetail = () => {
  const farm = useMainFarm()
  const [currentView, setCurrentView] = useState('chart')

  const [term, setTerm] = useState<termType>('month')
  const [selectDate, setSelectDate] = useState('')
  const [vaildDate, setVaildData] = useState<IVaildDate | null>(null)

  const [chartData, setChartData] = useState<IChartData | null>(null)
  const [tableData, setTableData] = useState<IFacilityAvg[] | null>(null)

  const onChangeTerm = useCallback(e => {
    setTerm(e.target.value)
  }, [])

  const onChangeDate = useCallback((_, dateString) => {
    setSelectDate(dateString)
  }, [])

  const changeTap = useCallback(e => {
    setCurrentView(e.target.name)
  }, [])

  const dataFetch = useCallback(async () => {
    if (!selectDate) return
    const params = makeParams(term, selectDate)
    const data = await FacilityService.getFacilityAvg(farm.id, term, params)
    const chartData = makeChartData(data)
    setChartData(chartData)
    setTableData(data)
  }, [farm?.id, term, selectDate])

  useEffect(() => {
    const init = async () => {
      const date = await FacilityService.getVaildDate(farm.id)
      setVaildData(date)
    }
    if (farm) {
      init()
    }
  }, [farm?.id])

  return (
    <Wrapper>
      <Tab>
        {['chart', 'table'].map(ele => (
          <button
            key={ele}
            type="button"
            name={ele}
            className={`${currentView === ele ? `selected` : ''}`}
            onClick={changeTap}
          >
            {ele === 'chart' ? '차트' : '표'}
          </button>
        ))}
      </Tab>
      <SelectBar
        term={term}
        vaildDate={vaildDate}
        onChangeTerm={onChangeTerm}
        onChangeDate={onChangeDate}
        dataFetch={dataFetch}
      />
      {(!chartData || !tableData) && (
        <Result icon={<SmileOutlined />} title="검색 날짜를 선택해 주세요" />
      )}
      {currentView === 'chart' && <Chart charData={chartData} />}
      {currentView === 'table' && <Table tableData={tableData} />}
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

export default FarmDetail
