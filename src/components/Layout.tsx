import styled from 'styled-components'
import React from 'react'

const Layout: React.FC = ({ children }) => <Wrapper>{children}</Wrapper>

const Wrapper = styled.div`
  height: 100vh;
  background: url('/images/bg.png') no-repeat;
  background-size: cover;
`

export default Layout
