import { AppModeEnum } from '../constants/enums'
import developmentEnvironment from './development'

// 全部皆以 development 設置為基礎
let productionEnvironment = developmentEnvironment

// 僅調整與 development 有差別的部分就好
// 依據不同建置模式下使用不同的常數值
switch (productionEnvironment.appMode) {
  case AppModeEnum.SIT:
    productionEnvironment = { ...productionEnvironment, apiUrl: 'https://xxx.sit/tw/api/' }
    break
  case AppModeEnum.UAT:
    productionEnvironment = { ...productionEnvironment, apiUrl: 'https://xxx.uat/tw/api/' }
    break
  case AppModeEnum.PROD:
    productionEnvironment = { ...productionEnvironment, apiUrl: 'https://react-lab-mock-api.herokuapp.com/api/' }
    break
}

export default productionEnvironment
