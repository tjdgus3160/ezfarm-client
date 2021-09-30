import { useSelector } from 'react-redux'
import { IFarm } from '../interfaces/farm'

import { RootState } from '../redux/modules/rootReducer'

export default function useMainFarm() {
  const farm = useSelector<RootState, IFarm>(
    state => state.farm.mainFarm as IFarm
  )

  return farm
}
