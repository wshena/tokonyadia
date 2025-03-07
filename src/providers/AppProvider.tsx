'use client'
import { persistor, store } from '@/redux/store'
import React, { ReactNode } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { Provider as ChackraProvider } from "@/components/ui/provider"
import { PersistGate } from 'redux-persist/integration/react'

const AppProvider = ({children}:{children:ReactNode}) => {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ChackraProvider>
          {children}
        </ChackraProvider>
      </PersistGate>
    </ReduxProvider>
  )
}

export default AppProvider