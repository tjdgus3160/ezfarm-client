import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../components/Layout/Layout'
import SignupForm from '../components/Login/SignupForm'
import { SignupReqType } from '../interfaces/user'
import { RootState } from '../redux/modules/rootReducer'
import { signup as signupSaga } from '../redux/modules/user'

const SignupContainer = () => {
  const { loading, error } = useSelector((state: RootState) => state.user)

  const dispatch = useDispatch()

  const signup = useCallback(
    ({ name, email, password }: SignupReqType) => {
      dispatch(signupSaga({ name, email, password }))
    },
    [dispatch]
  )

  return (
    <Layout>
      <SignupForm loading={loading} error={error} signup={signup} />
    </Layout>
  )
}

export default SignupContainer
