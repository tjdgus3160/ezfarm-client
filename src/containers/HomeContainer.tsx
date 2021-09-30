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

const notifications = [
  {
    id: 0,
    msg: '토마토 농가의 조도를 1 낮추었습니다.',
  },
  {
    id: 1,
    msg: '17시 46분 온도가 적정 온도를 초과하였습니다.',
  },
]

const HomeContainer = () => {
  const { mainFarm } = useSelector((state: RootState) => state.farm)
  const { facility } = useSelector((state: RootState) => state.facility)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getFarmsSaga())
  }, [dispatch])

  useEffect(() => {
    if (mainFarm) {
      dispatch(getFacilitySaga(mainFarm.id))
    }
  }, [dispatch, mainFarm])

  return (
    <Layout>
      <RecentNotification notifications={notifications} />
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
