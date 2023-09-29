'use client'

import type { ChangeEventHandler, FC } from 'react'
import { useCallback } from 'react'
import type { NChangeEventHandler } from './type'

interface NSliderProps {
  className?: string
  name?: string
  value?: string | number
  onChange: NChangeEventHandler<string>
  min?: number
  max?: number
}

export const NSlider: FC<NSliderProps> = ({ className, name, value, min, max, onChange }) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    onChange(
      e.target.value,
      name,
    )
  }, [onChange, name])

  return (<>
    <input className={className} type="range" min={min} max={max} value={value} onChange={handleChange}/>
  </>)
}
