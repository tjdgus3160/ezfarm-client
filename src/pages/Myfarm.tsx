import React from 'react'
import { Redirect } from 'react-router-dom'
import MyfarmContainer from '../containers/MyfarmContainer'
import useToken from '../hooks/useToken'

const Myfarm = () => {
  const token = useToken()
  if (token === null) {
    return <Redirect to="/login" />
  }
  return <MyfarmContainer />
}

export default Myfarm
