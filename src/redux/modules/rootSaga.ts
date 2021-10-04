import { all } from 'redux-saga/effects'
import { userSaga } from './user'
import { farmSaga } from './farm'
import { facilitySaga } from './facility'
import { favoriteSaga } from './favorite'

export default function* rootSaga() {
  yield all([userSaga(), farmSaga(), facilitySaga(), favoriteSaga()])
}
