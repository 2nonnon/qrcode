'use client'

import { forwardRef, memo, useEffect, useImperativeHandle, useRef } from 'react'
import type { GenerateQrcodeOptions, GenerateQrcodeResult } from './generateQrcode'
import { generateQrcode } from './generateQrcode'

export type QrcodeProps = GenerateQrcodeOptions & { onChange?: (result: GenerateQrcodeResult) => void }

const Qrcode = memo(forwardRef<HTMLCanvasElement, QrcodeProps>(({ onChange, ...options }, ref) => {
  const target = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (target.current)
      generateQrcode(target.current, options).then(onChange)
  }, [options, target.current])

  useImperativeHandle(ref, () => {
    return target.current!
  }, [target.current])

  return (
    <>
      <div className='relative before:block before:pb-[100%] min-w-[200px] max-w-xs w-full rounded flex border border-[var(--border-color)]'>
        <canvas ref={target} className="absolute inset-0 w-full h-full rounded"></canvas>
      </div>
    </>
  )
}))

export default Qrcode
