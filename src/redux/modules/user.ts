import { push } from 'connected-react-router'
import { Action, createActions, handleActions } from 'redux-actions'
import { call, put, takeEvery } from 'redux-saga/effects'
import TokenService from '../../services/TokenService'
import UserService from '../../services/UserService'
import { LoginReqType, IMe, SignupReqType } from '../../interfaces/user'

export interface UserState {
  token: string | null
  me: IMe | null
  loading: boolean
  error: Error | null
}

const initialState: UserState = {
  token: null,
  me: null,
  loading: false,
  error: null,
}

const prefix = 'ezfarm/user'

export const {
  request,
  loginSuccess,
  logoutSuccess,
  signupSuccess,
  getUser,
  fail,
} = createActions(
  'REQUEST',
  'LOGIN_SUCCESS',
  'LOGOUT_SUCCESS',
  'SIGNUP_SUCCESS',
  'GET_USER',
  'FAIL',
  { prefix }
)

const reducer = handleActions<UserState, any>(
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
export const { login, logout, signup, editProfile } = createActions(
  'LOGIN',
  'LOGOUT',
  'SIGNUP',
  'EDIT_PROFILE',
  { prefix }
)

export function* userSaga() {
  yield takeEvery(`${prefix}/LOGIN`, loginSaga)
  yield takeEvery(`${prefix}/LOGOUT`, logoutSaga)
  yield takeEvery(`${prefix}/SIGNUP`, signupSaga)
  yield takeEvery(`${prefix}/EDIT_PROFILE`, editProfileSaga)
}

function* loginSaga(action: Action<LoginReqType>) {
  try {
    yield put(request())
    const token: string = yield call(UserService.login, action.payload)
    TokenService.set(token)
    const me: IMe = yield call(UserService.getUser)
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
    yield put(push('/login'))
  } catch (error) {
    yield put(fail('회원가입 실패'))
  }
}

function* editProfileSaga(action: Action<FormData>) {
  try {
    yield put(request())
    yield call(UserService.patchUser, action.payload)
    const me: IMe = yield call(UserService.getUser)
    UserService.set(me)
    yield put(getUser(me))
  } catch (error) {
    yield put(fail('실패'))
  }
}
