import { Action, createActions, handleActions } from 'redux-actions'
import { call, put, takeEvery } from 'redux-saga/effects'
import { IFarm, IFarmFormData } from '../../interfaces/farm'
import FarmService from '../../services/FarmService'

export interface FarmState {
  mainFarm: IFarm | null
  farms: IFarm[] | null
  loading: boolean
  error: Error | null
}

const initialState: FarmState = {
  mainFarm: null,
  farms: null,
  loading: false,
  error: null,
}

const prefix = 'ezfarm/farm'

export const { request, getFarmsSuccess, fail } = createActions(
  'REQUEST',
  'GET_FARMS_SUCCESS',
  'FAIL',
  { prefix }
)

const reducer = handleActions<FarmState, any>(
  {
    REQUEST: state => ({
      ...state,
      loading: true,
      error: null,
    }),
    GET_FARMS_SUCCESS: (state, action) => ({
      ...state,
      mainFarm: action.payload.find((farm: IFarm) => farm.main),
      farms: action.payload,
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
export const { addFarm, editFarm, deleteFarm, getFarms } = createActions(
  'ADD_FARM',
  'EDIT_FARM',
  'DELETE_FARM',
  'GET_FARMS',
  {
    prefix,
  }
)

export function* farmSaga() {
  yield takeEvery(`${prefix}/ADD_FARM`, addFarmSaga)
  yield takeEvery(`${prefix}/EDIT_FARM`, editFarmSaga)
  yield takeEvery(`${prefix}/DELETE_FARM`, deleteFarmSaga)
  yield takeEvery(`${prefix}/GET_FARMS`, getFarmsSaga)
}

function* addFarmSaga(action: Action<IFarmFormData>) {
  try {
    yield put(request())
    yield call(FarmService.addFarm, action.payload)
    yield put(getFarms())
  } catch (error) {
    yield put(fail('실패'))
  }
}

function* editFarmSaga(action: Action<{ farmId: number; farm: IFarm }>) {
  try {
    yield put(request())
    yield call(FarmService.editFarm, action.payload.farmId, action.payload.farm)
    yield put(getFarms())
  } catch (error) {
    yield put(fail('실패'))
  }
}

function* deleteFarmSaga(action: Action<number>) {
  try {
    yield put(request())
    yield call(FarmService.deleteFarm, action.payload)
    yield put(getFarms())
  } catch (error) {
    yield put(fail('실패'))
  }
}

function* getFarmsSaga() {
  try {
    yield put(request())
    const farms: IFarm[] = yield call(FarmService.getFarms)
    yield put(getFarmsSuccess(farms))
  } catch (error) {
    yield put(fail('실패'))
  }
}
