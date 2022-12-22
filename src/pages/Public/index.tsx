import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import logo from '../../assets/images/logo.svg'

interface IProps {
};

const Public = (props: IProps) => {
  return <>
    <header className="app-header">
      <img src={logo} alt="logo" className="app-header__logo" />
      <span className="app-header__title">REACT</span>

      <ul className="app-header__nav">
        <li className="app-header__nav-item">
          <NavLink to={'/public/login'}>Login</NavLink>
        </li>
      </ul>
    </header>

    <div className="app-body">
      <div className="app-body__container">

        {/* child route page */}
        <Outlet />

      </div>
    </div>

  </>
}

export default Public
