/* eslint-disable no-extend-native */
declare global {
  interface String {
    isSuccessCode(): boolean
  }
}

String.prototype.isSuccessCode = function () {
  return String(this) === '0000' // api 成功代碼
}

export { }
