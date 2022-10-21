import { AppModeEnum } from '../constants/enums'
import developmentEnvironment from './development'
let environment = developmentEnvironment

// 僅調整與 development 有差別的部分就好
// 依據不同建置模式下使用不同的常數值
switch (process.env.REACT_APP_MODE) {
  case AppModeEnum.Sit:
    environment = { ...environment, apiUrl: 'https://xxx.sit/tw/api/' }
    break
  case AppModeEnum.Uat:
    environment = { ...environment, apiUrl: 'https://xxx.uat/tw/api/' }
    break
  case AppModeEnum.Prod:
    environment = { ...environment, apiUrl: 'https://react-lab-mock-api.herokuapp.com/api/' }
    break
}

export default environment
