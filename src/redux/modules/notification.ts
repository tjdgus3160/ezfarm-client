import { createActions, handleActions, Action } from 'redux-actions'
import { call, put, takeEvery } from 'redux-saga/effects'
import { INoti } from '../../interfaces/notification'
import NotificationService from '../../services/NotificationService'

export interface NotificationState {
  notifications: INoti[] | null
  loading: boolean
  error: Error | null
}

const initialState: NotificationState = {
  notifications: null,
  loading: false,
  error: null,
}

const prefix = 'ezfarm/notification'

export const { request, getNotificationSuccess, onMessageSuccess, fail } =
  createActions(
    'REQUEST',
    'GET_NOTIFICATION_SUCCESS',
    'ON_MESSAGE_SUCCESS',
    'FAIL',
    { prefix }
  )

const reducer = handleActions<NotificationState, any>(
  {
    REQUEST: state => ({
      ...state,
      loading: true,
      error: null,
    }),
    GET_NOTIFICATION_SUCCESS: (state, action) => ({
      ...state,
      notifications: action.payload,
      loading: false,
      error: null,
    }),
    ON_MESSAGE_SUCCESS: (state, action) => ({
      ...state,
      notifications: [action.payload, ...(state.notifications || [])],
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
export const { getNotification } = createActions('GET_NOTIFICATION', {
  prefix,
})

export function* notificationSaga() {
  yield takeEvery(`${prefix}/GET_NOTIFICATION`, getNotificationSaga)
}

function* getNotificationSaga(action: Action<number>) {
  try {
    yield put(request())
    const notifications: INoti[] = yield call(
      NotificationService.getNotification,
      action.payload
    )
    console.log('notifications : ', notifications)
    yield put(getNotificationSuccess(notifications))
  } catch (error) {
    yield put(fail('실패'))
  }
}
