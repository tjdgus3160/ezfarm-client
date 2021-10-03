import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Layout from '../components/Layout/Layout'
import FarmDetail from '../components/MyFarm/FarmDetail'
import FarmInfo from '../components/MyFarm/FarmInfo'
import { getFarms as getFarmsSaga } from '../redux/modules/farm'
const MyfarmContainer = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getFarmsSaga())
  }, [dispatch])

  return (
    <Layout>
      <FarmInfo />
      <FarmDetail />
    </Layout>
  )
}

export default MyfarmContainer
