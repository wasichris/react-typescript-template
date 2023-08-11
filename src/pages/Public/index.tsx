import { Outlet } from 'react-router-dom'
import AppLayout from '@/containers/AppLayout'

interface IProps { }

/**
 * 公開頁面的共用樣板
 */
const Public = (props: IProps) => {
  return (
    <AppLayout>

      {/* child route page */}
      <Outlet />

    </AppLayout>
  )
}

export default Public
