import { useSelector } from 'react-redux'
import { IFarm } from '../interfaces/farm'

import { RootState } from '../redux/modules/rootReducer'

export default function useFarms() {
  const farms = useSelector<RootState, IFarm[]>(
    state => state.farm.farms as IFarm[]
  )

  return farms
}
