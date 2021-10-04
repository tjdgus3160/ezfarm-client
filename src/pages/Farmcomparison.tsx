import React from 'react'
import { Redirect } from 'react-router-dom'
import FarmComparisonContainer from '../containers/FarmComparisonContainer'
import useToken from '../hooks/useToken'

const Farmcomparison = () => {
  const token = useToken()
  if (token === null) {
    return <Redirect to="/login" />
  }
  return <FarmComparisonContainer />
}

export default Farmcomparison
