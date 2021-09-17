import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import Home from '../components/Home'
import { logout as logoutSaga } from '../redux/modules/auth'

const HomeContainer = () => {
  const dispatch = useDispatch()

  const logout = useCallback(() => {
    dispatch(logoutSaga())
  }, [dispatch])

  return <Home logout={logout} />
}

export default HomeContainer
