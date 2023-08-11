import React, { useEffect } from 'react'

/**
 * Observe clicks outside of the DOM
 * @param refs references of the DOM that you intend to bind the hook
 * @param handler handler when clicking outside of the DOM
 * @param isEnable is enable observe or not
 */
export default (refs: React.RefObject<HTMLElement>, handler: () => void, isEnable: boolean) => {
  useEffect(() => {
    const touchOutSideHandler = (event: TouchEvent | MouseEvent) => {
      if (Array.isArray(refs)) {
        // multiple targets
        const isClickInside = refs.some(
          (ref) => ref.current && ref.current.contains(event.target as Node)
        )
        if (isEnable && handler && !isClickInside) handler()
      } else {
        // single target
        const isClickOutside =
          refs.current && !refs.current.contains(event.target as Node)
        if (isEnable && handler && isClickOutside) handler()
      }
    }

    document.addEventListener('mousedown', touchOutSideHandler)
    document.addEventListener('touchstart', touchOutSideHandler)

    return () => {
      document.removeEventListener('mousedown', touchOutSideHandler)
      document.removeEventListener('touchstart', touchOutSideHandler)
    }
  }, [refs, handler, isEnable])
}
