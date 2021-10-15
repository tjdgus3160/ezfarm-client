import React, { useCallback, useEffect, useState } from 'react'
import { Alert, Button, PageHeader } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/modules/rootReducer'
import { logout as logoutSaga } from '../../redux/modules/user'
import Navigation from './Navigation'
import styled from 'styled-components'
import useToggle from '../../hooks/useToggle'
import ProfileModal from '../Modal/ProfileModal'
import Stomp from 'stompjs'
import { getSocket } from '../../utils/utils'

const Layout: React.FC = ({ children }) => {
  const dispatch = useDispatch()
  const { me } = useSelector((state: RootState) => state.user)
  const [profileModalVisible, toggleProfileModal] = useToggle(false)
  const [noti, setNoti] = useState('')

  const { socket } = getSocket()

  const onReceive = useCallback((frame: Stomp.Frame) => {
    const msg = JSON.parse(frame.body)
    setNoti(msg.content)
  }, [])

  useEffect(() => {
    if (me) {
      socket.connect({}, () => {
        socket.subscribe(`/sub/notification/${me?.id}`, onReceive)
        console.log('구독 완료')
      })
    }
  }, [me, onReceive, socket])

  const onClose = useCallback(() => {
    setNoti('')
  }, [])

  const logout = useCallback(() => {
    dispatch(logoutSaga())
  }, [dispatch])
  console.log(noti)
  return (
    <Wrapper>
      <PageHeader
        className="header"
        title={<img className="logo" src="/images/logo.png" alt="ezfarm" />}
        extra={
          me !== null
            ? [
                <Button key="2" onClick={toggleProfileModal}>
                  프로필 수정
                </Button>,
                <Button key="1" type="primary" onClick={logout}>
                  로그아웃
                </Button>,
              ]
            : []
        }
      />

      <div className="body">
        {me && <Navigation />}
        <main>{children}</main>
        {noti && (
          <Alert
            message="농가 알림"
            description={noti}
            type="warning"
            showIcon
            closable
            onClose={onClose}
            className="alert"
          />
        )}
        {profileModalVisible && (
          <ProfileModal
            visible={profileModalVisible}
            onClose={toggleProfileModal}
          />
        )}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 100vh;
  background: url('/images/bg.png') no-repeat;
  background-size: 100% 100%;
  overflow-y: auto;
  width: 100%;

  .header {
    background: white;
    min-width: 1200px;
  }
  .logo {
    width: 180px;
  }
  .body {
    display: flex;
    position: relative;
  }
  main {
    display: flex;
    flex-direction: column;
  }
  .alert {
    width: 300px;
    position: absolute;
    top: 20px;
    right: 20px;
  }
`

export default Layout
