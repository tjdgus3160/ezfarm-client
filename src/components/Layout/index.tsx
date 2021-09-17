import React, { useCallback, useMemo } from 'react'
import { Button, PageHeader } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/modules/rootReducer'
import { logout as logoutSaga } from '../../redux/modules/auth'
import styles from './Layout.module.css'

const Layout: React.FC = ({ children }) => {
  const { me } = useSelector((state: RootState) => state.auth)

  const dispatch = useDispatch()

  const logout = useCallback(() => {
    dispatch(logoutSaga())
  }, [dispatch])

  const wrapperStyles = useMemo(
    () => ({
      height: '100vh',
      background: `url('/images/bg.png') no-repeat`,
      backgroundSize: 'cover',
    }),
    []
  )

  return (
    <div style={wrapperStyles}>
      <PageHeader
        className={styles.header}
        title={
          <img className={styles.logo} src="/images/logo.png" alt="ezfarm" />
        }
        extra={
          me !== null
            ? [
                <Button key="2" type="primary">
                  프로필 수정
                </Button>,
                <Button key="1" type="primary" onClick={logout}>
                  로그아웃
                </Button>,
              ]
            : []
        }
      />
      {children}
    </div>
  )
}

export default Layout
