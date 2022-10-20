/**
 * 下拉選單資訊
 */
export interface IOption {
  /** 數值 */
  Value: string;
  /** 顯示文字 */
  Label: string;
}

/**
 * 環境資訊
 */
export interface IEnvironment {
  /** 運行環境 (development / production) */
  APP_ENV: string,

  /** 運行模式 (SIT / UAT / PROD) */
  APP_MODE: string | undefined,

  /** 使用的 API 中台位置 */
  API_URL: string,

  /** API 等待逾期時間 ms */
  API_TIMEOUT: number
}
