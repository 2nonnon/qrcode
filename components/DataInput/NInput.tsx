'use client'

import type { ChangeEventHandler, FC } from 'react'
import { useCallback } from 'react'
import type { NChangeEventHandler } from './type'

interface NInputProps {
  name?: string
  value?: string
  onChange: NChangeEventHandler<string>
  type?: 'input' | 'textarea'
  rows?: number
}

export const NInput: FC<NInputProps> = ({ name, value, type = 'input', rows, onChange }) => {
  const handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = useCallback((e) => {
    onChange(
      e.target.value,
      name,
    )
  }, [onChange, name])

  return (<>
    {
      type === 'textarea'
        ? <textarea className='w-full rounded px-4 py-2' rows={rows} value={value} onChange={handleChange}></textarea>
        : <input className='w-full rounded px-4 py-2' value={value} onChange={handleChange}/>
    }
  </>)
}
