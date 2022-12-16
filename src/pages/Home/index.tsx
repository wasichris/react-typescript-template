import React, { useState } from 'react'
import { Navigate, NavLink, Outlet, useNavigate } from 'react-router-dom'
import logo from '../../assets/images/logo.svg'
import useAppDispatch from '../../hooks/useAppDispatch'
import { logout } from '../../store/slices/systemSlice'

interface IProps {
};

const Home = (props: IProps) => {
  // TODO: 模擬 redux state
  const [isAuthenticated] = useState(true)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  if (!isAuthenticated) {
    return <Navigate to="/landing" />
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate('/public/landing') // TODO: 要移到 authListener
  }

  return <>
    <header className="app-header">
      <img src={logo} alt="logo" className="app-header__logo" />
      <span className="app-header__title">REACT</span>

      <ul className="app-header__nav">

        <li className="app-header__nav-item">
          <NavLink to={'/home/main'}>Main</NavLink>
        </li>

        <li className="app-header__nav-item app-header__nav-item--active">
          <NavLink to={'/home/edit-profile'}>Profile</NavLink>
        </li>

        <li className="app-header__nav-item">
          <button className='btn-link' onClick={handleLogout}>Logout</button>
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

export default Home
