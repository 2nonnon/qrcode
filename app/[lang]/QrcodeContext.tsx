'use client'

import type { Dispatch } from 'react'
import { createContext, useContext, useReducer } from 'react'
import type { GenerateQrcodeOptions } from '@/components/Qrcode'

const QrcodeContext = createContext<GenerateQrcodeOptions | null>(null)

const QrcodeDispatchContext = createContext<Dispatch<QrcodeReducerAction> | null>(null)

interface QrcodeProviderProps {
  children: React.ReactNode
}

export function QrcodeProvider({ children }: QrcodeProviderProps) {
  const [qrcode, dispatch] = useReducer(
    qrcodeReducer,
    {
      content: 'Hi!',
      ecc: 'L',
      maskPattern: -1,
      boostEcc: false,
      minVersion: 1,
      maxVersion: 40,
      border: 2,
      pixelSize: 20,
      pixelStyle: 'Rounded',
      markerStyle: 'Auto',
    } as GenerateQrcodeOptions,
  )

  return (
    <QrcodeContext.Provider value={qrcode}>
      <QrcodeDispatchContext.Provider value={dispatch}>
        {children}
      </QrcodeDispatchContext.Provider>
    </QrcodeContext.Provider>
  )
}

export function useQrcodeOptions() {
  return useContext(QrcodeContext)!
}

export function useQrcodeDispatch() {
  return useContext(QrcodeDispatchContext)!
}

export interface QrcodeReducerAction {
  type: 'changed'
  options: Partial<GenerateQrcodeOptions>
}

function qrcodeReducer(options: GenerateQrcodeOptions, action: QrcodeReducerAction): GenerateQrcodeOptions {
  switch (action.type) {
    case 'changed': {
      return Object.assign({}, options, action.options)
    }
    default: {
      throw new Error('Unknown action')
    }
  }
}
