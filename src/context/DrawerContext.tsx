import { createContext, useMemo, useContext, useEffect } from 'react'

import useWindowSize from 'hooks/useWindowSize'
import usePrevious from 'hooks/usePrevious'
import useBoolean from 'hooks/useBoolean'

interface IDrawerContext {
  // eslint-disable-next-line no-unused-vars
  setOpen: (value: boolean) => void
  toggleOpen: () => void
  open: boolean
}

interface IDrawerContextProvider {
  children: JSX.Element
}

const DrawerContext = createContext<IDrawerContext>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setOpen: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleOpen: () => {},
  open: false,
})

const DrawerContextProvider = ({ children }: IDrawerContextProvider) => {
  const { width, isDesktop } = useWindowSize()
  const prevWidth = usePrevious(width)
  const [open, toggleOpen, setOpen] = useBoolean(false)

  useEffect(() => {
    if (prevWidth === undefined && width) {
      setOpen(isDesktop)
    }
  }, [isDesktop, prevWidth, setOpen, width])

  const drawer = useMemo(
    () => ({
      setOpen,
      toggleOpen,
      open,
    }),
    [open, setOpen, toggleOpen]
  )

  return (
    <DrawerContext.Provider value={drawer}>{children}</DrawerContext.Provider>
  )
}

export const useDrawer = () => useContext(DrawerContext)
export default DrawerContextProvider
