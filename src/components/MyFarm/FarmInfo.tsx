import React from 'react'
import styled from 'styled-components'
import useMainFarm from '../../hooks/useMainFarm'
import { fromDateToNow } from '../../utils/utils'

const FarmInfo = () => {
  const farm = useMainFarm()
  console.log(farm)
  return (
    <Wrapper>
      {farm &&
        `농가 이름 : ${farm.name}(${farm.farmType}) | 작물 : ${
          farm.cropType
        } | 시작일 : ${farm.createdDate.slice(0, 10)} ${
          fromDateToNow(farm.createdDate) > 0
            ? `(${fromDateToNow(farm.createdDate)}일째)`
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
