import { Button } from 'antd'
import React from 'react'

interface Props {
  logout: () => void
}

const Home = ({ logout }: Props) => {
  return (
    <div>
      Home
      <Button onClick={logout}>로그아웃</Button>
    </div>
  )
}

export default Home
