import { all } from 'redux-saga/effects'
import { userSaga } from './user'
import { farmSaga } from './farm'
import { facilitySaga } from './facility'

export default function* rootSaga() {
  yield all([userSaga(), farmSaga(), facilitySaga()])
}
