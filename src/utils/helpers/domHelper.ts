
/**
 * freeze body DOM
 */
export const freezeBody = () => {
  document && document.body.classList.add('freezed')
}

/**
 * unfreeze body DOM
 */
export const unfreezeBody = () => {
  document && document.body.classList.remove('freezed')
}
