import { push } from 'connected-react-router'
import { Action, createActions, handleActions } from 'redux-actions'
import { call, put, takeEvery } from 'redux-saga/effects'
import TokenService from '../../services/TokenService'
import UserService from '../../services/UserService'
import { LoginReqType, Me } from '../../types'

export interface AuthState {
  token: string | null
  me: Me | null
  loading: boolean
  error: Error | null
}

const initialState: AuthState = {
  token: null,
  me: null,
  loading: false,
  error: null,
}

const prefix = 'ezfarm/auth'

export const { pending, success, fail } = createActions(
  'PENDING',
  'SUCCESS',
  'FAIL',
  { prefix }
)

const reducer = handleActions<AuthState, any>(
  {
    PENDING: state => ({
      ...state,
      loading: true,
      error: null,
    }),
    SUCCESS: (state, action) => ({
      token: action.payload.token,
      me: action.payload.me,
      loading: false,
      error: null,
    }),
    FAIL: (state, action: any) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
  },
  initialState,
  { prefix }
)

export default reducer

// saga
export const { login, logout } = createActions('LOGIN', 'LOGOUT', { prefix })

export function* authSaga() {
  yield takeEvery(`${prefix}/LOGIN`, loginSaga)
  yield takeEvery(`${prefix}/LOGOUT`, logoutSaga)
}

function* loginSaga(action: Action<LoginReqType>) {
  try {
    yield put(pending())
    const token: string = yield call(UserService.login, action.payload)
    const me: Me = yield call(UserService.getUser, token)
    TokenService.set(token)
    UserService.set(me)
    yield put(
      success({
        token,
        me,
      })
    )
    yield put(push('/'))
  } catch (error) {
    yield put(fail('로그인 실패'))
  }
}

function* logoutSaga() {
  try {
    yield put(pending())
    TokenService.remove()
    UserService.remove()
    yield put(
      success({
        token: null,
        me: null,
      })
    )
    yield put(push('/login'))
  } catch (error) {
    // console.log(error);
  }
}
