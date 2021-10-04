import { DatePicker, Radio } from 'antd'
import moment from 'moment'
import React, { useCallback } from 'react'
import styled from 'styled-components'
import useMainFarm from '../../hooks/useMainFarm'
import useToggle from '../../hooks/useToggle'
import { IVaildDate, termType } from '../../interfaces/facility'
import FarmsModal from '../Modal/FarmsModal'

interface Props {
  term: termType
  vaildDate: IVaildDate | null
  onChangeTerm: (e: any) => void
  onChangeDate: (_: any, dateString: any) => void
  dataFetch: () => Promise<void>
}

const SelectBar = ({
  term,
  vaildDate,
  onChangeTerm,
  onChangeDate,
  dataFetch,
}: Props) => {
  const farm = useMainFarm()

  const [farmsModalVisible, toggleFarmsModal] = useToggle(false)

  const disabledDate = useCallback(
    current => {
      if (vaildDate) {
        return (
          current < moment(vaildDate.startDate) ||
          current > moment(vaildDate.endDate)
        )
      }
      return true
    },
    [vaildDate]
  )

  return (
    <Wrapper>
      <div>
        <div>
          <Radio.Group onChange={onChangeTerm} value={term}>
            <Radio value="month">일간</Radio>
            <Radio value="quarter">주간</Radio>
            <Radio value="year">월간</Radio>
          </Radio.Group>
          <DatePicker
            onChange={onChangeDate}
            picker={term}
            disabledDate={disabledDate}
          />
          <button type="button" className="search" onClick={dataFetch}>
            데이터 조회
          </button>
        </div>
      </div>
      <div className="currentFarm">
        나의 농가<span>{farm?.name}</span>
      </div>
      <SelectedBtn onClick={toggleFarmsModal}>농가선택</SelectedBtn>
      {farmsModalVisible && (
        <FarmsModal visible={farmsModalVisible} onClose={toggleFarmsModal} />
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  padding-left: 50px;
  & > button.search {
    margin-left: 10px;
    border-radius: 20px;
    background-color: #f16b6f;
    color: #ffffff;
    font-weight: 700;
    padding: 10px;
  }
  & > div:first-child {
    display: flex;
    flex-direction: column;
    .ant-picker {
      margin-top: 10px;
    }
  }
  .currentFarm {
    margin-left: 200px;
    width: 210px;
    height: 34px;
    border-radius: 17px;
    background-color: #eeeeee;
    font-size: 14px;
    font-weight: 500;
    line-height: 34px;
    span {
      margin-left: 22px;
      color: #f16b6f;
      font-weight: 700;
    }
    margin-right: 15px;
  }
`
const SelectedBtn = styled.button`
  width: 98px;
  height: 34px;
  border-radius: 17px;
  background-color: #f16b6f;
  color: #ffffff;
  font-weight: 500;
`
export default SelectBar
