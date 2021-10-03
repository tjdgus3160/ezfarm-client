import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LoginReqType } from '../interfaces/user'
import { login as loginSaga } from '../redux/modules/user'
import { RootState } from '../redux/modules/rootReducer'
import Layout from '../components/Layout/Layout'
import LoginForm from '../components/Login/LoginForm'

const LoginContainer = () => {
  const { loading, error } = useSelector((state: RootState) => state.user)

  const dispatch = useDispatch()

  const login = useCallback(
    ({ email, password }: LoginReqType) => {
      dispatch(loginSaga({ email, password }))
    },
    [dispatch]
  )

  return (
    <Layout>
      <LoginForm loading={loading} error={error} login={login} />
    </Layout>
  )
}

export default LoginContainer
