import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Navigation = () => {
  return (
    <Nav>
      <ul>
        <li>
          <span />
          <NavLink
            exact
            to="/"
            activeClassName="nav__link-active"
            className="nav__link"
          >
            <div>Home</div>
          </NavLink>
        </li>
        <li>
          <span />
          <NavLink
            exact
            to="/myfarm"
            activeClassName="nav__link-active"
            className="nav__link"
          >
            <div>My farm</div>
          </NavLink>
        </li>
        <li>
          <span />
          <NavLink
            exact
            to="/farmcomparison"
            activeClassName="nav__link-active"
            className="nav__link"
          >
            <div>Farm comparison</div>
          </NavLink>
        </li>
        <li>
          <span />
          <NavLink
            exact
            to="/notification"
            activeClassName="nav__link-active"
            className="nav__link"
          >
            <div>Notification</div>
          </NavLink>
        </li>
      </ul>
    </Nav>
  )
}

const Nav = styled.nav`
  ul {
    min-width: 330px;
    display: flex;
    flex-direction: column;
    margin-top: 105px;
    padding-left: 0;
  }
  li {
    height: 60px;
    position: relative;
    cursor: pointer;
    margin-bottom: 60px;
    &:hover .nav__link {
      transform: translateX(85px);
      transition: all 0.9s ease-in-out;
    }
  }
  span {
    position: absolute;
    top: 25px;
    width: 200px;
    height: 10px;
    background-color: #ffffff;
    box-shadow: 0 0.2rem 0.3rem 0.1rem rgba(85, 85, 85, 0.25);
  }
  .nav__link {
    position: absolute;
    width: 184px;
    height: 60px;
    border-radius: 15px;
    background-color: #ffffff;
    left: 34px;
    font-size: 18px;
    font-weight: 600;
    text-align: center;
    line-height: 60px;
    box-shadow: 0 0.2rem 0.3rem 0.1rem rgba(85, 85, 85, 0.25);
  }
  .nav__link-active {
    transform: translateX(85px);
  }
`
export default Navigation
