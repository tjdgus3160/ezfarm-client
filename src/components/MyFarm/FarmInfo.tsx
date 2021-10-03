import React from 'react'
import styled from 'styled-components'
import useMainFarm from '../../hooks/useMainFarm'
import { fromDateToNow, koreanization } from '../../utils/utils'

const FarmInfo = () => {
  const farm = useMainFarm()
  return (
    <Wrapper>
      {farm &&
        `농가 이름 : ${farm.name}(${koreanization(
          farm.farmType
        )}) | 작물 : ${koreanization(farm.cropType)} | 시작일 : ${
          farm.startDate
        } ${
          fromDateToNow(farm.startDate) > 0
            ? `(${fromDateToNow(farm.startDate)}일째)`
            : ''
        }`}
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin: 70px auto 20px 0;
  color: white;
  font-size: 30px;
  font-weight: 700;
`

export default FarmInfo
