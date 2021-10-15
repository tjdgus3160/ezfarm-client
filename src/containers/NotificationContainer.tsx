import { Timeline } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Layout from '../components/Layout/Layout'
import { RootState } from '../redux/modules/rootReducer'

const NotificationContainer = () => {
  const { notifications } = useSelector(
    (state: RootState) => state.notification
  )

  return (
    <Layout>
      <Wrapper>
        <h2>
          🔔오늘의 알림{' '}
          <span className="date">
            {notifications?.[0].createdDate.slice(0, 10)}
          </span>
          🔔
        </h2>
        <Timeline className="timeline">
          {notifications?.map((ele, idx) => (
            <Timeline.Item
              color={['red', 'green', 'blue'][idx % 3]}
              style={{ fontSize: '26px' }}
            >
              {ele.content}
              <span className="time">({ele.createdDate.slice(11, 16)})</span>
            </Timeline.Item>
          ))}
        </Timeline>
      </Wrapper>
    </Layout>
  )
}

const Wrapper = styled.div`
  margin: 80px 0 0 100px;
  .time {
    font-size: 16px;
    color: rgba(128, 128, 128, 0.8);
    margin-left: 10px;
  }
  h2 {
    font-weight: bold;
    font-size: 40px;
    margin-bottom: 50px;
  }
  .timeline {
    height: 540px;
    width: 600px;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgba(128, 128, 128, 0.8);
      border-radius: 20px;
    }
    &::-webkit-scrollbar-track {
      background-color: transparent;
    }
  }
`

export default NotificationContainer
