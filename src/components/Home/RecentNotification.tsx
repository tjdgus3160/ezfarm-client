import React from 'react'
import styled from 'styled-components'

interface Props {
  notifications: any
}

const RecentNotification = ({ notifications }: Props) => {
  return (
    <Wrapper>
      <div className="title">Recent notifications</div>
      {notifications.map((ele: any) => (
        <div key={ele.id} className="content">
          🔔 {ele.msg}
        </div>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.section`
  box-shadow: 0 0.2rem 0.3rem 0.1rem rgba(85, 85, 85, 0.25);
  position: relative;
  min-width: 772px;
  max-height: 146px;
  border-radius: 30px;
  background-color: #ffffff;
  padding: 26px;
  margin-top: 50px;
  &::after {
    content: '';
    position: absolute;
    bottom: -20px;
    right: 30px;
    border: 30px solid transparent;
    border-top-color: white;
    border-bottom: 0;
    border-right: 0;
    border-radius: 0 30px 0;
    transform: rotate(90deg);
    box-shadow: 0.3rem 0.2rem 0.2rem 0.1rem rgba(85, 85, 85, 0.25);
  }
  .title {
    font-size: 22px;
    font-weight: 700;
  }
  .content {
    font-size: 20px;
    font-weight: 500;
  }
`

export default RecentNotification
