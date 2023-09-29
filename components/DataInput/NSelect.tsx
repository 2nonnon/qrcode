'use client'

import type { ChangeEventHandler, FC } from 'react'
import { useCallback } from 'react'
import type { NChangeEventHandler } from './type'

interface NSelectProps<T = string | number> {
  name?: string
  value?: T
  onChange: NChangeEventHandler<T>
  options: Array<{
    label: T
    value: T
  }>
}

export const NSelect: FC<NSelectProps> = ({ name, value, onChange, options }) => {
  const handleChange: ChangeEventHandler<HTMLSelectElement> = useCallback((e) => {
    onChange(
      e.target.value,
      name,
    )
  }, [onChange, name])

  return (<>
    <select className='border border-[var(--border-color)] rounded w-32' value={value} onChange={handleChange}>
      {options.map(item => <option value={item.value} key={item.value}>{item.label}</option>)}
    </select>
  </>)
}
