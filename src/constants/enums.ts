
// ==================================
// 定義列舉，避免 magic num or string
// ==================================

/**
 *  APP 運行環境
 */
export enum AppEnvEnum {
  /**  development */
  Development = 'development',
  /**  production */
  Production = 'production',
}

/**
 *  APP 運行模式
 */
export enum AppModeEnum {
  /**  DEV 模式 */
  Dev = 'DEV',
  /**  SIT 模式 */
  Sit = 'SIT',
  /**  UAT 模式 */
  Uat = 'UAT',
  /**  PROD 模式 */
  Prod = 'PROD',
}

/**
 *  語系
 */
export enum LangEnum {
  /**  en */
  En = 'en',
  /**  zh-TW */
  ZhTw = 'zh-TW',
}

/**
 *  性別類別
 */
export enum GenderEnum {
  /**  男性 */
  Male = '1',
  /**  女性 */
  Female = '2',
}
