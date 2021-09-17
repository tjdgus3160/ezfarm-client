import { combineReducers, AnyAction, Reducer } from 'redux'
import { connectRouter, RouterState } from 'connected-react-router'
import { History } from 'history'

import auth, { AuthState } from './auth'

export interface RootState {
  auth: AuthState
  router: Reducer<RouterState<unknown>, AnyAction>
}

const rootReducer = (history: History<unknown>) =>
  combineReducers({
    auth,
    router: connectRouter(history),
  })

export default rootReducer
