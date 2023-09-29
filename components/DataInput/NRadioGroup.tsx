'use client'

import type { ChangeEventHandler, FC } from 'react'
import { useCallback } from 'react'
import type { NChangeEventHandler } from './type'

interface NRadioGroupProps {
  name: string
  value: string
  map: object
  onChange: NChangeEventHandler<string>
}

export const NRadioGroup: FC<NRadioGroupProps> = ({ name, onChange, value, map }) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    onChange(
      e.target.value,
      name,
    )
  }, [onChange, name])

  return (<>
    <div className='surface-sm__inert w-fit rounded flex overflow-hidden'>
      {Object.entries(map).map(item =>
        <div className='border-r last:border-none border-[var(--border-color)]' key={item[0]}>
          <input data-key={name} id={item[1]} className='peer hidden' type="radio" name={name} value={item[0]} onChange={handleChange} checked={value === item[0]}></input>
          <label htmlFor={item[1]} className='peer-checked:surface-sm__active px-2 py-1 flex cursor-pointer'>{item[1]}</label>
        </div>)}
    </div>
  </>)
}
