import React from 'react'
import { Redirect } from 'react-router-dom'
import NotificationContainer from '../containers/NotificationContainer'
import useToken from '../hooks/useToken'

const Notification = () => {
  const token = useToken()
  if (token === null) {
    return <Redirect to="/login" />
  }
  return <NotificationContainer />
}

export default Notification
