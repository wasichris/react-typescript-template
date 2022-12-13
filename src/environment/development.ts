import { IEnvironment } from '../models/common'

const developmentEnvironment: IEnvironment = {
  appEnv: process.env.NODE_ENV,
  appMode: process.env.REACT_APP_MODE,
  apiUrl: '',
  apiTimeout: 180000
}

export default developmentEnvironment
