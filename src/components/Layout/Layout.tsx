import React, { useCallback } from 'react'
import { Button, PageHeader } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/modules/rootReducer'
import { logout as logoutSaga } from '../../redux/modules/user'
import Navigation from './Navigation'
import styled from 'styled-components'

const Layout: React.FC = ({ children }) => {
  const { me } = useSelector((state: RootState) => state.user)

  const dispatch = useDispatch()

  const logout = useCallback(() => {
    dispatch(logoutSaga())
  }, [dispatch])

  return (
    <Wrapper>
      <PageHeader
        className="header"
        title={<img className="logo" src="/images/logo.png" alt="ezfarm" />}
        extra={
          me !== null
            ? [
                <Button key="2">프로필 수정</Button>,
                <Button key="1" type="primary" onClick={logout}>
                  로그아웃
                </Button>,
              ]
            : []
        }
      />
      <div className="content">
        {me && <Navigation />}
        <main>{children}</main>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 100vh;
  background: url('/images/bg.png') no-repeat;
  background-size: 100% 100%;
  .header {
    background: white;
  }
  .logo {
    width: 180px;
  }
  .content {
    display: flex;
  }
  main {
    display: flex;
    flex-direction: column;
  }
`

export default Layout
