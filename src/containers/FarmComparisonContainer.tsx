import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import FarmList from '../components/FarmComparison/FarmList'
import OtherFarmDetail from '../components/FarmComparison/OtherFarmDetail'
import SearchBar from '../components/FarmComparison/SearchBar'
import Layout from '../components/Layout/Layout'
import FarmDetail from '../components/MyFarm/FarmDetail'
import { IOtherFarm } from '../interfaces/favorite'
import { getOtherFarms } from '../redux/modules/farm'
import { getFavorite } from '../redux/modules/favorite'
import { getFarms as getFarmsSaga } from '../redux/modules/farm'

const FarmComparisonContainer = () => {
  const dispatch = useDispatch()

  const [otherFarm, setOtherFarm] = useState<IOtherFarm | null>(null)

  const search = useCallback(() => {
    setOtherFarm(null)
    dispatch(getOtherFarms())
  }, [dispatch])

  const selectFarm = useCallback((farm: IOtherFarm) => {
    setOtherFarm(farm)
  }, [])

  useEffect(() => {
    dispatch(getFarmsSaga())
    dispatch(getFavorite())
    dispatch(getOtherFarms())
  }, [dispatch])

  return (
    <Layout>
      <SearchBar search={search} />
      {otherFarm === null ? (
        <FarmList selectFarm={selectFarm} />
      ) : (
        <OtherFarmDetail farm={otherFarm} />
      )}
    </Layout>
  )
}

export default FarmComparisonContainer
