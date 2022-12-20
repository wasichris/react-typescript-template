import { RouterSubscriber } from '@remix-run/router'
const routerSubscriber: RouterSubscriber = routerState => {
  // 可以定義路由變化需要統一調整的邏輯於此
  // console.log(routerState.location)
}

export default routerSubscriber
