import { useEffect } from 'react'

/**
 * Monitor key down
 * @param handleKeyDown action when key down
 * @param isEnable is enable monitor or not
 */
export default (handleKeyDown: (e: KeyboardEvent) => void, isEnable: boolean) => {
  useEffect(() => {
    if (isEnable) {
      window.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown, isEnable])
}
