/* eslint-disable indent */
import React, { lazy } from 'react'
import { useRoutes, Outlet, Navigate, RouteObject } from 'react-router-dom'
import { AppEnvEnum } from './constants/enums'
import environment from './environment'

// 使用動態載入方式(code splitting)，避免剛訪問網站時就取得整包不一定會用到的 js 檔案
// 請依照頁面類型分組，打包會依照分組獨立成一份以 webpackChunkName 設定名稱之 js 檔案
const HomeLayout = lazy(() => import(/* webpackChunkName: "home" */ './pages/Home'))
const EditProfile = lazy(() => import(/* webpackChunkName: "home" */ './pages/Home/EditProfile'))
const Main = lazy(() => import(/* webpackChunkName: "home" */ './pages/Home/Main'))
const PublicLayout = lazy(() => import(/* webpackChunkName: "public" */ './pages/Public'))
const Landing = lazy(() => import(/* webpackChunkName: "public" */ './pages/Public/Landing'))
const Login = lazy(() => import(/* webpackChunkName: "public" */ './pages/Public/Login'))
const Demo = lazy(() => import(/* webpackChunkName: "dev" */ './pages/Dev/Demo'))

const Suspense = (component: JSX.Element) => <React.Suspense fallback={<>...</>}>
  {component}
</React.Suspense>

const routes: RouteObject[] = [

  { path: '/', element: <Navigate to="public" /> },

  /* [公開頁面區] */
  {
    path: 'public',
    element: Suspense(<PublicLayout />),
    children: [
      { index: true, element: <Navigate to="landing" /> },
      { path: 'landing', element: Suspense(<Landing />) },
      { path: 'login', element: Suspense(<Login />) }
    ]
  },

  /* [私有頁面區] */
  {
    path: 'home',
    element: Suspense(<HomeLayout />),
    children: [
      { index: true, element: <Navigate to="main" /> },
      { path: 'main', element: Suspense(<Main />) },
      { path: 'edit-profile', element: Suspense(<EditProfile />) }
    ]
  },

  /* [開發專用頁面區] */
  environment.appEnv === AppEnvEnum.DEVELOPMENT
    ? {
      path: 'dev',
      element: <Outlet />,
      children: [
        { index: true, element: <Navigate to="demo" /> },
        { path: 'demo/:userId', element: Suspense(<Demo />) },
        { path: 'demo', element: Suspense(<Demo />) }
      ]
    }
    : {},

  /* [預設頁面] */
  { path: '*', element: <Navigate to="home" /> }

]

const AppRoutes = () => useRoutes(routes)
export default AppRoutes
