import React from 'react'

import { StatsProvider } from './stats'
import { ToastProvider } from './toast'

export const GlobalContext = React.createContext()

export const GlobalProvider = ({ children }) => {
  const [position, setPosition] = React.useState({
    variant: 'top_right',
  })
  const [chainId, setChainId] = React.useState(null)

  return (
    <GlobalContext.Provider
      value={{
        chainId, setChainId, position, setPosition,
      }}
    >
      <StatsProvider>
        <ToastProvider variant={position.variant}>{children}</ToastProvider>
      </StatsProvider>
    </GlobalContext.Provider>
  )
}
