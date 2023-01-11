import { useEffect } from 'react'

/**
 * Observe key down
 * @param handler key down handler
 * @param isEnable is enable observe or not
 */
export default (handler: (e: KeyboardEvent) => void, isEnable: boolean) => {
  useEffect(() => {
    if (isEnable) {
      window.addEventListener('keydown', handler)
    }

    return () => {
      window.removeEventListener('keydown', handler)
    }
  }, [handler, isEnable])
}
