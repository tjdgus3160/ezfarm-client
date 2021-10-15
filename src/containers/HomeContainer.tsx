import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import RecentNotification from '../components/Home/RecentNotification'
import UserCurrentDashboard from '../components/Home/UserCurrentDashboard'
import Layout from '../components/Layout/Layout'
import { getFarms as getFarmsSaga } from '../redux/modules/farm'
import { getFacility as getFacilitySaga } from '../redux/modules/facility'
import { RootState } from '../redux/modules/rootReducer'
import ModalTap from '../components/Home/ModalTap'
import { getNotification } from '../redux/modules/notification'

const HomeContainer = () => {
  const { mainFarm } = useSelector((state: RootState) => state.farm)
  const { me } = useSelector((state: RootState) => state.user)
  const { facility } = useSelector((state: RootState) => state.facility)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getFarmsSaga())
  }, [dispatch])

  useEffect(() => {
    if (me) {
      dispatch(getNotification(me.id))
    }
  }, [dispatch, me])

  useEffect(() => {
    if (mainFarm) {
      dispatch(getFacilitySaga(mainFarm.id))
    }
  }, [dispatch, mainFarm])

  return (
    <Layout>
      <RecentNotification />
      <Dashboard>
        <UserCurrentDashboard facility={facility} />
        <ModalTap />
      </Dashboard>
    </Layout>
  )
}

const Dashboard = styled.section`
  display: flex;
`

export default HomeContainer
