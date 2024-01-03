import { useEffect, useRef } from 'react'

function useClickOutside ({ handler, listenCapturing = true }) {
  const ref = useRef()

  useEffect(() => {
    function onClickHandler (e) {
      if (ref.current && !ref.current.contains(e.target)) handler()
    }

    document.addEventListener('click', onClickHandler, listenCapturing)

    return document.removeEventListener('click', onClickHandler, listenCapturing)
  }, [handler, listenCapturing])

  return ref
}

export default useClickOutside
