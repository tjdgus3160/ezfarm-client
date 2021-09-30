import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createBrowserHistory } from 'history'
import reducer from './modules/rootReducer'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './modules/rootSaga'
import TokenService from '../services/TokenService'
import { routerMiddleware } from 'connected-react-router'
import UserService from '../services/UserService'

export const history = createBrowserHistory()

const create = () => {
  const sagaMiddleware = createSagaMiddleware()
  const token = TokenService.get()
  const me = UserService.get()

  const store = createStore(
    reducer(history),
    {
      user: {
        token,
        me,
        loading: false,
        error: null,
      },
    },
    composeWithDevTools(
      applyMiddleware(sagaMiddleware, routerMiddleware(history))
    )
  )

  sagaMiddleware.run(rootSaga)

  return store
}

export default create
