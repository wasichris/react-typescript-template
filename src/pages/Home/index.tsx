import { Outlet } from 'react-router-dom'
import AppLayout from '../../containers/AppLayout'

interface IProps { }

/**
 * 私有頁面的共用樣板
 */
const Home = (props: IProps) => {
  return (
    <AppLayout isAuthRequired>

      {/* child route page */}
      <Outlet />

    </AppLayout>
  )
}

export default Home
