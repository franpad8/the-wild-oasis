import { useEffect, useRef } from 'react'

function useClickOutside ({ handler }) {
  const ref = useRef()

  useEffect(() => {
    function onClickHandler (e) {
      if (ref.current && !ref.current.contains(e.target)) handler()
    }

    document.addEventListener('click', onClickHandler, true)

    return document.removeEventListener('click', onClickHandler)
  }, [handler])

  return ref
}

export default useClickOutside
