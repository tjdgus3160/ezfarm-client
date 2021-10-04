import { Action, createActions, handleActions } from 'redux-actions'
import { call, put, takeEvery } from 'redux-saga/effects'
import { IFavorite } from '../../interfaces/favorite'
import FavoriteService from '../../services/FavoriteService'

export interface FavoriteState {
  favorite: IFavorite[] | null
  loading: boolean
  error: Error | null
}

const initialState: FavoriteState = {
  favorite: null,
  loading: false,
  error: null,
}

const prefix = 'ezfarm/favorite'

export const { request, getFavoriteSuccess, fail } = createActions(
  'REQUEST',
  'GET_FAVORITE_SUCCESS',
  'FAIL',
  { prefix }
)

const reducer = handleActions<FavoriteState, any>(
  {
    REQUEST: state => ({
      ...state,
      loading: true,
      error: null,
    }),
    GET_FAVORITE_SUCCESS: (state, action) => ({
      ...state,
      favorite: action.payload,
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
export const { getFavorite, addFavorite, deleteFavorite } = createActions(
  'GET_FAVORITE',
  'ADD_FAVORITE',
  'DELETE_FAVORITE',
  {
    prefix,
  }
)

export function* favoriteSaga() {
  yield takeEvery(`${prefix}/GET_FAVORITE`, getFavoriteSaga)
  yield takeEvery(`${prefix}/ADD_FAVORITE`, addFavoriteSaga)
  yield takeEvery(`${prefix}/DELETE_FAVORITE`, deleteFavoriteSaga)
}

function* getFavoriteSaga() {
  try {
    yield put(request())
    const favorite: IFavorite[] = yield call(FavoriteService.getFavorite)
    yield put(getFavoriteSuccess(favorite))
  } catch (error) {
    yield put(fail('실패'))
  }
}

function* addFavoriteSaga(action: Action<number>) {
  try {
    yield put(request())
    yield call(FavoriteService.addFavorite, action.payload)
    yield put(getFavorite())
  } catch (error) {
    yield put(fail('실패'))
  }
}

function* deleteFavoriteSaga(action: Action<number>) {
  try {
    yield put(request())
    yield call(FavoriteService.deleteFavorite, action.payload)
    yield put(getFavorite())
  } catch (error) {
    yield put(fail('실패'))
  }
}
