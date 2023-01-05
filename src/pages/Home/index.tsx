import React from 'react'
import { Navigate, NavLink, Outlet, useLocation } from 'react-router-dom'
import logo from '../../assets/images/logo.svg'
import useAppDispatch from '../../utils/hooks/useAppDispatch'
import useAppSelector from '../../utils/hooks/useAppSelector'
import { logout } from '../../store/slices/appSlice'

interface IProps {
};

/**
 * 私有頁面的共用樣板
 */
const Home = (props: IProps) => {
  const isLogin = useAppSelector(state => state.app.isLogin)
  const dispatch = useAppDispatch()
  const location = useLocation()

  if (!isLogin) {
    const currentPath = location.pathname
    return <Navigate to={`/public/login?redirect_url=${currentPath}`} />
  }

  const handleLogout = () => {
    dispatch(logout())
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
