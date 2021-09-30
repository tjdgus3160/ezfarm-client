import { Redirect } from 'react-router-dom'
import HomeContainer from '../containers/HomeContainer'
import useToken from '../hooks/useToken'

const Home = () => {
  const token = useToken()
  if (token === null) {
    return <Redirect to="/login" />
  }
  return <HomeContainer />
}

export default Home
