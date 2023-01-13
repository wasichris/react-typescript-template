import { Navigate, NavLink, useLocation } from 'react-router-dom'
import { logout } from '../../store/slices/appSlice'
import useAppDispatch from '../../utils/hooks/useAppDispatch'
import useAppSelector from '../../utils/hooks/useAppSelector'
import logo from '../../assets/images/logo.svg'
import { PropsWithChildren } from 'react'

interface IProps {
  isAuthRequired?: boolean
}

const AppLayout = (props: PropsWithChildren<IProps>) => {
  const isLogin = useAppSelector(state => state.app.isLogin)
  const dispatch = useAppDispatch()
  const location = useLocation()

  if (props.isAuthRequired && !isLogin) {
    const currentPath = location.pathname
    return <Navigate to={`/public/login?redirect_url=${currentPath}`} />
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div className='ct-app-layout'>

      {/* Header */}
      <header className="app-header">

        <img src={logo} alt="logo" className="app-header__logo" />
        <span className="app-header__title">REACT</span>

        <ul className="app-header__nav">

          {/* 未登入選單 */}
          {!isLogin && <>

            <li className="app-header__nav-item">
              <NavLink to={'/dev/sample'}>Dev Sample</NavLink>
            </li>

            <li className="app-header__nav-item">
              <NavLink to={'/public/login'}>Login</NavLink>
            </li>
          </>}

          {/* 已登入選單 */}
          {isLogin && <>

            <li className="app-header__nav-item">
              <NavLink to={'/home/main'}>Main</NavLink>
            </li>

            <li className="app-header__nav-item app-header__nav-item--active">
              <NavLink to={'/home/edit-profile'}>Profile</NavLink>
            </li>

            <li className="app-header__nav-item">
              <a onClick={handleLogout}>Logout</a>
            </li>

          </>}

        </ul>

      </header>

      {/* Body */}
      <div className="app-body">
        <div className="app-body__container">

          {/* child */}
          {props.children}

        </div>
      </div>

    </div>
  )
}

export default AppLayout
