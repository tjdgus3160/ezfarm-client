import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Login from '../components/Login'
import { LoginReqType } from '../types'
import { login as loginSaga } from '../redux/modules/auth'
import { RootState } from '../redux/modules/rootReducer'

const LoginContainer = () => {
  const { loading, error } = useSelector((state: RootState) => state.auth)

  const dispatch = useDispatch()

  const login = useCallback(
    ({ email, password }: LoginReqType) => {
      dispatch(loginSaga({ email, password }))
    },
    [dispatch]
  )

  return <Login loading={loading} error={error} login={login} />
}

export default LoginContainer
