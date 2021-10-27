import { useEffect, useState } from 'react'

interface ClientOnlyProps {
  children: JSX.Element
}

const ClientOnly = ({ children, ...delegated }: ClientOnlyProps) => {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) return null

  return <div {...delegated}>{children}</div>
}

export default ClientOnly
