import { IEnvironment } from '../models/common'

// 依據建置環境選擇對應變數定義檔
const env = process.env.NODE_ENV
const environment = require('./' + env + '.ts').default as IEnvironment
export default environment
