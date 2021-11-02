import { useState, useCallback } from 'react'

const useBoolean = (
  bool: boolean
  // eslint-disable-next-line no-unused-vars
): [boolean, () => void, (value: boolean) => void] => {
  const [boolean, setBool] = useState(bool)

  const toggleBoolean = useCallback(() => {
    setBool((prev) => !prev)
  }, [])

  const setBoolean = useCallback((value: boolean) => {
    setBool(value)
  }, [])

  return [boolean, toggleBoolean, setBoolean]
}

export default useBoolean
