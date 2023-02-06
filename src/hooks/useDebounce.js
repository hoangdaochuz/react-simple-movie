import React, { useEffect, useState } from 'react';

const useDebounce = (initialValue, delay=1000) => {
  const [debounceValue, setDebounceValue] = useState()
  useEffect(()=>{
    const timer = setTimeout(()=>{
      setDebounceValue(initialValue)
    }, delay)

    return ()=>{
      clearInterval(timer)
    }

  },[initialValue, delay])

  return debounceValue
};

export default useDebounce;