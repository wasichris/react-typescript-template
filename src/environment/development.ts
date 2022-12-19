import { AppEnvEnum, AppModeEnum } from '../constants/enums'
import { IEnvironment } from '../models/common'

const developmentEnvironment: IEnvironment = {
  appEnv: process.env.NODE_ENV as AppEnvEnum,
  appMode: process.env.REACT_APP_MODE as AppModeEnum,
  apiUrl: '/mock-api',
  apiTimeout: 180000
}

export default developmentEnvironment
