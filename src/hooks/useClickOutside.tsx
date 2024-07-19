import { useEffect } from 'react'

export function useClickOutside (ref: any, handler: any, shouldTriggerHandler?: boolean) {
  useEffect(() => {
    function handleClickOutside (event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        if (shouldTriggerHandler && shouldTriggerHandler !== undefined) handler()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [
    ref,
    handler,
    shouldTriggerHandler
  ])
}