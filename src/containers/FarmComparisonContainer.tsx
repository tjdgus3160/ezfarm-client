import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import FarmList from '../components/FarmComparison/FarmList'
import SearchBar from '../components/FarmComparison/SearchBar'
import Layout from '../components/Layout/Layout'
import { IOtherFarm } from '../interfaces/favorite'
import { getOtherFarms } from '../redux/modules/farm'
import { getFavorite } from '../redux/modules/favorite'

const FarmComparisonContainer = () => {
  const dispatch = useDispatch()

  const [otherFarm, setOtherFarm] = useState<IOtherFarm | null>(null)

  const search = useCallback(() => {
    dispatch(getOtherFarms())
  }, [dispatch])

  const selectFarm = useCallback((farm: IOtherFarm) => {
    setOtherFarm(farm)
  }, [])

  useEffect(() => {
    dispatch(getFavorite())
    dispatch(getOtherFarms())
  }, [dispatch])

  return (
    <Layout>
      {otherFarm === null ? (
        <>
          <SearchBar search={search} />
          <FarmList selectFarm={selectFarm} />
        </>
      ) : null}
    </Layout>
  )
}

export default FarmComparisonContainer
