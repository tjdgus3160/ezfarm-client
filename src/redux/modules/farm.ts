import { Action, createActions, handleActions } from 'redux-actions'
import { call, put, takeEvery } from 'redux-saga/effects'
import { IFarm, IFarmFormData } from '../../interfaces/farm'
import { IOtherFarm } from '../../interfaces/favorite'
import FarmService from '../../services/FarmService'

export interface FarmState {
  mainFarm: IFarm | null
  farms: IFarm[] | null
  otherFarms: IOtherFarm[] | null
  loading: boolean
  error: Error | null
}

const initialState: FarmState = {
  mainFarm: null,
  farms: null,
  otherFarms: null,
  loading: false,
  error: null,
}

const prefix = 'ezfarm/farm'

export const { request, getFarmsSuccess, getOtherFarmsSuccess, fail } =
  createActions(
    'REQUEST',
    'GET_FARMS_SUCCESS',
    'GET_OTHER_FARMS_SUCCESS',
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
    GET_OTHER_FARMS_SUCCESS: (state, action) => ({
      ...state,
      otherFarms: action.payload,
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
export const { addFarm, editFarm, deleteFarm, getFarms, getOtherFarms } =
  createActions(
    'ADD_FARM',
    'EDIT_FARM',
    'DELETE_FARM',
    'GET_FARMS',
    'GET_OTHER_FARMS',
    {
      prefix,
    }
  )

export function* farmSaga() {
  yield takeEvery(`${prefix}/ADD_FARM`, addFarmSaga)
  yield takeEvery(`${prefix}/EDIT_FARM`, editFarmSaga)
  yield takeEvery(`${prefix}/DELETE_FARM`, deleteFarmSaga)
  yield takeEvery(`${prefix}/GET_FARMS`, getFarmsSaga)
  yield takeEvery(`${prefix}/GET_OTHER_FARMS`, getOtherFarmsSaga)
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

function* getOtherFarmsSaga() {
  try {
    yield put(request())
    const others: IOtherFarm[] = yield call(FarmService.getOtherFarms)
    yield put(getOtherFarmsSuccess(others))
  } catch (error) {
    yield put(fail('실패'))
  }
}
