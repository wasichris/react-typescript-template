
// ==================================
// 定義列舉，避免 magic num or string
// ==================================

/**
 *  APP 運行環境
 */
export enum APP_ENV {
  /**  development */
  DEVELOPMENT = 'development',
  /**  production */
  PRODUCTION = 'production',
}

/**
 *  APP 運行模式
 */
export enum APP_MODE {
  /**  DEV 模式 */
  DEV = 'DEV',
  /**  SIT 模式 */
  SIT = 'SIT',
  /**  UAT 模式 */
  UAT = 'UAT',
  /**  PROD 模式 */
  PROD = 'PROD',
}

/**
 *  性別類別
 */
export enum GENDER {
  /**  男性 */
  MALE = '1',
  /**  女性 */
  FEMALE = '2',
}
