import React, { useEffect } from 'react'

/**
 * Observe clicks outside of the DOM
 * @param refs references of the DOM that you intend to bind the hook
 * @param callback action when clicking outside of the DOM
 * @param isEnable is enable observe or not
 */
export default (refs: React.RefObject<HTMLElement>, callback: () => void, isEnable: boolean) => {
  useEffect(() => {
    const touchOutSideHandler = (event: TouchEvent | MouseEvent) => {
      if (Array.isArray(refs)) {
        // multiple targets
        const isClickInside = refs.some(
          (ref) => ref.current && ref.current.contains(event.target as Node)
        )
        if (isEnable && callback && !isClickInside) callback()
      } else if (refs.current && !refs.current.contains(event.target as Node)) {
        // single target
        if (isEnable && callback) callback()
      }
    }

    document.addEventListener('mousedown', touchOutSideHandler)
    document.addEventListener('touchstart', touchOutSideHandler)

    return () => {
      document.removeEventListener('mousedown', touchOutSideHandler)
      document.removeEventListener('touchstart', touchOutSideHandler)
    }
  }, [refs, callback, isEnable])
}
