'use client'

import { Icon } from '@iconify-icon/react'
import type { ChangeEventHandler, FC, MouseEventHandler } from 'react'
import { useCallback } from 'react'
import type { NChangeEventHandler } from './type'

interface NUploadProps {
  name?: string
  label?: string
  value?: File
  onChange: NChangeEventHandler<File>
}

export const NUpload: FC<NUploadProps> = ({ name, value, label, onChange }) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    onChange(
      e.target.files?.[0],
      name,
    )
  }, [onChange, name])

  const handleClear: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    onChange(
      undefined,
      name,
    )
  }, [onChange, name])

  return (<>
    <div className='flex items-center gap-2 min-w-0'>
      <label className='surface-sm flex items-center justify-center w-fit rounded px-4 py-1 gap-2 cursor-pointer'>
        <input data-key={name} className='hidden' type="file" accept='image/*' onChange={handleChange}/>
        <Icon icon="mingcute:upload-2-line" />
        <span>{ label || 'Upload' }</span>
      </label>
      {
        value && <div className='flex items-center gap-2 min-w-0'>
          <p className='overflow-hidden text-ellipsis' title={value.name}>{value.name}</p>
          <button data-key={name} type='button' className='flex text-xl' onClick={handleClear}><Icon icon="jam:close-circle-f" /></button>
        </div>
      }
    </div>
  </>)
}
