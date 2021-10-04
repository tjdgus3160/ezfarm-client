import { combineReducers, AnyAction, Reducer } from 'redux'
import { connectRouter, RouterState } from 'connected-react-router'
import { History } from 'history'

import user, { UserState } from './user'
import farm, { FarmState } from './farm'
import facility, { FacilityState } from './facility'
import favorite, { FavoriteState } from './favorite'

export interface RootState {
  user: UserState
  farm: FarmState
  facility: FacilityState
  favorite: FavoriteState
  router: Reducer<RouterState<unknown>, AnyAction>
}

const rootReducer = (history: History<unknown>) =>
  combineReducers({
    user,
    farm,
    facility,
    favorite,
    router: connectRouter(history),
  })

export default rootReducer
