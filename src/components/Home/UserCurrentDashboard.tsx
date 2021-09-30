import { Col, Row } from 'antd'
import styled from 'styled-components'
import { IFacility } from '../../interfaces/facility'
import DashboardItem from './DashboardItem'

interface Props {
  facility: IFacility | null
}

const UserCurrentDashboard = ({ facility }: Props) => {
  return (
    <Wrapper>
      <div className="title1">User Current</div>
      <div className="title2">Dashboard</div>
      <Row>
        <Col>
          <DashboardItem
            eng="Temperature"
            kor="온도"
            value={facility ? `${facility?.tmp}°C` : ''}
          />
        </Col>
        <Col>
          <DashboardItem
            eng="Illuminance"
            kor="조도"
            value={facility ? `${facility?.illuminance}lx` : ''}
          />
        </Col>
        <Col>
          <DashboardItem
            eng="Humidity"
            kor="습도"
            value={facility ? `${facility?.humidity}%` : ''}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <DashboardItem
            eng="CO2"
            kor="이산화탄소"
            value={facility ? `${facility?.co2}ppm` : ''}
          />
        </Col>
        <Col>
          <DashboardItem
            eng="pH"
            kor="급액"
            value={facility ? facility?.ph : ''}
          />
        </Col>
        <Col>
          <DashboardItem
            eng="pF"
            kor="토양수분"
            value={facility ? `${facility?.mos}` : ''}
          />
        </Col>
      </Row>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-top: 70px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  margin-bottom: 80px;
  .title1,
  .title2 {
    color: #ffffff;
    margin-left: 26px;
    text-shadow: #f67d6f 1px 0 10px;
  }
  .title1 {
    font-size: 22px;
    font-weight: 700;
  }
  .title2 {
    font-size: 36px;
    font-weight: 700;
  }
`

export default UserCurrentDashboard
