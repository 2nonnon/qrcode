'use client'

import type { ChangeEventHandler, FC } from 'react'
import { useCallback } from 'react'
import type { NChangeEventHandler } from './type'

interface NInputNumberProps {
  className?: string
  name?: string
  value?: number
  onChange: NChangeEventHandler<number>
  min?: number
  max?: number
}

export const NInputNumber: FC<NInputNumberProps> = ({ className, name, value, min, max, onChange }) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    onChange(
      +e.target.value,
      name,
    )
  }, [onChange, name])

  return (<>
    <input className={`border border-[var(--border-color)] rounded w-16 pl-1 ${className}`} type="number" min={min} max={max} value={value} onChange={handleChange}/>
  </>)
}
