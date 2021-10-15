import { Action, handleActions, createActions } from 'redux-actions'
import { put, takeEvery } from 'redux-saga/effects'
import { IFacility } from '../../interfaces/facility'
export interface FacilityState {
  facility: IFacility | null
  loading: boolean
  error: Error | null
}

const initialState: FacilityState = {
  facility: null,
  loading: false,
  error: null,
}

const prefix = 'ezfarm/facility'

export const { request, getFacilitySuccess, fail } = createActions(
  'REQUEST',
  'GET_FACILITY_SUCCESS',
  'FAIL',
  { prefix }
)

const reducer = handleActions<FacilityState, any>(
  {
    REQUEST: state => ({
      ...state,
      loading: true,
      error: null,
    }),
    GET_FACILITY_SUCCESS: (state, action) => ({
      ...state,
      facility: action.payload,
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
export const { getFacility } = createActions('GET_FACILITY', {
  prefix,
})

export function* facilitySaga() {
  yield takeEvery(`${prefix}/GET_FACILITY`, getFacilitySaga)
}

function* getFacilitySaga(action: Action<number>) {
  try {
    yield put(request())
    // const facility: IFacility = yield call(
    //   FacilityService.getFacility,
    //   action.payload
    // )
    yield put(
      getFacilitySuccess({
        co2: '30',
        humidity: '21',
        illuminance: '11',
        measureDate: '16',
        mos: '27',
        ph: '15',
        tmp: '36',
      })
    )
  } catch (error) {
    yield put(fail('실패'))
  }
}
