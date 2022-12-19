import { AppEnvEnum, AppModeEnum } from '../constants/enums'

/**
 * 下拉選單資訊
 */
export interface IOption {
  /** 數值 */
  value: string;
  /** 顯示文字 */
  label: string;
}

/**
 * 環境資訊
 */
export interface IEnvironment {
  /** 運行環境 (development / production) */
  appEnv: AppEnvEnum,

  /** 運行模式 (SIT / UAT / PROD) */
  appMode: AppModeEnum,

  /** 使用的 API 中台位置 */
  apiUrl: string,

  /** API 等待逾期時間 ms */
  apiTimeout: number
}
