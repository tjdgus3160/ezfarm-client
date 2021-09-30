import styled from 'styled-components'

interface Props {
  eng: string
  kor: string
  value: string
}

const DashboardItem = ({ eng, kor, value }: Props) => (
  <Wrapper>
    <Content>
      <span className="eng">{eng}</span>
      <span className="kor">{kor}</span>
      {value && <span className="value">{value}</span>}
      <Wave type={eng} />
    </Content>
  </Wrapper>
)

const Wrapper = styled.div`
  /* border: 1px solid gray; */
  position: relative;
  width: 30%;
  min-width: 200px;
  min-height: 200px;
  max-width: 260px;
  max-height: 260px;
  &::before {
    content: '';
    display: block;
    padding-top: 100%;
  }
  margin: 10px;
`

const Content = styled.div`
  background: white;
  border-radius: 30px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 200px;
  min-height: 200px;
  max-width: 260px;
  max-height: 260px;
  overflow: hidden;
  box-shadow: 0 0.2rem 0.3rem 0.1rem rgba(85, 85, 85, 0.25);
  .eng {
    font-size: 18px;
    color: #f16b6f;
    font-weight: 600;
  }
  .kor {
    font-size: 14px;
    font-weight: 500;
  }
  .value {
    font-size: 48px;
    font-weight: 700;
  }
  span {
    animation: animation-opacity 2s;
  }
`

const Wave = styled.div<{ type: string }>`
  width: 700px;
  height: 700px;
  position: absolute;
  top: 90%;
  left: -120%;
  border-radius: 43%;
  @keyframes drift {
    100% {
      transform: rotate(-360deg);
    }
  }
  ${props => {
    if (props.type === 'Temperature') {
      return `animation: drift 6s infinite linear;
            border: 1px solid #41ec78;
            background: #ecffeb;`
    }
    if (props.type === 'Illuminance') {
      return `animation: drift 3.5s infinite linear;
            border: 1px solid #ffe639;
            background: #ffffe8;`
    }
    if (props.type === 'Humidity') {
      return `animation: drift 5s infinite linear;
            border: 1px solid #6ce9ff;
            background: #e6faff;`
    }
    if (props.type === 'CO2') {
      return `animation: drift 3s infinite linear;
            border: 1px solid #7777fd;
            background: #e9ecfe;`
    }
    if (props.type === 'pH') {
      return `animation: drift 7s infinite linear;
            border: 1px solid #f99696;
            background: #fff1f1;`
    }
    if (props.type === 'pF') {
      return `animation: drift 4s infinite linear;
            border: 1px solid #ffa3e0;
            background: #fff0fa;`
    }
  }}
`

export default DashboardItem
