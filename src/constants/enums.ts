
// ==================================
// 定義列舉，避免 magic num or string
// ==================================

import { EnumDescription } from '../utils/decoratorHelper'

/**
 *  APP 運行環境
 */
export enum AppEnvEnum {
  /**  development */
  DEVELOPMENT = 'development',
  /**  production */
  PRODUCTION = 'production',
}

/**
 *  APP 運行模式
 */
export enum AppModeEnum {
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
 *  語系
 */
export enum LangEnum {
  /**  en */
  EN = 'en',
  /**  zh-TW */
  ZH_TW = 'zh-TW',
}

// ==================================
// 定義列舉選單，用於顯示前端固定的選單內容
// ==================================

/**
 *  性別
 */
export class GenderEnum {
  /**
   * 男性
   */
  @EnumDescription('__male' /* 男性 */)
  public static readonly MALE = '1'

  /**
   * 女性
   */
  @EnumDescription('__female' /* 女性 */)
  public static readonly FEMALE = '2'
}
