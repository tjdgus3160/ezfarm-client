import { push } from 'connected-react-router'
import { Action, createActions, handleActions } from 'redux-actions'
import { call, put, takeEvery } from 'redux-saga/effects'
import TokenService from '../../services/TokenService'
import UserService from '../../services/UserService'
import { LoginReqType, Me, SignupReqType } from '../../types'

export interface AuthState {
  token: string | null
  me: Me | null
  mode: boolean
  loading: boolean
  error: Error | null
}

const initialState: AuthState = {
  token: null,
  me: null,
  mode: true,
  loading: false,
  error: null,
}

const prefix = 'ezfarm/auth'

export const {
  request,
  loginSuccess,
  logoutSuccess,
  signupSuccess,
  getUser,
  changeMode,
  fail,
} = createActions(
  'REQUEST',
  'LOGIN_SUCCESS',
  'LOGOUT_SUCCESS',
  'SIGNUP_SUCCESS',
  'GET_USER',
  'CHANGE_MODE',
  'FAIL',
  { prefix }
)

const reducer = handleActions<AuthState, any>(
  {
    REQUEST: state => ({
      ...state,
      loading: true,
      error: null,
    }),
    LOGIN_SUCCESS: (state, action) => ({
      ...state,
      token: action.payload,
      loading: false,
      error: null,
    }),
    LOGOUT_SUCCESS: state => ({
      ...state,
      token: null,
      me: null,
      loading: false,
      error: null,
    }),
    SIGNUP_SUCCESS: state => ({
      ...state,
      loading: false,
      error: null,
    }),
    GET_USER: (state, action) => ({
      ...state,
      me: action.payload,
      loading: false,
      error: null,
    }),
    CHANGE_MODE: state => ({
      ...state,
      mode: !state.mode,
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
export const { login, logout, signup } = createActions(
  'LOGIN',
  'LOGOUT',
  'SIGNUP',
  { prefix }
)

export function* authSaga() {
  yield takeEvery(`${prefix}/LOGIN`, loginSaga)
  yield takeEvery(`${prefix}/LOGOUT`, logoutSaga)
  yield takeEvery(`${prefix}/SIGNUP`, signupSaga)
}

function* loginSaga(action: Action<LoginReqType>) {
  try {
    yield put(request())
    const token: string = yield call(UserService.login, action.payload)
    const me: Me = yield call(UserService.getUser, token)
    TokenService.set(token)
    UserService.set(me)
    yield put(loginSuccess(token))
    yield put(getUser(me))
    yield put(push('/'))
  } catch (error) {
    yield put(fail('로그인 실패'))
  }
}

function* logoutSaga() {
  try {
    yield put(request())
    TokenService.remove()
    UserService.remove()
    yield put(logoutSuccess())
    yield put(push('/login'))
  } catch (error) {
    // console.log(error);
  }
}

function* signupSaga(action: Action<SignupReqType>) {
  try {
    yield put(request())
    yield call(UserService.signup, action.payload)
    yield put(signupSuccess())
    yield put(changeMode())
  } catch (error) {
    yield put(fail('회원가입 실패'))
  }
}
