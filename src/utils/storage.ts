
const KEY = {
  LANG: '@i18nextLng'
}

/**
 * 統一於此定義網站所有本地端資訊存取的方式
 * 避免後續可能因存取位置變化而牽動過多程式
 */

export default {

  /**
   * 網站語系
   */
  get lang() {
    return window.localStorage.getItem(KEY.LANG) || ''
  },
  set lang(value) {
    if (value) window.localStorage.setItem(KEY.LANG, value)
    else window.localStorage.removeItem(KEY.LANG)
  }

}
