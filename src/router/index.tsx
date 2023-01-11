/* eslint-disable indent */
import React, { lazy } from 'react'
import { Outlet, Navigate, createBrowserRouter } from 'react-router-dom'
import App from '../App'
import { AppEnvEnum } from '../constants/enums'
import environment from '../environment'
import routerSubscriber from './routerSubscriber'

// 使用動態載入方式(code splitting)，避免剛訪問網站時就取得整包不一定會用到的 js 檔案
// 請依照頁面類型分組，打包會依照分組獨立成一份以 webpackChunkName 設定名稱之 js 檔案
const HomeLayout = lazy(() => import(/* webpackChunkName: "home" */ '../pages/Home'))
const EditProfile = lazy(() => import(/* webpackChunkName: "home" */ '../pages/Home/EditProfile'))
const Main = lazy(() => import(/* webpackChunkName: "home" */ '../pages/Home/Main'))
const PublicLayout = lazy(() => import(/* webpackChunkName: "public" */ '../pages/Public'))
const Landing = lazy(() => import(/* webpackChunkName: "public" */ '../pages/Public/Landing'))
const Login = lazy(() => import(/* webpackChunkName: "public" */ '../pages/Public/Login'))
const Sample = lazy(() => import(/* webpackChunkName: "dev" */ '../pages/Dev/Sample'))

const Suspense = (component: JSX.Element) => <React.Suspense fallback={<>...</>}>
  {component}
</React.Suspense>

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Navigate to="public" replace /> },

      /* [公開頁面區] */
      {
        path: 'public',
        element: Suspense(<PublicLayout />),
        children: [
          { index: true, element: <Navigate to="landing" replace /> },
          { path: 'landing', element: Suspense(<Landing />) },
          { path: 'login', element: Suspense(<Login />) }
        ]
      },

      /* [私有頁面區] */
      {
        path: 'home',
        element: Suspense(<HomeLayout />),
        children: [
          { index: true, element: <Navigate to="main" replace /> },
          { path: 'main', element: Suspense(<Main />) },
          { path: 'edit-profile', element: Suspense(<EditProfile />) },
          { path: '*', element: <Navigate to="main" replace /> }
        ]
      },

      /* [開發專用頁面區] */
      environment.appEnv === AppEnvEnum.DEVELOPMENT
        ? {
          path: 'dev',
          element: <Outlet />,
          children: [
            { index: true, element: <Navigate to="sample" replace /> },
            { path: 'sample/:userId', element: Suspense(<Sample />) },
            { path: 'sample', element: Suspense(<Sample />) }
          ]
        }
        : {},

      /* [預設頁面] */
      { path: '*', element: <Navigate to="public" replace /> }

    ]
  }
], {
  basename: process.env.PUBLIC_URL
})

// 訂閱路由變化事件
router.subscribe(routerSubscriber)

// 提供給組件外可以使用的轉址方法
// - 在組件內使用 useNavigator 提供的 navigate 方法會包含 basename
// - 但直接使用 router.navigate 不包含 basename，所以我們要在封裝起來
export const appNavigate = (url: string) => {
  router.navigate({ pathname: router.basename + url })
}

export default router
