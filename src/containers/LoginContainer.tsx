import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LoginReqType, SignupReqType } from '../types'
import {
  changeMode,
  login as loginSaga,
  signup as signupSaga,
} from '../redux/modules/auth'
import { RootState } from '../redux/modules/rootReducer'
import Layout from '../components/Layout'
import LoginForm from '../components/Login/LoginForm'
import SignupForm from '../components/Login/SignupForm'

const LoginContainer = () => {
  const { loading, error, mode } = useSelector((state: RootState) => state.auth)

  const dispatch = useDispatch()

  const login = useCallback(
    ({ email, password }: LoginReqType) => {
      dispatch(loginSaga({ email, password }))
    },
    [dispatch]
  )

  const signup = useCallback(
    ({ name, email, password }: SignupReqType) => {
      dispatch(signupSaga({ name, email, password }))
    },
    [dispatch]
  )

  const change = useCallback(() => {
    dispatch(changeMode())
  }, [dispatch])

  return (
    <Layout>
      {mode ? (
        <LoginForm
          loading={loading}
          error={error}
          login={login}
          change={change}
        />
      ) : (
        <SignupForm
          loading={loading}
          error={error}
          signup={signup}
          change={change}
        />
      )}
    </Layout>
  )
}

export default LoginContainer
