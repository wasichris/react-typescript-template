import React, { useEffect } from 'react'

/**
 * do something as clicking outside of the DOM
 * @param {array | object} refs references of the DOM that you intend to bind the hook
 * @param {function} callback action when clicking outside of the DOM
 * @param {boolean} isTriggered trigger binding
 */
export default (refs: React.RefObject<any>, callback: () => void, isTriggered: boolean) => {
  useEffect(() => {
    const touchOutSideHandler = (event: TouchEvent | MouseEvent) => {
      if (Array.isArray(refs)) {
        // multiple targets
        const isClickInside = refs.some(
          (ref) => ref.current && ref.current.contains(event.target)
        )
        if (isTriggered && callback && !isClickInside) callback()
      } else if (refs.current && !refs.current.contains(event.target)) {
        // single target
        if (isTriggered && callback) callback()
      }
    }

    document.addEventListener('mousedown', touchOutSideHandler)
    document.addEventListener('touchstart', touchOutSideHandler)
    return () => {
      document.removeEventListener('mousedown', touchOutSideHandler)
      document.removeEventListener('touchstart', touchOutSideHandler)
    }
  }, [refs, callback, isTriggered])
}
