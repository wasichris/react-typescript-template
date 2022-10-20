import { IEnvironment } from '../models/common'

const developmentEnvironment: IEnvironment = {
  APP_ENV: process.env.NODE_ENV,
  APP_MODE: process.env.REACT_APP_MODE,
  API_URL: 'http://localhost:8888/api/',
  API_TIMEOUT: 180000
}

export default developmentEnvironment
