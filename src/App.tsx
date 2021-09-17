import { ConnectedRouter } from 'connected-react-router'
import { ErrorBoundary } from 'react-error-boundary'
import { Route, Switch } from 'react-router-dom'
import Error from './pages/Error'
import Home from './pages/Home'
import Login from './pages/Login'
import Myfarm from './pages/Myfarm'
import NotFound from './pages/NotFound'
import Notification from './pages/Notification'
import Otherfarm from './pages/Otherfarm'
import { history } from './redux/create'

function App() {
  return (
    <ErrorBoundary FallbackComponent={Error}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/myfarm" component={Myfarm} />
          <Route exact path="/otherfarm" component={Otherfarm} />
          <Route exact path="/notification" component={Notification} />
          <Route exact path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </ConnectedRouter>
    </ErrorBoundary>
  )
}

export default App
