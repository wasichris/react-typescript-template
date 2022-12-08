
const KEY = {
  LNG: '@i18nextLng'
}

/**
 * 統一於此定義網站所有本地端資訊存取的方式
 * 避免後續可能因存取位置變化而牽動過多程式
 */

export default {
  get lang() {
    return window.localStorage.getItem(KEY.LNG) || ''
  },
  set lang(value) {
    if (value) window.localStorage.setItem(KEY.LNG, value)
    else window.localStorage.removeItem(KEY.LNG)
  }

}
