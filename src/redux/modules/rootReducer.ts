import { combineReducers, AnyAction, Reducer } from 'redux'
import { connectRouter, RouterState } from 'connected-react-router'
import { History } from 'history'

import user, { UserState } from './user'
import farm, { FarmState } from './farm'
import facility, { FacilityState } from './facility'

export interface RootState {
  user: UserState
  farm: FarmState
  facility: FacilityState
  router: Reducer<RouterState<unknown>, AnyAction>
}

const rootReducer = (history: History<unknown>) =>
  combineReducers({
    user,
    farm,
    facility,
    router: connectRouter(history),
  })

export default rootReducer
