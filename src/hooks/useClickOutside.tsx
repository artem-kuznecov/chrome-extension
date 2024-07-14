import { useEffect } from 'react'

/**
 * Hook that alerts clicks outside of the passed ref
 */
export function useClickOutside (ref: any, handler: any, initState: boolean) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside (event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        // alert('You clicked outside of me!')
        if (initState) handler()
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [
    ref,
    handler,
    initState
  ])
}